import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElasticSlider from "./ElasticSlider";
import event from "/assets/events/event.webp";
import bg from "/assets/events/backgrnd.webp";
import pin from "/assets/events/pin.webp";
import cicada from "/assets/events/cicada.webp";
import bc from "/assets/events/bccb.webp";
import wtf from "/assets/events/wtf.webp";
import h4i from "/assets/events/h4i.webp";
import mozdev from "/assets/events/mozdev.webp";
import casa from "/assets/events/casa.webp";
import sdg from "/assets/events/sdg.webp";
import cb from "/assets/events/cyberbattle.webp";
import ec from "/assets/events/ec.webp";

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, image, hasOverlay = false, overlayText, first = false }) => (
  <div
    className={`relative flex-shrink-0 mb-8 w-[235px] sm:w-[280px] md:w-[280px] lg:w-[320px] xl:w-[360px] ${
      first ? "ml-4 sm:ml-8" : "ml-4"
    } last:mr-4 sm:last:mr-8`}
    style={{ fontFamily: "Special Elite, cursive" }}
  >
    <div className="relative bg-gradient-to-br from-[#F8F4ED] to-[#F1ECE5] p-3 sm:p-5 rounded-2xl border border-gray-200/30 flex flex-col items-center justify-center h-full shadow-[0_6px_20px_rgba(255,255,255,0.15)]">
      <div className="absolute -top-10 -right-10 -translate-y-1/4 translate-x-1/4 sm:-top-14 sm:-right-12 md:-top-14 md:-right-12 lg:-top-14 lg:-right-12 z-30 rotate-[-10deg]" loading="lazy">
        <img src={pin} alt="Pin" className="w-58 sm:w-96 md:w-78 lg:w-86 h-auto drop-shadow-md" />
      </div>
      <div className="relative w-full h-[235px] sm:h-[240px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-xl shadow-inner flex items-center justify-center bg-white/80">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-contain rounded-lg grayscale hover:grayscale-0 transition-all duration-500 ease-out scale-105" loading="lazy"
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
  const items = [
    { id: 1, title: "HackBattle", image: event, overlayText: "An overnight hackathon where innovators collaborate to turn ideas into impactful solutions." },
    { id: 2, title: "Cicada 3310", image: cicada, overlayText: "A mystery-filled cipher challenge that pushes participants to discover hidden meanings and deeper purposes." },
    { id: 3, title: "WTF", image: wtf, overlayText: "A Capture The Flag-style cybersecurity competition testing problem-solving and technical skills." },
    { id: 4, title: "BattleCode", image: bc, overlayText: "A fast-paced coding competition designed to test strategy and programming under pressure." },
    { id: 5, title: "SDG", image: sdg, overlayText: "An IEEE CS SDG event at VIT drives tech-powered awareness and action toward the UN’s 17 Sustainable Development Goals." },
    { id: 6, title: "CASA", image: casa, overlayText: "An IEEE CS CASA event at VIT raises awareness and promotes action against substance abuse through technology." },
    { id: 7, title: "MozDev", image: mozdev, overlayText: "A six-hour web development workshop offering practical, hands-on experience." },
    { id: 8, title: "Emerald City", image: ec, overlayText: "A competition focused on solving  ciphers in high-pressure settings." },
    { id: 9, title: "Hack For Impact", image: h4i, overlayText: "A coding challenge emphasizing elegant, compact solutions." },
    { id: 10, title: "Cyberbattle", image: cb, overlayText: "A hands on cybersecurity workshop to help people develop more secure applications " },
  ];

  const scrollerRef = useRef(null);
  const pinRef = useRef(null);
  const tlRef = useRef(null);

  const [sliderValue, setSliderValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1000);
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
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-henju -mt-1 font-bold mb-8 sm:mb-12 tracking-widest text-center select-none">
          EVENTS
        </h1>
        <div className="w-screen h-0.5 bg-white mb-1 sm:mb-2" />
        <div className="w-screen h-0.5 bg-white mb-8 sm:mb-8 lg:mb-14" />
        <div className="w-full overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 cursor-grab active:cursor-grabbing will-change-transform select-none pl-4 sm:pl-8 lg:pl-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {items.map((item, idx) => (
              <EventCard key={item.id} {...item} first={idx === 0} hasOverlay />
            ))}
          </div>
        </div>
        <div className="absolute left-1/2 bottom-[10%] transform -translate-x-1/2 rounded-2xl p-5 z-50 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] block lg:hidden">
          <ElasticSlider

            value={sliderValue}
            maxValue={maxScroll}
            stepSize={10}
            onChange={handleSliderChange}
          />
        </div>
        <div className="w-screen h-0.5 bg-white mt-3 sm:mt-10 mb-1 sm:mb-2" />
        <div className="w-screen h-0.5 bg-white mb-3 sm:mb-6" />
      </div>
    </div>
  );
}
