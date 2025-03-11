import usePortafolios from "../hook/usePortafolios";
import { useState, useEffect } from "react"; // Importar useEffect

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, isReady } = usePortafolios()

  if (!isReady) return null // Evitar renderizado inicial

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 'bg-beige-50 border-custom-brown border`}
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
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-whiteSnow animate-rotate"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-whiteSnow animate-rotate"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
        .animate-rotate {
          animation: rotate 10s linear infinite;
          opacity: ${isDarkMode ? 1 : 0.8}; /* Mejorar transición */
          transition: opacity 0.3s ease;
        }
      `}</style>
    </button>
  );
};

export default DarkModeButton;