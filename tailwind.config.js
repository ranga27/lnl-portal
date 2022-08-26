/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // colors: {
    //   primary: '#F7B919',
    //   secondary: '#26ADB4',
    //   tertiary: '#EC2846',
    // },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  // plugins: [require('@tailwindcss/forms')],
};
