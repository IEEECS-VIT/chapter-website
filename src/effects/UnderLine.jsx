import { motion } from "framer-motion";
import React from "react";

const Underline = ({ children, color = "black" }) => {
  return (
    <span className="relative inline-block px-1">
      {children}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 -bottom-[0.2em] w-full h-[1.2em] pointer-events-none -z-10"
        viewBox="0 0 100 20"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <motion.path
          d="M5 15 Q 25 18, 50 15 T 95 15" 
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.75"
          strokeDasharray="120"
          strokeDashoffset="120"
          initial={{ strokeDashoffset: 120, opacity: 0 }}
          animate={{
            strokeDashoffset: [120, 0, 0, 120],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
            times: [0, 0.35, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      </motion.svg>
    </span>
  );
};

export default Underline;
