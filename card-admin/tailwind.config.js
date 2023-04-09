/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 't-',
  theme: {
    extend: {
      colors: {
        orange:"#f56a00",
        white:colors.white,
        black:colors.black,
      },
    },
  },
  plugins: [],
}
