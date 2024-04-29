import React, { useState } from "react";
import classes from './Login.module.css'
import backgroundImg from '../../assets/promix/LogIn.png'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../api/api";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import crossedEyeIcon from '../../assets/promix/eye-slash.png';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/login`,
                {
                    email: email,
                    password: password
                }
            );
            //  console.log(response);
            const result = response.data?.data?.user?.name;
            const addresses = response.data?.data?.user?.company?.address;
            const phones = response.data?.data?.user?.company?.phone_number;
            const emails = response.data?.data?.user?.company?.email;
            const resultx = response.data?.data?.user?.email;
            const results = response.data?.data?.token;
            const permit = response.data?.data?.permissions;
            const isAdmin = response.data?.data?.user?.is_admin === "1";
            const companyName = response.data?.data?.company_name;
            AsyncStorage.setItem('permissions', permit);
            AsyncStorage.setItem('admin', isAdmin);
            AsyncStorage.setItem('companyName', companyName);
            AsyncStorage.setItem('tobi', result);
            AsyncStorage.setItem('userToken', results);
            AsyncStorage.setItem('userEmail', resultx);
            AsyncStorage.setItem('companyEmail', emails);
            AsyncStorage.setItem('companyPhone', phones);
            AsyncStorage.setItem('companyAddress', addresses);


            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate('/main_dashboard');
            }

        } catch (error) {
            let errorMessage = error.response?.data?.message || 'An error occurred';
            if (error.message === 'Network Error') {
                errorMessage = 'Connection error. Please check your internet connection.';
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isButtonDisabled) {
            handleLogin();
        }
    };

    const isButtonDisabled = !email || !password;


    return (

        <div className={classes.background}>
            <ToastContainer />
            <div className={classes.mainContainerx}>
                <div className={classes.thecntnt}>
                    <div className={classes.head}>
                        <p className={classes.SignUptxt}>Login</p>
                        <p className={classes.SignUptxtsub}>Login to your portal</p>
                    </div>
                    <Form>
                        <Form.Group className={classes.formGroup}>
                            <Form.Label  >Email Address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type='text'  placeholder="Enter your email address" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: "#fff" }} />
                        </Form.Group>
                        <Form.Group className={classes.formGroup}>
                            <Form.Label  >Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password address" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: "#fff", }} onKeyPress={handleKeyPress} />
                            <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    float: 'right',
                                    left: "-10px",
                                    marginTop: '-30px',
                                    position: 'relative',
                                    zIndex: 2
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                                ) : (
                                    '👁️'
                                )}
                            </button>
                        </Form.Group>
                    </Form>
                    <Button onClick={handleLogin} variant="success" className={classes.snupbtn} disabled={isButtonDisabled}>
                        {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span style={{ marginLeft: '5px' }}>Signing in...</span>
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                    <p className={classes.lgin}>Don't have an account? <Link to={'/signup'} style={{ textDecoration: 'none' }}><span>Sign Up</span></Link></p>
                </div>
            </div>
        </div>
    );

}
export default Login;