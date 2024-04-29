import React, { useState, useEffect } from "react";
import classes from '../Pages/LandingPage.module.css'
import automate from '../assets/promix/automateImg.svg'
import eclipse from '../assets/promix/Ellipse 29.png';
import eclipse2 from '../assets/promix/Ellipse2.svg';
import eclipse3 from '../assets/promix/Ellipse3.svg';
import eclipse4 from '../assets/promix/Ellipse4.svg';
import eclipse5 from '../assets/promix/Ellipse5.svg';
import eclipse6 from '../assets/promix/Ellipse6.svg';
import Accordion from 'react-bootstrap/Accordion';
import footerSend from '../assets/promix/footer-send.svg'
import { useNavigate } from 'react-router-dom';
import womanimg from '../assets/promix/womanimg.png';
import phone from '../assets/promix/phone.png';
import HeaderNav from "./HeaderNav/HeaderNav";
import axios from "axios";
import tick from '../assets/promix/tick-circle.png';
import tick2 from '../assets/promix/pick2.png';
import arrow from '../assets/promix/arrow.png';
import frame1 from '../assets/promix/Frame 91.png'
import { Button, Spinner } from "react-bootstrap";
import { BASE_URL } from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// function App() {
function LandingPage() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const responses = await axios.get(
        `${BASE_URL}/get-all-plans`
      );
      const planss = responses.data?.data;
      setPlans(planss);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
       
        console.log(error.request);
      } else {
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



  const handleSignup = (selectedPlan) => {
    if (selectedPlan.no_of_users === "") {
      toast.success('Please contact us on +2348060202011 for further registration guidelines.');
    } else {
      navigate(`/signup`, { state: { selectedPlan } });
    }
  };

  

  return (
    <div>

      <HeaderNav />

      <div className={classes.wrapper}>
        <ToastContainer />
        <div className={classes.hero}>
          <div className={classes.heroCont}>
            <p>Automate your accounting management system today. Oursoftware solutions will help streamline account management</p>
            <div className={classes.heroBtns}>
              <button className={`${classes.heroGreenBtn} ${classes.greenBtn}`}> Get started </button>
              <button className={classes.btnss}> See How it Works </button>
            </div>
            <div className={classes.heroAmounts}>
              <div>
                <h1>10k</h1>
                <p>Businesses</p>
              </div>
              <div>
                <h1>100k</h1>
                <p>Customers</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.automateCont}>
            {/* <div style={{ paddingLeft: '83px', marginRight: '83px' }}> */}
            <div className={classes.cont}>
              <h1 className={classes.firstText}>
                Automate Your Accounting System And Reap the Rewards
              </h1>
              <p className={classes.secoundText}>
                Whether you are a small business, a non profit or a more medium size<br />
                enterprise, we'll help you find the perfect accounting solution. Run<br />
                multiple companies? We can help with that too by centralizing<br />
                accounting for all your businesses
                <br /><br />
                Our accounting software is designed to make your business life easier.<br />
                It automates processes like pay-slips and tax calculations, so you don't<br />
                have to worry about pay-slip errors ever again. Pay your employees the<br />
                right amount on time, every time with an efficient, intuitive accounting<br />
                solution.
              </p>
              <button className={`${classes.tryItBtn} ${classes.greenBtn}`}> Try it Now </button>

            </div>

            {/* </div> */}
            <div className={classes.automateImg}>
              <img src={automate} alt="img" className={classes.imgs} />
              {/* <img src={frame} className={classes.frame}/> */}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.section3}>
            <div className={classes.section3Cont}>
              <h3 className={classes.why}>
                Why smart accounting software makes good business sense
              </h3>
              <p className={classes.p}>
                Whether you are a small business, a non profit or a more medium size business, we'll help you find the perfect accounting solution.
                Run multiple companies? We can help with that too by centralizing accounting for all your businesses.
              </p>
            </div>

            <div className={classes.cardSection}>
              <div className={classes.col1}>
                <div className={`${classes.cards} ${classes.card1}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
                <img src={womanimg} className={classes.womanimg} />
              </div>
              <div className={classes.col2}>
                <div className={`${classes.cards} ${classes.card2}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse2} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
                <div className={`${classes.cards} ${classes.card3}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse3} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
                <div className={`${classes.cards} ${classes.card4}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse4} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
              </div>
              <div className={classes.col3}>
                <div className={`${classes.cards} ${classes.card5}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse5} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
                <div className={`${classes.cards} ${classes.card6}`}>
                  <div className={classes.cardItems}>
                    <img src={eclipse6} className={classes.eclipse} />
                    <h5 className={classes.cardText}>Stay on top of compliance</h5>
                    <p className={classes.cardText2}>Are you ready to run your business more efficiently?<br />
                      There are many reasons to invest in a dedicated<br />
                      accounting system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={classes.wrapper}>
        {/* <div className={classes.container}> */}
        <div className={classes.section4}>
          <h4 className={classes.h4}>
            Discover the benefits of our accounting solution
          </h4>
          <div className={classes.container4}>
            <div style={{ display: 'flex' }}>

              <div className={classes.efficientCard}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

              <div className={classes.efficientCardGreen}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder} style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

              <div className={classes.efficientCard}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex' }}>

              <div className={classes.efficientCardGreen}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder} style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

              <div className={classes.efficientCard}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

              <div className={classes.efficientCardGreen}>
                <div className={classes.effiCont}>
                  <h4 className={classes.efficientxt}>Efficient</h4>
                  <p className={classes.uder} style={{ color: '#fff' }}>Our accounting software is designed to make your<br />
                    business life easier by minimising admin time.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
        {/* </div> */}
      </div>


      <div className={classes.wrapper}>
        <div className={classes.container}>

          {/* <div style={{ display: 'flex' }}> */}
          <div className={classes.howItWorks}>
            <div>
              <div className={classes.howItWorksCont}>
                <h1 className={classes.howItWorksTxt}>How it works</h1>
                <p className={classes.underhowItWorksTxt}>
                  Automate your accounting management system today.
                  Our software solutions will help streamline accounting management
                </p>
              </div>

              <div className={classes.options}>
                <div className={classes.optsdeg}>
                  <div className={classes.number}>1</div>
                  <p className={classes.si}>Sign up</p>
                  <p className={classes.underSi}>Choose the favorite pricing and<br />
                    sign up</p>
                </div>

                <div className={classes.optsdeg2}>
                  <div className={classes.number}>2</div>
                  <p className={classes.si2}>Pricing</p>
                  <p className={classes.underSi2}>Choose the favorite pricing and sign up</p>
                </div>

              </div>

              <div className={classes.options}>

                <div className={classes.optsdeg3}>
                  <div className={classes.number}>3</div>
                  <p className={classes.si2}>Link Accounts</p>
                  <p className={classes.underSi2}>Choose the favorite pricing and<br />sign up
                    sign up</p>
                </div>

                <div className={classes.optsdeg23}>
                  <div className={classes.number}>4</div>
                  <p className={classes.si2}>Add Employee's<br />
                    Info</p>
                  <p className={classes.underSi2}>Choose the favorite pricing and<br />
                    sign up</p>
                </div>

              </div>

              <div className={classes.options}>

                <div className={classes.optsdeg3}>
                  <div className={classes.number}>5</div>
                  <p className={classes.si2}>Sign up</p>
                  <p className={classes.underSi2}>Choose the favorite pricing and<br />
                    sign up</p>
                </div>

                <div className={classes.optsdeg23}>
                  <div className={classes.number}>6</div>
                  <p className={classes.si2}>Sign up</p>
                  <p className={classes.underSi2}>Choose the favorite pricing and<br />
                    sign up</p>
                </div>

              </div>
            </div>
            <div className={classes.mobile}>
              <img src={phone} className={classes.imgs} />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className={`${classes.wrapper} ${classes.bgColor}`}>
        <div className={classes.container}>
          <div className={classes.pricingSection}>
            <div className={classes.pricingSectionCont}>
              <h3 className={classes.pricingTxt}>Pricing</h3>
              <p className={classes.under_pricingTxt}>Choose the pricing that works for you and align to your business</p>
            </div>
            <div className={classes.pricingOpts}>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Spinner size='lg' style={{ marginTop: '50px' }} />
                  <span style={{ marginTop: '10px' }}>Loading plans, Please wait...</span>
                </div>
              ) : (
                <div className={classes.containerForPricing}>
  {plans.map((item, index) => (
    <div className={classes.pricingDesg} key={index} style={{ backgroundColor: item.name === 'Basic Plan' ? '#2D995F' : '#fff' }}>
      <div className={classes.pricingPad} >
        <h4 className={classes.freePlan} style={{ color: item.name === 'Basic Plan' ? '#fff' : '#343A40' }}>
          {item.name}
        </h4>
        <p className={classes.amount} style={{ color: item.name === 'Basic Plan' ? '#fff' : '#6C757D' }}>
          {item.no_of_users === ""
            ? "Contact us"
            : item.yearly === "0.00"
              ? `₦0.00`
              : `₦${parseFloat(item.yearly).toLocaleString("en-US", {
                  minimumIntegerDigits: 1,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          {item.no_of_users !== "" && (
            <span className={classes.amountSpan}>
              {item.yearly === "0.00" ? "/30 days" : "/year"}
            </span>
          )}
        </p>
        <p className={classes.useFor} style={{ color: item.name === 'Basic Plan' ? '#fff' : '#6C757D' }}>{item.use}</p>
        <div className={classes.lists} >
          {item.priviledges.map((privilege, index) => (
            <div key={index} className={classes.subLists}>
              <img src={item.name === "Basic Plan" ? tick2 : tick} className={classes.tick} />
              <p style={{ color: item.name === 'Basic Plan' ? '#fff' : '#6C757D' }}>{privilege}</p>
            </div>
          ))}
        </div>
        <Button
        onClick={() => handleSignup(item)}
          className={classes.pricingBtns}
          style={{
            backgroundColor: item.name === 'Basic Plan' ? 'white' : '#2D995F',
            color: item.name === 'Basic Plan' ? '#2D995F' : 'white',
          }}
        >
         {item.name === "Free" ? "Try for Free" : item.name === "Basic Plan" || item.name === "Standard Plan" ? "Purchase Plan" : "Contact Us"}

        </Button>
      </div>
    </div>
  ))}
</div>

              )}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={`${classes.container} ${classes.faqcont}`}>
          <div className={classes.faqsHead}>
            <h1 className={classes.faqsHeader}>FAQs</h1>
            <p className={classes.happeningText}>See answers to some frequently asked questions here</p>
          </div>
          <div className={classes.accordionContainer}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header >Is there a free trial available?</Accordion.Header>
                <Accordion.Body >
                  In order to ameliorate the challenges currently facing
                  entrepreneurs across the country, in particular the high cost
                  of business operations, the Ogun State Government under
                  the leadership of Prince(Dr.) Dapo Abiodun CON has
                  approved N2 Billion financial empowerment scheme for
                  small and medium businesses operating in the State.
                  This financial intervention for SMEs will be through Grants and
                  Loans for operational expenses and working capital
                  requirments to ease the burden, sustain the business and
                  ultimately boost profitability.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={classes.accordionSpace} eventKey="1">
                <Accordion.Header>Can I change my plan later?</Accordion.Header>
                <Accordion.Body>
                  Yes, you can change your plan at anytime
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={classes.accordionSpace} eventKey="2">
                <Accordion.Header>What is your Cancellation Policy?</Accordion.Header>
                <Accordion.Body className={classes.accordCont}>
                  DOCUMENTATION
                  Applicant must provide:<br />
                  • State business premises permit/LG trade
                  permit;<br />
                  • Bank statement for 12months;<br />
                  • Bank verification number (BVN);<br />
                  • Bank account<br />
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </div>
        </div>
      </div>

      <div className={classes.footerHero}>
        <p className={classes.footerHeroText}>Discover the benefits of our<br />accounting solutions</p>
        <button className={classes.btns}>
          Sign Up now
        </button>
      </div>
      <div className={classes.wrapper}>
        <div className={`${classes.container} ${classes.mainFooter}`}>
          {/* <div className={classes.finalDiv}> */}
          <div>
            <p className={classes.copy}>Copyright © 2023 Promix<br />All rights reserved</p>
          </div>

          <div className={classes.footerConts}>
            <h5 className={classes.name}>Product</h5>
            <ul>
              <li>Individual</li>
              <li>Business</li>
              <li>Request Demo</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div className={classes.footerConts}>
            <h5 className={classes.name}>Legal</h5>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className={classes.footerConts}>
            <h5 className={classes.name}>Resources</h5>
            <ul>
              <li>FAQs</li>
              <li>Blog</li>
              <li>Career</li>
              <li>Customer Stories</li>
            </ul>
          </div>

          <div className={classes.footerConts}>
            <h5 className={classes.name}>Contact Us</h5>
            <ul>
              <li>info@brookessoftware.com</li>
              <li>+234 816 124 1827 , +234 806 020 2011</li>
              <div className={classes.footerInput}>
                <input
                  className={classes.contact}
                  placeholder="Your email address"
                  Type="email"
                />
                <img src={footerSend} alt="send" />
              </div>
            </ul>
          </div>

          {/* </div> */}
        </div>
      </div>

    </div>
  );
}

export default LandingPage;