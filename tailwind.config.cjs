/** @type {import('tailwindcss').Config} */

const preset = require('./src/tailwind/tailwind-preset.cjs');

module.exports = {

  prefix: 'kl-',

  presets: [
    preset
  ],

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ]
  
}
