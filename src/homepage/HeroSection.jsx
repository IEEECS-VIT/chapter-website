import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './images/ieee_logo.png';
import Left from './images/1.png';
import Right from './images/2.png';
import OurStory from '../homepage/OurStory';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const contentRef = useRef(null);
  const ourStoryWrapperRef = useRef(null);
  const ourStoryRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ourStoryWrapperRef.current,
        start: 'top top',
        end: '+=850',
        scrub: 2.0,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      filter: 'blur(5px)',
      scale: 0.97,
      ease: 'power3.inOut',
    });

    tl.to(
      leftRef.current,
      {
        x: '-120%',
        transformOrigin: 'left center',
        ease: 'power4.inOut',
        duration: 2,
      },
      '<'
    );

    tl.to(
      rightRef.current,
      {
        x: '120%',
        transformOrigin: 'right center',
        ease: 'power4.inOut',
        duration: 2,
      },
      '<'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-screen overflow-x-hidden text-white bg-black">
      <div ref={ourStoryWrapperRef} className="relative h-screen">
        <div
          ref={ourStoryRef}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <OurStory />
        </div>

        <div
          className="sticky top-0 z-20 h-screen pointer-events-auto overflow-hidden"
          style={{ perspective: '2000px' }}
        >
          <div
            ref={leftRef}
            className="absolute top-0 left-0 w-[634px] h-screen z-30"
            style={{
              backgroundImage: `url(${Left})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              transformOrigin: 'left center',
              boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
            }}
          />

          <div
            ref={rightRef}
            className="absolute top-0 right-0 w-[630px] h-screen z-30"
            style={{
              backgroundImage: `url(${Right})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              transformOrigin: 'right center',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.25)',
            }}
          />

          <div
            ref={contentRef}
            className="relative z-40 flex flex-col justify-center items-center h-screen text-center"
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;