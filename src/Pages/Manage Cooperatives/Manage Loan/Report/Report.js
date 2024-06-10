import React, { useState, useEffect } from 'react';
import classes from './Report.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { useLocation } from 'react-router-dom';


export default function ReportLedger() {
  const [bearer, setBearer] = useState('');
  const [company, setCompany] = useState('');
  const location = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [totalDebit, setTotalDebit] = useState('');
  const [totalCredit, setTotalCredit] = useState('');
  const [totalBalance, setTotalBalance] = useState('');

  useEffect(() => {
    const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = addLeadingZero(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const minutes = addLeadingZero(currentDate.getMinutes());
    const hours = addLeadingZero(currentDate.getHours() % 12 || 12);
    const seconds = addLeadingZero(currentDate.getSeconds());
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    const formattedDateTime = `Printed Date: ${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;

    setCurrentDateTime(formattedDateTime);
  }, []);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('companyName');

      if (value !== null) {
        setBearer(value);
        // setAuthenticated(true);
      }
      if (value1 !== null) {
        setCompany(value1);

      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();

  }, []);

  const { document, customer, saving, type } = location.state || {};

  console.log(saving, customer);

  // const startDate = new Date(inputss.start_date);
  // const endDate = new Date(inputss.end_date);
  // const accountNames = accounts.map(item => item.account?.gl_name.toUpperCase());

  // console.log(accountNames, "here");

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return v >= 11 && v <= 13
      ? 'th'
      : suffixes[v % 10] || 'th';
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };


  useEffect(() => {
    if (document) {
      const debitTotal = document.reduce((total, item) => total + parseFloat(item.debit), 0);
      const creditTotal = document.reduce((total, item) => total + parseFloat(item.credit), 0);
      const balanceTotal = document.reduce((total, item) => total + parseFloat(item.balance), 0);

      // Format the numbers with commas and two decimal places
      const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      const formattedBalance = balanceTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      setTotalDebit(formattedDebitTotal);
      setTotalCredit(formattedCreditTotal);
      setTotalBalance(formattedBalance);
    }
  }, [document]);


  function formattedDates(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
    <div className={classes.container}>
    <div className={classes.title}>
        {/* <img src={arleft} className={classes.arrow} /> */}
        <div className={classes.heading}>
            <h1>UNIVERSITY OF IBADAN</h1>
            <h2>BOARD OF TRUSTEES SSANU COOPERATIVE</h2>
            <h4>Address: Alabata Road, Abeokuta, Ogun State.</h4>
            <p>Email: funis2004@yahoo.co.uk | Tel: 08055108853, 08162955615</p>
        </div>
    </div>
    <hr />
    <div className={classes.smallheader}>INDIVIDUAL MEMBERS PERSONAL LEDGER</div>
    <div className={classes.nameheader}>
        <div className={classes.namespace}>
            <div className={classes.questionname}>
                <h5>Member:</h5>
                {/* <p>ADMISSION NO:</p>
                <p>SEX:</p>
                <p>CLASS:</p> */}
            </div>
            <div className={classes.details}>
                <h6>ABDULSALAM NIFEMI</h6>
                {/* <h3>US/22/1654</h3>
                <h3>F</h3>
                <h3>JS2 GOLD</h3> */}
            </div>
        </div>
        <div className={classes.passport}>
            {/* <img src={arleft} className={classes.arrow} /> */}
        </div>
    </div>
    <table>
        <tr>
            <th>S/N</th>
            <th>TRANSACTION DATE</th>
            <th className={classes.longth}>DESCRIPTION</th>
            <th>DEBITS</th>
            <th>CREDITS</th>
            <th>BALANCE</th>
        </tr>            
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
        <tr>
            <td>1</td>
            <td>24-03-2024</td>
            <td className={classes.left111}>Excellence and Integrity Deduction</td>
            <td className={classes.right111}>#10,000,000</td>
            <td className={classes.right111}>#1,000,000</td>
            <td className={classes.right111}>#9,000,000</td>
        </tr>
    </table>
    <br />
    <hr />
    <h3 className={classes.footer}>Excellence and Integrity</h3>
    <button onClick={handlePrint} className={classes.printbutton}>Print Report</button>
    </div>
    </div>
  )
}
