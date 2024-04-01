import SchoolIcon from '@mui/icons-material/School';

const Learning = () => {

    /*const scrollToTop = () => {
        window.scrollTo(0, 0);
    };*/

    return (
        <div className="flex-col w-screen h-screen">
            <div className='flex h-1/6 w-full mt-24 mx-20 pt-2'>
                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black'>
                    <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
                <div className='w-8/12 h-5/6 bg-[#C5DFE7] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>Chapter 1 : Sign Language for Daily Living</h1>
                </div>

            </div>

            <div className='flex h-1/6 w-full mt-2 mx-20 pt-2'>
                <div className='w-1/12 mr-10'></div>
                <div className='w-8/12 h-5/6 bg-[#C5DFE7] rounded-2xl flex items-center ml-20'>
                    {/* title */}
                    <h1 className='text-xl ml-4 font-semibold'>Chapter 1 : Sign Language for Daily Living</h1>
                </div>
                <div className='w-1/12 h-5/6 bg-[#5F81AD] flex rounded-2xl items-center justify-center border-solid border border-black ml-4'>
                    <SchoolIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
            </div>
        </div>
    );
}

export default Learning;



