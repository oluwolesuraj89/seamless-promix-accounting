import React, { useState, useEffect, useRef } from 'react';
// import "../../../assetss/assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../../../assetss/assets/plugins/metisMenu/metisMenu.min.css";
// import "../../../assetss/assets/plugins/fontawesome/css/all.min.css";
// import "../../../assetss/assets/plugins/typicons/src/typicons.min.css";
// import "../../../assetss/assets/plugins/themify-icons/themify-icons.min.css";
// import "../../../assetss/assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
// import { InfoFooter } from '../../InfoFooter';
import Select from 'react-select';
import { toast } from 'react-toastify';
import classes from '../Manage Members/ManageMember.module.css'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner, Accordion, Badge, Form } from 'react-bootstrap';
// import favicon from '../../Im/ages/faviconn.png'
// import TableToPrint from './TableToPrint';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../../api/api';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import CurrencyInput from 'react-currency-input-field';
import CoopDashboard from '../../Cooperative Dashboard/CoopDashboard';

function EditDisburseLoan() {
  const location = useLocation();
  const { selectedLoan } = location.state || {};
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedLoan1, setSelectedLoan] = useState('');
  const [principalAmount, setPrincipalAmount] = useState('');
  const [loanInterest, setLoanInterest] = useState(0.00);
  const [interest, setInterest] = useState(0.00);
  const [totalRepayment, setTotalRepayment] = useState(0.00);
  const [monthlyDeduction, setMonthlyDeduction] = useState('');
  const [cheque, setCheque] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [bearer, setBearer] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };





  // const handleReportChange = (e) => {
  //   setSelectedReport(e.target.value);
  // };



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

  const goBack = () => {
    navigate(-1);
  }



  const fetchSupplierss = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/customer/no-pagination`, { headers });
      const results = response.data?.data;

      const options = results.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setCustomers(results);
      setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account/fetch-loans`, { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
        value: item.id,
        interest: item.interest
      }));
      setLoans(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (bearer) {
      fetchSupplierss();
      fetchLoans();
      fetchBanks();
    }
  }, [bearer]);


  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
  }

  const handleLoanTypeChange = (selectedOption) => {
    setSelectedLoan(selectedOption);
    const selectedLoanInterest = selectedOption.interest;
    setLoanInterest(selectedLoanInterest === null ? "0.00" : selectedLoanInterest);
  }

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
  }

  const handleValueChange = (value, name, values) => {
    setPrincipalAmount(value);
  };

  const handleValueChange1 = (value, name, values) => {
    setLoanInterest(value);
  };

  const handleValueChange2 = (value, name, values) => {
    setInterest(value);
  };

  const handleValueChange3 = (value, name, values) => {
    setTotalRepayment(value);
  };

  const handleValueChange4 = (value, name, values) => {
    setMonthlyDeduction(value);
  };

  useEffect(() => {
    const calculateInterestRate = () => {
      const calculatedInterestRate = (parseFloat(loanInterest) / 100) * parseFloat(principalAmount);
      const formattedInterestRate = isNaN(calculatedInterestRate) ? "0.00" : calculatedInterestRate.toFixed(2);

      setInterest(formattedInterestRate);
    };

    calculateInterestRate();
  }, [loanInterest, principalAmount]);


  useEffect(() => {
    const calculateTotalRepayment = () => {
      const calculatedTotalRepayment = parseFloat(principalAmount) + parseFloat(interest);
      const formattedTotalRepayment = isNaN(calculatedTotalRepayment) ? "0.00" : calculatedTotalRepayment.toFixed(2);

      setTotalRepayment(formattedTotalRepayment);
    };

    calculateTotalRepayment();
  }, [interest, principalAmount]);

  useEffect(() => {
    const calculateReturn = () => {
      const calculatedReturn = parseFloat(totalRepayment) / parseFloat(duration);
      const formattedReturn = isNaN(calculatedReturn) ? "0.00" : calculatedReturn.toFixed(2);

      setMonthlyDeduction(formattedReturn);
    };

    calculateReturn();
  }, [totalRepayment, duration]);



  const createLoan = async () => {
    setCreateLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/account/staff-loan`,
        {
          member_name: selectedCustomer.value,
          loan_name: selectedLoan.value,
          bank: selectedBank.value,
          principal_amount: principalAmount,
          interest_amount: interest,
          total_repayment: totalRepayment,
          monthly_deduction: monthlyDeduction,
          loan_interest: loanInterest,
          duration: duration,
          transaction_date: selectedDate,
          cheque_number: cheque


        },
        { headers }
      );
      console.log(response.data.message)

      navigate(-1);

      toast.success(response.data.message)
    
            
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
      setCreateLoading(false);
    }
  };



  return (
    <div>
      <CoopDashboard />
      <div className='newBody'>
        <div className={classes.newWidth}>
          <div className={classes.topPadding}>
            <div className={`${classes.formSecCont}`}>
              <div className={classes.formSectionHeader}>
                <h3>Create New Member Loan</h3>
                {/* <small>Create and view your loan accounts...</small> */}
              </div>
              <div className={classes.formSectionHeader}>
                <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
              </div>
            </div>
          </div>
          <div className="wrapper">



            {/* <!-- Page Content  --> */}
            <div className="content-wrapper">



              <div className="main-content">


                <div className="content-header row align-items-center m-0">

                  <div className="col-sm-12 header-title p-0">
                    <div className={classes.actionBtns}>
                      {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div> */}
                      {/* <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <h4 className="font-weight-bold">Create Savings Account </h4>
                                                    <small>Complete the respective fields ....</small>
                                                </div>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                                                </div>
                                            </div> */}

                    </div>

                  </div>
                </div>
              </div>

              <div className="body-content">



                <div className="col-lg-12">
                  <div className="card" style={{ border: 'none' }}>
                    <div className={classes.contentCont} style={{ padding: '20px' }}>
                      {/* <div>
                                                <h5 style={{marginLeft: 20}}>Personal Details</h5>
                                            </div> */}
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card" style={{ borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderRadius: '0' }}>
                          <div className="card-body" >
                            <div className="card-body" >

                              {/* <div className={classes.formSec}> */}
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date:</label>
                                      <div className="col-sm-9">
                                        <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedLoan.transaction_date} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Member:</label>
                                      <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" disabled name="customer" value={selectedLoan.beneficiary?.name} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Type:</label>
                                      <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" disabled name="loan type" value={selectedLoan.loan?.description} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Principal Amount:</label>
                                      <div className="col-sm-9">
                                        {/* <div className="form-control" > */}
                                        <CurrencyInput

                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={selectedLoan.principal_amount} 
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      </div>

                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Interest</label>
                                      <div className="col-sm-9">
                                      <CurrencyInput

name="loan interest"
decimalsLimit={2}
className="form-control"
value={selectedLoan.loan_interest} 
disabled

style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
/>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Interest</label>
                                      <div className="col-sm-9">
                                      <CurrencyInput

name="loan interest"
disabled
decimalsLimit={2}
className="form-control"
value={selectedLoan.interest_amount} 

style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
/>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{marginTop: 20}}/>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Repayment</label>
                                      <div className="col-sm-9">
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={selectedLoan.total_repayment} 
                                        
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Duration (Months)</label>
                                      <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" disabled name="duration" value={selectedLoan.duration} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Monthly Deduction</label>
                                      <div className="col-sm-9">
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={selectedLoan.monthly_deduction} 
                                        
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Select Bank</label>
                                      <div className="col-sm-9">
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
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group row">
                                      <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Cheque No.</label>
                                      <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" disabled name="cheque no" value={selectedLoan.cheque_number} />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              {/* </div> */}

                              <div style={{ marginTop: 20 }} />
                              <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                                <Button variant="success" className={classes.btn1}> Approve Loan</Button>
                                <Button variant="danger" className={classes.btn2}> Disapprove Loan</Button>

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
        </div>
      </div>
      {/* <InfoFooter /> */}
    </div>
  )
}

export default EditDisburseLoan;