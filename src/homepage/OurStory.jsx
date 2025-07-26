import React from 'react';
import Logo from './images/ieee_logo.png';
import Background from './images/paper_effect.png';
import Team from './images/team.png';

const OurStory = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-white text-black">

      <div
        className="absolute inset-0 bg-cover bg-center brightness-100 z-10"
        style={{ backgroundImage: `url(${Background})`}}
      />

      <div className="absolute top-4 left-4 bg-white/20 p-2 z-10">
        <img
          src={Logo}
          alt="IEEE Computer Society Logo"
          className="w-[40vw] max-w-[200px] min-w-[100px] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-28 px-6 md:px-16 text-center">

<div className="flex flex-col items-center text-center px-4 sm:px-8">
  <h1
    className="text-[#0b0b0a] tracking-wide"
    style={{
      fontFamily: 'Special Elite, serif',
      fontSize: 'clamp(3rem, 10vw, 100px)',
      lineHeight: '1.0',
    }}
  >
    OUR STORY
  </h1>

  <p
    className="mt-1 text-[#0b0b0a] text-lg md:text-2xl max-w-4xl leading-loose"
    style={{
      fontFamily: 'Inter, sans-serif',
      whiteSpace: 'pre-line',
    }}
  >
    {`IEEE Computer Society, VIT—established in February 2012 under IEEE Region 10, Madras Section—drives innovation by leveraging cutting-edge technology to solve real-world problems. We foster ideas, empower talent, and deliver impactful projects through elite events,workshops, and collaborations. As a globally recognized hub of technical excellence, we inspire and shape inquisitive minds for the challenges of tomorrow.`}
  </p>
</div>



    <div className="absolute inset-0 w-screen h-auto z-[-1] top-40">
      <img
        src={Team}
        alt="IEEE Computer Society Team"
        className="w-full h-auto object-cover"
      />
    </div>

      </div>
    </div>
  );
};

export default OurStory;
