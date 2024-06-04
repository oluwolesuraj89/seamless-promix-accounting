import React, { useState, useEffect, useRef } from 'react';
// import "../../../assetss/assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../../../assetss/assets/plugins/metisMenu/metisMenu.min.css";
// import "../../../assetss/assets/plugins/fontawesome/css/all.min.css";
// import "../../../assetss/assets/plugins/typicons/src/typicons.min.css";
// import "../../../assetss/assets/plugins/themify-icons/themify-icons.min.css";
import "../../../assetss/assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
// import { InfoFooter } from '../../InfoFooter';

import classes from '../Manage Members/ManageMember.module.css'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner, Form, Accordion, Badge } from 'react-bootstrap';
// import favicon from '../../Im/ages/faviconn.png'
// import TableToPrint from './TableToPrint';
import { useReactToPrint } from 'react-to-print';
import { BASE_URL } from '../../api/api';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';


function CreateSales() {
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState('');
    const [description, setDescription] = useState('');
    const [debitCode, setDebitCode] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
    const [totalAmount, setTotalAmount] = useState('');
    const [debitGl, setDebitGl] = useState('');
    const [selectedGlCode, setSelectedGlCode] = useState('');
    const [glMethod, setGlMethod] = useState([]);
    const [sICode, setSICode] = useState('');
    const [invoiceData, setInvoiceData] = useState('');
    const [selectedAccountName, setSelectedAccountName] = useState('');
    const [accountName, setAccountName] = useState([]);
    const [customerList, setCustomerList] = useState([]);




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

    const handleGlChange = (event) => {
        setDebitGl(event.target.value);
    }
    const handleAccountChange = (index, event) => {
        const selectedAccount = event.target.value;
        const intselectedId = parseInt(selectedAccount);
        const selectedGlCode = accountName.find((item) => item.id === intselectedId)?.gl_code || '';

        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            accountName: selectedAccount,
            accountCode: selectedGlCode,
        };

        setFormData(updatedFormData);
    };

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const handleDebitChange = (event) => {
        selectedDebitAccount(event.target.value);
    };


    const calculateTotalAmount = () => {
        const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        const formattedTotal = total.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setTotalAmount(formattedTotal);
    };



    useEffect(() => {
        calculateTotalAmount();
    }, [formData]);



    const createSalesInvoice = async () => {
        setIsLoading(true);

        try {
            const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
            const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
            console.log(accountNames, amounts, debitAmount);



            const response = await axios.post(
                `${BASE_URL}/post-sales-invoice`,
                {
                    account_name: accountNames,
                    account_amount: amounts,
                    description: description,
                    invoice_number: sICode,
                    customer_id: selectedCustomer,
                    debit_gl_code: debitGl,
                    amount: debitAmount,
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
            setIsLoading(false);
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

            console.log(resultss, "NI");
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
                `${BASE_URL}/customer/no-pagination`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const custome = response.data?.data;
            setCustomerList(custome);

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
            fetchGlMethod();
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
        }
    }, [bearer]);


    const addRow = () => {
        const newRow = {
            sn: formData.length + 1,
            accountName: '',
            accountCode: '',
            amount: '',
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    const handleFormChange = (index, field, value) => {
        const updatedFormData = [...formData];
        const numericValue = value.replace(/\D/g, '');
        const numericAmount = numericValue !== '' ? parseFloat(numericValue) : '';
        const formattedValue = numericAmount !== '' ? numericAmount.toLocaleString() : '';

        updatedFormData[index][field] = formattedValue;
        setFormData(updatedFormData);
    };



    const handleValueChange = (value, name, values) => {
        setDebitAmount(value); // Update the balance state
        console.log(value, name, values);
    };

    const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);
        calculateTotalAmount(); // Recalculate total amount after each change
    };






    return (
        <div>
            <MainDashboard />
            <div className='newBody'>
                <div className={classes.newWidth}>
                    <div className={classes.topPadding}>
                        <div className={`${classes.formSecCont}`}>
                            <div className={classes.formSectionHeader}>
                                <h3>Create Sales Invoice</h3>
                            </div>
                            <div className={classes.formSectionHeader}>
                                <h3 style={{ color: '#2D995F' }}>{user.toLocaleUpperCase()}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">



                        {/* <!-- Page Content  --> */}
                        <div className="content-wrapper">




                            <div className="body-content">



                                <div className="col-lg-12">
                                    <div className="card" style={{ border: 'none' }}>

                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card" >
                                                    <div className="card-body" >
                                                        <div className="card-body" >

                                                        


                                                           
                                                           
                                                           

                                                        </div>
                                                    </div>

                                                    <div style={{ marginTop: 20 }} />
                                                    <div className="row">
                                                        {/* <div className="col-md-6"> */}
                                                        <div className="table-responsive">
                                                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th style={{ width: '50%', }}>Account Name</th>
                                                                        <th>Account Code</th>
                                                                        <th>Amount</th>
                                                                        <th ><Button variant="primary" onClick={() => addRow()}>
                                                                            <i className="fas fa-plus"></i>

                                                                        </Button></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                    {formData.map((row, index) => (
                                                                        <tr key={index}>
                                                                            <td>{row.sn}</td>
                                                                            <td>
                                                                                <Form.Select
                                                                                    name="DebitGl"
                                                                                    className="form-control"
                                                                                    required=""
                                                                                    value={row.accountName}
                                                                                    onChange={(e) => handleAccountChange(index, e)}
                                                                                >
                                                                                    <option value="">Choose Debit Gl Account</option>
                                                                                    {accountName.map((item) => (
                                                                                        <option key={item.id} value={item.id}>
                                                                                            {item.gl_name}
                                                                                        </option>
                                                                                    ))}
                                                                                </Form.Select>
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    value={row.accountCode}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>

                                                                                <CurrencyInput
                                                                                    name={`debit amount ${index}`} // Provide a unique name for each CurrencyInput
                                                                                    decimalsLimit={2}
                                                                                    value={row.amount}
                                                                                    className="form-control"
                                                                                    onValueChange={(value) => handleValueChange1(value, index)}
                                                                                    style={{ textAlign: "right", border: "none" }}
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

                                                  
                                                    <div style={{ marginTop: 20 }} />
                                                    <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                                        <div className="form-group row justify-content-end">
                                                            <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                                            <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}






                                                    <div style={{ justifyContent: "flex-start", marginTop: 30, gap: 20 }} class="modal-footer">
                                                        <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                                                        <Button style={{ borderRadius: 4, }} variant="success" onClick={createSalesInvoice}>
                                                            {setIsLoading ? (
                                                                <>
                                                                    <Spinner size='sm' />
                                                                    <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
                                                                </>
                                                            ) : (
                                                                "Update Member"
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
            </div >
        {/* <InfoFooter /> */ }
        </div >
    )
}

export default CreateSales;