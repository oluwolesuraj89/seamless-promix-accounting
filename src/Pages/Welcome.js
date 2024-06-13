import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from './Welcome.module.css';
import userIcon from '../assets/welcome/userIcon.png';
import settings1 from '../assets/welcome/setting.png';
import logoutIcon from '../assets/welcome/logoutIcon.png';
import management from '../assets/welcome/coop.png';
import final from '../assets/welcome/fin.png';
import pos from '../assets/welcome/pos.png';
import person from '../assets/welcome/profile.png';
import budget from '../assets/welcome/budget.png';
import church from '../assets/welcome/church.png';
import fixed from '../assets/welcome/fixed.png';
import users from '../assets/welcome/user.png';
import roles from '../assets/welcome/roles.png';
import settings from '../assets/welcome/settings.png';
import logout from '../assets/welcome/log.png';
import { BASE_URL } from "./api/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "react-toastify";

function Welcome() {
    const [bearer, setBearer] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const readData = async () => {
        try {
            const detail = await AsyncStorage.getItem('tobi');
            const details = await AsyncStorage.getItem('userToken');
            const detailss = await AsyncStorage.getItem('companyName');

            if (detail !== null) {
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

    const handleModuleClick = (module) => {
        if (module === 'cooperative') {
            navigate('/cooperative');
        }
        if (module === 'accounting') {
            navigate('/accounting');
        }
        if (module === 'stock_management') {
            navigate('/stock_management');
        }
        
    };

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
      
          toast.success(response.data.message);
      
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
        <div>
            <div className={classes.mainComtainer}>
                <div className={classes.theBody}>
                    <p>Hi,</p>
                    <h2 className={classes.userText}>{user.toLocaleUpperCase()}</h2>
                    <h4 className={classes.brookesText}>Welcome to Brookes Professional Services</h4>
                </div>
                <div className={classes.settingsContainer}>
                
                    <div className={classes.modules1} >
                        <img src={users} className={classes.icon3} />
                        <p>Manage Users</p>
                    </div>
                    <div className={classes.modules1} >
                        <img src={roles} className={classes.icon3} />
                        <p>Roles and Permissions</p>
                    </div>
           
                
                    <div className={classes.modules1} >
                        <img src={settings} className={classes.icon3} />
                        <p>System Settings</p>
                    </div>
                    <div className={classes.modules1} onClick={() => handleLogout()}>
                        <img src={logout} className={classes.icon3} />
                        <p>{loading ? "Logging out...." : "Log out"}</p>
                    </div>
              
                
                </div>
                <p className={classes.header}>Select a Module to work with</p>
                <div className={classes.bottomFoot}>
                <div className={classes.row2}>
                    <div className={classes.modules} onClick={() => handleModuleClick('cooperative')}>
                        <img src={management} className={classes.icon2} />
                        <p>Cooperative Management System</p>
                    </div>
                    <div className={classes.modules} onClick={() => handleModuleClick('accounting')}>
                        <img src={final} className={classes.icon2} />
                        <p>Financial Accounting System</p>
                    </div>
                </div>
                <div className={classes.row2}>
                    <div className={classes.modules} onClick={() => handleModuleClick('inventory')}>
                        <img src={pos} className={classes.icon2} />
                        <p>Inventory and POS</p>
                    </div>
                    <div className={classes.modules} onClick={() => handleModuleClick('fixed')}>
                        <img src={fixed} className={classes.icon2} />
                        <p>Fixed Asset Management</p>
                    </div>
                </div>
                <div className={classes.row2}>
                    <div className={classes.modules} onClick={() => handleModuleClick('stock_management')}>
                        <img src={budget} className={classes.icon2} />
                        <p>Event Centers Mgt. System</p>
                    </div>
                    <div className={classes.modules} onClick={() => handleModuleClick('church')}>
                        <img src={church} className={classes.icon2} />
                        <p>Church Management</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
