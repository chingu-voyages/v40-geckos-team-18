/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("flowbite/plugin")
  ]
};
