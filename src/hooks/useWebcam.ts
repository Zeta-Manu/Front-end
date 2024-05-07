import { useState } from 'react';

interface useWebcamReturn {
    streamActive: boolean;
    handleStream: () => void;
}

export const useWebcam = (): useWebcamReturn => {
    const [streamActive, setStreamActive] = useState<boolean>(false);

    const handleStream = () => {
        setStreamActive((prevState) => !prevState);
    };

    return { streamActive, handleStream };
}