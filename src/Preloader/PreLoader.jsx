"use client";

import { useEffect, useRef, useState } from "react";
import CircularText from "./CircularText";
import CircularTextOut from "./CircularTextOut";
import gsap from "gsap";
import ieeeLogo from "./ieeecs_logo.png";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 450; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.45 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y -= particle.speedY;

        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -10 || particle.x > canvas.width + 10) {
          particle.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

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
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: "800",
    fontSize: "1.7rem",
    letterSpacing: "-2px",
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
          setText(
            <span ref={textRef} style={textStyle}>
              {Math.floor(obj.val).toString()}
            </span>
          );
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

      <div
        ref={wrapperRef}
        className="relative w-full h-full flex items-center justify-center preloader-wrapper"
      >
        <div className="absolute top-5 left-5 z-40">
          <img
            src={ieeeLogo}
            alt="IEEE Computer Society Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="absolute z-10 font-McLaren font-extralight">
          <CircularTextOut
            text="WE LIVE IN A COMPUTER SOCIETY "
            spinDuration={20}
          />
        </div>
        <div className="absolute z-20 font-McLaren font-extralight">
          <CircularText text="IEEE~COMPUTER~SOCIETY~" spinDuration={20} />
        </div>
        <div
          onClick={handleEnter}
          className="w-28 h-28 text-2xl text-black z-30 rounded-full bg-[#F5AD12] flex items-center justify-center cursor-pointer transition duration-100 hover:scale-105 overflow-hidden shadow-[0_0_8vw_20px_rgba(255,234,138,0.5)]"
        >
          <div className="overflow-hidden h-8 flex items-end">
            <div ref={textRef} className="translate-y-0">
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
