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
// import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import InventoryDash from '../../Inventory Dashboard/InventoryDash';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'



function EditInvoice() {
  const location = useLocation();
  const { foundInvoice } = location.state || {};
 
    const [user, setUser] = useState("");
    const [debitGl, setDebitGl] = useState(foundInvoice?.debit_gl_code || '');
    const [selectedGlCode, setSelectedGlCode] = useState('');
    const [glMethod, setGlMethod] = useState([]);
    const [sICode, setSICode] = useState(foundInvoice?.invoice_number || '');
    const [invoiceData, setInvoiceData] = useState('');
    const [selectedAccountName, setSelectedAccountName] = useState('');
    const [address, setAddress] = useState(foundInvoice?.customer?.address || '');
    const [accountName, setAccountName] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [invoice, setInvoice] = useState('');
    const [description, setDescription] = useState(foundInvoice?.description || '');
    const [debitCode, setDebitCode] = useState('');
    const [debitAmount, setDebitAmount] = useState(foundInvoice?.amount || '');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(foundInvoice?.customer?.id || '');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState('');
    // const [loading, setLoading] = useState(false);
    const [totalCharge, setTotalCharge] = useState("");
    const [itemList, setItemList] = useState([]);
    const [selectOptions1, setSelectOptions1] = useState([]);
    const [debitAccount, setDebitAccounts] = useState([]);

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
    

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const handleDebitChange = (event) => {
        selectedDebitAccount(event.target.value);
    };


    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
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


   
    
 





  const handleValueChange2 = (value, name, values) => {
    setDebitAmount(value); 
   
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/items/fetch-all`, { headers });
        const itemss = response.data?.data;

        const options1 = itemss.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        setItemList(itemss);
        setSelectOptions1(options1);
    } catch (error) {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setDebitAccounts([]);
    } finally {
        setIsLoading(false);
    }
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
        fetchItems();
    }
  }, [bearer]);

  

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <InventoryDash/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>View Sales Invoice</h3>
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
                                <Form.Select disabled name="customer" className="form-control" required="" value={selectedCustomer} onChange={handleCustomerChange} >
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Customer's Address:</label>
                                <div className="col-sm-9">
                                <textarea
                                disabled
                                                                                className="form-control"
                                                                                required=""
                                                                                value={address}
                                                                                
                                                                                name="address"
                                                                            />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                <div className="col-sm-9">
                                <textarea
                                disabled
                                                                                className="form-control"
                                                                                required=""
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                name="description"
                                                                            />
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop: 20}}/>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit GL Account:</label>
                                <div className="col-sm-9">
                                <Form.Select disabled name="DebitGl" className="form-control" required="" value={debitGl} onChange={handleGlChange}>
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

                        {/* <div className="col-md-6" >
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">GL Code:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="email" value={debitCode} onChange={(e) => setDebitCode(e.target.value)} name="code"  />

                                </div>
                            </div>
                        </div> */}


                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
                                disabled
className="form-control"
// placeholder='Enter Amount'
  name="debit amount"
  decimalsLimit={2}
  value={debitAmount} // Set the value to the balance state
      onValueChange={handleValueChange2}
      style={{ textAlign: "right", width: 330, height: 38}}
/>
                                </div>
                            </div>
                        </div>

                       
                        <div style={{ marginTop: 50 }} />
                        <div className="row">
                                                            <h5 style={{ textAlign: "center" }}>Item(s) Added</h5>
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                            <th style={{ width: '50%', }}>Item</th>
                                        <th>Unit Price(N)</th>
                                        <th>Quantity</th>
                                        <th>Total Price(N)</th>
                                        
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap",  }}>
                                                                            {foundInvoice?.items?.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td style={{ width: '400px' }}>
                                                                                       {item.item?.name}
                                                                                    </td>
                                                                                    <td style={{ width: '7rem', textAlign: "right" }}>
                                                                                    {parseFloat(item.item?.price).toLocaleString('en-US', {
                                                                    minimumIntegerDigits: 1,
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}
                                                                                   
                                                                                    </td>
                                                                                    <td style={{ width: '5rem' }}>
                                                                                    {item.quantity} 
                                                                                    </td>
                                                                                    <td style={{ width: '7rem', textAlign: "right" }}>
                                                                                    {parseFloat(item.amount).toLocaleString('en-US', {
                                                                    minimumIntegerDigits: 1,
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}
                                                                                    </td>
                                                                                   
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: 20 }} />
                                                           










   

</div>


{/* <div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start', gap: 20, marginTop: 50 }}>
<Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
    <Button style={{ borderRadius: 5 }} variant='success' onClick={createSalesInvoice}>
        {createLoading ? (
            <>
                <Spinner size='sm' />
                <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
            </>
        ) : (
            "Create Sales Invoice"
        )}
    </Button>

</div> */}

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