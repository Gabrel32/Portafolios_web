import { useState } from "react";
import usePortafolios from "../hook/usePortafolios";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = usePortafolios();
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< Updated upstream

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
=======
  
  const themes = [
    { id: 'default', name: 'Clásico', colorClass: 'bg-[#DC5F00]', color: '#DC5F00' },
    { id: 'forest', name: 'Bosque', colorClass: 'bg-[#2D5A27]', color: '#2D5A27' },
    { id: 'ocean', name: 'Océano', colorClass: 'bg-[#1A5F7A]', color: '#1A5F7A' },
    { id: 'desert', name: 'Desierto', colorClass: 'bg-[#D2B48C]', color: '#D2B48C' },
    { id: 'sunset', name: 'Atardecer', colorClass: 'bg-[#FF6F61]', color: '#FF6F61' }
  ];

  const currentThemeColor = themes.find(t => t.id === currentTheme)?.color || '#DC5F00';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-28 h-10 rounded-lg gap-2
        text-sm font-medium text-foreground hover:bg-background/20 transition-all
        backdrop-blur-sm group"
        aria-label="Selector de temas"
      >
        <span>Temas</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 transition-colors duration-200"
          viewBox="0 0 24 24"
        >
          <path 
            fill={currentThemeColor}
            d="M18 12v1.5c1.11 0 2.08.6 2.6 1.5H18v3h1.17c-.3.6-.8 1.08-1.4 1.39V21H5v-2.11c-.6-.31-1.1-.79-1.4-1.39H5v-3H2.4c.52-.9 1.49-1.5 2.6-1.5V12H1v6h22v-6h-5zm-7-4H8V4h3v4zm5 0h-3V4h3v4z"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-44 rounded-lg shadow-xl z-[9999]
          bg-background/95 backdrop-blur-lg transition-[opacity,transform] duration-150
          ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
>>>>>>> Stashed changes
      >
        <div className="p-2 space-y-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
<<<<<<< Updated upstream
                changeTheme(theme.id); // Cambiar el tema
                setIsOpen(false); // Cerrar el menú
              }}
              className={`w-full text-left p-2 rounded-md flex items-center
                transition-all duration-200 hover:scale-[1.02] 
                ${currentTheme === theme.id ? 'bg-custom-brown text-beige-50' : ''}`}
            >
              <div className={`w-4 h-4 rounded-full mr-2 ${theme.colorClass}`}></div>
              {theme.name}
=======
                changeTheme(theme.id);
                setIsOpen(false);
              }}
              className={`w-full text-sm p-2 rounded-md flex items-center
                transition-colors duration-100 ${
                  currentTheme === theme.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-subtle/30'
                }`}
            >
              <div className={`w-4 h-4 rounded-full mr-3 ${theme.colorClass}`} />
              <span>{theme.name}</span>
>>>>>>> Stashed changes
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;