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


export default function ManageCategory() {
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
      const response = await axios.get(`${BASE_URL}/get-classes`, { headers });
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

  

  useEffect(() => {
    if (bearer) {
      fetchData();
    
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


  const filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

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
      <MainDashoard />

      <div className={classes.finishedbodyCont}>
        <div className={classes.topPadding}>
          <div className={`${classes.formSecCont}`}>
            <div className={classes.formSectionHeader}>
              <h3>Manage Category</h3>
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
                {/* <Button variant="success" onClick={handleShow} className={classes.btn2}> Add New User</Button> */}
              </div>
            </div>
            

                 


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
            <div className={classes.mainTable}>
            {roleLoading ? (
                              <p>Fetching Categories...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                            <tr>
                            <th>S/N</th>
                                  <th>Description</th>
                                  <th>Created at</th>
                                  <th>Updated at</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap', }}>
                            {displayedData.map((item, index) => (
                             <tr key={index}>
                             <td>{index + 1}</td>
                             <td>{item.description}</td>
                             <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                             <td>{formatDate(item.updated_at)}</td>
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