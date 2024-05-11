import { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { authInstance } from '../../services/api/auth';

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
ResetPasswordModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    onVerification: PropTypes.func,
    verificationcode: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onResettoLogin: PropTypes.func
};

export default function ResetPasswordModal({ open, children, onClose, verificationcode, email, onResettoLogin }) {
    const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);
    const [newpwd, setnewpwd] = useState('');
    const [confirmpwd, setconfirmpwd] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
        const handleResize = () => setIsDesktop(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', handleResize);
        return () => mediaQueryList.removeEventListener('change', handleResize);
    }, []);

    const MODAL_STYLES = getModalStyles(isDesktop);

    const sendResetpassword = async (verificationcode, email, newpwd) => {

        setError(null);

        if (newpwd !== confirmpwd) {
            setError('Passwords do not match');
            return;
        }

        const resetData = {
            confirmation_code: verificationcode,
            email: email,
            new_password: newpwd
        };

        if (!validate(newpwd, confirmpwd)) {
            return;
        }

        try {
            const response = await authInstance.postConfirmForget(resetData);
            onResettoLogin()
            console.log('reset password success')
            console.log('Response:', response);
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Bad Request');
                        break;
                    case 500:
                        setError('Internal Server Error');
                        break;
                    default:
                        setError('Unknown error');
                }
            }
        }
    }

    const validate = (passwordRepeat, password) => {
        if (passwordRepeat !== password) {
            setError("Password entries must match")
            return false;
        } else if (password.length < 8) { //min length 8 char
            setError("Password must contain at least 8 characters")
            return false;
        } else if (!/\d/.test(password)) { //not contain number
            setError("Password must contain at least 1 number")
            return false;
        } else if (!/[!@#$%^&*]/.test(password)) { //not contain special char
            setError("Password must contain at least 1 specific character")
            return false;
        } else if (!/[A-Z]/.test(password)) { //no uppercase
            setError("Password must contain at least 1 uppercase letter")
            return false;
        } else if (!/[a-z]/.test(password)) { //no lowercase
            setError("Password must contain at least 1 lowercase letter")
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <div className='relative flex w-full items-center'>
                    <ArrowBackIosNewIcon onClick={onClose} className='absolute top-1/2 left-4 transform -translate-y-1/2' style={{ cursor: 'pointer' }} />
                    <h4 className='text-black text-center text-4xl font-bold my-2 w-full'>Reset Password</h4>
                </div>
                {children}
                <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '12px' }}>Enter New Password</h5>
                <Box
                    sx={{
                        width: '710px',
                        maxWidth: '100%',
                        borderRadius: '12px',
                        marginTop: '1px',
                        marginBottom: '10px',
                    }}
                >
                    <TextField fullWidth id="newpwd"
                        value={newpwd} onChange={(e) => setnewpwd(e.target.value)} />
                </Box>
                <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '12px' }}>Confirm Password</h5>
                <Box
                    sx={{
                        width: '710px',
                        maxWidth: '100%',
                        borderRadius: '12px',
                        marginTop: '1px',
                        marginBottom: '10px',
                    }}
                >
                    <TextField fullWidth id="confirmpwd"
                        value={confirmpwd} onChange={(e) => setconfirmpwd(e.target.value)} />
                </Box>
                <div className="flex justify-center w-full mt-5">
                    <button onClick={() => sendResetpassword(verificationcode, email, newpwd)} className="bg-[#EB9980] text-white font-semibold py-5 px-40 rounded-full hover:text-white hover:bg-[#FFC6B4]">Send</button>
                </div>
                {error && (
                    <div style={errorStyles}>{error}</div>
                )}
            </div>
        </>,
        document.getElementById('portal')
    )
}