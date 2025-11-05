/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4f46e5',
        'brand-secondary': '#7c3aed',
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
        'dark-border': '#374151',
      }
    }
  },
  plugins: [],
};
