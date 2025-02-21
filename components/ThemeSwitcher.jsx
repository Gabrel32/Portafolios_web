import { useState } from "react";
import usePortafolios from "../hook/usePortafolios";

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme } = usePortafolios();
  const [isOpen, setIsOpen] = useState(false);
  
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
        className="btn-base btn-efecto flex items-center justify-center flex-row text-custom-brown w-10 h-10 rounded-lg gap-2
        text-sm font-medium text-foreground hover:bg-background/20 transition-all
        backdrop-blur-sm group"
        aria-label="Selector de temas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-[20px] h-[20px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-44 rounded-lg shadow-xl z-[9999]
          bg-background/95 backdrop-blur-lg transition-[opacity,transform] duration-150
          ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
      >
        <div className="p-2 space-y-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                changeTheme(theme.id);
                setIsOpen(false);
              }}
              className={`w-full text-sm p-2 rounded-md flex items-center
                transition-colors duration-100 ${
                  currentTheme === theme.id 
                    ? 'bg-primary text-[#f5f5f5]' 
                    : 'hover:bg-subtle/30'
                }`}
            >
              <div className={`w-4 h-4 rounded-full mr-3 ${theme.colorClass}`} />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;