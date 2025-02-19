import usePortafolios from "../hook/usePortafolios";

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode } = usePortafolios();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[transparent] border-[var(--completColor)]'
          : 'bg-[var(--beige-50)] border-[var(--custom-brown)]'
      } border`}
      aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full ${
          isDarkMode
            ? 'bg-[var(--accent)] left-7'
            : 'bg-[var(--secondary)] left-1'
        } shadow-lg transition-all duration-300 flex items-center justify-center`}
      >
        {isDarkMode ? (
          // Ícono de luna con animación de rotación
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#f5f5f5] animate-rotate"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        ) : (
          // Ícono de sol con animación de rotación
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[var(--completColor)] animate-rotate"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </div>
      <style jsx global>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-rotate {
          animation: rotate 10s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </button>
  );
};

export default DarkModeButton;