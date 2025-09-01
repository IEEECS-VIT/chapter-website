"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroSection from "./homepage/HeroSection";
import Board from "./board/Desktop";
import Mobile from "./board/Mobile";
import Events from "./events/Mobile";
import EventsD from "./events/Desktop";
import Gallery from "./gallery/FilmStrip";
import Footer from "./footer/Contact";
import PreLoader from "./preloader/PreLoader";
import Project from "./project/Project";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(null);
  const [contentReady, setContentReady] = useState(false);

  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);
  const mainAppRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-device-width: 640px)");
    const mqMd = window.matchMedia("(min-device-width: 768px)");
    const mqLg = window.matchMedia("(min-device-width: 1024px)");
    const mqXl = window.matchMedia("(min-device-width: 1280px)");

    const handleResize = () => {
      if (mqLg.matches || mqXl.matches) {
        setIsMobile(false); // desktop view
      } else if (mqSm.matches || mqMd.matches) {
        setIsMobile(true); // mobile/tablet view
      } else {
        setIsMobile(true); // default fallback to mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        smooth: isMobile ? 0 : 1.6,
        transform: isMobile
          ? "translate3d(0,0,0)"
          : "scale(0.8) translate3d(0,0,0)",
        transformOrigin: "top center",
        willChange: isMobile ? "auto" : "transform",
        effects: !isMobile,
        smoothTouch: isMobile ? 1.6 : false,
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

      {isMobile !== null && (
        <div
          id="smooth-wrapper"
          style={{
            overflow: isAnimating
              ? "hidden"
              : isMobile
              ? "visible"
              : "hidden",
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
