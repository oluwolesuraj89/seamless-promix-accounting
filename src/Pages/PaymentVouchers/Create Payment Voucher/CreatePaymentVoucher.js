import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';

import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';

import MainDashoard from '../../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../../Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Arrow from '../../../assets/promix/dArrow-down.svg'
import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../api/api';
// import CurrencyInput from 'react-currency-input-field';

export default function CreatePaymentVoucher() {

  const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
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

            if (value !== null) {
                setBearer(value);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

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

    useEffect(() => {
        readData();
        // autoSetBeneficiaries();
    }, []);

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
    const handlePayment = async () => {
        console.log(date, totalAmount, totalTax, selectedCreditAccount, selectedBeneficiary, description, contractAmount, selectedFiles, selectedCreditAccount, selectedBank);
        setLoad(true);
        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('total_amount', totalAmount);
            formData.append('total_tax_amount', totalTax);
            formData.append('gl_account', selectedCreditAccount);
            formData.append('beneficiary_account_id', selectedBank);
            formData.append('beneficiary_id', selectedBeneficiary);
            formData.append('description', description);
            formData.append('contract_amount', contractAmount);
            formData.append('account', selectedCreditAccount);
            formData.append('document', selectedFiles[0]);


            const response = await axios.post(`${BASE_URL}/payment_voucher/create-new`,
                formData,
                {
                    headers: {
                        ...headers,
                        'Content-Type': 'multipart/form-data', // Set content type to multipart form data
                    }
                }
            );
            console.log(response);
            navigate('/accounting/payables/payment_voucher');
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

        <div className={classes.formSection}>
            <div className={classes.formSectionHeader}>
                <div>
                    <h4 style={{color:'black'}}>Add New</h4>
                    
                </div>
                <div style={{textAlign:'right'}}>
                    {/* <p style={{margin:'0'}}>Welcome</p> */}
                    <h3>
                        {/* user */}
                    </h3>
                    
                </div>
            </div>
            <div className={classes.analysis}>
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
            </div>
        </div>



        <div className={classes.bodyContainer}>
            <div className={classes.main}>
            <div className={`${classes.header1} ${classes.flex1}`}>
                <h6>Create New Payment Voucher</h6>
            </div>
            <div className={classes.header2}>
                <Form>
            
                <div className={classes.formContainer}>
                <div className={classes.formCont}>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label  >Date</Form.Label>
                        <Form.Control type='date' id="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)} style={{ height: 'calc(1.8em + 1.89rem + 2px)' }}
                        />
                    </Form.Group>
    {/* 
                    <Form.Select className="form-control"
                                as="select"
                                value={selectedSubCategory}
                                onChange={handleSubCatChange}
                                >
                                <option value="" disabled>Select Type</option>
                                {tableData2.map((item) => (
                                    <option key={item.id} value={item.id}>
                                    {item.description}
                                    </option>
                                ))}
                                </Form.Select> */}


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
                
                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Beneficiary</Form.Label>
                        <Form.Select 
                            onChange={handleBeneficiaryChange}
                            value={selectedBeneficiary}
                        >
                            <option>Select a beneficiary</option>
                            {ben.map((beneficiary)=>(
                            <option key={beneficiary.id} value={beneficiary.id}>
                                {beneficiary.name}
                                {beneficiary.id}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Select beneficiary</Form.Label>
                        <Form.Select id="disabledSelect"
                            value={selectedBank}
                            onChange={handleBankChange}
                        >
                            <option>Select beneficiary account</option>
                            {benBank.map((bank)=>(
                            <option key={bank.id} value={bank.id}>
                                {bank.name}
                                {bank.id}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label  >Description </Form.Label>
                        <Form.Control  placeholder='Enter the description here' 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label >Mode</Form.Label>
                        <Form.Select id="disabledSelect"
                            value={selectedMode}
                            onChange={handleModeChange}
                        >
                            <option value="">Select Mode</option>
                            {payMode.map((mode)=>(
                                <option value={mode.id} key={mode.id}>
                                    {mode.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label  >Supporting Document </Form.Label>
                        <Form.Control  placeholder='Enter the description here' 
                        // value={description} 
                        onChange={handleFileChange} 
                        type="file" 
                        accept=".pdf, .jpg, .jpeg, .png" 
                        name="document"
                        />
                    </Form.Group>

                    <Form.Group className={classes.formGroup}>
                        <Form.Label  >Contract Amount</Form.Label>
                        <CurrencyInput
                            name="contract-amount" // Provide a unique name for each CurrencyInput
                            decimalsLimit={2}
                            value={contractAmount}
                            className="form-control"
                            onValueChange={(value) => handleValueChange(value)}
                            // style={{ textAlign: "right", border: "1px solid #e4e4e4" }}
                        />
                    </Form.Group>
                    <Form.Group className={classes.formGroup}>
                        <Form.Label  >Total Amount</Form.Label>
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
                    </div>
                </div>

                {/* <Form.Group className={classes.formGroup} style={{marginTop:20}}>
                        <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Apply Tax"
                        onChange={handleToggle}
                        style={{display:"flex", alignItems:"center", gap:"10px"}}
                        />
                    </Form.Group> */}


                </Form>
            </div>

            
            {/* {applyTax &&
            
            <div>
                <h4>Select taxes</h4>
                <div className={classes.table}>
                <Table striped bordered hover>
                    <thead className={classes.tableHead}>
                    <tr>
                    <th>#</th>
                        <th style={{ width: '50%', }}>Tax</th>
                        <th>Percentage</th>
                        <th>Amount</th>
                        <th ><Button variant="primary" onClick={() => addRow()}>
                            <i className="fas fa-plus"></i>
                        </Button></th>
                        <th 
                        style={{textAlign:'center'}}>
                        <Button variant='success' style={{
                            padding:'0',
                            width:'24px',
                            height:'24px',
                            borderRadius:'50%',
                            backgroundColor:'#2D995F',
                            

                            }}><i class='bx bx-plus'></i></Button></th>
                    </tr>
                    </thead>
                    <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                        {formData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.sn}</td>
                                <td>
                                    <Form.Select
                                        className="form-control"
                                        value={row.tax}
                                        onChange={(e) => handleAccountChange(index, e)}
                                    >
                                        <option value="">Select Tax</option>
                                        {tax.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.description}
                                            </option>
                                        ))}

                                    </Form.Select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.percentage}
                                        readOnly

                                    />
                                </td>
                                <td>
                                    <CurrencyInput
                                        name={`rowAmount ${index}`}
                                        decimalsLimit={2}
                                        value={row.amount}
                                        className="form-control"
                                        onValueChange={(value) => handleValueChange1(value, index)}
                                        style={{ textAlign: "right", border: "none" }}
                                        readOnly
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
                </Table>
                
                </div>
            </div>

            


            } */}
            </div>
            <div style={{justifyContent: "flex-end", margin:'30px'}} class="modal-footer">
            <Button style={{borderRadius: 0}} variant='success' onClick={handlePayment} >
                {load ? (
                    <>
                        {/* <Spinner size='sm' /> */}
                        <span style={{ marginLeft: '5px' }}>Creating, Please wait...</span>
                    </>
                ) : (
                    "Create Payment Voucher"
                )}
            </Button>

        </div>
        </div>
      </div>
    </div>
  )
}
