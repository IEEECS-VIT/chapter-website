import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './images/ieee_logo.png';
import Left from './images/leftside1.png';
import Right from './images/rightside1.png';
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
        end: '+=800',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(6px)',
      ease: 'power3.inOut',
    });

    tl.to(
      leftRef.current,
      {
        rotateY: -90,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
      },
      '<'
    );

    tl.to(
      rightRef.current,
      {
        rotateY: 90,
        ease: 'power3.inOut',
        transformOrigin: 'right center',
      },
      '<'
    );

    gsap.to(ourStoryRef.current, {
      scrollTrigger: {
        trigger: ourStoryWrapperRef.current,
        start: 'top top',
        end: '+=800',
        scrub: true,
      },
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-screen overflow-x-hidden text-white bg-black">
      <div ref={ourStoryWrapperRef} className="relative h-auto">

        <div
          ref={ourStoryRef}
          className="absolute top-0 left-0 w-screen h-full opacity-0 scale-[0.94] z-0 transition-all duration-200 ease-in-out"
        >
          <OurStory />
        </div>

        <div
          className="sticky top-0 z-20 h-screen pointer-events-auto"
          style={{ perspective: '1000px' }}
        >

          <div
            ref={leftRef}
            className="absolute -top-0.5 left-0 w-1/2 h-screen z-30"
            style={{
              backgroundImage: `url(${Left})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transformOrigin: 'left center',
              boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.3)',
              backfaceVisibility: 'hidden',
            }}
          />

          <div
            ref={rightRef}
            className="absolute top-0 right-0 w-1/2 h-screen z-30"
            style={{
              backgroundImage: `url(${Right})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transformOrigin: 'right center',
              boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.3)',
              backfaceVisibility: 'hidden',
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
