import React from "react";
import backgroundImage from '../../assets/promix/bgForSignup.png';
import classes from './Signup.module.css'
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


function SignUp() {

    return (
        <div className={classes.background}>
            <div className={classes.mainContainerx}>
            <div className={classes.thecntnt}>
                <div className={classes.head}>
                    <p className={classes.SignUptxt}>Sign Up</p>
                    <p className={classes.SignUptxtsub}>Enter your Information and let’s get you started</p>
                </div>
                <Form>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Name</Form.Label>
                    <Form.Control type='text' id="date" placeholder="Enter your name"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}/>
                </Form.Group>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Email address</Form.Label>
                    <Form.Control type='email' id="date" placeholder="Enter your email address"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}/>
                </Form.Group>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Password</Form.Label>
                    <Form.Control type='password' id="date" placeholder="Enter your password"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}/>
                </Form.Group>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Re-enter Password</Form.Label>
                    <Form.Control type='password' id="date" placeholder="Enter your password"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}/>
                </Form.Group>
                </Form>
                <Button variant="success" className={classes.snupbtn}>Sign Up</Button>
                <p className={classes.lgin}>Don't have an account? <Link to={'/login'} style={{textDecoration:'none'}}><span>Login In</span></Link></p>
            </div>
        </div>
        </div>
    );
}

export default SignUp;