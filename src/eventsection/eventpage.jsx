import { useState, useEffect, useCallback, useRef } from "react";
import event from "./assets/event.png";
import bg from "./assets/bg2.png";

// EventCard Component (with hover styles)
const EventCard = ({
  title,
  image,
  hasOverlay = false,
  overlayText,
  scrollProgress = 0,
}) => {
  return (
    <div className="relative group block transition-transform duration-500 ease-out">
      {/* Stacked shadow layer */}
      <div className="absolute top-3 left-3 w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg z-0 opacity-50 blur-sm"></div>

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-[#F8F4ED] to-[#F1ECE5] p-8 pb-8 rounded-lg transition-all duration-500 ease-out z-10 shadow-lg group-hover:shadow-[12px_16px_32px_rgba(0,0,0,0.25)] border border-gray-200/30">
        <div className="w-[280px]">
          {/* Image */}
          <div className="relative w-[250px] h-[290px] mb-6 overflow-hidden mt-[20px] transition-all duration-500 ease-out rounded-lg group-hover:rounded-2xl shadow-inner">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
              style={{
                transform: `rotate(${scrollProgress * 360}deg) scale(1.05)`,
                transition: "transform 0.5s ease-out, filter 0.5s ease-out",
              }}
            />
            {hasOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A2A]/90 via-[#5D5A5A]/70 to-transparent flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden backdrop-blur-sm">
                <p className="text-white text-base text-center font-serif tracking-wide leading-relaxed px-6 py-5 break-words transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {overlayText}
                </p>
              </div>
            )}
          </div>
          {/* Title */}
          <h3 className="text-gray-800 text-[1.3rem] text-center tracking-wider mt-[36px] font-SpecialElite group-hover:text-gray-900 transition-colors duration-300 drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function EventsPage() {
  const items = [
    {
      id: 1,
      title: "HackBattle",
      image: event,
      overlayText: "A high-stakes coding face-off for the brave and bold minds.",
    },
    {
      id: 2,
      title: "Cicada 3310",
      image: event,
      overlayText:
        "A virtual maze packed with mind-bending puzzles and hidden clues. Hugely popular among cryptic geeks.",
    },
    {
      id: 3,
      title: "WTF",
      image: event,
      overlayText:
        "Tech takes a twist. Expect the unexpected in this quirky event.",
    },
    {
      id: 4,
      title: "BattleCode",
      image: event,
      overlayText:
        "Strategy meets code. Automate bots to battle in real-time arenas.",
    },
  ];

  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate progress based on how much the component has scrolled through viewport
    let progress = 0;
    
    if (containerRect.top <= 0 && containerRect.bottom >= viewportHeight) {
      // Component fills viewport - calculate based on how far it has scrolled
      progress = Math.abs(containerRect.top) / (containerRect.height - viewportHeight);
    } else if (containerRect.top > 0) {
      // Component hasn't reached top yet
      progress = 0;
    } else {
      // Component has passed through
      progress = 1;
    }
    
    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  const cardWidthVh = 13;
  const cardGapVh = 40;

  const getCardStyle = (index) => {
    const numItems = items.length;
    const totalWidth = numItems * cardWidthVh + (numItems - 1) * cardGapVh;
    const startOffset = -totalWidth / 2 + cardWidthVh / 2;
    const initialOffset = startOffset + index * (cardWidthVh + cardGapVh);
    
    // Smooth convergence to center (0)
    const currentX = initialOffset * (1 - scrollProgress);
    const zIndex = numItems - index;

    // Smooth scale effect - cards scale down slightly as they converge
    const scale = 1 - (scrollProgress * 0.05 * Math.abs(index - 1.5));
    
    // Smooth opacity - outer cards fade as they converge
    let opacity = 1;
    if (scrollProgress > 0.8) {
      if (index === 0) {
        opacity = 1; // Keep first card always visible
      } else {
        opacity = 1 - ((scrollProgress - 0.8) / 0.2); // Fade out other cards in last 20%
      }
    }

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) translateX(${currentX}vh) scale(${scale})`,
      zIndex,
      opacity,
      transition: "none", // Remove transitions for smoother scroll-based animation
    };
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-center relative h-[135vh]"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
        <h1 className="text-white text-4xl font-light tracking-wider mb-8 mt-0">(202X–202X)</h1>
        <div className="w-full h-0.5 bg-white mb-2"></div>
        <div className="w-full h-0.5 bg-white mb-3"></div>
        <h1 className="text-white text-6xl font-bold mb-4 z-10 tracking-widest">
          EVENTS
        </h1>
        <div className="w-full h-0.5 bg-white mb-2"></div>
        <div className="w-full h-0.5 bg-white mb-3"></div>
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {items.map((item, index) => (
            <div key={item.id} style={getCardStyle(index)}>
              <EventCard
                title={item.title}
                image={item.image}
                hasOverlay={true}
                overlayText={item.overlayText}
                scrollProgress={scrollProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}