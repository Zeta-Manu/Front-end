import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const [access_token, setAccess_token] = useState(localStorage.getItem('access_token') || '');

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setAccess_token('');
    localStorage.setItem('isLoggedIn', 'false');
  };

  const login = (email, access_token) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setAccess_token(access_token);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail, access_token }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
