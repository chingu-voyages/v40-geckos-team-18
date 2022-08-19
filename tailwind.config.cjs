/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // primary is now alias for green color palette
        primary: colors.green,
        // dark is now alias for gray color palette
        dark: colors.gray,

        // override green color palette
        // 'success' green will now be mapped to green configuration here
        green: {
          200: '#f2fef7',
          300: '#e6fdef',
          400: '#bffbd7',
          500: '#99f8bf',
          600: '#4df28f',
          700: '#00ed5f',
          800: '#00d556',
          900: '#00b247',
          DEFAULT: '#00ed5f', //700
        },

        // create new color palette with alias of secondary
        // corresponds to dark green from style guide
        secondary: {
          200: '#f4f6f5',
          300: '#eaedeb',
          400: '#c9d3cd',
          500: '#a9b9af',
          600: '#698473',
          700: '#284f37',
          800: '#244732',
          900: '#1e3b29',
          DEFAULT: '#284f37', //700
        },

        // override gray color palette
        // 'dark' gray will now be mapped to gray configuration here
        gray: {
          300: '#f4f4f4',
          400: '#e9e9e9',
          500: '#c7c7c7',
          600: '#a5a5a5',
          700: '#626262',
          800: '#1e1e1e',
          900: '#1b1b1b',
          DEFAULT: '#1e1e1e', //700
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
