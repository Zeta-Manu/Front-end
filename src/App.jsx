import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Recognition from './Recognition'
import Home from './Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/recognition" element={<Recognition />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
