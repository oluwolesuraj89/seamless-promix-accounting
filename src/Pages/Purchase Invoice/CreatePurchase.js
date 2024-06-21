import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './CreatePurchase.module.css';
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

function CreatePurchase() {
    const [user, setUser] = useState("");
    const [address, setAddress] = useState("");
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

      const handleGlChange = (event) =>{
        setDebitGl(event.target.value);
    }
    

    const handleCustomerChange = (event) => {
      const selectedCustomerId = event.target.value;
      setSelectedCustomer(selectedCustomerId);

      const selectedCus = customerList.find((item) => item.id === parseInt(selectedCustomerId));
      setAddress(selectedCus ? selectedCus.address : "");
  };

  
    
  useEffect(() => {
    const calculatedTotalAmount = formData.reduce(
        (acc, curr) => acc + (parseFloat(curr.amount) || 0),
        0
    );
    setTotalAmount(calculatedTotalAmount.toFixed(2));
}, [formData]);
    


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`
  };
    

    const createSalesInvoice = async () => {
      setCreateLoading(true);
  
      try {
          const items = formData.map((row) => row.items.value).filter((id) => id !== undefined);
          const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
          const amounts = formData.map((row) => row.amount).filter((id) => id !== undefined);
         
         
          const response = await axios.post(
              `${BASE_URL}/post-purchase-invoice`,
              {
                  item_id: items,
                  quantity: quantities,
                  item_amount: amounts,
                  amount: debitAmount,
                  description: description,
                  invoice_number: sICode,
                  supplier_id: selectedCustomer,
                  debit_gl_code: debitGl,
              },
              { headers }
          );
          
          console.log(response.data?.message, "heeee");
          setSICode("");
          setSelectedCustomer("");
          setDebitCode("");
          setSelectedAccountName("");
          setDebitAmount("");
          setDescription("");
          navigate(-1);
  
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
  
  

  const fetchGlMethod = async () => {
      setLoading(true);
  
  
      try {
        const response = await axios.get(
          `${BASE_URL}/get-account-by-class-id?class_id=${1}`,
          {
           
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearer}`
            }
          }
        );
        const resultss = response.data?.data;
        setGlMethod(resultss);
  
        // console.log(resultss, "NI");
      } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
      } finally {
        setLoading(false);
      }
    };

  const fetchCustomers = async () => {
      setLoading(true);
  
  
      try {
        const response = await axios.get(
          `${BASE_URL}/beneficiary`,
          {
           
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearer}`
            }
          }
        );
        const custome = response.data?.data;
        setCustomerList(custome);
        // setAddress(custome);
  
        // console.log(custome, "itss");
      } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (bearer) {
          fetchGlMethod();
      }
    }, [bearer]);

    useEffect(() => {
      if (bearer) {
          fetchCustomers();
      }
    }, [bearer]);

    

    
  const fetchInvoiceCode = async () => {
      setLoading(true);
  
  
      try {
        const response = await axios.get(
          `${BASE_URL}/generate-sales-invoice-code`,
          {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearer}`
            }
          }
        );
        const resultss = response.data?.data;
      //   console.log(resultss);
        setSICode(resultss);
          // console.log(invoiceData)
      //   console.log(results, "NI");
      } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (bearer) {
          fetchInvoiceCode();
      }
    }, [bearer]);

  
    

    const goBack = () => {
        navigate(-1);
    }


   
    
 

    const addRow = () => {
      const newRow = {
        items: '', unitPrice: '', qty: '', totalPrice: ''
      };
      setFormData([...formData, newRow]);
    };
  
    const deleteRow = (index) => {
      const updatedData = formData.filter((_, i) => i !== index);
      setFormData(updatedData);
    };



  
  const handleValueChange2 = (value, name, values) => {
    setDebitAmount(value); 
   
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/items/fetch-all`, { headers });
        const itemss = response.data?.data;

        const options1 = itemss.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        setItemList(itemss);
        setSelectOptions1(options1);
    } catch (error) {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setDebitAccounts([]);
    } finally {
        setIsLoading(false);
    }
};





const handleFormChange = (value, fieldName, rowIndex) => {
  setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[rowIndex] = {
          ...updatedFormData[rowIndex],
          [fieldName]: value
      };
      updatedFormData[rowIndex].amount = parseFloat(updatedFormData[rowIndex].unitPrice) * parseFloat(updatedFormData[rowIndex].qty) || 0;
      return updatedFormData;
  });
};

const handleItemDescriptionChange = (selectedOption, rowIndex) => {
  const selectedItemId = selectedOption.value;
  const selectedItem = itemList.find(item => item.id === selectedItemId);
  const selectedUnitPrice = selectedItem?.price || 0;
  handleFormChange(selectedOption, "items", rowIndex);
  handleFormChange(selectedUnitPrice, "unitPrice", rowIndex);
};

   

  const fetchAcctName = async () => {
    setLoading(true);


    try {
      const response = await axios.get(
        `${BASE_URL}/get-account-by-class-id?class_id=${4}`,
        {
         
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const resultss = response.data?.data;
      setAccountName(resultss);

    //   console.log(results, "NI");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
        fetchAcctName();
        fetchItems();
    }
  }, [bearer]);

  console.log(totalAmount, debitAmount, "here iam");

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
                            <h3>Create Sales Invoice</h3>
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
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Invoice To:</label>
                                <div className="col-sm-9">
                                <Form.Select name="customer" className="form-control" required="" value={selectedCustomer} onChange={handleCustomerChange} >
                                                                                <option value="">Choose Supplier</option>
                                                                                {customerList.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Purchase Invoice Code:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="text" disabled value={sICode}  name="invoice"  />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Supplier's Address:</label>
                                <div className="col-sm-9">
                                <textarea
                                                                                className="form-control"
                                                                                required=""
                                                                                value={address}
                                                                                name="address"
                                                                                disabled
                                                                            />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                <div className="col-sm-9">
                                <textarea
                                                                                className="form-control"
                                                                                required=""
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                name="description"
                                                                            />
                                </div>
                            </div>
                        </div>
<div style={{marginTop: 20}}/>
                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit GL Account:</label>
                                <div className="col-sm-9">
                                <Form.Select name="DebitGl" className="form-control" required="" value={debitGl} onChange={handleGlChange}>
                                                                                <option value="">Choose Debit Gl Account</option>
                                                                                {glMethod.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.gl_name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select>
                                </div>
                            </div>
                        </div>
<div style={{marginTop: 20}}/>

                        {/* <div className="col-md-6" >
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">GL Code:</label>
                                <div className="col-sm-9">
                                <input className="form-control" required="" type="email" value={debitCode} onChange={(e) => setDebitCode(e.target.value)} name="code"  />

                                </div>
                            </div>
                        </div> */}


                        <div className="col-md-6">
                            <div className="form-group row">
                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                <div className="col-sm-9">
                                <CurrencyInput
className="form-control"
// placeholder='Enter Amount'
  name="debit amount"
  decimalsLimit={2}
  value={debitAmount} // Set the value to the balance state
      onValueChange={handleValueChange2}
      style={{ textAlign: "right", width: "100%", height: 38}}
/>
                                </div>
                            </div>
                        </div>

                       
                        <div style={{ marginTop: 50 }} />
                        <div className="row">
                                                            <h5 style={{ textAlign: "center" }}>Add Item(s)</h5>
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                            <th style={{ width: '50%', }}>Item</th>
                                        <th>Unit Price(N)</th>
                                        <th>Quantity</th>
                                        <th>Total Price(N)</th>
                                        <th ><Button variant="primary" onClick={() => addRow()}>
                                          <i className="fas fa-plus"></i>

                                        </Button></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap",  }}>
                                                                            {formData.map((row, index) => (
                                                                                <tr key={index}>
                                                                                    <td style={{ width: '400px' }}>
                                                                                        <Select
                                                                                            value={row.items} // Assuming row.itemsDescription contains the selected option
                                                                                            onChange={(selectedOption) => handleItemDescriptionChange(selectedOption, index)}
                                                                                            options={selectOptions1}
                                                                                            menuPortalTarget={document.body}
                                                                                            styles={{
                                                                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                                                                menu: (provided) => ({
                                                                                                    ...provided,
                                                                                                    maxHeight: '400px',
                                                                                                    overflowY: 'auto',
                                                                                                }),
                                                                                            }}
                                                                                        />

                                                                                    </td>
                                                                                    <td style={{ width: '7rem' }}>
                                                                                        <CurrencyInput
                                                                                            name={`rowUnitPrice ${index}`} // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={row.unitPrice}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                                                                    </td>
                                                                                    <td style={{ width: '5rem' }}>
                                                                                        <input
                                                                                            
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.qty}
                                                                                            onChange={(e) => handleFormChange(e.target.value, "qty", index)}
                                                                                        />
                                                                                        {row.quantityError && <span style={{ color: 'red' }}>{row.quantityError}</span>}
                                                                                    </td>
                                                                                    <td style={{ width: '7rem' }}>
                                                                                    <CurrencyInput
                                                                                            name={`rowLineTotal ${index}`} // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={row.qty * row.unitPrice}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                                                                    </td>
                                                                                    <td style={{ textAlign: "center" }}>
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
                                                            <div style={{ marginTop: 20 }} />
                                                            <div className="col-md-11" style={{marginLeft: 45}}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-2 col-form-label font-weight-400">Total Amount:</label>
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'18.5%',}}>
                                                                    <CurrencyInput
                                                                                            name='total-amount' 
                                                                                            decimalsLimit={2}
                                                                                            value={totalAmount}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                                                    </div>
                                                                </div>
                                                           











   






</div>











   

</div>


<div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start', gap: 20, marginTop: 50 }}>
<Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
<Button disabled={parseFloat(debitAmount) !== totalAmount ? true : false} style={{ borderRadius: 5 }} variant='success' onClick={createSalesInvoice}>
        {createLoading ? (
            <>
                <Spinner size='sm' />
                <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
            </>
        ) : (
            "Create Purchase Invoice"
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

export default CreatePurchase;