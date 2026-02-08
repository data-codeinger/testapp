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
        'diffuse-glow': '0 2px 4px rgba(0,0,0,0.02), 0 20px 40px rgba(0,0,0,0.08)',
        'bottom-nav': '0 15px 45px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        'glass': '40px',
        'active': '35px',
        'overlay': '50px',
      },
      colors: {
        'canvas': '#F8F9FB',
        'primary': '#1A1A1A',
        'white': '#FFFFFF',
        'subtle-bg': '#F1F3F5',
        'overlay': 'rgba(0, 0, 0, 0.15)',
      },
      borderColor: {
        'subtle': '#F0F0F0',
      }
    },
  },
  plugins: [],
};




