import React from "react";
import './promixSignUp.css';

function App() {

  return (
    <div>
      <div className="mainContainer">
        <div className="SignUp">
          <div className="innerDiv">
            <div style={{ display: 'block' }}>
              <p className="signUpTxt">Sign Up</p>
              <p className="underSignupTxt">Enter your Information and let's get you started</p>

              <div class="form-group">
                <label for="name">Name</label><br />
                <input type="text" id="name" name="name" placeholder="Enter your name" class="custom-input" />
              </div>

              <div class="form-group">
                <label for="name">Email address</label><br />
                <input type="text" id="name" name="name" placeholder="Enter your email address" class="custom-input" />
              </div>

              <div class="form-group">
                <label for="name">Password</label><br />
                <input type="text" id="name" name="name" placeholder="Enter your password" class="custom-input" />
              </div>

              <div class="form-group">
                <label for="name">Re-emter Password</label><br />
                <input type="text" id="name" name="name" placeholder="Enter your password" class="custom-input" />
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