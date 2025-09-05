"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroSection from "./homepage/Herosection";
import Board from "./board/Desktop";
import Mobile from "./board/Mobile";
import Events from "./events/Mobile";
import EventsD from "./events/Desktop";
import Gallery from "./gallery/Filmstrip";
import Footer from "./footer/Contact";
import PreLoader from "./preloader/Preloader";
import Project from "./project/Project";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const MOBILE_BREAKPOINT = 1024;

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : null
  );
  const [contentReady, setContentReady] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isRealMobile, setIsRealMobile] = useState(false);
  const isTablet = (width) => {
  return width > 768 && width <= 1024;
};
  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);
  const mainAppRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex = /android|iphone|ipad|ipod|mobile/i;
      setIsRealMobile(mobileRegex.test(userAgent));
    };
    checkDevice();
  }, []);

  useEffect(() => {
  if (isRealMobile && isLandscape) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = ""; 
  }
}, [isRealMobile, isLandscape]);

  useEffect(() => {
    let prevIsMobile = isMobile;
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsLandscape(window.innerWidth > window.innerHeight);
      if (prevIsMobile !== null && prevIsMobile !== newIsMobile) {
        window.location.reload();
      }
      setIsMobile(newIsMobile);
      prevIsMobile = newIsMobile;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isMobile]);

  const handleEnter = () => {
    setContentReady(true);
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        document.body.style.overflow = "";
      },
    });
    tl.to(preloaderRef.current, { y: "-100%", duration: 1 });
    tl.from(heroContentRef.current, { y: 150, opacity: 0, duration: 1.5 }, "<");
  };

  useLayoutEffect(() => {
    if (!contentReady || isMobile === null) return;
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: isMobile ? 0 : 1.7,
        effects: !isMobile,
        smoothTouch: isMobile ? 2 : false,
      });
      smoother.effects(".your-class", { speed: 0.5, lag: 0.4 });
      if (smoothContentRef.current) {
        gsap.set(smoothContentRef.current, {
          opacity: 1,
          visibility: "visible",
        });
      }
      ScrollTrigger.refresh();
    }, mainAppRef);
    return () => ctx.revert();
  }, [contentReady, isMobile]);

  return (
    <div ref={mainAppRef} className="min-w-screen min-h-screen relative bg-black">
      {isAnimating && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto"
        >
          <PreLoader onEnter={handleEnter} />
        </div>
      )}

{isRealMobile && isLandscape && (
  <div className="fixed inset-0 w-screen h-screen z-50 bg-black flex items-center justify-center overflow-hidden" style={{ touchAction: "none" }}>
    <div className="text-center px-8 py-10 bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-400/50 max-w-sm w-[90%] mx-auto animate-fadeIn">
      <div className="flex justify-center -mt-12 mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-yellow-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <rect
            x="16"
            y="12"
            width="32"
            height="40"
            rx="4"
            ry="4"
            className="origin-center animate-[flipPhone_2s_infinite]"
          />
        </svg>
      </div>
      <p className="text-xl sm:text-2xl font-bold font-henju text-yellow-400 drop-shadow-lg mb-4">
        Please Rotate Your Device
      </p>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
        This <span className="font-semibold text-yellow-400">IEEE Computer Society</span> site is best viewed in{" "}
        <span className="font-semibold text-yellow-400">portrait mode</span>.
      </p>
    </div>
  </div>
)}




      {isMobile !== null && (
        <div
          id="smooth-wrapper"
          style={{
            overflow: isAnimating ? "hidden" : isMobile ? "visible" : "hidden",
            height: isAnimating ? "100vh" : "auto",
          }}
        >
          <div
            id="smooth-content"
            ref={smoothContentRef}
            style={{
              opacity: contentReady ? 1 : 0,
              visibility: contentReady ? "visible" : "hidden",
              transform: "translate3d(0, 0, 0)",
              willChange: isMobile ? "auto" : "transform",
              transition: "opacity 0.3s ease-out",
            }}
          >
            <section className="relative w-full">
              <HeroSection contentRef={heroContentRef} isMobile={isMobile} />
            </section>
            <section className="relative w-full">
              <Project />
            </section>
            <section className="relative w-full">
              {isMobile ? <Events /> : <EventsD />}
            </section>
            <section className="relative w-full">
              {isMobile ? <Mobile /> : <Board />}
            </section>
            <section className="hidden md:flex min-h-screen bg-neutral-800 items-center justify-center">
              <Gallery />
            </section>
            <section className="relative w-full">
              <Footer />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
