const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#fcf9f5',
          100: '#f5ecdf',
          200: '#ebd7bd',
          300: '#ddba94',
          400: '#cf9868',
          500: '#c57e4a',
        },
        brand: {
          50: '#f2f7fd',
          100: '#e5edf9',
          200: '#c4daf3',
          300: '#90bce9',
          400: '#5599db',
          500: '#2f7cc8',
          600: '#2061a9',
          700: '#1b4e89',
          800: '#1a4372',
          900: '#1b395f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
