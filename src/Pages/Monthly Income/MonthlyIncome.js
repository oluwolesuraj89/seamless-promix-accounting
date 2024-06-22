import React, { useState, useEffect } from 'react';
import classes from '../Monthly Income/MonthlyIncome.module.css';
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


export default function MonthlyIncome() {
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [monthlyLoading, setMonthlyLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [user, setUser] = useState('');
    const [inputss, setInputss] = useState([]);
    const [totalDebit, setTotalDebit] = useState('');
    const [totalCredit, setTotalCredit] = useState('');
    const [totalCurrent, setTotalCurrent] = useState('');
    const [totalYearly, setTotalYearly] = useState('');



    const filteredData = tableData1.filter(item => item.account_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handleDateChange1 = (event) => {
        setSelectedEndDate(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
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

    const fetchMonths = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get-company-months`, { headers });
            const results = response.data?.data;
            setTableData(results);
            // console.log(results, "hereee");

        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData([]);
        } finally {
            setIsLoading(false);
        }
    };


    const fetchMonthExpenditure = async () => {
        setMonthlyLoading(true);
        try {
            let url = (`${BASE_URL}/reports/get-monthly-income-and-expenditure`);
            if (selectedMonth) {
                url += `?month=${selectedMonth}`;
            }
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            });
            const journalResult = response.data?.data?.journals;
            const ordinaryResult = response.data?.data;
            const totalCurr = response.data?.data?.totalIncome;
            const totalYearly = response.data?.data?.totalYearlyIncome;
// console.log(journalResult, ordinaryResult, totalCurr, totalYearly);
            setTableData1(journalResult);
            setTableData2(ordinaryResult);
            setTotalCurrent(totalCurr);
            setTotalYearly(totalYearly);

            // console.log(ordinaryResult, "journals");
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData1([]);
        } finally {
            setMonthlyLoading(false);
        }
    };

    useEffect(() => {
        fetchMonthExpenditure();
    }, [bearer, selectedMonth]);




    useEffect(() => {
        fetchMonths();
    }, [bearer]);





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



    return (
        <div>
            <MainDashoard />

            <div className={classes.finishedbodyCont}>
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Monthly Income</h3>
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
                </div>

                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className="card" style={{ width: '100%', border:"none"}}>
                        <div className="card-body" style={{ padding: '1.5rem 10.5rem 1.5rem 12.5rem', }}>
                                                       

                                                       <div className="row" style={{ marginTop: 30 }}>
                                                           <div className="col-lg-12">
                                                               <div >




                                                                  
                                                                       
                                                                           <div className="">
                                                                               <div className="form-group row">
                                                                                   <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400 text-align-center">Select Month:</label>
                                                                                   <div className="col-sm-12">
                                                                                       <Form.Select name="account" className="form-control" required="" value={selectedMonth} onChange={handleMonthChange}>
                                                                                           <option value="">Choose Month</option>
                                                                                           {tableData.map((item) => (
                                                                                               <option key={item} value={item}>
                                                                                                   {item}
                                                                                               </option>
                                                                                           ))}
                                                                                       </Form.Select>
                                                                                   </div>
                                                                               </div>
                                                                           

                                 
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                       <div className="row justify-content-center" style={{ marginTop: 30 }}>
                                                           <div className="col-md-6 text-center" >
                                                               <div className="form-group row">
                                                                   <Button disabled={monthlyLoading} variant='success' onClick={fetchMonthExpenditure}>
                                                                       {monthlyLoading ? (
                                                                           <>
                                                                               <Spinner size='sm' />
                                                                               <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                                           </>
                                                                       ) : (
                                                                           "Process"
                                                                       )}
                                                                   </Button>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                </div>
                                </div>
                                


                <div className={classes.mainform}>

                    <div className={classes.loandgrantcards}>

                        <div className="content-wrapper">



                            

                           




                            <div className="card" style={{border:"none"}}>
                                <div className="card-body">
                                    {/* <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="fs-17 font-weight-600 mb-0"></h6>
                                            </div>

                                        </div>
                                    </div> */}
                                    <div className="table-resposive">
                                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                                <div>
                                                    {tableData1.length > 0 && (
                                                        <button onClick={() => navigate('/accounting/reports/monthly_income/monthly_income_process', { state: { tableData1, tableData2 } })} style={{ height: 30, width: 150, borderRadius: 5 }}>PRINT REPORT</button>
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


                                        {monthlyLoading ? (
                                            <p>Fetching data...</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                                        <tr>
                                                            <th>Account Code</th>
                                                            <th>Account Name</th>
                                                            <th>Type</th>
                                                            <th>Current Month</th>
                                                            <th>Yearly</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ whiteSpace: 'nowrap' }}>
                                                        {displayedData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.account_code}</td>
                                                                <td>{item.account_name}</td>

                                                                <td >{item.type === 2 ? "CR" : "DR"}</td>

                                                                <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                                                    minimumIntegerDigits: 1,
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}</td>

<td style={{ textAlign: "right" }}>{parseFloat(item.yearly).toLocaleString('en-US', {
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
            </div>

        </div>
    )
}
