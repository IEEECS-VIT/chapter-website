import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import HeroSection from './homepage/HeroSection';
import Board from "./board_section/board";
import EventsPage from "./eventsection/eventpage";
import Gallery from "./gallery/FilmstripGallery";
import Footer from "./footer/Contact";


const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);

  const handleEnter = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setIsAnimating(false),
    });

    tl.to(preloaderRef.current, {
      y: "-100%",
      duration: 1,
    });

    tl.from(heroContentRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.5,
    }, "<");
  };

    useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isAnimating) {
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      const scrollY = -parseInt(body.style.top || "0", 10);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      body.style.touchAction = "";
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isAnimating]);


  return (
    <div className="min-w-screen min-h-screen overflow-x-hidden relative bg-black">
      {isAnimating && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto"
        >
          <PreLoader onEnter={handleEnter} />
        </div>
      )}

      <HeroSection contentRef={heroContentRef} />
      <Board />
      <div className="hidden md:flex min-h-screen bg-neutral-800 items-center justify-center">
      <Gallery />
    </div>


      <Footer />
    </div>
  );
};

export default App;
