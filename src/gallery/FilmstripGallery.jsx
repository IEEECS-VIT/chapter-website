import React, { useEffect, useRef, useState } from "react";

import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic1.jpg";

const images = [pic1, pic2, pic3, pic4, pic5];

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
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Top yellow strip */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black z-10 flex justify-start overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="w-10 h-10 bg-yellow-500 mx-1 mt-3 flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      {/* Bottom yellow strip */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10 flex justify-start overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="w-10 h-10 bg-yellow-500 mx-1 mb-3 flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      {/* Main gallery */}
      <div className="h-full flex items-center py-20">
        <div
          ref={scrollRef}
          className="flex"
          style={{
            width: `${images.length * 2 * 520}px`,
            willChange: "transform",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <div key={i} className="flex-shrink-0 mx-8">
              <img
                src={src}
                alt={`Gallery image ${(i % images.length) + 1}`}
                className="w-[500px] h-[400px] object-cover shadow-2xl rounded-lg transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmstripGallery;
