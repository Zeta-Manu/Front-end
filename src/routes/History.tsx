import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BarChart } from '@mui/x-charts/BarChart';

import { useAuth } from '../components/AuthProvider';

const History = () => {

    const { userEmail } = useAuth();
    const username = userEmail.split('@')[0]; 

    const userdata = [
        {
            word: 'computer',
            frequency: 71,
            last_access: '12-02-2024'
        },
        {
            word: 'before',
            frequency: 62,
            last_access: '09-02-2024'
        },
        {
            word: 'cool',
            frequency: 62,
            last_access: '04-02-2024'
        },
        {
            word: 'drink',
            frequency: 58,
            last_access: '10-02-2024'
        },
        {
            word: 'go',
            frequency: 29,
            last_access: '01-02-2024'
        },
        {
            word: 'help',
            frequency: 25,
            last_access: '02-02-2024'
        },
        {
            word: 'who',
            frequency: 20,
            last_access: '02-01-2024'
        },
        {
            word: 'short',
            frequency: 20,
            last_access: '02-01-2024'
        },
        {
            word: 'thin',
            frequency: 12,
            last_access: '02-01-2024'
        },
        {
            word: 'cousin',
            frequency: 8,
            last_access: '21-01-2024'
        }
    ];

    const sortedData = userdata.sort((a, b) => b.frequency - a.frequency);

    const chartSetting = {
        width: 500,
        height: 350
    };

    return (
        <div className="flex justify-center w-screen h-screen bg-[#F7F7F9] mt-16">
            <div className='flex flex-col w-5/6 h-4/6 mt-16 mx-15 bg-[#FFFFFF] rounded-3xl border border-[#D9D9D9]'>
                <div className='flex w-full h-1/7 border-b border-[#D9D9D9]'>
                    <AccountCircleIcon sx={{ fontSize: 38, color: '#D9D9D9', marginLeft: '1.25rem', marginY: '0.75rem' }} />
                    <h1 className='my-4 ml-2 text-lg font-semibold text-black'>{username}</h1>
                </div>
                <div className='flex flex-row w-full h-full'>
                    <div className='flex flex-col w-3/5 h-full items-center'>
                        <h1 className='ml-2 mt-3 text-lg font-semibold text-black'>Top Translated Signs</h1>
                        <BarChart
                            dataset={sortedData}
                            series={[{ dataKey: 'frequency' }]}
                            xAxis={[{ scaleType: 'band', dataKey: 'word' }]}
                            yAxis={[{ scaleType: 'linear', dataKey: 'frequency'}]}
                            width={chartSetting.width}
                            height={chartSetting.height}
                            colors={['#56B1CF']}
                            sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: "0.85em" } }}
                        />
                    </div>
                    <div className='flex flex-row w-2/5 h-full'>
                        <div className='flex flex-col w-1/3 h-full justify-center'>
                            <h1 className='text-base font-semibold text-black'>signs</h1>
                            {sortedData.map((item, index) => (
                                <div key={index} className="text-sm font-normal text-black mt-1">{item.word}</div>
                            ))}
                        </div>
                        <div className='flex flex-col w-1/3 h-full justify-center'>
                            <h1 className='text-base font-semibold text-black'>frequency</h1>
                            {sortedData.map((item, index) => (
                                <div key={index} className="text-sm font-normal text-black mt-1">{item.frequency}</div>
                            ))}
                        </div>
                        <div className='flex flex-col w-1/3 h-full justify-center'>
                            <h1 className='text-base font-semibold text-black'>date last accessed</h1>
                            {sortedData.map((item, index) => (
                                <div key={index} className="text-sm font-normal text-black mt-1">{item.last_access}</div>
                            ))}
                        </div>

                    </div>

                </div>


            </div>

        </div>
    );
};

export default History;