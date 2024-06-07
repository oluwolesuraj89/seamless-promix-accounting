import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from '../Manage Members/ManageMember.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CoopDashboard from '../../Cooperative Dashboard/CoopDashboard';
// import favicon from '../../Images/faviconn.png'

function SavingExcel() {
    const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [savingType, setSavingType] = useState([]);
  const [banks, setBanks] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  const [savingsLoading, setSavingsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadd, setLoadd] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState("");
  const [selectedSavings, setSelectedSavings] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const handleSavingsChange = (selectedOption) => {
    setSelectedSavings(selectedOption);
  }

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
  }

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


  const uploadExcel = async () => {
    setUploadLoading(true);
      try {
        const formData = new FormData();
      formData.append('file', selectedFile[0]);
     
      // console.log(selectedFile);
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${bearer}`,
      };
  
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-payment',
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
        
        
  
    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-bulk-journal-excel',
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
          const response = await axios.get(
              `https://api-sme.promixaccounting.com/api/v1/beneficiaryaccounts/getaccount?beneficiary_id=${selectedBeneficiary}`,
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
        const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });
        const results = response.data?.data;
  
        const options = results.map((item) => ({
          label: item.name,
          value: item.id,
        }));
  
        setTableData(results);
        setSelectOptions(options);
      } catch (error) {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchDebit = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
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

  const fetchBanks = async () => {
    setBankLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-account-by-class-id?class_id=${1}`, { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.gl_name,
        value: item.id,
      }));
      setBanks(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setBanks([]);
    } finally {
      setBankLoading(false);
    }
  };

  
  
  const fetchSavingType = async () => {
    setSavingsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/account/fetch-savings`, { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
        value: item.id,
      }));
      setSavingType(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setSavingType([]);
    } finally {
      setSavingsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchBanks();
      fetchSavingType();
    }
  }, [bearer]);
  

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <CoopDashboard/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Upload Savings Excel</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
            </div>

            <div style={{backgroundColor:'white', padding:'10px 20px'}}>
              {/* <!--Content Header (Page header)--> */}
              <div className="content-header row align-items-center m-0">
              {/* {(isAdmin || permittedHeaders.includes('create-savings-account')) && ( */}
                {/* <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                  <div
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      justifyContent: "flex-end",
                      display: "flex",
                      marginLeft: "auto",
                    }}
                    className={classes.actionBtns}
                  >
                    <Button variant="success" onClick={handleCreate}>
                      Create New Accounts
                    </Button>
                  </div>

                </nav> */}
                 <nav aria-label="breadcrumb" className=" order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      <Button variant="success" onClick={handleShow}>
                        Upload Excel Savings
                      </Button>

                     <a href="https://api-sme.promixaccounting.com/api/v1/payment_voucher/download-excel" download>
                    <Button variant="secondary" style={{marginLeft: 10}}>
                      Download Excel Template
                    </Button>
                  </a>
                    </div>

                  </nav>

                  <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Savings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control
                              type="date"
                            //   accept=".xlsx, .xls, .csv" 
                            //   onChange={handleFileChange}
                            />
                            <div style={{marginTop:'10px'}}/>
                            <Form.Label>Savings Account</Form.Label>
                            <Select
                                        value={selectedSavings}
                                        onChange={(selectedOption) => handleSavingsChange(selectedOption)}
                                        options={savingType}
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
                            <div style={{marginTop:'10px'}}/>
                            <Form.Label>Bank</Form.Label>
                            <Select
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
                                      />
                            <div style={{marginTop:'10px'}}/>
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
                "Upload Saving"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>
              {/* )} */}
              
                <div className="col-sm-8 header-title p-0">
                  <div className="media">
                    {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                    <div className="media-body">
                      {/* <h4 className="font-weight-bold">Savings Account</h4> */}
                      {/* <small>Create and view your Savings Accounts...</small> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <!--/.Content Header (Page header)--> */}
              <div className="body-content">
                <div className="row">

                  <div className="col-lg-12 col-xl-6">
                    <div className="row">

                      <div className="col-md-6 col-lg-6">

                        {/* <!--Feedback--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Balance indicator--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Time on site indicator--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Top Referrals--> */}

                      </div>
                      <div className="col-md-6 col-lg-6">

                        {/* <!--Sessions by device--> */}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                    <div className="card">


                    </div>
                  </div> */}




                

                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-resposive">
                          {/* <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                              <div>
                                <button>Copy</button>
                                <button>Excel</button>
                                <button>PDF</button>
                                <button className={classes.diffbtn}>Column visibility</button>
                              </div>
                              <div>
                                <label className="d-flex justify-content-start align-items-center">
                                  Show
                                  <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                    onChange={(e) => {
                                      setEntriesPerPage(parseInt(e.target.value));
                                      setCurrentPage(1);
                                    }}>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="text-right modal-effect ">
                              <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                <div className="d-flex justify-content-start align-items-center">
                                  <div className="mr-2">Search:</div>
                                  <input
                                    type="search"
                                    value={searchTerm}
                                    className="form-control form-control-sm"
                                    placeholder=""
                                    aria-controls="DataTables_Table_0"
                                    onChange={(e) => {
                                      setSearchTerm(e.target.value);
                                      
                                    }}
                                  />
                                </div>

                              </div>
                            </div>
                          </div> */}


                          {/* {isLoading ? (
                            <p>Fetching accounts...</p>
                          ) : ( */}
                            <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{  textAlign: "center", alignItems: "center", whiteSpace: "nowrap", }}>
                                <tr>
                                    <th>S/N</th>
                                    <th style={{ width: '22%', }}>Transaction Date</th>
                                    <th style={{ width: '22%', }}>Beneficiary</th>
                                    <th  style={{ width: '22%' }}>Account No</th>
                                    <th  style={{ width: '22%' }}>Account Name</th>
                                    <th  style={{ width: '22%' }}>Bank Name</th>
                                    <th style={{ width: '22%', }}>Debit GL Code</th>
                                    <th style={{ width: '22%', }}>Credit GL Code</th>
                                    <th style={{ width: '30%', }}>Amount</th>
                                
                                    {/* <th ><Button variant="primary" onClick={() => addRow()}>
                                    <i className="fas fa-plus"></i>

                                    </Button></th> */}
                                </tr>
                                </thead>
                                <tbody style={{  textAlign: "left",  }}>
                                {postData.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.transaction_date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.account_number}</td>
                                    <td>{item.account_name}</td>
                                    <td>{item.bank_name}</td>
                                    <td>{item.debit_GL_code}</td>
                                    <td>{item.credit_GL_code}</td>
                                    <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                })}</td>
                                    
                                    </tr>
                                ))}
                                </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: 20 }} />
                          
                          <div style={{justifyContent: "flex-start"}}  class="modal-footer">
                            <Button style={{borderRadius: 0}} variant='success' onClick={handlePosting}>
                              {loadd ? (
                                <>
                                  <Spinner size='sm' />
                                  <span style={{ marginLeft: '5px' }}>Saving, Please wait...</span>
                                </>
                              ) : (
                                "Save Savings"
                              )}
                            </Button>

                          </div>



                          {/* )} */}
                          {/* <div className={classes.endded}>
                            <p>
                              Showing {startIndexx} to {endIndexx} of {totalEntries} entries
                            </p>
                            <div style={{ display: 'flex' }}>
                              <button
                                style={{ border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginRight: 10, cursor: "pointer" }}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                              {[...Array(totalPages)].map((_, page) => {
                             
                                if (page < 5 || page === currentPage - 1 || page === totalPages - 1) {
                                  return (
                                    <button
                                      key={page + 1}
                                      style={{
                                        marginLeft: '0.4rem',
                                        marginRight: '0.4rem',
                                        fontSize: '14px',
                                        fontFamily: 'nunito',
                                        fontWeight: 400,
                                        color: page + 1 === currentPage ? '#ffffff' : '#000',
                                        backgroundColor: page + 1 === currentPage ? '#28a745' : 'gainsboro',
                                        height: '2.5rem',
                                        borderRadius: '89px',
                                        padding: '0.5rem',
                                        border: 'none',
                                        width: '40px',
                                        cursor: "pointer"
                                      }}
                                      onClick={() => setCurrentPage(page + 1)}
                                    >
                                      {page + 1}
                                    </button>
                                  );
                                }
                                return null;
                              })}
                              <button
                                style={{ cursor: "pointer", border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginLeft: 10 }}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          </div> */}

                          

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/.body content--> */}
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

export default SavingExcel;