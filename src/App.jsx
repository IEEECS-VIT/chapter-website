import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import HeroSection from './homepage/HeroSection';
import Board from "./board_section/board";
import EventsPage from "./eventsection/eventpage";
import Gallery from "./gallery/FilmstripGallery";
import Footer from "./footer/Contact";
import PreLoader from "./Preloader/Preloader";

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
    if (isAnimating && preloaderRef.current) {
      gsap.set(preloaderRef.current, { y: 0 });
    }
  }, [isAnimating]);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden relative">
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
      <EventsPage />
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default App;
