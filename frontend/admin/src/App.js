import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flower from './pages/Adminpage/flower';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flower />} />
        
      </Routes>
    </Router>
  
  );
}

export default App;
