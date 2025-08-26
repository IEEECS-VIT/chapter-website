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
      className="flex flex-wrap pl-4 xl:pl-0 mt-6 md:mt-8 xl:mt-10 relative items-start text-black"
    >
      <div className="w-full xl:w-1/2 px-4 xl:pl-20">
        <div className="relative w-full">
          <h2 className="text-3xl md:text-6xl xl:text-6xl text-center xl:text-left font-bold">
            {data.title}
          </h2>
        </div>

        <div className="relative mt-4 md:mt-6 xl:mt-6 w-[60vw] md:w-[55vw] xl:w-[30vw]">
          <img
            src={data.image}
            alt={data.title}
            className="rounded shadow-md w-full"
          />
          <img
            src={clip1}
            alt="clip1"
            className="absolute -top-6 md:-top-14 xl:-top-12 -left-4 md:-left-8 xl:-left-10 w-[12vw] md:w-[10vw] xl:w-[6vw]"
          />
        </div>

        <div className="mt-2 md:mt-4 xl:mt-4 text-xs md:text-lg xl:text-sm">
          <p className="whitespace-pre-line">{data.text1}</p>
        </div>
      </div>

      <div className="w-full xl:w-1/2 px-4 xl:px-15">
        <div className="relative w-28 h-20 xl:w-40 xl:h-40 mx-auto mt-2 xl:mt-10">
          <div className="absolute -right-20 md:-right-60 xl:-right-20 md:mt-4 xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
            <div className="bg-yellow-300 w-[20vw] md:w-[16vw] xl:w-[12vw] h-[20vw] md:h-[16vw] xl:h-[12vw] rotate-[10deg]" />
            <img
              src={view}
              alt="view"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110 md:scale-115 xl:scale-125 z-10"
            />
          </div>
        </div>

        <div className="relative mt-6 md:-mt-3 md:ml-2 xl:mt-10 ml-0 xl:ml-20 w-full md:w-[50vw] xl:w-[30vw]">
          <img
            src={texturedbg}
            alt="texture background"
            className="w-full h-[22vh] xl:h-[35vh] rounded shadow"
          />
          <img
            src={clip2}
            alt="clip2"
            className="absolute -top-8 md:-top-24 xl:-top-14 -left-4 md:-left-8 xl:-left-8 w-[16vw] md:w-[14vw] xl:w-[8vw]"
          />
          <div className="absolute inset-0 p-2 xl:p-4 mt-4 xl:mt-8 text-xs md:text-lg xl:text-sm whitespace-pre-line text-black">
            <p>{data.text2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
