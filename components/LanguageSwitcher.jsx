import { useState, useEffect, useRef } from "react";
import usePortafolios from "../hook/usePortafolios";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = usePortafolios();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  // Lista de idiomas soportados con emojis de banderas
  const languages = [
    { id: "es", name: "Español", short: "es", flag: "🇪🇸" },
    { id: "en", name: "English", short: "en", flag: "🇺🇸" },
    { id: "pt", name: "Português", short: "pt", flag: "🇵🇹" }, // Portugués
    { id: "zh", name: "中文", short: "zh", flag: "🇨🇳" }, // Mandarín
    { id: "de", name: "Deutsch", short: "de", flag: "🇩🇪" }, // Alemán
  ];

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && (isOpen || isAnimating)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isAnimating]);

  // Manejar el cierre con animación
  const handleClose = () => {
    if (isOpen) {
      setIsAnimating(false); // Iniciar animación de cierre
      setTimeout(() => {
        setIsOpen(false);
      }, 400); // Coincidir con la duración de la animación (0.4s)
    }
  };

  // Manejar la apertura
  const handleOpen = () => {
    setIsOpen(true);
    setIsAnimating(true); // Iniciar animación de apertura
  };

  // Obtener el código corto del idioma actual
  const currentLanguageShort = languages.find((lang) => lang.id === currentLanguage)?.short || "en";

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón principal */}
      <button
        onClick={() => (isOpen || isAnimating ? handleClose() : handleOpen())}
        type="button"
        className="relative flex items-center font-semibold justify-center px-1 py-2 rounded-lg gap-1 text-lg md:text-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-custom-brown hover:text-colorLetters dark:text-whiteSnow dark:hover:text-colorLetters"
        aria-label="Cambiar idioma"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
        <span>{currentLanguageShort}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Menú de idiomas */}
      {(isOpen || isAnimating) && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-lg shadow-xl z-[9999]
            bg-completColor backdrop-blur-lg
            ${isAnimating && isOpen ? "animate-menu-slide" : "animate-menu-slide-reverse"}`}
          onAnimationEnd={() => {
            if (!isOpen) setIsAnimating(false); // Reiniciar estado de animación después de cerrar
          }}
        >
          <div className="p-3 space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  changeLanguage(lang.id);
                  handleClose();
                }}
                className={`w-full text-sm p-2 rounded-md flex items-center justify-between
                  transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${
                    currentLanguage === lang.id
                      ? "text-custom-brown font-semibold border-b-2 border-custom-brown"
                      : "text-gray-600 hover:text-custom-brown dark:text-whiteSnow dark:hover:text-custom-brown"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span> {/* Bandera */}
                  <span className="font-normal">{lang.name}</span> {/* Nombre del idioma */}
                </div>
                {currentLanguage === lang.id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.03 4.72a.75.75 0 010 1.06l-11 11a.75.75 0 01-1.06 0l-5-5a.75.75 0 011.06-1.06L8.5 15.19l10.47-10.47a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;