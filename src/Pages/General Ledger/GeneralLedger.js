import React from 'react'
import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../Pages/General Ledger/GeneralLedger.module.css'
import Form from 'react-bootstrap/Form';
import Arrow from '../../assets/promix/dArrow-down.svg'
import { Link } from 'react-router-dom';

export default function GeneralLedger() {
  return (
    <div>
      <MainDashoard/>


      <div className={classes.formSection}>
        <div className={classes.formSectionHeader}>
            <div>
                <h4 style={{color:'black'}}>General Ledger</h4>
                
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
              <h6>Please fill in the required Information</h6>
          </div>
          <div className={classes.header2}>
          <Form>
      {/* <fieldset disabled> */}
      <div className={classes.formContainer}>
        <div className={classes.formCont}>
            <Form.Group className={classes.formGroup}>
                <Form.Label >Account</Form.Label>
                <Form.Select id="disabledSelect">
                    <option>Choose Account</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label  >Start Date</Form.Label>
                <Form.Control type='date' id="date" />
            </Form.Group>
            <Form.Group className={classes.formGroup}>
                <Form.Label  >End Date</Form.Label>
                <Form.Control type='date' id="date" />
            </Form.Group>
                        
        </div>
      </div>
        
       <Link to={'/general_ledger_table'}>
        <Button variant='success' style={{marginTop:'20px'}}>Generate Report</Button>
       </Link> 
      {/* </fieldset>    */}
    </Form>

          </div>
          
        </div>
      </div>
    </div>
  )
}
