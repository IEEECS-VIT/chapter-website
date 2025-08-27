import React, { useEffect, useRef, useState } from "react";
import bg from "./assets/bg2.png"; // background image
import eventImg from "./assets/event.png"; // event image

const EventsPage = () => {
  const cardsWrapperRef = useRef(null);
  const [showDebug, setShowDebug] = useState(false);

  const events = [
    {
      id: 1,
      title: "HackBattle",
      description: "A high-stakes coding face-off for the brave and bold minds.",
      image: eventImg,
    },
    {
      id: 2,
      title: "PixelQuest",
      description: "Tech takes a twist. Expect the unexpected in this quirky event.",
      image: eventImg,
    },
    {
      id: 3,
      title: "BattleCode",
      description: "Strategy meets code. Automate bots to battle in real-time arenas.",
      image: eventImg,
    },
    {
      id: 4,
      title: "WTF",
      description: "A retro-style game challenge where creativity meets coding.",
      image: eventImg,
    },
    {
      id: 5,
      title: "Cicada 3310",
      description: "Speed coding meets competitive programming in this thrilling event.",
      image: eventImg,
    },
    {
      id: 6,
      title: "DataDash",
      description: "Dive deep into data structures and algorithms in this challenging race.",
      image: eventImg,
    },
    {
      id: 7,
      title: "TechTalk",
      description: "Present your innovative ideas and compete with brilliant minds.",
      image: eventImg,
    },
    {
      id: 8,
      title: "AlgoArena",
      description: "Test your cybersecurity skills in this intense hacking challenge.",
      image: eventImg,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsWrapperRef.current) return;

      const cardsWrapper = cardsWrapperRef.current;
      const cardElements = cardsWrapper.querySelectorAll(".stacking-card");
      const wrapperRect = cardsWrapper.getBoundingClientRect();
      const wrapperTop = wrapperRect.top;
      const wrapperHeight = wrapperRect.height;

      cardElements.forEach((card, index) => {
        const progress = Math.max(
          0,
          Math.min(1, -wrapperTop / (wrapperHeight - window.innerHeight))
        );

        const cardProgress = Math.max(
          0,
          Math.min(1, progress * (events.length - 1) - index)
        );

        const reverseIndex = events.length - index - 1;
        const minScale = 1 - 0.1 * reverseIndex;
        const scale = 1 - cardProgress * (1 - minScale);

        card.style.transform = `scale(${scale})`; // ✅ fixed
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [events.length]);

  return (
    <div
      className="min-h-screen text-white bg-fixed"
      style={{
        backgroundImage: `url(${bg})`, // ✅ fixed
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Top Section (Title only) */}
      <div className="text-center py-8 px-4">
        <h1 className="text-white text-3xl sm:text-4xl font-light tracking-wider mb-5">
          (2025–2026)
        </h1>
        <div className="w-full h-0.5 bg-white mb-2"></div>
        <div className="w-full h-0.5 bg-white mb-5"></div>
        <h1 className="text-white text-5xl sm:text-6xl font-bold mb-7 tracking-widest">
          EVENTS
        </h1>
        <div className="w-full h-0.5 bg-white mb-2"></div>
        <div className="w-full h-0.5 bg-white mb-8"></div>
      </div>

      {/* Stacking Cards */}
      <main className="w-4/5 sm:w-4/5 mx-auto">
        <ul
          ref={cardsWrapperRef}
          className={`list-none grid grid-cols-1 gap-12 mb-16 ${
            showDebug ? "outline outline-blue-500 outline-[10px]" : ""
          }`}
          style={{
            gridTemplateRows: `repeat(${events.length}, minmax(400px, 50vh))`, // ✅ fixed
            paddingBottom: `calc(${events.length} * 1em)`, // ✅ fixed
          }}
        >
          {events.map((event, index) => (
            <li
              key={event.id}
              className={`stacking-card sticky top-0 will-change-transform origin-top transition-transform duration-300 ${
                showDebug ? "outline outline-pink-500 outline-1" : ""
              }`}
              style={{
                paddingTop: `calc(${index + 1} * 1em)`, // ✅ fixed
              }}
            >
              <div
                className={`bg-white text-gray-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 h-full ${
                  showDebug ? "outline outline-lime-500 outline-1" : ""
                }`}
              >
                {/* Left Content */}
                <div className="flex flex-col justify-center p-6 sm:p-8 gap-4 text-center md:text-left">
                  <h2 className="text-2xl sm:text-4xl font-bold">{event.title}</h2>
                  <p className="text-base sm:text-lg leading-relaxed">{event.description}</p>
                </div>
                {/* Right Image */}
                <figure className="overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default EventsPage;
