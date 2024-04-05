import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import QuizIcon from '@mui/icons-material/Quiz';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";

const Learning = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };

    return (
        <div className="flex-col w-screen h-screen">
            <div className='flex h-1/6 w-full mt-24 mx-20 pt-2'>
                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black shadow-lg'>
                    <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
                <div className='w-8/12 h-5/6 bg-[#C5DFE7] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>Chapter 1 : Sign Language for Daily Living</h1>
                </div>

            </div>

            <div className='flex h-1/6 w-full mt-2 mx-20 pt-2'>
                <div className='w-1/12 mr-10'></div>
                <div className='w-8/12 h-5/6 bg-[#D8E9EE] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>1.1 : Basic for Sign Language</h1>
                </div>
                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black ml-4 hover:bg-[#749CC5] shadow-lg'>
                    <AutoStoriesIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
            </div>


            <div className='flex h-1/6 w-full mt-2 mx-20 pt-2'>
                <div className='w-1/12 mr-10'></div>
                <div className='w-8/12 h-5/6 bg-[#D8E9EE] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>1.2 : Quiz</h1>
                </div>

                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black ml-4 hover:bg-[#749CC5] shadow-lg'>
                    <Link to="/quiz" className="w-full h-full flex items-center justify-center" style={{ textDecoration: 'none', color: 'transparent' }} onClick={scrollToTop}>
                        <QuizIcon fontSize="large" sx={{ color: 'white' }} />
                    </Link>
                </div>
            </div>


            <div className='flex h-1/6 w-full mt-4 mx-20 pt-2'>
                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black shadow-lg'>
                    <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
                </div>

                <div className='w-8/12 h-5/6 bg-[#C5DFE7] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>Chapter 2 : Sign Language for Education</h1>
                </div>

            </div>

            <div className='flex h-1/6 w-full mt-2 mx-20 pt-2'>
                <div className='w-1/12 mr-10'></div>
                <div className='w-8/12 h-5/6 bg-[#D8E9EE] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>2.1 : The World of Technology  </h1>
                </div>
                <div className='w-1/12 h-5/6 bg-[#D9D9D9] flex rounded-2xl items-center justify-center ml-4 shadow-lg'>
                    <LockIcon fontSize="large" sx={{ color: '#AFAFAF' }} />
                </div>
            </div>

            <div className='flex h-1/6 w-full mt-2 mx-20 pt-2'>
                <div className='w-1/12 mr-10'></div>
                <div className='w-8/12 h-5/6 bg-[#D8E9EE] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>2.2 : Quiz</h1>
                </div>
                <div className='w-1/12 h-5/6 bg-[#D9D9D9] flex rounded-2xl items-center justify-center ml-4 shadow-lg'>
                    <LockIcon fontSize="large" sx={{ color: '#AFAFAF' }} />
                </div>
            </div>

        </div>
    );
}

export default Learning;



