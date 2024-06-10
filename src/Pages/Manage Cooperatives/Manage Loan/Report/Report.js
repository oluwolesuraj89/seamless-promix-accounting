import React, { useState, useEffect } from 'react';
import classes from './Report.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from 'react-router-dom';


export default function ReportLedger() {
  const [bearer, setBearer] = useState('');
  const [company, setCompany] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAdd, setCompanyAdd] = useState('');
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
      const value2 = await AsyncStorage.getItem('companyEmail');
      const value3 = await AsyncStorage.getItem('companyPhone');
      const value4 = await AsyncStorage.getItem('companyAddress');

      if (value !== null) {
        setBearer(value);
        
      }
      if (value1 !== null) {
        setCompany(value1);

      }
      if (value2 !== null) {
        setCompanyEmail(value2);

      }
      if (value3 !== null) {
        setCompanyPhone(value3);

      }
      if (value4 !== null) {
        setCompanyAdd(value4);

      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();

  }, []);

  const { document, customer,  type } = location.state || {};

  console.log( document);

  

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
            {/* <h1>UNIVERSITY OF IBADAN</h1> */}
            <h2>{company}</h2>
            {/* <h4>Address: Alabata Road, Abeokuta, Ogun State.</h4> */}
            <p>Email: {companyEmail} | Tel: {companyPhone} </p>
        </div>
    </div>
    {/* <hr /> */}
    <div className={classes.smallheader}>INDIVIDUAL MEMBERS PERSONAL LEDGER</div>
    <div className={classes.nameheader}>
        <div className={classes.namespace}>
            <div className={classes.questionname}>
                <h5>MEMBER NAME:</h5>
            </div>
            <div className={classes.details}>
                <h6>{customer?.label}</h6>
            </div>
        </div>
        <div className={classes.passport}>
            {/* <img src={arleft} className={classes.arrow} /> */}
        </div>
    </div>
    <table className={classes.reportTable}>
      <thead>
        <tr >
            <th style={{textAlign: "center",  whiteSpace: "nowrap"}}>S/N</th>
            <th style={{textAlign: "center",  }}>TRANSACTION DATE</th>
            <th className={classes.longth}>DESCRIPTION</th>
            <th style={{textAlign: "center",  whiteSpace: "nowrap"}}>DEBITS</th>
            <th style={{textAlign: "center",  whiteSpace: "nowrap"}}>CREDITS</th>
            <th style={{textAlign: "center",  whiteSpace: "nowrap"}}>BALANCE</th>
        </tr>  
        </thead>
        <tbody>
        {document.map((item, index) => (
       <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.transaction_date}</td>
            <td className={classes.left111}>{item.description}</td>
            <td className={classes.right111}>{parseFloat(item.debit).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
            <td className={classes.right111}>{parseFloat(item.credit).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
            <td className={classes.right111}>{parseFloat(item.balance).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
        </tr>
        ))}
        </tbody>
        
    </table>
    <br />
   
    {/* <h3 className={classes.footer}>Excellence and Integrity</h3> */}
    <button onClick={handlePrint} className={classes.printbutton}>Print Report</button>
    </div>
    </div>
  )
}
