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
  const ourStoryRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=600',
        scrub: 1.5,
        pin: true,
      },
    });

    tl.to(bgRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 2,
      ease: 'power2.inOut',
    });

    tl.to(
      contentRef.current,
      {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.9,
        duration: 1.6,
        ease: 'power2.out',
      },
      '<'
    );

    gsap.to(ourStoryRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top-=15 top',
        end: '+=900',
        scrub: true,
      },
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="relative w-screen min-h-screen overflow-hidden text-white">



      <div
        ref={bgRef}
        className="absolute inset-0 z-10 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: '100% 100%',
          clipPath: 'circle(100% at 50% 50%)',
        }}
      />
      <div
        ref={ourStoryRef}
        className="absolute top-0 left-0 w-full h-full opacity-0 scale-[0.99] z-0"
        style={{
          filter: 'blur(0px)',
          transition: 'all 0.3s ease-out',
        }}
      >
        <OurStory />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20" />

      <div
        ref={contentRef}
        className="relative z-30 flex flex-col justify-center items-center h-screen px-4 text-center"
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
