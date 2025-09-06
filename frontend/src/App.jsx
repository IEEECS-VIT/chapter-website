"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeroSection from "./homepage/Herosection";
import Board from "./board/Desktop";
import Mobile from "./board/Mobile";
import Events from "./events/Responsive";
import Gallery from "./gallery/Filmstrip";
import Footer from "./footer/Contact";
import PreLoader from "./preloader/Preloader";
import Project from "./project/Project";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);
  const mainAppRef = useRef(null);
  const smoothContentRef = useRef(null);

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    if (!contentReady) return;

    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 2,
      });

      if (smoothContentRef.current) {
        gsap.set(smoothContentRef.current, {
          opacity: 1,
          visibility: "visible",
        });
      }

      ScrollTrigger.refresh();
    }, mainAppRef);

    return () => ctx.revert();
  }, [contentReady]);

  const prevBreakpoint = useRef("");
  useEffect(() => {
    let currentBreakpoint = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";
    if (prevBreakpoint.current && prevBreakpoint.current !== currentBreakpoint) {
      window.location.reload();
    }
    prevBreakpoint.current = currentBreakpoint;
  }, [isDesktop, isTablet, isMobile]);

  return (
    <div ref={mainAppRef} className="min-w-screen min-h-screen relative bg-black">
      {isAnimating && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <PreLoader onEnter={handleEnter} />
        </div>
      )}

      <div
        id="smooth-wrapper"
        style={{
          overflow: isAnimating ? "hidden" : "visible",
          height: isAnimating ? "100vh" : "auto",
        }}
      >
        <div
          id="smooth-content"
          ref={smoothContentRef}
          className="opacity-0 invisible transition-opacity duration-300"
        >
          <section className="relative w-full">
            <HeroSection contentRef={heroContentRef} />
          </section>

          <section className="relative w-full">
            <Project />
          </section>

          <section className="relative w-full">
            <Events />
          </section>

          <section className="relative w-full">
            <div className="block lg:hidden">
              <Mobile />
            </div>
            <div className="hidden lg:block">
              <Board />
            </div>
          </section>

          <section className="flex min-h-screen bg-neutral-800 items-center justify-center">
            <Gallery />
          </section>

          <section className="relative w-full">
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
