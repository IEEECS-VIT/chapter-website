import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import HeroSection from './homepage/HeroSection';
import Board from "./board_section/board";
import Mobile from "./board_section/mobile";
import EventsPage from "./eventsection/eventpage";
import Gallery from "./gallery/FilmstripGallery";
import Footer from "./footer/Contact";
import PreLoader from "./Preloader/PreLoader";

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const preloaderRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleEnter = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setIsAnimating(false),
    });

    tl.to(preloaderRef.current, { y: "-100%", duration: 1 });
    tl.from(heroContentRef.current, { y: 150, opacity: 0, duration: 1.5 }, "<");
  };

  useEffect(() => {
    const body = document.body;
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
        <div ref={preloaderRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
          <PreLoader onEnter={handleEnter} />
        </div>
      )}
      <section className="relative w-full">
        <HeroSection contentRef={heroContentRef} />
      </section>
      <section className="w-full h-[10px] pointer-events-none" />
      <section className="relative w-full">
        {isMobile ? <Mobile /> : <Board />}
      </section>
      <section className="hidden md:flex min-h-screen bg-neutral-800 items-center justify-center">
        <Gallery />
      </section>
    </div>
  );
};

export default App;
