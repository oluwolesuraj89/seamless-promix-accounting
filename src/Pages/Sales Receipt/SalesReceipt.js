import React from 'react'
import classes from '../../Pages/Sales Receipt/salesReceipt.module.css'
import Arrow from '../../assets/promix/dArrow-down.svg'
import flakes from '../../assets/promix/flakes.png'
import nascoflakes from '../../assets/promix/nascoflakes.png'
import nestle from '../../assets/promix/Nestle.png'
import nestlemilo from '../../assets/promix/nestlemilo.png'
import trash from '../../assets/promix/trash.png'
import MainDashoard from '../Main Dashboard/MainDashoard'
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function SalesReceipt() {

    const [key, setKey] = useState('home');

    return (
        <div>
            <MainDashoard />

            <div className={classes.formSection}>
                <div className={classes.formSectionHeader}>
                    <div className={classes.serchsection}>
                        <h5 style={{ color: 'black' }}>My Payment Voucher</h5>
                        <div variant='light' className={classes.search}><i class='bx bx-search'></i>Tea</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0' }}>Welcome</p>
                        <h3>user</h3>
                    </div>
                </div>
                {/* <div className={classes.tabs}> */}
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    style={{ maxWidth: '100%', marginTop: '2rem', paddingRight: '15rem', color: 'black', textDecoration: 'none', }}
                >
                    <Tab eventKey="receipt 1" title="Receipt 1" style={{ color: 'black', textDecoration: 'none' }} >
                        <div className={classes.tableCont}>
                            <div className={classes.table}>
                                <Table striped bordered hover>
                                    <thead className={classes.tableHead}>
                                        <tr>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Amount</th>
                                            <th>Total Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><img src={flakes} alt="product1" className={classes.flakes} /></td>
                                            <td>Nasco Cornflakes</td>
                                            <td className={classes.incrmntbtns}><button className={classes.dcrmnt}>-</button>2<button className={classes.incrmnt} >+</button></td>
                                            <td>6,000</td>
                                            <td>12,000</td>
                                            <td><img src={trash} alt="product1" className={classes.trash} /></td>
                                        </tr>
                                        <tr>
                                            <td><img src={nestle} alt="product1" className={classes.nestle} /></td>
                                            <td>Nestle Milo 500g</td>
                                            <td className={classes.incrmntbtns}><button className={classes.dcrmnt}>-</button>2<button className={classes.incrmnt} >+</button></td>
                                            <td>6,000</td>
                                            <td>12,000</td>
                                            <td><img src={trash} alt="product1" className={classes.trash} /></td>
                                        </tr>
                                        <tr>
                                            <td><img src={flakes} alt="product1" className={classes.flakes} /></td>
                                            <td>Nasco Cornflakes</td>
                                            <td className={classes.incrmntbtns}><button className={classes.dcrmnt}>-</button>2<button className={classes.incrmnt} >+</button></td>
                                            <td>6,000</td>
                                            <td>12,000</td>
                                            <td><img src={trash} alt="product1" className={classes.trash} /></td>
                                        </tr>
                                    </tbody>
                                    
                                    
                                    {/* </div> */}
                                </Table>
                               
                            </div>
                            
                        </div>
                        <div className={classes.rcptinvc}>
                        <button className={classes.prnttcpt}>Print Receipt</button>
                        <button className={classes.clritms}>Clear Items</button>
                    </div>
                    </Tab>
                    <Tab eventKey="Receipt 2" title="Receipt 2">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey="Receipt 3" title="Receipt 3" >
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="Receipt 4" title="Receipt 4" >
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="Receipt 5" title="Receipt 5" >
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="Receipt 6" title="Receipt 6" >
                        Tab content for Contact
                    </Tab>

                </Tabs>
                {/* </div> */}
                <div className={classes.shortcurt}>
                    <div className={classes.prdtxt}>
                        <p className={classes.headprodtxt}>Product shortcut</p>
                    </div>
                    

                    <div className={classes.entireprod}>
                        <div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classes.prods}>
                                    <div className={classes.nasco}>
                                        <img src={nascoflakes} alt="product1" className={classes.nascoflakes} />
                                        <p className={classes.nascotxt}>Nasco Cornflakes</p>
                                    </div>
                                    <div className={classes.nestlemilo}>
                                        <img src={nestlemilo} alt="product1" className={classes.nestlemiloimg} />
                                        <p className={classes.nestletxt}>Nestle Milo 500g</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
