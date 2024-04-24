import React from 'react'
import MainDashoard from '../../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../../Pages/PaymentVouchers/Create Payment Voucher/CreatePaymentVoucher.module.css'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Arrow from '../../../assets/promix/dArrow-down.svg'

export default function CreatePaymentVoucher() {
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
                              
                </div>
              </div>
            </Form>
          </div>
          <div className={classes.table}>
            <Table striped bordered hover>
              <thead className={classes.tableHead}>
                <tr>
                  <th>S/N</th>
                  <th>Account Name</th>
                  <th>Account code</th>
                  <th>Amount</th>
                  <th 
                    style={{textAlign:'center'}}>
                    <Button variant='success' style={{
                      padding:'0',
                      width:'24px',
                      height:'24px',
                      borderRadius:'50%',
                      backgroundColor:'#2D995F',
                      // border:'none'

                      }}><i class='bx bx-plus'></i></Button></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                <tr>
                  <td>2</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                <tr>
                  <td>3</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                <tr>
                  <td>4</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                <tr>
                  <td>5</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                <tr>
                  <td>6</td>
                  <td>Lara Abiodun</td>
                  <td>2563652747</td>
                  <td>03/06/2024</td>
                  <td className={classes.actions}>
                    <div style={{color:'#FF1708'}}><i class='bx bxs-trash'></i></div>
                  </td>
                </tr>
                
                                  
                
              </tbody>
            </Table>
            {/* <div className={classes.pagenate}>
              <Button variant="success">previous</Button>
              <div className={classes.transparent}>1 of 20</div>
              <Button className={classes.whiteBtn} variant="light">Next</Button>
            </div> */}
          </div>
          
        </div>
      </div>
    </div>
  )
}
