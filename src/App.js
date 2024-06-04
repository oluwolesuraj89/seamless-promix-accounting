import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Pages/Dashboard.js';
// import PromixLanding from './Pages/promixLanding.js';
import LandingPage from './Pages/LandingPage.js';
import GeneralPaymentVoucher from './Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.js';
import PaymentVoucherForm from './Pages/PaymentVouchers/PaymentVoucherForm/PaymentVoucherForm.js';
import GeneralLedger from './Pages/General Ledger/GeneralLedger.js';
import SignUp from './Promix/Signup/Signup.js';
import GeneralLedgerTable from './Pages/General Ledger Table/GeneralLedgerTable.js';
import CreatePaymentVoucher from './Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.js';
import SalesReceipt from './Pages/Sales Receipt/SalesReceipt.js';

import Login from './Promix/Login/Login.js';
import MainDashboard from './Pages/Main Dashboard/MainDashoard.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
import ManageRole from './Pages/Manae Role/ManageRole.js';
import ApprovalLevel from './Pages/Manae Approval Level/ApprovalLevel.js';
import Members from './Pages/Manage Cooperatives/Manage Members/Members.js';
import ManageRoles from './Pages/Manae Role/ManageRole.js';
import CreateRole from './Pages/Manae Role/CreateRole.js';
import { ToastContainer } from 'react-toastify';
import EditMember from './Pages/Manage Cooperatives/Manage Members/EditMember.js';
import SavingsAccounts from './Pages/Manage Cooperatives/Manage Savings Account/SavingAccount.js';
import EditSavings from './Pages/Manage Cooperatives/Manage Savings Account/EditSavings.js';
import Cashbook from './Pages/Cashbook/Cashbook.js';
import EditRole from './Pages/Manae Role/EditRole.js';
import CreateApproval from './Pages/Manae Approval Level/CreateApproval.js';
import ManageUser from './Pages/Manage User/ManageUser.js';
import ManageCategory from './Pages/Manage Category/ManageCategory.js';
import Charts from './Pages/Charts of Account/Charts.js';
import TrialBalance from './Pages/Trial balance/Trial_balance.js';
import IncomeExpenditure from './Pages/Income and Expenditure/Income_Expenditure.js';
import MonthlyIncome from './Pages/Monthly Income/MonthlyIncome.js';
import EmployeeMembers from './Pages/Receiveables/Manage Members/Members.js';
import EditEmployeeMember from './Pages/Receiveables/Manage Members/EditMember.js';
import SalesInvoice from './Pages/Receiveables/Sales Invoice/SalesInvoice.js';
import CreateSales from './Pages/Receiveables/Sales Invoice/CreateSales.js';


function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/main_dashboard' element={<Dashboard />} />
        <Route path='/general_payment_voucher' element={<GeneralPaymentVoucher/>} />
        <Route path='/payment_voucher_form' element={<PaymentVoucherForm/>} />
        <Route path='/general_ledger' element={<GeneralLedger/>} />
        <Route path='/general_ledger_table' element={<GeneralLedgerTable/>} />
        <Route path='/creat_payment_voucher' element={<CreatePaymentVoucher/>} />
        <Route path='/sales_receipt' element={<SalesReceipt/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/manage_roles' element={<ManageRoles/>} />
        <Route path='/create_role' element={<CreateRole/>} />
        <Route path='/edit_role' element={<EditRole/>} />
        <Route path='/approval_level' element={<ApprovalLevel/>} />
        <Route path='/members' element={<Members/>} />
        <Route path='/employee' element={<EmployeeMembers/>} />
        <Route path='/edit_employee' element={<EditEmployeeMember/>} />
        <Route path='/edit_member' element={<EditMember/>} />
        <Route path='/savings_account' element={<SavingsAccounts/>} />
        <Route path='/edit_savings' element={<EditSavings/>} />
        <Route path='/cashbook' element={<Cashbook/>} />
        <Route path='/manage_user' element={<ManageUser />} />
        <Route path='/manage_category' element={<ManageCategory />} />
        <Route path='/charts_of_account' element={<Charts />} />
        <Route path='/create_approval_level' element={<CreateApproval/>} />
        <Route path='/trial_balance' element={<TrialBalance/>} />
        <Route path='/income_expenditure' element={<IncomeExpenditure/>} />
        <Route path='/monthly_income' element={<MonthlyIncome/>} />
        <Route path='/sales_invoice' element={<SalesInvoice/>} />
        <Route path='/create_sales' element={<CreateSales />} />
      </Routes>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
}

export default App;
