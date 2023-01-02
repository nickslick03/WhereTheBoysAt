/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'sizable': '6vw'
      },
      height: {
        'sizable': '6vw'
      },
      borderRadius: {
        "max": "1000px"
      },
      boxShadow: {
        "dark": "0 1px 3px 1px rgba(0, 0, 0, .5)"
      },
      keyframes: {
        fade: {
          '0%':   {opacity: '0'},
          '100%': {opacity: '1'}
        }
      },
      animation: {
        fade: 'fade 1.5s ease'
      }
    },
  },
  plugins: [],
}
