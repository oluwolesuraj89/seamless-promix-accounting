import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './CreateSales.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function EditInvoice() {
  const location = useLocation();
    const { selectedInvoice } = location.state || {};
    const [load, setLoad] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [loan, setLoan] = useState([]);
    const [amount1, setAmount1] = useState("");
    const [transactionDate1, setTransactionDate1] = useState("");
    const [selectedBankbank1, setSelectedBankbank1] = useState("");
    const [selectedCustomer1, setSelectedCustomer1] = useState("");
    const [user, setUser] = useState("");
    const [tableData, setTableData] = useState([]);
    const [debitGl, setDebitGl] = useState(selectedInvoice?.debit_gl_code || '');
    const [selectedGlCode, setSelectedGlCode] = useState('');
    const [glMethod, setGlMethod] = useState([]);
    const [sICode, setSICode] = useState(selectedInvoice?.invoice_number || '');
    const [invoiceData, setInvoiceData] = useState('');
    const [selectedAccountName, setSelectedAccountName] = useState('');
    const [accountName, setAccountName] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [invoice, setInvoice] = useState('');
    const [description, setDescription] = useState(selectedInvoice?.description || '');
    const [debitCode, setDebitCode] = useState('');
    const [debitAmount, setDebitAmount] = useState(selectedInvoice?.amount || '');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(selectedInvoice?.customer_id || '');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
    const [totalAmount, setTotalAmount] = useState('');
    // const [loading, setLoading] = useState(false);


    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
          const value1 = await AsyncStorage.getItem('tobi');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
          if (value1 !== null) {
              setUser(value1);
            }
        //   if (value2 !== null) {
        //     setCompanyId(value2);
        //   }
    
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };
    
      useEffect(() => {
        readData();
      }, []);

      const handleGlChange = (event) =>{
        setDebitGl(event.target.value);
    }
    const handleAccountChange = (index, event) => {
        const selectedAccount = event.target.value;
        const intselectedId = parseInt(selectedAccount);
        const selectedGlCode = accountName.find((item) => item.id === intselectedId)?.gl_code || '';

        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            accountName: selectedAccount,
            accountCode: selectedGlCode,
        };

        setFormData(updatedFormData);
    };

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const handleDebitChange = (event) => {
        selectedDebitAccount(event.target.value);
    };


    const calculateTotalAmount = () => {
        const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        const formattedTotal = total.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setTotalAmount(formattedTotal);
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
  };
    

    const createSalesInvoice = async () => {
      setCreateLoading(true);
  
      try {
          const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
          const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
         
  console.log(accountNames, amounts, debitAmount);
          const response = await axios.post(
              `${BASE_URL}/post-sales-invoice`,
              {
                  account_name: accountNames,
                  account_amount: amounts,
                  description: description,
                  invoice_number: sICode,
                  customer_id: selectedCustomer,
                  debit_gl_code: debitGl,
                  amount: debitAmount,
              },
              { headers }
          );
  
          console.log(response.data?.message, "heeee");
          setSICode("");
          setSelectedCustomer("");
          setDebitCode("");
          setSelectedAccountName("");
          setDebitAmount("");
          setDescription("");
          navigate(-1);
  
          toast.success(response.data.message);
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
  
  

  const fetchGlMethod = async () => {
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
        const resultss = response.data?.data;
        setGlMethod(resultss);
  
        console.log(resultss, "NI");
      } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
      } finally {
        setLoading(false);
      }
    };

  const fetchCustomers = async () => {
      setLoading(true);
  
  
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
        const custome = response.data?.data;
        setCustomerList(custome);
  
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
          fetchGlMethod();
          fetchCustomers();
      }
    }, [bearer]);
    
  

  
    

    const goBack = () => {
        navigate(-1);
    }


   
    
 

    const addRow = () => {
      const newRow = {
          sn: formData.length + 1,
          accountName: '',
          accountCode: '',
          amount: '',
      };
      setFormData([...formData, newRow]);
  };

  const deleteRow = (index) => {
      const updatedData = formData.filter((_, i) => i !== index);
      setFormData(updatedData);
  };

  const handleFormChange = (index, field, value) => {
      const updatedFormData = [...formData];
      const numericValue = value.replace(/\D/g, '');
      const numericAmount = numericValue !== '' ? parseFloat(numericValue) : '';
      const formattedValue = numericAmount !== '' ? numericAmount.toLocaleString() : '';

      updatedFormData[index][field] = formattedValue;
      setFormData(updatedFormData);
  };



  const handleValueChange = (value, name, values) => {
      setDebitAmount(value); // Update the balance state
      console.log(value, name, values);
    };

    const handleValueChange1 = (value, index) => {
      const updatedFormData = [...formData];
      updatedFormData[index] = {
          ...updatedFormData[index],
          amount: value,
      };
      setFormData(updatedFormData);
      calculateTotalAmount(); // Recalculate total amount after each change
  };

  const fetchAcctName = async () => {
    setLoading(true);


    try {
      const response = await axios.get(
        `${BASE_URL}/get-account-by-class-id?class_id=${4}`,
        {
         
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const resultss = response.data?.data;
      setAccountName(resultss);

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
        fetchAcctName();
    }
  }, [bearer]);

  

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
                            <h3>Update Sales Invoice</h3>
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Invoice To:</label>
                                <div className="col-sm-9">
                                <Form.Select name="customer" className="form-control" required="" value={selectedCustomer} onChange={handleCustomerChange} >
                                                                                <option value="">Choose Customer</option>
                                                                                {customerList.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Sales Invoice Code:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="text" disabled value={sICode}  name="invoice"  />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                <div className="col-sm-9">
                                <textarea
                                                                                className="form-control"
                                                                                required=""
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                name="description"
                                                                            />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit GL Account:</label>
                                <div className="col-sm-9">
                                <Form.Select name="DebitGl" className="form-control" required="" value={debitGl} onChange={handleGlChange}>
                                                                                <option value="">Choose Debit Gl Account</option>
                                                                                {glMethod.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.gl_name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select>
                                </div>
                            </div>
                        </div>
<div style={{marginTop: 20}}/>

                        <div className="col-md-6" >
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">GL Code:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="email" value={debitCode} onChange={(e) => setDebitCode(e.target.value)} name="code"  />

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
className="form-control"
// placeholder='Enter Amount'
  name="debit amount"
  decimalsLimit={2}
  value={debitAmount} // Set the value to the balance state
      onValueChange={handleValueChange}
      style={{ textAlign: "right", width: 330, height: 38}}
/>
                                </div>
                            </div>
                        </div>

                       
                        <div style={{ marginTop: 20 }} />
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
                            name="DebitGl"
                            className="form-control"
                            required=""
                            value={row.accountName}
                            onChange={(e) => handleAccountChange(index, e)}
                        >
                            <option value="">Choose Debit Gl Account</option>
                            {accountName.map((item) => (
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
                            disabled
                        />
                    </td>
                    <td>
                        
                        <CurrencyInput
    name={`debit amount ${index}`} // Provide a unique name for each CurrencyInput
    decimalsLimit={2}
    value={row.amount}
    className="form-control"
    onValueChange={(value) => handleValueChange1(value, index)}
    style={{ textAlign: "right", border: "none"}}
/>


                       
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

                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: 20 }} />
                                                            <div className="col-md-11" style={{marginLeft: 45}}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-1 col-form-label font-weight-400">Amount:</label>
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'18.5%',}}>
                                                                        <input style={{ textAlign: "right",}} className="form-control" required="" type="text" value={totalAmount} name="total" disabled />
                                                                    </div>
                                                                </div>
                                                            </div>











   

</div>


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start', gap: 20 }}>
<Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
    <Button style={{ borderRadius: 5 }} variant='success' onClick={createSalesInvoice}>
        {createLoading ? (
            <>
                <Spinner size='sm' />
                <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
            </>
        ) : (
            "Update Sales Invoice"
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

export default EditInvoice;