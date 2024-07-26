import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Dashboard from './components/pages/DashBoard';
import PPEViolations from './components/pages/ppeViolations';
import PPEs from './components/pages/ppes';
import Contractors from './components/pages/contractors';
import Workers from './components/pages/workers';

const App = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Router>
      <div className="flex">
        <SideBar toggle={toggle} setToggle={setToggle} />
        <div className={`flex-1 transition-all ${toggle ? 'ml-20' : 'ml-64'}`}>
          <NavBar toggle={toggle} setToggle={setToggle} />
          <div className=""> {/* Added mt-16 to create space below the navbar */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ppe-violations" element={<PPEViolations />} >
                <Route path="ppes" element={<PPEs />} /> 
                <Route path="contractors" element={<Contractors />} /> 
                <Route path="workers" element={<Workers toggle={toggle} setToggle={setToggle}/>} /> 
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
