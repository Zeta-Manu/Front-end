import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

import ForgetModal from './auth/ForgetModal';
import VerificationModal from './auth/VerificationModal';
import ResetPasswordModal from './auth/ResetPasswordModal';
import ConfirmAccountModal from './auth/ConfirmAccountModal';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgetOpen, setForgetOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [resetpasswordOpen, setResetpasswordOpen] = useState(false);
  const [confirmaccountOpen, setConfirmaccountOpen] = useState(false);
  const [confirmAccountEmail, setConfirmAccountEmail] = useState('');
  const [resetPasswordCode, setResetPasswordCode] = useState('');
  const [forgetEmail, setForgetEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');

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
    setForgetEmail(email);
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
    setResetEmail(email);
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

  const onConfirmtoLogin = () => {
    setConfirmaccountOpen(false);
    setLoginOpen(true);
  };

  const onResettoLogin = () => {
    setResetpasswordOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="sticky top-0 flex justify-center items-center">
      <div className="w-2/3">
        <React.Fragment>
          <AppBar sx={{ background: '#C5DFE7', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Toolbar>
              <Link className="flex" to="/">
                <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginLeft: '8px' }} />
                <button className="text-xl text-black font-nunito-sans mx-2 z-20">Manu</button>
              </Link>
              <LanguageIcon sx={{ marginLeft: 'auto', color: '#808080' }} />
              <Link to="/home">
                <Typography sx={{ marginLeft: '15px', color: 'black' }}>Home</Typography>
              </Link>
              <Button
                onClick={openLoginModal}
                variant="contained"
                sx={{
                  marginLeft: '15px',
                  backgroundColor: '#BCFDE7',
                  color: 'black',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                Login
              </Button>
              <SettingsIcon sx={{ marginLeft: '15px', color: '#808080' }} />
            </Toolbar>
          </AppBar>
        </React.Fragment>
      </div>
      <LoginModal open={loginOpen} onClose={closeLoginModal} onSignup={openSignupModal} onForget={openForgetModal} />
      <SignupModal
        open={signupOpen}
        onClose={closeSignupModal}
        onLogin={openLoginModal}
        openConfirmAccountModal={openConfirmAccountModal}
      />
      <ForgetModal open={forgetOpen} onClose={closeForgetModal} openVerificationModal={openVerificationModal} />
      <VerificationModal
        open={verificationOpen}
        onClose={closeVerificationModal}
        openResetpasswordModal={openResetpasswordModal}
        email={forgetEmail}
      />
      <ResetPasswordModal
        open={resetpasswordOpen}
        onClose={closeResetpasswordModal}
        verificationcode={resetPasswordCode}
        email={resetEmail}
        onResettoLogin={onResettoLogin}
      />
      <ConfirmAccountModal
        open={confirmaccountOpen}
        onClose={closeConfirmAccountModal}
        email={confirmAccountEmail}
        onConfirmtoLogin={onConfirmtoLogin}
      />
    </div>
  );
};

export default Navbar;
