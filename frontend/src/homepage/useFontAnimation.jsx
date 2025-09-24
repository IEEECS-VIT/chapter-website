"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({
  children,
  fontFamilies = [
    "Comic Sans MS",
    "Chalkduster",
    //"Papyrus",
   // "Marker Felt",
   // "Cursive",
  //  "Brush Script MT",
    "Impact",
    "Rock Salt",
    //"Fredericka the Great",
    "Luckiest Guy",
    "Bangers",
    "Permanent Marker",
   // "Shadows Into Light",
   // "Caveat",
   // "Indie Flower",
    "Henju"
  ],
  duration = 2,
  className = "",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const steps = fontFamilies.length;
    const stepDuration = duration / steps;

    const html = document.documentElement;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const preventScroll = (e) => e.preventDefault();
    window.addEventListener("touchmove", preventScroll, { passive: false });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevBodyOverflow || "auto";
        html.style.overflow = prevHtmlOverflow || "auto";
        window.removeEventListener("touchmove", preventScroll);
      },
    });

    fontFamilies.forEach((family, i) => {
      tl.to(textRef.current, {
        duration: 0.15, 
        ease: "none",
        onStart: () => {
          if (textRef.current) {
            textRef.current.style.fontFamily = family;
          }
        },
      }, i * stepDuration);
    });

    return () => {
      tl.kill();
      document.body.style.overflow = prevBodyOverflow || "auto";
      html.style.overflow = prevHtmlOverflow || "auto";
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [fontFamilies, duration]);

  return (
    <span
      ref={textRef}
      className={className}
      style={{ display: "inline-block", willChange: "font-family" }}
    >
      {children}
    </span>
  );
};

export default AnimatedText;
