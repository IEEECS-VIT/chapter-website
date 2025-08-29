import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import event from "./assets/event.png";
import bg from "./assets/bg2.png";

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, image, hasOverlay = false, overlayText, first = false }) => {
  return (
    <div
      className={`flex-shrink-0 w-[374px] sm:w-[403px] md:w-[320px] ${
        first ? "ml-8 mr-4" : "mx-4"
      } last:mr-8 mb-6 md:mb-12`}
    >
      <div className="relative bg-gradient-to-br from-[#F8F4ED] to-[#F1ECE5] p-6 sm:p-8 md:p-5 rounded-2xl shadow-lg border border-gray-200/30 flex flex-col items-center justify-center h-full">
        <div className="relative w-[373px] sm:w-[389px] md:w-[320px] h-[404px] sm:h-[451px] md:h-[323px] overflow-hidden rounded-xl shadow-inner flex items-center justify-center">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-out"
          />
          {hasOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A2A]/90 via-[#5D5A5A]/70 to-transparent flex items-center justify-center p-6 md:p-4 opacity-0 hover:opacity-100 transition-all duration-500 ease-out backdrop-blur-sm">
              <p className="text-white text-base sm:text-lg md:text-sm text-center font-serif tracking-wide leading-relaxed px-4 sm:px-6 py-4 break-words">
                {overlayText}
              </p>
            </div>
          )}
        </div>
        <h3 className="text-gray-800 text-xl sm:text-2xl md:text-lg text-center tracking-wider mt-6 md:mt-4 font-mono hover:text-gray-900 transition-colors duration-300 drop-shadow-sm">
          {title}
        </h3>
      </div>
    </div>
  );
};


export default function EventsPage() {
  const items = [
    { id: 1, title: "HackBattle", image: event, overlayText: "A high-stakes coding face-off for the brave and bold minds." },
    { id: 2, title: "Cicada 3310", image: event, overlayText: "A virtual maze packed with mind-bending puzzles and hidden clues." },
    { id: 3, title: "WTF", image: event, overlayText: "Tech takes a twist. Expect the unexpected in this quirky event." },
    { id: 4, title: "BattleCode", image: event, overlayText: "Strategy meets code. Automate bots to battle in real-time arenas." },
    { id: 5, title: "PixelQuest", image: event, overlayText: "A retro-style game challenge where creativity meets coding." },
    { id: 6, title: "AlgoArena", image: event, overlayText: "Compete to solve algorithmic challenges in a timed battle." },
    { id: 7, title: "Debug Derby", image: event, overlayText: "Race against time to fix bugs and restore systems." },
    { id: 8, title: "CryptoQuest", image: event, overlayText: "Unravel ciphers and cryptographic challenges under pressure." },
    { id: 9, title: "CodeGolf", image: event, overlayText: "Solve problems in the shortest possible code." },
    { id: 10, title: "TechTrivia", image: event, overlayText: "Test your tech knowledge in a rapid-fire trivia challenge." },
  ];

  const scrollerRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const pin = pinRef.current;
    if (!scroller || !pin) return;

    const totalScroll = scroller.scrollWidth - window.innerWidth;

    gsap.set(scroller, { x: -totalScroll });

    gsap.to(scroller, {
      x: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 2.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-2xl sm:text-4xl font-light tracking-wider mb-5 mt-8">
        (2025–2026)
      </h1>
      <div className="w-full h-0.5 bg-white mb-2" />
      <div className="w-full h-0.5 bg-white mb-5" />
      <h1 className="text-white text-4xl sm:text-6xl font-bold mb-7 tracking-widest">
        EVENTS
      </h1>
      <div className="w-full h-0.5 bg-white mb-2" />
      <div className="w-full h-0.5 bg-white mb-[50px] sm:mb-[75px]" />
      <div className="w-full overflow-hidden">
        <div ref={scrollerRef} className="flex will-change-transform">
          {items.map((item, idx) => (
            <EventCard
              key={item.id}
              title={item.title}
              image={item.image}
              hasOverlay
              overlayText={item.overlayText}
              first={idx === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
