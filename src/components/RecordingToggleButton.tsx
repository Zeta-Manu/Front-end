import React, { useState } from 'react';

interface RecordingToggleButtonProps {
  onToggle: (isRecording: boolean) => void;
  className?: string;
}

const RecordingToggleButton: React.FC<RecordingToggleButtonProps> = ({ onToggle, className }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleToggle = () => {
    setIsRecording(!isRecording);
    onToggle(!isRecording);
  };

  return (
    <button onClick={handleToggle} className={className}>
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
};

export default RecordingToggleButton;
