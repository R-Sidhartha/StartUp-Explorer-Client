/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'startup-bg': "url('./Components/bg.jpg')",
      }
    },
  },
  plugins: [],
}

