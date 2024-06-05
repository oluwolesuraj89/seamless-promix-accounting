import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../../../assetss/assets/plugins/datatables/dataTable.bootstrap4.min.css"
// import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from '../Manage Members/ManageMember.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import Arrow from '../../../assets/promix/dArrow-down.svg'
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function LoanRepayment() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedLoanType, setSelectedLoanType] = useState('');
    const [Outstanding, setOutstanding] = useState(0);
    const [amountToPay, setAmountToPay] = useState('');
    const [banks, setBanks] = useState([]);
    const [loanData, setLoanData] = useState([]);
    const [customerLoan, setCustomerLoan] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [amountPaid, setAmountPaid] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [repaymentLoading, setRepaymentLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [selectedBank, setSelectedBank] = useState('');
    const [loan, setLoan] = useState([]);
    const [amount1, setAmount1] = useState("");
    const [transactionDate1, setTransactionDate1] = useState("");
    const [selectedBankbank1, setSelectedBankbank1] = useState("");
    const [selectedCustomer1, setSelectedCustomer1] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [user, setUser] = useState("");
    const [tableData, setTableData] = useState([]);
    // const [loading, setLoading] = useState(false);


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

      const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const fetchLoanRepayments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/customer/fetch-loan-repayment`, { headers });
            const results = response.data?.data;
            setTableData(results);
            //   setSelectOptions(options);
        } catch (error) {
            if (error.response && error.response.status === 401) {
              
              navigate('/login');
            } else {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData([]);
          }
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (bearer) {

            fetchLoanRepayments();
        }
    }, [bearer]);

    const fetchSupplierss = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/customer/no-pagination`, { headers });
            const results = response.data?.data;


            setCustomers(results);
            //   setSelectOptions(options);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const options = customers.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const handleSupplierChange = (selectedOption) => {
        setSelectedCustomer(selectedOption.value);
        setSelectedLoanType(null);
    }



    const fetchBenLoan = async (selectedCustomer) => {
        setLoading(true);
        // console.log()
        try {
            const response = await axios.get(`${BASE_URL}/customer/loan?customer_id=${selectedCustomer}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );

            const loanss = response.data?.data || [];

            // console.log(paid, 'paid');
            setCustomerLoan(loanss);



        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    const cusLoan = customerLoan.map((item) => ({
        label: item.prefix,
        value: item.id,
    }));


    const handleLoanTypeChange = (selectedOption) => {
        setSelectedLoanType(selectedOption.value);
        const selectedLoanData = customerLoan.find((loan) => loan.id === selectedOption.value);
        setLoanData(selectedLoanData);
        setTotalPrincipal(selectedLoanData.total_repayment);
        const amountPaid = selectedLoanData.total_repayment - selectedLoanData.balance;
        setAmountPaid(amountPaid);
        setOutstanding(selectedLoanData.balance);
    };




    useEffect(() => {
        if (bearer) {

            fetchSupplierss();
        }
    }, [bearer]);

    useEffect(() => {
        if (bearer && selectedCustomer) {
            fetchBenLoan(selectedCustomer);
        }
    }, [bearer, selectedCustomer]);

    useEffect(() => {
        if (bearer) {

            fetchBanks();
        }
    }, [bearer]);

    // const readData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('userToken');

    //         if (value !== null) {
    //             setBearer(value);
    //         }
    //     } catch (e) {
    //         alert('Failed to fetch the input from storage');
    //     }
    // };

    // useEffect(() => {
    //     readData();
    // }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const goBack = () => {
        navigate(-1);
    }


    const fetchLoanType = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get`(${BASE_URL}/customer/loan?customer_id=${selectedCustomer}, { headers })`;
            const loanss = response.data?.data;

            const options1 = loanss.map((item) => ({
                label: item.employee_id,
                value: item.id,
            }));
            setLoan(loanss);
            // setSelectOptions(options);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMakePayment = async () => {

        setRepaymentLoading(true);
        try {

            const response = await axios.post(`${BASE_URL}/customer/loan-repayment`,
                {
                    amount: amountToPay,
                    transaction_date: selectedDate,
                    bank: selectedBank,
                    customer_id: selectedCustomer,
                    account_id: selectedLoanType,
                },
                { headers }
            );

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });

            setAmountToPay('');
            setSelectedBank('');
            setSelectedCustomer('');
            setSelectedLoanType(null);
            setAmountPaid('');
            setSelectedDate('');
            setTotalPrincipal('');
            setOutstanding('');
            fetchLoanRepayments();
            //   console.log(response);
            //   console.log(response.data.message)

            //   navigate('/loan_account');

            // return
            toast.success(response.data.message);
    } catch (error) {
      let errorMessage = error.response?.data?.message;
      // let errorMessage = 'An error occurred. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
              if (typeof error.response.data.message === 'string') {
                  errorMessage = error.response.data.message;
              } else if (Array.isArray(error.response.data.message)) {
                  errorMessage = error.response.data.message.join('; ');
              } else if (typeof error.response.data.message === 'object') {
                toast.error(errorMessage)
                console.log("error", errorMessage);
              }
          }
        } finally {

            setRepaymentLoading(false);
        }
    };
    //   amount: amountToPay,
    //             transaction_date: selectedDate,
    //             bank: selectedBank,
    //             customer_id: selectedCustomer,
    //             account_id: selectedLoanType,

    const fetchBanks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get-account-by-class-id?class_id=${1}`, { headers });
            const results = response.data?.data;

            const options1 = results.map((item) => ({
                label: item.gl_name,
                value: item.id,
            }));
            setBanks(options1);
            // setSelectOptions(options);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchLoanType();
            fetchBanks();
        }
    }, [bearer]);


    const handleValueChange = (value, name, values) => {
        setAmountToPay(value); // Update the balance state
    };

    const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption.value);
    }
    const handleLoanChange = (selectedOption) => {
        setSelectedLoanType(selectedOption);
    }
    //filter function
    const filteredData = tableData.filter(item => item.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const totalEntries = filteredData.length;
    const startIndexx = (currentPage - 1) * entriesPerPage + 1;
    const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
    const displayedData = filteredData.slice(startIndexx - 1, endIndexx);
  

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
                            <h3>Manage Loan</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL INCOME</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
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
                                    <input className="form-control" type="date" value={selectedDate} onChange={handleDateChange} name="date" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Customer:</label>
                                <div className="col-sm-9">
                                    <Select

                                        onChange={handleSupplierChange}
                                        options={options}
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
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Type:</label>
                                <div className="col-sm-9">
                                    <Select

                                        onChange={handleLoanTypeChange}
                                        options={cusLoan}
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
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginBottom:"10px", desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Principal:</label>
                                <div className="col-sm-9">
                                    <  CurrencyInput
                                        name="amount-to-pay"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={totalPrincipal}
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount Paid:</label>
                                <div className="col-sm-9">
                                    <CurrencyInput
                                        //   
                                        name="amount-paid"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={amountPaid} // Set the value to the balance state
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Outstanding:</label>
                                <div className="col-sm-9">
                                    <CurrencyInput
                                        //   
                                        name="outstanding"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={Outstanding} // Set the value to the balance state
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount to Pay:</label>
                                <div className="col-sm-9" >
                                    <CurrencyInput
                                        //   
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
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Bank:</label>
            <div className="col-sm-9" >
                <Select
                
                    onChange={handleBankChange}
                    options={banks}
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
            </div>
        </div>
    </div>

</div>

<div style={{ marginTop: 20 }} />


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Button style={{ borderRadius: 0 }} variant='success' onClick={handleMakePayment}>
        {repaymentLoading ? (
            <>
                <Spinner size='sm' />
                <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
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
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Loan Type</th>
                                    <th>Amount paid</th>
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
                                            })}
                                            </td>

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

export default LoanRepayment;