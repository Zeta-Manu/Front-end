
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';
import { useAuth } from "./AuthProvider";

const errorStyles = {
    padding: '15px 0',
    fontSize: '13px',
    color: 'red',
};
const VideoPreview = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) {
        return null;
    }

    return <video ref={videoRef} autoPlay playsInline />;
};

VideoPreview.propTypes = {
    stream: PropTypes.instanceOf(MediaStream),
};

const Prediction = () => {
    const webcamRef = useRef(null);
    const [streamActive, setStreamActive] = useState(false);
    const { startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ audio: false, video: true, type: "video/mp4" }); //status
    const [showRecordedVideo, setShowRecordedVideo] = useState(false);
    /*const [recordBlobUrl, setRecordBlobUrl] = useState(null);*/
    const [confident, setConfident] = useState(0); //from backend
    const [awaitUpload, setAwaitUpload] = useState(false);
    const [error, setError] = useState('');
    const [topResults, setTopResults] = useState([]);
    const [trackReq, setTrackReq] = useState(false);

    const { access_token } = useAuth();
    const { userEmail } = useAuth();

    const handleStream = async () => {
        setStreamActive((prevState) => !prevState);
    }

    const [stream, setStream] = useState(null);

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(stream);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        getCameraStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [stream]);

    const handlestartRecording = async () => {
        try {
            await startRecording();
            console.log('Recording started');
            setAwaitUpload(true);
        } catch (error) {
            console.error('Error starting recording', error);
        }
    }
    /*
    const handleStopRecording = async () => {
        try {
            const recordedBlob = await stopRecording();
            if (!recordedBlob) {
                console.error('No recorded blob found');
                return;
            }
            const blobUrl = URL.createObjectURL(recordedBlob);
            setRecordBlobUrl(blobUrl);
            console.log('Recording stopped, blob:', recordedBlob);
            uploadVideo(recordedBlob);
            downloadBlob(recordedBlob);
        } catch (error) {
            console.error('Error stopping recording', error);
        }
    };*/

    const processResult = (result) => {
        if (result.length <= 3) {
            setTopResults(result);
        } else {
            // sort array by count
            const sortedResults = result.sort((a, b) => b.count - a.count);
            //top3
            const topThreeResults = sortedResults.slice(0, 3);
            setTopResults(topThreeResults);
        }
    };

    const handleStopRecording = async () => {
        try {
            await stopRecording();
            console.log('Recording stopped, blob:', mediaBlobUrl);
            setAwaitUpload(false);
            setTrackReq(true);
            // uploadVideo(mediaBlobUrl);
            // downloadBlob(mediaBlobUrl);
        } catch (error) {
            console.error('Error stopping recording', error);
        }
    };

    useEffect(() => {
        if (!awaitUpload && mediaBlobUrl != undefined) {
            console.log(mediaBlobUrl)
            uploadVideo(mediaBlobUrl);
            /*downloadBlob(mediaBlobUrl);*/
        }
    }, [mediaBlobUrl, awaitUpload])

    const uploadVideo = (blobUrl) => {
        //videoname
        const randomName = userEmail + Math.random().toString(36).substring(7) + '.mp4';

        fetch(blobUrl)
            .then((res) => res.blob())
            .then((blob) => {
                const formData = new FormData();
                formData.append('video', blob, randomName);

                fetch(import.meta.env.VITE_PREDICT_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + access_token
                    },
                    body: formData,
                    timeout: 200000
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log('sendvideo success');
                            return response.json();
                        } else if (response.status === 400) {
                            setError('Bad request');
                        } else {
                            setError('An unexpected error occurred. Please try again.');
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        console.log(data.result);
                        processResult(data.result);
                        setTrackReq(false);
                    })
                    .catch((error) => {
                        console.error('Sending error:', error);
                        throw error;
                    });
            })
            .catch((error) => {
                console.error('Error fetching blob:', error);
                throw error;
            });
    };

    /*const downloadBlob = (blobUrl) => {
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "recorded-video.mp4";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };*/

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

    const changeConfident = (index) => {
        setConfident(Math.round(topResults[index].average * 100));
    };
    

    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col w-2/3 mt-20 mx-10">
                <div className="flex w-full h-3/4 overflow-hidden bg-[#9EB3CD] border-black border-2 -mx-4 mt-2 relative">
                    <ReactMediaRecorder
                        video
                        render={() => {
                            if (streamActive) {
                                return (
                                    <div className="flex justify-center items-center w-[98%]">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={{ facingMode: "user" }}
                                        />
                                    </div>
                                );
                            }
                            return (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h1 className="text-center text-black font-italic">Waiting for input...</h1>
                                </div>
                            );
                        }}
                    />
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
                <button onClick={() => setShowRecordedVideo(!showRecordedVideo)}>Preview</button>
                {error && (
                    <div style={errorStyles}>{error}</div>
                )}
                {showRecordedVideo && (
                    <div>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            </div>
            <div className="flex  flex-col w-1/3 h-9/10 mt-20">
                <h1 className="text-black mx-10 mt-2 font-bold">Translation</h1>
                <div className="flex flex-col h-3/6 bg-[#EDEDED] mx-10 mt-1 rounded-lg p-5"> {/*#F7F7F7*/}
                {trackReq ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        topResults.length > 0 ? (
                            topResults.map((result, index) => (
                                <div key={index} className="bg-[#EDEDED] h-1/3 p-2 my-2 hover:bg-[#f1f5f9]" onClick={() => changeConfident(index)}>
                                    <p>Handsign: {result.class}</p>
                                    <p>ภาษามือ: {result.translated}</p>
                                    <p className="text-sm">Accuracy: {(result.average*100).toFixed(2)} %</p>
                                </div>
                            ))
                        ) : (
                            <h1 className="text-black font-italic">Translation...</h1>
                        ))
                    }
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


export default Prediction;