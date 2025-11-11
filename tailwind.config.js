/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B132B',
          card: '#1C2541',
          accent: '#3A86FF',
          cyan: '#19E6C1'
        }
      }
    }
  },
  plugins: [],
}
