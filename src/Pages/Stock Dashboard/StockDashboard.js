import React, { useState, useEffect } from 'react';
import classes from './StockDashboard.module.css';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Tab, Tabs, Form, Spinner } from 'react-bootstrap';
import dashIcon from '../../assets/promix/dash-icon1.svg'
import dIcon2 from '../../assets/promix/dIcon2.svg'
import dIcon3 from '../../assets/promix/dIcon3.svg'
import dIcon4 from '../../assets/promix/dIcon4.svg'
import dIcon5 from '../../assets/promix/dIcon5.svg'
import dIcon6 from '../../assets/promix/dIcon6.svg'
import Arrow from '../../assets/promix/dArrow-down.svg'
import Out from '../../assets/promix/dLoginIcon.svg'
import Logo from '../../assets/promix/dLogoWhite.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'bootstrap';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import LogoutIcon from '../../assets/welcome/log.png'



export default function StockDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const [company, setCompany] = useState('');
    const [activeLink, setActiveLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpen1, setIsMenuOpen1] = useState(false);
    const [isMenuOpen2, setIsMenuOpen2] = useState(false);
    const [isMenuOpen3, setIsMenuOpen3] = useState(false);
    const [isMenuOpen4, setIsMenuOpen4] = useState(false);
    const [isMenuOpen5, setIsMenuOpen5] = useState(false);
    const [isMenuOpen6, setIsMenuOpen6] = useState(false);
    const [isMenuOpen7, setIsMenuOpen7] = useState(false);
   

    function ContextAwareToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext);
      
        const decoratedOnClick = useAccordionButton(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = activeEventKey === eventKey;
      
        return (
          <button
            type="button"
            // style={{ backgroundColor: isCurrentEventKey ? LIGHTGREE : DEEPGREEN }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
    };
    const toggleMenu1 = () => {
        setIsMenuOpen1(!isMenuOpen1); // Toggle the menu open/close state
    };
    const toggleMenu2 = () => {
        setIsMenuOpen2(!isMenuOpen2); // Toggle the menu open/close state
    };
    const toggleMenu3 = () => {
        setIsMenuOpen3(!isMenuOpen3); // Toggle the menu open/close state
    };
    const toggleMenu4 = () => {
        setIsMenuOpen4(!isMenuOpen4); // Toggle the menu open/close state
    };
    const toggleMenu5 = () => {
        setIsMenuOpen5(!isMenuOpen5); // Toggle the menu open/close state
    };
    const toggleMenu6 = () => {
        setIsMenuOpen6(!isMenuOpen6); // Toggle the menu open/close state
    };
    const toggleMenu7 = () => {
        setIsMenuOpen7(!isMenuOpen7); // Toggle the menu open/close state
    };
    

    const closeMenu = () => {
        setIsMenuOpen(false); // Close the menu
    };
    
    const readData = async () => {
        try {
            const detail = await AsyncStorage.getItem('fullName');
            const details = await AsyncStorage.getItem('userToken');
            const detailss = await AsyncStorage.getItem('companyName');


            if (detail !== null) {
                // const firstName = detail.split(' ')[0];
                setUser(detail);
             
            }


            if (details !== null) {
                setBearer(details);
            }
            if (detailss !== null) {
                setCompany(detailss);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

    useEffect(() => {
        readData();
    }, []);


    const handleLogout = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${BASE_URL}/logout`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
      
          navigate('/login');
      
        //   toast.success(response.data.message);
      
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
          setLoading(false);
        }
      };

    return (
        <div className={classes.sideNavBody}>
            <div className={`${classes.sideNavContainer} ${classes.overflow}`}>
                <div className={classes.logoCont}>
                <div className={classes.logoPic}>
                        <img src={Logo} alt='Logo' className={classes.imgs}/>
                    </div>
                    {/* <span>A</span> */}
                    {/* <p style={{color:'white', fontSize:'16px'}}>{company}</p> */}
                </div>
                <div className={`${classes.sideNav}`}>
                    {/* {`${classes.mainMenu} ${isMenuOpen ? classes.menuOpen : ''}`} */}

                    <div className={`${classes.regMenu} ${isMenuOpen ? '' : classes.menuOpen}`}>
                        <Link
                            to={'/event_mgt_system'}
                            className={activeLink === 'Dashboard' ? classes.active : ''}
                        >
                            <p>
                                <span><img src={dashIcon} alt='icon' className={classes.webshow} />
                                <img src={dashIcon} alt='icon' className={classes.mobileshow} />
                                Dashboard </span>
                            </p>
                        </Link>
                        <Accordion>
                           
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu}>
                                    <ContextAwareToggle eventKey="0">
                                        <p>
                                            <span>
                                                <img src={dIcon2} alt='icon'/> Configuration
                                            </span>
                                            {isMenuOpen ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        <NavLink to={'/event_mgt_system/unit_of_measurement'} >Unit of Measurement</NavLink><br/>
                                       
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card>
                           
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu6}>
                                    <ContextAwareToggle eventKey="6">
                                        <p>
                                            <span>
                                                <img src={dIcon2} alt='icon'/> Services
                                            </span>
                                            {isMenuOpen ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="6" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                    <Link to={'/event_mgt_system/services'}>Manage Services</Link><br/>
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card>
                            {/* <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu6}>
                                    <ContextAwareToggle eventKey="6">
                                        <p>
                                            <span>
                                                <img src={dIcon2} alt='icon'/> Products/Items
                                            </span>
                                            {isMenuOpen ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="6" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                    <Link to={'/event_mgt_system/products'}>Products/List Items</Link><br/>
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card> */}
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu1}>
                                    <ContextAwareToggle eventKey="1">
                                        <p>
                                            <span><img src={dIcon3} alt='icon' /> Bookings</span>
                                            {isMenuOpen1 ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        {/* <Link to={'/general_payment_voucher'}>Suppliers/Beneficiaries</Link><br/> */}
                                        <Link to={'/event_mgt_system/event_bookings'}>Event Bookings</Link><br/>
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card>
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu1}>
                                    <ContextAwareToggle eventKey="12">
                                        <p>
                                            <span><img src={dIcon3} alt='icon' /> Advance Payment</span>
                                            {isMenuOpen1 ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="12" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        {/* <Link to={'/general_payment_voucher'}>Suppliers/Beneficiaries</Link><br/> */}
                                        <Link to={'/event_mgt_system/customers_advance_payment'}>Customers Advance Payments</Link><br/>
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card>
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu2}>
                                    <ContextAwareToggle eventKey="2">
                                        <p> 
                                            <span><img src={dIcon4} alt='icon' /> Requisitions</span>
                                            {isMenuOpen2 ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        <Link to={'/event_mgt_system/requisition'}>Requistion List</Link><br/>
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu2}>
                                    <ContextAwareToggle eventKey="8">
                                        <p> 
                                            <span><img src={dIcon4} alt='icon' /> Utility</span>
                                            {isMenuOpen2 ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="8" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        <Link to={'/welcome'}>Switch Account</Link><br/>
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            {/* <Card className={classes.accordionCard}>
                                <Card.Header className={classes.cardHeader} onClick={toggleMenu3}>
                                    <ContextAwareToggle eventKey="3">
                                        <p> 
                                            <span><img src={dIcon5} alt='icon' /> Deductions</span>
                                            {isMenuOpen3 ? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                        <Link to={'#'}>Savings Deductions</Link><br/>
                                        <Link to={'#'}>Loan Deductions</Link><br/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card> */}
                          
                            <Card className={classes.accordionCard}>
                                {/* <Card.Header className={classes.cardHeader} onClick={toggleMenu5}>
                                    <ContextAwareToggle eventKey="5">
                                        <p> 
                                            <span><img src={dIcon6} alt='icon' /> Profile</span>
                                            {isMenuOpen5? (<i class='bx bx-chevron-down'></i>) : (<i class='bx bx-chevron-up'></i>)} 
                                        </p>
                                    </ContextAwareToggle>
                                </Card.Header> */}
                                <Accordion.Collapse eventKey="5" style={{backgroundColor:'#164B2E'}}>
                                    <Card.Body className={classes.cardBody}>
                                    {/* <Link to={'#'}>My Profile</Link><br/> */}
                                    {/* <Link to={'#'}>Edit Profile</Link><br/> */}
                                    {/* <Link to={'#'}>Manage User</Link><br/> */}
                                    {/* <Link to={'#'}>Change Password</Link><br/> */}
                                    {/* <Link to={'#'}>Sign Out</Link> */}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            
                        </Accordion>
                        
                       
                        {/* <Link
                            to={'/#'}
                            className={activeLink === 'Loan' ? classes.active : ''}
                        >
                            
                        </Link> */}
                        {/* <Link
                            to={'/#'}
                            className={activeLink === 'Grants' ? classes.active : ''}
                        >
                            <p> <img src={dIcon4} alt='icon' /> Inventory</p>
                        </Link> */}
                        {/* <Link
                            to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon5} alt='icon' /> Transactions</p>
                        </Link> */}
                        {/* <Link
                            to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon4} alt='icon' /> Report</p>
                        </Link> */}
                        {/* <Link
                            to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon6} alt='icon' /> Profile</p>
                        </Link> */}


                        {/* <Link
                            onClick={handleLogout}
                            to={'/sign_in'}
                            className={activeLink === 'Logout' ? classes.active : ''}
                        >
                            <p>
                                <img src={dashIcon} alt='icon' />{' '}
                                {loading ? (
                                    <>
                                        <Spinner size='sm' style={{ marginRight: 5 }} /> Signing out...
                                    </>
                                ) : (
                                    'Log out'
                                )}
                            </p>
                        </Link> */}
                    </div>
                    {/* <div className={classes.harmborgers} onClick={toggleMenu}>
                        {isMenuOpen ? (
                        <span className={classes.closs}>
                            <i className='bx bx-x'></i>
                        </span>
                        ) : (
                        <span className={classes.open}>
                            <i className='bx bx-menu'></i>
                        </span>
                        )}
                    </div> */}
                </div>
                <div className={classes.dFooter}>
                    {/* <div className={classes.logoPic}>
                        <img src={Logo} alt='Logo' className={classes.imgs}/>
                    </div> */}
                    <Link>
                        <button onClick={() => handleLogout()} className={classes.logout}>
                            <img src={LogoutIcon} alt='Logo' style={{width:'40px', height:'40px'}}/>
                            {loading ? "Logging out...." : "Log out"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        // </div>
    )
}
