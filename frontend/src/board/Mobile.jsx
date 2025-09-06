"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import linkedinIcon from "/assets/board/linkedin.svg";
import ElasticSlider from "../events/ElasticSlider"
import bgImage from "/assets/board/bg.png"
import ram from "/assets/board/ram.png"
import anubhav from "/assets/board/anubhav.png"
import aditya from "/assets/board/aditya.png"
import akshit from "/assets/board/akshit.png"
import ansh from "/assets/board/ansh.png"
import arjun from "/assets/board/arjun.png"
import arya from "/assets/board/arya.png"
import dhriti from "/assets/board/dhriti.png"
import gouri from "/assets/board/gouri.png"
import krish from "/assets/board/krish.png"
import varun from "/assets/board/varun.png"
import parth from "/assets/board/parth.png"
import medhansh from "/assets/board/medhansh.png"

gsap.registerPlugin(Draggable, ScrollTrigger)

const TeamCard = ({ name, position, photo, linkedin }) => {
  return (
    <div className="relative w-[265px] h-[280px] shadow-2xl overflow-hidden flex flex-col justify-between items-center">
      <img
        src={bgImage || "/placeholder.svg"}
        alt="card-bg"
        className="absolute w-full h-full object-cover "
        loading="lazy"
        
      />
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="text-yellow-400 text-3xl font-caveat leading-tight">{name}</div>
          <div className="text-black text-sm" style={{ fontFamily: "Special Elite" }}>{position}</div>
        </div>
        <div className="w-[240px] h-[240px] flex items-center justify-center relative">
          <img src={photo} alt={name} className="w-[240px] h-[240px] object-contain -translate-x-3" />
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-1 z-20"
              loading="lazy"
            >
              <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-7 h-7 translate-x-2 hover:opacity-80 transition-opacity"
                />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const MobileBoard = () => {
  const scrollerRef = useRef(null)  
  const pinRef = useRef(null)      
  const tlRef = useRef(null)
  const [sliderValue, setSliderValue] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1000)

  const allCards = [
    { name: "Ram Krishna", position: "Chairperson", photo: ram, linkedin: "https://www.linkedin.com/in/ramkrishna2967/" },
    { name: "Anubhav Batra", position: "Vice Chairperson", photo: anubhav, linkedin: "https://www.linkedin.com/in/anubhav-batra-9ba7271b1/" },
    { name: "Aditya Verma", position: "Secretary", photo: aditya, linkedin: "https://www.linkedin.com/in/adityaverma121/" },
    { name: "Arjun Bector", position: "Co-secretary", photo: arjun, linkedin: "https://www.linkedin.com/in/arjun-bector/" },
    { name: "Ansh Mehta", position: "Technical Head", photo: ansh, linkedin: "https://www.linkedin.com/in/anshmehta/" },
    { name: "Akshit Anand", position: "Projects Head", photo: akshit, linkedin: "https://www.linkedin.com/in/akshit-anand-10a90b219/" },
    { name: "Dhriti Sharma", position: "Events Head", photo: dhriti, linkedin: "https://www.linkedin.com/in/dhriti-sharma-b03014275/" },
    { name: "Varun Shirsath", position: "PNM Head", photo: varun, linkedin: "https://www.linkedin.com/in/varun-shirsath-50403534b/" },
    { name: "Parth Jadhav", position: "Design Head", photo: parth, linkedin: "https://www.linkedin.com/in/parthjadhav2004/" },
    { name: "Gouri Kanade", position: "RND Head", photo: gouri, linkedin: "https://www.linkedin.com/in/gourikanade1012/" },
    { name: "Medhansh Jain", position: "Web Lead", photo: medhansh, linkedin: "https://www.linkedin.com/in/medhansh-jain/" },
    { name: "Krish Mehta", position: "App Lead", photo: krish, linkedin: "https://www.linkedin.com/in/krish1604/" },
    { name: "Arya Patil", position: "IOT Lead", photo: arya, linkedin: "https://www.linkedin.com/in/arya-patil-2a8366330/" },
  ]

  const cardPairs = []
  for (let i = 0; i < allCards.length; i += 2) {
    cardPairs.push({
      first: allCards[i],
      second: i + 1 < allCards.length ? allCards[i + 1] : null,
    })
  }
useEffect(() => {
  const scroller = scrollerRef.current;
  const pin = pinRef.current;
  if (!scroller || !pin) return;

  let tl;

  const setupAnimation = () => {
    if (tl) {
      tl.scrollTrigger?.kill();
      tl.kill();
    }

    const totalScroll = scroller.scrollWidth - scroller.offsetWidth;
    if (totalScroll <= 0) return;

    setMaxScroll(totalScroll);

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${totalScroll * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress; // clean progress 0 → 1
          const newValue = progress * totalScroll;
          setSliderValue(newValue);
        },
      },
    });

    tl.fromTo(scroller, { x: 0 }, { x: -totalScroll, ease: "none" });
    tlRef.current = tl;

    ScrollTrigger.refresh();
  };

  setupAnimation();

  const handleResize = () => {
    setupAnimation();
  };

  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);

  return () => {
    tl?.scrollTrigger?.kill();
    tl?.kill();
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);
  };
}, []);

const handleSliderChange = (val) => {
  setSliderValue(val);
  const tl = tlRef.current;
  if (tl && tl.scrollTrigger) {
    const progress = Math.min(1, Math.max(0, val / maxScroll));
    const targetScroll =
      progress * (tl.scrollTrigger.end - tl.scrollTrigger.start) +
      tl.scrollTrigger.start;

    tl.scrollTrigger.scroll(targetScroll);
  }
};

  return (
    <div ref={pinRef} className="relative w-full bg-black">
      <div
        ref={scrollerRef}
        className="flex items-center gap-12 h-screen pl-8 pr-8 select-none"
      >
        <div className="flex-shrink-0 flex items-center justify-center w-6">
          <div className="text-yellow-400 text-6xl font-extrabold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
            THE BOARD
          </div>
        </div>
        {cardPairs.map((pair, index) => (
          <div key={index} className="flex flex-col gap-8 flex-shrink-0">
            <TeamCard {...pair.first} />
            {pair.second && <TeamCard {...pair.second} />}
          </div>
        ))}
      </div>

      {/* popup slider */}
      <div className="absolute left-1/2 bottom-[1%] transform -translate-x-1/2 rounded-2xl p-5 z-50 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] block lg:hidden">
        <ElasticSlider
          leftIcon={
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          }
          rightIcon={
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          }
          //defaultValue={sliderValue}
          maxValue={maxScroll}
          isStepped
          stepSize={10}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  )
}

export default MobileBoard
