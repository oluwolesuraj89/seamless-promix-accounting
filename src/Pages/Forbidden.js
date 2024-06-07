import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from './Welcome.module.css';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Forb from '../assets/forb.jpg';


function Forbidden() {
    const [bearer, setBearer] = useState('');
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
        
    };

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <img 
                src={Forb}
                style={{
                    width: "50%",
                    objectFit: "cover"
                }}
                />
                
                
               
            </div>
        </div>
    );
}

export default Forbidden;
