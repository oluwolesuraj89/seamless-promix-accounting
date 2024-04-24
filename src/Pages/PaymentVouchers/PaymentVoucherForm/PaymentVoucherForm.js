import React from 'react'
import MainDashoard from '../../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../../Pages/PaymentVouchers/PaymentVoucherForm/PaymentVoucherForm.module.css'
import Form from 'react-bootstrap/Form';
import Arrow from '../../../assets/promix/dArrow-down.svg'

export default function PaymentVoucherForm() {
  return (
    <div>
      <MainDashoard/>

      <div className={classes.formSection}>
        <div className={classes.formSectionHeader}>
            <div>
                <h4 style={{color:'black'}}>My Payment Voucher</h4>
                
            </div>
            <div style={{textAlign:'right'}}>
                <p style={{margin:'0'}}>Welcome</p>
                <h3>
                    user
                </h3>
                
            </div>
        </div>
        <div className={classes.analysis}>
            <div className={classes.analysisCont}>
                <p style={{paddingBottom:'5px'}}>TOTAL INCOME</p>
                <h5>N232,096,635.05</h5>
                <div className={classes.perceCont}>
                    <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                    <p>vs average</p>
                </div>
            </div>
            <div className={classes.analysisCont}>
                <p style={{paddingBottom:'5px'}}>TOTAL LODGE</p>
                <h5>N232,096,635.05</h5>
                <div className={classes.perceCont}>
                    <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                    <p>vs average</p>
                </div>
            </div>
            <div className={classes.analysisCont}>
                <p style={{paddingBottom:'5px'}}>TOTAL OUTSTANDING</p>
                <h5>N232,096,635.05</h5>
                <div className={classes.perceCont}>
                    <p className={classes.percent}><img src={Arrow} alt="arrowDown"/> 5%</p>
                    <p>vs average</p>
                </div>
            </div>
        </div>
      </div>




      <div className={classes.bodyContainer}>
        <div className={classes.main}>
          <div className={`${classes.header1} ${classes.flex1}`}>
              <h6>Create New Payment Voucher</h6>
          </div>
          <div className={classes.header2}>
          <Form>
      {/* <fieldset disabled> */}
      <div className={classes.formContainer}>
        <div className={classes.formCont}>
            <Form.Group className={classes.formGroup}>
                <Form.Label  >Date</Form.Label>
                <Form.Control type='date' id="date" />
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label >Debit account (DR)</Form.Label>
                <Form.Select id="disabledSelect">
                    <option>Select debit account</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label >Credit account (CR)</Form.Label>
                <Form.Select id="disabledSelect">
                    <option>Select credit account</option>
                </Form.Select>
            </Form.Group>
        
            <Form.Group className={classes.formGroup}>
                <Form.Label >Beneficiary</Form.Label>
                <Form.Select >
                    <option>Select a beneficiary</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label >Select beneficiary</Form.Label>
                <Form.Select id="disabledSelect">
                    <option>Select beneficiary account</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label  >Description </Form.Label>
                <Form.Control  placeholder='Enter the description here' />
            </Form.Group>
        
            <Form.Group className={classes.formGroup}>
                <Form.Label >Mode</Form.Label>
                <Form.Select id="disabledSelect">
                    <option>Select mode</option>
                </Form.Select>
            </Form.Group>
            
            <Form.Group className={classes.formGroup}>
                <Form.Label  >Supporting document</Form.Label>
                <Form.Control placeholder='upload document' />
            </Form.Group>

            <Form.Group className={classes.formGroup}>
                <Form.Label  >Contract Amount</Form.Label>
                <Form.Control placeholder='Enter the contract amount here'/>
            </Form.Group>
            
        
            
            <Form.Group className={classes.formGroup}>
                <Form.Label  >Total Amount</Form.Label>
                <Form.Control placeholder='Enter the total amount here'/>
            </Form.Group>
            
        </div>
      </div>
        <Form.Group className="mb-3" style={{marginTop:'20px'}}>
          <Form.Check
            type="checkbox"
            id="disabledFieldsetCheck"
            label="Apply Tax"
          />
        </Form.Group>
        <Button variant='success'>Create Payment Voucher</Button>
      {/* </fieldset>    */}
    </Form>

          </div>
          
        </div>
      </div>
    </div>
  )
}
