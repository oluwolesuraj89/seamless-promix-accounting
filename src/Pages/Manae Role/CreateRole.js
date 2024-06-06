import React, { useState, useEffect } from 'react';
import classes from './CreateRole.module.css';
// import RegLogo from '../../Images/RegistrationLogo.svg'
import { Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
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
import ToggleSlider from './ToggleSlider';
import CoopDashboard from '../Cooperative Dashboard/CoopDashboard';


export default function CreateRole() {
    const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
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

    const fetchPermission = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/role/permissions`, { headers });
          const data = response.data?.data;
          const permissionId = data.map(item => item.id);
          setPermId(permissionId);
    
          const initialToggleStates = Object.fromEntries(permissions.map(id => [id, false]));
    
          // const initialToggleStates = false; 
    
    
          setPermissions(data);
          setToggleStates(initialToggleStates);
    
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.error(errorStatus);
          setPermissions([]);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        if (bearer) {
          fetchPermission();
        }
      }, [bearer]);
    
   
    
      const handleToggleChange = (itemId) => {
        setToggleStates(prevToggleStates => ({
          ...prevToggleStates,
          [itemId]: !prevToggleStates[itemId],
        }));
      };
    
      const handleCheckAllToggle = () => {
        const checkAllValue = !checkAll;
        setCheckAll(checkAllValue);
    
        // Set all toggle states to the determined value
        const updatedToggleStates = Object.fromEntries(permId.map(id => [id, checkAllValue]));
        setToggleStates(updatedToggleStates);
      };
    
      const handleToggleChange1 = (itemId) => {
        setToggleStates1((prevToggleStates) => ({
          ...prevToggleStates,
          [itemId]: !prevToggleStates[itemId],
        }));
      };
    
    
     
     
    
      const goBack = () => {
        navigate(-1);
      }
    
     
    
      
     
    
      const createRole = async () => {
        setRoleLoading(true);
       
        try {
          const selectedToggle = Object.entries(toggleStates)
          .filter(([_, value]) => value)
          .map(([key, _]) => parseInt(key));
        
                const response = await axios.post(
                `${BASE_URL}/role/create`,
                {
                  name: role,
                  permission: selectedToggle
    
                },
                { headers }
            );
    
          
            
            navigate('/manage_roles');
    
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
                        <h3>Create Role</h3>
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

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control type="text" 
                               value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter Role name"
                                />
                            </Form.Group>
                        </div>
                    </Form>
                    <div className='modal-footer' style={{ marginTop: 20 }} />
                              <div style={{ display: "flex", gap: 5 }}>
                    <ToggleSlider checked={checkAll} onChange={handleCheckAllToggle} />
                    <p>Check All</p>

                    
                </div>
                <div className='modal-footer' style={{ marginTop: 20 }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: "center", justifyContent: "center" }}>
                  {isLoading ? (
        <>
        <Spinner size='sm' animation="border" role="status" />
          
        </>
  ) : (
    <>
      {permissions.map((item, index) => (
        <div
          key={index}
          style={{
            width: '150px',
            height: '150px',
            margin: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
            boxSizing: 'border-box', // Include padding and border in the width
            marginBottom: 20
          }}
        >
          <p style={{ fontSize: 13.5, margin: '5px 0', textAlign: "center" }}>{item.name}</p>
          <ToggleSlider
            checked={toggleStates[item.id]}
            onChange={() => handleToggleChange(item.id)}
          />
        </div>
      ))}
    </>
  )}
</div>
                </div>
                
            </div>
            <div className={`${classes.formIntBtn} ${classes.formIntBtn2}`}>
                <Button variant="light" className={classes.btn1} onClick={goBack}> Cancel</Button>
                <Button variant="success" className={classes.btn2} onClick={createRole}>
                    {roleLoading ? (
                        <>
                            <Spinner size='sm' />
                            <span style={{ marginLeft: '5px' }}>Creating your role, Please wait...</span>
                        </>
                    ) : (
                        "Create your Role"
                    )}
                </Button>
            </div>
            
        </div>
    </div> 

    <div className={classes.loandgrantcards}>
   
   

   
  
</div> 

</div>


        </div>

    </div>
)
}