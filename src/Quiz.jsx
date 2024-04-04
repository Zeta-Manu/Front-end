import React, { useState } from "react";
import { AppBar, Box, Toolbar, TextField  } from '@mui/material';
import logo from './assets/logo.svg'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SchoolIcon from '@mui/icons-material/School';


const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showFinalResults, setFinalResults] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer]= useState('')


    return (
        <div className="flex w-screen h-screen">
            <div className="sticky top-0 flex justify-center items-center">
                <div className="w-2/3">
                    <React.Fragment>
                        <AppBar sx={{ background: "#C5DFE7", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Toolbar>
                                <ArrowBackIosNewIcon sx={{ marginLeft: '6px', color: 'black' }} />
                                <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginLeft: '20px' }} />
                                <div className="text-xl text-black font-nunito-sans mx-4 z-20">Chapter 1.1</div>
                                <SchoolIcon fontSize="large" sx={{ color: '#EB9980', marginLeft: '4px' }} />
                                <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="text-xl text-black font-nunito-sans">{currentQuestion + 1}/10</div>
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
                    <TextField fullWidth id="answer" label="answer"  value={answer}
                        onChange={(e) => setAnswer(e.target.value)} />
                </Box>
                <div className="flex h-2/6 w-full justify-center mt-10">
                    <button className="w-1/6 h-1/4 text-xl text-white font-semibold bg-[#EB9980] rounded-lg hover:text-white hover:bg-[#FFC6B4]">Submit</button>
                </div>


            </div>
        </div>
    );
}

export default Quiz;
