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

function EditSuppliers() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ bankName: '', accountName: '', accountNumber: ''}]);
    const location = useLocation();
    const { selectedCustomer } = location.state || {};
    const [user, setUser] = useState('')

    useEffect(() => {
      if (selectedCustomer) {
        setName(selectedCustomer.name || '');
        setAddress(selectedCustomer.address || '');
        setPhone(selectedCustomer.phone_number || '');
        setEmail(selectedCustomer.email || '');
  
        if (selectedCustomer.banks && selectedCustomer.banks.length > 0) {
          // Pre-populate formData with bank details if available
          const banksData = selectedCustomer.banks.map(bank => ({
            bankName: bank.bank_name || '',
            accountName: bank.account_name || '',
            accountNumber: bank.bank_account || '',
          }));
          setFormData(banksData);
        }
      }
    }, [selectedCustomer]);


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
          bankName: '', 
          accountName: '', 
          accountNumber: '', 
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    const handleFormChange = (index, field, value) => {
      const updatedFormData = [...formData];
      updatedFormData[index][field] = value;
      setFormData(updatedFormData);
    };
    
    const updateBeneficiary = async () => {

      setLoad(true);
      try {
        const bankAccounts = formData.map(item => item.accountNumber);
        const accountNames = formData.map(item => item.accountName);
        const bankNames = formData.map(item => item.bankName);

        const response = await axios.post(`${BASE_URL}/beneficiaryaccounts/update`,
          {
            name: name,
            email: email,
            phone_number: phone,
            address: address,
            bank_account: bankAccounts,
            account_name: accountNames,
            bank_name: bankNames,
            id: selectedCustomer.id
           
          },
          { headers }
        );
        console.log(response.data.message)
        navigate('/suppliers')  
        // return
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: response.data.message,
        // });
        toast.success(response.data.message);
    } catch (error) {
      let errorMessage = error.response?.data?.message;
      // let errorMessage = 'An error occurred. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
              if (typeof error.response.data.message === 'string') {
                  errorMessage = error.response.data.message;
              } else if (Array.isArray(error.response.data.message)) {
                  errorMessage = error.response.data.message.join('; ');
              } else if (typeof error.response.data.message === 'object') {
                toast.error(errorMessage)
                console.log("error", errorMessage);
              }
          }
      } finally {
        setLoad(false);
      }
    };

  

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
                            <h3>Update Supplier</h3>
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Name</label>
                                <div className="col-sm-9">
                                    <input className="form-control" required="" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Email</label>
                                <div className="col-sm-9">
                                    <input className="form-control" required="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="name" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Phone Number</label>
                                <div className="col-sm-9">
                                    <input className="form-control" required="" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="name" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6" style={{width:"100%"}}>
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Address</label>
                                <div className="col-sm-9">
                                    <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: 20}}/>
                    <h5 style={{textAlign: "center"}}>Add Bank Accounts</h5>

                    <div className="row">
                            {/* <div className="col-md-6"> */}
                            <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                    <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                        <tr>
                                            <th style={{width: "40%"}}>Bank Name</th>
                                            <th style={{width: "40%"}}>Account Name</th>
                                            <th>Account Number</th>
                                            <th ><Button variant="primary" onClick={() => addRow()}>
                                                <i className="fas fa-plus"></i>

                                            </Button></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                        {formData.map((row, index) => (
                                            <tr key={index}>
                                                <td>
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.bankName}
                                                        onChange={(e) => handleFormChange(index, 'bankName', e.target.value)}
                                                        
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.accountName}
                                                        onChange={(e) => handleFormChange(index, 'accountName', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.accountNumber}
                                                        onChange={(e) => handleFormChange(index, 'accountNumber', e.target.value)}
                                                        
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

                        {/* <div className="col-md-6" >
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
                        </div> */}

                       
                        {/* <div style={{ marginTop: 20 }} /> */}
                                                            {/* <div className="row">
                                                                
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
    name={`debit amount ${index}`} 
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
                                                            </div> */}
                                                            {/* <div style={{ marginTop: 20 }} /> */}
                                                            {/* <div className="col-md-11" style={{marginLeft: 45}}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-1 col-form-label font-weight-400">Amount:</label>
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'18.5%',}}>
                                                                        <input style={{ textAlign: "right",}} className="form-control" required="" type="text" value={totalAmount} name="total" disabled />
                                                                    </div>
                                                                </div>
                                                            </div> */}











   

                </div>


                <div class="modal-footer" style={{marginTop:'20px'}}>
                    <Button variant="success" onClick={updateBeneficiary}>
                    {load ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
                        </>
                        ) : (
                        "Update Beneficiary"
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

export default EditSuppliers;