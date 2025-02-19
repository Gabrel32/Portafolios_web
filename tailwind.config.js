/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        klee: ['Klee One', 'sans-serif'],
      },
      colors: {
        // Mapear a variables CSS manteniendo tus nombres
        'custom-brown': 'var(--custom-brown)',
        'efectHovercolor': 'var(--efectHovercolor)',
        'completColor': 'var(--completColor)',
        'beige-50': 'var(--beige-50)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'highlight': 'var(--highlight)', // Nuevo color agregado
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideRight: 'slideRight 0.6s ease-out',
        cardPop: 'cardPop 0.4s ease-out',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        'gradient-pulse': 'gradient-pulse 12s ease infinite',
        'slideInUp': 'slideInUp 0.6s ease-out',
        'delayedFadeIn': 'delayedFadeIn 1.2s ease-in',
        'lineExpansion': 'lineExpansion 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        // Nueva animación de órbita
        'orbit-slow': 'orbit 25s linear infinite',
        'orbit-reverse-slow': 'orbit 30s linear infinite reverse',
        // Animación de flotar
        'float': 'float 6s ease-in-out infinite',
        // Animación de pulso más rápida
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-menu': 'fadeIn 0.3s ease-in, slideInUp 0.3s ease-out',
        'theme-item': 'delayedFadeIn 0.3s ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        cardPop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'gradient-pulse': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'slideInUp': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'delayedFadeIn': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'lineExpansion': {
          '0%': { transform: 'scaleX(0)', opacity: 0 },
          '100%': { transform: 'scaleX(1)', opacity: 1 }
        },
        orbit: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(300px, 300px) rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      spacing: {
        '200%': '200%',
      },
      zIndex: {
        '-1': '-1',
        '10': '10',
      },
    },
  },
  plugins: [],
};