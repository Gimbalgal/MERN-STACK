import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Home/home";
import Navbar from "./Companent/navbar";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <Homepage />
      <div className="pages">
      <Routes>
        <Route 
          path='/' element={<Homepage />}
        />
      </Routes>
      
      </div>
    </BrowserRouter>

      
    </div>
  );
}

export default App;
