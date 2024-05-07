import React, { useEffect, useRef, useState } from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

import { useAuth } from '@components/AuthProvider';
import { PredictResult } from '@customTypes/api/predict';
import WebcamComponent from '@components/WebcamComponent';
import { useWebcam } from '@hooks/useWebcam';
import RecordingToggleButton from '@components/RecordingToggleButton';

const errorStyles = {
  padding: '15px 0',
  fontSize: '13px',
  color: 'red',
};

interface VideoPreviewProps {
  stream: MediaStream | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

const Prediction: React.FC = () => {
  const { streamActive } = useWebcam();
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: false,
    video: true,
  });
  const [showRecordedVideo, setShowRecordedVideo] = useState<boolean>(false);
  const [confident, setConfident] = useState<number>(0);
  const [awaitUpload, setAwaitUpload] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [topResults, setTopResults] = useState<PredictResult[]>([]);
  const [trackReq, setTrackReq] = useState<boolean>(false);

  const { access_token, userEmail } = useAuth();

  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
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

  const processResult = (result: PredictResult[]) => {
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

  useEffect(() => {
    if (!awaitUpload && mediaBlobUrl != undefined) {
      console.log(mediaBlobUrl);
      uploadVideo(mediaBlobUrl);
      /*downloadBlob(mediaBlobUrl);*/
    }
  }, [mediaBlobUrl, awaitUpload]);

  const uploadVideo = (blobUrl: string) => {
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
            accept: 'application/json',
            Authorization: 'Bearer ' + access_token,
          },
          body: formData,
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

  const getColor = (confident: number): string => {
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
    } else {
      //61=>100
      opacity = (confident - 60) / 40;
      opacity = Math.max(opacity, 0.5);
      return `rgba(0, 255, 0, ${opacity})`; // Green
    }
  };

  const changeConfident = (index: number) => {
    setConfident(Math.round(topResults[index].average * 100));
  };

  // Fix: Add new state for the button
  const handleToggleRecording = async () => {
    try {
      if (streamActive) {
        await stopRecording();
        console.log('Recording stopped');
      } else {
        await startRecording();
        console.log('Recording started');
      }
      setAwaitUpload(true);
      setError('');
    } catch (error) {
      setError('An error occurred. Please try again. ');
      console.error('Recording error:', error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col w-2/3 mt-20 mx-10">
        <div className="flex w-full h-3/4 overflow-hidden bg-[#9EB3CD] border-black border-2 -mx-4 mt-2 relative">
          <ReactMediaRecorder video render={() => <WebcamComponent />} />
        </div>
        <div className="w-full h-1/4 bottom-0 flex justify-center items-center -mx-4 mt-0 ">
          <div className="w-full h-1/4 bottom-0 flex justify-center item-center -mx-4 mt-0">
            <RecordingToggleButton
              onToggle={handleToggleRecording}
              className="rounded mx-8 flex-1 bg-[#03a9f4] border-2 border-[#03a9f4] text-white hover:bg-white hover:text-[#03a9f4]"
            />
          </div>
        </div>
        <button onClick={() => setShowRecordedVideo(!showRecordedVideo)}>Preview</button>
        {error && <div style={errorStyles}>{error}</div>}
        {showRecordedVideo && (
          <div>
            <video src={mediaBlobUrl} controls autoPlay loop />
          </div>
        )}
      </div>
      <div className="flex  flex-col w-1/3 h-9/10 mt-20">
        <h1 className="text-black mx-10 mt-2 font-bold">Translation</h1>
        <div className="flex flex-col h-3/6 bg-[#EDEDED] mx-10 mt-1 rounded-lg p-5">
          {' '}
          {/*#F7F7F7*/}
          {trackReq ? (
            <div className="flex items-center justify-center h-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : topResults.length > 0 ? (
            topResults.map((result, index) => (
              <div
                key={index}
                className="bg-[#EDEDED] h-1/3 p-2 my-2 hover:bg-[#f1f5f9]"
                onClick={() => changeConfident(index)}
              >
                <p>Handsign: {result.class}</p>
                <p>ภาษามือ: {result.translated}</p>
                <p className="text-sm">Accuracy: {(result.average * 100).toFixed(2)} %</p>
              </div>
            ))
          ) : (
            <h1 className="text-black font-italic">Translation...</h1>
          )}
        </div>
        <div className="flex rounded-lg h-2/6 mx-10 mt-4 bg-[#e7f2f6] p-2">
          {' '}
          {/*#222222, #F7F7F7*/}
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
};

export default Prediction;
