import { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';
function getModalStyles(isDesktop) {
  return {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderColor: '#C9C9C9',
    borderRadius: '25px',
    alignItems: 'flex-start',
    width: isDesktop ? '450px' : '100%',
    minHeight: isDesktop ? 'auto' : '150px',
    padding: isDesktop ? '50px' : '15px'
  };
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.22)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000
}
const errorStyles = {
  padding: '15px 0',
  fontSize: '13px',
  color: 'red',
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  onSignup: PropTypes.func.isRequired,
  onLoginRequested: PropTypes.func,
  loginError: PropTypes.string,
  clearLoginError: PropTypes.func,
  setLoginError: PropTypes.func,
  onForget: PropTypes.func
};

export default function LoginModal({ open, children, onClose, onSignup, onLoginRequested, loginError, setLoginError, onForget }) {
  const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleResize = () => setIsDesktop(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleResize);
    return () => mediaQueryList.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (!open) {
      // Reset username and password when modal closes
      setUsername('');
      setPassword('');
      setLoginError('');
    }
  }, [open, setLoginError]);

  if (!open) return null

  const MODAL_STYLES = getModalStyles(isDesktop);

  const handleLogin = async () => {
    try {
      await onLoginRequested({ username, password });
      console.log("Logging in with username:", username);
      console.log("Logging in with password:", password);
      if (!loginError) {
        console.log("Successfully login");
      }
    } catch (e) {
      setLoginError(e.toString());
      console.error("Login error:", e);
    }
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <CancelIcon onClick={onClose} sx={{ color: "#444444" }} style={{ cursor: 'pointer', marginLeft: 'auto' }} />
        <h3 className='text-black text-5xl font-bold my-2 text-left' style={{ marginTop: '1px' }}>MANU</h3>
        {children}
        <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '3px' }}>Name</h5>
        <Box
          sx={{
            width: '710px',
            maxWidth: '100%',
            borderRadius: '12px',
            marginTop: '1px',
            marginBottom: '10px'
          }}
        >
          <TextField fullWidth id="username" value={username}
            onChange={(e) => setUsername(e.target.value)} onKeyDown={onKeyDown} />
        </Box>
        <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '3px' }}>Password</h5>
        <Box
          sx={{
            width: '710px',
            maxWidth: '100%',
            borderRadius: '12px',
            marginTop: '1px'
          }}
        >
          <TextField fullWidth id="password" value={password}
            onChange={(e) => setPassword(e.target.value)} onKeyDown={onKeyDown} />
        </Box>
        <h5 onClick={onForget} className='text-[#111111] text-right font-medium border-b border-black ml-auto' style={{ marginTop: '10px' }}>Forget your password</h5>
        {loginError && <div className="error" style={errorStyles}>{loginError}</div>}
        <div className="w-[705px] items-center justify-center mt-8 mb-0">
          <button onClick={handleLogin} className="bg-[#EB9980] text-white font-semibold py-5 px-40 rounded hover:text-white hover:bg-[#FFC6B4]">Login</button>
        </div>
        <div className='flex justify-center items-center w-full'>
          <h5 className='text-[#111111] text-center font-light' style={{ marginTop: '10px' }}>Don’t have an account?</h5>
          <h5 onClick={onSignup} className='text-[#111111] text-center font-semibold border-b border-black ml-2' style={{ marginTop: '10px' }}>Signup</h5>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}