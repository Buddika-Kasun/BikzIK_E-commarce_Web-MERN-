/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        //lg: '3rem',
        //xl: '4rem',
        //'2xl': '5rem',
      },
    },
    extend: {
      colors: {
        'primary-200': '#ffb900',
        'primary-100': '#ffc929',
        'secondary-200': '#00b050',
        'secondary-100': '#0b1a78',
      },
    },
  },
  plugins: [],
}

