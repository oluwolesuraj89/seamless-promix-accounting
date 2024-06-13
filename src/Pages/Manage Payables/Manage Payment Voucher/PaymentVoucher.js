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
import classes from '../../Manage Cooperatives/Manage Members/ManageMember.module.css'
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import Arrow from '../../../assets/promix/dArrow-down.svg'



function PaymentVoucher() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState("");

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

  // const fetchPayment = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`${BASE_URL}/payment_voucher/pending_payment_list`, { headers });
  //     const results = response.data?.data;
  //     setTableData(results);
  //     // console.log(results);
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // Redirect to login page if unauthorized
  //       navigate('/login');
  //     } else {
  //     const errorStatus = error.response?.data?.message;
  //     console.log(errorStatus);
  //     setTableData([]);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  // useEffect(() => {
  //   if (bearer) {
  //     fetchPayment();

  //   }
  // }, [bearer]);

  const fetchPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/payment_voucher/pending_payment_list`, { headers });
      const results = response.data?.data?.payments;
      setTableData(results);
      console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
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
      fetchPayment();
      // fetchBankss();

    }
  }, [bearer]);




  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  const handleEyeClick = (id) => {

    const foundUser = tableData.find(item => item.id === id);


    const { name, email, phone_no, roles } = foundUser;


    setFullName1(name || '');
    setEmail1(email || '');
    setPhone1(phone_no || '');

    const selectedRole = roles.length > 0 ? roles[0].id : '';
    setSelectedRole(selectedRole);

    setShow1(true);
    setEyeClicked(true);
  };


  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/payment_voucher/delete-payment-voucher?id=${id}`, { headers });
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      setTrashClicked(true);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(errorStatus);
    }
  };

  const editUser = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/update`,
        {
          name: fullName1,
          // id: deptId, 
          email: email1,
          phone_no: phone1,
          role: selectedRole
        },
        { headers }
      );



      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });

      // console.log(response.data);
    } catch (error) {
      const errorStatus = error.response?.data?.message || 'An error occurred';

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  // const totalEntries = filteredData.length;
  // const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  // const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  // const displayedData = filteredData.slice(startIndexx - 1, endIndexx);

  const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleCreate = () => {
    navigate('/accounting/payables/payment_voucher/create_payment_voucher');
  };

  const handlePrintInvoice = (id) => {
    const selectedVoucher = tableData.find(item => item.id === id);
  
  
    navigate('/print_payment', { state: { selectedVoucher } });
  };

  const handleViewVoucher = (id) => {
    const selectedVoucher = tableData.find(item => item.id === id);
  
  
    navigate('/accounting/payables/payment_voucher/view_pending_payment_voucher', { state: { selectedVoucher } });
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
                            <h3>Payment Voucher</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    <div className={classes.analysis} style={{marginBottom:"30px"}}>
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
                <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "flex-end",
                    display: "flex",
                    marginLeft: "auto",
                  }}
                >
                  <Button variant="success" onClick={handleCreate}>
                    Add New Payment Voucher
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

                          <div className={classes.table}>
                            {isLoading ? (
                              <p>Fetching Users...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                    <th>S/N</th>
                                      <th>Beneficiary</th>
                                      <th>PV Number</th>
                                      <th>Date</th>
                                      {/* <th>Status</th> */}
                                      <th>Total Amount</th>
                                      <th>Amount Paid</th>
                                      <th>Balance</th>
                                    <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                  {displayedData.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.beneficiary === null ? item.description : item.beneficiary?.name}</td>
                                        <td>{item.pvnumber}</td>
                                        <td>{item.date}</td>
                                      {/* <td><Badge bg={item.payment_status === "0" ? "warning" : "success"}>{item.payment_status === "0" ? "Pending" : "Paid"}</Badge></td> */}
                                      {/* <td><Badge bg={item.approval_status === "0" ? "warning" : item.approval_status === "1" ? "success" : item.approval_status === "2" ? "danger" : "null"}>{item.approval_status === "0" ? "Pending" : item.approval_status === "1" ? "Approved" : item.approval_status === "2" ? "Disapproved" : "null"}</Badge></td> */}
                                      <td style={{ textAlign: "right" }}>{parseFloat(item.total_amount).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td style={{ textAlign: "right" }}>{parseFloat(item.amount_paid).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td style={{ textAlign: "right" }}>{parseFloat(item.balance).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td style={{textAlign: "left"}}>
                                          <div onClick={() => handleViewVoucher(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                          <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                          </div>
                                          <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                          <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                          </div>
                                          <div className="btn btn-sm printbtninv" onClick={() => handlePrintInvoice(item.id)}>
                                            <i className="fa fa-print dawg" style={{backgroundColor:'#e9f6ec', color:'#008a4b', padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                            </div>
                                        </td>
                                    </tr>
                                  ))}
                                </tbody>
                                </table>
                              </div>
                            )}
                          </div>
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

export default PaymentVoucher;