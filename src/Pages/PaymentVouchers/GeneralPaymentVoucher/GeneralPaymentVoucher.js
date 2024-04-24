import React from 'react'
import MainDashoard from '../../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../../Pages/PaymentVouchers/GeneralPaymentVoucher/GeneralPaymentVoucher.module.css'

export default function GeneralPaymentVoucher() {
  return (
    <div>
      <MainDashoard/>
      <div className={classes.bodyContainer}>
        <div className={classes.main}>
          <div className={`${classes.header1} ${classes.flex1}`}>
              <h5>Voucher</h5>
              <div className={classes.actionBtns}>
                <Button variant="light" className={classes.whiteBtn}>Filters</Button>
                <Button variant="success" className={classes.greenBtn}>Add New Payment Vouchers</Button>
              </div>
          </div>
          <div className={classes.header2}>
              {/* <div className={classes.actionBtns}> */}
                <div className={classes.whiteBtn}>Time duration: Year 2024 <i class='bx bx-x'></i></div>
                <div className={classes.whiteBtn}>Contract Amount: N1M to N5M <i class='bx bx-x'></i></div>
              {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
