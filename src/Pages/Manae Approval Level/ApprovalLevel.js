import React, { useState, useEffect } from 'react';
import classes from '../Manae Role/ManageRole.module.css';
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


export default function ApprovalLevel() {
    const navigate = useNavigate();
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [fullName, setFullName] = useState("");
    const [fullName1, setFullName1] = useState("");
    const [phone, setPhone] = useState("");
    const [phone1, setPhone1] = useState("");
    const [email, setEmail] = useState("");
    const [email1, setEmail1] = useState("");
    const [selectedUserType, setSelectedUserType] = useState("");
    const [selectedUserType1, setSelectedUserType1] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedRole1, setSelectedRole1] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedMDA, setSelectedMDA] = useState("");
    const [selectedMDA1, setSelectedMDA1] = useState("");
    const [roleLoading, setRoleLoading] = useState(false);
    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [loader, setLoader] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState("");
    const [totalPages, setTotalPages] = useState(1);
  

    const handleEdit = () =>{
        navigate('/edit_media')
    }
    const addNew = () =>{
        navigate('/new_media')
    }

    const readData = async () => {
        try {
            const detail = await AsyncStorage.getItem('fullName');
            const details = await AsyncStorage.getItem('userToken');


            if (detail !== null) {
                setUser(detail);
            }


            if (details !== null) {
                setBearer(details);
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



    const fetchUsers = async () => {
      setUserLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/get-all-users?page=${currentPage}`, { headers });
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
        setUserLoading(false);
      }
    };



  useEffect(() => {
      if (bearer) {
          fetchUsers();
      }
  }, [bearer, currentPage]);

    const fetchRole = async () => {
        setRoleLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/role/get-roles`, { headers });
            const results = response.data?.data;
            setTableData1(results);
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
            }
            toast.error(errorMessage);
        } finally {
            setRoleLoading(false);
        }
    };



    useEffect(() => {
        if (bearer) {
            fetchRole();
        }
    }, [bearer]);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const handleUserTypeChange = (event) => {
        setSelectedUserType(event.target.value);
    };
    const handleUserTypeChange1 = (event) => {
        setSelectedUserType1(event.target.value);
    };
    const handleMDAChange = (event) => {
        setSelectedMDA(event.target.value);
    };
    const handleRoleChange1 = (event) => {
        setSelectedRole1(event.target.value);
    };
    const handleMDAChange1 = (event) => {
        setSelectedMDA1(event.target.value);
    };

    const createUser = async () => {
        setCreateLoading(true);
        try {
          const response = await axios.post(
            `${BASE_URL}/create-user`,
            {
              name: fullName,
              email: email,
              phone: phone,
              role_id: selectedRole,
              mda_id: selectedMDA,
              user_type: selectedUserType
             
            },
            { headers }
          );
          console.log(response)
          handleClose();
          setFullName('');
          setEmail('');
          setPhone('');
          setSelectedRole('');
          setSelectedMDA('');
          fetchUsers();
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
            }
            toast.error(errorMessage);
          } finally {
          setCreateLoading(false);
        }
      };

    const updateUser = async () => {
        setUpdateLoading(true);
      console.log(fullName1, email1, phone1, selectedRole1, selectedMDA1);
        try {
          const response = await axios.post(
            `${BASE_URL}/update-user`,
            {
              id: selectedUser,
              name: fullName1,
              email: email1,
              phone: phone1,
              role_id: selectedRole1,
              mda_id: selectedMDA1, 
              user_type: selectedUserType1
             
            },
            { headers }
          );
          handleClose1();
          toast.success(response.data.message);
          console.log(response.data);
          fetchUsers();
          setFullName1('');
          setEmail1('');
          setPhone1('');
          setSelectedRole1('');
          setSelectedMDA1('');
         
        
    
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
            }
            toast.error(errorMessage);
          } finally {
          setUpdateLoading(false);
        }
      };

      const fetchAllMDAs = async () => {
        setIsLoading(true);
        let allData = [];
        let currentPage = 1;
        let totalPages = 1;
    
        try {
          do {
            const response = await axios.get(`${BASE_URL}/get-all-mda?page=${currentPage}`, {
              headers: { 'Authorization': `Bearer ${bearer}` } // Include other headers if needed
            });
    
            const results = response.data?.data?.data || [];
            const total = response.data?.data?.last_page || 1;
            const resultx = response.data?.data?.total;
    
            allData = [...allData, ...results];
            totalPages = total;
            currentPage += 1;
    
            setTotalEntries(resultx); // You might want to set this only once
          } while (currentPage <= totalPages);
    
          setTableData2(allData); // Store the entire objects
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            navigate('/login');
          } else {
            const errorStatus = error.response?.data?.message;
            console.error(errorStatus);
            setTableData1([]);
          }
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        if (bearer) {
          fetchAllMDAs();
        }
      }, [bearer]);

      const handleEyeClick = (id) => {
        const foundUser = tableData.find(item => item.id === id);
        if (foundUser) {
            const { name, email, phone, mda, role_id, user_type } = foundUser;
            setSelectedUser(id);
            setFullName1(name || '');
            setPhone1(phone || '');
            setEmail1(email || '');
            setSelectedRole1(role_id || '');
            setSelectedMDA1(mda?.id || '');
            setSelectedUserType1(user_type || '');
    
            setShow1(true);
        } else {
            console.error(`User with id ${id} not found`);
        }
    };
    
    const handleTrashClick = async (id) => {
      try {
          const confirmed = await Swal.fire({
              title: 'Are you sure?',
              text: 'You are about to delete this user',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel',
            });
    
        if (!confirmed.isConfirmed) {
          return; 
        }
    
        const response = await axios.get(`${BASE_URL}/delete-user?id=${id}`, { headers });
        fetchUsers();
        toast.success(response.data.message);
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
        
      }
    };
    
    
    const handlePrevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleNextPage = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div>
        <MainDashoard />

        <div className={classes.finishedbodyCont}>
            <div className={classes.topPadding}>
                <div className={`${classes.formSecCont}`}>
                    <div className={classes.formSectionHeader}>
                        <h3>Manage Levels</h3>
                    </div>
                    <div className={classes.formSectionHeader}>
                        <h3 style={{color:'#2D995F'}}>{user}</h3>
                    </div>
                </div>
            </div>
            

        <div className={classes.mainform}>

    <div className={classes.loandgrantcards}>
    {/* <div className={classes.loandethead}>
        <p className={classes.loanText}>Post news on the website from the editor</p>
        <Button variant="light" onClick={addNews}><i class='bx bx-plus-circle'></i> Add New</Button>
    </div> */}
    <div className={classes.loandethead}>
        <div className={classes.formLabel}>
            {/* <h4 style={{color:'#2D995F'}}>Manage User</h4>
            <p className={classes.loanText}>Create and update your users...</p> */}
            {/* <p className={classes.loanText}>Home - Apps - eCommerce - Catalog</p> */}
        </div>
        <div className={classes.formIntBtn}>
            {/* <Button variant="light" className={classes.btn1}> Add Member</Button> */}
            <Button variant="success" onClick={handleShow} className={classes.btn2}>Add New Level</Button>
        </div>
    </div>

    <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
        <div className={classes.greenbtn} style={{ display: 'flex', gap:'20px' }}>
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
                // value={searchTerm}
                className="form-control form-control-sm"
                placeholder=""
                aria-controls="DataTables_Table_0"
                // onChange={(e) => {
                // setSearchTerm(e.target.value);
                
                
                // }}
            />
            </div>

        </div>
        </div>
    </div>

    {userLoading ? (
                            <p className={classes.fetchedTxt}>Fetching Users...</p>
                        ) : (
    <div className={classes.loanContainer}>
        <div className={classes.loanResponsive}>
        <Table striped bordered hover>
      <thead>
        <tr style={{whiteSpace: "nowrap"}}>
          <th>S/N</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>MDA</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {tableData.map((item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td style={{whiteSpace: "nowrap"}}>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td style={{width: "50%"}}>{item.mda?.name}</td>
            <td>{item?.roles[0]?.name}</td>
            <td className={classes.edit}>
                <div style={{display:'flex', gap:'10px' }}>
                <div onClick={() => handleEyeClick(item.id)}>
                    <i class='bx bx-edit-alt' ></i>
                    </div>
                    <div onClick={() => handleTrashClick(item.id)}>
                    <i class='bx bxs-trash' style={{color:'red'}}></i>
                    </div>
                </div>
            </td>
        </tr>
    ))}
        
        
      </tbody>
    </Table>
    <div className={classes.accrodBtns}>
        <Button onClick={handlePrevPage} variant='light' className={classes.prev}>Previous</Button>
            <p style={{ color:'#2D995F'}}>{currentPage} of {totalPages}</p>
        <Button onClick={handleNextPage} variant="success" className={classes.next}>Next</Button>
    </div>
            
        </div>
    </div>
)}
</div> 

</div>
<Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Full Name"
                              // autoFocus
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Phone Number"
                              // autoFocus
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Email Address"
                              // autoFocus
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Select User Type</Form.Label>
                            <Form.Select
        className="form-control"
        as="select"
        value={selectedUserType}
        onChange={handleUserTypeChange}
      >
        <option value="" disabled>Select User Type</option>
          <option value="admin">Admin</option>
          <option value="officer">Officer</option>
          <option value="mda">MDA Officer</option>
      </Form.Select>

      {(selectedUserType === "mda") && (
  <>
    <div style={{ marginTop: 10 }} />
    <Form.Label>Role</Form.Label>
    <Form.Select
      className="form-control"
      as="select"
      value={selectedRole}
      onChange={handleRoleChange}
    >
      <option value="" disabled>Select Role</option>
      {tableData1.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Select>
    
    <div style={{ marginTop: 10 }} />
    <Form.Label>MDA</Form.Label>
    <Form.Select
      className="form-control"
      as="select"
      value={selectedMDA}
      onChange={handleMDAChange}
    >
      <option value="" disabled>Select MDA</option>
      {tableData2.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Select>
  </>
)}

                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createUser}>
                    {createLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating user, Please wait...</span>
    </>
  ) : (
                "Create User"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>
<Modal show={show1} onHide={handleClose1} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update user</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Full Name"
                              // autoFocus
                              value={fullName1}
                              onChange={(e) => setFullName1(e.target.value)}
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
                            <Form.Label>Select User Type</Form.Label>
                            <Form.Select
        className="form-control"
        as="select"
        value={selectedUserType1}
        onChange={handleUserTypeChange1}
      >
        <option value="" disabled>Select User Type</option>
          <option value="admin">Admin</option>
          <option value="officer">Officer</option>
          <option value="mda">MDA Officer</option>
      </Form.Select>
      {(selectedUserType1 === "mda") && (
  <>
    <div style={{ marginTop: 10 }} />
    <Form.Label>Role</Form.Label>
    <Form.Select
      className="form-control"
      as="select"
      value={selectedRole1}
      onChange={handleRoleChange1}
    >
      <option value="" disabled>Select Role</option>
      {tableData1.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Select>
    
    <div style={{ marginTop: 10 }} />
    <Form.Label>MDA</Form.Label>
    <Form.Select
      className="form-control"
      as="select"
      value={selectedMDA1}
      onChange={handleMDAChange1}
    >
      <option value="" disabled>Select MDA</option>
      {tableData2.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Form.Select>
  </>
)}

                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose1}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={updateUser}>
                    {updateLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating user, Please wait...</span>
    </>
  ) : (
                "Update User"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

        </div>

    </div>
)
}