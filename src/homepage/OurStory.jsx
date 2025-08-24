import React, { useState, useEffect } from 'react';
import Logo from './IEEECS.png';
import Background from './paper_effect.png';
import Team from './team.png';
import MobileBoard from './mobile-board.jpg';

const OurStory = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-white text-black z-0">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100 z-0"
        style={{ backgroundImage: `url(${Background})` }}
      />

      <div className="absolute top-4 left-4 p-2 z-10">
        <img
          src={Logo}
          alt="IEEE Computer Society Logo"
          className="w-[40vw] max-w-[200px] min-w-[100px] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-28 px-6 md:px-16 text-center">
        <h1
          className="text-[#0b0b0a] tracking-wide"
          style={{
            fontFamily: 'Special Elite, serif',
            fontSize: isMobile ? 'clamp(2rem, 8vw, 50px)' : 'clamp(3rem, 10vw, 100px)',
            lineHeight: '1.0',
          }}
        >
          OUR STORY
        </h1>

        <p
          className="mt-4 text-[#0b0b0a] max-w-4xl leading-relaxed"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? '1rem' : '1.25rem',
            whiteSpace: 'pre-line',
          }}
        >
          {isMobile
            ? 'IEEE Computer Society, VIT, founded in 2012 under IEEE Region 10, promotes innovation and technical excellence through impactful events, projects, and collaborations to solve real-world problems.'
            : 'IEEE Computer Society, VIT—established in February 2012 under IEEE Region 10, Madras Section—drives innovation by leveraging cutting-edge technology to solve real-world problems. We foster ideas, empower talent, and deliver impactful projects through elite events, workshops, and collaborations. As a globally recognized hub of technical excellence, we inspire and shape inquisitive minds for the challenges of tomorrow.'}
        </p>
      </div>

      <div
      className={`absolute inset-0 z-0 ${
        isMobile ? 'top-80' : 'top-40'
      }`}
    >
      <img
        src={isMobile ? MobileBoard : Team}
        alt="IEEE Computer Society Team"
        className={`object-cover transition-all duration-500 ${
          isMobile ? 'w-screen h-[50vh]' : 'w-full h-full'
        }`}
      />
    </div>

    </div>
  );
};

export default OurStory;
