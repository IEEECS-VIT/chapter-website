import { motion } from "framer-motion";
import React from "react";

const Highlight = ({ children, color = "yellow" }) => {
  return (
    <span className="relative inline-block px-1">
      {children}
      <motion.span
        className="absolute inset-x-0 bottom-1 -z-10"
        style={{
          backgroundColor: color,
          height: "1.05em", // slightly shorter than text line
          borderRadius: "3px", // less perfect, more natural
          opacity: 0.7,
          transformOrigin: "left center",
          skewX: "-2deg", // slight angle like a highlighter stroke
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1.05, 1, 1, 0], // overdraw a little then settle
          opacity: [0, 0.85, 0.8, 0.5, 0],
          skewX: ["-2deg", "-4deg", "-2deg"], // wobble effect
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeInOut",
          times: [0, 0.25, 0.6, 0.85, 1],
        }}
      />
    </span>
  );
};

export default Highlight;
