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
import MainDashboard from '../Main Dashboard/MainDashoard';
import dChart1 from '../../assets/promix/dShart1.svg'
import dChart2 from '../../assets/promix/dShart2.svg'
import dChart3 from '../../assets/promix/dShart3.svg'
import dChart4 from '../../assets/promix/dShart4.svg'
import dChart5 from '../../assets/promix/dShart5.svg'
import dChart6 from '../../assets/promix/dShart6.svg'
import dChart7 from '../../assets/promix/dShart7.svg'
import dChart8 from '../../assets/promix/dShart8.svg'
import Arrow from '../../assets/promix/dArrow-down.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoopDashboard from '../Cooperative Dashboard/CoopDashboard';

const Dashboard = () => {
    const [bearer, setBearer] = useState('');
    const [user, setUser] = useState('');
    const [company, setCompany] = useState('');

    const readData = async () => {
        try {
            const detail = await AsyncStorage.getItem('tobi');
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

    
    return (
        <div>
            <CoopDashboard/>
            
            <div className={classes.formSection}>
                <div className={classes.formSectionHeader}>
                    <div className={classes.dashboardName}>
                        <h4 style={{color:'black'}}>{company}</h4>
                        
                    </div>
                    <div className={classes.userSide} >
                        {/* <p style={{margin:'0'}}>Welcome</p> */}
                        <h3>
                            {user.toLocaleUpperCase()}
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