import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import H from "../effects/Highlight";
import event from "./assets/event.png";
import bg from "./assets/backgrnd.jpg";
import pin from "./assets/pin.png";
import cicada from "./assets/cicada.png";
import bc from "./assets/battlecode.png";
import wtf from "./assets/wtf.png";
import h4i from "./assets/h4i.png";

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
    { id: 2, title: "Cicada 3310", image: cicada, overlayText: "A virtual maze filled with puzzles and hidden messages." },
    { id: 3, title: "WTF", image: wtf, overlayText: "Tech takes a twist. Expect the unexpected in this quirky event." },
    { id: 4, title: "BattleCode", image: bc, overlayText: "Strategy meets code. Automate bots to battle in real-time arenas." },
    { id: 5, title: "SDG", image: event, overlayText: "A retro-style game challenge where creativity meets coding." },
    { id: 6, title: "Casa", image: event, overlayText: "Compete to solve algorithmic challenges in a timed battle." },
    { id: 7, title: "MozDev", image: event, overlayText: "A 6 hour hands-on session on Web Development for tomorrow’s devs." },
    { id: 8, title: "Emerald City", image: event, overlayText: "Unravel ciphers and cryptographic challenges under pressure." },
    { id: 9, title: "Hack For Impact", image: h4i, overlayText: "Solve problems in the shortest possible code." },
    { id: 10, title: "Cyberbattle", image: event, overlayText: "An adventure ride for competitive coders." },
  ];

  const scrollerRef = useRef(null);
  const pinRef = useRef(null);
  const progressRef = useRef(null);
  const knobRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const pin = pinRef.current;
    const progress = progressRef.current;
    const knob = knobRef.current;
    if (!scroller || !pin || !progress || !knob) return;

    const totalScroll = scroller.scrollWidth - window.innerWidth;
    const maxKnobX = progress.parentElement.offsetWidth - knob.offsetWidth;
    const clamp = gsap.utils.clamp;

    gsap.set(scroller, { x: 0 });
    gsap.set(progress, { width: "0%" });
    gsap.set(knob, { x: 0 });

    let scrollTriggerInstance;
    let isDragging = false;

    const updateFromKnob = (knobX) => {
      const clampedX = clamp(0, maxKnobX, knobX);
      const progressValue = clampedX / maxKnobX;
      const scrollerX = clamp(-totalScroll, 0, -progressValue * totalScroll);
      gsap.set(progress, { width: `${progressValue * 100}%` });
      gsap.set(knob, { x: clampedX });
      gsap.set(scroller, { x: scrollerX });
      if (scrollTriggerInstance && isDragging) {
        const st = scrollTriggerInstance;
        st.scroll(st.start + progressValue * (st.end - st.start));
      }
    };

    const updateFromScroll = (progressValue) => {
      if (isDragging) return;
      const clampedProgress = clamp(0, 1, progressValue);
      const knobX = clampedProgress * maxKnobX;
      const scrollerX = clamp(-totalScroll, 0, -clampedProgress * totalScroll);
      gsap.set(progress, { width: `${clampedProgress * 100}%` });
      gsap.set(knob, { x: knobX });
      gsap.set(scroller, { x: scrollerX });
    };

    const proxy = document.createElement("div");
    gsap.set(proxy, { x: 0 });

    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: knob,
      inertia: true,
      edgeResistance: 0.65,
      bounds: { minX: 0, maxX: maxKnobX },
      onPress() {
        isDragging = true;
        document.body.style.userSelect = "none";
      },
      onDrag() {
        updateFromKnob(this.x);
      },
      onThrowUpdate() {
        updateFromKnob(this.x);
      },
      onRelease() {
        isDragging = false;
        document.body.style.userSelect = "";
      },
    })[0];

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: `+=${maxKnobX * 6.5}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        updateFromScroll(self.progress);
      },
    });

    updateFromScroll(0);

    return () => {
      draggable.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(scroller);
    };
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
            <div
              ref={knobRef}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md cursor-pointer"
            />
          </div>
        )}

        <div className="w-screen h-0.5 bg-white mt-10 mb-2" />
        <div className="w-screen h-0.5 bg-white mb-5" />
      </div>
    </div>
  );
}