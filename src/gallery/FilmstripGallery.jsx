import React from "react";
import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic1.jpg";

const images = [pic1, pic2, pic3, pic4, pic5];

const repeatedImages = Array(20).fill(images).flat();

const FilmstripGallery = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[60px] bg-black z-10 overflow-hidden rounded-md">
        <div className="flex w-[200%] space-x-12 px-8">
          {Array(30).fill(0).map((_, i) => (
            <div key={i} className="w-7 h-11 bg-[#f5a400] rounded-md"></div>
          ))}
        </div>
      </div>


      <div className="absolute top-[60px] bottom-[60px] w-full flex items-center overflow-hidden">
        <div className="flex animate-faster-scroll-right space-x-4" style={{animationDuration: '30s'}}>
          {repeatedImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-[650px] h-[450px] object-cover rounded-xl"
              alt={`Member ${i % 5 + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] h-[60px] bg-black z-10 overflow-hidden rounded-md">
        <div className="flex w-[200%] space-x-12 px-8 items-end">
          {Array(30).fill(0).map((_, i) => (
            <div key={i} className="w-7 h-11 bg-[#f5a400] rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmstripGallery;