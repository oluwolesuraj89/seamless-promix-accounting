import React from "react";
import classes from './Login.module.css'
import backgroundImg from '../../assets/promix/LogIn.png'

function Login (){

return (

    <div className={classes.background}>
 <div className={classes.mainContainerx}>
                <div className={classes.thecntnt}>
                    <div >
                        <p className={classes.SignUptxt}>Login</p>
                        <p className={classes.SignUptxtsub}>Login to your portal</p>
                    </div>
                    <div className={classes.firstset}>
                        
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
                        
                    </div>
                    <button className={classes.snupbtn}>Login</button>
                    <p className={classes.lgin}>Don't have an account? <span>Sign Up</span></p>
                </div>
            </div>
    </div>
);

}
export default Login;