import React, { useState, useEffect, useRef  } from 'react';
// import "../../../assetss/assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../../../assetss/assets/plugins/metisMenu/metisMenu.min.css";
// import "../../../assetss/assets/plugins/fontawesome/css/all.min.css";
// import "../../../assetss/assets/plugins/typicons/src/typicons.min.css";
// import "../../../assetss/assets/plugins/themify-icons/themify-icons.min.css";
import "../../../assetss/assets/plugins/datatables/dataTables.bootstrap4.min.css";
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
import { BASE_URL } from '../../api/api';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import TableToPrint from './TableToPrint';

function EditEmployeeMember() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ bankName: '', accountName: '', accountNumber: ''}]);
    const location = useLocation();
    const { selectedCustomer } = location.state || {};
    const customerLedgers = selectedCustomer?.ledgers;

    useEffect(() => {
      if (selectedCustomer) {
        setName(selectedCustomer.name || '');
        setAddress(selectedCustomer.address || '');
        setPhone(selectedCustomer.phone || '');
        setEmail(selectedCustomer.email || '');
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
        setLoad(false);
      }
    };

   
    function formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
      return formattedDate;
    }
  
    function padZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
   
   



 

     
    
    


    return (
        <div>
            <MainDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>View Member</h3>
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
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>View Personal Ledger</Accordion.Header>
          <Accordion.Body>
            <div className="print-ledger" style={{ marginBottom: 10 }}>
              <Button variant='success' onClick={handlePrint}>Print Ledger</Button>
            </div>
            <TableToPrint ref={componentRef} customerLedgers={customerLedgers} formatDate={formatDate} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

                                                            </div>
                                                            

                                                            <div style={{justifyContent: "flex-start",  marginTop:30, gap: 20}} class="modal-footer">
                                                            <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                                                            <Button style={{borderRadius: 4,}} variant="success" onClick={updateBeneficiary}>
                    {load ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
    </>
  ) : (
                "Update Member"
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

export default EditEmployeeMember;