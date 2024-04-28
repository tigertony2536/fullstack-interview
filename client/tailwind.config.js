/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFA318",
      },
      screens: {
        sm: "700px",
        md: "1200px",
      },
      fontSize: {
        h1: "48px",
        h2: "40px",
        h3: "33px",
        h4: "28px",
        h5: "23px",
        h6: "19px",
        paragraph: "16px",
        small: "13px",
      },
    },
  },
  plugins: [],
};
