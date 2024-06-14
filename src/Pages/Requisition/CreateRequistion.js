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

function CreateRequistion() {
    const [user, setUser] = useState("");
   
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState([{ itemsDescription: '', qty: '',  }]);
  const [totalAmount, setTotalAmount] = useState('');
  const [itemList, setItemList] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
    const [reqLoading, setReqLoading] = useState(false);
    const [tableData1, setTableData1] = useState([]);
    const [createLoading, setCreateLoading] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
  
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();

  

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
    
     
      const addRow = () => {
        const newRow = {
            itemsDescription: '',
            qty: '',
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
        
    };

    const handleFormChange = (value, fieldName, rowIndex) => {
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[rowIndex] = {
                ...updatedFormData[rowIndex],
                [fieldName]: value,
            };
            return updatedFormData;
        });

    };

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

  const createRequisition = async () => {

    setCreateLoading(true);
    try {
        const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
const stocks = formData.map((row) => row.itemsDescription).filter((id) => id !== undefined);

        
        const response = await axios.post(
            `${BASE_URL}/stocks/create-request`,
            {
                total_quantity: totalQuantity,
                stock_name: stocks,
                quantity: quantities,   
            },
            { headers }
        );
        toast.success(response.data.message);
        console.log(response.data.message)
        setTotalQuantity("");
        setFormData([]);
        navigate(-1);

        // return
        console.log(response.data);

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

const calculateTotalQuantity = () => {
    const total = formData.reduce((total, row) => total + parseFloat(row.qty) || 0, 0);
    setTotalQuantity(total);
    // console.log(totalQuantity);
};

useEffect(() => {
    calculateTotalQuantity();
  }, [formData]);





const handleItemDescriptionChange = (selectedValue, rowIndex) => {
  
    handleFormChange(selectedValue, "itemsDescription", rowIndex);
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
                                                                                <th ><Button variant="primary" onClick={() => addRow()}>
                                                                                    <i className="fas fa-plus"></i>

                                                                                </Button></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            {formData.map((row, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <Form.Select
                                                                                        style={{width:'100%',}}
                                                                                        className="form-control"
                                                                                        onChange={(e) => handleItemDescriptionChange(e.target.value, index)}
                                                                                      
                                                                                        >
                                                                                        <option value="" >Choose Description</option>
                                                                                        {tableData1.map((item) => (
                                                                                            <option key={item.id} value={item.id}>
                                                                                            {item.name}
                                                                                            </option>
                                                                                        ))}
                                                                                        </Form.Select>

                                                                                    </td>
                                                                                    <td>
                                                                                    <input
                    style={{ textAlign: "right" }}
                    type="text"
                    className="form-control"
                    value={row.qty}
                    onChange={(e) => handleFormChange(e.target.value, "qty", index)}
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
                    <Button style={{borderRadius: 5, marginLeft: 10}} variant="success" onClick={createRequisition}>
                    {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                    </>
                                  ) : (
                                    "Make Requisition"
                                  )}
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

export default CreateRequistion;