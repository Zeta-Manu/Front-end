import { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from 'react-router-dom';

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
        borderRadius: '36px',
        alignItems: 'flex-start',
        width: isDesktop ? '500px' : '100%',
        minHeight: isDesktop ? 'auto' : '100%',
        padding: '0',
        margin: '0',
    };
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000
}

FinalResultsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    score: PropTypes.number.isRequired,
    finalquestion: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired
};

export default function FinalResultsModal({ open, children, score, onClose, finalquestion, onRestart }) {
    const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);

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
                <div className='relative flex-col w-full'>
                    <div className='flex items-center justify-center w-full h-[33%] bg-[#5F81AD] rounded-t-[36px]'>
                        <EmojiEventsIcon fontSize="large" style={{ color: 'white', marginTop: '20px', marginBottom: '20px', }} />
                        <h4 className='text-white ml-4 text-2xl font-semibold'>Final Result</h4>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full h-[33%] bg-white'>
                        <h5 className='text-black text-lg font-medium mx-20 mt-6 mb-2'>{score} out of {finalquestion}</h5>
                        <h5 className='text-black text-lg font-medium mx-20 mb-6'>correct - ({(score / finalquestion) * 100}%)</h5>
                    </div>
                    <div className='flex justify-end w-full h-[33%] items-center bg-white rounded-b-[36px] pr-4 mb-4'>
                        <Link to="/learning"><button onClick={onClose} className='mr-4 p-2 px-5 bg-white border border-[#525252] rounded-[30px] text-[#525252] hover:bg-[#525252] hover:text-white'>Exit</button></Link>
                        <button onClick={onRestart} className='mr-4 p-2 px-5 bg-[#5F81AD] border border-[#5F81AD] rounded-[30px] text-white hover:bg-white hover:text-[#5F81AD] '>Restart</button>
                    </div>
                </div>
                {children}

            </div>
        </>,
        document.getElementById('portal')
    )
}