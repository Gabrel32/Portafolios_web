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
        'whiteSnow': 'var(--whiteSnow)',
        'custom-brown': 'var(--custom-brown)',
        'efectHovercolor': 'var(--efectHovercolor)',
        'completColor': 'var(--completColor)',
        'beige-50': 'var(--beige-50)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'highlight': 'var(--highlight)',
      },
      animation: {
        // Animaciones existentes (se mantienen)
        'menu-slide': 'menuSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        "menu-slide-reverse": "menuSlideReverse 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fadeIn: 'fadeIn 0.5s ease-in',
        slideRight: 'slideRight 0.6s ease-out',
        cardPop: 'cardPop 0.4s ease-out',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        'gradient-pulse': 'gradient-pulse 12s ease infinite',
        'slideInUp': 'slideInUp 0.6s ease-out',
        'delayedFadeIn': 'delayedFadeIn 1.2s ease-in',
        'lineExpansion': 'lineExpansion 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        'orbit-slow': 'orbit 25s linear infinite',
        'orbit-reverse-slow': 'orbit 30s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-menu': 'fadeIn 0.3s ease-in, slideInUp 0.3s ease-out',
        'theme-item': 'delayedFadeIn 0.3s ease-in',
        'split-float': 'splitFloat 1s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        // Nuevas animaciones agregadas
        '3d-float': 'float3d 8s ease-in-out infinite',
        'holographic-shine': 'holographicShine 5s linear infinite',
        'particle-sparkle': 'particleSparkle 2s infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'gradient-flow': 'gradientFlow 12s ease infinite',
        'neon-pulse': 'neonPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'dynamic-orbit': 'dynamicOrbit 25s linear infinite',
        'soft-bounce': 'softBounce 2s infinite',
        'card-pop': 'cardPop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'menu-slide': 'menuSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      keyframes: {
        // Keyframes existentes (se mantienen)
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
        },

        // Nuevos keyframes agregados
        float3d: {
          '0%, 100%': { 
            transform: 'translateY(0) rotateX(0deg) rotateY(0deg)',
            filter: 'drop-shadow(0 0 0 rgba(var(--accent-rgb), 0))'
          },
          '50%': { 
            transform: 'translateY(-20px) rotateX(5deg) rotateY(5deg)',
            filter: 'drop-shadow(0 10px 8px rgba(var(--accent-rgb), 0.2))'
          }
        },
        holographicShine: {
          '0%': { 
            'mask-position': '-150%',
            'filter': 'brightness(1)'
          },
          '80%': { 
            'mask-position': '150%',
            'filter': 'brightness(1.2)'
          },
          '100%': { 
            'mask-position': '150%',
            'filter': 'brightness(1)'
          }
        },
        particleSparkle: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0) translateY(0)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.2) translateY(-20px)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0) translateY(-40px)'
          }
        },
        textShimmer: {
          '0%': { 
            'background-position': '-200% 0',
            'background-size': '200% 100%'
          },
          '100%': { 
            'background-position': '200% 0',
            'background-size': '200% 100%'
          }
        },
        dynamicOrbit: {
          '0%': { 
            transform: 'rotate(0deg) translateX(50px) rotate(0deg)'
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(50px) rotate(-360deg)'
          }
        },
        softBounce: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        menuSlide: {
          "0%": { transform: "translateY(20px)", opacity: "0", clipPath: "inset(0 0 100% 0)" },
          "100%": { transform: "translateY(0)", opacity: "1", clipPath: "inset(0 0 0 0)" },
        },
        menuSlideReverse: {
          "0%": { transform: "translateY(0)", opacity: "1", clipPath: "inset(0 0 0 0)" },
          "100%": { transform: "translateY(20px)", opacity: "0", clipPath: "inset(0 0 100% 0)" },
        }
      },
      spacing: {
        '200%': '200%',
        '150vh': '150vh',
        '120%': '120%'
      },
      zIndex: {
        '-1': '-1',
        '60': '60',
        '70': '70'
      },
      transformOrigin: {
        'top-left-1': '10% 10%',
        'bottom-right-1': '90% 90%'
      },
      boxShadow: {
        'custom-light': '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.03)',
        'custom-dark': '1px 4px 6px rgba(255, 255, 255, 0.1), 0px 1px 3px rgba(255, 255, 255, 0.06)',
        'custom-neon': '0px 0px 20px 10px rgba(0, 255, 255, 0.3)'
      },
      splitFloat: {
        '0%': { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        '100%': { transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0.5)', opacity: 0 }
      },
      pulseSlow: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' }
      }
    },
  },
  plugins: [],
};