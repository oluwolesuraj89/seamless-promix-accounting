import React from "react";
import './promix.css';
import logo from "../assets/promix/logo-green 1.png";
import bell from '../assets/promix/bell.png';
import up from '../assets/promix/Vector.png';
import image1 from '../assets/promix/image1.png';
import image2 from '../assets/promix/image2.png';
import image3 from '../assets/promix/image3.png';
import image4 from '../assets/promix/image4.png';
import image5 from '../assets/promix/image5.png';
import image6 from '../assets/promix/image6.png';
import image7 from '../assets/promix/image7.png';
import image8 from '../assets/promix/image8.png';
import pie from '../assets/promix/pie.png';
import recieve from '../assets/promix/recieve.png';
import wallet from '../assets/promix/wallet.png';
import inventory from '../assets/promix/inventory.png';
import transactions from '../assets/promix/transactions.png';
import profile from '../assets/promix/profile.png';
import exit from '../assets/promix/export.png';

function App() {

  return (
    <div>
      <div style={{ display: 'flex' }}>

        <div className="promix_nav">
          <img src={logo} className="logo" />
          <div className="divine" />
          <div className="NavTxt">

            <div className="des_dashboard">
              <img src={pie} className="pie" />
              <p className="Dashboard_header_text">Dashboard</p>
            </div>

            <div className="idk">
              <img src={recieve} className="icon" />
              <p>Receivables</p>
            </div>

            <div className="idk">
              <img src={wallet} className="icon" />
              <p>Payables</p>
            </div>

            <div className="underPayables">
              <p>General Payment Voucher</p>
              <p>Pending Payment Voucher</p>
              <p>Completed Payment Voucher</p>
              <p>Bulk Payment Excel</p>
              <p>Bulk Payment</p>
              <p>Schedule of Payables</p>
              <p>Savings</p>
            </div>

            <div className="idk">
              <img src={inventory} className="icon" />
              <p>Inventory</p>
            </div>

            <div className="idk">
              <img src={transactions} className="icon" />
              <p>Transactions</p>
            </div>

            <div className="idk">
              <img src={inventory} className="icon" />
              <p>Report</p>
            </div>

            <div className="idk">
              <img src={profile} className="icon" />
              <p>Profile</p>
            </div>

            <div className="logout">
              <img src={exit} className="exit"/>
Logout
            </div>

          </div>
        </div>

        <div className="header_promix">
          <div className="bell_search">
            <p className="DashboardTxt">Dashboard</p>
            <input
              type="text"
              className="search"
              placeholder="search"
            />
            <img src={bell} className="bell" />
          </div>

          <div className="top_values">
            <div className="item1">
              <p className="totalTxt">TOTAL INCOME</p>
              <p className="pricy">N524,068,010.95</p>
              <div className="txtImg">
                <img src={up} className="up" />
                <p>7% vs average </p>
              </div>
            </div>

            <div className="item1">
              <p className="totalTxt">TOTAL INCOME</p>
              <p className="pricy">N524,068,010.95</p>
              <div className="txtImg">
                <img src={up} className="up" />
                <p>5%<span style={{ marginLeft: '15px' }} />vs average </p>
              </div>
            </div>

            <div className="item1">
              <p className="totalTxt">TOTAL INCOME</p>
              <p className="pricy">N524,068,010.95</p>
              <div className="txtImg">
                <img src={up} className="up" />
                <p>5%<span style={{ marginLeft: '15px' }} />vs average </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', marginTop:'10px'}}>
            <img src={image7} className="images7" />
            <img src={image8} className="images8" />
          </div>

          <div style={{ display: 'flex', marginTop:'-20px'}}>
            <img src={image1} className="images" />
            <img src={image2} className="images" />
            <img src={image3} className="images" />
          </div>

          <div style={{ display: 'flex', marginTop: '-40px' }}>
            <img src={image4} className="images" />
            <img src={image5} className="images" />
            <img src={image6} className="images" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;