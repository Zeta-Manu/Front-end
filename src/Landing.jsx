import Signlan from './assets/signlan.jpg';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

const Landing = () => {

  
    return (
      <div className="flex">
        <div className="flex w-full mt-20">
          <div className="flex flex-col w-full mt-4 mb-5 mx-10 p-2 bg-[#D7EAEF] backdrop-blur-5 bg-opacity-0.7 drop-shadow-lg rounded-xl">
            <div className="flex flex-row">
              <div className="flex flex-col w-2/3 h-5/6 ml-10 mt-10 space-y-4">
                <h1 className="text-8xl font-extrabold text-[#808080]">MANU</h1>
                <h2 className="text-normal text-5xl text-[#808080]">The Sign That Connect The World</h2>
                <h3 className="text-normal text-2xl text-[#808080]">世界を繋ぐ兆し</h3>
                <h3 className="text-normal text-2xl text-[#808080]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</h3>
              </div>
              <div className="flex w-1/3 h-5/6 mr-10 mt-10">
                <Tilt
                tiltMaxAngleX={35}
                tiltMaxAngleY={35}
                perspective={1000}
                scale={1.2} >
                  <img
                    src={Signlan}
                    alt=""
                    className="object-cover w-full h-full rounded-xl"
                  />
                </Tilt>
              </div>
            </div>
            <div className="flex h-2/6 w-full items-center justify-center mt-8 mb-5">
              <Link to="/">
                <button className="bg-[#EB9980] text-white font-semibold py-8 px-40 rounded" style={{ boxShadow: "0 0.25rem 0.25rem 0.4rem rgba(0, 0, 0, 0.25)" }}>Start your Journey</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Landing