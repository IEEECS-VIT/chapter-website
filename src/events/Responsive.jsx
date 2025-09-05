import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElasticSlider from "./ElasticSlider";
import event from "../assets/events/event.png";
import bg from "../assets/events/backgrnd.jpg";
import pin from "../assets/events/pin.png";
import cicada from "../assets/events/cicada.png";
import bc from "../assets/events/bccb.png";
import wtf from "../assets/events/wtf.png";
import h4i from "../assets/events/h4i.png";
import mozdev from "../assets/events/mozdev.jpg";
import casa from "../assets/events/casa.jpg";
import sdg from "../assets/events/sdg.jpg";
import cb from "../assets/events/cyberbattle.jpg";
import ec from "../assets/events/ec.jpg";

gsap.registerPlugin(ScrollTrigger);

//Event card template 
const EventCard = ({ title, image, hasOverlay = false, overlayText, first = false }) => (
  <div
    className={`relative flex-shrink-0 w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] ${
      first ? "ml-4 sm:ml-8" : "ml-4"
    } last:mr-4 sm:last:mr-8`}
    style={{ fontFamily: "Special Elite, cursive" }}
  >
    <div className="relative bg-gradient-to-br from-[#F8F4ED] to-[#F1ECE5] p-3 sm:p-5 rounded-2xl border border-gray-200/30 flex flex-col items-center justify-center h-full shadow-[0_6px_20px_rgba(255,255,255,0.15)]">

      <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-20 md:-top-24 md:-right-28 z-30">
        <img
          src={pin}
          alt="Pin"
          className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto drop-shadow-md"
        />
      </div>

      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden rounded-xl shadow-inner flex items-center justify-center bg-white/80">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-contain rounded-lg grayscale hover:grayscale-0 transition-all duration-500 ease-out scale-105"
        />
        {hasOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A4A4A]/70 via-[#6D6D6D]/50 to-transparent flex items-center justify-center p-2 sm:p-4 opacity-0 hover:opacity-100 transition-all duration-500 ease-out backdrop-blur-sm rounded-md">
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center tracking-wide leading-relaxed px-2 sm:px-4 break-words">
              {overlayText}
            </p>
          </div>
        )}
      </div>

      
      <h3 className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl text-center tracking-wider mt-3 hover:text-gray-900 transition-colors duration-300 drop-shadow-sm">
        {title}
      </h3>
    </div>
  </div>
);

export default function EventsPage() {
  const items = [ //update list for adding/subtracting events
    { id: 1, title: "HackBattle", image: event, overlayText: "A high-stakes coding face-off for the brave and bold minds." },
    { id: 2, title: "Cicada 3310", image: cicada, overlayText: "A virtual maze filled with puzzles and hidden messages." },
    { id: 3, title: "WTF", image: wtf, overlayText: "Tech takes a twist. Expect the unexpected in this quirky event." },
    { id: 4, title: "BattleCode", image: bc, overlayText: "Strategy meets code. Automate bots to battle in real-time arenas." },
    { id: 5, title: "SDG", image: sdg, overlayText: "A retro-style game challenge where creativity meets coding." },
    { id: 6, title: "CASA", image: casa, overlayText: "Compete to solve algorithmic challenges in a timed battle." },
    { id: 7, title: "MozDev", image: mozdev, overlayText: "A 6 hour hands-on session on Web Development for tomorrow’s devs." },
    { id: 8, title: "Emerald City", image: ec, overlayText: "Unravel ciphers and cryptographic challenges under pressure." },
    { id: 9, title: "Hack For Impact", image: h4i, overlayText: "Solve problems in the shortest possible code." },
    { id: 10, title: "Cyberbattle", image: cb, overlayText: "An adventure ride for competitive coders." },
  ];

  const scrollerRef = useRef(null);
  const pinRef = useRef(null);
  const tlRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1000);
  
useEffect(() => {
  const timeout = setTimeout(() => {
    ScrollTrigger.refresh(); //force recalculation after preload
  }, 100);

  return () => clearTimeout(timeout);
}, []);

  //gsap timeline
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

      const totalScroll = scroller.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      setMaxScroll(totalScroll);

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${totalScroll * 2.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true, 
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // keep slider synced while scrolling
            const clampedProgress = Math.min(1, Math.max(0, self.progress));
            setSliderValue(clampedProgress * totalScroll);
          },
        },
      });

      tl.fromTo(scroller, { x: -totalScroll }, { x: 0, ease: "none" });

      tlRef.current = tl;
    };

    setupAnimation();
    ScrollTrigger.refresh();

    const handleResize = () => {
      setupAnimation();
      ScrollTrigger.refresh();
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

    requestAnimationFrame(() => {
      const tl = tlRef.current;
      if (tl && tl.scrollTrigger) {
        const progress = Math.min(1, Math.max(0, val / maxScroll)); // clamp
        tl.scrollTrigger.scroll(
          progress * (tl.scrollTrigger.end - tl.scrollTrigger.start) + tl.scrollTrigger.start
        );
      }
    });
  };

  return (
    <div
      ref={pinRef}
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden select-none"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-henju mt-3 font-bold mb-8 sm:mb-12 tracking-widest text-center select-none">
          EVENTS
        </h1>

        {/*top dividers*/}
        <div className="w-screen h-0.5 bg-white mb-1 sm:mb-2 -mt-2 sm:-mt-4" />
        <div className="w-screen h-0.5 bg-white mb-6 sm:mb-10 lg:mb-16 -mt-2" />

        {/*event cards*/}
        <div className="w-full overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 cursor-grab active:cursor-grabbing will-change-transform select-none pl-4 sm:pl-8 lg:pl-16"
          >
            {items.map((item, idx) => (
              <EventCard key={item.id} {...item} first={idx === 0} hasOverlay />
            ))}
          </div>
        </div>

        {/*popup slider*/}
        <div className="fixed left-1/2 bottom-[10%] transform -translate-x-1/2 bg-black/80 backdrop-blur-md shadow-lg rounded-2xl p-5 z-50 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] block lg:hidden">
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
            defaultValue={sliderValue}
            maxValue={maxScroll}
            isStepped
            stepSize={10}
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>

        {/*bottom dividers*/}
        <div className="w-screen h-0.5 bg-white mt-8 sm:mt-10 mb-1 sm:mb-2" />
        <div className="w-screen h-0.5 bg-white mb-4 sm:mb-6" />
      </div>
    </div>
  );
}