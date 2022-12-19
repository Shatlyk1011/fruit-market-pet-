/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue, js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        main: "#52b788",
        mainD: "#40916c",
        accentL: "#00b4d8",
        accentD: "#023e8a",
      },
      keyframes: {
        rotation: {
          to: { transform: "rotateZ(360deg)" },
        },
      },
      animation: {
        rotate: "rotation 1s ease-out infinite",
      },
    },

    fontFamily: {
      serif: ["Lora", "serif"],
    },
    screens: {
      sm: "425px",
      md: "650px",
      lg: "900px",
      xl: "1200px",
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
