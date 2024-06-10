import React, { useState, useEffect } from 'react';
import classes from './ManageRole.module.css';
import "../../assets/datatables/dataTables.bootstrap4.min.css";
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
// import Folder from '../../Images/folder-2.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ArrowLogo from '../../Images/arrow-left.svg';
// import LoanImage from '../../Images/loan bg.svg';
import MainDashoard from '../Main Dashboard/MainDashoard';
// import Ready from '../../Images/nothing.svg'
// import Ready1 from '../../Images/review.svg';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CurrencyInput from 'react-currency-input-field';


export default function Charts() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [bearer, setBearer] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [trashClicked, setTrashClicked] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [selectedRole1, setSelectedRole1] = useState("");
  const [phone, setPhone] = useState("");
  const [roless, setRoless] = useState([]);
  const [address, setAddress] = useState("");
  const [office_address, setOfficeAddress] = useState("");
  const [selectedId, setSelectedId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [glname, setGlname] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubCategory1, setSelectedSubCategory1] = useState('');
  const [glname1, setGlname1] = useState("");
  const [balance1, setBalance1] = useState("");
  const [selectedDirection1, setSelectedDirection1] = useState("");
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedChart, setSelectedChart] = useState('')
  const [tableData2, setTableData2] = useState([]);
  const [glcode, setGlcode] = useState("");

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('tobi');
      const value2 = await AsyncStorage.getItem('permissions');
      const value3 = await AsyncStorage.getItem('admin');

      if (value !== null) {
        setBearer(value);
      }
      if (value1 !== null) {
        setUser(value1);
      }
      if (value2 !== null) {
        setPermissions(value2);
      }
      if (value3 !== null) {
        setAdmin(value3);
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



  const fetchData = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account`, { headers });
      const results = response.data?.data;
      // console.log(results);
      setTableData(results);
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
      setRoleLoading(false);
    }
  };

  const fetchData1 = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-sub-categories`, { headers });
      const subCat = response.data?.data;
      setTableData2(subCat);
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
      fetchData();
      fetchData1();
    }
  }, [bearer]);

  const handleSubCatChange = (event) => {
    setSelectedSubCategory(event.target.value);
};
  const handleSubCatChange1 = (event) => {
    setSelectedSubCategory1(event.target.value);
};
 
const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
};
const handleDateChange1 = (event) => {
  setSelectedDate1(event.target.value);
};

  const createAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/account/add`,
        {
          sub_category_id: selectedSubCategory,
          gl_name: glname,
          opening_balance: balance,
          direction: selectedDirection,
          transaction_date: selectedDate
         
        },
        { headers }
      );
      console.log(response)
      fetchData();
      handleClose();
      setGlcode('');
    setGlname('');
    setBalance('');
    setSelectedSubCategory('');
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


  const filteredData = tableData.filter(item => item.gl_name.toLowerCase().includes(searchTerm.toLowerCase()));

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


  const handleEyeClick = (id) => {

    const foundCharts = tableData.find(item => item.id === id);
    const chartId = foundCharts.id;
    setSelectedChart(chartId)

    const { gl_code, gl_name, balance, direction, transaction_date} = foundCharts;
    setSelectedSubCategory1(gl_code || '');
    setGlname1(gl_name|| '');
    setBalance1(balance || '');
    setSelectedDirection1(direction || '');
    setSelectedDate1(transaction_date || '');
    // const selectedRole = roles.length > 0 ? roles[0].id : '';
    // setSelectedRole(selectedRole);

    setShow1(true);
    setEyeClicked(true);
  };
  useEffect(() =>{

  },{selectedChart}

  )



const editUser = async (id) => {
  setUpdateLoading(true);

  try {
    const response = await axios.post(
      `${BASE_URL}/users/update-user`,
      {
        name: fullName1,
        id: selectedId, 
        email: email1,
        phone_no: phone1,
        role: selectedRole1,
        user_id: selectedUser
      },
      { headers }
    );

    fetchData();
handleClose1();
    toast.success(response.data.message);
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
                toast.error(errorMessage);
                console.log(error);
            }
  } finally {
    setUpdateLoading(false);
  }
};


  const handleTrashClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this role.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (!confirmed.isConfirmed) {
      return; // User canceled, do nothing
    }

    try {
      const response = await axios.get(`${BASE_URL}/account/delete?id=${id}`, { headers });
      fetchData();
     toast.success(response.data.message);
      setTrashClicked(true);
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
    }
  };

  const handleDirectionChange = (e) => {
    setSelectedDirection(e.target.value);
  };
  const handleDirectionChange1 = (e) => {
    setSelectedDirection1(e.target.value);
  };

  const handleValueChange = (value, name, values) => {
    setBalance(value); // Update the balance state
    console.log(value, name, values);
  };
  const handleValueChange1 = (value1, name1, values1) => {
    setBalance1(value1); // Update the balance state
    console.log(value1, name1, values1);
  };
  

  return (
    <div>
      <MainDashoard />

      <div className={classes.finishedbodyCont}>
        <div className={classes.topPadding}>
          <div className={`${classes.formSecCont}`}>
            <div className={classes.formSectionHeader}>
              <h3>Manage Charts of Account</h3>
            </div>
            <div className={classes.formSectionHeader}>
              <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
            </div>
          </div>
        </div>


        <div className={classes.mainform}>

          <div className={classes.loandgrantcards}>
           
            <div className={classes.loandethead}>
              <div className={classes.formLabel}>
              </div>
              <div className={classes.formIntBtn}>
                <Button variant="success" onClick={handleShow} className={classes.btn2}>  Add New Account</Button>
              </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create Chart Of Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form >
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ marginTop: 20 }}>Gl Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Gl Name"
                              value={glname}
                              onChange={(e) => setGlname(e.target.value)}
                            />

                            <Form.Label style={{ marginTop: 20 }}>Account Type</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedSubCategory}
                              onChange={handleSubCatChange}
                            >
                              <option value="" disabled>Select Type</option>
                              {tableData2.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.description}
                                </option>
                              ))}
                            </Form.Select>

                            <Form.Label style={{ marginTop: 20 }}>Direction</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedDirection}
                              onChange={handleDirectionChange}
                            >
                              <option value="" disabled>Select Direction</option>
                              <option value="1" >Debit</option>
                              <option value="2" >Credit</option>
                          
                            </Form.Select>
                            
                            <Form.Label style={{ marginTop: 20 }}>Opening Balance</Form.Label> <br />
                            
                            <CurrencyInput
                              id="exampleForm.ControlInput1"
                              name="Balance"
                              placeholder="Enter Opening balance"
                              decimalsLimit={2}
                              value={balance} // Set the value to the balance state
                                  onValueChange={handleValueChange}
                              style={{
                                
                          minWidth: "100%",
                          height: "calc(1.8em + .75rem + 2px)",
                          border: '1px solid #e4e5e7',
                          borderRadius: 5,
                          overflow: 'hidden',
                          zIndex: 999,
                          fontSize: 14,
                          padding: ".375rem .75rem"
                        }}
                  />
                  <Form.Label style={{ marginTop: 20 }}>Balance as at</Form.Label>

                  <input
                    className="form-control"
                    required=""
                    type="date"
                    onChange={handleDateChange}
                    name="date"
                    value={selectedDate}
                  />

                        
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createAccount}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating account, Please wait...</span>
    </>
  ) : (
                "Create"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit Chart Of Accounts</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                        <Form >
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ marginTop: 20 }}>Gl Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Gl Name"
                              value={glname1}
                              onChange={(e) => setGlname1(e.target.value)}
                            />

                            <Form.Label style={{ marginTop: 20 }}>Account Type</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedSubCategory1}
                              onChange={handleSubCatChange1}
                            >
                              <option value="" disabled>Select Type</option>
                              {tableData2.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.description}
                                </option>
                              ))}
                            </Form.Select>

                            <Form.Label style={{ marginTop: 20 }}>Direction</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedDirection1}
                              onChange={handleDirectionChange1}
                            >
                              <option value="" disabled>Select Direction</option>
                              <option value="1" >Debit</option>
                              <option value="2" >Credit</option>
                          
                            </Form.Select>
                            
                            <Form.Label style={{ marginTop: 20 }}>Opening Balance</Form.Label> <br />
                            
                            <CurrencyInput
                    id="exampleForm.ControlInput1"
                    name="Balance"
                    placeholder="Enter Opening balance"
                    decimalsLimit={2}
                    value={balance1} // Set the value to the balance state
                        onValueChange={handleValueChange1}
                    style={{
                      
                      minWidth: "100%",
                      height: "calc(1.8em + .75rem + 2px)",
                      border: '1px solid #e4e5e7',
                      borderRadius: 5,
                      overflow: 'hidden',
                      zIndex: 999,
                      fontSize: 14,
                      padding: ".375rem .75rem"
                    }}
                  />
                  <Form.Label style={{ marginTop: 20 }}>Balance as at</Form.Label>

                  <input
                    className="form-control"
                    required=""
                    type="date"
                    onChange={handleDateChange1}
                    name="date"
                    value={selectedDate1}
                  />

                        
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                {/* <Button variant="success" onClick={editUser}> */}
                                <Button variant="success" >
                                  {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                                </Button>
                              </Modal.Footer>
                            </Modal>


            <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
              <div className={classes.greenbtn} style={{ display: 'flex', gap: '20px' }}>
                <div className={classes.actionsBtns}>
                  <Button variant='success'>Copy</Button>
                  <Button variant='success'>Excel</Button>
                  <Button variant='success'>PDF</Button>
                  <Button variant='success'>Column visibility</Button>
                </div>
                <div>
                  <label className="d-flex justify-content-start align-items-center">
                    Show
                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm"
                    //  value={entriesPerPage}
                    //     onChange={(e) => {
                    //     setEntriesPerPage(parseInt(e.target.value));
                    //     setCurrentPage(1);
                    //     }}
                    >
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
            <div className={classes.mainTable}>
            {roleLoading ? (
                              <p>Fetching charts...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                            <tr>
                            <th>S/N</th>
                                      <th>Account Code</th>
                                      <th>Account Name</th>
                                      <th>Account Type</th>
                                      <th>Category</th>
                                      <th>Sub Category</th>
                                      {/* <th>Opening Balance</th> */}
                                      <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap', }}>
                            {displayedData.map((item, index) => (
                             <tr key={index}>
                            <td>{index + 1}</td>
                                        <td>{item.gl_code}</td>
                                        <td style={{textAlign: "left"}}>{item.gl_name}</td>
                                        <td>{item.class?.description}</td>
                                        <td>{item.category?.description}</td>
                                        <td style={{textAlign: "left"}}>{item.subcategory?.description}</td>
                                <td>
                                {(admin === "1" || permissions.includes('update-account')) && (
                                  <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                    <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                  </div>
)}
                                  {(admin === "1" || permissions.includes('delete-account')) && (
                                  <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                    <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                  </div>
)}
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

   


    

    </div >
)
}