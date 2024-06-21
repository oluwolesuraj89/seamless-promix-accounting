import React, { useState, useEffect } from 'react';
import classes from './PurchaseInvoice.module.css';
import { Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyInput from 'react-currency-input-field';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InventoryDash from '../Inventory Dashboard/InventoryDash';


export default function PurchaseInvoice() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [bearer, setBearer] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [trashClicked, setTrashClicked] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [admin, setAdmin] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [selectedRole1, setSelectedRole1] = useState("");
  const [phone, setPhone] = useState("");
  const [roless, setRoless] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [outstanding, setOutstanding] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [amountToPay, setAmountToPay] = useState('');
  const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
    const [tableData2, setTableData2] = useState([]);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('tobi');
      const value2 = await AsyncStorage.getItem('permissions');
      const value3 = await AsyncStorage.getItem('admin');

      if (value !== null) {
        setBearer(value);
      }
      if (value1 !== null) {
        setUser(value1);
      }
      if (value2 !== null) {
        setPermissions(value2);
      }
      if (value3 !== null) {
        setAdmin(value3);
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



  const fetchData = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/fetch-purchases-invoice`, { headers });
      const results = response.data?.data;
      console.log(results, "lll");
      setTableData(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        navigate('/login');
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData([]);
      }
    } finally {
      setRoleLoading(false);
    }
  };
  const fetchData3 = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
      const results = response.data?.data;
      // console.log(results);
      setTableData2(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        navigate('/login');
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData([]);
      }
    } finally {
      setRoleLoading(false);
    }
  };

  const fetchData1 = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/fetch-pending-purchases-invoice`, { headers });
      const roleList = response.data?.data;
      console.log(roleList, ".LLSKKS");
      setRoless(roleList);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
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
  const handleDebitChange = (event) =>{
    setSelectedDebitAccount(event.target.value);
}


  useEffect(() => {
    if (bearer) {
      fetchData();
      fetchData1();
      fetchData3();
    }
  }, [bearer]);

 
  


  const filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  const displayedData = filteredData.slice(startIndexx - 1, endIndexx);


  const handleEyeClick = (id) => {

    const foundInvoice = tableData.find(item => item.id === id);
    //  console.log(foundInvoice);
  navigate('/inventory/update_purchase_invoice', { state: { foundInvoice } });

    setEyeClicked(true);
  };




  const handleTrashClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this invoice.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (!confirmed.isConfirmed) {
      return; // User canceled, do nothing
    }

    try {
      const response = await axios.get(`${BASE_URL}/role/delete-role?role_id=${id}`, { headers });
      fetchData();
     toast.success(response.data.message);
      setTrashClicked(true);
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
    }
  };

  const handleCreate = () => {
    navigate('/inventory/create_purchase_invoice');
  };

  const handlePrintInvoice = (id) => {
    const selectedInvoice = tableData.find(item => item.id === id);
  
  
    navigate('/inventory/official_purchase_invoice', { state: { selectedInvoice } });
  };

  const handleSalesChange = (event) => {
    const selectedId = event.target.value;
    setSelectedInvoice(selectedId);
    
    const intselectedId = parseInt(selectedId);
    const selectedInvoice = roless.find(item => item.id == intselectedId);
    setDescription(selectedInvoice?.description || '');
    setAmount(selectedInvoice?.amount || '');
    setOutstanding(selectedInvoice.balance || '');

};

const formattedAmount = isNaN(parseFloat(amount)) ? '0.00' : parseFloat(amount).toLocaleString('en-US', {
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formattedOutstanding = isNaN(parseFloat(outstanding)) ? '0.00' : parseFloat(outstanding).toLocaleString('en-US', {
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const handleValueChange = (value, name, values) => {
  setAmountToPay(value); 
  
};



const createPayment = async () => {
  setPaymentLoading(true);

  try {
      let requestData = {
          id: selectedInvoice,
          debit_gl_code: selectedDebitAccount,
          // credit: selectedCreditAccount,
          amount: amountToPay || '', 
      };

      

      console.log(selectedInvoice, requestData);
      const response = await axios.post(
          `${BASE_URL}/pay-purchase-invoice`,
          requestData,
          { headers }
      );

     toast.success(response.data.message);
     fetchData();
     fetchData1();
handleClose();
     
      setSelectedInvoice('');
      setAmountToPay('');
      setSelectedDebitAccount('');
      setDescription('');
      setAmount('');
      setTotalAmount('');
      setOutstanding('');

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
      setPaymentLoading(false);
  }
};


  return (
    <div>
      <InventoryDash />

      <div className={classes.finishedbodyCont}>
        <div className={classes.topPadding}>
          <div className={`${classes.formSecCont}`}>
            <div className={classes.formSectionHeader}>
              <h3>Purchase Invoice</h3>
            </div>
            <div className={classes.formSectionHeader}>
              <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
            </div>
          </div>
        </div>

        {/* <div className={classes.analysis}>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL INCOME</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                    <div className={classes.analysisCont}>
                        <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                        <h5>N232,096,635.05</h5>
                        <div className={classes.perceCont}>
                            <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                            <p>vs average</p>
                        </div>
                    </div>
                </div> */}


        <div className={classes.mainform}>

          <div className={classes.loandgrantcards}>
           
            <div className={classes.loandethead}>
              <div className={classes.formLabel}>
              </div>
              <div className={classes.formIntBtn}>
                <Button variant="success" onClick={handleCreate} className={classes.btn2}> Create New Invoice</Button>
                {/* <Button variant="primary" onClick={handleShow} className={classes.btn1}> Make Payment</Button> */}
              </div>
            </div>
           
            <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Purchase Invoice Payment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Purchase Invoice ID:</Form.Label>
                            <Form.Select
                              type="text"
                              // placeholder="Enter Description"
                              // autoFocus
                              value={selectedInvoice}
                              onChange={handleSalesChange}
                            >
                                <option value="" disabled>Select Invoice</option>
                                {roless.map((item)=>(
                                 <option key={item.id} value={item.id}>
                                 {item.invoice_number} - {item?.supplier?.name}
                             </option>
                                ))}
                            </Form.Select>
                            <Form.Label style={{ marginTop: 20 }}>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Description"
                              // autoFocus
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            
                            <div style={{ marginTop: 20 }} />
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Total Amount"
                              // autoFocus
                              disabled
                              value={formattedAmount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                            <div style={{ marginTop: 20 }} />
                            <Form.Label>Outstanding</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter outstanding"
                              // autoFocus
                              disabled
                              value={formattedOutstanding}
                              onChange={(e) => setOutstanding(e.target.value)}
                            />

<div style={{ marginTop: 20 }} />
                            <Form.Label>Amount</Form.Label>
                            <CurrencyInput
                                                                                //   
                                                                                name="amount-to-pay"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={amountToPay} // Set the value to the balance state
                                                                                onValueChange={handleValueChange}
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />

<div style={{ marginTop: 10 }} />
                            
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Debit Account</Form.Label>
                            <Form.Select
                              type="text"
                              value={selectedDebitAccount}
                              onChange={handleDebitChange}
                            >
                              <option value="" disabled>Select Debit Account</option>
                              {tableData2.map((item)=>(
                                <option key={item.id} value ={item.id}>
                                  {item.gl_name}
                                </option>
                              ))}


                            </Form.Select>
                            
                            <div style={{ marginTop: 10 }} />
                            
                          </Form.Group>
                        </Form>
                      </Modal.Body>


                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createPayment}>
                    {paymentLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
    </>
  ) : (
                "Make Payment"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

            <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
              <div className={classes.greenbtn} style={{ display: 'flex', gap: '20px' }}>
                <div className={classes.actionsBtns}>
                  <Button variant='success'>Copy</Button>
                  <Button variant='success'>Excel</Button>
                  <Button variant='success'>PDF</Button>
                  <Button variant='success'>Column visibility</Button>
                </div>
                <div>
                  <label className="d-flex justify-content-start align-items-center">
                    Show
                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm"
                    //  value={entriesPerPage}
                    //     onChange={(e) => {
                    //     setEntriesPerPage(parseInt(e.target.value));
                    //     setCurrentPage(1);
                    //     }}
                    >
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
                      // value={searchTerm}
                      className="form-control form-control-sm"
                      placeholder=""
                      aria-controls="DataTables_Table_0"
                    // onChange={(e) => {
                    // setSearchTerm(e.target.value);


                    // }}
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className={classes.mainTable}>
            {roleLoading ? (
                              <p>Fetching purchase invoices...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                            <tr>
                            <th>S/N</th>
                                      <th>Invoice Number</th>
                                      <th>Description</th>
                                      <th>Supplier</th>
                                      <th>Amount</th>
                                      <th>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap', }}>
                            {displayedData.map((item, index) => (
                             <tr key={index}>
                             <td>{index + 1}</td>
                                        <td>{item.invoice_number}</td>
                                        <td style={{textAlign: "left"}}>{item.description}</td>
                                        <td>{item.supplier?.name}</td>
                                        <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                         <td>
                                      <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                      <i className="far fa-eye" style={{color: "#008a4b", backgroundColor: "#28a7451a", padding: 2, borderColor: "#28a7454d", borderRadius: 5, fontSize:12}}></i>
                                      </div>
                                      <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                      <i className="far fa-trash-alt"  style={{color: "#dc3545", backgroundColor: "#dc35451a", padding: 2, borderColor: "#dc35454d", borderRadius: 5, fontSize:12}}></i>
                                      </div>
                                      <div onClick={() => handlePrintInvoice(item.id)} className="btn btn-sm printbtninv">
                                    <i className="fa fa-print dawg"  style={{color: "#17a2b8", backgroundColor: "#afe1e9", padding: 2, borderColor: "#b0d1d6", borderRadius: 5, fontSize: 12}}></i>
                                  </div>
                                    </td>
                              </tr>
                            ))}
                          </tbody>
                                </table>
                              </div>
                            )}
            </div>

            <div className={classes.endded}>
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
                  // Show only 5 pages or less if available
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
            </div>

          </div>
        </div>

      </div>

   


    

    </div >
)
}