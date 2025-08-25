/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#eef3ff',
          200: '#d9e4ff',
          300: '#bcd0ff',
          400: '#94b3ff',
          500: '#5f8cff',
          600: '#3f6df2',
          700: '#3156cc',
          800: '#2846a6',
          900: '#213a85',
        }
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    },
  },
  plugins: [],
}
