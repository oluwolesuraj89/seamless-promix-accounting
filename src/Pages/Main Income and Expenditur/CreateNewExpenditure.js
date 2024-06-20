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
// import CurrencyInput from 'react-currency-input-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import classes from './CreateSales.module.css';
import classes from '../Manage Cooperatives/Manage Members/ManageMember.module.css'
import MainDashboard from '../Main Dashboard/MainDashoard';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
// import { BASE_URL } from '../../api/api';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function CreateNewExpenditure() {
    const [receive, setReceive] = useState('');
    const [subCat, setSubcat] = useState([]);
    const [paymentMeth, setPaymentMeth] = useState([]);
    const [assetAccount, setAssetAccount] = useState([]);
    const [teller, setTeller] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [currency, setCurrency] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedDebit, setSelectedDebit] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState();
    const [totalAmount, setTotalAmount] = useState('');
    const [debitAccount, setDebitAccount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAssetAccount, setSelectedAssetAccount] = useState('');
    const [user, setUser] = useState('');
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };


    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };
    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const handleAssetChange = (event) => {
        setSelectedAssetAccount(event.target.value);
    };
    const handleDebitChange = (event) => {
        setSelectedDebit(event.target.value);
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

    const goBack = () => {
        navigate(-1);
    }

    const addRow = () => {
        const newRow = {
            sn: formData.length + 1,
            accountName: '',
            accountCode: '',
            amount: ''
        };
        setFormData([...formData, newRow]);
        // setSelectedPayment('');
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    const handleFormChange = (index, field, value) => {
        const updatedFormData = [...formData];
        const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
        const formattedValue = numericValue.toFixed(2);
    
        updatedFormData[index][field] = formattedValue;
        setFormData(updatedFormData);
    };

    const fetchAsset = async () => {
        setLoading(true);
    
        try {
          const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${1}`,
            {
             
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const assetsAcc = response.data?.data;
          setAssetAccount(assetsAcc);
    
        //   console.log(results, "NIYIN");
        } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchAsset();
    }, [bearer]);

    const fetchSubCat = async () => {
        setLoading(true);
    
        try {
          const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${4}`,
            {
             
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const results = response.data?.data;
          setSubcat(results);
    
        //   console.log(results, "NIYIN");
        } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
        } finally {
          setLoading(false);
        }
      };

   
    const fetchAccountName = async (selectedPayment) => {
        setLoading(true);
    
        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-account-by-payment-mode?type=${selectedPayment}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );
    
            const paid = response.data?.data;
            // console.log(paid, 'paid');
            setPaymentMeth(paid);
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };
    
    
      
      useEffect(() => {
        if (bearer && selectedPayment) {
          fetchAccountName(selectedPayment);
        }
      }, [bearer, selectedPayment]);

// console.log(formData);
      const createIncome = async () => {
        setIsLoading(true);
    
        try {
            const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
            const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
            // const amount1 = incomeAmount.replace(/,/g, '').replace(/\.00$/, '');
    
            
// return;

            const response = await axios.post(`${BASE_URL}/post-receipt`,
                {
                    account_id : accountNames,
                    gl_code : selectedAssetAccount,
                    description : description,
                    payment_mode : selectedPayment,
                    breakdown_amount : amounts,
                    total_amount : incomeAmount,
                    teller_no : teller,
                    particulars : receive,
                    transaction_date: selectedDate
                },
                { headers }
            );
    
            console.log(response.data, "heeee");
            setReceive("");
            setSelectedDebit("");
            setSelectedPayment("");
            setReceive("");
            setTeller("");
            setDescription("");
            setSelectedDate('');
            navigate('/accounting/income_and_expenditure/income');
    
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
            const resultss = response.data?.data;
            setPaymentMethod(resultss);

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
            fetchSubCat();
            fetchPaymentMethod();
            
        }
    }, [bearer]);

    const fetchSelectedCurrency = async () => {
        setLoading(true);


        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/fetch-all-currencies`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const curr = response.data?.data;
            setCurrency(curr);

            //   console.log(results, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchSelectedCurrency();
        }
    }, [bearer]);

    const fetchDebitAccount = async () => {
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
            const debitted = response.data?.data;
            setDebitAccount(debitted);

            // console.log(debitted, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchDebitAccount();
        }
    }, [bearer]);


    const handleAccountChange = (index, event) => {
        const selectedAccount = event.target.value;
        const intselectedId = parseInt(selectedAccount);
        const selectedGlCode = subCat.find((item) => item.id === intselectedId)?.gl_code || '';

        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            accountName: selectedAccount,
            accountCode: selectedGlCode,
        };

        setFormData(updatedFormData);
    };

    const handleValueChange = (value) => {
        setIncomeAmount(value);
    };

    const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);
        calculateTotalCredit(); // Recalculate total credit whenever table amounts change
    };


    const calculateTotalCredit = () => {
        const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        const formattedTotal = total.toFixed(2);
        setTotalCredit(formattedTotal);
    };


    useEffect(() => {

        calculateTotalCredit();
    }, [formData]);



    

    
  

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
                            <h3>Manual Entry</h3>
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
                    <div className={`${classes.formSection} ${classes.formSectionGap}`}>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400" style={{paddingTop:'0'}}>Payment From</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="text"  value={receive} onChange={(e) => setReceive(e.target.value)} name="receive" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Date</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Mode</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="name" /> */}
                                    {/* <Select
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
                                /> */}

                                <Form.Select name="customer" className="form-control" required="" value={selectedPayment} onChange={handlePaymentChange}>
                                    <option value="">Choose Payment Mode</option>
                                    {paymentMethod.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                    ))}
                                </Form.Select>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Description</label>
                                <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    rows="1"
                                    required=""
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    name="description"
                                />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400" style={{paddingTop:'0'}}>Cheque Number</label>
                                <div className="col-sm-9">
                                    <input className="form-control" required="" type="text"  value={teller} onChange={(e) => setTeller(e.target.value)} name="receive" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400" style={{paddingTop:'0'}}>Debit Acct</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" /> */}
                                    {/* <Select
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
                                      /> */}
                                      <Form.Select name="customer" className="form-control" required="" value={selectedAssetAccount} onChange={handleAssetChange}>
                                        <option value="">Choose Account</option>
                                        {assetAccount.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.gl_name}
                                        </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Amount</label>
                                <div className="col-sm-9">
                                    {/* <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" /> */}
                                    <CurrencyInput
                                                                        //   
                                        name="amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={incomeAmount} // Set the value to the balance state
                                            onValueChange={handleValueChange}
                                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none"}}
                                        />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{marginTop: 40}}/>
                    {/* <h5 style={{textAlign: "center"}}>Add Bank Accounts</h5> */}

                    <div className="row">
                            {/* <div className="col-md-6"> */}
                            <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                    <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                        <tr>
                                            <th>#</th>
                                            <th style={{width:'50%',}}>Account Name</th>
                                            <th>Account Code</th>
                                            <th>Amount</th>
                                            <th ><Button variant="primary" onClick={() => addRow()}>
                                                <i className="fas fa-plus"></i>

                                            </Button></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                        {formData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.sn}</td>
                                                <td>
                                                    <Form.Select
                                                        className="form-control"
                                                        value={row.accountName}
                                                        onChange={(e) => handleAccountChange(index, e)}
                                                    >
                                                        <option value="">Select Account</option>
                                                        {subCat.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.gl_name}
                                                            </option>
                                                        ))}
                                                    
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.accountCode}
                                                        readOnly
                                                        disabled
                                                    />
                                                </td>
                                                <td>
                                                <CurrencyInput
                                                    name={`rowAmount ${index}`} // Provide a unique name for each CurrencyInput
                                                    // decimalsLimit={2}
                                                    value={row.amount}
                                                    className="form-control"
                                                    onValueChange={(value) => handleValueChange1(value, index)}
                                                    style={{ textAlign: "right", border: "none"}}
                                                    />
                                                    {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.amount}
                                                        onChange={(e) => handleFormChange(index, 'amount', e.target.value)}
                                                        style={{ textAlign: "right" }}
                                                    /> */}
                                                </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => deleteRow(index)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ marginTop: 30 }} />
                                <div style={{display:'flex', justifyContent:'flex-end', alignItems:"center", gap:'20px'}}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Total Debit:</Form.Label>
                                        <CurrencyInput
                                            //   
                                            name="amount"
                                            decimalsLimit={2}
                                            className="form-control"
                                            value={incomeAmount} // Set the value to the balance state
                                            disabled
                                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none"}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Total Credit:</Form.Label>
                                        <CurrencyInput
                                            //   
                                            name="amount"
                                            decimalsLimit={2}
                                            className="form-control"
                                            value={totalCredit} // Set the value to the balance state
                                            disabled
                                            style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none"}}
                                        />
                                    </Form.Group>
                                </div>

                            </div>
                        </div>

                        
                </div>


                <div class="modal-footer" style={{marginTop:'20px'}}>
                <Button style={{borderRadius: 0}} variant='success' disabled={parseFloat(incomeAmount) !== parseFloat(totalCredit) ? true : false} onClick={createIncome}>
                    {isLoading ? (
                        <>
                        <Spinner size='sm' />
                        <span style={{ marginLeft: '5px' }}>Creating Income, Please wait...</span>
                    </>
                    ) : (
                        "Create Income"
                    )}
                </Button>
                        {/* <Button>Save Changes</Button> */}
                        {/* <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button> */}
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

export default CreateNewExpenditure;