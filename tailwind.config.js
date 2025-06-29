const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0d141c',
        cod: '#080705',
        linen: {
          50: '#fcf9f5',
          100: '#f5ecdf',
          200: '#ebd7bd',
          300: '#ddba94',
          400: '#cf9868',
          500: '#c57e4a',
          600: '#b76a3f',
          700: '#985536',
          800: '#7b4531',
          900: '#643a2a',
          950: '#351d15',
        },
        romance: {
          50: '#fcfbfa',
          100: '#efeae5',
        },
        smoke: {
          50: '#f4f5f4',
          100: '#e2e5e2',
          200: '#c5cac5',
          300: '#a0a8a1',
          400: '#7b867c',
          500: '#616b62',
          600: '#4c554d',
          700: '#3f4640',
          800: '#353a36',
          900: '#2f3230',
        },
        brand: {
          50: '#f1f8fe',
          100: '#e2f1fc',
          200: '#bde2fa',
          300: '#83ccf6',
          400: '#42b2ee',
          500: '#1999de',
          600: '#0c7abd',
          700: '#0b6199',
          800: '#0d527f',
          900: '#114569',
          950: '#0b2c46',
        },
        willow: {
          50: '#f8f3f4',
          100: '#ece1e3',
          200: '#dcc5c9',
          300: '#c29ea4',
          400: '#a26e76',
          500: '#87535a',
          600: '#73474a',
          700: '#5f3f41',
          800: '#51393a',
          900: '#463333',
          950: '#030202',
        },
        port: {
          50: '#f2f6fc',
          100: '#e2eaf7',
          200: '#ccdbf1',
          300: '#a9c4e7',
          400: '#80a5da',
          500: '#6288cf',
          600: '#4e6fc2',
          700: '#445db1',
          800: '#3c4d91',
          900: '#344374',
          950: '#232a46',
        },
        rose: {
          50: '#fcf4f4',
          100: '#fae6e6',
          200: '#f6d2d2',
          300: '#efb2b2',
          400: '#df7373',
          500: '#d55e5e',
          600: '#c04242',
          700: '#a13434',
          800: '#862e2e',
          900: '#702c2c',
          950: '#3c1313',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-geist)', ...fontFamily.mono],
      },
      fontSize: {
        'main-heading': 'clamp(2.5rem, 2.0395rem + 2.6316vw, 4.5rem)',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
            blockquote: {
              fontWeight: '400',
              borderLeftWidth: '0.4rem',
            },
            'blockquote p:first-of-type::before': {
              content: '',
              color: 'red',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('pointer-coarse', '@media (pointer: coarse)')
      addVariant('pointer-fine', '@media (pointer: fine)')
    }),
  ],
}
