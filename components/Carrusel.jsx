import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Proyecto from "./Proyecto";
import Spinner from "./Spinner";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemDimensions, setItemDimensions] = useState({
    width: 360,
    margin: 8,
  });
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const totalItems = items.length;
  const extendedItems = [...items, ...items, ...items];
  const virtualIndex = currentIndex + totalItems;

  useEffect(() => {
    if (items.length) setIsLoaded(true);
  }, [items]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const isMobile = containerWidth < 1024;
        setItemDimensions({
          width: isMobile ? 360 : 320,
          margin: isMobile ? 8 : 40,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleNavigation = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
    }, 100);
  };

  // Manejar el reinicio del carrusel con una animación más fluida
  useEffect(() => {
    if (currentIndex === -1 || currentIndex === totalItems) {
      const newIndex = currentIndex === -1 ? totalItems - 1 : 0;

      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(newIndex);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransitioning(true));
        });
      }, 300); // Duración de la animación de transición normal
    }
  }, [currentIndex, totalItems]);

  const getTranslateX = () => {
    if (!containerRef.current) return 0;
    const itemTotalWidth = itemDimensions.width + itemDimensions.margin;
    const containerWidth = containerRef.current.offsetWidth;
    const centerOffset = (containerWidth - itemDimensions.width) / 2;
    return -virtualIndex * itemTotalWidth + centerOffset;
  };

  // Asegurarnos de que el cálculo del translateX se realice después de que las dimensiones estén disponibles
  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const initialTranslateX = getTranslateX();
      trackRef.current.style.transform = `translateX(${initialTranslateX}px)`;
    }
  }, [isLoaded, itemDimensions]);

  // Función para manejar el clic en un ítem
  const handleItemClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  if (!isLoaded) return <Spinner />;

  return (
    <div
      className="carousel-container w-full max-w-[1300px] mx-auto py-10 select-none hover:select-none"
      ref={containerRef}
    >
      <div className="item-name-container text-center mb-10 transition-opacity duration-300">
        <h2 className="text-3xl font-bold text-colorLetters">
          {items[currentIndex]?.Nombre}
        </h2>
      </div>
      <div
        className="flex transition-transform duration-300"
        ref={trackRef}
        style={{
          transform: `translateX(${getTranslateX()}px)`,
          transition: isTransitioning ? "transform 0.3s ease-in-out" : "none",
        }}
      >
        {extendedItems.map((item, index) => {
          const realIndex = index % totalItems; // 🔹 Calcula el índice real en el array original
          const isCenter = realIndex === currentIndex;
          const isLeft =
            realIndex === (currentIndex - 1 + totalItems) % totalItems;
          const isRight = realIndex === (currentIndex + 1) % totalItems;

          return (
            <div
              key={`${item.id}-${index}`}
              className="carousel-item flex-shrink-0 mx-2 lg:mx-6"
              style={{
                width: `${itemDimensions.width}px`,
                margin: `0 ${itemDimensions.margin / 2}px`,
              }}
              onClick={() => handleItemClick(realIndex)} // 🔹 Manejar el clic en el ítem
            >
              <div
                className={`transition-all duration-300 relative mx-5 h-full shadow-slate-500 ${
                  isCenter
                    ? "scale-110 opacity-100 shadow-2xl shadow-slate-500 "
                    : isLeft || isRight
                      ? "scale-90 opacity-75 shadow-lg"
                      : "scale-75 opacity-50 shadow-md"
                } rounded-xl transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer `}
              >
                <Proyecto e={item} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 space-y-8">
        <div className="controls flex justify-center items-center gap-6 w-full">
          {/* Botón Anterior */}
          <button
            onClick={() => handleNavigation("prev")}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-custom-brown rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all duration-200 select-none outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label="Anterior"
          >
            <span className="text-whiteSnow text-2xl group-hover:-translate-x-1 transition-transform duration-200">
              <ChevronLeft width={35} height={35} />
            </span>
          </button>

          {/* Indicador de posición (opcional pero ayuda al usuario) */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? "w-8 bg-custom-brown" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={() => handleNavigation("next")}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-custom-brown rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all duration-200 select-none outline-none "
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label="Siguiente"
          >
            <span className="text-whiteSnow text-2xl group-hover:translate-x-1 transition-transform duration-200">
              <ChevronRight width={35} height={35} />
            </span>
          </button>
        </div>

        <div className="description-container text-center transition-opacity duration-300">
          <p className="text-lg text-colorLetters max-w-2xl mx-auto px-6 font-medium leading-relaxed italic">
            {items[currentIndex]?.parrafo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
