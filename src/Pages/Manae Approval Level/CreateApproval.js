import React, { useState, useEffect } from 'react';
import classes from './CreateApproval.module.css';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Spinner, Badge, Button, Modal, Form, Col, Row } from 'react-bootstrap';
// import Folder from '../../Images/folder-2.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ArrowLogo from '../../Images/arrow-left.svg';
// import LoanImage from '../../Images/loan bg.svg';
import MainDashoard from '../Main Dashboard/MainDashoard';
// import Ready from '../../Images/nothing.svg'
// import Ready1 from '../../Images/review.svg';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CoopDashboard from '../Cooperative Dashboard/CoopDashboard';



export default function CreateApproval() {
    const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const [tableData1, setTableData1] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [toggleStates, setToggleStates] = useState({});
  const [toggleStates1, setToggleStates1] = useState({});
  const [perm, setPerm] = useState([]);
  const [permId, setPermId] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [role1, setRole1] = useState("");
  const [eyeClicked, setEyeClicked] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [formFields, setFormFields] = useState([{ role: '' }]);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('tobi');

      if (value !== null) {
        setBearer(value);
      }
      if (value1 !== null) {
        setUser(value1);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/role/get-roles`, { headers });
          const results = response.data?.data;
      
      setTableData(results);
    
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.error(errorStatus);
          setTableData([]);
        } finally {
          setIsLoading(false);
        }
      };
    const fetchData1 = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/module`, { headers });
          const resultss = response.data?.data;
          setTableData1(resultss);
    
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.error(errorStatus);
          setTableData1([]);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        if (bearer) {
          fetchData();
          fetchData1();
        }
      }, [bearer]);
    
   
    
      const handleRoleChange = (index, event) => {
        const newFormFields = [...formFields];
        newFormFields[index].role = event.target.value;
        setFormFields(newFormFields);
      };
    
      const addNewField = () => {
        setFormFields([...formFields, { role: '' }]);
      };
    
      const removeField = (index) => {
        const newFormFields = [...formFields];
        newFormFields.splice(index, 1);
        setFormFields(newFormFields);
      };
    
      const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };
     
     
    
      const goBack = () => {
        navigate(-1);
      }
    
     
    
      
     
    
      const createApproval = async () => {
        setRoleLoading(true);
       
        try {
          
        
                const response = await axios.post(
                `${BASE_URL}/approval_level/create_app`,
                {
                  module: selectedModule,
                  roles: formFields.map((field) => field.role),
    
                },
                { headers }
            );
    
          
            
            navigate('/approval_level');
    
           toast.success(response.data.message)
    
            
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                if (typeof error.response.data.message === 'string') {
                    errorMessage = error.response.data.message;
                } else if (Array.isArray(error.response.data.message)) {
                    errorMessage = error.response.data.message.join('; ');
                } else if (typeof error.response.data.message === 'object') {
                    errorMessage = JSON.stringify(error.response.data.message);
                }
                toast.error(errorMessage);
                console.log(error);
            }

        } finally {
          setRoleLoading(false);
        }
    };

    return (
        <div>
        <CoopDashboard />

        <div className={classes.finishedbodyCont}>
            <div className={classes.topPadding}>
                <div className={`${classes.formSecCont}`}>
                    <div className={classes.formSectionHeader}>
                        <h3>Create Approval Level</h3>
                    </div>
                    <div className={classes.formSectionHeader}>
                        <h3 style={{color:'#2D995F'}}>{user.toLocaleUpperCase()}</h3>
                    </div>
                </div>
            </div>
            

        <div className={classes.mainform}>
        <div className={classes.loandgrantcards}>
        <div className={classes.loandethead}>
            {/* <div className={classes.formLabel}>
                <h4>Add New</h4>
                <p className={classes.loanText}>Fill in the details below to add new news...</p>
            </div> */}
            {/* <div className={classes.formIntBtn}>
                <Button variant="light" className={classes.btn1}> Add Member</Button>
                <Button variant="success" className={classes.btn2}>New Campaign</Button>
            </div> */}
        </div>

        <div className={classes.loanContainer}>
            <div className={classes.loanResponsive}>
                
                <div className={classes.mainForm}>
                    {/* <h5>General</h5> */}
                    <Form className={classes.form}>
                        <div className={classes.formGrid}>

                        <Form.Group controlId="formBasicEmail">
      <Row>
        <Col xs={1}>
          <Form.Label>Module</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Select 
            as="select"
            value={selectedModule}
            onChange={handleModuleChange}
          >
            <option value="" disabled>Select Module</option>
            {tableData1.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form.Group>
                        </div>
                        <div className='modal-footer' style={{ marginTop: 40 }} />
                        <div>
      {formFields.map((field, index) => (
        <div key={index} className={classes. roleBorder}>
          <Row >
            <Col xs={1}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Select
                className="form-control"
                as="select"
                value={field.role}
                onChange={(e) => handleRoleChange(index, e)}
              >
                <option value="" disabled>Select Role</option>
                {tableData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={2}>
              <Button style={{borderRadius: 80}} variant="danger" onClick={() => removeField(index)}>
                <i className="far fa-trash-alt"></i>
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    

  <Button style={{borderRadius: 80}} variant="primary" onClick={() =>addNewField()}><i className="fas fa-plus"></i></Button>
</div>

                    </Form>
                    

                               
                
                </div>
                
            </div>
            <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                <Button variant="success" className={classes.btn2} onClick={createApproval}>
                    {roleLoading ? (
                        <>
                            <Spinner size='sm' />
                            <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                        </>
                    ) : (
                        "Create your Approval"
                    )}
                </Button>
            </div>
            
        </div>
    </div> 

    

</div>


        </div>

    </div>
)
}