import { useState } from "react";
import usePortafolios from "../hook/usePortafolios";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = usePortafolios();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'default', name: 'Clásico', colorClass: 'bg-[#DC5F00]' },
    { id: 'forest', name: 'Bosque', colorClass: 'bg-[#2D5A27]' },
    { id: 'ocean', name: 'Océano', colorClass: 'bg-[#1A5F7A]' }
  ];

  return (
    <div className="relative">
      {/* Botón principal con animación de hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 bg-custom-brown text-beige-50 rounded-lg hover:bg-efectHovercolor transition-all duration-300 hover:scale-105"
        aria-label="Selector de temas"
      >
        <span className="mr-2">🎨</span>
        <span>Temas</span>
      </button>

      {/* Menú con animaciones optimizadas */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-beige-50 dark:bg-completColor border border-accent rounded-lg shadow-lg z-[9999]
          ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
          transition-all duration-200 ease-in-out`}
      >
        <div className="p-2 space-y-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                changeTheme(theme.id); // Cambiar el tema
                setIsOpen(false); // Cerrar el menú
              }}
              className={`w-full text-left p-2 rounded-md flex items-center
                transition-all duration-200 hover:scale-[1.02] 
                ${currentTheme === theme.id ? 'bg-custom-brown text-beige-50' : ''}`}
            >
              <div className={`w-4 h-4 rounded-full mr-2 ${theme.colorClass}`}></div>
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;