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
import Select from 'react-select';
import classes from '../Manage Members/ManageMember.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import Arrow from '../../../assets/promix/dArrow-down.svg'
import CoopDashboard from '../../Cooperative Dashboard/CoopDashboard';


function SavingsDeduction() {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [bearer, setBearer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [totalEntries, setTotalEntries] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const [selectedFile, setSelectedFile] = useState(null);
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
    const [user, setUser] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);

    const handleFileChange = (event) => {
      const files = event.target.files;
      const fileList = Array.from(files);
      setSelectedFile(fileList);
      
    };

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value1 = await AsyncStorage.getItem('tobi');
          const value2 = await AsyncStorage.getItem('companyId');
    
          if (value !== null) {
            setBearer(value);
          }
          if (value1 !== null) {
            setUser(value1);
          }
          if (value2 !== null) {
            setCompanyId(value2);
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

  const fetchSaving = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-monthly-deduction?page=${currentPage}`, { headers });
      const results = response.data?.data?.data;
      const resultx = response.data?.data?.total;
      setTotalEntries(resultx);
      setTableData(results);
      const total = response.data?.data?.last_page || 1;
      setTotalPages(total);
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
      fetchSaving();

    }
  }, [bearer, currentPage]);

  const createUser = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/create`,
        {
          name: fullName,
          email: email,
          phone_no: phone,
          role: selectedRole
        },
        { headers }
      );
      fetchSaving();
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.name;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.name,
      });
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await axios.get(`${BASE_URL}/destroy?id=${id}`, { headers });
      fetchSaving();
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

      fetchSaving();

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


  // const filteredData = tableData.filter(item => item.amount.toLowerCase().includes(searchTerm.toLowerCase()));

  // const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  // const displayedData = filteredData.slice(startIndexx - 1, endIndexx);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleCreate = () => {
    navigate('/create_savings_app');
  };

  const handleUpload = () => {
    navigate('/saving_excel');
  };

  const downloadUrl = `https://api-sme.promixaccounting.com/api/v1/download-template?company_id=${companyId}`;
  
  const fetchBanks = async () => {
    setBankLoading(true);
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
      setBanks([]);
    } finally {
      setBankLoading(false);
    }
  };

  
  
  const fetchSavingType = async () => {
    setSavingsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account/fetch-savings`, { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
        value: item.id,
      }));
      setSavingType(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setSavingType([]);
    } finally {
      setSavingsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchBanks();
      fetchSavingType();
    }
  }, [bearer]);

  const [selectedSavings, setSelectedSavings] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const handleSavingsChange = (selectedOption) => {
    setSelectedSavings(selectedOption);
  }

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
  }

  const [savingType, setSavingType] = useState([]);
  const [banks, setBanks] = useState([]);

  const [bankLoading, setBankLoading] = useState(false);
  const [savingsLoading, setSavingsLoading] = useState(false);


  const uploadExcel = async () => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile[0]);
      formData.append('description', description);
      formData.append('transaction_date', selectedDate);
      formData.append('bank', selectedBank.value);
      formData.append('type', selectedSavings.value);
      console.log(selectedBank, selectedSavings.value);
      const response = await axios.post(
        `${BASE_URL}/import-monthly-deduction-template`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${bearer}`,
          },
        }
      );
  
      toast.success(response.data.message);
      handleClose();
      fetchSaving();
  
      console.log(response.data.message);
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
        
        if (error.response?.data?.message) {
          if (typeof error.response.data.message === 'string') {
            errorMessage = error.response.data.message;
          } else if (Array.isArray(error.response.data.message)) {
            errorMessage = error.response.data.message.join('; ');
          } else if (typeof error.response.data.message === 'object') {
            errorMessage = JSON.stringify(error.response.data.message);
          }
        }
      toast.error(errorMessage);
  
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

 

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <CoopDashboard />
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Monthly Savings Deduction</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL SAVINGS</p>
                        <h5>N0</h5>
                        <div className={classes.perceCont}>
                            {/* <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p> */}
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                        <h5>N0</h5>
                        <div className={classes.perceCont}>
                            {/* <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p> */}
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                        <h5>N0</h5>
                        <div className={classes.perceCont}>
                            {/* <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p> */}
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
                    whiteSpace: 'nowrap'
                  }}
                >
                  {/* <Button variant="success" onClick={handleCreate}>
                    Add New
                  </Button> */}

                  <Button style={{marginLeft: 10, whiteSpace: "nowrap"}} variant="primary" onClick={handleShow}>
                  Upload Savings
                  </Button>

                  <a href={downloadUrl} download>
                  <Button style={{marginLeft: 10, whiteSpace: "nowrap"}} variant="secondary">
                  Download Excel Template
                  </Button>
                  </a>
                </div>

              </nav>
              {/* )} */}

              <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Savings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <div style={{marginTop:'10px'}}/>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Description"
                              // autoFocus
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <div style={{marginTop:'10px'}}/>
                            <Form.Label>Savings Account</Form.Label>
                            <Select
                                        value={selectedSavings}
                                        onChange={(selectedOption) => handleSavingsChange(selectedOption)}
                                        options={savingType}
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
                            <div style={{marginTop:'10px'}}/>
                            <Form.Label>Bank</Form.Label>
                            <Select
                                        value={selectedBank}
                                        onChange={(selectedOption) => handleBankChange(selectedOption)}
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
                            <div style={{marginTop:'10px'}}/>
                            <Form.Label>Upload Excel File</Form.Label>
                            <Form.Control
                              type="file"
                              accept=".xlsx, .xls, .csv" 
                              onChange={handleFileChange}
                            />
                           
                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={uploadExcel}>
                    {uploadLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Uploading, Please wait...</span>
    </>
  ) : (
                "Upload Saving"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>
              
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


                          {isLoading ? (
                            <p>Fetching accounts...</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                                  <tr>
                                  <th>S/N</th>
                                  <th>Transaction Date</th>
                                  <th>Description</th>
                                  <th>Member Number</th>
                                  <th>Member Name</th>
                                  <th>Savings Name</th>
                                  <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: 'nowrap' }}>
                                {tableData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.transaction_date}</td>
                                    <td >{item.description}</td>
                                    <td>{item.employee?.employee_no}</td>
                                    <td>{item.employee?.name}</td>
                                    <td style={{textAlign: "left"}}>{item?.account?.description}</td>
                                    <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
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

export default SavingsDeduction;