"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import linkedinIcon from "/assets/board/linkedin.svg";
import ElasticSlider from "../events/ElasticSlider"
import bgImage from "/assets/board/bg.webp"

// Updated imports based on file explorer screenshot
import raghav from "/assets/board/raghav.webp";
import devraj from "/assets/board/devraj.webp";
import diya from "/assets/board/diya.webp";
import utkarsh from "/assets/board/utkarsh.webp";
import kshitij from "/assets/board/kshitij.webp";
import atharv from "/assets/board/atharv.webp";
import aryan from "/assets/board/aryan.webp";
import ani from "/assets/board/ani.webp";
import saanvi from "/assets/board/saanvi.webp";
import jeevesh from "/assets/board/jeevesh.webp";
import vishwa from "/assets/board/vishwa.webp";
import samanvi from "/assets/board/samanvee.webp";
import ananya from "/assets/board/ananya.webp";

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
        <div className="flex flex-col items-center space-y-1 text-center pt-2">
          <div className="text-yellow-400 text-3xl font-caveat leading-tight">{name}</div>
          <div className="text-black text-sm px-2" style={{ fontFamily: "Special Elite" }}>{position}</div>
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
                  className="w-5 h-5 translate-x-2 -translate-y-2 hover:opacity-80 transition-opacity"
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

  // Updated Board Members 25-26 with LinkedIn
  const allCards = [
    { name: "Raghav Sejpal", position: "Chairperson", photo: raghav, linkedin: "https://www.linkedin.com/in/raghav-sejpal/" },
    { name: "Devraj K Chandani", position: "Vice Chairperson", photo: devraj, linkedin: "https://www.linkedin.com/in/devraj-chandani-098438293/" },
    { name: "Diya Aravind", position: "Secretary", photo: diya, linkedin: "https://www.linkedin.com/in/diya-aravind-760462290/" },
    { name: "Utkarsh Kashyap", position: "Co Secretary", photo: utkarsh, linkedin: "https://www.linkedin.com/in/utkarsh-kashyap-041931285/" },
    { name: "Aryan Jain", position: "Technical Head", photo: aryan, linkedin: "https://www.linkedin.com/in/jainaryan04/" },
    { name: "Aniruddha Neema", position: "Projects Head", photo: ani, linkedin: "https://www.linkedin.com/in/aniruddhaneema/" },
    { name: "P Vishwajith", position: "AI/ML Lead", photo: vishwa, linkedin: "https://www.linkedin.com/in/vishwajith-p/" },
    { name: "Atharv Gupta", position: "Publicity & Marketing Head", photo: atharv, linkedin: "https://www.linkedin.com/in/atharv-gupta-037005245/" },
    { name: "Kshitij Vankar", position: "Events Head", photo: kshitij, linkedin: "https://www.linkedin.com/in/kshitijvankar/" },
    { name: "Saanvi Goel", position: "Design Head", photo: saanvi, linkedin: "https://www.linkedin.com/in/saanvi-goel17777/" },
    { name: "Jeevesh Malhotra", position: "App Lead", photo: jeevesh, linkedin: "https://www.linkedin.com/in/jeeveshmalhotra/" },
    { name: "Samanvi Rajput", position: "Technical Community Lead", photo: samanvi, linkedin: "https://www.linkedin.com/in/samanvi-rajput-5b90b3279/" },
    { name: "Ananya Deo", position: "Editorial Lead", photo: ananya, linkedin: "https://www.linkedin.com/in/ananya-deo-774713298/" },
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
            const progress = self.progress;
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