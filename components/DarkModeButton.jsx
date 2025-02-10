import usePortafolios from "../hook/usePortafolios";

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode } = usePortafolios();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        isDarkMode ? 'bg-completColor border-beige-50/20' : 'bg-beige-50 border-custom-brown/20'
      } border`}
      aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
    >
      {/* Control deslizante */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full ${
          isDarkMode 
            ? 'bg-beige-50 left-7' 
            : 'bg-custom-brown left-1'
        } shadow-lg transform transition-all duration-300 flex items-center justify-center`}
      >
        {isDarkMode ? (
          // Luna menguante con líneas más gruesas
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 ${
              isDarkMode ? 'text-completColor' : 'text-beige-50'
            } animate-moon-tilt`}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path 
              d="M21.5 13.6a8.9 8.9 0 11-12.6-12.6 8.9 8.9 0 0112.6 12.6z" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16.5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
              strokeWidth="2"
              className="opacity-80"
            />
          </svg>
        ) : (
          // Sol con líneas más gruesas
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 ${
              isDarkMode ? 'text-completColor' : 'text-beige-50'
            } animate-sun-spin`}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" strokeWidth="2"/>
            <path 
              d="M12 3v2m0 14v2m9-9h-2m-14 0H3m15.364-5.364l-1.414 1.414M5.636 18.364l1.414-1.414M18.364 18.364l-1.414-1.414M5.636 5.636l1.414 1.414" 
              strokeWidth="2"
            />
          </svg>
        )}
      </div>

      <style jsx global>{`
        @keyframes sun-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes moon-tilt {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-10deg) scale(0.95); }
        }

        .animate-sun-spin {
          animation: sun-spin 12s linear infinite;
        }

        .animate-moon-tilt {
          animation: moon-tilt 5s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};

export default DarkModeButton;