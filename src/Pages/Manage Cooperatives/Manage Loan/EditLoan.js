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
import { Button, Spinner, Accordion, Badge, Form } from 'react-bootstrap';
// import favicon from '../../Im/ages/faviconn.png'
// import TableToPrint from './TableToPrint';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../../api/api';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import CurrencyInput from 'react-currency-input-field';
import CoopDashboard from '../../Cooperative Dashboard/CoopDashboard';

function EditLoan() {

  const [subCat2, setSubcat2] = useState([]);
  const [loanCode, setLoanCode] = useState('');
  const [loanDescription, setLoanDescription] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartsLoading, setChartsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  
  const location = useLocation();
  const { selectedLoan } = location.state || {};

  useEffect(() => {
    if (selectedLoan) {
      setLoanCode(selectedLoan.code || '');
      setLoanDescription(selectedLoan.description || '');
      setBalance(selectedLoan.opening_balance || '');
      setSelectedReport(selectedLoan.report_to || '');
    }
  }, [selectedLoan]);


  const handleReportChange = (e) => {
    setSelectedReport(e.target.value);
  };

  const fetchCharts = async () => {
    setChartsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account`, { headers });
      const results = response.data?.data;
     
      setSubcat2(results);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setSubcat2([]);
    } finally {
      setChartsLoading(false);
    }
  };
  useEffect(() => {
    if (bearer) {
      fetchCharts();
    }
  }, [bearer]);

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

  
 

  


  const editLoan = async () => {

    setLoading(true);
    try {
      
      const response = await axios.post(`${BASE_URL}/account/create-loan-account`,
        {
          code: loanCode,
          description: loanDescription,
          opening_balance: balance,
          report_to: selectedReport,
          type: 2

        },
        { headers }
      );
      console.log(response.data.message)
      
      navigate('/loan_account');

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
      setLoading(false);
    }
  };


  const handleValueChange = (value, name, values) => {
    setBalance(value); // Update the balance state

  }; 


    return (
        <div>
            <CoopDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>
                <div className={classes.topPadding}>
                <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Update Loan Product</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
                </div>
                    <div className="wrapper">
                        


                        {/* <!-- Page Content  --> */}
                        <div className="content-wrapper">



                            <div className="main-content">
                                

                                <div className="content-header row align-items-center m-0">

                                    <div className="col-sm-12 header-title p-0">
                                        <div className={classes.actionBtns}>
                                            {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div> */}
                                            {/* <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}> */}
                                                {/* <div>
                                                    <h4 className="font-weight-bold">Update Savings Account </h4>
                                                    <small>Complete the respective fields ....</small>
                                                </div>
                                                <div style={{ marginBottom: 30 }}>
                                                    <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                                                </div> */}
                                            {/* </div> */}

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="body-content">
                            


                                <div className="col-lg-12">
                                    <div className="card" style={{border:'none'}}>
                                      
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card" style={{borderLeft:'none', borderRight:'none', borderBottom:'none', borderRadius:'0'}}>
                                                    <div className="card-body" >
                                                        <div className="card-body" >

                                                            <div  className={classes.formSec}>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                          <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Code:</label>
                                                                          <div className="col-sm-9">
                                                                            <input placeholder='Enter Loan Code' className="form-control" required="" type="text" value={loanCode} onChange={(e) => setLoanCode(e.target.value)} name="loan-code" />
                                                                          </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                          <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                                                          <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={loanDescription} onChange={(e) => setLoanDescription(e.target.value)} name="loan-description" />
                                                                          </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group row">
                                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Balance:</label>
                                                                            <div className="col-sm-9">
                                                                            {/* <div className="form-control" > */}
                                                                            <CurrencyInput

                                                                                name="balance"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={balance} // Set the value to the balance state
                                                                                onValueChange={handleValueChange}
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />
                                                                            </div>

                                                                            </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                      <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Report To:</label>
                                                                        <div className="col-sm-9">
                                                                        <Form.Select name="customer" className="form-control" required="" value={selectedReport} onChange={handleReportChange} style={{marginTop:20}}>
                                                                            <option value="">Choose Report To</option>
                                                                            {subCat2.map((item) => (
                                                                              <option key={item.id} value={item.id}>
                                                                                {item.gl_name}
                                                                              </option>
                                                                            ))}
                                                                          </Form.Select>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                            <div style={{marginTop: 20}}/>
                                                            <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                                    <Button variant="success" onClick={editLoan}>
                                    {loading ? (
                                        <>
                                        <Spinner size='sm' />
                                        <span style={{ marginLeft: '5px' }}>Updating your loan account, Please wait...</span>
                                        </>
                                    ) : (
                                        "Update your loan account"
                                    )}
                                    </Button>
                                
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

export default EditLoan;