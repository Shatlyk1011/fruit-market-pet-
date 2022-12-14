/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue, js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },

      gridTemplateColumns: {
        comm: "80% 1fr",
      },
    },
    fontFamily: {
      sans2: ["Oswald", "sans-serif"],
    },
    screens: {
      sm: "450px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
