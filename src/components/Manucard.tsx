import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

interface ManucardProps {
  imageSrc: string;
  title: string;
  description: string;
  to: string;
}

const Manucard: React.FC<ManucardProps> = ({ imageSrc, title, description, to }) => {
  return (
    <div className="w-80 h-96 flex flex-col rounded-2xl mx-5">
      <div className="relative h-1/3 bg-opacity-0">
        <div className="absolute flex w-full h-full justify-center">
          <div className="flex bg-green w-40 h-40 rounded-full overflow-hidden z-30">
            <img src={imageSrc} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="h-2/3 w-full bg-[#313131] bg-opacity-20 backdrop-blur-2 flex items-center justify-center flex-col p-8 rounded-2xl">
        <div className="bg-[#BCFDE7] flex flex-col p-1 space-y-2 items-center justify-center w-full h-full rounded-2xl">
          <div className="flex flex-col items-center z-20">
            <h1 className="text-xl font-bold text-[#5E81AC] font-nunito-sans">{title}</h1>
            <p className="text-black text-center text-sm font-nunito-sans mt-2">{description}</p>
          </div>
          <Link to={to}>
            <button className="flex items-center justify-center z-20">
              <ExpandCircleDownIcon
                style={{ transform: 'rotate(-90deg)', transition: 'color 0.3s' }}
                sx={{ color: '#5E81AC' }}
                fontSize="large"
                className="hover:text-blue-500"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Manucard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Manucard;
