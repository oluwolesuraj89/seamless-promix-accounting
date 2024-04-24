import React from 'react'
import classes from '../../Pages/Sales Receipt/salesReceipt.module.css'
import Arrow from '../../assets/promix/dArrow-down.svg'
import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function SalesReceipt() {

    const [key, setKey] = useState('home');

  return (
    <div>
        <MainDashoard/>

        <div className={classes.formSection}>
            <div className={classes.formSectionHeader}>
                <div className={classes.serchsection}>
                    <h5 style={{color:'black'}}>My Payment Voucher</h5>
                    <div variant='light' className={classes.search}><i class='bx bx-search'></i>Tea</div>
                </div>
                <div style={{textAlign:'right'}}>
                    <p style={{margin:'0'}}>Welcome</p>
                    <h3>user</h3>
                </div>
            </div>
            {/* <div className={classes.tabs}> */}
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                style={{width:'100%'}}
                >
                <Tab eventKey="home" title="Home">
                <div className={classes.tableCont}>
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
                        </tbody>
                    {/* </div> */}
                    </Table>
                </div>
            </div>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    Tab content for Contact
                </Tab>
            </Tabs>
            {/* </div> */}
            
        </div>
    </div>
  )
}
