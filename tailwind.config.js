/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');
const daisyuiThemes = require('daisyui/src/colors/themes');

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['[data-theme=light]'],
          primary: '#2B5EF1',
        },
      },
      {
        dark: {
          ...daisyuiThemes['[data-theme=dark]'],
          primary: '#2B5EF1',
        },
      },
    ],
  },
  plugins: [
    daisyui,
  ],
};
