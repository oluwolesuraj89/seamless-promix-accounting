import React from "react";
import classes from './Login.module.css'
import backgroundImg from '../../assets/promix/LogIn.png'
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Login (){

return (

    <div className={classes.background}>
        <div className={classes.mainContainerx}>
            <div className={classes.thecntnt}>
                <div className={classes.head}>
                    <p className={classes.SignUptxt}>Login</p>
                    <p className={classes.SignUptxtsub}>Login to your portal</p>
                </div>
                <Form>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Email Address</Form.Label>
                    <Form.Control type='text' id="date" placeholder="Enter you email address"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)', color: "#fff"}}/>
                </Form.Group>
                <Form.Group className={classes.formGroup}>
                    <Form.Label  >Password</Form.Label>
                    <Form.Control type='password' id="date" placeholder="Enter you password address"  style={{backgroundColor:'rgba(0, 0, 0, 0.8)', color: "#fff"}}/>
                </Form.Group>
                </Form>
                <Button variant="success" className={classes.snupbtn}>Login</Button>
                <p className={classes.lgin}>Don't have an account? <Link to={'/signup'} style={{textDecoration:'none'}}><span>Sign Up</span></Link></p>
            </div>
        </div>
    </div>
);

}
export default Login;