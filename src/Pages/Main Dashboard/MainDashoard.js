import React, { useState, useEffect } from 'react';
import classes from '../../Pages/Main Dashboard/MinDashboard.module.css';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import Accordion from 'react-bootstrap/Accordion';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'bootstrap';

// import Folder from '../../Images/folder-2.svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import SuccessImg from '../../Images/completed.svg';
// import messageIcon from '../../Images/Dashbord-menu-icons/message-text.svg';
// import Invoice from '../../Images/Dashbord-menu-icons/invoice.svg';
// import LogOutIcon from '../../Images/Dashbord-menu-icons/logout.svg';
// import DashImg from '../../Images/DI-mobile1.svg';
// import Msg1 from '../../Images/DI-mobile2.svg';
// import Inv from '../../Images/DI-mobile3.svg';
// import LgOut from '../../Images/DI-mobile4.svg';
// import DashboardLogo from '../../Images/dashboardLogo.svg';
// import UserLogo from '../../Images/user-edit.svg';
// import Swal from 'sweetalert2';
// import { useRegistration } from '../RegistrationContext';


export default function MainDashoard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const [activeLink, setActiveLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { isReg, retrieveRegStatus } = useRegistration();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
    };

    const closeMenu = () => {
        setIsMenuOpen(false); // Close the menu
    };
    // const [isReg, setIsReg] = useState(false);


    // useEffect(() => {
    //     const pathname = location.pathname;
    //     if (pathname.includes('dashboard')) {
    //         setActiveLink('Dashboard');
    //     } else if (pathname.includes('loan')) {
    //         setActiveLink('Loan');
    //     } else if (pathname.includes('complete_registration')) {
    //         setActiveLink('Update Profile');
    //     } else if (pathname.includes('my_profile')) {
    //         setActiveLink('My Profile');
    //     } else if (pathname.includes('grant')) {
    //         setActiveLink('Grants');
    //     } else if (pathname.includes('invoice')) {
    //         setActiveLink('Invoices');
    //     } else if (pathname === '/sign_in') {
    //         setActiveLink('Logout');
    //     } else {
    //         setActiveLink(null);
    //     }
    // }, [location]);

    // const readData = async () => {
    //     try {
    //         const detail = await AsyncStorage.getItem('fullName');
    //         const details = await AsyncStorage.getItem('userToken');


    //         if (detail !== null) {
    //             const firstName = detail.split(' ')[0];
    //             setUser(firstName);
    //         }


    //         if (details !== null) {
    //             setBearer(details);
    //         }
    //     } catch (e) {
    //         alert('Failed to fetch the input from storage');
    //     }
    // };

    // useEffect(() => {
    //     readData();
    // }, []);


    // useEffect(() => {
    //     const retrieveRegStatus = async () => {
    //       try {
    //         const regStatus = await AsyncStorage.getItem('isComplete');
    //           setIsReg(regStatus === 'true');



    //       } catch (error) {
    //         console.error('Error retrieving admin status:', error);
    //       }
    //     };

    //     retrieveRegStatus();
    //   }, []);


    // const handleLogout = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post(
    //             'https://api-smesupport.ogunstate.gov.ng/api/logout',
    //             {},
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${bearer}`
    //                 }
    //             }
    //         );
    //         navigate('/sign_in');


    //     } catch (error) {
    //         let errorMessage = 'An error occurred. Please try again.';
    //         if (error.response && error.response.data && error.response.data.message) {
    //             if (typeof error.response.data.message === 'string') {
    //                 errorMessage = error.response.data.message;
    //             } else if (Array.isArray(error.response.data.message)) {
    //                 errorMessage = error.response.data.message.join('; ');
    //             } else if (typeof error.response.data.message === 'object') {
    //                 errorMessage = JSON.stringify(error.response.data.message);
    //             }
    //             if (errorMessage.toLowerCase().includes('unauthenticated') || errorMessage.toLowerCase().includes('unauthorized')) {
    //                 navigate('/sign_in');
    //                 return;
    //             }
    //         }
    //         setErrorMessage(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    return (
        <div className={classes.sideNavBody}>
            <div className={classes.sideNavContainer}>
                <div className={classes.logoCont}>
                    <span>A</span>
                    <p style={{color:'white', fontSize:'14px'}}>Ajanla Farms and Pastry</p>

                </div>
                <div className={classes.sideNav}>
                    {/* {`${classes.mainMenu} ${isMenuOpen ? classes.menuOpen : ''}`} */}

                    <div className={`${classes.regMenu} ${isMenuOpen ? '' : classes.menuOpen}`}>
                
                        <Link
                            // to={'/#'}
                            className={activeLink === 'Dashboard' ? classes.active : ''}
                        >
                            <p>
                                <img src={dashIcon} alt='icon' className={classes.webshow} />
                                <img src={dashIcon} alt='icon' className={classes.mobileshow} />
                                Dashboard</p>
                        </Link>
                        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton> */}
                        <Link
                            // to={'/#'}
                            className={activeLink === 'My Profile' ? classes.active : ''}
                        >
                            <p> <img src={dIcon2} alt='icon'/> Receivables</p>
                        </Link>

                        <Link
                            // to={'/#'}
                            className={activeLink === 'Loan' ? classes.active : ''}
                        >
                            <p><img src={dIcon3} alt='icon' /> Payables</p>
                        </Link>
                        <Link
                            // to={'/#'}
                            className={activeLink === 'Grants' ? classes.active : ''}
                        >
                            <p> <img src={dIcon4} alt='icon' /> Inventory</p>
                        </Link>
                        <Link
                            // to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon5} alt='icon' /> Transactions</p>
                        </Link>
                        <Link
                            // to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon4} alt='icon' /> Report</p>
                        </Link>
                        <Link
                            // to={'/#'}
                            className={activeLink === 'Invoices' ? classes.active : ''}
                        >
                            <p> <img src={dIcon6} alt='icon' /> Profile</p>
                        </Link>


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
                    <div className={classes.logoPic}>
                        <img src={Logo} alt='Logo' className={classes.imgs}/>
                    </div>
                    <Link>
                        <button className={classes.logout}>
                            <img src={Out} alt='Logo' style={{width:'20px', height:'20px'}}/>
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
            {/* <div className={classes.formSection}>
                <div className={classes.formSectionHeader}>
                    <div>
                        <h4 style={{color:'black'}}>Dashboard</h4>
                        
                    </div>
                    <div style={{textAlign:'right'}}>
                        <p style={{margin:'0'}}>Welcome</p>
                        <h3>
                            {user}user
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
            </div> */}
        </div>
        // </div>
    )
}
