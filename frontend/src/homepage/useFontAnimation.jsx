"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({
  children,
  fontFamilies = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Trebuchet MS",
    "Verdana",
    "Impact",
    "Comic Sans MS",
    "Lucida Console",
    "Palatino Linotype",
    "Helvetica",
    "Franklin Gothic Medium",
    "Garamond",
    "Henju",
  ],
  duration = 9,
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

    const unlock = setTimeout(() => {
      document.body.style.overflow = prevBodyOverflow || "auto";
      html.style.overflow = prevHtmlOverflow || "auto";
      window.removeEventListener("touchmove", preventScroll);
    }, 8000);

    const tl = gsap.timeline();
    fontFamilies.forEach((family, i) => {
      tl.set(textRef.current, { fontFamily: family, fontStyle: "normal" }, i * stepDuration);
    });

    return () => {
      clearTimeout(unlock);
      tl.kill();
      document.body.style.overflow = prevBodyOverflow || "auto";
      html.style.overflow = prevHtmlOverflow || "auto";
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [fontFamilies, duration]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default AnimatedText;
