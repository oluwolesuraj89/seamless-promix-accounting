import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Promix from './Promix/promix.js';
import PromixLanding from './Promix/promixLanding.js';


function App() {
  return (

    <Router>
      <Routes>
        <Route path='/Promix' element={<Promix />} />
        <Route path='/PromixLanding' element={<PromixLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
