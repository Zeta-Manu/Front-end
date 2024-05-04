import React, { useState } from "react";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal'
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import ForgetModal from "./ForgetModal";
import VerificationModal from "./VerificationModal";
import ResetPasswordModal from "./ResetPasswordModal";
import ConfirmAccountModal from "./ConfirmAccountModal";
import logo from './assets/logo.svg'

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [forgetOpen, setForgetOpen] = useState(false);
    const [verificationOpen, setVerificationOpen] = useState(false);
    const [resetpasswordOpen, setResetpasswordOpen] = useState(false);
    const [confirmaccountOpen, setConfirmaccountOpen] = useState(false);
    const [externalRegisterError, setExternalRegisterError] = useState();
    const [confirmAccountEmail, setConfirmAccountEmail] = useState('');
    const [resetPasswordCode, setResetPasswordCode] = useState('');
    const [forgetEmail, setForgetEmail] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    /*const [loginError, setLoginError] = useState('');*/

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

    const openVerificationModal = (email) => {
        setForgetOpen(false);
        setVerificationOpen(true);
        setForgetEmail(email)
    };

    const closeVerificationModal = () => {
        setVerificationOpen(false);
        setForgetOpen(true);
        setForgetEmail(forgetEmail);
    };

    const openResetpasswordModal = (verificationcode, email) => {
        setResetPasswordCode(verificationcode);
        setVerificationOpen(false);
        setResetpasswordOpen(true);
        setResetEmail(email)
    };
    const closeResetpasswordModal = () => {
        setResetpasswordOpen(false);
        setVerificationOpen(true);
    };
    const openConfirmAccountModal = (email) => {
        setSignupOpen(false);
        setConfirmaccountOpen(true);
        setConfirmAccountEmail(email); //pass email to confirmAccount modal
    };
    const closeConfirmAccountModal = () => {
        setConfirmaccountOpen(false);
        setSignupOpen(true);
    };


    const onConfirmtoLogin =() => {
        setConfirmaccountOpen(false);
        setLoginOpen(true);
    };

    const onResettoLogin =() => {
        setResetpasswordOpen(false);
        setLoginOpen(true);
    };
    /*
    const onLoginRequested = async (loginData) => {
        try {
            await AuthFunction(loginData);
        } catch (e) {
            setExternalRegisterError(e.toString());
            console.error("Login error:", e);
        }
    };
    */
    const onRegisterRequested = async (registerData) => {
        const { email, username, password } = registerData;
        try {
            const response = await registerReqUser(email, username, password);
            if (response.status === 200) {
                // Registration successful
                setExternalRegisterError(null);
            } else if (response.status === 400) {
                // Invalid Password or Invalid Parameter
                setExternalRegisterError('Invalid Password or Invalid Parameter');
            } else if (response.status === 409) {
                // Username Exists
                setExternalRegisterError('Username Exists');
            } else if (response.status === 500) {
                // Internal Server Error
                setExternalRegisterError('Internal Server Error');
            } else {
                setExternalRegisterError('Registration failed');
            }
        } catch (e) {
            console.error("Registration error:", e);
            setExternalRegisterError('Registration failed');
        }
    };

    const registerReqUser = async (email, name, password) => {

        const registerData = {
            email: email,
            name: name,
            password: password
        };

        try {
            const response = await fetch(import.meta.env.VITE_AUTH_ENDPOINT +'/signup', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };


    return (
        <div className="sticky top-0 flex justify-center items-center">
            <div className="w-2/3">
                <React.Fragment>
                    <AppBar sx={{ background: "#C5DFE7", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <Toolbar>
                            <Link className="flex" to="/">
                                <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginLeft: '8px' }} />
                                <button className="text-xl text-black font-nunito-sans mx-2 z-20">Manu</button>
                            </Link>
                            <LanguageIcon sx={{ marginLeft: 'auto', color: '#808080' }} />
                            <Link to="/home"><Typography sx={{ marginLeft: '15px', color: 'black' }}>Home</Typography></Link>
                            <Button onClick={openLoginModal} variant="contained" sx={{
                                marginLeft: '15px', backgroundColor: '#BCFDE7', color: 'black', '&:hover': {
                                    color: 'white',
                                },
                            }}>Login</Button>
                            <SettingsIcon sx={{ marginLeft: '15px', color: '#808080' }} />
                        </Toolbar>
                    </AppBar>

                </React.Fragment>
            </div>
            <LoginModal open={loginOpen} onClose={closeLoginModal} onSignup={openSignupModal} onForget={openForgetModal} />
            <SignupModal open={signupOpen} onClose={closeSignupModal} onLogin={openLoginModal} onRegisterRequested={onRegisterRequested} openConfirmAccountModal={openConfirmAccountModal} externalRegisterError={externalRegisterError}/>
            <ForgetModal open={forgetOpen} onClose={closeForgetModal} openVerificationModal={openVerificationModal} />
            <VerificationModal open={verificationOpen} onClose={closeVerificationModal} openResetpasswordModal={openResetpasswordModal} email={forgetEmail}/>
            <ResetPasswordModal open={resetpasswordOpen} onClose={closeResetpasswordModal} verificationcode={resetPasswordCode} email={resetEmail} onResettoLogin={onResettoLogin} />
            <ConfirmAccountModal open={confirmaccountOpen} onClose={closeConfirmAccountModal} email={confirmAccountEmail} onConfirmtoLogin={onConfirmtoLogin}/>
        </div>
    );
}

export default Navbar;