import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';

import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';

import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Arrow from '../../assets/promix/dArrow-down.svg'
import { useNavigate, useLocation } from 'react-router-dom';
// import { BASE_URL } from '../../api/api';
// import CurrencyInput from 'react-currency-input-field';

export default function EditAccountReceivables() {

  const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState("");
    const [updateDate, setUpdateDate] = useState('');
    const [creditAccount, setCreditAccount] = useState([]);
    const [selectedCreditAccount, setSelectedCreditAccount] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const [ben, setBen] = useState([]);
    const [benBank, setBenBank] = useState([]);
    const [debitAccount, setDebitAccounts] = useState([]);
    const [tax, setTax] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [payLoading, setPayLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const [contractAmount, setContractAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const [payMode, setPayMod] = useState([]);
    const navigate = useNavigate();
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [selectedDebitAccount, setSelectedDebitAccount] = useState(null);
    const [formData, setFormData] = useState([{ sn: 1, tax: '', percentage: '', amount: '' }]);
    const [user, setUser] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const location = useLocation();
    const { selectedAccount } = location.state || {};


    console.log("selected Account:", selectedAccount)

    
    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileList = Array.from(files);
        setSelectedFiles(fileList);
        //  console.log(fileList); 
        fileList.forEach(file => {

        });
    };




    //   console.log(selectedFiles);

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
    
    const addRow = () => {
        const newRow = {
            sn: formData.length + 1,
            tax: '',
            percentage: '',
            amount: '',
        };
        setFormData([...formData, newRow]);
        // setSelectedPayment('');
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const goBack = () => {
        navigate(-1);
    }



    const handleValueChange = (value, name, values) => {
        setContractAmount(value); // Update the balance state

    };

    const handleValueChange2 = (value, name, values) => {
        setTotalAmount(value); // Update the balance state

    };

    //create beneficiary
    const handleCreate = async () => {
        console.log("responses:", date, description, selectedDebitAccount, selectedCreditAccount, invoiceDate, invoiceNumber, totalAmount);
        setLoad(true);
        try {
            const formData = new FormData();
            formData.append('transaction_date', date);
            formData.append('description', description);
            formData.append('debit', selectedDebitAccount);
            formData.append('credit', selectedCreditAccount);
            formData.append('date_of_invoice', invoiceDate);
            formData.append('amount', totalAmount);
            formData.append('invoice_number', invoiceNumber);


            const response = await axios.post(`${BASE_URL}/post-receivables`,
                formData,
                {
                    headers: {
                        ...headers,
                        'Content-Type': 'multipart/form-data', // Set content type to multipart form data
                    }
                }
            );

            
            console.log(response);
            // navigate('/accounting/payables/payment_voucher');
            toast.success(response.data.message);
            setDate("");
            setDescription("");
            setSelectedDebitAccount("");
            setSelectedCreditAccount("");
            setSelectedCreditAccount("");
            setInvoiceDate("");
            setTotalAmount("");
            setInvoiceNumber("");
            // console.log(response.data);
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
            setLoad(false);
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

    const paymentMode = async () => {
        setPayLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/income/get-payment-method`, { headers });


            const reply = response.data?.data;
            setPayMod(reply);
            console.log("reply", reply);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setPayMod([]);
        } finally {
            setPayLoading(false);
        }
    };
    
    const fetchTax = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/taxes`, { headers });


            const taxes = response.data?.data;
            setTax(taxes);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setBen([]);
        } finally {
            setIsLoading(false);
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
            console.log(paid, 'paid');
            setBenBank(paid);

        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    const handleBeneficiaryChange = (event) => {
        setSelectedBeneficiary(event.target.value);
        setSelectedBank(null);
        setBenBank([]);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    };
    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const handleCredit = (event) => {
        setSelectedCreditAccount(event.target.value);
    };

    const handleDebit = (event) => {
        setSelectedDebitAccount(event.target.value);
    };



    useEffect(() => {
        if (bearer && selectedBeneficiary) {
            fetchBenAcct(selectedBeneficiary);
        }
    }, [bearer, selectedBeneficiary]);

    // const options = ben.map(beneficiary => ({
    //     label: beneficiary.name,
    //     value: beneficiary.id,
    // }));


    // const bankOptions = benBank.map(bank => ({
    //     label: bank.bank_name,
    //     value: bank.id,
    // }));

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
            console.log(resultx,"here");
            setDebitAccounts(resultx);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            // console.log(errorStatus);
            setDebitAccounts([]);
        } finally {
            setIsLoading(false);
        }
    };



    const debitOptions = debitAccount.map(account => ({
        label: account.gl_name,
        value: account.id,
    }));



    const creditOptions = creditAccount.map(account => ({
        label: account.gl_name,
        value: account.id,
    }));



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





    useEffect(() => {
        if (bearer) {
            fetchCreditAccount();
            fetchBeneficiaries();
            fetchTax();
            fetchdebitAccounts();
            paymentMode();
        }
    }, [bearer]);

    const [applyTax, setApplyTax] = useState(false);

    const handleToggle = () => {
        setApplyTax(!applyTax);
    };

    const handleAccountChange = (index, event) => {
        const selectedTaxAccount = event.target.value;
        const intselectedId = parseInt(selectedTaxAccount);
        const percentage = tax.find((item) => item.id === intselectedId)?.percentage || '';


        const contractAmountValue = contractAmount || 0;


        const calculatedAmount = (contractAmountValue * percentage) / 100;

        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            tax: selectedTaxAccount,
            percentage: percentage,
            amount: calculatedAmount.toFixed(2), // Adjust the precision as needed
        };

        setFormData(updatedFormData);
    };

    const calculateTotalAmount = () => {
        const total = formData.reduce((accumulator, row) => accumulator + parseFloat(row.amount || 0), 0);
        return total.toFixed(2);
    };

    const calculateTotal = () => {
        const totalResult = (parseFloat(contractAmount || 0) - parseFloat(totalTax)).toFixed(2);
        return totalResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };



    const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);

    };

    useEffect(() => {
        const totalTaxValue = calculateTotalAmount();
        setTotalTax(totalTaxValue);

        const totalAmountValue = calculateTotal();
        setTotalAmount(totalAmountValue);

    }, [formData, contractAmount, totalTax]);








  return (
    <div>
      <MainDashoard/>

    <div className={classes.newWidth}>
        <div className={classes.topPadding}>
            <div className={`${classes.formSecCont}`}>
                <div className={classes.formSectionHeader}>
                    <h3>Manual Entries </h3>
                    {/* <small>Create and view your loan accounts...</small> */}
                </div>
                <div className={classes.formSectionHeader}>
                    <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                </div>
            </div>
        </div>

        <div className={classes.bodyContainer}>
            <div className={classes.main}>
            <div className={`${classes.header1} ${classes.flex1}`}>
                {/* <h6>Create New Payment Voucher</h6> */}
            </div>
            <div className={classes.header2}>
                <Form>
            
                <div className={classes.formContainer}>
                <div className={classes.formCont}>
                    <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label  >Transaction Date</Form.Label>
                        <Form.Control type='date' id="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)} style={{ height: 'calc(1.8em + 1.89rem + 2px)' }}
                        />
                    </Form.Group>

                    
                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Description</Form.Label>
                        <Form.Control type='text' placeholder='Description' 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Invoice Number</Form.Label>
                        <Form.Control id="disabledSelect"
                            placeholder='Invoice Number' 
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            value={invoiceNumber}
                        />
                        </Form.Group>

                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Date of Invoice</Form.Label>
                        <Form.Control id="disabledSelect" type='date' 
                            placeholder='Invoice Date' 
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            value={invoiceDate}
                        />
                        </Form.Group>
                
                        <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label  >Total Amount</Form.Label>
                        <CurrencyInput
                            name="contract-amount"
                            decimalsLimit={2}
                            value={totalAmount}
                            className="form-control"
                            onValueChange={(value) => handleValueChange2(value)}
                            style={{ textAlign: "right", border: "1px solid #e4e4e4" }}
                            // readOnly
                        />
                    </Form.Group>        
                    
                    <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Debit acct (DR)</Form.Label>
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
                    <Form.Group className={`${classes.formGroup} ${classes.formFlex}`}>
                        <Form.Label >Credit acct (CR)</Form.Label>
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

            
            </div>
            <div style={{justifyContent: "flex-end", margin:'30px'}} class="modal-footer">
            <Button style={{borderRadius: 0}} variant='success' onClick={handleCreate} >
                {load ? (
                    <>
                        <span style={{ marginLeft: '5px' }}>Creating, Please wait...</span>
                    </>
                ) : (
                    "Submit"
                )}
            </Button>

        </div>
        </div>
    </div>

    </div>
  )
}
