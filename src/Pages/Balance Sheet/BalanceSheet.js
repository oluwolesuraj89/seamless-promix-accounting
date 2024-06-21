import React, { useState, useEffect } from 'react';
import classes from '../Balance Sheet/BalanceSheet.module.css';
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
// import favicon from '../../Images/faviconn.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import styled from 'styled-components';


export default function BalanceSheet() {
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [tableData, setTableData] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [inputss, setInputss] = useState([]);
    const [totalDebit, setTotalDebit] = useState('');
    const [totalCredit, setTotalCredit] = useState('');




    const filteredData = accounts ? accounts.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase())) : [];
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handleDateChange1 = (event) => {
        setSelectedEndDate(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

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

    const fetchAccounts = async () => {
        setLoad(true);
        try {
            const response = await axios.get(`${BASE_URL}/reports/balance-sheet`, {
                params: {},
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            });
            const resultsss = response.data?.data;
            setAccounts(resultsss);

           
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.error(errorStatus);
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [bearer]);

    const fetchBankss = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
            const results = response.data?.data || [];
            setTableData(results);
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

    const totalAmount = displayedData.reduce((total, item) => total + parseFloat(item.amount), 0);


    const Row = styled.div`
    width: 100% !important;
    display: flex;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
    gap: 1%
  `;


    return (
        <div>
            <MainDashoard />

            <div className={classes.finishedbodyCont}>
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Balance Sheet</h3>
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className="card" style={{width: '100%'}}>
                            <div className="card-body" >
                            <div className="table-resposive">
                    <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                      <div className={classes.greenbtn} style={{ display: 'flex', }}>
                        <div>
                          {accounts.length > 0 && (
                            <button onClick={() => navigate('/accounting/reports/balance_sheet/balance_sheet_print', { state: { accounts } })} style={{ height: 30, width: 150, borderRadius: 5 }}>PRINT REPORT</button>
                          )}
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


                    {load ? (
                      <p>Fetching data...</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
                          <thead style={{ whiteSpace: 'nowrap', textAlign: "center" }}>
                            <tr>
                              <th>Description</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap' }}>
                            {displayedData.map((item, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <th colSpan={4}>{item.description.toUpperCase()}</th>
                                </tr>
                                {item.categories?.map((category, catIndex) => (
                                  <React.Fragment key={catIndex}>
                                    <tr>
                                      <th colSpan={4} >{category.description}</th>
                                    </tr>
                                    {category.postings.map((posting, postIndex) => (
                                      <tr key={postIndex}>
                                        <td>{posting.name}</td>
                                        <td style={{ textAlign: "right" }}>
                                          {parseFloat(posting.amount).toLocaleString('en-US', {
                                            minimumIntegerDigits: 1,
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                          })}
                                        </td>
                                      </tr>
                                    ))}
                                    <tr>
                                      <td colSpan={1} style={{ fontWeight: 'bold' }}>Total </td>
                                      <td style={{ textAlign: "right", fontWeight: 'bold' }}>
                                        {parseFloat(category.total).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}
                                      </td>
                                    </tr>
                                    <tr><td colSpan={4}>&nbsp;</td></tr>
                                  </React.Fragment>
                                ))}
                              </React.Fragment>
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

        </div>
    )
}
