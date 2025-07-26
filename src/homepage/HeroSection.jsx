import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from './images/ieee_logo.png';
import Left from './images/leftside1.png';
import Right from './images/rightside1.png';
import OurStory from '../homepage/OurStory';

const HeroSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const contentRef = useRef(null);
  const ourStoryRef = useRef(null);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2 });

    tl.to(contentRef.current, {
      opacity: 0,
      filter: 'blur(6px)',
      duration: 1.1,
      ease: 'power2.out',
    });


    tl.to(leftRef.current, {
      x: '-110%',
      rotate: -6,
      duration: 1.5,
      ease: 'power4.inOut',
    }, '-=0.6');
    tl.to(rightRef.current, {
      x: '110%',
      rotate: 6,
      duration: 1.5,
      ease: 'power4.inOut',
      onStart: () => setShowStory(true)  
    }, '-=1.5');

    tl.to(ourStoryRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.inOut',
    }, '-=1.8'); 
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white z-10">
     
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full z-30"
        style={{
          backgroundImage: `url(${Left})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          transformOrigin: 'left center',
        }}
      />
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full z-30"
        style={{
          backgroundImage: `url(${Right})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          transformOrigin: 'right center',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-40 flex flex-col justify-center items-center h-full text-center"
      >
        <img
          src={Logo}
          alt="IEEE Logo"
          className="absolute top-4 left-4 w-[40vw] max-w-[200px] min-w-[100px] object-contain"
        />
        <h1
          className="tracking-tight text-white"
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

      <div
        ref={ourStoryRef}
        className="absolute top-0 left-0 w-full h-auto z-0 opacity-0 transition-opacity duration-1000"
      >
        {showStory && <OurStory />}
      </div>
    </div>
  );
};

export default HeroSection;
