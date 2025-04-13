import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/home";
import Flowers from "./component/flower";
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="admin">
          <Routes>
            <Route path="/" 
              element={<Home />} />
          </Routes>
        </div>

        <div className="admin">
          <Routes>
            <Route path="/" 
              element={< Flowers/>} />
          </Routes>
        </div>

        

      </BrowserRouter>
    </div>
  );
}

export default App;
