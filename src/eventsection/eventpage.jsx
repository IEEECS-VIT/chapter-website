import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

import event from "./assets/event.png";
import bg from "./assets/backgrnd.jpg";
import pin from "./assets/pin.png";
import cicada from "./assets/cicada.png";
import bc from "./assets/battlecode.png";
import wtf from "./assets/wtf.png";

gsap.registerPlugin(ScrollTrigger, Draggable);

const EventCard = ({ title, image, hasOverlay = false, overlayText, first = false }) => (
  <div
    className={`relative flex-shrink-0 w-[calc(374px*0.8)] sm:w-[403px] md:w-[320px] ${
      first ? "ml-8 mr-6" : "mx-4"
    } last:mr-8 mb-6 md:mb-12`}
    style={{ fontFamily: "Special Elite, cursive" }}
  >
    <div className="relative bg-gradient-to-br from-[#F8F4ED] to-[#F1ECE5] p-6 sm:p-8 md:p-5 rounded-2xl border border-gray-200/30 flex flex-col items-center justify-center h-full shadow-[0_8px_30px_rgba(255,255,255,0.15)]">
      <div className="absolute -top-24 -right-24 md:-top-40 md:-right-72 md:-translate-x-36 z-30">
        <img src={pin} alt="Pin" className="w-60 sm:w-72 md:w-80 h-auto sm:h-60 md:h-96 drop-shadow-md" />
      </div>
      <div className="relative w-[calc(320px*0.8)] sm:w-[360px] md:w-[280px] h-[calc(360px*0.8)] sm:h-[400px] md:h-[320px] overflow-hidden rounded-xl shadow-inner flex items-center justify-center bg-white/80">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-contain rounded-lg grayscale hover:grayscale-10 transition-all duration-500 ease-out scale-110"
        />
        {hasOverlay && (
          <div className="absolute w-full h-full bg-gradient-to-t from-[#4A4A4A]/70 via-[#6D6D6D]/50 to-transparent flex items-center justify-center p-6 md:p-4 opacity-0 hover:opacity-100 transition-all duration-500 ease-out backdrop-blur-sm rounded-md">
            <p className="text-white text-base sm:text-xl md:text-xl text-center tracking-wide leading-relaxed px-4 sm:px-6 py-4 break-words">
              {overlayText}
            </p>
          </div>
        )}
      </div>
      <h3 className="text-gray-800 text-4xl sm:text-2xl md:text-3xl text-center tracking-wider mt-6 md:mt-4 hover:text-gray-900 transition-colors duration-300 drop-shadow-sm">
        {title}
      </h3>
    </div>
  </div>
);

export default function EventsPage() {
  const items = [
    { id: 1, title: "HackBattle", image: event, overlayText: "A high-stakes coding face-off for the brave and bold minds." },
    { id: 2, title: "Cicada 3302", image: cicada, overlayText: "A virtual maze filled with puzzles and hidden messages." },
    { id: 3, title: "WTF", image: wtf, overlayText: "Tech takes a twist. Expect the unexpected in this quirky event." },
    { id: 4, title: "BattleCode", image: bc, overlayText: "Strategy meets code. Automate bots to battle in real-time arenas." },
    { id: 5, title: "SDG", image: event, overlayText: "A retro-style game challenge where creativity meets coding." },
    { id: 6, title: "Casa", image: event, overlayText: "Compete to solve algorithmic challenges in a timed battle." },
    { id: 7, title: "MozDev", image: event, overlayText: "A 6 hour hands-on session on Web Development for tomorrow’s devs." },
    { id: 8, title: "Emerald City", image: event, overlayText: "Unravel ciphers and cryptographic challenges under pressure." },
    { id: 9, title: "Hack For Impact", image: event, overlayText: "Solve problems in the shortest possible code." },
    { id: 10, title: "Cyberbattle", image: event, overlayText: "An adventure ride for competitive coders." },
  ];

  const scrollerRef = useRef(null);
  const pinRef = useRef(null);
  const progressRef = useRef(null);
  const arrowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    if (!scroller || !pin) return;

    const totalScroll = scroller.scrollWidth - window.innerWidth;

    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: `+=${totalScroll * 2.3}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(scroller, { x: -totalScroll }, { x: 0, ease: "none" });

      const proxy = document.createElement("div");
      let mode = "idle";

      const draggable = Draggable.create(proxy, {
        type: "x",
        trigger: pin,
        inertia: true,
        bounds: { minX: 0, maxX: totalScroll },
        onPress() {
          if (mode === "idle") mode = "drag";
          if (mode !== "drag") return;
          gsap.set(proxy, { x: tl.progress() * totalScroll });
        },
        onDrag() {
          if (mode !== "drag") return;
          const progressVal = this.x / totalScroll;
          tl.progress(progressVal);
          const st = tl.scrollTrigger;
          if (st) st.scroll(st.start + progressVal * (st.end - st.start));
        },
        onThrowUpdate() {
          if (mode !== "drag") return;
          const progressVal = this.x / totalScroll;
          tl.progress(progressVal);
          const st = tl.scrollTrigger;
          if (st) st.scroll(st.start + progressVal * (st.end - st.start));
        },
      })[0];

      ScrollTrigger.addEventListener("scrollStart", () => {
        if (mode === "idle") mode = "scroll";
      });
      ScrollTrigger.addEventListener("scrollEnd", () => {
        gsap.set(proxy, { x: tl.progress() * totalScroll });
        mode = "idle";
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf(scroller);
        draggable.kill();
      };
    } else {
      gsap.set(scroller, { x: -totalScroll });
      gsap.set(progress, { width: "0%", right: 0, left: "auto" });

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "+=0",
        pin: true,
        anticipatePin: 1,
      });

      const proxy = document.createElement("div");
      gsap.set(proxy, { x: -totalScroll });

      const updateProgress = (x) => {
        const progressValue = 1 - Math.abs(x) / totalScroll;
        gsap.set(progress, { width: `${progressValue * 100}%` });
      };

      const draggable = Draggable.create(proxy, {
        type: "x",
        trigger: pin,
        inertia: true,
        bounds: { minX: -totalScroll, maxX: 0 },
        throwResistance: 30,
        edgeResistance: 0.85,
        dragResistance: 0.1,
        onPress() {
          document.body.style.userSelect = "none";
          gsap.set(proxy, { x: gsap.getProperty(scroller, "x") });
          if (arrowRef.current) {
            gsap.to(arrowRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
            arrowRef.current = null;
          }
        },
        onDrag() {
          const clampedX = gsap.utils.clamp(-totalScroll, 0, this.x);
          gsap.set(scroller, { x: clampedX });
          updateProgress(clampedX);
        },
        onThrowUpdate() {
          const clampedX = gsap.utils.clamp(-totalScroll, 0, this.x);
          gsap.set(scroller, { x: clampedX });
          updateProgress(clampedX);
        },
        onRelease() {
          const clampedX = gsap.utils.clamp(-totalScroll, 0, this.x);
          gsap.to(scroller, { x: clampedX, duration: 0.3, ease: "power2.out" });
        }
      })[0];

      updateProgress(-totalScroll);

      return () => {
        draggable.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf(scroller);
      };
    }
  }, [isMobile]);

  return (
    <div
      ref={pinRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        userSelect: "none",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-white text-5xl sm:text-6xl font-bold -mt-4 mb-10 tracking-widest text-center select-none">
          EVENTS
        </h1>
        <div className="w-screen h-0.5 bg-white mb-2 -mt-4" />
        <div className="w-screen h-0.5 bg-white mb-10 sm:mb-16 -mt-4" />
        <div className="w-full overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex cursor-grab active:cursor-grabbing will-change-transform select-none pl-20"
          >
            {items.map((item, idx) => (
              <EventCard key={item.id} {...item} first={idx === 0} hasOverlay />
            ))}
          </div>
        </div>
        {isMobile && (
          <div className="relative w-3/4 h-2 bg-white/30 rounded-full mt-8">
            <div ref={progressRef} className="absolute top-0 h-full bg-white rounded-full" />
          </div>
        )}
        <div
          ref={arrowRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center z-50 opacity-100 sm:hidden"
        >
          <div className="animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
        <div className="w-screen h-0.5 bg-white mt-10 mb-2" />
        <div className="w-screen h-0.5 bg-white mb-5" />
      </div>
    </div>
  );
}
