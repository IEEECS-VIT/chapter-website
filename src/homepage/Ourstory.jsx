import React, { useState } from "react";
import Logo from "../assets/logos/IEEECS.png";
import Background from "../assets/herosection/paper_effect.png";
import Team from "../assets/herosection/team.png";
import MobileBoard from "../assets/herosection/mobile-board.jpg";

const OurStory = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-black z-0">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100 z-0"
        style={{ backgroundImage: `url(${Background})` }}
      />

      <div className="absolute top-[2vh] left-[2vh] p-[1vh] z-10">
        <img
          src={Logo}
          alt="IEEE Computer Society Logo"
          className="w-[20vh] max-w-[25vw] min-w-[8vh] object-contain"
        />
      </div>

      <div className="lg:hidden relative z-10 flex flex-col items-center text-center px-[4vw] pt-[10vh]">
        <h1
          className="text-[#0b0b0a] tracking-wide font-semibold"
          style={{
            fontFamily: "Special Elite,serif",
            fontSize: "clamp(3.5vh, 6vh, 6.5vh)",
            lineHeight: "1.1",
          }}
        >
          OUR STORY
        </h1>

        <div
          className="relative w-full flex items-center justify-center px-[2vh] mt-[1vh]"
          style={{ filter: "grayscale(100%)" }}
        >
          <img
            src={MobileBoard}
            alt="IEEE Computer Society Team"
            className={`rounded-xl opacity-0 translate-y-[3vh] transition-opacity duration-700 w-auto max-h-[40vh] object-cover ${
              imageLoaded ? "opacity-100" : ""
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <p
          className="text-[#0b0b0a] max-w-[80vw] leading-relaxed mt-[4vh]"
          style={{
            fontFamily: "Special Elite",
            fontSize: "clamp(1.2vh, 2vh, 2.4vh)",
            whiteSpace: "pre-line",
          }}
        >
          IEEE Computer Society, VIT, founded in 2012 under IEEE Region 10,
          promotes innovation and technical excellence through impactful events,
          projects, and collaborations to solve real-world problems.
        </p>
      </div>

      <div className="hidden lg:flex relative z-10 flex-col items-center text-center px-[6vw] pt-[12vh]">
        <h1
          className="text-[#0b0b0a] tracking-wide"
          style={{
            fontFamily: "Special Elite",
            fontSize: "clamp(6vh, 10vh, 12vh)",
            lineHeight: "1.0",
          }}
        >
          OUR STORY
        </h1>

        <p
          className="mt-[2vh] text-[#0b0b0a] max-w-[70vw] leading-relaxed"
          style={{
            fontFamily: "Special Elite",
            fontSize: "clamp(3.0vh, 2.4vh, 3.5vh)",
            whiteSpace: "pre-line",
          }}
        >
          IEEE Computer Society, VIT—established in February 2012 under IEEE
          Region 10, Madras Section—drives innovation by leveraging
          cutting-edge technology to solve real-world problems. As a globally
          recognized hub of technical excellence, we inspire and shape
          inquisitive minds for the challenges of tomorrow.
        </p>

        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center px-[2vh]">
          <img
            src={Team}
            alt="IEEE Computer Society Team"
            className={`rounded-xl opacity-0 transition-opacity duration-700 w-screen h-[70vh] object-cover ${
              imageLoaded ? "opacity-100" : ""
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default OurStory;