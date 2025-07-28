import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const CircularText = ({
  text,
  spinDuration = 20,
  className = "",
}) => {
  const containerRef = useRef(null);
  const rotationTween = useRef(null);

  const startRotation = (duration) => {
    if (rotationTween.current) rotationTween.current.kill();
    rotationTween.current = gsap.to(containerRef.current, {
      rotate: "-=360",
      duration,
      ease: "linear",
      repeat: -1,
    });
  };

  useEffect(() => {
    startRotation(spinDuration);

    gsap.set(containerRef.current, { scale: 10 });

    gsap.to(containerRef.current, {
      scale: 5,
      duration: 1,
      delay: 0,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(containerRef.current, {
          scale: 1,
          duration: 1,
          delay: 2, 
          ease: "power3.inOut",
        });
      },
    });
  }, [spinDuration, text]);

  const letters = Array.from(text);

  return (
    <div
      ref={containerRef}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[230px] h-[230px] rounded-full text-white font-black text-center ${className}`}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        const color = i >= 13 ? "#FAE34A" : "white";

        return (
          <span
            key={i}
            className="absolute inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform, color }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
