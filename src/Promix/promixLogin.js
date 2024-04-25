import React from "react";
import './promixLogin.css';

function App() {

  return (
    <div>
      <div className="mainContainerLogin">
      <div className="LogIn">
          <div className="innerDiv">
            <div style={{ display: 'block' }}>
              <div className="HeaderPosition">
              <p className="LoginTxt">Log In</p>
              <p className="underLoginTxt">Login to yor portal</p>
              </div>

              <div class="form-group">
                <label for="name">Email address</label><br />
                <input type="email" id="name" name="name" placeholder="Enter your email address" class="custom-input" />
              </div>

              <div class="form-group">
                <label for="name">Password</label><br />
                <input type="password" id="name" name="name" placeholder="Enter your password" class="custom-input" />
              </div>

              <button className="signUpButton">
                Sign Up
              </button>
            </div>

            <div className="alr">
              <p>Already have an account?<span className="alr2"> Log In</span></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;