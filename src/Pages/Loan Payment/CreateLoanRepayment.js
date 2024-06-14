import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './LoanRepay.module.css';

import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import CoopDashboard from '../Cooperative Dashboard/CoopDashboard';
import { BASE_URL } from '../api/api';


function CreateLoanRepayment() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [loanData, setLoanData] = useState([]);
  const [customerLoan, setCustomerLoan] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [modeLoading, setModeLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createloading, setCreateLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [Outstanding, setOutstanding] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    const [customerSavings, setCustomerSavings] = useState('');
    const [bookingId, setBookingId] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [banks, setBanks] = useState([]);
    
    const [savings, setSavings] = useState([]);
    const [user, setUser] = useState("");
    const [tableData, setTableData] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [selectedMode, setSelectedMode] = useState('');
    const [mode, setMode] = useState([]);
  ;
    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
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

    const filteredData = tableData.filter(item => item.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

    
      const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption.value);
      }

    const totalEntries = filteredData.length;
    const startIndexx = (currentPage - 1) * entriesPerPage + 1;
    const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
    const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


    const fetchSavingsWithdrawal = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/fetch-savings-withdrawal`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultsss = response.data?.data;
          setTableData(resultsss);

          
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const fetchMode = async () => {
    setModeLoading(true);

    try {
        const response = await axios.get(
            `${BASE_URL}/income/get-payment-method`,
            {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );
        const cred2 = response.data?.data;
        const paymentMethh = cred2.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setMode(paymentMethh);

        //   console.log(results, "NI");
    } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
    } finally {
        setModeLoading(false);
    }
};

  const fetchMembers = async () => {
      setIsLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/no-pagination`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const resultssx = response.data?.data;

          const options = resultssx.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setCustomers(options);

          //   console.log(resultsss, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
      if (bearer) {
          fetchSavingsWithdrawal();
          fetchBank();
          fetchMembers();
          fetchMode();
      }
  }, [bearer]);

         
  useEffect(() => {
    if (bearer && selectedCustomer) {
      fetchLoan(selectedCustomer);
    }
  }, [bearer, selectedCustomer]);

  const fetchLoan = async (selectedCustomer) => {
      setCustomerLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/loan?customer_id=${selectedCustomer}`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const loanss = response.data?.data || [];

            setCustomerLoan(loanss);
console.log(loanss);
           
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setCustomerLoading(false);
      }
  };

  const cusLoan = customerLoan.map((item) => ({
    label: item.prefix,
    value: item.id,
}));

  const fetchBank = async () => {
      setLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/get-account-by-class-id?class_id=${1}`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred1 = response.data?.data;
          const options1 = cred1.map((item) => ({
            label: item.gl_name,
            value: item.id,
          }));
          setBanks(options1);

          //   console.log(results, "NI");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };



  const createSavings = async () => {
    setCreateLoading(true);
    try {

      console.log(
        amountToPay,
         selectedDate,
          selectedBank,
          selectedCustomer,
          selectedLoanType,
          chequeNo,
         selectedMode, 
         "hdddddd"
      );
      
      const response = await axios.post(
        `${BASE_URL}/customer/loan-repayment`,
        {
          amount: amountToPay,
          transaction_date: selectedDate,
          bank: selectedBank,
          customer_id: selectedCustomer,
          account_id: selectedLoanType,
          cheque_number: chequeNo,
          mode_of_payments: selectedMode?.value

        },
        { headers }
      );
    navigate(-1);

      toast.success(response.data.message);

      setSelectedDate('');
      setSelectedCustomer('');
      setSelectedBank('');
      setAmountToPay("");

      

      
     
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
              toast.error(errorMessage)
              console.log(errorMessage);
          }
    } finally {
      setCreateLoading(false);
    }
  };



  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption.value);
    setSelectedLoanType(null);
}

  const handleValueChange = (value, name, values) => {
      setAmountToPay(value); // Update the balance state
      console.log(value, name, values);
  };


  const handleLoanTypeChange = (selectedOption) => {
    setSelectedLoanType(selectedOption.value);
    const selectedLoanData = customerLoan.find((loan) => loan.id === selectedOption.value);
    setLoanData(selectedLoanData);
    setTotalPrincipal(selectedLoanData.total_repayment);
    const amountPaid = selectedLoanData.total_repayment - selectedLoanData.balance;
    setAmountPaid(amountPaid);
    setOutstanding(selectedLoanData.balance);
};

const handleModeChange = (selectedOption) => {
  setSelectedMode(selectedOption.value);
}
  

const handlePrintInvoice = (id) => {
    const selectedBook = tableData.find(item => item.id === id);
  
  
    navigate('/print_payment', { state: { selectedBook } });
  };
    

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <CoopDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Loan Repayment</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>

                    
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Member:</label>
                                <div className="col-sm-9">
                                <Select
                                onChange={(selectedOption) => handleSupplierChange(selectedOption)}
                                options={customers}
                                menuPortalTarget={document.body}
                                styles={{
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                    menu: (provided) => ({
                                    ...provided,
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    }),
                                }}
                                />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Type:</label>
                                <div className="col-sm-9">
                                <Select

                                                                                onChange={handleLoanTypeChange}
                                                                                options={cusLoan}
                                                                                menuPortalTarget={document.body}
                                                                                styles={{
                                                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                                                    menu: (provided) => ({
                                                                                        ...provided,
                                                                                        maxHeight: '300px',
                                                                                        overflowY: 'auto',
                                                                                    }),
                                                                                }}
                                                                            />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginBottom:"10px", desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Principal:</label>
                                <div className="col-sm-9">
                                <  CurrencyInput
                                                                                name="amount-to-pay"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={totalPrincipal}
                                                                                disabled
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />
                                </div>
                            </div>
                        </div>
                       
<div style={{marginTop: 20}}/>
                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount Paid:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
                                                                                //   
                                                                                name="amount-paid"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={amountPaid} // Set the value to the balance state
                                                                                disabled
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Outstanding:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
                                                                                //   
                                                                                name="outstanding"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={Outstanding} // Set the value to the balance state
                                                                                disabled
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount to Pay:</label>
                                <div className="col-sm-9" >
                                <CurrencyInput
                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={amountToPay}
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                </div>
                            </div>
                        </div>












    <div className="col-md-6">
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Bank:</label>
            <div className="col-sm-9" >
            <Select
                                                                                onChange={handleBankChange}
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
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Mode of Payment:</label>
                                <div className="col-sm-9">
                                <Select
                                        onChange={(selectedOption) => handleModeChange(selectedOption)}
                                        options={mode}
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
        <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Cheque No:</label>
            <div className="col-sm-9" >
            <input className="form-control" required="" type="text" 
                                       name="cheque-no"
                                       
                                       value={chequeNo} // Set the value to the balance state
                                       onChange={(e) => setChequeNo(e.target.value)}
                                       
                                      
                                      />
            </div>
        </div>
    </div>
</div>


<div style={{ marginTop: 20 }} />


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Button style={{ borderRadius: 0 }} variant='success' onClick={createSavings}>
    {createloading ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Make Payment"
                                                                    )}
    </Button>

</div>

</div>
                                            </div>
            </div>




           







           
          </div>
          {/* <!--/.main content--> */}
          </div>
          </div>
          {/* <InfoFooter /> */}
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  );
}

export default CreateLoanRepayment;