import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Recognition from './Recognition'
import Home from './Home';
import Landing from './Landing';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
