/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      display: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
};
