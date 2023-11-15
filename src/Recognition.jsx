import { useRef, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Recognition = () => {
  const userVideo = useRef();
  const [streamActive, setStreamActive] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const confident = 100; //from backend



  /*function to on/off stream*/
  const handleStream = async () => {
    if (!streamActive) { /*stream currently not active=>turn on*/
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStreamActive(true);
        userVideo.current.srcObject = stream;
        console.log('streamActive:', streamActive);
      } catch (error) {
        console.error('Error accessing user camera', error);
      }
    } else { /*stream currently active=>change to turn off*/
      const stream = userVideo.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      userVideo.current.srcObject = null;
      setStreamActive(false);
      console.log('streamActive:', streamActive);
    }
  }

  /*recording part*/
  const startRecording = () => {
    const stream = userVideo.current.srcObject;
    const recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
        console.log('Received Chunk Video:', event.data);
      }
    };

    // recorder.onstop = () => {
    //   const blob = new Blob(chunks, { type: 'video/mp4' });
    //   const videoUrl = URL.createObjectURL(blob);
    //   console.log('Recording Finished. Video URL:', videoUrl);

    //   //temporary download link
    //   const a = document.createElement('a');
    //   a.href = videoUrl;
    //   a.download = 'recorded-video.mp4';
    //   a.style.display = 'none';
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   uploadVideo(videoUrl);
    // };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });

      console.log('Recording Finished',blob);

      uploadVideo(blob);
    };

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

    // const uploadVideo = async (videoUrl) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/postVideo', {
  //       method: 'POST',
  //       mode: "cors",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // You might need additional headers depending on your backend requirements
  //       },
  //       body: JSON.stringify({ videoUrl }), // Send the video URL in the request body
  //     });

  //     if (response.ok) {
  //       const result = await response.json();

  //       // Check the status code from the backend
  //       if (result.statusCode === 200) {
  //         console.log('File uploaded successfully!');
  //       } else {
  //         console.error('Failed to upload video. Status:', result.statusCode);
  //         // Handle failure
  //       }
  //     } else if (response.status === 400) {
  //       console.error('Bad Request. Please check your request payload.');
  //       // Handle Bad Request
  //     } else {
  //       console.error('Internal Server Error. Please try again later.');
  //       // Handle Internal Server Error
  //     }
  //   } catch (error) {
  //     console.error('Error uploading video:', error);
  //   }
  // };


    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
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
    <div className="fixed flex w-screen h-screen">
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
      <div className="flex flex-col w-2/3 mt-20">
        <div className="flex w-full h-3/4 overflow-hidden bg-[#9EB3CD] border-black border-2 -mx-4 mt-2 relative">
          <video ref={userVideo} autoPlay playsInline className="w-full h-full" />
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
            <button onClick={startRecording} className="rounded flex-1 mx-2 bg-blue-800 text-white border-2 border-blue-800 hover:bg-white hover:text-blue-800">Start Recording</button>
          )}
          {streamActive && (
            <button onClick={stopRecording} className="rounded flex-1 mx-2 bg-blue-800 text-white border-2 border-blue-800 hover:bg-white hover:text-blue-800">Stop Recording</button>
          )}
        </div>
      </div>
    </div>
  );
}


export default Recognition;
/*import { useReactMediaRecorder } from "react-media-recorder";

const Recognition = () => {

    const {status,startRecording,stopRecording,mediaBlobUrl} = useReactMediaRecorder({video:true})

    return(
        <div>
          <p>{status}</p>
          <div className="overflow-hidden">
                <div className="flex items-center justify-center">
                    <video src={mediaBlobUrl} controls autoPlay loop className="bg-black w-full max-w-screen-lg h-657 mb-4" />
                </div>
            <div className="flex justify-center items-center -mx-4">
                <button onClick={startRecording} className="mx-8 flex-1 bg-gradient-to-br from-teal-400 to-purple-500 p-4 text-lg transition duration-20 hover:opacity-85 disabled:opacity-50">Start</button>
                <button onClick={stopRecording} className="mx-8 flex-1 bg-gradient-to-br from-teal-400 to-purple-500 p-4 text-lg transition duration-20 hover:opacity-85 disabled:opacity-50">Stop</button>
            </div>
          </div>
        </div>
   );
}
  
  export default Recognition;*/