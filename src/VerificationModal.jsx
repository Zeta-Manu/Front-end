import { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

VerificationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    onResetpwd: PropTypes.func
};

export default function VerificationModal({ open, children, onClose, onResetpwd }) {
    const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);
    const [verificationcode, setVerificationcode] = useState('');

    useEffect(() => {
        const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
        const handleResize = () => setIsDesktop(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', handleResize);
        return () => mediaQueryList.removeEventListener('change', handleResize);
    }, []);

    const MODAL_STYLES = getModalStyles(isDesktop);

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <div className='relative flex w-full items-center'>
                    <ArrowBackIosNewIcon onClick={onClose} className='absolute top-1/2 left-4 transform -translate-y-1/2' style={{ cursor: 'pointer' }} />
                    <h4 className='text-black text-center text-4xl font-bold my-2 w-full'>Verification</h4>
                </div>
                {children}
                <h5 className='text-[#A3A3A3] text-left font-normal' style={{ marginTop: '10px' }}>A verification code has been sent to your email.</h5>
                <h5 className='text-[#666666] text-left font-normal' style={{ marginTop: '12px' }}>Enter Verification Code</h5>
                <Box
                    sx={{
                        width: '710px',
                        maxWidth: '100%',
                        borderRadius: '12px',
                        marginTop: '1px',
                        marginBottom: '10px',
                    }}
                >
                    <TextField fullWidth id="verificationcode"
                        value={verificationcode} onChange={(e) => setVerificationcode(e.target.value)} />
                </Box>
                <h5 onClick={onClose} className='text-[#111111] text-right ml-auto' style={{ marginTop: '10px' }}>
                    <span className='font-normal'>If you did not receive a code!</span>
                    {' '}
                    <span className='font-semibold border-b border-black '>Resend</span>
                </h5>
                <div className="flex justify-center w-full mt-5">
                    <button onClick={onResetpwd} className="bg-[#EB9980] text-white font-semibold py-5 px-40 rounded-full hover:text-white hover:bg-[#FFC6B4]">Send</button>
                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}