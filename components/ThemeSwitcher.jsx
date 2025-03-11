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
      <button
        onClick={() => (isOpen || isAnimating ? handleClose() : handleOpen())}
        className="relative flex items-center justify-center btn-base btn-efecto rounded-lg gap-2 font-light bg-primary text-[#f5f5f5] py-[10px] px-2"
        aria-label={t("themeSwitcher.ariaLabel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={0.5}
          stroke="currentColor"
          className="w-[20px] h-[20px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
          />
        </svg>
      </button>

      {(isOpen || isAnimating) && (
        <div
          className={`absolute right-0 mt-2 w-44 rounded-lg shadow-xl z-[9999]
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
                  transition-colors duration-100 font-semibold ${
                    currentTheme === theme.id
                      ? "bg-primary text-[#f5f5f5]"
                      : "text-colorLetters dark:text-whiteSnow hover:bg-custom-brown hover:text-whiteSnow"
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