/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        'p-card': '380px',
        '50v': '50vh',
        '60v': '60vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v-h': 'calc(100vh - 80px)',
        '100v-hm': 'calc(100vh - 64px)',
      },
      minHeight: {
        '100v-h': 'calc(100vh - 80px)',
      },
      flex: {
        '0-auto': '0 0 auto',
      },
      colors: {
        'blue-one': '#175594',
        'blue-two': '#5ac8fa',
        'gray-one': '#565656',
        'stroke-gray': '#E8E8E8',
      },
    },
  },
  plugins: [],
};
