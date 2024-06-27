/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#32006E',
        secondary: '#2F2E41',
        tertiary: '#FFD700',
        quaternary: '#858585',
      }
    },
  },
  plugins: [],
}