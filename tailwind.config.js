const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        post: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      },
      colors: {
        linen: '#FCF9F5',
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
  plugins: [require('@tailwindcss/typography')],
}
