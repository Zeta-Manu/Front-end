import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { useAuth } from '../components/AuthProvider';
import ProtectedModal from './ProtectedModal';

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();
    const [isProtectModalOpen, setIsProtectModalOpen] = useState(!isLoggedIn);

    const closeProtectModal = () => {
        setIsProtectModalOpen(false);
    };


    return isLoggedIn ? <Outlet /> : (isProtectModalOpen && <ProtectedModal open={isProtectModalOpen} onClose={closeProtectModal} />);

}

export default ProtectedRoutes