import { useLayoutEffect, useRef, useState } from "react";
import ProjectDisplay from "./ProjectDisplay.jsx";
import ProjectTabs from "./ProjectTabs.jsx";
import { projectData } from "./ProjectData.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Binding from "./Binding1.jsx";
import Binding2 from "./Binding2.jsx";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const GRID_BG = {
  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px),
                    linear-gradient(to right,  rgba(0,0,0,0.2) 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

const Project = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const assemblyRef = useRef(null);
  const topPaperRef = useRef(null);
  const bottomPaperRef = useRef(null);

  const topPageRefs = useRef([]);
  const bottomPageRefs = useRef([]);

  const currentTopIdxRef = useRef(0);
  const currentBottomIdxRef = useRef(1);
  const activeIndexRef = useRef(0);

  const triggerRef = useRef(null);
  const liftMaxRef = useRef(24);

  const pages = projectData.length;
  const flips = pages - 1;

  useLayoutEffect(() => {
    if (!assemblyRef.current || !topPaperRef.current || !bottomPaperRef.current)
      return;

    const computeLiftMax = () => {
      const h = topPaperRef.current?.offsetHeight || 600;
      return Math.max(8, Math.min(48, Math.round(h * 0.04)));
    };

    liftMaxRef.current = computeLiftMax();

    topPageRefs.current.forEach((el, i) =>
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 })
    );
    bottomPageRefs.current.forEach((el, i) =>
      gsap.set(el, { autoAlpha: i === 1 ? 1 : 0 })
    );
    currentTopIdxRef.current = 0;
    currentBottomIdxRef.current = Math.min(1, pages - 1);

    const createTrigger = () => {
      if (triggerRef.current) triggerRef.current.kill();

      triggerRef.current = ScrollTrigger.create({
        trigger: assemblyRef.current,
        start: "top top+=1",
        end: () => {
          const segmentSize =
            window.innerWidth > 1024 ? window.innerHeight : window.innerWidth;
          return `+=${(flips - 0.01) * segmentSize*2.2}`;
        },
        pin: true,
        scrub: 2,
        onUpdate: (self) => {
          let pos = self.progress * flips;
          pos = Math.min(pos, flips);

          const seg = Math.min(Math.floor(pos), pages - 2);
          const local = pos - seg;

          if (window.innerWidth > 1024) {
            const liftY = -liftMaxRef.current * Math.sin(local * Math.PI);
            gsap.set(topPaperRef.current, {
              rotateX: local * 105,
              y: liftY,
              transformOrigin: "top top",
              transformPerspective: 100000,
              willChange: "transform",
            });
          } else {
            const liftX = -liftMaxRef.current * Math.sin(local * Math.PI);
            gsap.set(topPaperRef.current, {
              rotateY: local * -105,
              x: liftX,
              transformOrigin: "left center",
              transformPerspective: 100000,
              willChange: "transform",
            });
          }

          const desiredTopIdx = seg;
          const desiredBottomIdx = Math.min(seg + 1, pages - 1);

          if (desiredTopIdx !== currentTopIdxRef.current) {
            gsap.set(topPageRefs.current[currentTopIdxRef.current], {
              autoAlpha: 0,
            });
            gsap.set(topPageRefs.current[desiredTopIdx], { autoAlpha: 1 });
            currentTopIdxRef.current = desiredTopIdx;
          }

          if (desiredBottomIdx !== currentBottomIdxRef.current) {
            gsap.set(bottomPageRefs.current[currentBottomIdxRef.current], {
              autoAlpha: 0,
            });
            gsap.set(bottomPageRefs.current[desiredBottomIdx], {
              autoAlpha: 1,
            });
            currentBottomIdxRef.current = desiredBottomIdx;
          }

          const newActive = Math.min(Math.round(pos), pages - 1);
          if (newActive !== activeIndexRef.current) {
            activeIndexRef.current = newActive;
            setActiveIndex(newActive);
          }
        },
      });
    };

    createTrigger();
    ScrollTrigger.refresh();

    const onResize = () => {
      liftMaxRef.current = computeLiftMax();
      createTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (triggerRef.current) triggerRef.current.kill();
    };
  }, [flips, pages]);

  const handleTabClick = (idx) => {
    const st = triggerRef.current;
    if (!st) return;

    const clampedIndex = Math.max(1, Math.min(idx, pages - 1));
    setActiveIndex(clampedIndex);
    activeIndexRef.current = clampedIndex;

    const segmentSize =
      window.innerWidth > 1024 ? window.innerHeight*2.2 : 2.2*window.innerWidth;

    
    const targetY =
      st.start + clampedIndex * segmentSize;

    const currentY = window.scrollY;
    if (Math.abs(currentY - targetY) > 4) {
      const distanceSegments = Math.abs(targetY - currentY) / segmentSize;

      const duration = Math.min(1.5, Math.max(0.45, distanceSegments * 0.6));

      gsap.to(window, {
        duration,
        ease: "power2.out",
        scrollTo: { y: targetY, autoKill: true },
      });
    }
  };

  return (
    <div
      ref={assemblyRef}
      className="bg-black relative w-full min-h-screen overflow-x-hidden lg:overflow-x-visible text-[#4B3200]"
    >
      <section className="relative w-full xl:min-h-[100vh]">
        <div
          className="mx-auto bg-[#fdfaf3] w-[95vw] xl:w-[90vw] max-w-7xl xl:h-[7vh] rounded-b-3xl relative"
          style={GRID_BG}
        />

        <div className="relative hidden xl:block">
          <Binding />
        </div>
        <div className="h-20 xl:h-0 block xl:hidden"></div>

        <div className="mt-8 flex flex-col xl:items-center xl:justify-center relative">
          <div className="block xl:hidden">
            <Binding2 />
          </div>
          <div
            className="relative w-full xl:w-[90vw] max-w-7xl rounded-3xl"
            style={{ perspective: "8000px", transformStyle: "preserve-3d" }}
          >
            <div className="absolute w-full h-[74vh] xl:h-[79vh] bg-[#1B231A] rounded-3xl z-0 border border-amber-100" />
            <div className="absolute w-full h-[72vh] xl:h-[77vh] bg-[#fdfaf4be] rounded-3xl z-0" />
            <div className="absolute w-full h-[71vh] xl:h-[76vh] bg-[#fdfaf4eb] rounded-3xl z-0" />

            <div
              ref={bottomPaperRef}
              className="absolute inset-0 h-[70vh] xl:h-[75vh] bg-[#fdfaf3] rounded-3xl shadow-2xl overflow-hidden z-10 text-[#4B3200]"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                ...GRID_BG,
              }}
            >
              {projectData.map((p, i) => (
                <div
                  key={`bottom-${p.id}`}
                  ref={(el) => (bottomPageRefs.current[i] = el)}
                  className="absolute inset-0  font-extralight"
                  style={{ pointerEvents: "none",fontFamily: "Henju, serif"  }}
                >
                  <ProjectDisplay data={p} />
                </div>
              ))}
            </div>

            <div
              ref={topPaperRef}
              className="relative z-30 h-[70vh] xl:h-[75vh] bg-[#fdfaf3] rounded-3xl shadow-2xl overflow-hidden text-[#4B3200]"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                ...GRID_BG,
              }}
            >
              {projectData.map((p, i) => (
                <div
                  key={`top-${p.id}`}
                  ref={(el) => (topPageRefs.current[i] = el)}
                  className="absolute inset-0 font-henju font-extralight"
                >
                  <ProjectDisplay data={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-7xl z-20">
            <div className="hidden xl:block">
              <ProjectTabs
                activeIndex={activeIndex}
                setActiveIndex={handleTabClick}
                onSelect={handleTabClick}
                titles={projectData.map((p) => p.title)}
                className="text-[#4B3200]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;