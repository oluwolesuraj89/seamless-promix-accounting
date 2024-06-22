import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './CreateStockDelivery.module.css';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import InventoryDash from '../Inventory Dashboard/InventoryDash';


const initialState = () => {
  const unitPrice = '';
  const qty = '';
  return [{ items: '', unitPrice, qty, totalPrice: unitPrice * qty }];
};

function CreateStockDelivery() {
    const [user, setUser] = useState("");
    const [address, setAddress] = useState("");
    const [filterLoading, setFilterLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [debitGl, setDebitGl] = useState('');
    const [glMethod, setGlMethod] = useState([]);
    const [sICode, setSICode] = useState('');
    const [selectedAccountName, setSelectedAccountName] = useState('');
    const [accountName, setAccountName] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [description, setDescription] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [debitCode, setDebitCode] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    // const [loading, setLoading] = useState(false);
    const [totalCharge, setTotalCharge] = useState("");
    const [itemList, setItemList] = useState([]);
    const [selectOptions1, setSelectOptions1] = useState([]);
    const [debitAccount, setDebitAccounts] = useState([]);
    const [ben, setBen] = useState([]);
    const [orders, setMyOrders] = useState([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [totalSupplied, setTotalSupplied] = useState("");
    const [benBank, setBenBank] = useState([]);

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
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

    
    

      const handleBeneficiaryChange = (selectedOption) => {
        setSelectedBeneficiary(selectedOption.value);
        setSelectedOrder("");
        setTotalSupplied("");
       setFormData([]);
        setMyOrders([]);

    };
    const handleOrderChange = (selectedOption) => {
        setSelectedOrder(selectedOption.value);
    };

  
    
    useEffect(() => {
      if (bearer && selectedBeneficiary) {
          fetchBenAcct(selectedBeneficiary);
      }
  }, [bearer, selectedBeneficiary]);
    


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
  };
    

  const createPurchaseDelivery = async () => {

    setCreateLoading(true);
    try {
        const quantities = formData.map((row) => row.suppliedQuantity).filter((id) => id !== undefined);
        const prices = formData.map((row) => row.suppliedPrice).filter((id) => id !== undefined);
        const amounts = formData.map((row) => row.suppliedAmount).filter((id) => id !== undefined);
        const purchases = orders.map((item) => item.id).filter((id) => id !== undefined);


        // console.log(quantities, prices, amounts, selectedBeneficiary, purchases);
    
        const response = await axios.post(
            `${BASE_URL}/stock-delivery`,
            {
                customer_id: selectedBeneficiary,
                purchase_order_id: purchases,
                quantity_supplied: quantities,
                supplied_price: prices,
                supplied_amount: amounts,
            
               
            },
            { headers }
        );
        navigate(-1);

 

        // return
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
        setCreateLoading(false);
    }
};
  
  

  

    const fetchSupplierss = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(`${BASE_URL}/beneficiary`, { headers });
          const beneficiariess = response.data?.data;

          const options1 = beneficiariess.map((item) => ({
              label: item.name,
              value: item.id,
          }));
          setBen(options1);

      } catch (error) {
          if (error.response && error.response.status === 401) {
            
            navigate('/login');
          } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setBen([]);
        }
      } finally {
          setIsLoading(false);
      }
  };

  const handleClick = async () => {
    setFilterLoading(true);
    console.log()
    try {
        const response = await axios.get(
            `${BASE_URL}/fetch-invoice-items?invoice_number=${selectedOrder}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            }
        );
        console.log(response)
        const orders = response.data?.data || [];
        console.log(orders, 'ord');

        setMyOrders(orders);
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
        setFilterLoading(false);
    }
};

console.log(selectedOrder);

    const fetchBenAcct = async (selectedBeneficiary) => {
      setLoading(true);
      // console.log(selectedBeneficiary)
      try {
          const response = await axios.get(
              `${BASE_URL}/fetch-supplier-pending-invoice?supplier_id=${selectedBeneficiary}`,
              {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${bearer}`,
                  },
              }
          );
          // console.log(response)
          const paid = response.data?.data || [];
          console.log(paid, 'paid');
          const banks = paid.map((item) => ({
              label: item.invoice_number,
              value: item.invoice_number,
          }));
          setBenBank(banks);
      } catch (error) {
          const errorStatus = error.response.data.message;
          // console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };
  

    useEffect(() => {
      if (bearer) {
        fetchSupplierss();
      }
    }, [bearer]);

    

    
  
  
    

    const goBack = () => {
        navigate(-1);
    }


   
    
 

    const handleValueChange = (value, name, index) => {
      const updatedFormData = [...formData];
      if (!updatedFormData[index]) {
          updatedFormData[index] = {};
      }
      updatedFormData[index][name] = value;
  
      // Calculate the new amount
      const suppliedQuantity = parseFloat(updatedFormData[index].suppliedQuantity || 0);
      const suppliedPrice = parseFloat(updatedFormData[index].suppliedPrice || 0);
      const suppliedAmount = suppliedQuantity * suppliedPrice;
  
      // Fetch the current row's amount from orders and add it to suppliedAmount
      const currentAmount = parseFloat(orders[index]?.amount || 0);
      const totalAmount = currentAmount + suppliedAmount;
  
      // Update the state with the new suppliedAmount
      const newFormData = updatedFormData.map((item, idx) => {
          if (idx === index) {
              return { ...item, suppliedAmount: suppliedAmount };
          }
          return item;
      });
  
      setFormData(newFormData);
  };
  

  
  
  const calcTotalAmount1 = () => {
      const total = formData.reduce((total, row) => total + parseFloat(row.suppliedAmount) || 0, 0);
      setTotalSupplied(total.toFixed(2))
      // console.log(totalQuantity);
  };

  useEffect(() => {
      calcTotalAmount1();
  }, [formData]);
  

  const disableButton = debitAmount !== totalAmount;

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <InventoryDash/>
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Receive Stock</h3>
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
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Supplier:</label>
                                <div className="col-sm-9">
                                <Select
                                                                                options={ben}
                                                                                onChange={handleBeneficiaryChange}
                                                                                placeholder="select supplier"
                                                                                menuPortalTarget={document.body}
                                                                                styles={{
                                                                                  width: "100%",
                                                                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                                                    menu: (provided) => ({
                                                                                        ...provided,
                                                                                        maxHeight: '300px',
                                                                                        overflowY: 'auto',
                                                                                    }),
                                                                                }}
                                                                            />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Order ID:</label>
                                <div className="col-sm-9">
                                <Select

options={benBank}
placeholder="Select Order ID"
onChange={handleOrderChange}
menuPortalTarget={document.body}
styles={{
  width: "100%",
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (provided) => ({
        ...provided,
        maxHeight: '300px',
        overflowY: 'auto',

    }),
}}
/>
                                </div>
                            </div>
                        </div>

                        <div style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 30,
                          marginBottom: 30,
                        }}>
                                                                        <Button style={{borderRadius: 0}} disabled={!selectedOrder} onClick={handleClick} variant="success" >
                                                                            {filterLoading ? (
                                                                                <>
                                                                                    <Spinner size='sm' />
                                                                                    <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                                                </>
                                                                            ) : (
                                                                                "Filter Order"
                                                                            )}
                                                                        </Button>
                                                                        
                                                                    </div>

                        
                        


                       

                       
                                                                    <div className="row" style={{marginTop: 30}}>
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                
                                                                                <th>Items Description</th>
                                                                                <th>Price</th>
                                                                                <th>Quantity</th>
                                                                                <th>Amount</th>
                                                                                <th>Supplied Quantity</th>
                                                                                <th>Supplied Price</th>
                                                                                <th>Supplied Amount</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            {orders.map((rowData, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{rowData?.item?.name}</td>
                                                                                    <td style={{textAlign: "right"}}>{parseFloat(rowData.item?.price).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                                                                    <td>{rowData.quantity}</td>
                                                                                    
                                                                                    <td>
                                                                                    <CurrencyInput
                                                                                        name='amount' 
                                                                                        decimalsLimit={2}
                                                                                        value={rowData.amount}
                                                                                        className="form-control"
                                                                                        disabled
                                                                                        style={{ textAlign: "right", border: "none", width: '8rem' }}
                                                                                    />
                                                                                    </td>
                                                                                    <td style={{width: "20%"}}>
            <input
                className="form-control"
                required=""
                type="text"
                onChange={(e) => handleValueChange(e.target.value, "suppliedQuantity", index)}
                name="supplied-quantity"
                value={formData[index]?.suppliedQuantity || ""}
            />
        </td>
        <td>
            <CurrencyInput
                name="supplied price"
                decimalsLimit={2}
                value={formData[index]?.suppliedPrice || ""}
                className="form-control"
                onValueChange={(value) => handleValueChange(value, "suppliedPrice", index)}
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
        </td>
        <td>
            <CurrencyInput
                name="supplied amount"
                decimalsLimit={2}
                value={formData[index]?.suppliedAmount || ""}
                className="form-control"
                disabled
                // onValueChange={(value) => handleValueChange(value, "suppliedAmount", index)}
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
        </td>
                                                                                    
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: 20 }} />
                                                            <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Supplied Amount:</label>
                                                                    <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                    <CurrencyInput
                name="supplied total"
                decimalsLimit={2}
                value={totalSupplied}
                className="form-control"
                disabled
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
                                                                    </div>
                                                                </div>
                                                            </div>











   

</div>


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start', gap: 20, marginTop: 50 }}>
<Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
<Button  style={{ borderRadius: 5 }} variant='success' onClick={createPurchaseDelivery}>
        {createLoading ? (
            <>
                <Spinner size='sm' />
                <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
            </>
        ) : (
            "Process Delivery"
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

export default CreateStockDelivery;