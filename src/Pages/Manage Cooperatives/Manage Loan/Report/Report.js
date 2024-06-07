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

    const { document, customer, saving, type} = location.state || {};

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

  return (
    <div style={{ marginTop: '1rem', }}>
        {/* <AdminHeaderNav /> */}
        <div className='newBody'>
            <div className='newWidth'>
                <div className="wrapper">        
                    <div className={classes.a4}>
                <div className={classes.header}>
                <p style={{width: "100%", fontSize: 25, fontWeight: 900, color: "#000"}}>{company}</p>
                    {/* <h4>Account Activity Period, 01 - 01 (September - September) 2017/2018</h4> */}
                    <h6 style={{fontSize: 20, fontWeight: 500}}>INDIVIDUAL {type} LEDGER REPORT</h6>
                    <h6 style={{fontSize: 20, fontWeight: 500}}>{saving?.label.toUpperCase()}</h6>
                </div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 20, }}>
                    <p style={{marginTop: 30, color: "#000", fontSize: 16}}>COOP. MEMBER NAME: </p>        
                    <p style={{marginTop: 30, color: "#000", fontSize: 16, fontWeight: 700, marginLeft: 10}}> {customer?.label.toUpperCase()} </p>        
                    <div style={{display: "flex", justifyContent: "flex-end", flex: 1}}>
                    <p style={{marginTop: 30, color: "#000", fontSize: 16, marginRight: 10}}>{currentDateTime} </p>        
                    </div>
                    </div>
                    <table className={classes.table}>
                    <thead>
                    <tr style={{borderTop: "2px solid black"}}>
    <th style={{ width: '200px' }}>Transaction Date</th>
    <th style={{ width: '200px' }}>Description</th>
    {/* <th style={{ width: '200px' }}>Particulars</th>
    <th style={{ width: '500px' }}>Details</th> */}
    
    <th style={{ textAlign: "right", width: '200px' }}>Debit</th>
    <th style={{ textAlign: "right", width: '200px' }}>Credit</th>
    <th style={{ textAlign: "right", width: '200px' }}>Balance</th>
  </tr>
</thead>
  <tbody>
    {document && document.map((item, index) => (
      <tr key={index}>
        <td>{item.transaction_date}</td>
        <td>{item.description}</td>
        {/* <td>{item.account?.gl_name}</td>
        <td>{item.details}</td> */}
        {/* <td></td> */}
        {/* <td></td> */}
        {/* <td></td> */}
        <td style={{ textAlign: "right",  }}>{parseFloat(item.debit).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
        <td style={{ textAlign: "right" }}>{parseFloat(item.credit).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
        <td style={{ textAlign: "right" }}>{parseFloat(item.balance).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
        
                  
      </tr>
    ))}
    <tr>
    <td colSpan="12" style={{ borderBottom: "1px solid #c4c4c4" }}></td>
  </tr>
    <tr>
      <td colSpan="2">Total</td>
      <td style={{ textAlign: "right", fontWeight: "bold" }}>{totalDebit}</td>
      <td  style={{ textAlign: "right", fontWeight: "bold" }}>{totalCredit}</td>
      <td  style={{ textAlign: "right", fontWeight: "bold" }}>{totalBalance}</td>
                    
    </tr>
    <tr>
    <td colSpan="12" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
  </tbody>
</table>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
