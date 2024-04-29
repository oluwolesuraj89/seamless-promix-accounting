import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './api';
import LandingPage from '../../Pages/LandingPage';

function Pricing() {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(
                `${BASE_URL}/get-all-plans`
            );

            const planss = responses.data?.data;
            console.log(planss, "here");
            setPlans(planss);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            setPlans([]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchPlans();
    }, []);

}

export default Pricing;