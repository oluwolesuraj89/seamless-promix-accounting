import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import classes from './CreateSales.module.css';
import classes from '../../Manage Cooperatives/Manage Members/ManageMember.module.css'
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
// import { BASE_URL } from '../../api/api';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function AddNewSavings() {
    const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedSavings, setSelectedSavings] = useState('');
  const [principalAmount, setPrincipalAmount] = useState('');
  const [loanInterest, setLoanInterest] = useState(0.00);
  const [interest, setInterest] = useState(0.00);
  const [totalRepayment, setTotalRepayment] = useState(0.00);
  const [monthlyDeduction, setMonthlyDeduction] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedMember, setSelectedMember] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState('')
  const [user, setUser] = useState('')
  

  const handleMemberChange = (event) =>{
    setSelectedMember(event.target.value)
  }


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
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account/fetch-savings', { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
        value: item.id,
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
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentMethod = async () => {
    setLoading(true);


    try {
        const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/income/get-payment-method`,
            {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );
        const resultsss = response.data?.data;
        const paymentMethh = resultsss.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setPaymentMethod(paymentMethh);

        //   console.log(resultss, "NI");
    } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    if (bearer) {
        fetchSupplierss();
        fetchLoans();
        fetchBanks();
        fetchPaymentMethod();
    }
  }, [bearer]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
}

const handleSavingsChange = (selectedOption) => {
  setSelectedSavings(selectedOption);
}

  const handleModeChange = (selectedOption) => {
    setSelectedMode(selectedOption);
}

const handleValueChange = (value, name, values) => {
  setPrincipalAmount(value);
};






const createSavings = async () => {
  setCreateLoading(true);
  try {
  
    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/account/staff-savings',
      {
        member_id: selectedCustomer.value,
        amount: principalAmount,
        transaction_date: selectedDate,
        mode_of_savings: selectedMode.value,
        savings_type: selectedSavings.value,
        debit_account: selectedBank.value

        


      },
      { headers }
    );
    console.log(response.data.message)
    
    navigate('/savings')

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

;

const handleBankChange = (selectedOption) => {
  setSelectedBank(selectedOption);
}

  

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <MainDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Create New Savings </h3>
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
                    <div className={classes.formSection}>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Customer</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" /> */}
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
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Savings Type</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="name" /> */}
                                    <Select
                                        value={selectedSavings}
                                        onChange={(selectedOption) => handleSavingsChange(selectedOption)}
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
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount To Save</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="name" /> */}
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
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Mode of Savings</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" /> */}
                                    <Select
                                        value={selectedMode}
                                        onChange={(selectedOption) => handleModeChange(selectedOption)}
                                        options={paymentMethod}
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

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" /> */}
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

                    </div>
                    <div style={{marginTop: 20}}/>
                    {/* <h5 style={{textAlign: "center"}}>Add Bank Accounts</h5> */}

                            <div class="modal-footer" style={{marginTop:'20px'}}>
                                <Button style={{borderRadius: 0}} variant="success" onClick={createSavings}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Applying, Please wait...</span>
                                    </>
                                  ) : (
                                    "Create Savings"
                                  )}
                                </Button>
                                {/* <Button>Save Changes</Button> */}
                                {/* <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button> */}
                              </div>

                        
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

export default AddNewSavings;