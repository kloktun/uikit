/** @type {import('tailwindcss').Config} */

const { KloktunTailwindColors, KloktunTailwindScreens, KloktunTailwindBoxShadows, KloktunTailwindBorderRadius  } = require('./src/tailwind/variables.cjs');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {
       ...KloktunTailwindScreens
      },

      boxShadow: {
        ...KloktunTailwindBoxShadows
      },

      borderRadius: {
        ...KloktunTailwindBorderRadius
      },

      colors: {
        ...KloktunTailwindColors
      },

      variants: {
        opacity: ({ after }) => after(['disabled']),
        cursor: ({ after }) => after(['disabled']),
        extend: {
          backgroundColor: ['active']
        },
      },

    },
  },
  plugins: [],
}
