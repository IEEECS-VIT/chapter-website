import React, { useEffect, useRef } from "react";

import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic1.jpg";

const images = [pic1, pic2, pic3, pic4, pic5];

const FilmstripGallery = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const strip = scrollRef.current;
    if (!strip) return;

    let animation;
    let pos = 0;

    const step = () => {
      pos -= 1; 
      if (Math.abs(pos) >= strip.scrollWidth / 2) {
        pos = 0;
      }
      strip.style.transform = `translateX(${pos}px)`;
      animation = requestAnimationFrame(step);
    };

    animation = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-black z-10 flex justify-start overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="w-10 h-10 bg-yellow-500 mx-1 mt-3 flex-shrink-0"
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10 flex justify-start overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="w-10 h-10 bg-yellow-500 mx-1 mb-3 flex-shrink-0"
          />
        ))}
      </div>

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
                className="w-[500px] h-[400px] object-cover shadow-2xl rounded-lg" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmstripGallery;
