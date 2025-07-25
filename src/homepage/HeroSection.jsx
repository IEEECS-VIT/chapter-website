import React from 'react';
import Background from './images/bg.png';
import Logo from './images/ieee_logo.png';

const HeroSection = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden text-white">

      <div
        className="absolute inset-0 bg-contain z-0 brightness-50"
        style={{ backgroundImage: `url(${Background})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />


      <div className="relative z-20 flex flex-col justify-center items-center h-screen px-4 text-center">
        
        <img
          src={Logo}
          alt="IEEE Logo"
          className="absolute top-4 left-4 w-[20vw] max-w-[120px] min-w-[60px] object-contain"
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
          WE LIVE IN A COMPUTER SOCIETY
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
