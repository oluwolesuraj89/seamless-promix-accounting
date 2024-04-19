import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Promix from './Promix/promix.js';
import PromixLanding from './Promix/promixLanding.js';
import PromixSignUp from './Promix/promixSignUp.js';
import PromixLogin from './Promix/promixLogin.js';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/Promix' element={<Promix />} />
        <Route path='/PromixLanding' element={<PromixLanding />} />
        <Route path='/PromixSignUp' element={<PromixSignUp />} />
        <Route path='/PromixLogin' element={<PromixLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
