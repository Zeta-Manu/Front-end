import recognition_icon from './assets/recognition.png'
import learn_icon from './assets/learn.png'
import stat_icon from './assets/stat.png'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="fixed flex justify-center items-center w-screen h-screen">
            <div className='text-lg flex'>
                <div className="w-80 h-96 flex flex-col rounded-2xl overflow-hidden mx-5">
                    <div className="h-1/3 bg-opacity-0"></div>
                    <div className="relative bg-[#313131] bg-opacity-20 backdrop-blur-2 border border-opacity-20 border-[#FFFFFF] rounded flex-1 flex flex-col">
                        <div className="h-2/3 flex items-center flex-col">
                            <div className="transform -translate-y-1/2 ring-5 ring-white w-40 h-40 rounded-full overflow-hidden z-30">
                                <img src={recognition_icon} alt="" className="object-cover w-full h-full rounded-full" />
                            </div>
                            <div className="flex flex-col items-center -mt-10 z-20 relative mb-1">
                                <h1 className="text-xl font-bold text-[#5E81AC] font-nunito-sans">Translation</h1>
                                <p className='text-black text-sm font-nunito-sans mt-2'>description</p>
                            </div>
                            <div className="absolute inset-0 bg-[#BCFDE7] rounded p-4 m-8 flex-1 flex flex-col z-10">
                                <Link to="/recognition">
                                    <button className="flex items-center justify-center z-20 relative"
                                    style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} >
                                        <ExpandCircleDownIcon style={{ transform: 'rotate(-90deg)', transition: 'color 0.3s' }} sx={{ color: '#5E81AC'}} fontSize="large" className="hover:text-blue-500" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-80 h-96 flex flex-col rounded-2xl overflow-hidden mx-5">
                    <div className="h-1/3 bg-opacity-0"></div>
                    <div className="relative bg-[#313131] bg-opacity-20 backdrop-blur-2 border border-opacity-20 border-[#FFFFFF] rounded flex-1 flex flex-col">
                        <div className="h-2/3 flex items-center flex-col">
                            <div className="transform -translate-y-1/2 ring-5 ring-white w-40 h-40 rounded-full overflow-hidden z-30">
                                <img src={learn_icon} alt="" className="object-cover w-full h-full rounded-full" />
                            </div>
                            <div className="flex flex-col items-center -mt-10 z-20 relative mb-1">
                                <h1 className="text-xl font-bold text-[#5E81AC] font-nunito-sans">Stats</h1>
                                <p className='text-black text-sm font-nunito-sans mt-2'>description</p>
                            </div>
                            <div className="absolute inset-0 bg-[#BCFDE7] rounded p-4 m-8 flex-1 flex flex-col z-10">
                                <Link to="/recognition">
                                    <button className="flex items-center justify-center z-20 relative"
                                    style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} >
                                        <ExpandCircleDownIcon style={{ transform: 'rotate(-90deg)', transition: 'color 0.3s' }} sx={{ color: '#5E81AC'}} fontSize="large" className="hover:text-blue-500" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-80 h-96 flex flex-col rounded-2xl overflow-hidden mx-5">
                    <div className="h-1/3 bg-opacity-0"></div>
                    <div className="relative bg-[#313131] bg-opacity-20 backdrop-blur-2 border border-opacity-20 border-[#FFFFFF] rounded flex-1 flex flex-col">
                        <div className="h-2/3 flex items-center flex-col">
                            <div className="transform -translate-y-1/2 ring-5 ring-white w-40 h-40 rounded-full overflow-hidden z-30">
                                <img src={stat_icon} alt="" className="object-cover w-full h-full rounded-full" />
                            </div>
                            <div className="flex flex-col items-center -mt-10 z-20 relative mb-1">
                                <h1 className="text-xl font-bold text-[#5E81AC] font-nunito-sans">Translation</h1>
                                <p className='text-black text-sm font-nunito-sans mt-2'>description</p>
                            </div>
                            <div className="absolute inset-0 bg-[#BCFDE7] rounded p-4 m-8 flex-1 flex flex-col z-10">
                                <Link to="/recognition">
                                    <button className="flex items-center justify-center z-20 relative"
                                    style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} >
                                        <ExpandCircleDownIcon style={{ transform: 'rotate(-90deg)', transition: 'color 0.3s' }} sx={{ color: '#5E81AC'}} fontSize="large" className="hover:text-blue-500" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;