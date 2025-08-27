import React from "react";
import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic5.jpg";
import pic6 from "./pic6.jpg";
import pic7 from "./pic7.jpg";

const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];
const loopImages = images.concat(images); // duplicate for seamless loop

const FilmstripGallery = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Top film strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95%] h-[60px] bg-black z-10 overflow-hidden rounded-md">
        <div className="flex w-[200%] space-x-12 px-8">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-7 h-11 bg-[#f5a400] rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Middle scrolling filmstrip */}
      <div className="absolute top-[60px] bottom-[60px] w-full flex items-center overflow-hidden">
        <div
          className="flex animate-scroll"
          style={{
            width: `${loopImages.length * 654}px`,
          }}
        >
          {loopImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-[650px] h-[450px] object-cover rounded-xl mr-4"
              alt={`Member ${i % images.length + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom film strip */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[60px] bg-black z-10 overflow-hidden rounded-md">
        <div className="flex w-[200%] space-x-12 px-8 items-end">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-7 h-11 bg-[#f5a400] rounded-md"></div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FilmstripGallery;