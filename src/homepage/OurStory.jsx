import React, { useState, useEffect } from "react";
import Logo from "./IEEECS.png";
import Background from "./paper_effect.png";
import Team from "./team.png";
import MobileBoard from "./mobile-board.jpg";

const OurStory = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-black z-0">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100 z-0"
        style={{ backgroundImage: `url(${Background})` }}
      />

      <div className="absolute top-4 left-4 p-2 z-10">
        <img
          src={Logo}
          alt="IEEE Computer Society Logo"
          className="w-[40vw] max-w-[200px] min-w-[100px] object-contain"
        />
      </div>

      {isMobile ? (
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 pt-10">
          <h1
            className="text-[#0b0b0a] tracking-wide mt-6 font-semibold translate-y-5"
            style={{
              fontFamily: "New Times Roman,serif",
              fontSize: "clamp(4.1rem, 8vw, 50px)",
              lineHeight: "1.0",
            }}
          >
            OUR STORY
          </h1>

          <div
            className="relative w-full flex items-center justify-center px-4"
            style={{ filter: "grayscale(100%)" }}
          >
            <img
              src={MobileBoard}
              alt="IEEE Computer Society Team"
              className={`rounded-xl opacity-0 translate-y-16 transition-opacity duration-700 w-auto h-auto object-cover ${
                imageLoaded ? "opacity-100" : ""
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <p
            className=" text-[#0b0b0a] max-w-3xl leading-relaxed translate-y-28"
            style={{
              fontFamily: "New Times Roman,",
              fontSize: "1rem",
              whiteSpace: "pre-line",
            }}
          >
            IEEE Computer Society, VIT, founded in 2012 under IEEE Region 10,
            promotes innovation and technical excellence through impactful
            events, projects, and collaborations to solve real-world problems.
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 pt-28">
          <h1
            className="text-[#0b0b0a] tracking-wide"
            style={{
              fontFamily: "New Times Roman",
              fontSize: "clamp(3rem, 10vw, 100px)",
              lineHeight: "1.0",
            }}
          >
            OUR STORY
          </h1>

          <p
            className="mt-1 text-[#0b0b0a] max-w-4xl leading-relaxed"
            style={{
              fontFamily: "New Times Roman",
              fontSize: "1.55rem",
              whiteSpace: "pre-line",
            }}
          >
            IEEE Computer Society, VIT—established in February 2012 under IEEE
            Region 10, Madras Section—drives innovation by leveraging
            cutting-edge technology to solve real-world problems. We foster
            ideas, empower talent, and deliver impactful projects through elite
            events, workshops, and collaborations. As a globally recognized hub
            of technical excellence, we inspire and shape inquisitive minds for
            the challenges of tomorrow.
          </p>

          <div className="fixed bottom-0 left-0 w-full flex items-center justify-center px-4">
            <img
              src={Team}
              alt="IEEE Computer Society Team"
              className={`rounded-xl opacity-0 transition-opacity duration-700 w-screen h-[80vh] object-cover ${
                imageLoaded ? "opacity-100" : ""
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OurStory;
