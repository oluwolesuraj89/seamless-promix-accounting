import React, { useState, useEffect } from 'react';
import classes from '../Trial balance/Trial_balance.module.css';
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


export default function TrialBalance() {
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



    const filteredData = accounts.filter(item => item.details.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);


    const fetchBankss = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
            const results = response.data?.data;

            setTableData(results);
            // console.log(results);
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


    const fetchAccounts = async () => {
        setLoad(true);
        try {
            const response = await axios.get(`${BASE_URL}/reports/get-trial-balance`, {
                params: {

                    start_date: selectedDate || `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
                    end_date: selectedEndDate || `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            });
            const resultsss = response.data?.data?.journal;
            setAccounts(resultsss);

            const resultssx = response.data?.data?.input;
            setInputss(resultssx);


        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoad(false);
        }
    };


    useEffect(() => {
        if (inputss) {
            const creditTotal = inputss
                .filter((item) => !isNaN(item.nCredit) && item.nCredit !== "")
                .reduce((total, item) => total + parseFloat(item.nCredit), 0);

            const debitTotal = inputss
                .filter((item) => !isNaN(item.nDebit) && item.nDebit !== "")
                .reduce((total, item) => total + parseFloat(item.nDebit), 0);

            // Format the numbers with commas and two decimal places
            const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            setTotalDebit(formattedDebitTotal);
            setTotalCredit(formattedCreditTotal);
        }
    }, [inputss]);









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
                            <h3>Trial Balance</h3>
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
                </div>


                <div className={classes.mainform}>

                    <div className={classes.loandgrantcards}>

                        <div className="content-wrapper">



                            <div className="main-content">


                                <div className="content-header row align-items-center m-0">

                                    <div className="col-sm-8 header-title p-0" >
                                        <div className="media">
                                            <div className="header-icon text-success mr-3">
                                                {/* <i className=""> <img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i> */}
                                            </div>
                                            {/* <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", minWidth: '900px', }}>
                                                <div>
                                                    <h1 className="font-weight-bold">Trial Balance </h1>
                                                    <small>Complete the respective fields ....</small>
                                                </div>

                                            </div> */}

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="body-content">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="create-new-staff-card-header">
                                            <div className="d-flex justify-content-between align-items-center">

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">




                                                    <div className="card-body" style={{ padding: '1.5rem 10.5rem 1.5rem 12.5rem', }}>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                {/* <div className="form-group row">
                                                                    <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400 text-align-center">Bank Account:</label>
                                                                    <div className="col-sm-12">
                                                                        <Form.Select name="account" className="form-control" required="" value={selectedBank} onChange={handleBank}>
                                                                            <option value="">Choose Bank</option>
                                                                            {tableData.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.gl_name}
                                                                                </option>
                                                                            ))}
                                                                        </Form.Select>
                                                                    </div>
                                                                </div> */}
                                                            </div>

                                                            <div className="row" style={{ marginTop: 30 }}>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">
                                                                            Start Date:
                                                                        </label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="date" onChange={handleDateChange} name="start" value={selectedDate} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">
                                                                            End Date:
                                                                        </label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="date" onChange={handleDateChange1} name="end" value={selectedEndDate} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center" style={{ marginTop: 30 }}>
                                                                <div className="col-md-4 text-center" >
                                                                    <div className="form-group row">
                                                                        <Button variant='success' onClick={fetchAccounts}>
                                                                            {load ? (
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
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="card">
                                <div className="card-body">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="fs-17 font-weight-600 mb-0"></h6>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="table-resposive">
                                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                                <div>
                                                    {accounts.length > 0 && (
                                                        <button onClick={() => navigate('/process_cash_book', { state: { accounts, inputss } })} style={{ height: 30, width: 150, borderRadius: 5 }}>PRINT REPORT</button>
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

                                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                                        <tr>
                                                        <th>Account Number</th>
                                    <th>Account Name</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                   
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ whiteSpace: 'nowrap' }}>
                                                        {displayedData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.code}</td>
                                                                <td>{item.name}</td>
                                                                <td style={{ textAlign: "right" }}>{item.nDebit === "" ? '0.00' :
                                                                    (isNaN(item.nDebit)
                                                                        ? '0.00'
                                                                        : parseFloat(item.nDebit).toLocaleString('en-US', {
                                                                            minimumIntegerDigits: 1,
                                                                            minimumFractionDigits: 2,
                                                                            maximumFractionDigits: 2
                                                                        }))}</td>
                                                                <td style={{ textAlign: "right" }}>{item.nCredit === "" ? '0.00' :
                                                                    (isNaN(item.nCredit)
                                                                        ? '0.00'
                                                                        : parseFloat(item.nCredit).toLocaleString('en-US', {
                                                                            minimumIntegerDigits: 1,
                                                                            minimumFractionDigits: 2,
                                                                            maximumFractionDigits: 2
                                                                        }))}</td>


                                                            </tr>
                                                        ))}
                                                        {inputss.length > 0 && (
                                                            <>
                                                                <td colSpan={2}>Total</td>
                                                                <td style={{ textAlign: 'right', fontWeight: "bold" }}>{totalDebit}</td>
                                                                <td style={{ textAlign: 'right', fontWeight: "bold" }}>{totalCredit}</td>
                                                            </>
                                                        )}

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
