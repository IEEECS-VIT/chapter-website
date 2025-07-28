import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background from './images/bg2.png';
import Logo from './images/ieee_logo.png';
import OurStory from './OurStory';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=1600',
        scrub: 1.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    timeline.to(contentRef.current, {
      opacity: 0,
      scale: .92,
      filter: 'blur(40px)',
      duration: 3,
      ease: 'power2.inOut',
    });

    timeline.to(bgRef.current, {
      clipPath: 'polygon(49.9% 0%, 50.1% 0%, 50.1% 100%, 49.9% 100%)',
      duration: 2.2,
      ease: 'power2.inOut',
    });

    timeline.to(bgRef.current, {
      clipPath: 'polygon(50% 50%, 50.1% 50%, 50.1% 50.1%, 50% 50.1%)',
      duration: 2,
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="relative w-screen min-h-screen overflow-hidden text-white">

      <div
        ref={bgRef}
        className="absolute inset-0 z-10 bg-cover bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          backgroundColor: '#000', // fallback in case image doesn't cover
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          opacity: 1,
          filter: 'none',
          pointerEvents: 'auto',
        }}
      >
        <OurStory />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20 pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-30 flex flex-col justify-center items-center h-screen px-4 text-center will-change-transform"
      >
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
