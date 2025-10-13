/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        jobifyBlue: {
          50: '#f2f8ff',
          100: '#dbeeff',
          200: '#b6ddff',
          300: '#7dbbff',
          400: '#3f95ff',
          500: '#156fe6',
          600: '#0d52b4',
          700: '#0a3a80',
          800: '#06274d',
          900: '#041328',
        },
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(2,6,23,0.25)'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite'
      }
    }
  },
  plugins: []
}
