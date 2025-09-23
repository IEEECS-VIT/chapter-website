import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "react-responsive"
import Left from "/assets/herosection/1.webp"
import Right from "/assets/herosection/2.webp"
import MobileHero from "/assets/herosection/mobile-view.webp"
import OurStory from "./Ourstory"
import AnimatedText from "./useFontAnimation";
gsap.registerPlugin(ScrollTrigger)

const HeroSection = ({ contentRef }) => {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const mobileContentRef = useRef(null)
  const ourStoryWrapperRef = useRef(null)
  const mobileHeroRef = useRef(null)

  const isDesktop = useMediaQuery({ minWidth: 1025 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    gsap.from(contentRef.current, {
      y: 150,
      opacity: 1,
      duration: 3,
      ease: "power4.out",
    })

    gsap.from(mobileContentRef.current, {
      y: 80,
      opacity: 1,
      duration: 3,
      ease: "power4.out",
    })

   if (isDesktop) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ourStoryWrapperRef.current,
      start: "top top",
      end: "+=1850",
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
    },
  })


  tl.to(contentRef.current, {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.9,
    duration: 2,     
    ease: "power4.inOut",
  })

  tl.to(leftRef.current, {
    x: "-100%",
    ease: "power4.inOut",
    duration: 3.5,
  })

  tl.to(
    rightRef.current,
    {
      x: "100%",
      ease: "power4.inOut",
      duration: 3.5,
    },
    "<" 
  )
}


    if (isMobile || isTablet) {
      gsap.to([mobileHeroRef.current, mobileContentRef.current], {
        y: -window.innerHeight * 1.3,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ourStoryWrapperRef.current,
          start: "top top",
          end: "+=1450",
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })
    }

    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isDesktop, isTablet, isMobile])

  return (
    <div className="relative w-screen overflow-x-hidden text-white bg-black">
      <div ref={ourStoryWrapperRef} className="relative h-screen z-10 bg-black">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <OurStory />
        </div>

        {isDesktop && (
          <div className="sticky top-0 z-20 h-screen overflow-hidden">
            <div
              ref={leftRef}
              className="absolute -top-5 -left-4 h-screen z-30"
              style={{
                width: "52.45vw",
                height: "104vh",
                backgroundImage: `url(${Left})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <div
              ref={rightRef}
              className="absolute -top-5 -right-9 h-screen z-30"
              style={{
                width: "54.29vw",
                height: "104vh",
                backgroundImage: `url(${Right})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
        <div className="absolute inset-0 flex justify-center items-center z-40"
        
        >
          <div
            ref={contentRef}
            className="flex flex-col items-center text-center min-h-screen"
          >
                <h1
                  className="text-white font-black"
                  style={{
                    fontSize: "clamp(12rem, 10vw, 13rem)",
                    fontFamily: "Henju",
                    lineHeight: "1.0",
                  }}
                >
                  <AnimatedText
                    duration={2}
                    className="text-9xl font-bold text-white"
                  >
                    IEEE CS
                  </AnimatedText>
                </h1>

                <h2
                  className="text-[#EF9E00] font-black"
                  style={{
                    fontSize: "clamp(5.2rem, 4vw, 5.5rem)",
                    fontFamily: "Henju",
                    lineHeight: "1.0",
                  }}
                >
                  WE LIVE IN A COMPUTER SOCIETY.
                </h2>
              </div>
            </div>
          </div>
        )}

        {(isMobile || isTablet) && (
          <div
            ref={mobileHeroRef}
            className="sticky top-0 z-20 h-screen overflow-hidden"
          >
            <img
              src={MobileHero}
              alt="Mobile Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
            <div className="absolute inset-0 flex justify-center items-center z-30">
              <div
                ref={mobileContentRef}
                className="flex flex-col items-center text-center"
              >
                <h1
                  className="tracking-tight text-white mt-2 -translate-y-24"
                  style={{
                    fontSize: "clamp(5rem, 8vw, 6rem)",
                    fontFamily: "Henju",
                    lineHeight: "1.0",
                  }}
                >
                  <AnimatedText
                    duration={8} 
                    className="text-10xl font-bold text-white"
                  >
                  IEEE CS
                  </AnimatedText>
                </h1>
                <h2
                  className="text-[#EF9E00] font-bold -translate-y-24"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3rem)",
                    fontFamily: "Henju",
                    lineHeight: "1.0",
                  }}
                >
                  WE LIVE IN A COMPUTER SOCIETY.
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
