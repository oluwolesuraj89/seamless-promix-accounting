import React, { useState, useEffect } from 'react';
import classes from './ManageBooking.module.css';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
// import Folder from '../../Images/folder-2.svg';
import axios from 'axios';
import Arrow from '../../../assets/promix/dArrow-down.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ArrowLogo from '../../Images/arrow-left.svg';
// import LoanImage from '../../Images/loan bg.svg';
import MainDashboard from '../../Main Dashboard/MainDashoard';
// import Ready from '../../Images/nothing.svg'
// import Ready1 from '../../Images/review.svg';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


export default function ManageBooking() {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [user, setUser] = useState('');
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/booking`, { headers });
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
      setIsLoading(false);
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


  const filteredData = tableData.filter(item => item.particulars.toLowerCase().includes(searchTerm.toLowerCase()));

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

    const foundBooking = tableData.find(item => item.id === id);
    navigate('/edit_booking', { state: { selectedBooking: foundBooking } });
  };





  const handleTrashClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this booking.',
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
      const response = await axios.get(`${BASE_URL}/destroy?id=${id}`, { headers });
      fetchData();
     toast.success(response.data.message);
  
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

  const handleCreate = () => {
    navigate('/create_booking');
  };

  const handlePrintInvoice = (id) => {
    const selectedBooking = tableData.find(item => item.id === id);
  
  
    navigate('/booking_receipt', { state: { selectedBooking } });
  };

  return (
    <div>
      <MainDashboard />

      <div className={classes.finishedbodyCont}>
        <div className={classes.topPadding}>
          <div className={`${classes.formSecCont}`}>
            <div className={classes.formSectionHeader}>
              <h3>Manage Booking</h3>
            </div>
            <div className={classes.formSectionHeader}>
              <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
            </div>
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


        <div className={classes.mainform}>

          <div className={classes.loandgrantcards}>
           
            <div className={classes.loandethead}>
              <div className={classes.formLabel}>
              </div>
              <div className={classes.formIntBtn}>
                <Button variant="success" onClick={handleCreate} className={classes.btn2}> Add New Booking</Button>
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
            {isLoading ? (
                              <p>Fetching bookings...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                            <tr>
                            <th>S/N</th>
                                  <th>Particulars</th>
                                  <th>Booking Order</th>
                                  <th>Event Date</th>
                                  <th>Start Time</th>
                                  <th>End Time</th>
                                  <th>Amount</th>
                                  <th>Booked Date</th>
                                  <th>Status</th>
                                  <th>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap', }}>
                            {displayedData.map((item, index) => (
                             <tr key={index}>
                            <td>{index + 1}</td>
                                    <td>{item.particulars}</td>
                                    <td style={{textAlign: "left"}}>{item.booking_order}</td>
                                    <td>{item.event_date}</td>
                                    <td>{item.start_hour}</td>
                                    <td style={{textAlign: "left"}}>{item.end_hour}</td>
                                    <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                                    <td style={{textAlign: "left"}}>{item.status}</td>
                                <td>
                                {(admin === "1" || permissions.includes('view-advance-booking')) && (
                                  <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                    <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 5, borderColor: "#28a7454d", borderRadius: 5}}></i>
                                  </div>
)}
{(admin === "1" || permissions.includes('delete-advance-booking')) && (
                                  <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                    <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 5, borderColor: "#dc35454d", borderRadius: 5}}></i>
                                  </div>
)}
<div onClick={() => handlePrintInvoice(item.id)} className="btn btn-sm printbtninv">
                                    <i className="fa fa-print dawg"  style={{color: "#17a2b8", backgroundColor: "#afe1e9", padding: 5, borderColor: "#b0d1d6", borderRadius: 5}}></i>
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

   


    

    </div >
)
}