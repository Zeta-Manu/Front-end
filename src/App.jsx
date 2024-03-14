import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Recognition from './Recognition'
import Home from './Home';
import Landing from './Landing';
import Translation from './Translation';

function App() {

  return (
    <>
      <BrowserRouter>
        
        <Routes>
            <Route index element={<Home />} />
            <Route path="/recognition" element={<Recognition />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/translation" element={<Translation />} />

        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  )
}

export default App;
