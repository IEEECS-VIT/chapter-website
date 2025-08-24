import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./ieee_logo.png";
import Left from "./1.png";
import Right from "./2.png";
import MobileHero from "./mobile-view.png";
import OurStory from "../homepage/OurStory";
import Project from "../Project/Project";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const contentRef = useRef(null);
  const mobileContentRef = useRef(null);
  const ourStoryWrapperRef = useRef(null);
  const mobileHeroRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      y: 150,
      opacity: 1,
      duration: 2.5,
      ease: "power4.out"
    });

    gsap.from(mobileContentRef.current, {
      y: 40,
      opacity: 1,
      duration: 2.,
      ease: "power4.out"
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ourStoryWrapperRef.current,
              start: "top top",
              end: "+=850",
              scrub: 2,
              pin: true,
              anticipatePin: 1
            }
          });

          tl.to(contentRef.current, {
            opacity: 0,
            filter: "blur(5px)",
            scale: 0.97,
            ease: "power3.inOut"
          });

          tl.to(
            leftRef.current,
            {
              x: "-120%",
              transformOrigin: "left center",
              ease: "power4.inOut",
              duration: 2
            },
            "<"
          );

          tl.to(
            rightRef.current,
            {
              x: "120%",
              transformOrigin: "right center",
              ease: "power4.inOut",
              duration: 2
            },
            "<"
          );
        }

        if (isMobile) {
          gsap.to([mobileHeroRef.current, mobileContentRef.current], {
            y: -window.innerHeight * 1.1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ourStoryWrapperRef.current,
              start: "top top",
              end: "+=1200",
              scrub: 1.5,
              pin: true,
              anticipatePin: 1
            }
          });
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mm.revert();
    };
  }, []);

  return (
    <div className="relative w-screen overflow-x-hidden text-white bg-black">
      <div ref={ourStoryWrapperRef} className="relative h-screen z-10">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <OurStory />
        </div>

        <div className="hidden lg:block sticky top-0 z-20 h-screen pointer-events-auto overflow-hidden">
          <div
            ref={leftRef}
            className="absolute top-0 left-0 h-screen z-30"
            style={{
              width: "min(51vw, 1200px)",
              backgroundImage: `url(${Left})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              transformOrigin: "left center",
              boxShadow: "4px 0 20px rgba(0,0,0,0.25)"
            }}
          />

          <div
            ref={rightRef}
            className="absolute top-0 right-0 h-screen z-30"
            style={{
              width: "min(51.25vw, 1000px)",
              backgroundImage: `url(${Right})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              transformOrigin: "right center",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.25)"
            }}
          />

          <div className="absolute inset-0 flex justify-center items-center z-40 bg-black/25">
            
            <div
              ref={contentRef}
              className="flex flex-col justify-start items-center text-center pt-20"
            >
        <img
          src={Logo}
          alt="IEEE Logo"
          className="absolute -top-20 left-4 w-[160px] md:w-[220px] object-contain"
        />
        
              <h1
                className="tracking-tight text-white"
                style={{
                  fontSize: "clamp(11rem, 10vw, 12rem)",
                  fontFamily: "New Times Roman",
                  lineHeight: "1.0"
                }}
              >
                IEEE-CS
              </h1>
              <h2
                className="text-[#EF9E00] mt-2 font-bold"
                style={{
                  fontSize: "clamp(6.5rem, 6vw, 6rem)",
                  fontFamily: "New Times Roman",
                  lineHeight: "1.0"
                }}
              >
                WE LIVE IN A COMPUTER SOCIETY.
              </h2>
              
            </div>
          </div>
        </div>

        <div
          ref={mobileHeroRef}
          className="block lg:hidden sticky top-0 z-20 h-screen overflow-hidden"
        >
          <img
            src={MobileHero}
            alt="Mobile Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              ref={mobileContentRef}
              className="flex flex-col justify-center items-center text-center"
            >
              <img
                src={Logo}
                alt="IEEE Logo"
                className="absolute -top-64 left-4 object-contain"
                style={{ width: "clamp(120px, 25vw, 120px)" }}
              />
              <h1
                className="tracking-tight text-white -mt-20"
                style={{
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  fontFamily: "Times New Roman",
                  lineHeight: "1.0"
                }}
              >
                IEEE-CS
              </h1>
              <h2
                className="text-[#EF9E00] mt-2 font-bold"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 3rem)",
                  fontFamily: "Times New Roman",
                  lineHeight: "1.0"
                }}
              >
                WE LIVE IN A COMPUTER SOCIETY.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <section id="projects" className="relative z-0">
        <div className="w-full min-h-screen bg-[#0f0f0f]">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-[95%] xl:max-w-[1400px]">
            <React.Suspense fallback={<div>Loading Projects...</div>}>
              <Project />
            </React.Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
