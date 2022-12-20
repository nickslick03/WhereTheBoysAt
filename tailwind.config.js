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
      translate: {
        "center": "-50%"
      },
      borderRadius: {
        "max": "1000px"
      }
    },
  },
  plugins: [],
}
