/** @type {import('tailwindcss').Config} **/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SpecialElite: ['"Special Elite"', 'cursive'],
        Cinzel: ['Cinzel', 'cursive'],
        McLaren: ['McLaren', 'cursive'], 
        Gloock: ['Gloock','cursive']
      },
    },
  },
  plugins: [],
}
