import { useState, useRef } from "react";
import { useRecordWebcam } from 'react-record-webcam'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Translation = () => {
    const { createRecording, openCamera, startRecording, stopRecording, closeCamera } = useRecordWebcam({
        options: { fileName: 'test-filename', fileType: 'mp4' },
        mediaRecorderOptions: { mimeType: 'video/mp4; codecs=avc1.4D401F' },
        mediaTrackConstraints: { video: true }
    });
    const [streamActive, setStreamActive] = useState(false);
    const confident = 100; //from backend
    const [recording, setRecording] = useState(null);
    const webcamRef = useRef();

    const handleStream = async () => {
        if (!streamActive) { /*stream currently not active=>turn on*/
            try {
                const recording = await createRecording();
                await openCamera(recording.id);
                setRecording(recording);
                setStreamActive(true);
                console.log('streamActive:', streamActive);
            } catch (error) {
                console.error('Error accessing user camera', error);
            }
        } else { /*stream currently active=>change to turn off*/
            await closeCamera();
            setStreamActive(false);
            console.log('streamActive:', streamActive);
        }
    }

    const handlestartRecording = async () => {
        try {
            recording.webcamRef = webcamRef.current;
            await startRecording(recording.id);
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording', error);
        }
    }

    const handleStopRecording = async () => {
        try {
            const recordedBlob = await stopRecording(recording.id);
            console.log('Recording stopped, blob:', recordedBlob);
            uploadVideo(recordedBlob);
        } catch (error) {
            console.error('Error stopping recording', error);
        }
    }

    const uploadVideo = async (videoBlob) => {
        try {
            const formData = new FormData();

            formData.append('video', videoBlob, 'recorded-video.mp4');

            const response = await fetch('http://localhost:8080/api/postVideo', {
                method: 'POST',
                mode: 'cors',
                body: formData,
            });

            const errorCode = response.status;

            switch (errorCode) {
                case 200:
                    console.log("success")
                    break;
                case 400:
                    console.error("...")
                    break;
                case 500:
                    console.error("Internal server error")
                    break;
                default:
                    console.error("Unknown error")
                    break;
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const getColor = (confident) => {
        let opacity;
        if (confident < 50) {
            opacity = (confident - 1) / 49;
            opacity = 1 - opacity;
            opacity = Math.max(opacity, 0.3);
            return `rgba(255, 0, 0, ${opacity})`; // Red=>inverse opacity
        } else if (confident >= 50 && confident <= 60) {
            opacity = (confident - 50) / 10;
            opacity = Math.max(opacity, 0.5);
            return `rgba(255, 204, 0, ${opacity})`; // Yellow
        } else {//61=>100
            opacity = (confident - 60) / 40;
            opacity = Math.max(opacity, 0.5);
            return `rgba(0, 255, 0, ${opacity})`; // Green
        }
    }





    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col w-2/3 mt-20 mx-10">
                <div className="flex w-full h-3/4 overflow-hidden bg-[#9EB3CD] border-black border-2 -mx-4 mt-2 relative">
                    {recording && (
                        <video ref={recording.webcamRef} autoPlay playsInline className="w-full h-full" />
                    )}
                    {!streamActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-center text-black font-italic">Waiting for input...</h1>
                        </div>
                    )}
                </div>
                <div className="w-full h-1/4 bottom-0 flex justify-center items-center -mx-4 mt-0 ">
                    <button onClick={handleStream} className="rounded mx-8 flex-1 bg-[#03a9f4] border-2 border-[#03a9f4] text-white hover:bg-white hover:text-[#03a9f4]">
                        {streamActive ? 'Turn off' : 'Turn on'}
                    </button>
                    {/* when stream active=> display Start Recording and Stop Recording Button */}
                    {streamActive && (
                        <button onClick={handlestartRecording} className="rounded flex-1 mx-2 bg-blue-800 text-white border-2 border-blue-800 hover:bg-white hover:text-blue-800">Start Recording</button>
                    )}
                    {streamActive && (
                        <button onClick={handleStopRecording} className="rounded flex-1 mx-2 bg-blue-800 text-white border-2 border-blue-800 hover:bg-white hover:text-blue-800">Stop Recording</button>
                    )}
                </div>
            </div>
            <div className="flex  flex-col w-1/3 h-9/10 mt-20">
                <h1 className="text-black mx-10 mt-2 font-bold">Translation</h1>
                <div className="flex h-3/6 bg-[#EDEDED] mx-10 mt-1 rounded-lg p-5"> {/*#F7F7F7*/}
                    <h1 className="text-black font-italic">Translation...</h1>
                </div>
                <div className="flex rounded-lg h-2/6 mx-10 mt-4 bg-[#e7f2f6] p-2"> {/*#222222, #F7F7F7*/}
                    <CircularProgressbar
                        value={confident}
                        text={`${confident}%`}
                        styles={{
                            root: {},
                            path: {
                                stroke: getColor(confident),
                                strokeLinecap: 'butt',
                                transition: 'stroke-dashoffset 0.5s east 0s',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            trail: {
                                stroke: '#d6d6d6',
                                strokeLinecap: 'butt',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            text: {
                                fill: getColor(confident), // Change text color dynamically
                                fontSize: '25px',
                                dominantBaseline: 'middle',
                                fontWeight: 'bold',
                                textAnchor: 'middle',
                            },
                            background: {
                                fill: '#3e98c7',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}


export default Translation;