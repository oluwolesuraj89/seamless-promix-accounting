import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';

import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';

import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button, Spinner } from 'react-bootstrap'
import classes from '../../Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Arrow from '../../assets/promix/dArrow-down.svg'
import { useNavigate, useLocation } from 'react-router-dom';
// import { BASE_URL } from '../../api/api';
// import CurrencyInput from 'react-currency-input-field';

export default function EditLaonAdvance() {

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [duration, setDuration] = useState('');
  // const [selectedLoan, setSelectedLoan] = useState('');
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
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [user, setUser] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const location = useLocation();
    const { selectedLoan } = location.state || {};

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      if (value !== null) {
        setBearer(value);
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
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/customer', { headers });
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
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account/fetch-loans', { headers });
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
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${1}`, { headers });
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

// const handleLoanTypeChange = (selectedOption) => {
//   setSelectedLoan(selectedOption);
//   const selectedLoanInterest = selectedOption.interest;
//   setLoanInterest(selectedLoanInterest === null ? "0.00" : selectedLoanInterest);
// }

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

console.log(selectedCustomer.value, selectedLoan.value, selectedBank.value, principalAmount, interest, totalRepayment,  loanInterest);

const createLoan = async () => {
  setCreateLoading(true);
  try {
    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/account/staff-loan',
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
    
    navigate('/loans_advances')

    // return
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
    });
    console.log(response.data);

  } catch (error) {
    const errorStatus = error.response.data.message;
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorStatus,
    });
    console.log(error);
  } finally {
    setCreateLoading(false);
  }
};



  return (
    <div>
      <MainDashoard/>

    <div className={classes.newWidth}>
        <div className={classes.topPadding}>
            <div className={`${classes.formSecCont}`}>
                <div className={classes.formSectionHeader}>
                    <h3>View Loan & Advance </h3>
                    {/* <small>Create and view your loan accounts...</small> */}
                </div>
                <div className={classes.formSectionHeader}>
                    <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                </div>
            </div>
        </div>

        <div className={classes.bodyContainer} style={{marginBottom:'40px'}}>
            <div className={classes.main}>
            <div className={`${classes.header1} ${classes.flex1}`}>
                {/* <h6>Create New Payment Voucher</h6> */}
            </div>
            <div className={classes.header2}>
                <Form>
            
                <div className={classes.formContainer}>
                <div className={classes.formCont}>
                    <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label  >Transaction Date</Form.Label>
                        <Form.Control type='date' id="date" 
                        // onChange={handleDateChange} 
                        value={selectedLoan.transaction_date}
                        // onChange={(e) => setDate(e.target.value)} style={{ height: 'calc(1.8em + 1.89rem + 2px)' }}
                        />
                    </Form.Group>

                    
                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Customer / Employee / Member</Form.Label>
                        <Form.Control
                            value={selectedLoan.beneficiary?.name}
                            disabled
                            />
                        </Form.Group>

                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Loan Type</Form.Label>
                        <Form.Control
                          value={selectedLoan.loan?.description}
                          disabled
                        />
                        </Form.Group>

                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Principal Amount</Form.Label>
                        <CurrencyInput

                            name="principal amount"
                            decimalsLimit={2}
                            className="form-control"
                            value={selectedLoan.principal_amount} 
                            disabled
                            // onValueChange={handleValueChange}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                            />
                        </Form.Group>
                
                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label  >Loan Interest</Form.Label>
                        <CurrencyInput

                            name="loan interest"
                            decimalsLimit={2}
                            className="form-control"
                            value={selectedLoan.loan_interest} 
                            disabled
                            // onValueChange={handleValueChange1}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                            />
                    </Form.Group>        
                    
                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Interest</Form.Label>
                        <CurrencyInput

                            name="loan interest"
                            disabled
                            decimalsLimit={2}
                            className="form-control"
                            value={selectedLoan.interest_amount} 
                            // onValueChange={handleValueChange2}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                            />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Total Repayment</Form.Label>
                        <CurrencyInput

                            name="loan interest"
                            disabled
                            decimalsLimit={2}
                            className="form-control"
                            value={selectedLoan.total_repayment} 
                            onValueChange={handleValueChange3}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                            />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Duration (Months)</Form.Label>
                        <Form.Control 
                        type="text" 
                        // onChange={(e) => setDuration(e.target.value)} 
                        value={selectedLoan.duration}
                        />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Monthly Deduction</Form.Label>
                        <CurrencyInput

                            name="loan interest"
                            disabled
                            decimalsLimit={2}
                            className="form-control"
                            value={selectedLoan.monthly_deduction} 
                            // onValueChange={handleValueChange4}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                        />
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Select Bank</Form.Label>
                        <Select
                            value={selectedBank}
                            // onChange={(selectedOption) => handleBankChange(selectedOption)}
                            menuPortalTarget={document.body}
                            options={banks}
                            disabled
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                menu: (provided) => ({
                                ...provided,
                                
                                }),
                            }}
                        />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Cheque No.</Form.Label>
                        <Form.Control 
                        type="text" 
                        // onChange={(e) => setCheque(e.target.value)}
                        value={selectedLoan.cheque_number} 
                        />
                    </Form.Group>
                    </div>
                </div>
                </Form>
            </div>

            
            </div>
              <div style={{justifyContent: "flex-start", gap:'20px', paddingLeft:'40px 0 0 20px'}} class="modal-footer">
                                <Button style={{borderRadius: 0}} variant="success" onClick={createLoan}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                    </>
                                  ) : (
                                    "Approve Loan"
                                  )}
                                </Button>
                                <Button style={{borderRadius: 0}} variant="danger" >
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                    </>
                                  ) : (
                                    "Disapprove Loan"
                                  )}
                                </Button>
                                {/* <Button>Save Changes</Button> */}
                                {/* <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button> */}
                              </div>
        </div>
    </div>

    </div>
  )
}