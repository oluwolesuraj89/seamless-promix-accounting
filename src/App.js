import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Promix from './Pages/Dashboard.js';
import PromixLanding from './Pages/promixLanding.js';


function App() {
  return (
      <Routes>
        <Route path='/' element={<PromixLanding />} />
        <Route path='/Promix' element={<Promix />} />
      </Routes>
  );
}

export default App;
