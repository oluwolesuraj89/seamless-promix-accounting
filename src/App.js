import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Dashboard from './Pages/Dashboard.js';
// import PromixLanding from './Pages/promixLanding.js';
import LandingPage from './Pages/LandingPage.js';
import GeneralPaymentVoucher from './Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.js';
import PaymentVoucherForm from './Pages/PaymentVouchers/PaymentVoucherForm/PaymentVoucherForm.js';
// import GeneralLedger from './Pages/General Ledger/GeneralLedger.js';
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
import ManageLoans from './Pages/Manage Cooperatives/Manage Loan/ManageLoans.js';
import DisburseLoan from './Pages/Manage Cooperatives/Manage Loan/DisburseLoan.js';
import EditDisburseLoan from './Pages/Manage Cooperatives/Manage Loan/EditDisburse.js';
import SavingsWithdrawals from './Pages/Manage Cooperatives/Manage Savings/SavingsWithdrawals/SavingsWithdrawals.js';
import SavingsDeduction from './Pages/Manage Cooperatives/Manage Savings/SavingsDeduction.js';
import LoanDeduction from './Pages/Manage Cooperatives/Manage Savings/LoanDeduction.js';
import SavingsLedger from './Pages/Manage Cooperatives/Manage Savings Account/SavingsLedger.js';
import LoanLedger from './Pages/Manage Cooperatives/Manage Loan/LoanLedger.js';
import ReportLedger from './Pages/Manage Cooperatives/Manage Loan/Report/Report.js';
import Welcome from './Pages/Welcome.js';
import Forbidden from './Pages/Forbidden.js';
import ViewPaymentVoucher from './Pages/Manage Payables/Manage Payment Voucher/ViewPendingPaymentVoucer.js';
import PrintVoucher from './Pages/Manage Payables/Manage Payment Voucher/PrintVoucher.js';
import AccountingDashboard from './Pages/Dashboard/AccountingDashboard.js';
import CompletedPaymentVoucher from './Pages/Manage Payables/Manage Payment Voucher/CompletedPaymentVoucher.js';
import ViewCompletedPaymentVoucher from './Pages/Manage Payables/Manage Payment Voucher/ViewCompletedPaymentVoucer.js';
import BulkPaymentExcel from './Pages/Manage Payables/Manage Payment Excel/BulkPaymentExcel.js';
import BulkEntries from './Pages/Manage Payables/Manage Payment Excel/BulkEntries.js';
import Schedule from './Pages/Manage Payables/Schedule of payment/Schedule.js';
import CreateSavingsWithdrawals from './Pages/Manage Cooperatives/Manage Savings/SavingsWithdrawals/CreateSavingsWithdrawals.js';
import CreateLoanRepayment from './Pages/Loan Payment/CreateLoanRepayment.js';
import LoanRepay from './Pages/Loan Payment/LoanRepay.js';
import SavingsPayment from './Pages/Savings Payment/SavingsPayment.js';
import CreateSavingsPayment from './Pages/Savings Payment/CreateSavingsPayment.js';
import Savings from './Pages/Manage Payables/Manage Savings/Savings.js';
import AddNewSavings from './Pages/Manage Payables/Manage Savings/AddNewSavings.js';
import ManageGeneralLedger from './Pages/Manage Payables/Manage General Ledger/ManageGeneralLedger.js';
import CreateJournal from './Pages/Manage Jurnal Entries/CreateJournal.js';
import AccountReceivables from './Pages/Manage Receivables/AccountReceivables.js';
import ManualEntries from './Pages/Manage Receivables/EditAccountReceivables.js';
import EditAccountReceivables from './Pages/Manage Receivables/EditAccountReceivables.js';
import LoanAdvances from './Pages/Manage Receivables/LoandAdvancese.js';
import CreateNewLoan from './Pages/Manage Receivables/CreateNewLoan.js';
import EditLaonAdvance from './Pages/Manage Receivables/EditLoanAdvance.js';
import MaterialCost from './Pages/Receiveables/Advance Booking/MaterialCost.js';
import StockDashboard from './Pages/Stock Dashboard/StockDashboard.js';
import StockDash from './Pages/Dashboard/StockDash.js';
import ManageUnit from './Pages/ManageUnit/ManageUnit.js';
import ManageStocks from './Pages/Manage Stocks/ManageStocks.js';
import Services from './Pages/Services/Services.js';
import CreateServices from './Pages/Services/CreateServices.js';
import ViewServices from './Pages/Services/ViewServices.js';
import ViewMaterial from './Pages/Services/ViewMaterial.js';
import ViewLabor from './Pages/Services/ViewLabor.js';
import Inflow from './Pages/Inflow/Inflow.js';
import Income from './Pages/Main Income and Expenditur/Income.js';
import CreateNewIncome from './Pages/Main Income and Expenditur/CreateNewIncome.js';
import Expenditures from './Pages/Main Income and Expenditur/Expenditures.js';
import CreateNewExpenditure from './Pages/Main Income and Expenditur/CreateNewExpenditure.js';


function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cooperative' element={<Dashboard />} />
        <Route path='/cooperative/manage_roles' element={<ManageRoles />} />
        <Route path='/cooperative/loan_account' element={<LoanAccounts />} />
        <Route path='/cooperative/loan_advances' element={<ManageLoans />} />
        <Route path='/cooperative/disburse_loan' element={<DisburseLoan />} />
        <Route path='/cooperative/savings_withdrawals' element={<SavingsWithdrawals />} />
        <Route path='/cooperative/create_savings_withdrawals' element={<CreateSavingsWithdrawals />} />
        <Route path='/cooperative/savings_individual_ledger' element={<SavingsLedger />} />
        <Route path='/cooperative/loan_individual_ledger' element={<LoanLedger />} />
        <Route path='/cooperative/report_ledger' element={<ReportLedger />} />
        <Route path='/cooperative/savings_deduction' element={<SavingsDeduction />} />
        <Route path='/cooperative/loan_deduction' element={<LoanDeduction />} />
        <Route path='/cooperative/update_disburse_loan' element={<EditDisburseLoan />} />
        <Route path='/cooperative/approval_level' element={<ApprovalLevel />} />
        <Route path='/cooperative/manage_user' element={<ManageUser />} />
        <Route path='/cooperative/manage_savings' element={<ManageSavings />} />
        <Route path='/cooperative/savings_account' element={<SavingsAccounts />} />
        <Route path='/cooperative/create_approval' element={<CreateApproval />} />
        <Route path='/cooperative/create_role' element={<CreateRole />} />
        <Route path='/cooperative/edit_role' element={<EditRole />} />
        <Route path='/cooperative/members' element={<EmployeeMembers />} />
        <Route path='/cooperative/edit_member' element={<EditEmployeeMember />} />
        <Route path='/cooperative/edit_savings' element={<EditSavings />} />
        <Route path='/cooperative/create_savings' element={<CreateSavings />} />
        <Route path='/cooperative/create_loan' element={<CreateLoan />} />
        <Route path='/cooperative/edit_loan' element={<EditLoan />} />
        <Route path='/cooperative/create_savings_application' element={<CreateSavingsApp />} />
        <Route path='/cooperative/loan_repayment' element={<LoanRepay />} />
        <Route path='/cooperative/savings_payment' element={<SavingsPayment />} />
        <Route path='/cooperative/create_loan_repayment' element={<CreateLoanRepayment />} />
        <Route path='/cooperative/create_savings_payment' element={<CreateSavingsPayment />} />
        <Route path='/forbidden' element={<Forbidden />} />

        <Route path='/accounting' element={<AccountingDashboard />} />
        <Route path='/accounting/chart_of_accounting/manage_category' element={<ManageCategory />} />
        <Route path='/accounting/charts_of_account/account' element={<Charts />} />
        <Route path='accounting/payables/suppliers' element={<Supplier/>} />
        <Route path='/accounting/payables/payment_voucher' element={<PaymentVoucher/>} />
        <Route path='/accounting/payables/completed_payment_voucher' element={<CompletedPaymentVoucher/>} />
        <Route path='/accounting/payables/payment_voucher/create_payment_voucher' element={<CreatePaymentVoucher/>} />
        <Route path='/accounting/payables/payment_voucher/view_pending_payment_voucher' element={<ViewPaymentVoucher/>} />
        <Route path='/accounting/payables/payment_voucher/view_completed_pending_payment_voucher' element={<ViewCompletedPaymentVoucher/>} />
        <Route path='/accounting/payables/suppliers/edit_supplier' element={<EditSuppliers/>} />
        <Route path='/accounting/payables/bulk_payment_excel' element={<BulkPaymentExcel/>} />
        <Route path='/accounting/payables/bulk_payment' element={<BulkEntries/>} />
        <Route path='/accounting/payables/schedule_of_payment' element={<Schedule/>} />
        <Route path='/accounting/payables/savings' element={<Savings/>} />
        <Route path='/accounting/payables/add_new_savings' element={<AddNewSavings/>} />
        <Route path='/accounting/general_ledger/postings' element={<ManageGeneralLedger/>} />
        <Route path='/accounting/general_ledger/create_journal_entries' element={<CreateJournal/>} />
        <Route path='/accounting/receivables/account_receivables' element={<AccountReceivables/>} />
        <Route path='/accounting/receivables/manual_entries' element={<ManualEntries/>} />
        <Route path='/accounting/receivables/edit_account_receivables' element={<EditAccountReceivables/>} />
        <Route path='/accounting/receivables/customers_advance_payment' element={<AdvanceBooking/>} />
        {/* <Route path='/accounting/receivables/create_new_payment' element={<CreateNew/>} /> */}
        <Route path='/accounting/receivables/loan_and_advances' element={<LoanAdvances/>} />
        <Route path='/accounting/receivables/loan_and_advances/create_loan' element={<CreateNewLoan/>} />
        <Route path='/accounting/receivables/loan_and_advances/edit_loan_advance' element={<EditLaonAdvance/>} />
        <Route path='/accounting/reports/cashbook' element={<Cashbook/>} />
        <Route path='/accounting/reports/cashbook/process_cash_book' element={<ProcessCashBook/>} />
        <Route path='/accounting/reports/trial_balance' element={<TrialBalance/>} />
        <Route path='/accounting/reports/trial_balance/process_activity_report' element={<ProcessActivityReport/>} />
        <Route path='/accounting/reports/income_expenditure' element={<IncomeExpenditure/>} />
        <Route path='/accounting/reports/income_expenditure/income_print' element={<IncomeProcess/>} />
        <Route path='/accounting/reports/monthly_income' element={<MonthlyIncome/>} />
        <Route path='/accounting/reports/monthly_income/monthly_income_process' element={<MonthlyIncomeProcess/>} />
        <Route path='/accounting/reports/balance_sheet' element={<BalanceSheet/>} />
        <Route path='/accounting/reports/balance_sheet/balance_sheet_print' element={<BalanceSheetPrint/>} />
        <Route path='/accounting/reports/inflow' element={<Inflow/>} />
        <Route path='/accounting/income_and_expenditure/income' element={<Income/>} />
        <Route path='/accounting/income_and_expenditure/income/add_new_income' element={<CreateNewIncome/>} />
        <Route path='/accounting/income_and_expenditure/expenditures' element={<Expenditures/>} />
        <Route path='/accounting/income_and_expenditure/expenditures/add_new_expenditure' element={<CreateNewExpenditure/>} />
        <Route path='/print_payment' element={<PrintVoucher/>} />
        
        <Route path='/event_mgt_system' element={<StockDash/>} />
        <Route path='/event_mgt_system/unit_of_measurement' element={<ManageUnit/>} />
      <Route path='/event_mgt_system/products' element={<ManageStocks/>} />
      <Route path='/event_mgt_system/event_bookings' element={<Services/>} />
      <Route path='/event_mgt_system/create_booking' element={<CreateServices/>} />
      <Route path='/event_mgt_system/view_booking' element={<ViewServices/>} />
      <Route path='/event_mgt_system/material_cost' element={<ViewMaterial/>} />
      <Route path='/event_mgt_system/other_cost' element={<ViewLabor/>} />

      

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
