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

const MOBILE_BREAKPOINT = 1240;

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : null
  );
  const [contentReady, setContentReady] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isRealMobile, setIsRealMobile] = useState(false);

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
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center px-8 py-10 bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-400/50 max-w-sm mx-auto animate-fadeIn">
            <div className="flex justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 800"
                className="h-20 w-20 text-yellow-400 animate-pulse drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                fill="currentColor"
              >
                <path d="M400 0C179.2 0 0 179.2 0 400s179.2 400 400 400 400-179.2 400-400S620.8 0 400 0zm0 730.7C206.1 730.7 69.3 593.9 69.3 400S206.1 69.3 400 69.3 730.7 206.1 730.7 400 593.9 730.7 400 730.7z"/>
                <path d="M400 166.4c-129.2 0-233.6 104.4-233.6 233.6S270.8 633.6 400 633.6 633.6 529.2 633.6 400 529.2 166.4 400 166.4zm0 397.3c-90.2 0-163.7-73.5-163.7-163.7S309.8 236.3 400 236.3 563.7 309.8 563.7 400 490.2 563.7 400 563.7z"/>
              </svg>
            </div>
            <p className="text-3xl font-bold font-henju text-yellow-400 drop-shadow-lg">
              Please Rotate Your Device
            </p>
            <p className="text-base text-gray-300 mt-4 leading-relaxed">
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
