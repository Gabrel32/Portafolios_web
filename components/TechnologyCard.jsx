// components/TechnologyCard.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";

const TechnologyCard = React.memo(({ tech, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Para manejar errores de carga
  const [isClicked, setIsClicked] = useState(false); // Estado para manejar el efecto de clic

  // Usamos useEffect para verificar la carga de la imagen de manera más robusta
  useEffect(() => {
    const img = new window.Image();
    img.src = `/img/${tech.icon}`;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [tech.icon]);

  // Manejar el efecto de clic
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Restablecer el estado después de 200ms
  };

  return (
    <li
      key={`${tech.id}_${index}`}
      className={`group flex flex-col items-center p-3 md:p-4 backdrop-blur-xl rounded-2xl border border-custom-brown shadow-md shadow-secondary hover:shadow-custom-brown transition-all duration-500 hover:-translate-y-1 animate-cardPop cursor-pointer select-none ${
        isClicked ? " scale-90" : "scale-100"
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={handleClick}
    >
      <div className=" bg-whiteSnow p-2.5 rounded-full mb-2 md:mb-2 transition-transform duration-300 group-hover:scale-105">
        {isLoading && !hasError && (
          <div className="w-10 h-10 bg-gray-300 dark:bg-slate-400 rounded-full p-2 animate-pulse" />
        )}
        {!isLoading && !hasError && (
          <Image
            width={40}
            height={40}
            src={`/img/${tech.icon}`}
            alt={tech.Nombre}
            className="object-contain transition-transform duration-300 group-hover:rotate-6"
            loading="lazy"
            sizes="(max-width: 768px) 40px, 40px"
            placeholder="blur"
            blurDataURL="/img/placeholder.png"
          />
        )}
        {hasError && (
          <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center text-red-600">
            X
          </div>
        )}
      </div>
      <span className="text-sm md:text-base font-bold text-colorLetters relative text-center">
        {tech.Nombre}
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
      </span>
    </li>
  );
});

// Asignar un display name manualmente
TechnologyCard.displayName = "TechnologyCard";

export default TechnologyCard;
