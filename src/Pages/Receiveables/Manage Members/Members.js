import React, { useState, useEffect } from 'react';
// import ManageCustomerUI from './ManageCustomerUI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
// import Swal from 'sweetalert2';
import MembersUi from './MembersUi';



function EmployeeMembers() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [benLoading, setBenLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show56, setShow56] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [role1, setRole1] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState("");
  const [department1, setDepartment1] = useState("");
  const [deptId, setDeptId] = useState("");
  const handleClose = () => setShow(false);
  const handleClose56 = () => setShow56(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow56 = () => setShow56(true);
  const handleShow1 = () => setShow1(true);
  const [totalEntries, setTotalEntries] = useState("");

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [perm, setPerm] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [address, setAddress] = useState("");
  const [office_address, setOfficeAddress] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState('');
  const [user, setUser] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

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


  

  // specify header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchBeneficiaries = async () => {
    setBenLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}/customer?page=${currentPage}`, { headers });
        const results = response.data?.data?.data;
        const resultx = response.data?.data?.total;
        setTotalEntries(resultx);
        setTableData(results);
        const total = response.data?.data?.last_page || 1;
        setTotalPages(total);
        console.log(total);
        // toast.success(response.data.message);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            navigate('/login');
        } else {
          let errorMessage = 'An error occurred. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
              if (typeof error.response.data.message === 'string') {
                  errorMessage = error.response.data.message;
              } else if (Array.isArray(error.response.data.message)) {
                  errorMessage = error.response.data.message.join('; ');
              } else if (typeof error.response.data.message === 'object') {
                toast.error(errorMessage)
                console.log(errorMessage);
              }
          }
            setTableData([]);
        }
    } finally {
        setBenLoading(false);
    }
};

  

  useEffect(() => {
    if (bearer) {
      fetchBeneficiaries();

    }
  }, [bearer, currentPage]);


  const fetchSearch = async (searchTerm) => {
    setSearchLoading(true);
    try {
        let res;
        if (searchTerm.trim() === "") {
            res = tableData1;
        } else {
            const response = await axios.get(`${BASE_URL}/customer/search`, {
                params: { variable: searchTerm },
                headers
            });
            res = response.data?.data;
        }
        setSearchedResult(res);
       
    } catch (error) {
        if (error.response && error.response.status === 401) {
            navigate('/login');
        } else {
          let errorMessage = 'An error occurred. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
              if (typeof error.response.data.message === 'string') {
                  errorMessage = error.response.data.message;
              } else if (Array.isArray(error.response.data.message)) {
                  errorMessage = error.response.data.message.join('; ');
              } else if (typeof error.response.data.message === 'object') {
                  errorMessage = JSON.stringify(error.response.data.message);
              }
          }
          setSearchedResult([]);
        }
    } finally {
        setSearchLoading(false);
    }
  };
  //create beneficiary
  const createCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/customer/add`,
        {
          name: fullName,
          email: email,
          phone: phone,
          address: address,
          office_address: office_address,
        },
        { headers }
      );
      console.log(response.data.message)
      fetchBeneficiaries();
      handleClose();
      // return
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  //view records
  const handleEyeClick = (id) => {
    const foundCustomer = tableData.find(item => item.id === id);
        navigate('/cooperative/edit_member', { state: { selectedCustomer: foundCustomer } });
        console.log(foundCustomer, "hdfhds");
        setEyeClicked(true);
      };

      const handleTrashClick = async (id) => {
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this member.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel',
        });
    
        if (!confirmed.isConfirmed) {
          return; // User canceled, do nothing
        }
    
        try {
          const response = await axios.get(`${BASE_URL}/customer/delete?id=${id}`, { headers });
          fetchBeneficiaries();
         toast.success(response.data.message);
          setTrashClicked(true);
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
                  toast.error(errorMessage)
                  console.log(errorMessage);
              }
        }
      };

  //update function
  const editCustomer = async () => {
    setLoading(true);

    try {
        const response = await axios.post(`${BASE_URL}/admin/users/update`,
        {
          name: fullName1,
          id: deptId, 
          email: email1,
          phone: phone1,
          
        },
        { headers }
      );

      fetchBeneficiaries();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });

      // console.log(response.data);
    } catch (error) {
      const errorStatus = error.response?.data?.message || 'An error occurred';

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setSelectedFile(fileList);
    
  };

  const uploadExcel = async () => {
    setUploadLoading(true);
      try {
        const formData = new FormData();
      formData.append('file', selectedFile[0]);
      // formData.append('transaction_date', selectedDate);
     
      // console.log(selectedFile);
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${bearer}`,
      };
  
      const response = await axios.post(`${BASE_URL}/customer/import`,
        formData,
        { headers }
      );
  handleClose56();
  fetchBeneficiaries();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
  
      console.log(response.data.message);
    } catch (error) {
      const errorStatus = error.response.data.message;
  
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
  
      console.error(error);
    } finally {
      setUploadLoading(false);
      }
    };


  //filter function
  // const filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // const filteredData = tableData.filter(item => item.name.includes(searchTerm));
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  // const displayedData = filteredData.slice(currentPage - 1, totalEntries);




  return (
    <MembersUi
      // Pass necessary props from the logic to the UI component
      show={show}
      show56={show56}
      show1={show1}
      handleShow={handleShow}
      handleShow56={handleShow56}
      handleShow1={handleShow1}
      handleClose={handleClose}
      handleClose56={handleClose56}
      handleClose1={handleClose1}
      createCustomer={createCustomer}
      editCustomer={editCustomer}
      isLoading={isLoading}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalEntries={totalEntries}
      totalPages={totalPages}
      startIndexx={startIndexx}
      endIndexx={endIndexx}
      // displayedData={displayedData}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handleEyeClick={handleEyeClick}
      handleTrashClick={handleTrashClick}
      fullName={fullName}
      setFullName={setFullName}
      address={address}
      setAddress={setAddress}
      office_address={office_address}
      setOfficeAddress={setOfficeAddress}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      fullName1={fullName1}
      setFullName1={setFullName1}
      phone1={phone1}
      setPhone1={setPhone1}
      email1={email1}
      setEmail1={setEmail1}
      tableData={tableData}
      formatDate={formatDate}
      uploadExcel={uploadExcel}
      handleFileChange={handleFileChange}
      uploadLoading={uploadLoading}
      benLoading={benLoading}
      user = {user}
      fetchSearch = {fetchSearch}
      setSearchedResult = {setSearchedResult}
      searchedResult = {searchedResult}
      searchLoading = {searchLoading}
    />
  )
}

export default EmployeeMembers;