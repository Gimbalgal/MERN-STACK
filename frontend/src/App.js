
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/home";
import Navbar from './component/Navbar';
import './index.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="admin">
          <Routes>
            <Route path="/" 
              element={<Home />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;

