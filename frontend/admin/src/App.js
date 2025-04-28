import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flower from './pages/Adminpage/flower';
import Navbar from './Component/navbar'
import './index.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div className='home'>
      <Routes>
        <Route path="/" element={<Flower />} />
      </Routes>
      </div>
    </Router>
  
  );
}

export default App;
