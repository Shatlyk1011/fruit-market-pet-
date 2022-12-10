/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue, js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      screens: {
        sm: "480px",
      },
    },
    fontFamily: {
      sans2: ["Oswald", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
