import { useRef } from "react";
import CoverPage from "./CoverPage";
import clip1 from "./assets/clip1.png";
import clip2 from "./assets/clip2.png";
import texturedbg from "./assets/texturedbg.png";
import view from "./assets/view.png";

const ProjectDisplay = ({ data }) => {
  const containerRef = useRef();

  if (data.isCover) {
    return <CoverPage data={data} />;
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col xl:flex-row pl-4 xl:pl-0 mt-6 md:mt-8 xl:mt-10 relative items-start text-[#4B3200]"
    >

      <div className="w-full xl:w-[60%] px-4 xl:pl-20 flex flex-col items-center xl:h-screen">
        <div className="relative w-full">
          <h2 className="text-3xl md:text-6xl xl:text-6xl text-center xl:text-left font-bold text-[#4B3200]">
            {data.title}
          </h2>
        </div>

        <div className="relative mt-4 md:mt-6 xl:mt-4 w-full flex-1">
          <img
            src={data.image}
            alt={data.title}
            className="rounded shadow-md w-full h-[30vh] xl:h-[60%] object-cover"
          />
          <img
            src={clip1}
            alt="clip1"
            className="absolute -top-6 md:-top-14 xl:-top-12 -left-4 md:-left-8 xl:-left-10 w-[12vw] md:w-[10vw] xl:w-[6vw]"
          />
        </div>
      </div>

      <div className="w-full xl:w-[40%] px-8 mt-10 md:mt-0 md:px-8 xl:px-16 flex flex-col items-center relative ">
        <div className="relative w-28 h-20 xl:w-40 xl:h-60 mt-2 xl:mt-10 hidden md:flex justify-center items-center">
          <img
            src={view}
            alt="view background"
            className="absolute rotate-[0deg] w-[20vw] md:w-[16vw] xl:w-[12vw] scale-110 md:scale-115 xl:scale-150"
          />

          <img
            src={view}
            alt="view top"
            className="rotate-[10deg] w-[20vw] md:w-[16vw] xl:w-[12vw] scale-110 md:scale-115 xl:scale-150"
          />
        </div>

        <div className="relative mt-6 md:mt-8 xl:mt-14 w-full md:w-[100%] xl:w-[100%]">
          <img
            src={texturedbg}
            alt="texture background"
            className="w-full h-40 xl:h-50 rounded shadow object-cover"
          />

          <img
            src={clip2}
            alt="clip2"
            className="absolute -top-7 md:-top-14 -left-7 w-[16vw] md:w-[14vw] xl:w-[6vw]"
          />

          <div className="absolute inset-0 p-4 text-sm md:text-lg xl:text-base text-left text-[#4B3200] flex items-start justify-start">
            <p>{data.text1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;