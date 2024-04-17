import React from "react";
import './promixLanding.css';
import logo from './assets/promix/logoGreen.png';


function App() {

  return (
    <div>
      <div className="landing_header">
        <img src={logo} className="logoicon"/>
        <div className="headerText">
          <p>Home</p>
          <p>Features</p>
          <p>Pricing</p>
          <p>FAQs</p>
        </div>
      </div>
    </div>
  );
}

export default App;