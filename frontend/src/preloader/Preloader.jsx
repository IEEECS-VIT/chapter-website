"use client";

import { useEffect, useRef, useState } from "react";
import CircularText from "./CircularText";
import CircularTextOut from "./CircularTextout";
import gsap from "gsap";
import ieeeLogo from "/assets/logos/ieeecs_logo.png";
import vitv from "/assets/logos/vitv.png";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount =
      window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 150 : 450;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.45 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y -= p.speedY;
        70;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = window.innerWidth < 1024 ? 0 : 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
};

const PreLoader = ({ onEnter }) => {
  const textRef = useRef(null);
  const preloaderRef = useRef(null);
  const wrapperRef = useRef(null);
  const [text, setText] = useState("0");
  const hasFinished = useRef(false);

  const textStyle = {
    fontFamily: "'Henju', serif",
    fontWeight: "800",
    fontSize: "1.4",
    letterSpacing: "-0.5px",
    color: "black",
    textTransform: "uppercase",
    display: "inline-block",
  };

  useEffect(() => {
    const obj = { val: 0 };
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        hasFinished.current = true;
        setText(
          <span ref={textRef} style={textStyle}>
            Enter
          </span>
        );
        gsap.fromTo(
          textRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "linear",
      onUpdate: () => {
        if (!hasFinished.current) {
          if (Math.floor(obj.val) % 2 === 0) {
            setText(
              <span ref={textRef} style={textStyle}>
                {Math.floor(obj.val).toString()}
              </span>
            );
          }
        }
      },
    });
  }, []);

  const handleEnter = () => {
    if (!hasFinished.current) return;
    gsap.to(wrapperRef.current, {
      scale: 0,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        onEnter();
      },
    });
  };

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
    >
      <ParticleBackground />
      
      <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-4 z-40">

      <img
        src={vitv}
        alt="VIT Vellore"
        className="h-8 md:h-16 w-auto"
      />

      <p className="text-center mt-1 md:mt-4 font-henju font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        Office Of<span className="block md:inline" />Students' Welfare
      </p>

      <img
        src={ieeeLogo}
        alt="IEEE Computer Society Logo"
        className="h-6 md:h-14 w-auto"
      />
    </div>

      <div
        ref={wrapperRef}
        className="relative w-full h-full flex items-center justify-center preloader-wrapper"
      >
        
        <div className="absolute z-10  text-yellow-400 font-henju font-light">
          <CircularTextOut
            text="WE LIVE IN A COMPUTER SOCIETY "
            spinDuration={20}
          />
        </div>
        <div className="absolute z-20 text-yellow-400 font-henju font-light">
          <CircularText text="IEEE~COMPUTER~SOCIETY~" spinDuration={20} />
        </div>
        <div
          onClick={handleEnter}
          className="w-28 h-28 text-2xl font-henju text-black z-30 rounded-full bg-[#F5AD12] flex items-center justify-center cursor-pointer transition duration-100 hover:scale-105 overflow-hidden  shadow-[0_0_8vw_20px_rgba(255,234,138,0.5)]"
        >
          <div className="overflow-hidden h-8 flex items-end">
            <div ref={textRef} className="translate-y-1">
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
