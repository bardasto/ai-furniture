// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8F5F2',
        'text': '#3D352F',
        'primary': '#A88761',
        'border': '#DCD6CD',
        'surface': '#FBF9F7',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        'inner-custom': 'inset 0 1px 4px 0 rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [], // Плагины пока не трогаем, маску добавим в CSS
}