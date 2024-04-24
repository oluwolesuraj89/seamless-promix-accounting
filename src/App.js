import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Pages/Dashboard.js';
// import PromixLanding from './Pages/promixLanding.js';
import LandingPage from './Pages/LandingPage.js';
import Dashoard from './Pages/Dashboard/Dashboard.js';
import MainDashoard from './Pages/Main Dashboard/MainDashoard.js';
import GeneralPaymentVoucher from './Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.js';


function App() {
  return (
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashoard/>} />
        <Route path='/main_dashboard' element={<MainDashoard />} />
        <Route path='/general_payment_voucher' element={<GeneralPaymentVoucher/>} />
      </Routes>
  );
}

export default App;
