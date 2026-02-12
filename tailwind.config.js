/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'tile': '32px',
        'card': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.05)',
      },
      colors: {
        'canvas': '#FFFFFF',
        'primary': '#1A1A1A',
        'accent': '#67295F',
        'white': '#FFFFFF',
        'subtle-bg': '#F2F2F2',
        'overlay': 'rgba(0, 0, 0, 0.15)',
      },
      borderColor: {
        'subtle': '#F0F0F0',
      }
    },
  },
  plugins: [],
};




