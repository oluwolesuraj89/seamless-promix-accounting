import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Promix from './Promix/promix.js';
import PromixLanding from './Promix/promixLanding.js';
// import PromixSignUp from './Promix/promixSignUp.js';
import SignUp from './Promix/Signup/Signup.js';
// import PromixLogin from './Promix/promixLogin.js';
import Login from './Promix/Login/Login.js';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/Promix' element={<Promix />} />
        <Route path='/PromixLanding' element={<PromixLanding />} />
        {/* <Route path='/PromixSignUp' element={<PromixSignUp />} /> */}
        <Route path='/PromixSignUp' element={<SignUp />} />
        {/* <Route path='/PromixLogin' element={<PromixLogin />} /> */}
        <Route path='/PromixLogin' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
