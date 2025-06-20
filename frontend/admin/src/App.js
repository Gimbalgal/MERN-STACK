

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flower from './pages/AdminPage/flower';
import CustomNavbar from './Component/navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <CustomNavbar /> 
      <div className='home'>
        <Routes>
          <Route path="/" element={<Flower />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;