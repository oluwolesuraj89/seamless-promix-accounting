import React, { useEffect, useState } from 'react';
// import Logo from '../../Images/logo black.png'
// import mobileLogo from '../../Images/mobile-logo.svg'
import logo from '../../assets/promix/logoGreen.png';
import { NavLink, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import classes from '../HeaderNav/HeaderNav.module.css';
// import { Navbar, Nav } from 'react-bootstrap';

const HeaderNav = () => {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const readData = async () => {
    // try {
    //   const value = await AsyncStorage.getItem('userToken');
    //   if (value !== null) {
    //     setBearer(value);
    //   }
    // } catch (e) {
    //   alert('Failed to fetch the input from storage');
    // }
  };

  useEffect(() => {
    readData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the menu
  };

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${bearer}`
  // };

  return (
    <div className={classes.headerSection} >
      <nav className={classes.nav}>
        <div className={classes.navContainer} >
          <NavLink to={'/'} className={classes.navLogoWeb}><img src={logo} className={classes.logoicon}/></NavLink>
          {/* <NavLink to={'/'} className={classes.navLogoMobile}><img src={mobileLogo} alt='Logo' /></NavLink> */}
          <ul className={`${classes.mainMenu} ${isMenuOpen ?  '' : classes.menuOpen}`}>
            <li className={classes.linkList}>
              {/* <Link to={'/promix_landing'}>Home</Link> */}
              <Link to={'#'}>Features</Link>
              <Link to={'#'}>Pricing</Link>
              <Link to={'#'}>FAQs</Link>
              {/* <Link to={'darshboard '}>Dashboard</Link> */}
            </li>
            <li className={classes.navItem}>
              <NavLink to={'/login'}><button className={classes.whiteBtn}>Log In</button></NavLink>
              <NavLink to={'/signup'}><button className={classes.greenBtn}>Sign Up</button></NavLink>
            </li>
          </ul>
          <div className={classes.harmborgers} onClick={toggleMenu}>
            {isMenuOpen ? (
              <span className={classes.closs}>
                <i className='bx bx-x'></i>
                
              </span>
            ) : (
              <span className={classes.open}>
                <i className='bx bx-menu'></i>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
    //   </div>
    // </div>
  );
};

export default HeaderNav;