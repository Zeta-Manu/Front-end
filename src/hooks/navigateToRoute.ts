import { useNavigate } from 'react-router-dom';

export const useNavigateToRoute = (targetRoute: string) => {
    const navigate = useNavigate();

    const navigateToTarget = () => {
        navigate(targetRoute);
    };

    return { navigateToTarget };
};