import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, TextField } from '@mui/material';
import logo from './assets/logo.svg'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SchoolIcon from '@mui/icons-material/School';
import QuitQuizModal from "./QuitQuizModal";
import FinalResultsModal from "./FinalResultsModal";


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showFinalResults, setFinalResults] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState('');
    const [quitOpen, setQuizOpen] = useState(false);
    const [finalScore, setFinalScore] = useState('');
    const [finalquestion, setfinalquestion] = useState('');

    const [questions, setQuestions] = useState([
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
        {
            signvideo: "https://d3108kdhfsx9kk.cloudfront.net/lesson/filebla.mp4",
            correctans: "computer"
        },
    ]);

    //submit answer
    const checkanswer = () => {
        const currentCorrectAns = questions[currentQuestion].correctans;
        const formatAnswer = (answer || '').trim().toLowerCase();
        const formatCorrectAns = currentCorrectAns.trim().toLowerCase();

        let updatedScore = score;

        if (formatAnswer === formatCorrectAns) {
            updatedScore += 1;
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            openFinalResults(updatedScore);
        }
        setScore(updatedScore);
        setAnswer('');
    }

    useEffect(() => {
        console.log("Score:", score);
    }, [score, currentQuestion, questions.length]);

    const openQuitModal = () => {
        setQuizOpen(true);
    };

    const closeQuitModal = () => {
        setQuizOpen(false);
    };

    const openFinalResults= (score) => {
        setFinalResults(true);
        setFinalScore(score);
        setfinalquestion(questions.length)
    };

    const closeFinalResults= () => {
        setFinalResults(false);
    };

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setFinalResults(false);
        setQuestions(shuffleArray(questions));
    };



    return (
        <div className="flex w-screen h-screen">
            <div className="sticky top-0 flex justify-center items-center">
                <div className="w-2/3">
                    <React.Fragment>
                        <AppBar sx={{ background: "#C5DFE7", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Toolbar>
                                <ArrowBackIosNewIcon onClick={openQuitModal} sx={{ marginLeft: '6px', color: 'black' }} />
                                <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginLeft: '20px' }} />
                                <div className="text-xl text-black font-nunito-sans mx-4 z-20">Chapter 1.1</div>
                                <SchoolIcon fontSize="large" sx={{ color: '#EB9980', marginLeft: '4px' }} />
                                <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="text-xl text-black font-nunito-sans">{currentQuestion + 1}/{questions.length}</div>
                                </div>
                            </Toolbar>
                        </AppBar>

                    </React.Fragment>
                </div>
            </div>
            <div className="flex-col w-screen h-screen">
                <div className="flex h-1/6 w-full mt-24 mx-5 pt-2 justify-center mx-20">
                    <div className="w-9/12 h-5/6 bg-[#E3F6FC] rounded-2xl flex items-center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <h1 className="text-xl font-bold text-black font-nunito-sans ml-10">Question{currentQuestion + 1}: What’s the meaning of this sign? </h1>
                    </div>
                </div>
                <div className="flex w-full h-1/3 justify-center items-center mt-5">
                    <div className="w-1/3 h-full overflow-hidden bg-[#9EB3CD]">
                        <video src={questions[currentQuestion].signvideo} autoPlay loop={true} muted playsInline />
                    </div>
                </div>
                <Box
                    sx={{
                        width: '550px',
                        maxWidth: '100%',
                        borderRadius: '12px',
                        margin: 'auto',
                        marginTop: '30px',
                    }}
                >
                    <TextField key={currentQuestion} fullWidth id="answer" label="answer" value={answer}
                        onChange={(e) => setAnswer(e.target.value)} />
                </Box>
                <div className="flex h-2/6 w-full justify-center mt-10">
                    <button onClick={checkanswer} className="w-1/6 h-1/4 text-xl text-white font-semibold bg-[#EB9980] rounded-lg hover:text-white hover:bg-[#FFC6B4]">Submit</button>
                </div>

            </div>
            <QuitQuizModal open={quitOpen} onClose={closeQuitModal} />
            <FinalResultsModal open={showFinalResults} score={parseInt(finalScore)} onClose={closeFinalResults} finalquestion={parseInt(finalquestion)} onRestart={restartGame} />
        </div>
    );
}

export default Quiz;
