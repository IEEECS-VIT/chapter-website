import React, { useEffect, useRef, useState } from "react";


import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.jpg";
import s6 from "../assets/s6.jpg";
import s7 from "../assets/s7.jpg";
import s8 from "../assets/s8.jpg";
import s9 from "../assets/s9.jpg";
import s10 from "../assets/s10.jpg";

const images = [s1,s2,s7,s6,s5,s3,s4,s8,s9,s10];

const FilmstripGallery = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const posRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const strip = scrollRef.current;
    if (!strip) return;

    const step = () => {
      if (!isPaused) {
        posRef.current -= 1;
        if (Math.abs(posRef.current) >= strip.scrollWidth / 2) {
          posRef.current = 0;
        }
        strip.style.transform = `translateX(${posRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  return (
  <div className="w-full h-screen bg-black overflow-hidden relative flex flex-col">
 
    <div className="flex justify-start overflow-hidden h-16 bg-black z-10">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`top-${i}`}
          className="w-10 h-10 bg-yellow-500 mx-1.5 flex-shrink-0 rounded-lg"
        />
      ))}
    </div>

    <div className="flex-1 flex items-center justify-center">
      <div
        ref={scrollRef}
        className="flex"
        style={{
          width: `${images.length * 2 * 520}px`,
          willChange: "transform",
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="flex-shrink-0 mx-3">
            <img
              src={src}
              alt={`Gallery image ${(i % images.length) + 1}`}
              className="w-[500px] h-[400px] object-cover shadow-2xl rounded-lg transition-transform duration-300 hover:scale-105 grayscale"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-start overflow-hidden h-16 bg-black z-10">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`bottom-${i}`}
          className="w-10 h-10 bg-yellow-500 mx-1.5 flex-shrink-0 rounded-lg"
        />
      ))}
    </div>
  </div>
);

};

export default FilmstripGallery;
