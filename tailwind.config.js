// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // make sure paths are correct
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
      },
      fontFamily: {
        henju: ["Henju", "sans-serif"],
        caveat: ['"Caveat Brush"', 'cursive'], 
        karla: ['Karla', 'sans-serif'],

      },
      screens: {
      sm: { raw: "(min-device-width: 640px)" },
      md: { raw: "(min-device-width: 768px)" },
      lg: { raw: "(min-device-width: 1025px)" },
      xl: { raw: "(min-device-width: 1280px)" },
    },
    },
  },
  plugins: [],
};
