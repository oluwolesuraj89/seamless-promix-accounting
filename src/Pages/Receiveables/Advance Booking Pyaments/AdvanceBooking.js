import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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


function AdvanceBooking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
  const [selectedCreditAccount1, setSelectedCreditAccount1] = useState('');
  const [selectedCreditAccount2, setSelectedCreditAccount2] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [outstanding, setOutstanding] = useState('');
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
                  credit: selectedCreditAccount1

              },
              { headers }
          );

          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message,
          });
          fetchBookings();
          fetchPaidBookings();
          setSelectedBookingId('');
          setAmountToPay('');
          setSelectedCreditAccount1('');
          setSelectedCreditAccount2('');
          setDescription('');
          setAmount('');
          setTotalAmount('');
          setOutstanding('');

      } catch (error) {
          const errorStatus = error.response?.data?.message || error.message || 'Failed to make payment';
          Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: errorStatus,
          });
          console.error(errorStatus);
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
    

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <MainDashboard/>
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

                    <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL INCOME</p>
                        <h5>N0.00</h5>
                        {/* <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div> */}
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                        <h5>N0.00</h5>
                        {/* <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div> */}
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                        <h5>N0.00</h5>
                        {/* <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Booking ID:</label>
                                <div className="col-sm-9">
                                <Form.Select name="account" className="form-control" required="" value={selectedBookingId} onChange={handleBookingChange}>
                                      <option value="">Choose bookings</option>
                                      {bookingId.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.booking_order} - {item.particulars}
                                          </option>
                                      ))}
                                  </Form.Select>
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
                                <input className="form-control" readOnly required="" type="email" value={formattedOutstanding} onChange={(e) => setOutstanding(e.target.value)} name="amount" style={{ textAlign: "right" }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                <div className="col-sm-9" >
                                <CurrencyInput
                                      name="amount-to-pay"
                                      decimalsLimit={2}
                                      className="form-control"
                                      value={amountToPay} // Set the value to the balance state
                                      onValueChange={handleValueChange}
                                      style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                  />
                                </div>
                            </div>
                        </div>

    <div className="col-md-6">
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account:</label>
            <div className="col-sm-9" >
            <Form.Select name="account" className="form-control" required="" value={selectedCreditAccount2} onChange={handleAccountChange2}>
                  <option value="">Choose Debit Account</option>
                  {creditAcc.map((item) => (
                      <option key={item.id} value={item.id}>
                          {item.gl_name}
                      </option>
                  ))}
              </Form.Select>
            </div>
        </div>
    </div>
    <div className="col-md-6">
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Credit Account:</label>
            <div className="col-sm-9" >
            <Form.Select name="account" className="form-control" required="" value={selectedCreditAccount1} onChange={handleAccountChange1}>
                  <option value="">Choose Credit Account</option>
                  {creditAcc.map((item) => (
                      <option key={item.id} value={item.id}>
                          {item.gl_name}
                      </option>
                  ))}
              </Form.Select>
            </div>
        </div>
    </div>

</div>

<div style={{ marginTop: 20 }} />


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Button style={{ borderRadius: 0 }} variant='success' onClick={createPayment}>
    {load ? (
          <>
              <Spinner size='sm' />
              <span style={{ marginLeft: '5px' }}>Creating your payment, Please wait...</span>
          </>
      ) : (
          "Make Payment"
      )}
    </Button>

</div>

</div>
</div>
</div>




           







            <div style={{backgroundColor:'white', padding:'10px 20px'}}>
              {/* <!--Content Header (Page header)--> */}
              <div className="content-header row align-items-center m-0">
              {/* {(isAdmin || permittedHeaders.includes('create-savings-account')) && ( */}
                {/* <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                  <div
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "flex-end",
                      display: "flex",
                      marginLeft: "auto",
                    }}
                    className={classes.actionBtns}
                  >
                    <Button variant="success" onClick={handleCreate}>
                      Create New Accounts
                    </Button>
                  </div>

                </nav> */}
              {/* )} */}
              
                <div className="col-sm-8 header-title p-0">
                  <div className="media">
                    {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                    <div className="media-body">
                      {/* <h4 className="font-weight-bold">Savings Account</h4> */}
                      {/* <small>Create and view your Savings Accounts...</small> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <!--/.Content Header (Page header)--> */}
              <div className="body-content">
                <div className="row">

                  <div className="col-lg-12 col-xl-6">
                    <div className="row">

                      <div className="col-md-6 col-lg-6">

                        {/* <!--Feedback--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Balance indicator--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Time on site indicator--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Top Referrals--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Sessions by device--> */}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                    <div className="card">


                    </div>
                  </div> */}




                

                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-resposive">
                          <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                              <div>
                                <button>Copy</button>
                                <button>Excel</button>
                                <button>PDF</button>
                                <button className={classes.diffbtn}>Column visibility</button>
                              </div>
                              <div>
                                <label className="d-flex justify-content-start align-items-center">
                                  Show
                                  <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                    onChange={(e) => {
                                      setEntriesPerPage(parseInt(e.target.value));
                                      setCurrentPage(1);
                                    }}>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="text-right modal-effect ">
                              <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                <div className="d-flex justify-content-start align-items-center">
                                  <div className="mr-2">Search:</div>
                                  <input
                                    type="search"
                                    value={searchTerm}
                                    className="form-control form-control-sm"
                                    placeholder=""
                                    aria-controls="DataTables_Table_0"
                                    onChange={(e) => {
                                      setSearchTerm(e.target.value);
                                      // setCurrentPage(1);
                                    }}
                                  />
                                </div>

                              </div>
                            </div>
                          </div>


                          {loading ? (
                                <p>Fetching loans paid...</p>
                            ) : (
                              <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                      <tr>
                                          <th>S/N</th>
                                          <th>Particulars</th>
                                          <th>Event Date</th>
                                          <th>Total Amount</th>
                                          <th>Amount Paid</th>
                                          <th>Outstanding</th>
                                          <th>Status</th>
                                          <th>Action</th>
                                      </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                      {displayedData.map((item, index) => (
                                          <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{item.booking?.particulars}</td>
                                              <td>{item.booking?.event_date}</td>
                                              <td style={{ textAlign: "right" }}>{parseFloat(item.booking?.amount).toLocaleString('en-US', {
                                                  minimumIntegerDigits: 1,
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2
                                              })}</td>
                                              <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                                  minimumIntegerDigits: 1,
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2
                                              })}</td>
                                              <td style={{ textAlign: "right" }}>{parseFloat(item.booking?.balance).toLocaleString('en-US', {
                                                  minimumIntegerDigits: 1,
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: 2
                                              })}</td>
                                              <td style={{ textAlign: "left" }}><Badge bg={item.booking?.balance === "0.00" ? 'success' : 'warning'}>{item.booking?.balance === "0.00" ? 'Paid' : 'Pending'}</Badge></td>
                                              <td>
                                                  <div className="btn btn-success-soft btn-sm mr-1">
                                                  <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                                  </div>
                                                  <div className="btn btn-danger-soft btn-sm">
                                                  <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                                  </div>
                                                  <div className="btn btn-sm printbtninv" onClick={() => handlePrintInvoice(item.id)}>
                                                  <i className="fa fa-print dawg" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                                  </div>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                          )}
                          <div className={classes.endded}>
                            <p>
                              Showing {startIndexx} to {endIndexx} of {totalEntries} entries
                            </p>
                            <div style={{ display: 'flex' }}>
                              <button
                                style={{ border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginRight: 10, cursor: "pointer" }}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                              {[...Array(totalPages)].map((_, page) => {
                                // Show only 5 pages or less if available
                                if (page < 5 || page === currentPage - 1 || page === totalPages - 1) {
                                  return (
                                    <button
                                      key={page + 1}
                                      style={{
                                        marginLeft: '0.4rem',
                                        marginRight: '0.4rem',
                                        fontSize: '14px',
                                        fontFamily: 'nunito',
                                        fontWeight: 400,
                                        color: page + 1 === currentPage ? '#ffffff' : '#000',
                                        backgroundColor: page + 1 === currentPage ? '#28a745' : 'gainsboro',
                                        height: '2.5rem',
                                        borderRadius: '89px',
                                        padding: '0.5rem',
                                        border: 'none',
                                        width: '40px',
                                        cursor: "pointer"
                                      }}
                                      onClick={() => setCurrentPage(page + 1)}
                                    >
                                      {page + 1}
                                    </button>
                                  );
                                }
                                return null;
                              })}
                              <button
                                style={{ cursor: "pointer", border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginLeft: 10 }}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          </div>

                          

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/.body content--> */}
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

export default AdvanceBooking;