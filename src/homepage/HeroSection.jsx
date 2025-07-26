import React from 'react';
import Background from './images/bg2.png';
import Logo from './images/ieee_logo.png';

const HeroSection = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden  text-white">

      <div
        className="absolute bg-cover bg-no-repeat inset-0 z-0 brightness-100"
        style={{ backgroundImage: `url(${Background})`,
      backgroundSize: '100% 100%', }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />


      <div className="relative z-20 flex flex-col justify-center items-center h-screen px-4 text-center">
        
        <img
          src={Logo}
          alt="IEEE Logo"
          className="absolute top-4 left-4 w-[40vw] max-w-[200px] min-w-[100px] object-contain"
        />

        <h1
          className="tracking-tight"
          style={{
            fontSize: 'clamp(12.5rem, 10vw, 10rem)',  
            fontFamily: 'Karantina',
            lineHeight: '1.0',
          }}
        >
          IEEE-CS
        </h1>

        <h2
          className="text-[#EF9E00] mt-2"
          style={{
            fontSize: 'clamp(12rem, 7vw, 7rem)',  
            fontFamily: 'Karantina',
            lineHeight: '1.0',
          }}
        >
          WE LIVE IN A COMPUTER SOCIETY.
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
