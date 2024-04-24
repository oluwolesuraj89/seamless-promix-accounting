import React from "react";
import backgroundImage from '../../assets/promix/bgForSignup.png';
import classes from './Signup.module.css'


function SignUp() {

    return (
        <div className={classes.background}>
            <div className={classes.mainContainerx}>
                <div className={classes.thecntnt}>
                    <div >
                        <p className={classes.SignUptxt}>Sign Up</p>
                        <p className={classes.SignUptxtsub}>Enter your information and let's get you started</p>
                    </div>
                    <div className={classes.firstset}>
                        <div className={classes.input1}>
                            <label className={classes.dlabl}>Name</label>
                            <input placeholder="Enter your name" type="text" className={classes.inputlbl}></input>
                        </div>
                        <div className={classes.input1}>
                            <label className={classes.dlabl}>Email Address</label>
                            <input placeholder="Enter your email address" type="text" className={classes.inputlbl}></input>
                        </div>
                    </div>
                    <div className={classes.secondset}>
                        <div className={classes.input1}>
                            <label className={classes.dlabl}>Password</label>
                            <input placeholder="Enter your password" type="password" className={classes.inputlbl}></input>
                        </div>
                        <div className={classes.input1}>
                            <label className={classes.dlabl}>Re-enter password</label>
                            <input placeholder="Enter your password" type="password" className={classes.inputlbl}></input>
                        </div>
                    </div>
                    <button className={classes.snupbtn}>Signup</button>
                    <p className={classes.lgin}>Already have an account? <span>Log in</span></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;