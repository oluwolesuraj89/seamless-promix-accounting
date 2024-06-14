import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './Requisition.module.css';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import StockDashboard from '../Stock Dashboard/StockDashboard';

function ViewRequisition() {
    const [user, setUser] = useState("");
   
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [tableData1, setTableData1] = useState([]);
    const [createLoading, setCreateLoading] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [buttonShow, setButtonShow] = useState(false);
    const [description, setDescription] = useState(null);
    const [createLoadings, setCreateLoadings] = useState(false);
    const [releasedLoading, setReleaseLoading] = useState(false);

    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedRequisition } = location.state || {};
    const [requestId, setRequestId] = useState(selectedRequisition[0].request_id);
    const stocksArray = selectedRequisition.map(item => item.stocks);
    const reasons = selectedRequisition.map(item => item.description.length > 0 ? item.description[0].description : null);
const quantityArray = selectedRequisition.map(item => item.quantity);
console.log(selectedRequisition);

const formData = stocksArray.map((item, index) => ({
    itemsDescription: item.name,
    qty: quantityArray[index]
}));

    useEffect(() => {
        if (selectedRequisition[0].approval_status === "0" || selectedRequisition[0].approval_status === "2") {
        setButtonShow(false);
        } else {
        setButtonShow(true);
        }
    }, [selectedRequisition]);

    // useEffect(() => {
    //     setButtonShow1(selectedRequisition[0].approval_status === "1");
    //   }, [selectedRequisition]);

  
    useEffect(() => {
        const calcTotQty = () => {
            if (selectedRequisition) {
                const quantities = selectedRequisition.map(item => item.quantity);
                const totalQuant = quantities.reduce((total, qty) => total + parseFloat(qty) || 0, 0);
                setTotalQuantity(totalQuant.toString());
            } else {
                setTotalQuantity('');
            }
        };
    
        calcTotQty();
    }, [selectedRequisition]);
    
    // Ensure this useEffect runs only once to calculate the initial total quantity
    useEffect(() => {
        if (!totalQuantity) {
            const quantities = selectedRequisition?.map(item => item.quantity) || [];
            const totalQuant = quantities.reduce((total, qty) => total + parseFloat(qty) || 0, 0);
            setTotalQuantity(totalQuant.toString());
        }
    }, [selectedRequisition, totalQuantity]);
  

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

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };

      const goBack = () => {
        navigate(-1);
      }
    
     
      

   
  const fetchItems = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get(`${BASE_URL}/items/fetch-all`, { headers });
      const ite = response?.data?.data;
      setTableData1(ite);
      console.log(ite);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
        fetchItems();
    }
}, [bearer]);

 
const calculateTotalQuantity = () => {
    const total = formData.reduce((total, row) => total + parseFloat(row.qty) || 0, 0);
    setTotalQuantity(total);
    // console.log(totalQuantity);
};

useEffect(() => {
    calculateTotalQuantity();
  }, [formData]);







const ApproveRequest = async () => {

  setCreateLoading(true);
  try {
console.log(requestId, "inside");
  
      const response = await axios.get(
          `${BASE_URL}/stocks/approve-requisition?request_id=${requestId}`,
          
              {headers}
      );
      // console.log(response.data.message)
      // return
      toast.success(response.data.message);
      // console.log(response.data);
      navigate(-1);

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
      toast.error(errorMessage);
      console.log(error);
    }
  } finally {
      setCreateLoading(false);
  }
  
};

const handleDisApprove = async () => {

  setIsLoading(true);
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks/disapprove-requisition?request_id=${requestId}&description=${description}`,
      {headers}
    );
    // console.log(response.data.message)
    
    toast.success(response.data.message);
    //   console.log(response.data, "here");
   navigate(-1);
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
        toast.error(errorMessage);
        console.log(error);
      }
  } finally {
    setIsLoading(false);
  }
  
};

const releaseRequistion = async () => {

  setReleaseLoading(true);
  try {
      const response = await axios.post(
          `${BASE_URL}/stocks/release-requisition`,
          {
              request_id: requestId,
          },
          { headers }
        );
      console.log(response)
    // return
  toast.success(response.data.message);
   //   console.log(response.data, "here");
  navigate(-1);
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
      toast.error(errorMessage);
      console.log(error);
    }
  } finally {
    setReleaseLoading(false);
  }
};


  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <StockDashboard />
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Create Requisition</h3>
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

                    <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Reason for Disapproving</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Description</Form.Label>
                          <textarea
                          className="form-control"
                          rows="3" 
                          cols="50"
                          placeholder="Enter reason here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleDisApprove}>
                    {isLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                    </>
                ) : (
                "Disapprove Payment"
                      )}
                    </Button>
                  </Modal.Footer>
                </Modal>
                    <div className="row">
                    <div style={{ marginTop: 20 }} />
                    
                  
                        <div style={{ marginTop: 20 }} />
                    
                        
                        

                       

                       
                        


                        
                       
                        
                  

                        

                        <div style={{ marginTop: 20 }} />

                     
                       
                        <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                <th>Items Description</th>
                                                                                <th style={{width:'40%',}}>Quantity</th>
                                                                                {/* <th ><Button variant="primary" onClick={() => addRow()}>
                                                                                    <i className="fas fa-plus"></i>

                                                                                </Button></th> */}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                        {formData.map((row, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                        <input
                                                                                style={{ textAlign: "left" }}
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.itemsDescription}
                                                                                disabled
                                                                                
                                                                            />  
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                style={{ textAlign: "left" }}
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.qty}
                                                                                disabled
                                                                                
                                                                            />
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                ))}
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                        
                        <div className="col-md-11" style={{ marginLeft: 45, marginTop: 30 }}>
                          <div className="form-group row justify-content-end">
                            <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Total Quantity:</label>
                            <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                            <input style={{textAlign: "right",}} className="form-control" type="number" value={totalQuantity} onChange={(e)=> setTotalQuantity(e.target.value)} disabled/>
                            </div>
                          </div>
                        </div>













                      </div>

                <div style={{ marginTop: 20 }} />


                <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                {selectedRequisition[0].approval_status === "0" && (
                                                            <Button style={{borderRadius: 5, marginLeft: 10}} variant="success" onClick={ApproveRequest}>
                                                                {createLoading ? (
                                                                    <>
                                                                        <Spinner size='sm' />
                                                                        <span style={{ marginLeft: '5px' }}>Updating your requisition, Please wait...</span>
                                                                    </>
                                                                ) : (
                                                                    "Approve Requisition"
                                                                )}
                                                            </Button>
                                                             )}

                                                            {selectedRequisition[0].approval_status === "0" && (
                                                            <Button style={{borderRadius: 5, marginLeft: 10}} variant="danger" onClick={handleShow} >
                                                                {createLoadings ? (
                                                                    <>
                                                                        <Spinner size='sm' />
                                                                        <span style={{ marginLeft: '5px' }}>Updating your requisition, Please wait...</span>
                                                                    </>
                                                                ) : (
                                                                    "Disapprove Requisition"
                                                                )}
                                                            </Button>
                                                            )}
                                                           {selectedRequisition[0].is_released !== "1" && selectedRequisition[0].approval_status === "1" && (
  <Button style={{borderRadius: "0", margin:'0'}} variant="primary" onClick={releaseRequistion}>
    {releasedLoading ? (
      <>
        <Spinner size='sm' />
        <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
      </>
    ) : (
      "Release Requisition"
    )}
  </Button>
)}

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

export default ViewRequisition;