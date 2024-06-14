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
import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../api/api';
// import CurrencyInput from 'react-currency-input-field';

export default function CreateNewLoan() {

    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedLoan, setSelectedLoan] = useState('');
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

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };
    
    




    //   console.log(selectedFiles);

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
          const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/customer/no-pagination', { headers });
          const results = response.data?.data;
          console.log("results:", results)
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
        
        // navigate('/loans_advances')
    
        // return
        toast.success(response.data.message);
      } catch (error) {
        let errorMessage = 'An error occurred. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
              if (typeof error.response.data.message === 'string') {
                  errorMessage = error.response.data.message;
              } else if (Array.isArray(error.response.data.message)) {
                  errorMessage = error.response.data.message.join('; ');
              } else if (typeof error.response.data.message === 'object') {
                toast.error(errorMessage)
                console.log(errorMessage);
              }
          }
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
                    <h3>Create New Loan </h3>
                    {/* <small>Create and view your loan accounts...</small> */}
                </div>
                <div className={classes.formSectionHeader}>
                    <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                </div>
            </div>
        </div>

        <div className={classes.bodyContainer}>
            <div className={classes.main}>
            <div className={`${classes.header1} ${classes.flex1}`}>
                {/* <h6>Create New Payment Voucher</h6> */}
            </div>
            <div className={classes.header2}>
                <Form>
            
                <div className={classes.formContainer}>
                <div className={classes.formCont}>
                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input">Transaction Date</label>
                                    <div style={{width:'100%'}}>
                                      <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" >Member</label>
                                    <div style={{width:'100%'}}>
                                      <Select
                                        value={selectedCustomer}
                                        onChange={(selectedOption) => handleSupplierChange(selectedOption)}
                                        options={selectOptions}
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
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input">Loan Type</label>
                                    <div style={{width:'100%'}}>
                                      <Select
                                        value={selectedLoan}
                                        onChange={(selectedOption) => handleLoanTypeChange(selectedOption)}
                                        options={loans}
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
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Principal Amount</label>
                                    <div style={{width:'100%'}}>
                                      {/* <div className="form-control" > */}
                                      <CurrencyInput

                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={principalAmount} 
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      </div>

                                    </div>
                                  {/* </div> */}
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" >Loan Interest</label>
                                    <div style={{width:'100%'}}>
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={loanInterest} 
                                        disabled
                                        onValueChange={handleValueChange1}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" >Interest</label>
                                    <div style={{width:'100%'}}>
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={interest} 
                                        onValueChange={handleValueChange2}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" >Total Repayment</label>
                                    <div style={{width:'100%'}}>
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={totalRepayment} 
                                        onValueChange={handleValueChange3}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input">Duration (Months)</label>
                                    <div style={{width:'100%'}}>
                                      <input className="form-control" required="" type="text" onChange={(e) => setDuration(e.target.value)} name="duration" value={duration} />
                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input"  >Monthly Deduction</label>
                                    <div style={{width:'100%'}}>
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={monthlyDeduction} 
                                        onValueChange={handleValueChange4}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                {/* </div> */}

                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input">Select Bank</label>
                                    <div style={{width:'100%'}}>
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
                                {/* </div> */}

                                
                                {/* <div className="col-md-6"> */}
                                  <div className={`${classes.formFlex} ${classes.formFlex2}`}>
                                    <label for="example-text-input" >Cheque No.</label>
                                    <div style={{width:'100%'}}>
                                      <input className="form-control" required="" type="text" onChange={(e) => setCheque(e.target.value)} name="cheque no" value={cheque} />
                                    </div>
                                  </div>
                                {/* </div> */}
                    </div>
                </div>
                </Form>
            </div>

            
            </div>
            <div style={{justifyContent: "flex-end", margin:'30px'}} class="modal-footer">
            <Button style={{borderRadius: 0}} variant='success' onClick={createLoan} >
            {createLoading ? (
                <>
                    <Spinner size='sm' />
                    <span style={{ marginLeft: '5px' }}>Creating, Please wait...</span>
                </>
                ) : (
                "Disburse New Loan"
                )}
            </Button>
        </div>
        </div>
    </div>

    </div>
  )
}
