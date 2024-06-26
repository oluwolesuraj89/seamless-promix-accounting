import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './Services.module.css';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import StockDashboard from '../Stock Dashboard/StockDashboard';

const initializeFormData = (selectedBooking) => {
  if (selectedBooking?.expenses && selectedBooking.expenses.length > 0) {
    return selectedBooking.expenses.map(item => ({
      items: { value: item?.item?.id || '', label: item?.item?.name || '' },
      unitPrice: item.price || '',
      qty: item.quantity || '',
      totalPrice: item.amount || '',
    }));
  } else {
    return [{ items: '', unitPrice: '', qty: '', totalPrice: '' }];
  }
};

const initializeFormData1 = (selectedBooking) => {
  if (selectedBooking?.labors && selectedBooking.labors.length > 0) {
    return selectedBooking.labors.map(item => ({
      description: item.description || '',
      amount: item.amount || '',
    }));
  } else {
    return [{ description: '', amount: '' }];
  }
};


function ViewServices() {
  const location = useLocation();
  const { selectedBooking } = location.state || {};
    const [user, setUser] = useState("");
    const [particulars, setParticulars] = useState(selectedBooking?.particulars || "");
  const [subCat, setSubcat] = useState([]);
  const [subCat2, setSubcat2] = useState([]);
  const [totalCharge, setTotalCharge] = useState(selectedBooking?.amount || "");
  const [selectedaAsetAccount, setSelectedAssetAccount] = useState(selectedBooking?.asset_account || "");
  const [description, setDescription] = useState(selectedBooking?.description || "");
  const [selectedAccount, setSelectedAccount] = useState(selectedBooking?.booking_account || "");
  const [selectedService, setSelectedService] = useState(selectedBooking?.income_account || "");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(() => initializeFormData(selectedBooking));
  const [formData1, setFormData1] = useState(() => initializeFormData1(selectedBooking));
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmount1, setTotalAmount1] = useState('');
  const [selectedDate, setSelectedDate] = useState(selectedBooking?.event_date || "");
  const [selectedTime, setSelectedTime] = useState(selectedBooking?.start_hour || "");
  const [selectedTime1, setSelectedTime1] = useState(selectedBooking?.end_hour || "");
  const [itemList, setItemList] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [debitAccount, setDebitAccounts] = useState([]);
  const [revenues, setRevenues] = useState([]);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleTimeChange1 = (event) => {
    setSelectedTime1(event.target.value);
  };


  const handleAssetChange = (event) => {
    setSelectedAssetAccount(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
          const value1 = await AsyncStorage.getItem('tobi');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
          if (value1 !== null) {
              setUser(value1);
            }
        //   if (value2 !== null) {
        //     setCompanyId(value2);
        //   }
    
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
      }
    
  
      const handleValueChange = (value, name, values) => {
        setTotalCharge(value); // Update the balance state
    
      };
     
      
     

  const fetchSubCat = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/get-account-by-sub-category-id?sub_category_id=${1}`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const results = response.data?.data;
      setSubcat(results);

      //   console.log(results, "NIYIN");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenues = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/get-account-by-class-id?class_id=${4}`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const revenueResult = response.data?.data;
      setRevenues(revenueResult);

      //   console.log(results, "NIYIN");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/items/fetch-all`, { headers });
      const itemss = response.data?.data;

      const options1 = itemss.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setItemList(itemss);
      setSelectOptions1(options1);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setDebitAccounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubCat2 = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/get-account-by-category-id?category_id=${3}`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const resultss = response.data?.data;
      setSubcat2(resultss);

      //   console.log(results, "NI");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchSubCat();
      fetchSubCat2();
      fetchItems();
      fetchRevenues();
    }
  }, [bearer]);



  const createBooking = async () => {
  
    setUpdateLoading(true);
    try {
      const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
      const unitPrices = formData.map((row) => row.unitPrice).filter((id) => id !== undefined);
      const totalPrices = formData.map((row) => row.totalPrice).filter((id) => id !== undefined);
      const stocks = formData.map((row) => row.items.value).filter((id) => id !== undefined);

      const response = await axios.post(
        `${BASE_URL}/booking/update`,
        {
          particulars: particulars,
          event_date: selectedDate,
          start_hour: selectedTime,
          end_hour: selectedTime1,
          end_hour: selectedTime1,
          amount: totalCharge,
          asset_account: selectedaAsetAccount,
          booking_account: selectedAccount,
          description: description,
          product_id:stocks,
          quantity: quantities,
          unit_price: unitPrices,
          amounts: totalPrices,
          income_account: selectedService,
          booking_id: selectedBooking?.id


        },
        { headers }
      );
      console.log(response.data.message)
      setParticulars("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTime1("");
      setTotalCharge("");
      setSelectedAssetAccount("");
      setSelectedAccount("");
      setDescription("");
      navigate(-1);

      // return
     toast.success(response.data.message);
      console.log(response.data);

    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
          if (typeof error.response.data.message === 'string') {
              errorMessage = error.response.data.message;
          } else if (Array.isArray(error.response.data.message)) {
              errorMessage = error.response.data.message.join('; ');
          } else if (typeof error.response.data.message === 'object') {
              errorMessage = JSON.stringify(error.response.data.message);
          }
          toast.error(errorMessage);
          console.log(error);
      }
    } finally {
      setUpdateLoading(false);
    }
  };
    
     


  const handleItemDescriptionChange = async (selectedOption, rowIndex) => {
    const selectedItemId = selectedOption.value;
    const selectedItem = itemList.find(item => item.id === selectedItemId);
    const selectedUnitPrice = selectedItem?.price || 0;
    const stockQuantity = selectedItem?.stock?.quantity || 0;

    handleFormChange(selectedOption, "items", rowIndex);
    handleFormChange(selectedUnitPrice, "unitPrice", rowIndex);
    handleFormChange(stockQuantity, "stockQuantity", rowIndex);
  };

  // const handleFormChange = (value, fieldName, rowIndex) => {
  //   const updatedFormData = [...formData];
  //   updatedFormData[rowIndex][fieldName] = value;
  //   const quantity = parseFloat(updatedFormData[rowIndex].qty) || 0;
  //   const unitPrice = parseFloat(updatedFormData[rowIndex].unitPrice) || 0;
  //   updatedFormData[rowIndex].totalPrice = (quantity * unitPrice).toFixed(2);
  //   setFormData(updatedFormData);
  //   updateTotalCharge(updatedFormData);
  // };

  // const updateTotalCharge = (updatedFormData) => {
  //   const totalChargeValue = updatedFormData.reduce((acc, row) => {
  //     return acc + (parseFloat(row.totalPrice) || 0);
  //   }, 0);
  //   setTotalCharge(totalChargeValue.toFixed(2));
  // };

  


const calcTotalAmount = () => {
  const updatedFormData = formData.map(row => ({
      ...row,
      totalPrice: parseFloat(row.unitPrice) * parseFloat(row.qty) || 0
  }));
  setFormData(updatedFormData);
};

// useEffect(() => {
//   calcTotalAmount(); 
// }, [formData]);  
   
    
    
const calcTotalAmount1 = () => {
  const total = formData.reduce((total, row) => total + parseFloat(row.totalPrice) || 0, 0);
  setTotalAmount(total);
};
const calcTotalAmount2 = () => {
  const total2 = formData1.reduce((total, row) => total + parseFloat(row.amount) || 0, 0);
  setTotalAmount1(total2);
};

useEffect(() => {
  calcTotalAmount1();
  calcTotalAmount2();
  // calcTotalAmount();
}, [formData, formData1]);

   
    
    
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
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <StockDashboard />
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>View Service Details</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Particulars</label>
                            <div className="col-sm-9">
                              <input disabled className="form-control" required="" type="text" value={particulars} onChange={(e) => setParticulars(e.target.value)} name="particulars" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Date
                              of Event</label>
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

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
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
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event Start Time</label>
                            <div className="col-sm-9">
                              <input disabled className="form-control" required="" type="time" onChange={handleTimeChange} name="time" value={selectedTime} />
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }} />

                        <div className="col-md-6" >
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event End Time</label>
                            <div className="col-sm-9">
                              <input disabled className="form-control" required="" type="time" onChange={handleTimeChange1} name="time" value={selectedTime1} />

                            </div>
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Charge</label>
                            <div className="col-sm-9">
                              <CurrencyInput
disabled
                                name="Total charge"
                                decimalsLimit={2}
                                className="form-control"
                                value={totalCharge} // Set the value to the balance state
                                onValueChange={handleValueChange}
                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }} />

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account</label>
                            <div className="col-sm-9">
                              <Form.Select disabled name="customer" className="form-control" required="" value={selectedaAsetAccount} onChange={handleAssetChange}>
                                <option value="">Choose Debit Account</option>
                                {subCat.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.gl_name}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Credit Account</label>
                            <div className="col-sm-9">
                              <Form.Select disabled name="customer" className="form-control" required="" value={selectedAccount} onChange={handleAccountChange}>
                                <option value="">Choose Credit Account</option>
                                {subCat2.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.gl_name}
                                  </option>
                                ))}
                              </Form.Select>
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: 20 }} />
                        
                        <div className="col-md-6" >
                          <div className="form-group row">
                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Service Charged</label>
                            <div className="col-sm-9">
                              <Form.Select disabled name="customer" className="form-control" required="" value={selectedService} onChange={handleServiceChange}>
                                <option value="">Select Account</option>
                                {revenues.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.gl_name}
                                  </option>
                                ))}
                              </Form.Select>

                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }} />
                        
                        <hr style={{marginTop: 30, color: "#c4c4c4", borderWidth: "0.5px"}}/>

                        <div style={{ marginTop: 30 }} />
                        <div className="row">
                          <h5 style={{ textAlign: "center" }}>Expense(s)</h5>
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                <tr>
                                  <th style={{ width: '50%', }}>Item</th>
                                  <th>Unit Price(N)</th>
                                  <th>Quantity</th>
                                  <th>Total Price(N)</th>
                                  {/* <th ><Button variant="primary" onClick={() => addRow()}>
                                    <i className="fas fa-plus"></i>

                                  </Button></th> */}
                                </tr>
                              </thead>
                              <tbody style={{ whiteSpace: "nowrap", }}>
                                {formData.map((row, index) => (
                                  <tr key={index}>
                                    <td style={{ width: '400px' }}>
                                      <Select
                                        value={row.items} // Assuming row.itemsDescription contains the selected option
                                        onChange={(selectedOption) => handleItemDescriptionChange(selectedOption, index)}
                                        options={selectOptions1}
                                        isDisabled={true}
                                        menuPortalTarget={document.body}
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                          }),
                                        }}
                                      />

                                    </td>
                                    <td style={{ width: '7rem' }}>
                                      <CurrencyInput
                                        name={`rowUnitPrice ${index}`} // Provide a unique name for each CurrencyInput
                                        decimalsLimit={2}
                                      
                                        value={row.unitPrice}
                                        className="form-control"
                                        disabled
                                        style={{ textAlign: "right", border: "none", width: '10rem' }}
                                      />
                                    </td>
                                    <td style={{ width: '5rem' }}>
                                      <input
disabled
                                        type="text"
                                        className="form-control"
                                        value={row.qty}
                                        onChange={(e) => handleFormChange(e.target.value, "qty", index)}
                                      />
                                      {row.quantityError && <span style={{ color: 'red' }}>{row.quantityError}</span>}
                                    </td>
                                    <td style={{ width: '7rem' }}>
                                      <CurrencyInput
                                        name={`rowLineTotal ${index}`} // Provide a unique name for each CurrencyInput
                                        decimalsLimit={2}
                                        value={row.totalPrice}
                                        className="form-control"
                                        disabled
                                        style={{ textAlign: "right", border: "none", width: '10rem' }}
                                      />
                                    </td>
                                    {/* <td style={{ textAlign: "center" }}>
                                      <Button variant="danger" onClick={() => deleteRow(index)}>
                                        <i className="far fa-trash-alt"></i>
                                      </Button>
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div>
                        
                        <div className="col-md-11" style={{ marginLeft: 45, marginTop: 30 }}>
                          <div className="form-group row justify-content-end">
                            <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Total Amount:</label>
                            <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                              <CurrencyInput
                                name='total-amount' // Provide a unique name for each CurrencyInput
                                decimalsLimit={2}
                                value={totalAmount}
                                className="form-control"
                                disabled
                                style={{ textAlign: "right", border: "none", width: '10rem' }}
                              />
                            </div>
                          </div>
                        </div>

<hr style={{marginTop: 30, color: "#c4c4c4", borderWidth: "0.5px"}}/>
                        <div className="row">
                        <h5 style={{ textAlign: "center", marginTop: 40 }}>Other Cost</h5>
                        <div className="table-responsive">
                          <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
                            <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                              <tr>
                                <th style={{ width: '70%', }}>Description</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody style={{ whiteSpace: "nowrap", }}>
                              {formData1.map((row, index) => (
                                <tr key={index}>
                                  <td style={{ width: 1000 }}>
                                    <textarea 
                                      value={row.description} 
                                      disabled
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
                                      disabled
                                      className="form-control"
                                      style={{ textAlign: "right", border: "1px solid #c4c4c4", width: '100%' }}
                                      onValueChange={(value) => handleFormChange(value, 'amount', index)}
                                    />
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
                              value={totalAmount1}
                              className="form-control"
                              disabled
                              style={{ textAlign: "right", border: "none", width: '10rem' }}
                            />
                          </div>
                        </div>
                      </div>










                      </div>

                <div style={{ marginTop: 20 }} />


                <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                {/* <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                    <Button style={{borderRadius: 5, marginLeft: 10}} variant="success" onClick={createBooking}>
                    {updateLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Updating your booking, Please wait...</span>
                                    </>
                                  ) : (
                                    "Update your Booking"
                                  )}
                    </Button> */}
                    {/* <Button>Save Changes</Button> */}
                    {/* <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button> */}
                    </div>

            </div>
            </div>
            </div>

          </div>
          {/* <!--/.main content--> */}
          </div>
          </div>
          {/* <InfoFooter /> */}
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  );
}

export default ViewServices;