import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar'
import Recognition from './Recognition'
import Home from './Home';
import Landing from './Landing';
import Translation from './Translation';
import Prediction from './Prediction';
import Learning from './Learning';
import { useAuth } from './AuthProvider';
import AuthNavbar from './AuthNavbar';
import Quiz from './Quiz';
import NotFoundPage from './components/404';

function App() {
  const { isLoggedIn } = useAuth() || { isLoggedIn: false };
  const location = useLocation();

  return (
    <>


        <Routes>
          <Route index element={<Landing />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/home" element={<Home />} />
          <Route path="/translation" element={<Translation />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/*" element={<NotFoundPage />} />

        </Routes>
          {location.pathname !== '/quiz' && (isLoggedIn ? <AuthNavbar /> : <Navbar />)}
  
    </>
  )
}

export default App;
