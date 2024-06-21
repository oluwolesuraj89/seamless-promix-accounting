import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './AdvanceBooking.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import Arrow from '../../../assets/promix/dArrow-down.svg'
import StockDashboard from '../../Stock Dashboard/StockDashboard';


function ViewAdvance() {
    const location = useLocation();
    const { selectedBook } = location.state || {};
    console.log(selectedBook);
  const [selectedDate, setSelectedDate] = useState(selectedBook?.payment_date || '');
  const [description, setDescription] = useState(selectedBook?.booking?.description || '');
  const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
  const [selectedCreditAccount1, setSelectedCreditAccount1] = useState('');
  const [selectedCreditAccount2, setSelectedCreditAccount2] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState( `${selectedBook?.booking?.particulars || ''} - ${selectedBook?.booking?.booking_order || ''}`);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [amount, setAmount] = useState(selectedBook?.booking?.amount || '');
    const [amountToPay, setAmountToPay] = useState('');
    const [totalAmount, setTotalAmount] = useState(selectedBook?.amount || '');
    const [outstanding, setOutstanding] = useState(selectedBook?.booking?.balance || '');
    const [bookingId, setBookingId] = useState([]);
    const [paidBooking, setPaidBooking] = useState([]);
    const [creditAcc, setCreditAcc] = useState([]);
    const [debitAcc, setDebitAcc] = useState([]);
    const [user, setUser] = useState("");
  ;
    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
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
    }

    const filteredData = paidBooking.filter(item => item.booking?.particulars.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

    const totalEntries = filteredData.length;
    const startIndexx = (currentPage - 1) * entriesPerPage + 1;
    const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
    const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


    const fetchBookings = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/booking/pending-payment`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultsss = response.data?.data;
          setBookingId(resultsss);

          
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const fetchPaidBookings = async () => {
      setIsLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/booking/get-payments`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultssx = response.data?.data;
          setPaidBooking(resultssx);

          //   console.log(resultsss, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
      if (bearer) {
          fetchBookings();
          fetchDebit();
          fetchCredit();
          fetchPaidBookings();
      }
  }, [bearer]);

  const fetchDebit = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/get-cash-and-banks`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred2 = response.data?.data;


          setDebitAcc(cred2);

          //   console.log(cred2, "NIGERIA");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };


  const fetchCredit = async () => {
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
          const cred1 = response.data?.data;
          setCreditAcc(cred1);

          //   console.log(results, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const createPayment = async () => {
      setLoad(true);

      try {
          
          const response = await axios.post(
              `${BASE_URL}/booking/make-payment`,
              {
                  id: selectedBookingId,
                  amount: amountToPay,
                  debit: selectedCreditAccount2,
                  credit: selectedCreditAccount1,
                  transaction_date: selectedDate

              },
              { headers }
          );

          toast.success(response.data.message);
          navigate(-1);
          setSelectedBookingId('');
          setAmountToPay('');
          setSelectedCreditAccount1('');
          setSelectedCreditAccount2('');
          setDescription('');
          setAmount('');
          setTotalAmount('');
          setOutstanding('');
          setSelectedDate('');

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
              toast.error(errorMessage)
              console.log(errorMessage);
          }
      } finally {
          setLoad(false);
      }
  };


  const handleBookingChange = (event) => {
      const selectedId = event.target.value;
      setSelectedBookingId(selectedId);
      //CONVERT THE selectedId to integer
      const intselectedId = parseInt(selectedId);
      const selectedBooking = bookingId.find(item => item.id === intselectedId);
      setDescription(selectedBooking?.description || '');
      setAmount(selectedBooking?.amount || '');
      setTotalAmount(selectedBooking?.paid || '');
      setOutstanding(selectedBooking?.balance || '');
  };

  const handleValueChange = (value, name, values) => {
      setAmountToPay(value); // Update the balance state
      console.log(value, name, values);
  };


  const handleDebitChange = (event) => {
      setSelectedDebitAccount(event.target.value);
  };
  const handleAccountChange1 = (event) => {
      setSelectedCreditAccount1(event.target.value);
  };
  const handleAccountChange2 = (event) => {
      setSelectedCreditAccount2(event.target.value);
  };


  const formattedAmount = isNaN(parseFloat(amount)) ? '0.00' : parseFloat(amount).toLocaleString('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formattedTotalAmount = isNaN(parseFloat(totalAmount)) ? '0.00' : parseFloat(totalAmount).toLocaleString('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const formattedOutstanding = isNaN(parseFloat(outstanding)) ? '0.00' : parseFloat(outstanding).toLocaleString('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const handlePrintInvoice = (id) => {
    const selectedBook = paidBooking.find(item => item.id === id);
  
  
    navigate('/print_payment', { state: { selectedBook } });
  };

const handleCreate = (id) => {
    navigate('/event_mgt_system/create_customers_advance_payment');
  };
    

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <StockDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Customers Advance Payment</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    {/* <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL INCOME</p>
                        <h5>N0.00</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                        <h5>N0.00</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                        <h5>N0.00</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date:</label>
                                <div className="col-sm-9">
                                <input disabled className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Booking ID:</label>
                                <div className="col-sm-9">
                                <input className="form-control" disabled required="" type="email" value={selectedBookingId} onChange={(e) => setSelectedBookingId(e.target.value)} name="booking particulars" style={{ textAlign: "left" }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                <div className="col-sm-9">
                                <textarea
                                      className="form-control"
                                      required=""
                                      rows={1}
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      name="description"
                                      readOnly
                                  />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginBottom:"10px", desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Amount:</label>
                                <div className="col-sm-9">
                                <input
                                      className="form-control"
                                      required=""
                                      readOnly
                                      type="text"
                                      value={formattedAmount}
                                      onChange={(e) => setAmount(e.target.value)}
                                      name="amount"
                                      style={{ textAlign: "right" }}
                                  />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }} />

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount Paid:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" readOnly type="text" value={formattedTotalAmount} onChange={(e) => setTotalAmount(e.target.value)} name="total-amount" style={{ textAlign: "right" }} />

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Outstanding:</label>
                                <div className="col-sm-9">
                                <input className="form-control" disabled required="" type="email" value={formattedOutstanding} onChange={(e) => setOutstanding(e.target.value)} name="amount" style={{ textAlign: "right" }} />
                                </div>
                            </div>
                        </div>

                        

    {/* <div className="col-md-6">
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account:</label>
            <div className="col-sm-9" >
            <Form.Select disabled name="account" className="form-control" required="" value={selectedCreditAccount2} onChange={handleAccountChange2}>
                  <option value="">Choose Debit Account</option>
                  {creditAcc.map((item) => (
                      <option key={item.id} value={item.id}>
                          {item.gl_name}
                      </option>
                  ))}
              </Form.Select>
            </div>
        </div>
    </div> */}
    {/* <div className="col-md-6">
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Credit Account:</label>
            <div className="col-sm-9" >
            <Form.Select disabled name="account" className="form-control" required="" value={selectedCreditAccount1} onChange={handleAccountChange1}>
                  <option value="">Choose Credit Account</option>
                  {creditAcc.map((item) => (
                      <option key={item.id} value={item.id}>
                          {item.gl_name}
                      </option>
                  ))}
              </Form.Select>
            </div>
        </div>
    </div> */}
    {/* <div className="col-md-6">
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                <div className="col-sm-9" >
                                <CurrencyInput
                                disabled
                                      name="amount-to-pay"
                                      decimalsLimit={2}
                                      className="form-control"
                                      value={amountToPay} // Set the value to the balance state
                                      onValueChange={handleValueChange}
                                      style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                  />
                                </div>
                            </div>
                        </div> */}

</div>

<div style={{ marginTop: 20 }} />


{/* <div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Button style={{ borderRadius: 0 }} variant='success' onClick={createPayment}>
    {load ? (
          <>
              <Spinner size='sm' />
              <span style={{ marginLeft: '5px' }}>Processing your payment, Please wait...</span>
          </>
      ) : (
          "Make Payment"
      )}
    </Button>

</div> */}

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

export default ViewAdvance;