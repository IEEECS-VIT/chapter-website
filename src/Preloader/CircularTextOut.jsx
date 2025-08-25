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
      rotate: "+=360",
      duration,
      ease: "linear",
      repeat: -1,
    });
  };

  useEffect(() => {
  startRotation(spinDuration);

  // Check the screen width to determine the appropriate scale values
  const isSmallScreen = window.innerWidth < 768;
  const initialScale = isSmallScreen ? 5 : 10;
  const targetScale = isSmallScreen ? 3 : 5;
  const finalScale = isSmallScreen ? 1 : 1;

  gsap.set(containerRef.current, { scale: initialScale });

  gsap.to(containerRef.current, {
    scale: targetScale,
    duration: 1.2,
    delay: 0,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.to(containerRef.current, {
        scale: finalScale,
        duration: 1,
        delay: 1.9,
        ease: "power3.inOut",
      });
    },
  });
}, [spinDuration, text]);

  const letters = Array.from(text);

  return (
    <div
      ref={containerRef}
      className={`m-0 rounded-full w-[330px] h-[330px] text-white font-black text-center origin-center relative ${className}`}
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
            className="absolute inline-block inset-0 text-3xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
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
