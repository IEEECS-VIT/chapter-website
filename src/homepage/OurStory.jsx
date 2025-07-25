import React from 'react';
import Logo from './images/ieee_logo.png';
import Background from './images/paper_effect.png';
import Team from './images/team.png';

const OurStory = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-white text-black">

      <div
        className="absolute inset-0 bg-cover bg-center brightness-90 z-0"

      />

      <div className="absolute top-4 left-4 bg-white/60 p-2 z-10">
        <img
          src={Logo}
          alt="IEEE Computer Society Logo"
          className="w-[30vw] max-w-[160px] min-w-[80px] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-28 px-6 md:px-16 text-center">

        <h1
          className="text-[#0b0b0a] font-bold tracking-wide"
          style={{
            fontFamily: 'Special Elite',
            fontSize: 'clamp(3rem, 10vw, 100px)',
            lineHeight: '1.0',
          }}
        >
          OUR STORY
        </h1>

        <p
          className="mt-1 text-[#0b0b0a] text-lg md:text-xl max-w-4xl leading-relaxed text-justify"
          style={{ fontFamily: 'Inter' }}
        >
          IEEE Computer Society, VIT—established in February 2012 under IEEE Region 10, Madras Section—
          drives innovation by leveraging cutting-edge technology to solve real-world problems. We foster ideas,
          empower talent, and deliver impactful projects through elite events, workshops, and collaborations.
          As a globally recognized hub of technical excellence, we inspire and shape inquisitive minds for the
          challenges of tomorrow.
        </p>

        <div className="w-screen flex justify-center -mt-60 mb-0">
          <img
            src={Team}
            alt="IEEE Computer Society Team"
            className="w-screen max-w-screen-xl h-auto object-cover"
            style={{ marginBottom: '0px' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
