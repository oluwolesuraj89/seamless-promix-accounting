import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../../../assetss/assets/plugins/datatables/dataTables.bootstrap4.min.css"
// import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from '../Manage Members/ManageMember.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function LoanRepaymentExcel() {
    const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [postData, setPostData] = useState([]);
  const [benBank, setBenBank] = useState([]);
  const [formData, setFormData] = useState([{ sn: 1, beneficiary: '', beneficiaryAccount: '', debitGlCode: '', creditGlCode: '', amount: '', }]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [selectOptions2, setSelectOptions2] = useState([]);
  const [totalAmountCredit, setTotalAmountCredit] = useState('');
  const [totalAmountDebit, setTotalAmountDebit] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadd, setLoadd] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);


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

      const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    
    const uploadExcel = async () => {
      setUploadLoading(true);
        try {
          const formData = new FormData();
        formData.append('file', selectedFile[0]);
        formData.append('transaction_date', selectedDate);
       
        // console.log(selectedFile);
    
        const headers = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${bearer}`,
        };
    
        const response = await axios.post(`${BASE_URL}/customer/upload-excel`,
          formData,
          { headers }
        );
    handleClose();
    const postExcel = response.data?.data;
    // console.log(postExcel);
    setPostData(postExcel);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
    
        console.log(response.data.message);
      } catch (error) {
        const errorStatus = error.response.data.message;
    
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: errorStatus,
        });
    
        console.error(error);
      } finally {
        setUploadLoading(false);
        }
      };
    
    
      const handlePosting = async () => {
        setLoadd(true);
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          };
          // const uuids = postData.map((item) => item.uuid);
          
          
    
      const response = await axios.post(`${BASE_URL}/payment_voucher/post-bulk-journal-excel`,
       {
       uuid: postData[0].uuid
       },
        { headers }
      );
    
      setPostData([]);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
      
        } catch (error) {
          const errorStatus = error.response.data.message;
      
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: errorStatus,
          });
          // navigate('/pending_payment_voucher');
      
          console.error(error);
        } finally {
          setLoadd(false);
        }
      };
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
            const benAcc = paid.map((item) => ({
              label: item.bank_name,
              value: item.id,
            }));
            // console.log(paid, 'paid');
            setBenBank(benAcc);
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };
      
      
    const handleFormChange = (selectedOption, fieldName, rowIndex) => {
      if (fieldName === 'beneficiary') {
        fetchBenAcct(selectedOption.value);
      }
    
      setFormData(prevFormData => {
        const updatedFormData = [...prevFormData];
        updatedFormData[rowIndex] = {
          ...updatedFormData[rowIndex],
          [fieldName]: selectedOption
        };
        return updatedFormData;
      });
    };
    
    
      const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
      };
    
     
    
    
    
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };
    
      const fetchBeneficiaries = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/beneficiary`, { headers });
          const results = response.data?.data;
    
          const options = results.map((item) => ({
            label: item.name,
            value: item.id,
          }));
    
          setTableData(results);
          setSelectOptions(options);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            
            navigate('/login');
          } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setTableData([]);
        }
        } finally {
          setIsLoading(false);
        }
      };
    
      const fetchDebit = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/account`, { headers });
          const debitAcct = response.data?.data;
    
          const options1 = debitAcct.map((item) => ({
            label: item.gl_name,
            value: item.id,
          }));
    
          setTableData1(debitAcct);
          setSelectOptions1(options1);
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setTableData1([]);
        } finally {
          setIsLoading(false);
        }
      };
    
      const fetchAsset = async () => {
        setLoading(true);
    
        try {
          const response = await axios.get(`${BASE_URL}/get-account-by-class-id?class_id=${1}`,
            {
             
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const assetsAcc = response.data?.data;
          const options2 = assetsAcc.map((item) => ({
            label: item.gl_name,
            value: item.id,
          }));
    
          setTableData2(assetsAcc);
          setSelectOptions2(options2);
    
      
        } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
        } finally {
          setLoading(false);
        }
      };
    
     
    
    
      useEffect(() => {
        if (bearer) {
          fetchBeneficiaries();
          fetchDebit();
          fetchAsset();
    
        }
      }, [bearer]);
    
    
    
    
      const addRow = () => {
        const newRow = {
          sn: formData.length + 1,
          beneficiary: '', 
          beneficiaryAccount: '',
          debitGlCode: '', 
          creditGlCode: '', 
          amount: '',
        };
      
        setFormData(prevFormData => [...prevFormData, newRow]);
      };
    
       const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);
    };
    
    const handleFileChange = (event) => {
      const files = event.target.files;
      const fileList = Array.from(files);
      setSelectedFile(fileList);
      
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
                            <h3>Loan Payment Excel</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
            </div>
            <div className="content-header row align-items-center m-0">
                <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      

                     <a href="https://api-sme.promixaccounting.com/api/v1/customer/download-excel" download>
                    <Button variant="secondary" style={{marginLeft: 10}}>
                      Download Excel Template
                    </Button>
                  </a>
                    </div>

                  </nav>

                  <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Payment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
  <Form style={{ marginTop: 20 }}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Transaction Date</Form.Label>
      <Form.Control
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        name="date"
      />
      <Form.Label>Upload Excel File</Form.Label>
      <Form.Control
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileChange}
      />
    </Form.Group>
  </Form>
</Modal.Body>







                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={uploadExcel}>
                    {uploadLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Uploading, Please wait...</span>
    </>
  ) : (
                "Upload Payment"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                  <div className="col-sm-8 header-title p-0">
                    {/* <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Loan Payment Excel</h1>
                        <small>Upload your loans in excel ...</small>
                      </div>
                    </div> */}
                  </div>
                </div>
            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body">
                      <div className="table-resposive">
                      <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>     
                        </div>
                        <Button style={{borderRadius: 0}} variant="success" onClick={handleShow}>
                        Upload Excel Payment
                      </Button>
                        
                      </div>
                    </div>
                    </div>
            </div>

            {/* <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" type="date" value={selectedDate} onChange={handleDateChange} name="date" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Customer:</label>
                                <div className="col-sm-9">
                                    <Select

                                        onChange={handleSupplierChange}
                                        options={options}
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

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Type:</label>
                                <div className="col-sm-9">
                                    <Select

                                        onChange={handleLoanTypeChange}
                                        options={cusLoan}
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

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginBottom:"10px", desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Principal:</label>
                                <div className="col-sm-9">
                                    <  CurrencyInput
                                        name="amount-to-pay"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={totalPrincipal}
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount Paid:</label>
                                <div className="col-sm-9">
                                    <CurrencyInput
                                        //   
                                        name="amount-paid"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={amountPaid} // Set the value to the balance state
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group row" style={{ desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Outstanding:</label>
                                <div className="col-sm-9">
                                    <CurrencyInput
                                        //   
                                        name="outstanding"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={Outstanding} // Set the value to the balance state
                                        disabled
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row" style={{marginTop:'20px', desplay:"flex", justifyContent:"space-between", alignItems:'center'}}>
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount to Pay:</label>
                                <div className="col-sm-9" >
                                    <CurrencyInput
                                        //   
                                        name="amount-to-pay"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={amountToPay} // Set the value to the balance state
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                    />
                                </div>
                            </div>
                        </div>












    

</div>


</div>
                                            </div>
            </div> */}




           







            
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

export default LoanRepaymentExcel;