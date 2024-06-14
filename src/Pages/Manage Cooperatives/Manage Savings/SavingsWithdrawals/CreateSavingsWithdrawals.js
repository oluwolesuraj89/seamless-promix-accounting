import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './SavingsWithdrawals.module.css';
import { BASE_URL } from '../../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import Arrow from '../../../../assets/promix/dArrow-down.svg'
import CoopDashboard from '../../../Cooperative Dashboard/CoopDashboard';


function CreateSavingsWithdrawals() {
  const [balance, setBalance] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedSavings, setSelectedSavings] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
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
    const [outstanding, setOutstanding] = useState('');
    const [customerSavings, setCustomerSavings] = useState('');
    const [bookingId, setBookingId] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [banks, setBanks] = useState([]);
    const [mode, setMode] = useState([]);
    const [savings, setSavings] = useState([]);
    const [user, setUser] = useState("");
    const [tableData, setTableData] = useState([]);
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

      const handleModeChange = (selectedOption) => {
        setSelectedMode(selectedOption?.value);
      }

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
      fetchSavings(selectedCustomer);
    }
  }, [bearer, selectedCustomer]);

  const fetchSavings = async (selectedCustomer) => {
      setCustomerLoading(true);

      try {
          const response = await axios.get(
              `${BASE_URL}/customer/savings?customer_id=${selectedCustomer}`,
              {

                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
          const cred2 = response.data?.data;
          setCustomerSavings(cred2);
          console.log(cred2);
          const options1 = cred2.map((item) => ({
            label: item.prefix,
            value: item.id,
          }));
          setSavings(options1);

            console.log(options1, "NIGERIA");
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setCustomerLoading(false);
      }
  };


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

  const createSavings = async () => {
    setCreateLoading(true);
    try {
      console.log(selectedCustomer, amountToPay, selectedDate, selectedSavings, selectedBank, chequeNo)
      const response = await axios.post(
        `${BASE_URL}/customer/savings-withdrawal`,
        {
          customer_id: selectedCustomer,
          amount: amountToPay,
          transaction_date: selectedDate,
          account_id: selectedSavings,
          bank: selectedBank,
          cheque_number: chequeNo

        },
        { headers }
      );
    navigate(-1);

      toast.success(response.data.message);

      setSelectedDate('');
      setSelectedCustomer('');
      setSelectedSavings('');
      setBalance('');
      setMode('');
      setSelectedBank('');
      setAmountToPay("");
      chequeNo("");

      

      
     
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
    setBalance('');
    setSelectedSavings('');
  }

  const handleValueChange = (value, name, values) => {
      setAmountToPay(value); // Update the balance state
      console.log(value, name, values);
  };


  const handleSavingsChange = (selectedOption) => {
    setSelectedSavings(selectedOption.value);
    const selectedSavingsData = customerSavings.find((savings) => savings.id === selectedOption.value);
    setBalance(selectedSavingsData?.balance);
    console.log(selectedSavingsData);

  };


  

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
                            <h3>Create Savings Withdrawal</h3>
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Savings Type:</label>
                                <div className="col-sm-9">
                                <Select
                                        
                                        onChange={handleSavingsChange}
                                        options={savings}
                                        // menuPortalTarget={document.body}
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Balance:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
                                        style={{ width: '330px', height: '38px', textAlign: 'right', padding: '10px' }}
                                        value={balance}
                                        // onChange={(selectedOption) => handleBankChange(selectedOption)}

                                        menuPortalTarget={document.body}
                                        disabled
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
                       
<div style={{marginTop: 20}}/>
                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Mode of Savings:</label>
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
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Bank:</label>
                                <div className="col-sm-9">
                                <Select
                                        onChange={handleBankChange}
                                        options={banks}
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
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount To Withdraw:</label>
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
                                                                        "Create Savings Withdrawal"
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

export default CreateSavingsWithdrawals;