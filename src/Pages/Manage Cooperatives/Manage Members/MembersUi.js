import React from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
// import { AdminHeaderNav } from '../AdminHeaderNav';
// import { InfoFooter } from '../../InfoFooter';
import classes from './ManageMember.module.css';
// import favicon from '../../Images/faviconn.png';
import MainDashboard from '../../Main Dashboard/MainDashoard';

function MembersUi({
  show,
  show1,
  show56,
  handleShow,
  handleShow56,
  handleShow1,
  handleClose,
  handleClose56,
  handleClose1,
  createCustomer,
  editCustomer,
  isLoading,
  loading,
  searchTerm,
  setSearchTerm,
  entriesPerPage,
  setEntriesPerPage,
  currentPage,
  setCurrentPage,
  totalEntries,
  totalPages,
  startIndexx,
  benLoading,
  endIndexx,
  displayedData,
  uploadLoading,
  handlePrevPage,
  handleNextPage,
  handleEyeClick,
  handleTrashClick,
  fullName,
  setFullName,
  address,
  setAddress,
  office_address,
  setOfficeAddress,
  phone,
  setPhone,
  email,
  setEmail,
  fullName1,
  setFullName1,
  phone1,
  setPhone1,
  email1,
  setEmail1,
  tableData,
  formatDate,
  handleFileChange,
  uploadExcel
}) {
  const formattedTotalEntries = totalEntries.toLocaleString();
  return (
    <div>
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

            
            <MainDashboard/>
            <div className='newBody'>
              <div className={classes.newWidth}>

                {/* <!--Content Header (Page header)--> */}
                <div className={classes.topPadding}>
                    <div className={`${classes.formSecCont}`}>
                        <div className={classes.formSectionHeader}>
                            <h3>Manage Members</h3>
                        </div>
                        <div className={classes.formSectionHeader}>
                            <h3 style={{color:'#2D995F'}}>user</h3>
                        </div>
                    </div>
                </div>
                <div className="content-header row align-items-center m-0">

                  <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                        gap: 10
                      }}
                      className={classes.actionBtns}
                    >
                      <Button variant="success" onClick={handleShow} >
                        Add New Customer
                      </Button>
                      <Button variant="secondary"  onClick={handleShow56}>
                        Upload Customer
                      </Button>
                    </div>

                  </nav>
                  <div className="col-sm-8 header-title p-0">
                    <div className={classes.manageCust}>
                      {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                      <div className="media-body">
                        {/* <h4>Manage Members</h4> */}
                        {/* <small>Create and update your Member...</small> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!--/.Content Header (Page header)--> */}
                <div className="body-content">
                  <div className="row">
                  <Modal show={show56} onHide={handleClose56} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Employee</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
  <Form style={{ marginTop: 20 }}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Upload Excel File</Form.Label>
      <Form.Control
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileChange}
      />
    </Form.Group>
  </Form>
</Modal.Body>







                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose56}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={uploadExcel}>
                    {uploadLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Uploading, Please wait...</span>
    </>
  ) : (
                "Upload"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>
                    
                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Customer</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Full Name"
                              // autoFocus
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Address"
                              // autoFocus
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Office Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter office Address"
                              // autoFocus
                              value={office_address}
                              onChange={(e) => setOfficeAddress(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Phone Number"
                              // autoFocus
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Email Address"
                              // autoFocus
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createCustomer}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating Customer, Please wait...</span>
    </>
  ) : (
                "Create Customer"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                    <div className="col-lg-12">
                      <div className="card">
                        
                        <div className="card-body">
                          <div className="table-resposive">
                            <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                              <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                <div>
                                  <button>Copy</button>
                                  <button>Excel</button>
                                  <button>PDF</button>
                                  <button className={classes.diffbtn}>Column visibility</button>
                                </div>
                                <div>
                                  <label className="d-flex justify-content-start align-items-center">
                                    Show
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                      onChange={(e) => {
                                        setEntriesPerPage(parseInt(e.target.value));
                                        setCurrentPage(1);
                                      }}>
                                      <option value={10}>10</option>
                                      <option value={25}>25</option>
                                      <option value={50}>50</option>
                                      <option value={100}>100</option>
                                    </select>
                                    entries
                                  </label>
                                </div>
                              </div>
                              <div className="text-right modal-effect ">
                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="mr-2">Search:</div>
                                    <input
                                      type="search"
                                      value={searchTerm}
                                      className="form-control form-control-sm"
                                      placeholder=""
                                      aria-controls="DataTables_Table_0"
                                      onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        // setCurrentPage(1);
                                      }}
                                    />
                                  </div>

                                </div>
                              </div>
                            </div>


                            
                                <div className={classes.mainTable}>
                                {benLoading ? (
                              <p>Fetching customers...</p>
                            ) : (
                                    <div className="table-responsive">
                                        <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                        <thead style={{ whiteSpace: 'nowrap' }}>
                                            <tr>
                                            <th>ID</th>
                                            <th>Employee Number</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ whiteSpace: 'nowrap' }}>
                                            {tableData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.employee_no}</td>
                                                <td>{item.name}</td>
                                                <td style={{textAlign: "left"}}>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{formatDate(item.created_at)}</td>
                                                <td style={{textAlign: "left"}}>
                                                <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                                    <i className="far fa-eye" style={{backgroundColor:'#e9f6ec', color:'#008a4b', border:'1px solid #afdeba', padding:'5px', borderRadius:'3px'}}></i>
                                                </div>
                                                <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                                    <i className="far fa-trash-alt" style={{backgroundColor:'#fbeaec', color:'#e28e80', border:'1px solid #f1b3ba', padding:'5px',  borderRadius:'3px'}}></i>
                                                </div>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                )}
                                </div>
                            
                            <div className={classes.endded}>
                              <p>
                                Showing {`Page ${currentPage} to ${totalPages} pages`} of {formattedTotalEntries} entries
                              </p>
                              <div style={{ display: 'flex' }}>
                                <button
                                  style={{ border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginRight: 10, cursor: "pointer" }}
                                  onClick={handlePrevPage}
                                  disabled={currentPage === 1}
                                >
                                  Previous
                                </button>
                                {[...Array(totalPages)].map((_, page) => {
                                  // Show only 5 pages or less if available
                                  if (page < 5 || page === currentPage - 1 || page === totalPages - 1) {
                                    return (
                                      <button
                                        key={page + 1}
                                        style={{
                                          marginLeft: '0.4rem',
                                          marginRight: '0.4rem',
                                          fontSize: '14px',
                                          fontFamily: 'nunito',
                                          fontWeight: 400,
                                          color: page + 1 === currentPage ? '#ffffff' : '#000',
                                          backgroundColor: page + 1 === currentPage ? '#28a745' : 'gainsboro',
                                          height: '2.5rem',
                                          borderRadius: '89px',
                                          padding: '0.5rem',
                                          border: 'none',
                                          width: '40px',
                                          cursor: "pointer"
                                        }}
                                        onClick={() => setCurrentPage(page + 1)}
                                      >
                                        {page + 1}
                                      </button>
                                    );
                                  }
                                  return null;
                                })}
                                <button
                                  style={{ cursor: "pointer", border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginLeft: 10 }}
                                  onClick={handleNextPage}
                                  disabled={currentPage === totalPages}
                                >
                                  Next
                                </button>
                              </div>
                            </div>

                            <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form style={{ marginTop: 20 }}>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Full Name"
                                      // autoFocus
                                      value={fullName1}
                                      onChange={(e) => setFullName1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Email Address"
                                      // autoFocus
                                      value={email1}
                                      onChange={(e) => setEmail1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Phone Number"
                                      // autoFocus
                                      value={phone1}
                                      onChange={(e) => setPhone1(e.target.value)}
                                    />                                    
                                    
                                  </Form.Group>
                                </Form>
                              </Modal.Body>






                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                <Button variant="success" onClick={editCustomer} >                             {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                                </Button>
                            </Modal.Footer>
                          </Modal>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/.body content--> */}
            </div>
            {/* <!--/.main content--> */}
          </div>
        </div>
        {/* <InfoFooter /> */}
        {/* <!--/.footer content--> */}
        <div className="overlay"></div>
      </div>
      {/* <!--/.wrapper--> */}


    </div>
    </div>
  );
}

export default MembersUi;