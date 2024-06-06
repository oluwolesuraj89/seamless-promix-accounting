import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import CreateSavings from './Pages/Manage Cooperatives/Manage Savings Account/CreateSavings.js';
import LoanAccounts from './Pages/Manage Cooperatives/Manage Loan/LoanAccount.js';
import CreateLoan from './Pages/Manage Cooperatives/Manage Loan/CreateLoan.js';
import EditLoan from './Pages/Manage Cooperatives/Manage Loan/EditLoan.js';
import Deduction from './Pages/Manage Cooperatives/Manage Deductions/Deduction.js';
import TrialBalance from './Pages/Trial balance/Trial_balance.js';
import IncomeExpenditure from './Pages/Income and Expenditure/Income_Expenditure.js';
import MonthlyIncome from './Pages/Monthly Income/MonthlyIncome.js';
import BalanceSheet from './Pages/Balance Sheet/BalanceSheet.js';
import EmployeeMembers from './Pages/Receiveables/Manage Members/Members.js';
import EditEmployeeMember from './Pages/Receiveables/Manage Members/EditMember.js';
import BalanceSheetPrint from './Pages/Balance Sheet Print/BalanceSheetPrint.js';
import LoanRepayment from './Pages/Manage Cooperatives/Loan Repayment/LoanRepayment.js';
import ProcessGeneral from './Pages/Process-General-ledger/ProcessGeneral.js';
import ProcessCashBook from './Pages/Process-CashBook/ProcessCashBook.js';
import ProcessActivityReport from './Pages/Process-Activity-Report/ProcessActivityReport.js';
import IncomeProcess from './Pages/Income & expend/IncomeProcess.js';
import MonthlyIncomeProcess from './Pages/Monthly Income & Expend/MonthlyIncomeProcess.js';
import SalesInvoice from './Pages/Receiveables/Sales Invoice/SalesInvoice.js';
import CreateSales from './Pages/Receiveables/Sales Invoice/CreateSales.js';
import EditInvoice from './Pages/Receiveables/Sales Invoice/EditInvoice.js';
import Invoice from './Pages/Receiveables/Sales Invoice/Invoice.js';
import ManageBooking from './Pages/Receiveables/Advance Booking/ManagingBooking.js';
import CreateBooking from './Pages/Receiveables/Advance Booking/CreateBooking.js';
import EditBooking from './Pages/Receiveables/Advance Booking/EditBooking.js';
import BookingReceipt from './Pages/Receiveables/Advance Booking/BookingReceipt.js';
import LoanRepaymentExcel from './Pages/Manage Cooperatives/Loan Repayment Excel/LoanRepaymentExcel.js';
import ManageSavings from './Pages/Manage Cooperatives/Manage Savings/ManageSavings.js';
import CreateSavingsApp from './Pages/Manage Cooperatives/Manage Savings/CreateSavingsApp.js';
import SavingExcel from './Pages/Manage Cooperatives/Manage Savings/SavingExcel.js';
import Supplier from './Pages/Manage Payables/Manage Suppliers/Supplier.js';
import SavingsRepayment from './Pages/Receiveables/Advance Booking Pyaments/AdvanceBooking.js';
import AdvanceBooking from './Pages/Receiveables/Advance Booking Pyaments/AdvanceBooking.js';
import EditSuppliers from './Pages/Manage Payables/Manage Suppliers/EditSuppliers.js';
import PaymentVoucher from './Pages/Manage Payables/Manage Payment Voucher/PaymentVoucher.js';


function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
    
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/coop_dashboard' element={<Dashboard />} />
        <Route path='/coop/manage_roles' element={<ManageRoles/>} />
    <Route path='/coop/loan_account' element={<LoanAccounts/>} />
        <Route path='/coop/approval_level' element={<ApprovalLevel/>} />
        <Route path='/coop/manage_user' element={<ManageUser />} />
        <Route path='/coop/members' element={<Members/>} />
        <Route path='/coop/manage_savings' element={<ManageSavings/>} />
        <Route path='/coop/savings_account' element={<SavingsAccounts/>} />
        <Route path='/general_payment_voucher' element={<GeneralPaymentVoucher/>} />
        <Route path='/payment_voucher_form' element={<PaymentVoucherForm/>} />
        <Route path='/general_ledger' element={<GeneralLedger/>} />
        <Route path='/general_ledger_table' element={<GeneralLedgerTable/>} />
        <Route path='/creat_payment_voucher' element={<CreatePaymentVoucher/>} />
        <Route path='/sales_receipt' element={<SalesReceipt/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/create_role' element={<CreateRole/>} />
        <Route path='/edit_role' element={<EditRole/>} />
        <Route path='/employee' element={<EmployeeMembers/>} />
        <Route path='/edit_employee' element={<EditEmployeeMember/>} />
        <Route path='/edit_member' element={<EditMember/>} />
        <Route path='/edit_savings' element={<EditSavings/>} />
        <Route path='/create_savings' element={<CreateSavings/>} />
        <Route path='/cashbook' element={<Cashbook/>} />
        <Route path='/manage_category' element={<ManageCategory />} />
        <Route path='/charts_of_account' element={<Charts />} />
        <Route path='/create_approval_level' element={<CreateApproval/>} />
        <Route path='/create_approval_level' element={<CreateApproval/>} />
        <Route path='/Create_loan' element={<CreateLoan/>} />
        <Route path='/edit_loan' element={<EditLoan/>} />
        <Route path='/deductions' element={<Deduction/>} />
        <Route path='/trial_balance' element={<TrialBalance/>} />
        <Route path='/income_expenditure' element={<IncomeExpenditure/>} />
        <Route path='/monthly_income' element={<MonthlyIncome/>} />
        <Route path='/balance_sheet' element={<BalanceSheet/>} />
        <Route path='/balance_sheet_print'element={<BalanceSheetPrint/>}/>
        <Route path='/process_general'element={<ProcessGeneral/>}/>
        <Route path='/loan_repayment' element={<LoanRepayment/>} />
        <Route path='/process_cash_book'element={<ProcessCashBook/>}/>
        <Route path='/process_ctivity_report'element={<ProcessActivityReport/>}/>
        <Route path='/income_print'element={<IncomeProcess/>}/>
        <Route path='/monthly_income_process'element={<MonthlyIncomeProcess/>}/>




        <Route path='/sales_invoice' element={<SalesInvoice/>} />
        <Route path='/manage_booking' element={<ManageBooking/>} />
        <Route path='/create_booking' element={<CreateBooking />} />
        <Route path='/edit_booking' element={<EditBooking />} />
        <Route path='/booking_receipt' element={<BookingReceipt />} />
        <Route path='/create_sales' element={<CreateSales />} />
        <Route path='/edit_sales' element={<EditInvoice />} />
        <Route path='/official_invoice' element={<Invoice />} />
        <Route path='/loan_repayment_excel' element={<LoanRepaymentExcel/>} />
        <Route path='/create_savings_app' element={<CreateSavingsApp/>} />
        <Route path='/saving_excel' element={<SavingExcel/>} />
        <Route path='/suppliers' element={<Supplier/>} />
        <Route path='/advance_booking_payment' element={<AdvanceBooking />} />
        <Route path='/edit_supplier' element={<EditSuppliers/>} />
        <Route path='/payment_voucher' element={<PaymentVoucher/>} />
        <Route path='/create_payment_voucher' element={<CreatePaymentVoucher/>} />
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
