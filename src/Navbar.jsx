import React, { useState } from "react";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { AuthFunction, registerUser } from "./FakeServiceAuth";

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const [loginError, setLoginError] = useState('');

    const openLoginModal = () => {
        setLoginOpen(true);
        setSignupOpen(false);
    };

    const closeLoginModal = () => {
        setLoginOpen(false);
    };
    const openSignupModal = () => {
        setLoginOpen(false);
        setSignupOpen(true); 
    };

    const closeSignupModal = () => {
        setSignupOpen(false);
    };

    const onLoginRequested = async (loginData) => {
        try {
          await AuthFunction(loginData);
        } catch (e) {
          setLoginError(e.toString());
          console.error("Login error:", e);
        }
      };
      const onRegisterRequested = async (registerData) => {
        try {
          await registerUser(registerData);
        } catch (e) {
          console.error("Registration error:", e);
        }
    };

    return (
        <div className="sticky top-0 flex justify-center items-center">
            <div className="w-2/3">
                <React.Fragment>
                    <AppBar sx={{ background: "#063970", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <Toolbar>
                            <button className="text-xl text-white font-nunito-sans mx-2 z-20">Manu</button>
                            <LanguageIcon sx={{ marginLeft: 'auto' }} />
                            <Link to="/"><Typography sx={{ marginLeft: '15px' }}>Home</Typography></Link>
                            <Button onClick={openLoginModal} variant="contained" sx={{ marginLeft: '15px' }}>Login</Button>
                            <SettingsIcon sx={{ marginLeft: '15px' }} />
                        </Toolbar>
                    </AppBar>

                </React.Fragment>
            </div>
            <LoginModal open={loginOpen} onClose={closeLoginModal} onSignup={openSignupModal} onLoginRequested={onLoginRequested} loginError={loginError} setLoginError={setLoginError} />
            <SignupModal open={signupOpen} onClose={closeSignupModal} onLogin={openLoginModal} onRegisterRequested={onRegisterRequested} />
        </div>
    );
}

export default Navbar;