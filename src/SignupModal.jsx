import { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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
        width: isDesktop ? '550px' : '100%',
        minHeight: isDesktop ? 'auto' : '150px',
        padding: isDesktop ? '40px' : '10px'
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

SignupModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    onLogin: PropTypes.func.isRequired,
    onRegisterRequested: PropTypes.func,
    onConfirmaccount: PropTypes.func
};

export default function SignupModal({ open, children, onClose, onLogin, onRegisterRequested, onConfirmaccount }) {
    const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);
    const [username, setUsername] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [localRegisterError, setLocalRegisterError] = useState()

    useEffect(() => {
        const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
        const handleResize = () => setIsDesktop(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', handleResize);
        return () => mediaQueryList.removeEventListener('change', handleResize);
    }, []);

    const MODAL_STYLES = getModalStyles(isDesktop);

    const onRegisterTrigger = () => {
        if (validate(passwordRepeat, password)) {
            onRegisterRequested({ password, username, email })
            console.log("Signup with username:", username);
            console.log("Signup with password:", password);
            console.log("Signup with email:", email);
            if (!localRegisterError) {
                onConfirmaccount();
            }
        } else {
            setLocalRegisterError("Password entries must match")
        }
    }

    useEffect(() => {
        if (!open) {
          // Reset username and password when modal closes
          setUsername('');
          setPassword('');
          setLocalRegisterError('');
          setPasswordRepeat('');
          setemail('');
        }
      }, [open]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onRegisterTrigger()
        }
    }

    const validate = (passwordRepeat, password) => {
        if (passwordRepeat !== password) {
            return false
        } else {
            return true;
        }
    }

    if (!open) return null

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
                        marginBottom: '10px',
                    }}
                >
                    <TextField fullWidth id="username" onKeyDown={onKeyDown}
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </Box>
                <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '3px' }}>Email</h5>
                <Box
                    sx={{
                        width: '710px',
                        maxWidth: '100%',
                        borderRadius: '12px',
                        marginTop: '1px'
                    }}
                >
                    <TextField fullWidth id="email" onKeyDown={onKeyDown}
                        value={email} onChange={(e) => setemail(e.target.value)} />
                </Box>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ width: 'calc(50% - 8px)', marginRight: '8px' }}>
                        <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '5px' }}>Password</h5>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                borderRadius: '12px',
                                marginTop: '1px'
                            }}
                        >
                            <TextField fullWidth id="password" onKeyDown={onKeyDown}
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                    </div>
                    <div style={{ width: 'calc(50% - 8px)' }}>
                        <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '5px' }}>Confirm Password</h5>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                borderRadius: '12px',
                                marginTop: '1px'
                            }}
                        >
                            <TextField fullWidth id="repassword" onKeyDown={onKeyDown}
                                value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                        </Box>
                    </div>
                </div>
                <FormControlLabel
                    sx={{ marginTop: '15px' }}
                    control={<Checkbox
                        sx={{
                            color: "#111111",
                            '&.Mui-checked': {
                                color: '#111111',
                            },
                        }}
                    />}
                    label={
                        <h5 style={{ display: 'inline-block' }}>
                            By creating an account, you agree to the <u>Terms of use</u> and <u>Privacy Policy</u>.
                        </h5>
                    }
                />
                {localRegisterError && <div style={errorStyles}>{localRegisterError}</div>}
                <div className="flex justify-center w-full mt-5">
                    <button onClick={onRegisterTrigger} className="bg-[#EB9980] text-white font-semibold py-5 px-40 rounded hover:text-white hover:bg-[#FFC6B4]">Signup</button>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <h5 className='text-[#111111] text-center font-light' style={{ marginTop: '10px' }}>Already have an account? </h5>
                    <h5 onClick={onLogin} className='text-[#111111] text-center font-semibold border-b border-black ml-2' style={{ marginTop: '10px' }}>Login</h5>
                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}