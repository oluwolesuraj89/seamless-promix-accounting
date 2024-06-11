import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './SavingsPayment.module.css';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import CoopDashboard from '../Cooperative Dashboard/CoopDashboard';


function SavingsPayment() {
  const [balance, setBalance] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedSavings, setSelectedSavings] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [modeLoading, setModeLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createloading, setCreateLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [outstanding, setOutstanding] = useState('');
    const [customerSavings, setCustomerSavings] = useState('');
    const [bookingId, setBookingId] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [banks, setBanks] = useState([]);
    const [mode, setMode] = useState([]);
    const [savings, setSavings] = useState([]);
    const [user, setUser] = useState("");
    const [tableData, setTableData] = useState([]);
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

    const filteredData = tableData.filter(item => item.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

      const handleModeChange = (selectedOption) => {
        setSelectedMode(selectedOption);
      }

      const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption.value);
      }

    const totalEntries = filteredData.length;
    const startIndexx = (currentPage - 1) * entriesPerPage + 1;
    const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
    const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


    const fetchSavingsWithdrawal = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/customer/fetch-savings-paid`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultsss = response.data?.data;
          setTableData(resultsss);
console.log(resultsss);
          
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const fetchMembers = async () => {
      setIsLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/no-pagination`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultssx = response.data?.data;

          const options = resultssx.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setCustomers(options);

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
          fetchSavingsWithdrawal();
          fetchBank();
          fetchMembers();
          fetchMode();
      }
  }, [bearer]);

         
  useEffect(() => {
    if (bearer && selectedCustomer) {
      fetchSavings(selectedCustomer);
    }
  }, [bearer, selectedCustomer]);

  const fetchSavings = async (selectedCustomer) => {
      setCustomerLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/savings?customer_id=${selectedCustomer}`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred2 = response.data?.data;
          setCustomerSavings(cred2);

          const options1 = cred2.map((item) => ({
            label: item.prefix,
            value: item.id,
          }));
          setSavings(options1);

            console.log(options1, "NIGERIA");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setCustomerLoading(false);
      }
  };


  const fetchBank = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/get-account-by-class-id?class_id=${1}`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred1 = response.data?.data;
          const options1 = cred1.map((item) => ({
            label: item.gl_name,
            value: item.id,
          }));
          setBanks(options1);

          //   console.log(results, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const fetchMode = async () => {
      setModeLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/income/get-payment-method`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred2 = response.data?.data;
          const paymentMethh = cred2.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setMode(paymentMethh);

          //   console.log(results, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setModeLoading(false);
      }
  };

  const createSavings = async () => {
    setCreateLoading(true);
    try {
      console.log(selectedCustomer, amountToPay, selectedDate, selectedSavings, selectedBank, chequeNo)
      const response = await axios.post(
        `${BASE_URL}/customer/savings-withdrawal`,
        {
          customer_id: selectedCustomer,
          amount: amountToPay,
          transaction_date: selectedDate,
          account_id: selectedSavings,
          bank: selectedBank,
          cheque_number: chequeNo

        },
        { headers }
      );
      fetchSavingsWithdrawal();

      toast.success(response.data.message);

      setSelectedDate('');
      setSelectedCustomer('');
      setSelectedSavings('');
      setBalance('');
      setMode('');
      setSelectedBank('');
      setAmountToPay("");
      chequeNo("");

      

      
     
      // console.log(response.data);

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
      setCreateLoading(false);
    }
  };



  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption.value);
    setBalance('');
    setSelectedSavings('');
  }

  const handleValueChange = (value, name, values) => {
      setAmountToPay(value); // Update the balance state
      console.log(value, name, values);
  };


  const handleSavingsChange = (selectedOption) => {
    setSelectedSavings(selectedOption.value);
    const selectedSavingsData = customerSavings.find((savings) => savings.id === selectedOption.value);
    setBalance(selectedSavingsData?.balance);
    console.log(selectedSavingsData);

  };


  

const handleCreate = () => {
    navigate('/cooperative/create_savings_payment');
  };
    

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <CoopDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Savings Payment</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LOAN REPAID</p>
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

           



           







            <div style={{backgroundColor:'white', padding:'10px 20px', marginTop: 20}}>
              {/* <!--Content Header (Page header)--> */}
              <div className="content-header row align-items-center m-0">
              {/* {(isAdmin || permittedHeaders.includes('create-savings-account')) && ( */}
                <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
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
                    Add New
                    </Button>
                  </div>

                </nav>
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
                                <p>Fetching data...</p>
                            ) : (
                            <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                                  <tr>
                                  <th>Date</th>
                            <th>Customer</th>
                            <th>Savings Type</th>
                            <th>Amount Paid</th>
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.transaction_date}</td>
                                <td>{item?.customer?.name}</td>
                                <td>{item?.loan_account?.loan?.description}</td>
                                <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                    minimumIntegerDigits: 1,
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>

                                            {/* <td> */}
                                            {/* <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                            <i className="far fa-eye"></i>
                                        </div> */}
                                            {/* <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                            <i className="far fa-trash-alt"></i>
                                        </div> */}
                                            {/* </td> */}
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

export default SavingsPayment;