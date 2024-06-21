import React, { useState, useEffect, useRef  } from 'react';
// import "../../../assetss/assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../../../assetss/assets/plugins/metisMenu/metisMenu.min.css";
// import "../../../assetss/assets/plugins/fontawesome/css/all.min.css";
// import "../../../assetss/assets/plugins/typicons/src/typicons.min.css";
// import "../../../assetss/assets/plugins/themify-icons/themify-icons.min.css";
// import "../../../assetss/assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
// import { InfoFooter } from '../../InfoFooter';

import classes from '../Manage Members/ManageMember.module.css'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner, Accordion, Badge } from 'react-bootstrap';
// import favicon from '../../Im/ages/faviconn.png'
// import TableToPrint from './TableToPrint';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from './TableToPrint';
import { toast } from 'react-toastify';
import InventoryDash from '../Inventory Dashboard/InventoryDash';
import { BASE_URL } from '../api/api';

function EditSupplier() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [memberLoading, setMemberLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ bankName: '', accountName: '', accountNumber: ''}]);
    const location = useLocation();
    const { selectedCustomer } = location.state || {};
    const customerLedgers = selectedCustomer?.ledgers;
    console.log(customerLedgers);

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

    
    
   

    
   
   


    const updateMember = async () => {
        setMemberLoading(true);
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
          setMemberLoading(false);
        }
      };
 
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
     
    
    


    return (
        <div>
            <InventoryDash />
            <div className='newBody'>
            <div className={classes.newWidth}>
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>View Supplier</h3>
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
                </div>
                    <div className="wrapper">
                        


                        {/* <!-- Page Content  --> */}
                        <div className="content-wrapper">




                            <div className="body-content">
                            


                                <div className="col-lg-12">
                                    <div className="card" style={{border:'none'}}>
                                        
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card" >
                                                    <div className="card-body" >
                                                        <div className="card-body" >

                                                            <div  className={classes.formSec}>
                                                                <div className="row">
                                                                <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Name</label>
                                                                            <div className="col-sm-9">
                                                                                <input className="form-control" required="" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Email</label>
                                                                            <div className="col-sm-9">
                                                                                <input className="form-control" required="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Phone Number</label>
                                                                            <div className="col-sm-9">
                                                                                <input className="form-control" required="" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Address</label>
                                                                            <div className="col-sm-9">
                                                                                <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            
                                                                </div>
                                                            </div>
                                                            
                                                            <div style={{ marginTop: 30 }} />
                                                            {/* <h5 >Personal Ledger</h5> */}
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
                                                            

                                                            <div style={{justifyContent: "flex-start",  marginTop:30, gap: 20}} class="modal-footer">
                                                            <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                                                            <Button style={{borderRadius: 4,}} variant="success" onClick={updateMember}>
                    {memberLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
    </>
  ) : (
                "Update Supplier"
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

export default EditSupplier;