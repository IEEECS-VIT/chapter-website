import { useRef } from "react";
import clip1 from "./clip1.png";
import clip2 from "./clip2.png";
import texturedbg from "./texturedbg.png";
import view from "./view.png";

const ProjectDisplay = ({ data }) => {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap mt-10 relative items-start text-black "
    >
      <div className="w-1/2 pl-20">
        <div className="relative w-full">
          <h2 className="text-6xl font-bold">{data.title}</h2>
        </div>

        <div className="relative mt-1 w-[30vw]">
          <img
            src={data.image}
            alt={data.title}
            className="rounded shadow-md w-full"
          />
          <img
            src={clip1}
            alt="clip1"
            className="absolute -top-12 -left-10 w-[6vw]"
          />
        </div>

        <div className="mt-4 text-sm">
          <p className="whitespace-pre-line">{data.text1}</p>
        </div>
      </div>

      <div className="w-1/2 px-15">
        <div className="relative w-40 h-40 mx-auto mt-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-yellow-300 w-[12vw] h-[12vw] rotate-[10deg]"></div>
            <img
              src={view}
              alt="view"
              className="absolute top-1/2 left-1/2 transform scale-125 -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </div>
        </div>

        <div className="relative mt-10 ml-20 w-[30vw]">
          <img
            src={texturedbg}
            alt="texture background"
            className="w-[30vw] h-[35vh] rounded shadow"
          />

          <img
            src={clip2}
            alt="clip2"
            className="absolute -top-24 -left-10 w-[vw]"
          />

          <div className="absolute mt-8 inset-0 p-4 text-sm whitespace-pre-line text-black">
            <p>{data.text2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
