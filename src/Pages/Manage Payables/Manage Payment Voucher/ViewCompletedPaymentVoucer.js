import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge, Accordion } from 'react-bootstrap';
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
// import { Button, Spinner, Form, Accordion, Badge, Modal } from 'react-bootstrap';
// import { BASE_URL } from '../../api/api';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function ViewCompletedPaymentVoucher() {
  const location = useLocation();
  const { selectedVoucher } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  
 

//   useEffect(() => {
//     if (selectedVoucher && selectedVoucher.document) {
//         fetchDocumentFromAPI(selectedVoucher.document)
//             .then((document) => {
//                 setDocumentContent(document);
//             })
//             .catch((error) => {
//                 console.error('Error fetching document:', error);
//             });
//     }
// }, [selectedVoucher]);



  

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      if (value !== null) {
        setBearer(value);
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

  
  const handlePrintInvoice = () => {
    navigate('/print_payment', { state: { selectedVoucher } });
  };

  const handleApprove = async () => {
  
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/payment_voucher/approve_voucher?id=${selectedVoucher.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      // console.log(response.data.message)
      navigate('/payment_voucher')
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

  const handleDisApprove = async () => {
 
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/payment_voucher/disapprove_voucher?id=${selectedVoucher.id}&description=${description}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      // console.log(response.data.message)
      navigate('/payment_voucher')
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
      setIsLoading(false);
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
                            <h3>View Completed Payment Voucher</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            {/* <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3> */}
                        </div>
                    </div>
                    <div style={{ marginBottom: 30 }}>
                          <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                    </div>
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                <div className="row">
                   

                <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>View Payment Voucher Details</Accordion.Header>
        <Accordion.Body>
        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
    <tbody>
      <tr>
        <td style={{width: 300, fontWeight: "bold"}}>Description</td>
        <td>{selectedVoucher.description}</td>
      </tr>
      {/* <tr>
        <td style={{fontWeight: "bold"}}>Particular</td>
        <td>{selectedVoucher.particular}</td>
      </tr> */}
      <tr>
        <td style={{fontWeight: "bold"}}>Date</td>
        <td>{selectedVoucher.date}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Total Tax Amount</td>
        <td>{parseFloat(selectedVoucher.total_tax_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Total Amount</td>
        <td>{parseFloat(selectedVoucher.total_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Contract Amount</td>
        <td>{parseFloat(selectedVoucher.contract_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>PV Number</td>
        <td>{selectedVoucher.pvnumber}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary</td>
        <td>{selectedVoucher.beneficiary?.name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary Bank</td>
        <td>{selectedVoucher.beneficiaries_account?.bank_name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary Account Name</td>
        <td>{selectedVoucher.beneficiaries_account?.account_name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary Account Number</td>
        <td>{selectedVoucher.beneficiaries_account?.bank_account}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Payment Status</td>
        <td><Badge bg={selectedVoucher.payment_status === "0" ? "warning" : "success"}>{selectedVoucher.payment_status === "0" ? "Pending" : "Paid"}</Badge></td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Aproval Status</td>
        <td><Badge bg={selectedVoucher.approval_status === "0" ? "warning" : selectedVoucher.approval_status === "1" ? "success" : selectedVoucher.approval_status === "2" ? "danger" : "null"}>{selectedVoucher.approval_status === "0" ? "Pending" : selectedVoucher.approval_status === "1" ? "Approved" : selectedVoucher.approval_status === "2" ? "Disapproved" : "null"}</Badge></td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Prepared By</td>
        <td>{selectedVoucher.preparer_detail?.name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Approved By</td>
        <td>{selectedVoucher.approver?.name}</td>
      </tr>
    </tbody>
  </table>
  </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
  <Accordion.Header>Uploaded Document</Accordion.Header>
  <Accordion.Body>
  {selectedVoucher && selectedVoucher.document ? (
      selectedVoucher.document.endsWith('.pdf') ? (
        <iframe
          title="PDF Viewer"
          src={selectedVoucher.document}
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      ) : (
        <img src={selectedVoucher.document}  style={{ width: '100%', height: '500px', border: 'none' }}  alt="Uploaded Document" />
      )
    ) : (
      <p>No document available</p>
    )}
  </Accordion.Body>
</Accordion.Item>


                            </Accordion>

                        

                </div>


                <div class="modal-footer" style={{marginTop:"20px"}}>
                                {/* Conditionally rendering buttons based on selectedVoucher value */}
                                {selectedVoucher.approval_status === "0" && (
                                  <>
                                    <Button variant="success" onClick={handleApprove}>
                                      {loading ? (
                                        <>
                                          <Spinner size='sm' />
                                          <span style={{ marginLeft: '5px' }}>Approving, Please wait...</span>
                                        </>
                                      ) : (
                                        "Approve Payment"
                                      )}
                                    </Button>
                                    <Button variant="danger" onClick={handleShow}>
                                        Disapprove Payment
                                    </Button>
                                  </>
                                )}
                                <Button variant="success" onClick={handlePrintInvoice}>
                                  Print Payment Voucher
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

export default ViewCompletedPaymentVoucher;