import { useRef } from "react";
import CoverPage from "./CoverPage";
import clip1 from "./clip1.png";
import clip2 from "./clip2.png";
import texturedbg from "./texturedbg.png";
import view from "./view.png";

const ProjectDisplay = ({ data }) => {
  const containerRef = useRef();

  if (data.isCover) {
    return <CoverPage data={data} />;
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap pl-4 md:pl-0 mt-6 md:mt-10 relative items-start text-black"
    >
      <div className="w-full md:w-1/2 px-4 md:pl-20">
        <div className="relative w-full">
          <h2 className="text-3xl text-center md:text-left md:text-6xl font-bold">
            {data.title}
          </h2>
        </div>

        <div className="relative mt-4 md:mt-1 w-[60vw] md:w-[30vw]">
          <img
            src={data.image}
            alt={data.title}
            className="rounded shadow-md w-full"
          />
          <img
            src={clip1}
            alt="clip1"
            className="absolute -top-6 md:-top-12 -left-4 md:-left-10 w-[12vw] md:w-[6vw]"
          />
        </div>

        <div className="mt-2 md:mt-4 text-xs md:text-sm">
          <p className="whitespace-pre-line">{data.text1}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 md:px-15">
        <div className="relative w-28 h-20 md:w-40 md:h-40 mx-auto mt-2 md:mt-10">
          <div className="absolute -right-20 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="bg-yellow-300 w-[20vw] md:w-[12vw] h-[20vw] md:h-[12vw] rotate-[10deg]"></div>
            <img
              src={view}
              alt="view"
              className="absolute top-1/2 left-1/2 transform scale-110 md:scale-125 -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </div>
        </div>

        <div className="relative mt-6 md:mt-10 ml-0 md:ml-20 w-full md:w-[30vw]">
          <img
            src={texturedbg}
            alt="texture background"
            className="w-full md:w-[30vw] h-[22vh] md:h-[35vh] rounded shadow"
          />

          <img
            src={clip2}
            alt="clip2"
            className="absolute -top-8 md:-top-24 -left-4 md:-left-10 w-[16vw] md:w-[6vw]"
          />

          <div className="absolute mt-4 md:mt-8 inset-0 p-2 md:p-4 text-xs md:text-sm whitespace-pre-line text-black">
            <p>{data.text2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;