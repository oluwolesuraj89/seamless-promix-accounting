import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Pages/Dashboard.js';
// import PromixLanding from './Pages/promixLanding.js';
import LandingPage from './Pages/LandingPage.js';
import Dashoard from './Pages/Dashboard/Dashboard.js';
import MainDashoard from './Pages/Main Dashboard/MainDashoard.js';
import GeneralPaymentVoucher from './Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.js';
import PaymentVoucherForm from './Pages/PaymentVouchers/PaymentVoucherForm/PaymentVoucherForm.js';
import GeneralLedger from './Pages/General Ledger/GeneralLedger.js';
import SignUp from './Promix/Signup/Signup.js';
import GeneralLedgerTable from './Pages/General Ledger Table/GeneralLedgerTable.js';
import CreatePaymentVoucher from './Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.js';
import SalesReceipt from './Pages/Sales Receipt/SalesReceipt.js';

import Login from './Promix/Login/Login.js';

function App() {
  return (
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashoard/>} />
        <Route path='/main_dashboard' element={<MainDashoard />} />
        <Route path='/general_payment_voucher' element={<GeneralPaymentVoucher/>} />
        <Route path='/payment_voucher_form' element={<PaymentVoucherForm/>} />
        <Route path='/general_ledger' element={<GeneralLedger/>} />
        <Route path='/general_ledger_table' element={<GeneralLedgerTable/>} />
        <Route path='/creat_payment_voucher' element={<CreatePaymentVoucher/>} />
        <Route path='/sales_receipt' element={<SalesReceipt/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
  );
}

export default App;
