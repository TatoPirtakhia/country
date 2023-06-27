/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'navShadoow': "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        'inputShadow': "0px 2px 9px 0px rgba(0, 0, 0, 0.15)",
        'filterShadow': "0px 2px 9px 0px rgba(0, 0, 0, 0.15)",
        'back':'0px 0px 7px 0px rgba(0, 0, 0, 0.29)',
        'borders':'0px 0px 4px 1px rgba(17, 21, 23, 0.25)'
      },
      screens: {
      'xl':'1440px'
      }

    },
  },
  plugins: [],
};
