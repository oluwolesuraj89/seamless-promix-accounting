import React from 'react'
import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button } from 'react-bootstrap'
import classes from '../../Pages/General Ledger Table/GeneralLedgerTable.module.css'
import Table from 'react-bootstrap/Table';
import Arrow from '../../assets/promix/dArrow-down.svg'

export default function GeneralLedgerTable() {
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
              <div
               variant='light' 
               className={classes.transparents}
               style={{display:'flex', justify:'space-between', alignItems:'center'}}
               >
                <i class='bx bxs-chevron-left' style={{marginRight:'10px'}}></i>Back to General Ledger
                
              </div>
              <div className={classes.actionBtns}>
                {/* <Button variant="light" className={classes.whiteBtn}>Filters</Button> */}
                <Button variant="success" className={classes.greenBtn}>Print Report</Button>
              </div>
          </div>
          {/* <div className={classes.header2}>
          
                <div className={`${classes.whiteBtn} ${classes.discrp}`}>Time duration: Year 2024 <i class='bx bx-x'></i></div>
                <div className={`${classes.whiteBtn} ${classes.discrp}`}>Contract Amount: N1M to N5M <i class='bx bx-x'></i></div>
          
          </div> */}
          <div className={classes.table}>
          <Table striped bordered hover>
            <thead className={classes.tableHead}>
              <tr>
                <th>S/N</th>
                <th>Transaction ID</th>
                <th>Date created</th>
                <th>Amount</th>
                <th>Description</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Lara Abiodun</td>
                <td>2563652747</td>
                <td>03/06/2024</td>
                <td>500,000</td>
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
