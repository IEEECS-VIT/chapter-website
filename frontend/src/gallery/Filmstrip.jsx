import React, { useEffect, useRef } from "react";

import s1 from "/assets/gallery/s1.jpg";
import s2 from "/assets/gallery/s2.jpg";
import s3 from "/assets/gallery/s3.jpg";
import s4 from "/assets/gallery/s4.jpg";
import s5 from "/assets/gallery/s5.jpg";
import s6 from "/assets/gallery/s6.jpg";
import s7 from "/assets/gallery/s7.jpg";
import s8 from "/assets/gallery/s8.jpg";
import s9 from "/assets/gallery/s9.jpg";
import s10 from "/assets/gallery/s10.jpg";
import s11 from "/assets/gallery/s11.webp";
//update this to modfy images
const imagesPool = [s1, s2, s5, s4, s3, s6, s7, s8, s10, s9, s11];

const images = [];

for (let i = 0; i >0; i++) {
  const randomIndex = Math.floor(Math.random() * imagesPool.length);
  images.push(imagesPool[randomIndex]);
}

function addRandomImage() {
  const randomIndex = Math.floor(Math.random() * imagesPool.length);
  images.push(imagesPool[randomIndex]);
  return images;
}


setInterval(() => {
  addRandomImage();
  console.log(images);
}, 1000);

const FilmstripGallery = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const posRef1 = useRef(0);
  const posRef2 = useRef(0);
  const animationRef = useRef(null);

 
  const isPausedRef = useRef(false);

  useEffect(() => {
    const strip1 = scrollRef1.current;
    const strip2 = scrollRef2.current;
    if (!strip1 || !strip2) return;

    const step = () => {
      if (!isPausedRef.current) {
        posRef1.current += 1;
        strip1.style.transform = `translateX(-${posRef1.current}px)`;

        posRef2.current += 1;
        strip2.style.transform = `translateX(${posRef2.current}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative flex flex-col">
      <div className="flex justify-start overflow-hidden h-10 mt-0 bg-black z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="w-10 h-10 bg-yellow-500 mx-1.5 flex-shrink-0 rounded-lg"
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <div
          ref={scrollRef1}
          className="flex sm:flex md:flex lg:hidden xl:hidden"
          style={{
            width: `${images.length * 2 * 520}px`,
            willChange: "transform",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <div key={`s1-${i}`} className="flex-shrink-0 mx-3">
              <img
                src={src}
                alt={`Gallery image ${(i % images.length) + 1}`}
                className="object-cover shadow-2xl rounded-lg transition-transform duration-300 hover:scale-105 grayscale
                  w-[400px] h-[300px] md:w-[500px] md:h-[400px] lg:w-[550px] lg:h-[450px] xl:w-[600px] xl:h-[500px]"
                onMouseEnter={() => (isPausedRef.current = true)}
                onMouseLeave={() => (isPausedRef.current = false)}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div
          ref={scrollRef2}
          className="flex"
          style={{
            width: `${images.length * 2 * 620}px`,
            willChange: "transform",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <div key={`s2-${i}`} className="flex-shrink-0 mx-3">
              <img
                src={src}
                alt={`Gallery image ${(i % images.length) + 1}`}
                className="object-cover shadow-xl rounded-lg transition-transform duration-300 hover:scale-105 grayscale
                  w-[400px] h-[300px] md:w-[500px] md:h-[400px] lg:w-[550px] lg:h-[450px] xl:w-[600px] xl:h-[500px]"
                onMouseEnter={() => (isPausedRef.current = true)}
                onMouseLeave={() => (isPausedRef.current = false)}
                loading="lazy"
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
