"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import OurStory from "./homepage/Ourstory";
import HeroSection from "./homepage/Herosection";
import Board from "./board/Desktop";
import Mobile from "./board/Mobile";
import Events from "./events/Mobile";
import EventsD from "./events/Desktop";
import Gallery from "./gallery/Filmstrip";
import Footer from "./footer/Contact";
import PreLoader from "./preloader/Preloader";
import Project from "./project/Project";
import Event from "./events/Responsive";

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);


  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });


  const handleEnter = () => {
    setContentReady(true);
    gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setIsAnimating(false),
    })
      .to(preloaderRef.current, { y: "-100%", duration: 1 })
      .from(heroContentRef.current, { y: 150, opacity: 0, duration: 1.5 }, "<");
  };

  return (
    <div className="min-w-screen min-h-screen bg-black relative">
      {isAnimating && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <PreLoader onEnter={handleEnter} />
        </div>
      )}

      {contentReady && (
        <div>
          <section className="relative w-full">
            <HeroSection contentRef={heroContentRef} />
          </section>
          <section className="relative w-full">
          <Event />
        </section>
        <section className="relative w-full">
        <div className="block lg:hidden">
          <Mobile />
        </div>
        <div className="hidden lg:block">
          <Board />
        </div>
      </section>

        <section className="hidden md:flex min-h-screen bg-neutral-800 items-center justify-center">
            <Gallery />
          </section>
          <section className="relative w-full">
            <Footer />
          </section>
          
          {/*<section className="relative w-full">
            <Project />
          </section>
          
          */}
        </div>
      )}
    </div>
  );
};

export default App;
