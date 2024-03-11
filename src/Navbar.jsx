import React, { useState } from "react";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { AuthFunction, registerUser } from "./FakeServiceAuth";
import ForgetModal from "./ForgetModal";
import VerificationModal from "./VerificationModal";
import ResetPasswordModal from "./ResetPasswordModal";
import ConfirmAccountModal from "./ConfirmAccountModal";

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [forgetOpen, setForgetOpen] = useState(false);
    const [verificationOpen, setVerificationOpen] = useState(false);
    const [resetpasswordOpen, setResetpasswordOpen] = useState(false);
    const [confirmaccountOpen, setConfirmaccountOpen] = useState(false);

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
    const openForgetModal = () => {
        setLoginOpen(false);
        setForgetOpen(true); 
    };

    const closeForgetModal = () => {
        setForgetOpen(false);
        setLoginOpen(true);
    };

    const openVerificationModal = () => {
        setForgetOpen(false);
        setVerificationOpen(true);
       
    };

    const closeVerificationModal = () => {
        setVerificationOpen(false);
        setForgetOpen(true);
    };

    const openResetpasswordModal = () => {
        setVerificationOpen(false);
        setResetpasswordOpen(true);
    };
    const closeResetpasswordModal = () => {
        setResetpasswordOpen(false);
        setVerificationOpen(true);
    };
    const openConfirmAccountModal = () => {
        setSignupOpen(false);
        setConfirmaccountOpen(true);
    };
    const closeConfirmAccountModal = () => {
        setConfirmaccountOpen(false);
        setSignupOpen(true);
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
            <LoginModal open={loginOpen} onClose={closeLoginModal} onSignup={openSignupModal} onForget={openForgetModal} onLoginRequested={onLoginRequested} loginError={loginError} setLoginError={setLoginError} />
            <SignupModal open={signupOpen} onClose={closeSignupModal} onLogin={openLoginModal} onRegisterRequested={onRegisterRequested} onConfirmaccount={openConfirmAccountModal} />
            <ForgetModal open={forgetOpen} onClose={closeForgetModal}  onVerification={openVerificationModal}/>
            <VerificationModal open={verificationOpen} onClose={closeVerificationModal} onResetpwd={openResetpasswordModal}  />
            <ResetPasswordModal open={resetpasswordOpen} onClose={closeResetpasswordModal}  />
            <ConfirmAccountModal open={confirmaccountOpen} onClose={closeConfirmAccountModal}  />
        </div>
    );
}

export default Navbar;