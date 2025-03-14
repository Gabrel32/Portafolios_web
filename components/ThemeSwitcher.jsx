import { useState, useEffect, useRef } from "react";
import usePortafolios from "../hook/usePortafolios";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme, t } = usePortafolios();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  const themes = [
    { id: "default", name: t("themeSwitcher.themes.default"), colorClass: "bg-[#DC5F00]", color: "#DC5F00" },
    { id: "forest", name: t("themeSwitcher.themes.forest"), colorClass: "bg-[#2D5A27]", color: "#2D5A27" },
    { id: "ocean", name: t("themeSwitcher.themes.ocean"), colorClass: "bg-[#1A5F7A]", color: "#1A5F7A" },
    { id: "desert", name: t("themeSwitcher.themes.desert"), colorClass: "bg-[#D2B48C]", color: "#D2B48C" },
    { id: "sunset", name: t("themeSwitcher.themes.sunset"), colorClass: "bg-[#FF6F61]", color: "#FF6F61" },
  ];

  const currentThemeColor = themes.find((t) => t.id === currentTheme)?.color || "#DC5F00";

  // Close menu when clicking outside
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

  // Handle closing with animation
  const handleClose = () => {
    if (isOpen) {
      setIsAnimating(false); // Start closing animation
      setTimeout(() => {
        setIsOpen(false);
      }, 400); // Match the duration of menuSlide (0.4s)
    }
  };

  // Handle opening
  const handleOpen = () => {
    setIsOpen(true);
    setIsAnimating(true); // Start opening animation
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón principal */}
      <button
        onClick={() => (isOpen || isAnimating ? handleClose() : handleOpen())}
        className="relative flex items-center justify-center px-1 md:px-3 py-2 rounded-lg gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-custom-brown hover:text-colorLetters dark:text-colorLetters dark:hover:text-custom-brown"
        aria-label={t("themeSwitcher.ariaLabel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={0.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
          />
        </svg>
      </button>

      {/* Menú de temas */}
      {(isOpen || isAnimating) && (
        <div
          className={`absolute right-0 mt-2 w-36 rounded-lg shadow-xl z-[9999]
            bg-completColor backdrop-blur-lg
            ${isAnimating && isOpen ? "animate-menu-slide" : "animate-menu-slide-reverse"}`}
          onAnimationEnd={() => {
            if (!isOpen) setIsAnimating(false); // Reset animation state after closing
          }}
        >
          <div className="p-3 space-y-1">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  changeTheme(theme.id);
                  handleClose();
                }}
                className={`w-full text-sm p-2 rounded-md flex items-center
                  transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${
                    currentTheme === theme.id
                      ? "text-custom-brown font-semibold border-b-2 border-custom-brown"
                      : "text-gray-600 hover:text-custom-brown dark:text-whiteSnow dark:hover:text-custom-brown"
                  }`}
              >
                <div className={`w-4 h-4 rounded-full mr-3 ${theme.colorClass}`} />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;