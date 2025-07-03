/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables 'dark' class based switching
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        backgroundLight: '#ffffff',
        backgroundDark: '#0a0a0a',
        textLight: '#171717',
        textDark: '#ededed',
        primary: '#3B82F6',
        secondary: '#6366F1',
        accent: '#22C55E',
      },
    },
  },
  plugins: [],
};
