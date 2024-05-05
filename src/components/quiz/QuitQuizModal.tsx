import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const getModalStyles = (isDesktop: boolean): React.CSSProperties => ({
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
});

const OVERLAY_STYLES: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(217, 217, 217, 0.5)',
  backdropFilter: 'blur(8px)',
  zIndex: 1000,
};

interface QuitQuizModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

QuitQuizModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default function QuitQuizModal({ open, children, onClose }: QuitQuizModalProps) {
  const [isDesktop, setIsDesktop] = useState(window.matchMedia(DESKTOP_MEDIA_QUERY).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleResize = () => setIsDesktop(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleResize);
    return () => mediaQueryList.removeEventListener('change', handleResize);
  }, []);

  const MODAL_STYLES = getModalStyles(isDesktop);

  if (!open) return null;

  const portalTarget = document.getElementById('portal');
  if (!portalTarget) {
    throw new Error("Portal target element 'portal' does not exist.");
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="relative flex-col w-full">
          <div className="flex items-center w-full h-[33%] bg-[#5F81AD] rounded-t-[36px]">
            <ExitToAppIcon
              fontSize="large"
              style={{ marginLeft: '25px', color: 'white', marginTop: '20px', marginBottom: '20px' }}
            />
            <h4 className="text-white ml-5 text-2xl font-semibold">Exit the quiz?</h4>
          </div>
          <div className="flex items-center justify-center w-full h-[33%] bg-white">
            <h5 className="text-black text-lg font-medium mx-20 my-6">
              Your progress will not be saved. Are you sure you want to exit the quiz?
            </h5>
          </div>
          <div className="flex justify-end w-full h-[33%] items-center bg-white rounded-b-[36px] pr-4 mb-4">
            <button
              onClick={onClose}
              className="mr-4 p-2 px-5 bg-white border border-[#525252] rounded-[30px] text-[#525252] hover:bg-[#525252] hover:text-white"
            >
              Cancel
            </button>
            <Link to="/learning">
              <button
                onClick={onClose}
                className="mr-4 p-2 px-5 bg-[#5F81AD] border border-[#5F81AD] rounded-[30px] text-white hover:bg-white hover:text-[#5F81AD] "
              >
                OK
              </button>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>,
    portalTarget,
  );
}
