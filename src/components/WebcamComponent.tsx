import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  const webcamRef = useRef<Webcam>(null);

  return (
    <div className="flex justify-center items-center w-[100%]">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: 'user' }} />
    </div>
  );
};

export default WebcamComponent;
