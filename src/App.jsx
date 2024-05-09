import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recognition from './Recognition';
import Home from './routes/Home';
import Landing from './routes/Landing';
import Translation from './Translation';
import Prediction from './routes/Prediction';
import Learning from './routes/Learning';
import { useAuth } from './components/AuthProvider';
import AuthNavbar from './components/AuthNavbar';
import Quiz from './routes/Quiz';
import NotFoundPage from './routes/NotFound';
import ProtectedRoutes from './utils/ProtectedRoutes';

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
        <Route element={<ProtectedRoutes/>}>
          <Route path="/prediction" element={<Prediction />} />
        </Route>
        <Route path="/learning" element={<Learning />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {location.pathname !== '/quiz' && (isLoggedIn ? <AuthNavbar /> : <Navbar />)}
    </>
  );
}

export default App;
