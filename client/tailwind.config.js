/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      spacing: {
        '144': '36rem',
        '136': '34rem',
        '128': '32rem'
      }
    },
  },
  plugins: ['tailwindcss/plugin'],
}