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

function ViewPendingPaymentVoucher() {
    const location = useLocation();
  const { selectedVoucher } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instructionLoading, setInstructionLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//   const navigate = useNavigate();
//   const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
//     const [selectedDebitAccount, setSelectedDebitAccount] = useState(null);
//     const [date, setDate] = useState('');
//     const [updateDate, setUpdateDate] = useState('');
//     const [creditAccount, setCreditAccount] = useState([]);
//     const [selectedCreditAccount, setSelectedCreditAccount] = useState("");
//     const [selectedBank, setSelectedBank] = useState("");
//     const [ben, setBen] = useState([]);
//     const [benBank, setBenBank] = useState([]);
//     const [debitAccount, setDebitAccounts] = useState([]);
//     const [totalAmount, setTotalAmount] = useState("");

    const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [creditAccount, setCreditAccount] = useState([]);
    const [selectedCreditAccount, setSelectedCreditAccount] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [ben, setBen] = useState([]);
    const [benBank, setBenBank] = useState([]);
    const [debitAccount, setDebitAccounts] = useState([]);
    const [tax, setTax] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    // const [bearer, setBearer] = useState('');
    const [contractAmount, setContractAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const navigate = useNavigate();
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [selectedDebitAccount, setSelectedDebitAccount] = useState(null);
    const [formData, setFormData] = useState([{ sn: 1, tax: '', percentage: '', amount: '' }]);



    const fetchBenAcct = async (selectedBeneficiary) => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/beneficiaryaccounts/getaccount?beneficiary_id=${selectedBeneficiary}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );

            const paid = response.data?.data || [];
            console.log(paid, 'paid');
            setBenBank(paid);

        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };


    // const handlePayment = async () => {
    //     console.log(date, totalAmount, totalTax, selectedCreditAccount, selectedBeneficiary, description, contractAmount, selectedFiles, selectedCreditAccount, selectedBank);
    //     setLoad(true);
    //     try {
    //         const formData = new FormData();
    //         formData.append('date', date);
    //         formData.append('total_amount', totalAmount);
    //         formData.append('total_tax_amount', totalTax);
    //         formData.append('gl_account', selectedCreditAccount);
    //         formData.append('beneficiary_account_id', selectedBank);
    //         formData.append('beneficiary_id', selectedBeneficiary);
    //         formData.append('description', description);
    //         formData.append('contract_amount', contractAmount);
    //         formData.append('account', selectedCreditAccount);
    //         formData.append('document', selectedFiles[0]);



    //         const response = await axios.post(`${BASE_URL}/payment_voucher/create-new`,
    //             formData,
    //             {
    //                 headers: {
    //                     ...headers,
    //                     'Content-Type': 'multipart/form-data', // Set content type to multipart form data
    //                 }
    //             }
    //         );
    //         console.log(response);
    //         navigate('/accounting/payables/payment_voucher');
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Success',
    //             text: response.data.message,
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         const errorStatus = error.response.data.message;
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Failed',
    //             text: errorStatus,
    //         });
    //         console.log(error);
    //     } finally {
    //         setLoad(false);
    //     }
    // };

    const fetchdebitAccounts = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(`${BASE_URL}/get-account-by-class-id?class_id=${5}`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );

            const resultx = responses.data?.data;
            // console.log(resultx,"here");
            setDebitAccounts(resultx);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            // console.log(errorStatus);
            setDebitAccounts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCreditAccount = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(`${BASE_URL}/get-account-by-category-id?category_id=${3}`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );

            const resultxx = responses.data?.data;
            // console.log(resultx,"here");
            setCreditAccount(resultxx);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            // console.log(errorStatus);
            setCreditAccount([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBeneficiaries = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/beneficiary`, { headers });


            const results = response.data?.data;
            setBen(results);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setBen([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchCreditAccount();
            fetchBeneficiaries();
            // fetchTax();
            fetchdebitAccounts();
        }
    }, [bearer]);

    



    const handleBeneficiaryChange = (event) => {
        setSelectedBeneficiary(event.target.value);
        setSelectedBank(null);
        setBenBank([]);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    };

    const handleCredit = (event) => {
        setSelectedCreditAccount(event.target.value);
    };

    const handleDebit = (event) => {
        setSelectedDebitAccount(event.target.value);
    };

    const handleValueChange = (value, name, values) => {
        setContractAmount(value); // Update the balance state

    };

    const handleValueChange2 = (value, name, values) => {
        setTotalAmount(value); // Update the balance state

    };



    useEffect(() => {
        if (bearer && selectedBeneficiary) {
            fetchBenAcct(selectedBeneficiary);
        }
    }, [bearer, selectedBeneficiary]);


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

  const calculateTotalAmount = () => {
    const total = formData.reduce((accumulator, row) => accumulator + parseFloat(row.amount || 0), 0);
    return total.toFixed(2);
};

const calculateTotal = () => {
    const totalResult = (parseFloat(contractAmount || 0) - parseFloat(totalTax)).toFixed(2);
    return totalResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

    const  rows = location.state;
    // const parsedSelectedBank = JSON.parse(selectedBank);

useEffect(() => {
    const { rows } = location.state;

    if (rows) {
     
      const total = rows.reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
    //   setTotalNetPay(total);

    //   const totalInWords = convertToWords(total);
    //   setTotalNetPayInWords(totalInWords);

    //   setPaymentInstruction(rows);

    } else {
      console.error('No selected item data found in location state.');
    }
  }, [location.state]);


useEffect(() => {
    const totalTaxValue = calculateTotalAmount();
    setTotalTax(totalTaxValue);

    const totalAmountValue = calculateTotal();
    setTotalAmount(totalAmountValue);

}, [formData, contractAmount, totalTax]);



const handlePayments = async () => {

    const formData = new FormData();
            formData.append('date', date);
            formData.append('total_amount', totalAmount);
            // formData.append('total_tax_amount', totalTax);
            formData.append('gl_account', selectedCreditAccount);
            formData.append('beneficiary_account_id', selectedBank);
            formData.append('beneficiary_id', selectedBeneficiary);
            formData.append('description', description);
            formData.append('contract_amount', contractAmount);
            formData.append('account', selectedCreditAccount); 
            formData.append('document', selectedFiles[0]);
    // Display a confirmation dialog using Swal
    Swal.fire({ 
      title: 'Are you sure?', 
      text: 'This action will generate a payment instruction. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setInstructionLoading(true);
        try {
          const ids = rows.map(row => row.id);
        
          const response = await axios.post(`https://api-sme.promixaccounting.com/api/v1/payment_voucher/make-voucher-payment`,
            // {
            //   id: ids,
            //   bank: parsedSelectedBank.id,
            //   gateway: "instruction"
            // },
            { headers });
            window.print();
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);

        } finally {
          setInstructionLoading(false);
        }
      }
    });
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
                            <h3>View Payment Voucher</h3>
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
                        {/* <tr>
                            <td style={{fontWeight: "bold"}}>Aproval Status</td>
                            <td><Badge bg={selectedVoucher.approval_status === "0" ? "warning" : selectedVoucher.approval_status === "1" ? "success" : selectedVoucher.approval_status === "2" ? "danger" : "null"}>{selectedVoucher.approval_status === "0" ? "Pending" : selectedVoucher.approval_status === "1" ? "Approved" : selectedVoucher.approval_status === "2" ? "Disapproved" : "null"}</Badge></td>
                        </tr> */}
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
        <Accordion.Item eventKey="2">
            <Accordion.Header>Make Payment</Accordion.Header>
            <Accordion.Body>
            <div className={classes.header2}>
                <h3 style={{paddingBottom:'40px'}}>Make Payment Below</h3>
            <Form>
        
              <div className={classes.formContainer}>
              <div className={classes.formCont}>
                <Form.Group className={classes.formGroup}>
                      <Form.Label > Transaction Date</Form.Label>
                      <Form.Control type='date' id="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group className={classes.formGroup}>
                    <Form.Label  >Total Amount</Form.Label>
                    
                    <CurrencyInput
                        name="contract-amount" // Provide a unique name for each CurrencyInput
                        decimalsLimit={2}
                        value={parseFloat(selectedVoucher.total_tax_amount).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                        className="form-control"
                        // onValueChange={(value) => handleValueChange2(value)}
                        style={{ textAlign: "right", border: "1px solid #e4e4e4" }}
                        readOnly
                    />

                  </Form.Group>  

                  <Form.Group className={classes.formGroup}>
                    <Form.Label  >Amount To Pay</Form.Label>
                    <CurrencyInput
                        name="contract-amount" // Provide a unique name for each CurrencyInput
                        decimalsLimit={2}
                        value={totalAmount}
                        className="form-control"
                        onValueChange={(value) => handleValueChange2(value)}
                        style={{ textAlign: "right", border: "1px solid #e4e4e4" }}
                        readOnly
                    />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                      <Form.Label >Payment Mode</Form.Label>
                      <Form.Select id="disabledSelect">
                        <option value="">Select Mode</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                    <Form.Label  >Cheque Number </Form.Label>
                    <CurrencyInput
                        name="contract-amount" // Provide a unique name for each CurrencyInput
                        decimalsLimit={2}
                        value={contractAmount}
                        className="form-control"
                        onValueChange={(value) => handleValueChange(value)}
                        style={{ textAlign: "right", border: "1px solid #e4e4e4" }}
                    />
                  </Form.Group>

                          
                  <Form.Group className={classes.formGroup}>
                      <Form.Label >Debit account (DR)</Form.Label>
                      <Form.Select id="disabledSelect"
                      onChange={handleDebit}
                      value={selectedDebitAccount}
                      >
                        <option>Select debit account</option>
                        {debitAccount.map((account)=>(
                          <option key={account.id} value={account.id}>
                            {account.gl_name}
                            {account.id}
                          </option>
                        ))}
                      </Form.Select>
                  </Form.Group>

                  <Form.Group className={classes.formGroup}>
                      <Form.Label >Credit account (CR)</Form.Label>
                      <Form.Select id="disabledSelect"
                        onChange={handleCredit}
                        value={selectedCreditAccount}
                      >
                        <option>Select credit account</option>
                      {debitAccount.map((debitAccount)=>(
                          <option key={debitAccount.id} value={debitAccount.id}>
                            {debitAccount.gl_name}
                            {debitAccount.id}
                          </option>
                      ))}
                      </Form.Select>
                  </Form.Group>

                  
                </div>
              </div>
            </Form>
          </div>

            <div class="modal-footer" style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Button variant="success" 
                onClick={handlePayments} 
                style={{marginTop:'20px'}}>
                    Make Payment
                </Button>
            </div>

            </Accordion.Body>
        </Accordion.Item>


    </Accordion>

                        

                </div>


                <div class="modal-footer" >
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
                                <Button variant="success" 
                                onClick={handlePrintInvoice} 
                                style={{marginTop:'20px'}}>
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

export default ViewPendingPaymentVoucher;