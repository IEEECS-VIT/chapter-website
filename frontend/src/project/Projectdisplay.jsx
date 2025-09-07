import { useRef } from "react";
import CoverPage from "./Coverpage";
import clip1 from "/assets/projects/clip1.webp";
import clip2 from "/assets/projects/clip2.webp";
import texturedbg from "/assets/projects/texturedbg.webp";

const ProjectDisplay = ({ data }) => {
  const containerRef = useRef();

  if (data.isCover) {
    return <CoverPage data={data} />;
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row pl-4 md:pl-0 mt-6 md:mt-8 relative items-start text-[#4B3200]"
    >
      <div className="w-full md:w-[60%] px-4 md:pl-20 flex flex-col items-center md:h-screen">
        <div className="relative w-full">
          <h2 className="text-[clamp(1rem,4vh,1.875rem)] md:text-[4rem] lg:text-6xl text-center md:text-left font-bold text-[#4B3200]">
            {data.title}
          </h2>
        </div>

        <div className="relative mt-4 md:mt-6 w-full flex-1">
          <img
            src={data.image}
            alt={data.title}
            className="rounded shadow-md w-[95%] h-[clamp(26vh,27vh,30vh)] md:h-[55%] object-cover"
          />
          <img
            src={clip1}
            alt="clip1"
            className="absolute -top-6 md:-top-12 -left-4 md:-left-10 lg:-left-[5vh] w-[12vw] md:w-[10vw] lg:w-[6vw]"
          />
        </div>
      </div>

      <div className="w-full md:w-[40%] px-8 md:px-2 flex flex-col mt-10 md:mt-28 lg:mt-[10vh] items-center relative md:h-screen">
        {data.viewImage && (
          <div className="relative w-40 md:h-1/6 lg:mt-[clamp(1.5rem,4vh,2.5rem)] mb-11 hidden md:block">
            <img
              src={data.viewImage}
              alt="view background"
              className="absolute rotate-[0deg] w-[18vw] lg:w-[8vw] scale-150"
            />
            <img
              src={data.viewImage}
              alt="view top"
              className="rotate-[10deg] w-[18vw] lg:w-[8vw] scale-150"
            />
          </div>
        )}

        <div className="relative h-2/4 w-full px-2">
          <img
            src={texturedbg}
            alt="texture background"
            className="w-full h-40 md:h-3/5 rounded shadow object-cover"
          />

          <img
            src={clip2}
            alt="clip2"
            className="absolute -top-9 md:-top-10 lg:-top-12 -left-6 w-[16vw] md:w-[12vw] lg:w-[6vw]"
          />

          <div className="absolute inset-0 p-4 md:mt-8 lg:mt-2 text-[clamp(0.625rem,2.5vh,0.875rem)] md:text-[clamp(1rem,2.5vh,1.25rem)] text-left text-[#4B3200] flex items-start justify-start">
            <p>{data.text1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
