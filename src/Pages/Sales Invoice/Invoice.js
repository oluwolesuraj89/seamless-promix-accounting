import React, { useState, useEffect } from 'react';
// import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/plugins/metisMenu/metisMenu.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
// import "../assets/plugins/typicons/src/typicons.min.css";
// import "../assets/plugins/themify-icons/themify-icons.min.css";
// import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
// import "../style.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
// import { InfoFooter } from '../../InfoFooter';
// import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './Invoice.module.css';
import MainDashboard from '../../Main Dashboard/MainDashoard';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import StockDashboard from '../../Stock Dashboard/StockDashboard';
import InventoryDash from '../../Inventory Dashboard/InventoryDash';
// import classes from './LoanRepayment.module.css'
// import favicon from '../../Images/faviconn.png'

function Invoice() {
    const [user, setUser] = useState("");
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value2 = await AsyncStorage.getItem('companyId');
          const value1 = await AsyncStorage.getItem('tobi');
          const value3 = await AsyncStorage.getItem('companyName');
          const value4 = await AsyncStorage.getItem('companyEmail');
          const value5 = await AsyncStorage.getItem('companyPhone');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
          if (value1 !== null) {
              setUser(value1);
            }
          if (value3 !== null) {
            setCompany(value3);
          }
          if (value4 !== null) {
            setEmail(value4);
          }
          if (value5 !== null) {
            setPhone(value5);
          }
    
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };
    
      useEffect(() => {
        readData();
      }, []);

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
      
        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
      
        setCurrentDateTime(formattedDateTime);
      }, []);
      
      const { selectedInvoice } = location.state || {};
     
      console.log(selectedInvoice);
      const handlePrint = () => {
        window.print();
      };

  

  return (

    <div>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

          <InventoryDash />
            <div className='newBody'>
            <div className={classes.newWidth}>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Official Sales Invoice</h3>
                            {/* <small>Create and view your loan accounts...</small> */}
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                        </div>
                    </div>
            </div>

            <div className={classes.printHide}>
                    
                        <Button variant="success" onClick={handlePrint}>
                            
                            Print Receipt

                        </Button>
                  
            </div>

            <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                    <div className="card-body" style={{border:'none'}}>
                    <body className={classes.officialBody}>
            
            <div className={classes.a4}>
            <h4 className={classes.fontBold} >{company}</h4>
            <p className={classes.fontSmall}>{address}</p>
                        <p className={classes.fontSmall}>{phone}</p>
                        <p className={classes.fontSmall}>{email}</p>
                        <h4 className={classes.salesInv} >SALES INVOICE</h4>
                <div className={classes.headerContainer}>
                    <div className={classes.flex1}>
                        {/* <h1>OFFICIAL RECEIPT</h1> */}
                       
                       {/* <div style={{marginTop: 20}}/> */}
                        <table className={classes.headerTable1}>
                        <tr>
                                <td>CUSTOMER NAME:</td>
                               <td className={classes.tdWidth}>{selectedInvoice?.customer?.name}</td>
                            </tr>
                            <tr>
                                <td>CUSTOMER NO.:</td>
                                <td>{selectedInvoice?.customer?.phone}</td>
                            </tr>
                            <tr>
                                <td>CUSTOMER ADD.:</td>
                                <td>{selectedInvoice?.customer?.address}</td>
                            </tr>
                        </table>
                    </div>

                    <div className={classes.flex2}>
                        <table className={classes.headerTable2}>
                            <tr>
                                <td style={{borderBottom:'1px solid gray',}}>PAYMENT DATE:</td>
                                <td>{selectedInvoice?.transaction_date}</td>
                            </tr>
                            <tr>
                                <td>SALES INVOICE NO.:</td>
                                <td>{selectedInvoice?.invoice_number}</td>
                            </tr>
                            <tr>
                                <td>SALESPERSON:</td>
                                <td></td>
                            </tr>
                           
                            {/* <tr>
                                <td>CREDIT CARD NO.</td>
                                <td></td>
                            </tr> */}
                            
                            {/* <tr>
                                <td colSpan={2} style={{backgroundColor:'gray', padding:'3px', height:'20px',}}></td>
                            </tr> */}
                        </table>
                        
                    </div>     
                </div>

                    
                <table className={classes.bodyTable}>
                    <tr>
                        <th>ITEM NO</th>
                        <th style={{width:'300px'}}>DESCRIPTION</th>
                        <th>QTY</th>
                        <th>UNIT PRICE</th>
                        <th>TOTAL</th>
                    </tr>   
                    <tr>
                        <td>1</td>
                        <td >{selectedInvoice?.description}</td>
                        <td>1</td>
                        <td style={{textAlign: "right"}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</td>
                        <td style={{textAlign: "right"}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>   
                    <tr>
                        <td rowSpan={5} colSpan={2} className={classes.spaned}>
                            <span style={{fontWeight: 700}}>Remarks/Instructions:</span>
                            <div style={{textAlign:'center', marginTop:'20px',}}>
                                <span>Please make cheque payable to Your Company Name.</span><br/>
                                <div style={{fontSize:'23px', paddingTop:'10px', fontWeight: 700}}>THANK YOU</div>
                            </div>

                        </td>
                        <td style={{fontWeight: 900}} colSpan={2}>SUBTOTAL</td>
                        <td style={{textAlign:'right',}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</td>
                    </tr>   
                    <tr>
                    <td style={{fontWeight: 900}} colSpan={2}>TAX</td>
                        <td style={{textAlign:'right',}}></td>
                    </tr>
                    <tr>
                    <td style={{fontWeight: 900}} colSpan={2}>SHIPPING / HANDLING</td>
                        <td style={{textAlign:'right',}}></td>
                    </tr>
                    <tr>
                    <td style={{fontWeight: 900}} colSpan={2}>OTHER</td>
                        <td style={{textAlign:'right',}}></td>
                    </tr>
                    <tr>
                    <td style={{fontWeight: 900}} colSpan={2}>TOTAL</td>
                        <td style={{textAlign:'right', fontWeight: 900}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                        minimumIntegerDigits: 1,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</td>
                    </tr>
                    <tr>
                        <td colSpan={5} className={classes.footerCont} >
                            <div className={classes.div1}>
                                <div className={classes.div2}>
                                    <div>
                                        <span>CASH</span>
                                        <span>CREDIT CARD</span>
                                        <span>MONEY ORDER</span>
                                    </div>
                                    <span className={classes.span1}>
                                        For questions concerning this payment, please contact <strong>{company}</strong> on <strong>{phone}</strong>, or email us at <strong>{email}</strong>.
                                    </span>
                                   
                                    
                                </div>

                            </div>
                        </td>
                    </tr>
                    
                    
                </table>
            </div>
        </body>

                    




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

export default Invoice;