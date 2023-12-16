/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'search-bg': "url('./Components/Pics/searchbarBg.jpg')"
      }
    },
  },
  plugins: [],
}

