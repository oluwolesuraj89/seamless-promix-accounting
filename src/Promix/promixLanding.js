import React from "react";
import './promixLanding.css';
import logo from '../assets/promix/logoGreen.png';
import firstFrame from '../assets/promix/firstFrame.png';
import suit from '../assets/promix/suit.png';
import frame from '../assets/promix/Frame 47.png';
import eclipse from '../assets/promix/Ellipse 29.png';
import womanimg from '../assets/promix/womanimg.png';
import phone from '../assets/promix/phone.png';

function App() {

  return (
    <div>
      <div className="landing_header">
        <img src={logo} className="logoicon" />
        <div className="headerText">
          <p>Home</p>
          <p>Features</p>
          <p>Pricing</p>
          <p>FAQs</p>
        </div>

        <div className="login">
          Log In
        </div>

        <div className="signup">
          Sign Up
        </div>

      </div>

      <div>
        <img src={firstFrame} className="firstFrame" />
      </div>

      <div className="thesecoundImage">
        <div style={{ paddingLeft: '83px', marginRight: '83px' }}>
          <div>
            <p className="firstText">
              Automate<br />
              Your Accounting<br />
              System And Reap<br />
              the Rewards
            </p>

            <p className="secoundText">
              Whether you are a small business, a non profit or a more medium size<br />
              enterprise, we'll help you find the perfect accounting solution. Run<br />
              multiple companies? We can help with that too by centralizing<br />
              accounting for all your businesses
              <br />
              <br /><br />
              Our accounting software is designed to make your business life easier.<br />
              It automates processes like pay-slips and tax calculations, so you don't<br />
              have to worry about pay-slip errors ever again. Pay your employees the<br />
              right amount on time, every time with an efficient, intuitive accounting<br />
              solution.
            </p>
            <div className="Try">
              Try it Now
            </div>
          </div>

        </div>

        <div>
          <img src={suit} className="suit" />
          <img src={frame} className="frame" />
        </div>
      </div>

      <div className="thirdContainer">
        <p className="why">
          Why smart accounting software makes good<br />
          <span style={{ marginLeft: '262px' }} />business sense
        </p>
        <p className="underWhy">
          Whether you are a small business, a non profit or a more medium size business, we'll help you find the perfect accounting solution.
          Run multiple companies?<br /><span style={{ marginLeft: '262px' }} />
          We can help with that too by centralizing accounting for all your businesses.
        </p>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'block' }}>
            <div className="card">
              <div className="cardItems">
                <img src={eclipse} className="eclipse" />
                <p className="cardText">Stay on top of compliance</p>
                <p className="cardText2">Are you ready to run your business more efficiently?<br />
                  There are many reasons to invest in a dedicated<br />
                  accounting system.</p>
              </div>
            </div>
            <img src={womanimg} className="womanimg" />
          </div>

          <div>
            <div style={{ display: 'block' }}>

              <div className="card1">
                <div className="cardItems">
                  <img src={eclipse} className="eclipse" />
                  <p className="cardText">Stay on top of compliance</p>
                  <p className="cardText2">Are you ready to run your business more efficiently?<br />
                    There are many reasons to invest in a dedicated<br />
                    accounting system.</p>
                </div>
              </div>

              <div className="card2">
                <div className="cardItems">
                  <img src={eclipse} className="eclipse" />
                  <p className="cardText">Stay on top of compliance</p>
                  <p className="cardText2">Are you ready to run your business more efficiently?<br />
                    There are many reasons to invest in a dedicated<br />
                    accounting system.</p>
                </div>
              </div>

              <div className="card3">
                <div className="cardItems">
                  <img src={eclipse} className="eclipse" />
                  <p className="cardText">Stay on top of compliance</p>
                  <p className="cardText2">Are you ready to run your business more efficiently?<br />
                    There are many reasons to invest in a dedicated<br />
                    accounting system.</p>
                </div>
              </div>

            </div>

          </div>

          <div>
            <div style={{ display: 'block' }}>

              <div className="card4">
                <div className="cardItems">
                  <img src={eclipse} className="eclipse" />
                  <p className="cardText">Stay on top of compliance</p>
                  <p className="cardText2">Are you ready to run your business more efficiently?<br />
                    There are many reasons to invest in a dedicated<br />
                    accounting system.</p>
                </div>
              </div>

              <div className="card5">
                <div className="cardItems">
                  <img src={eclipse} className="eclipse" />
                  <p className="cardText">Stay on top of compliance</p>
                  <p className="cardText2">Are you ready to run your business more efficiently?<br />
                    There are many reasons to invest in a dedicated<br />
                    accounting system.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div>
        <p className="why2">
          Discover the benefits of our<br />
          <span style={{ marginLeft: '62px' }} />
          accounting solution
        </p>
      </div>
      <div className="container4">
        <div style={{ display: 'flex' }}>

          <div className="efficientCard">
            <p className="efficientxt">Efficient</p>
            <p className="uder">Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

          <div className="efficientCardGreen">
            <p className="efficientxt">Efficient</p>
            <p className="uder" style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

          <div className="efficientCard">
            <p className="efficientxt">Efficient</p>
            <p className="uder">Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

        </div>

        <div style={{ display: 'flex' }}>

          <div className="efficientCardGreen">
            <p className="efficientxt">Efficient</p>
            <p className="uder" style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

          <div className="efficientCard">
            <p className="efficientxt">Efficient</p>
            <p className="uder">Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

          <div className="efficientCardGreen">
            <p className="efficientxt">Efficient</p>
            <p className="uder" style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
              business life easier by minimising admin time.</p>
          </div>

        </div>

      </div>
      <div style={{ display: 'flex' }}>
        <div className="howItWorks">
          <p className="howItWorksTxt">How it works</p>
          <p className="underhowItWorksTxt">Automate your accounting management system today.<br />
            Our software solutions will help streamline accounting<br />management</p>

          <div className="options">
            <div className="optsdeg">
              <div className="number">1</div>
              <p className="si">Sign up</p>
              <p className="underSi">Choose the favorite pricing and<br />
                sign up</p>
            </div>

            <div className="optsdeg2">
              <div className="number">2</div>
              <p className="si2">Pricing</p>
              <p className="underSi2">Choose the favorite pricing and sign up</p>
            </div>

          </div>

          <div className="options">

            <div className="optsdeg3">
              <div className="number">3</div>
              <p className="si2">Link Accounts</p>
              <p className="underSi2">Choose the favorite pricing and<br />sign up
                sign up</p>
            </div>

            <div className="optsdeg23">
              <div className="number">4</div>
              <p className="si2">Add Employee's<br />
                Info</p>
              <p className="underSi2">Choose the favorite pricing and<br />
                sign up</p>
            </div>

          </div>

          <div className="options">

            <div className="optsdeg3">
              <div className="number">5</div>
              <p className="si2">Sign up</p>
              <p className="underSi2">Choose the favorite pricing and<br />
                sign up</p>
            </div>

            <div className="optsdeg23">
              <div className="number">6</div>
              <p className="si2">Sign up</p>
              <p className="underSi2">Choose the favorite pricing and<br />
                sign up</p>
            </div>

          </div>

        </div>
        <div>
          <img src={phone} className="phone" />
        </div>
      </div>

      <div className="pricingContainer">
        <p className="pricingTxt">Pricing</p>
        <p className="under_pricingTxt">Choose the pricing that works for you and align to  your business</p>
        <div className="pricingOpts">
          
          <div className="pricingDesg">
            <p>Free Plan</p>
            <p>N0.00<span>/30 days</span></p>
            <p>Use only for Personal use</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;