module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'color-primary': '#fea934',
        'color-grey': '#9A9A9A',
        'color-lightgrey': ' #F9F9F9',
        'color-btn': '#04A5C2',
        'color-yellow': '#F2B619',
        'color-black': '#343434',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
