import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from '../Manage Cooperatives/Manage Members/ManageMember.module.css'
import MainDashboard from '../Main Dashboard/MainDashoard';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import Arrow from '../../assets/promix/dArrow-down.svg'



function Expenditures() {
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ledgLoading, setLedgLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [inputss, setInputss] = useState([]);
  const [tableData, setTableData] = useState([]);
const [selectedAccount, setSelectedAccount] = useState('');
const [totalDebit, setTotalDebit] = useState('');
const [totalCredit, setTotalCredit] = useState('');
const [user, setUser] = useState('');
const [ledgTableData, setLedgTableData] = useState([]);
const [totalEntries, setTotalEntries] = useState("");
const [totalPages, setTotalPages] = useState(1);




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

const fetchExpenses = async () => {
  setLoad(true);
  try {
      const response = await axios.get(`${BASE_URL}/fetch-expenses?page=${currentPage}`, { headers });
      const results = response.data?.data?.data;
      const resultx = response.data?.data?.total;
      setTotalEntries(resultx);
      setLedgTableData(results);
      const total = response.data?.data?.last_page || 1;
      setTotalPages(total);
      console.log("response:", results);
      // toast.success(response.data.message);
  } catch (error) {
      if (error.response && error.response.status === 401) {
          navigate('/login');
      } else {
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
            if (typeof error.response.data.message === 'string') {
                errorMessage = error.response.data.message;
            } else if (Array.isArray(error.response.data.message)) {
                errorMessage = error.response.data.message.join('; ');
            } else if (typeof error.response.data.message === 'object') {
              toast.error(errorMessage)
              console.log(errorMessage);
            }
        }
          setTableData([]);
      }
  } finally {
    setLoad(false);
  }
};



useEffect(() => {
  if (bearer) {
    fetchExpenses();

  }
}, [bearer, currentPage]);


//filter function
  // const filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // const filteredData = ledgTableData.filter(item => item.name.includes(searchTerm));
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  // const displayedData = filteredData.slice(currentPage - 1, totalEntries);
  

  const handleDateChange1 = (event) => {
    setSelectedEndDate(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

 



  // const handlePrevPage = () => {
  //     setCurrentPage(Math.max(currentPage - 1, 1));
  // };

  // const handleNextPage = () => {
  //     setCurrentPage(Math.min(currentPage + 1, totalPages));
  // };

  // const totalEntries = filteredData.length;
  // const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  // const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  // const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


 


  const fetchAccounts = async () => {
    setLoad(true);

    try {
        const response = await axios.get(`${BASE_URL}/reports/general-ledger-filter`,
            {
                params: {
                    gl_code: selectedAccount,
                    start_date: selectedDate,
                    end_date: selectedEndDate
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );

        const resultsss = response.data?.data?.journal;
        setAccounts(resultsss);

        const resultssx = response.data?.data?.input;
        setInputss(resultssx);

        // console.log(resultssx, 'NI');
        toast.success(response.data.message);
          setSelectedAccount("");
          setSelectedDate("");
          setSelectedEndDate("");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          
          navigate('/login');
        } else {
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
            }}
      
    } finally {
        setLoad(false);
    }
};


  const fetchCharts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account`, { headers });
      const results = response.data?.data;
     
      setTableData(results);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      if (bearer) {
        fetchCharts();
      }
  }, [bearer]);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    // Set the start date to the first date of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    setSelectedDate(firstDayOfMonth.toISOString().split('T')[0]);
    // Set the end date to the current date
    setSelectedEndDate(currentDate.toISOString().split('T')[0]);
    // Fetch accounts
    fetchAccounts();
  };

  

  useEffect(() => {
    if (accounts) {
      const debitTotal = accounts.reduce((total, item) => total + parseFloat(item.debit), 0);
      const creditTotal = accounts.reduce((total, item) => total + parseFloat(item.credit), 0);

      // Format the numbers with commas and two decimal places
      const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      setTotalDebit(formattedDebitTotal);
      setTotalCredit(formattedCreditTotal);
    }
  }, [accounts]);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const filteredData = ledgTableData.filter(item => {
    const searchFields = [item.narration, item.transaction_date, formatDate(item.created_at)];
    return searchFields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  const formattedTotalEntries = totalEntries.toLocaleString();

const handleCreate = ()=>{
    navigate('/accounting/income_and_expenditure/expenditures/add_new_expenditure')
}


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
                            <h3>Expenditures</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
            </div>

            <div style={{backgroundColor:'white', padding:'10px 20px'}}>
              {/* <!--Content Header (Page header)--> */}
              <nav aria-label="breadcrumb">
                  <div
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "flex-end",
                      display: "flex",
                      marginLeft: "auto",
                      width:'100%',
                      textAlign:'right'
                    }}
                    className={classes.actionBtns}
                  >
                    <Button variant="success" 
                    onClick={handleCreate}
                    >
                      Manual Entries
                    </Button>
                  </div>

                </nav>
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
                    <Button variant="success" 
                    // onClick={handleCreate}
                    >
                      Manual Entries
                    </Button>
                  </div>

                </nav> */}
                <nav aria-label="breadcrumb" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}} >
                    
                    <div className="form-group row col-md-4">
                      <div className="">
                        <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400 text-align-center">Accounts:</label>
                          {/* <div > */}
                            <Form.Select name="account" className="form-control" required="" value={selectedAccount} onChange={handleAccountChange}>
                                <option value="">Choose Account</option>
                                {tableData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.gl_name}
                              </option>
                            ))}
                            </Form.Select>
                          {/* </div> */}
                      </div>
                    </div>


                    <div className="form-group row col-md-4">
                      <div className="col-md-12">
                        <label for="example-text-input" className="col-form-label font-weight-400">
                          Start Date:
                        </label>
                        <div className="">
                          <input className="form-control" required="" type="date" onChange={handleDateChange} name="start" value={selectedDate} />
                        </div>
                      </div>
                    </div>

                    <div className="form-group row col-md-4">
                      <div className="">
                        <label for="example-text-input" className=" col-form-label font-weight-400">
                          End Date:
                        </label>
                        <div className="">
                          <input className="form-control" required="" type="date" onChange={handleDateChange1} name="end" value={selectedEndDate} />
                        </div>
                      </div>
                    </div>
                      
                      {/* <Button variant="success" onClick={handleShow}>
                        Add New Beneficiaries
                      </Button> */}
                    {/* </div> */}
                </nav>

                <div className="form-group row" style={{display:'flex', justifyContent:'flex-end', marginBottom:'20px'}}>
                  {/* <div > */}
                    <Button variant='success' onClick={fetchAccounts} style={{width:'30%'}}>
                      {load ? (
                        <>
                          <Spinner size='sm'/>
                          <span >Processing, Please wait...</span>
                        </>
                      ) : (
                        "Process"
                      )}
                    </Button>
                  {/* </div> */}
                </div>
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
                                    className="form-control"
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                  />
                                  
                                </div>

                              </div>
                            </div>
                          </div>


                          {load  ? (
                            <p>Fetching data...</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                                  <tr>
                                    <td>S/N</td>
                                    <th>Transaction Date</th>
                                    <th>Particulars</th>
                                    <th>Description</th>
                                    {/* <th>Receipt Number</th> */}
                                    <th>Amount</th>
                                    <th>Payment Mode</th>
                                    <th>Teller Number</th>
                                    {/* <th>Received By</th> */}
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: 'nowrap' }}>
                                {filteredData.map((item, index) => (
                                     <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>{formatDate(item.transaction_date)}</td>
                                      <td>{item.particular}</td>
                                      <td>{item.description }</td>
                                      <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                    </td>
                                    <td>{item?.mode?.name }</td>
                                    <td>{item.invoice_number }</td>
                                    {/* <td>{item.invoice_number }</td> */}
                                    <td style={{textAlign: "left"}}>
                                      <div 
                                      // onClick={() => handleEyeClick(item.id)} 
                                      className="btn btn-success-soft btn-sm mr-1">
                                      <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                      </div>
                                      <div 
                                      // onClick={() => handleTrashClick(item.id)} 
                                      className="btn btn-danger-soft btn-sm">
                                      <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                      </div>
                                      </td>

                                     {/* <td style={{textAlign: "right"}}>{parseFloat(item.credit).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                    </td> */}
                                    </tr>
                                  ))}
                                 {/* {accounts.length > 0 && (
                                  <>
                                    <td colSpan={3}>Total</td>
                                    <td style={{textAlign: 'right', fontWeight: "bold"}}>{totalDebit}</td>
                                    <td style={{textAlign: 'right', fontWeight: "bold"}}>{totalCredit}</td>
                                  </>
                                )} */}

                                </tbody>
                              </table>
                            </div>
                          )}


                              <div className={classes.endded}>
                              <p>
                                Showing {`Page ${currentPage} to ${totalPages} pages`} of {formattedTotalEntries} entries
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

                          {/* <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form style={{ marginTop: 20 }}>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Full Name"
                                      // autoFocus
                                      value={fullName1}
                                      onChange={(e) => setFullName1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Email Address"
                                      // autoFocus
                                      value={email1}
                                      onChange={(e) => setEmail1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Phone Number"
                                      // autoFocus
                                      value={phone1}
                                      onChange={(e) => setPhone1(e.target.value)}
                                    />

                                  </Form.Group>
                                </Form>
                              </Modal.Body>






                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                <Button variant="success" onClick={editUser}>
                                  {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                                </Button>
                              </Modal.Footer>
                            </Modal> */}
                          

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

export default Expenditures;