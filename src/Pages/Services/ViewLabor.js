import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import classes from './Services.module.css';
import { BASE_URL } from '../api/api';
import StockDashboard from '../Stock Dashboard/StockDashboard';

const initializeFormData = (selectedBooking) => {
  if (selectedBooking?.labors && selectedBooking.labors.length > 0) {
    return selectedBooking.labors.map(item => ({
      description: item.description || '',
      amount: item.amount || '',
    }));
  } else {
    return [{ description: '', amount: '' }];
  }
};

function ViewLabor() {
  const location = useLocation();
  const { selectedBooking } = location.state || {};
  const [user, setUser] = useState("");
  const [particulars, setParticulars] = useState(selectedBooking?.particulars || "");
  const [totalCharge, setTotalCharge] = useState(selectedBooking?.amount || "");
  const [selectedAssetAccount, setSelectedAssetAccount] = useState(selectedBooking?.asset_account || "");
  const [description, setDescription] = useState(selectedBooking?.description || "");
  const [selectedAccount, setSelectedAccount] = useState(selectedBooking?.booking_account || "");
  const [eventId, setEventId] = useState(selectedBooking?.booking_order || "");
  const [selectedService, setSelectedService] = useState(selectedBooking?.income_account || "");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState(() => initializeFormData(selectedBooking));
  const [totalAmount, setTotalAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(selectedBooking?.event_date || "");
  const [selectedTime, setSelectedTime] = useState(selectedBooking?.start_hour || "");
  const [selectedTime1, setSelectedTime1] = useState(selectedBooking?.end_hour || "");
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('tobi');

      if (value !== null) {
        setBearer(value);
      }
      if (value1 !== null) {
        setUser(value1);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleEvent = (event) => {
    setEventId(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFormChange = (value, fieldName, rowIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][fieldName] = value;
    setFormData(updatedFormData);
    updateTotalCharge(updatedFormData);
  };

  const updateTotalCharge = (updatedFormData) => {
    const totalChargeValue = updatedFormData.reduce((acc, row) => {
      return acc + (parseFloat(row.amount) || 0);
    }, 0);
    setTotalCharge(totalChargeValue.toFixed(2));
  };

  const createBooking = async () => {
    setUpdateLoading(true);
    try {
      const descriptions = formData.map((row) => row.description).filter((id) => id !== undefined);
      const amounts = formData.map((row) => row.amount).filter((id) => id !== undefined);
      const response = await axios.post(
        `${BASE_URL}/booking/add-labor-expenses`,
        {
          booking_id: selectedBooking?.id,
          description: descriptions,
          amount: amounts 
        },
        { headers }
      );
      toast.success(response.data.message);
      navigate(-1);
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = typeof error.response.data.message === 'string' 
          ? error.response.data.message 
          : JSON.stringify(error.response.data.message);
      }
      toast.error(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  const addRow = () => {
    setFormData([...formData, { description: '', amount: '' }]);
  };

  const deleteRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
  };

  useEffect(() => {
    updateTotalCharge(formData);
  }, [formData]);

  return (
    <div>
      <div className="wrapper">
        <div className="content-wrapper">
          <div className="main-content">
            <StockDashboard />
            <div className='newBody'>
              <div className={classes.newWidth}>
                <div className={classes.topPadding}>
                  <div className={`${classes.formSecCont}`}>
                    <div className={classes.formSectionHeader}>
                      <h3>Other Cost</h3>
                    </div>
                    <div className={classes.formSectionHeader}>
                      <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
                    </div>
                  </div>
                </div>
                <div className={classes.topPadding}>
                  <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{ border: 'none' }}>
                      <div className="row">
                      <div style={{ marginTop: 20 }} />
                    <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event Description:</label>
                            <div className="col-sm-9">
                              <textarea
                              disabled
                                className="form-control"
                                required=""
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name="description"
                              />
                            </div>
                          </div>
                        </div>
                    <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event ID:</label>
                            <div className="col-sm-9">
                              <input
                                className="form-control"
                                required=""
                                type="text"
                                onChange={handleEvent}
                                name="eventId"
                                value={eventId}
                                disabled
                              // min={new Date().toISOString().split('T')[0]} // Set min attribute to the current date
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }} />
                    <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event Date:</label>
                            <div className="col-sm-9">
                              <input
                                className="form-control"
                                required=""
                                type="date"
                                onChange={handleDateChange}
                                name="date"
                                value={selectedDate}
                                disabled
                              // min={new Date().toISOString().split('T')[0]} // Set min attribute to the current date
                              />
                            </div>
                          </div>
                        </div>                        
                        <div style={{ marginTop: 20 }} />

                        <hr style={{marginTop: 20, color: "#c4c4c4", borderWidth: "0.5px"}}/>
                        <h5 style={{ textAlign: "center", marginTop: 20, }}>Add Other Cost</h5>
                     
                        <div className="table-responsive">
                          <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
                            <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                              <tr>
                                <th style={{ width: '70%', }}>Description</th>
                                <th>Amount</th>
                                <th>
                                  <Button style={{width: 30, height: 30, justifyContent: "center",  display: "flex"}} variant="primary" onClick={addRow}>
                                    <i className="fas fa-plus" style={{width: 30, height: 30}}></i>
                                  </Button>
                                </th>
                              </tr>
                            </thead>
                            <tbody style={{ whiteSpace: "nowrap", }}>
                              {formData.map((row, index) => (
                                <tr key={index}>
                                  <td style={{ width: 1000 }}>
                                    <textarea 
                                      value={row.description} 
                                      rows="1" 
                                      style={{ textAlign: "left", border: "1px solid #c4c4c4",padding: 5, width: '100%' }} 
                                      onChange={(e) => handleFormChange(e.target.value, 'description', index)}
                                    />
                                  </td>
                                  <td style={{ width: 100 }}>
                                    <CurrencyInput
                                      name={`rowAmount ${index}`}
                                      decimalsLimit={2}
                                      value={row.amount}
                                      className="form-control"
                                      style={{ textAlign: "right", border: "1px solid #c4c4c4", width: '100%' }}
                                      onValueChange={(value) => handleFormChange(value, 'amount', index)}
                                    />
                                  </td>
                                  <td style={{ textAlign: "center", width: 10}}>
                                    <Button variant="danger" style={{width: 30, height: 30, justifyContent: "center",  display: "flex"}}  onClick={() => deleteRow(index)}>
                                      <i className="far fa-trash-alt" style={{width: 30, height: 30}}></i>
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-11" style={{ marginLeft: 45, marginTop: 30 }}>
                        <div className="form-group row justify-content-end">
                          <label className="col-sm-2 col-form-label font-weight-400">Total Amount:</label>
                          <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%' }}>
                            <CurrencyInput
                              name='total-amount'
                              decimalsLimit={2}
                              value={totalCharge}
                              className="form-control"
                              disabled
                              style={{ textAlign: "right", border: "none", width: '10rem' }}
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 20 }} />
                      <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                        <Button variant="light" className={classes.btn1} onClick={goBack}>Cancel</Button>
                        <Button style={{ borderRadius: 5, marginLeft: 10 }} variant="success" onClick={createBooking}>
                          {updateLoading ? (
                            <>
                              <Spinner size='sm' />
                              <span style={{ marginLeft: '5px' }}>Updating your booking, Please wait...</span>
                            </>
                          ) : (
                            "Update Booking"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
}

export default ViewLabor;
