// import React from 'react'
import React, { useState, useEffect } from 'react';
import MainDashoard from '../../Main Dashboard/MainDashoard'
// import { Button } from 'react-bootstrap'
import classes from '../../../Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.module.css'
import Table from 'react-bootstrap/Table';
import Arrow from '../../../assets/promix/dArrow-down.svg';
import { Link } from 'react-router-dom';

import Select from 'react-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, DropdownItemText, Spinner, Form } from 'react-bootstrap';
// import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';



export default function GeneralPaymentVoucher() {

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
  const [ben, setBen] = useState([]);
  const [benBank, setBenBank] = useState([]);
  const [debitAccount, setDebitAccounts] = useState([]);
  const [tax, setTax] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [bearer, setBearer] = useState('');
  const [contractAmount, setContractAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState("");
  const [totalTax, setTotalTax] = useState("");
  const navigate = useNavigate();
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedDebiAccount, setSelectedDebitAccount] = useState(null);
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


          const response = await axios.post(
              'https://api-sme.promixaccounting.com/api/v1/payment_voucher/create-new',
              formData,
              {
                  headers: {
                      ...headers,
                      'Content-Type': 'multipart/form-data', // Set content type to multipart form data
                  }
              }
          );
          console.log(response);
          navigate('/payment_voucher');
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
          const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });


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

  const fetchTax = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/taxes', { headers });


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
          // console.log(paid, 'paid');
          setBenBank(paid);
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoading(false);
      }
  };

  const handleBeneficiaryChange = (selectedOption) => {
      setSelectedBeneficiary(selectedOption.value);
      setSelectedBank(null);
      setBenBank([]);
  };

  const handleBankChange = (selectedOption) => {
      setSelectedBank(selectedOption.value);
  };

  const handleCredit = (selectedOption) => {
      setSelectedCreditAccount(selectedOption.value);
  };

  const handleDebit = (selectedOption) => {
      setSelectedDebitAccount(selectedOption.value);
  };



  useEffect(() => {
      if (bearer && selectedBeneficiary) {
          fetchBenAcct(selectedBeneficiary);
      }
  }, [bearer, selectedBeneficiary]);

  const options = ben.map(beneficiary => ({
      label: beneficiary.name,
      value: beneficiary.id,
  }));


  const bankOptions = benBank.map(bank => ({
      label: bank.bank_name,
      value: bank.id,
  }));

  const fetchdebitAccounts = async () => {
      setIsLoading(true);
      try {
          const responses = await axios.get(
              `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${5}`,
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
          const responses = await axios.get(
              `https://api-sme.promixaccounting.com/api/v1/get-account-by-category-id?category_id=${3}`,
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

      <div className={classes.formSection}>
        <div className={classes.formSectionHeader}>
            <div>
                <h4 style={{color:'black'}}>My Payment Voucher</h4>
                
            </div>
            <div style={{textAlign:'right'}}>
                <p style={{margin:'0'}}>Welcome</p>
                <h3>
                    user
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
              <h5>Voucher</h5>
              <div className={classes.actionBtns}>
                <Button variant="light" className={classes.whiteBtn}>Filters</Button>
                <Link to={'/payment_voucher_form'}>
                  <Button variant="success" className={classes.greenBtn}>Add New Payment Vouchers</Button>
                </Link>
              </div>
          </div>
          <div className={classes.header2}>
              {/* <div className={classes.actionBtns}> */}
                <div className={`${classes.whiteBtn} ${classes.discrp}`}>Time duration: Year 2024 <i class='bx bx-x'></i></div>
                <div className={`${classes.whiteBtn} ${classes.discrp}`}>Contract Amount: N1M to N5M <i class='bx bx-x'></i></div>
              {/* </div> */}
          </div>
          <div className={classes.table}>
          <Table striped bordered hover>
            <thead className={classes.tableHead}>
              <tr>
                <th>S/N</th>
                <th>Beneficiary</th>
                <th>PV Number</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Contract Amount</th>
                <th style={{textAlign:'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
                <td>750,000</td>
                <td className={classes.actions}>
                  <Button variant='success' className={classes.action}>View</Button>
                  <Button variant='light' className={`${classes.whiteBtn} ${classes.action}`}>Edit</Button>
                  <div style={{color:'#D38E34'}}>Print</div>
                  <div style={{color:'#FF1708'}}>Delete</div>
                </td>
              </tr>
              
              
            </tbody>
          </Table>
              <div className={classes.pagenate}>
                <Button variant="success">previous</Button>
                <div className={classes.transparent}>1 of 20</div>
                <Button className={classes.whiteBtn} variant="light">Next</Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
