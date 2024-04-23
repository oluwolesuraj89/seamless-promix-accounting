import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import OnbImg from '../../Images/image bg.png';
import classes from './Dashboard.module.css';
// import loanicon from '../../Images/moneys.png'
// import loaniconblue from '../../Images/moneysblue.png'
// import loanicongreen from '../../Images/receipt-2.png'
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-bootstrap';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Link } from 'react-router-dom'
import MainDashoard from '../Main Dashboard/MainDashoard';
import dChart1 from '../../assets/promix/dShart1.svg'
import dChart2 from '../../assets/promix/dShart2.svg'
import dChart3 from '../../assets/promix/dShart3.svg'
import dChart4 from '../../assets/promix/dShart4.svg'
import dChart5 from '../../assets/promix/dShart5.svg'
import dChart6 from '../../assets/promix/dShart6.svg'
import dChart7 from '../../assets/promix/dShart7.svg'
import dChart8 from '../../assets/promix/dShart8.svg'

const Dashboard = () => {
    
    return (
        <div>
            <MainDashoard/>
            <div className={classes.chartCont}>
                <div className={classes.chartBox}>
                    <img src={dChart1} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart2} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart3} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart4} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart5} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart6} alt='chart' className={classes.imgs}/>
                </div>
                <div className={`${classes.chartBox} ${classes.twoCole}`}>
                    <img src={dChart7} alt='chart' className={classes.imgs}/>
                </div>
                <div className={classes.chartBox}>
                    <img src={dChart8} alt='chart' className={classes.imgs}/>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;