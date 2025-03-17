import React, { useState, useEffect, useRef } from 'react';
import Proyecto from './Proyecto';
import Spinner from './Spinner';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemDimensions, setItemDimensions] = useState({ width: 320, margin: 8 });
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const totalItems = items.length;
  const extendedItems = [...items, ...items, ...items]; // 🔹 Duplicamos elementos para efecto infinito
  const virtualIndex = currentIndex + totalItems; // 🔹 Posicionamos en el centro del array extendido

  useEffect(() => {
    if (items.length) setIsLoaded(true);
  }, [items]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const isMobile = containerWidth < 1024;
        setItemDimensions({
          width: isMobile ? 350 : 320,
          margin: isMobile ? 8 : 40,
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleNavigation = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (direction === 'next' ? prev + 1 : prev - 1));
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

  if (!isLoaded) return <Spinner />;

  return (
    <div className="carousel-container w-full max-w-[1300px] mx-auto py-10" ref={containerRef}>
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
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
        }}
      >
        {extendedItems.map((item, index) => {
          const realIndex = index % totalItems; // 🔹 Calcula el índice real en el array original
          const isCenter = realIndex === currentIndex;
          const isLeft = realIndex === (currentIndex - 1 + totalItems) % totalItems;
          const isRight = realIndex === (currentIndex + 1) % totalItems;

          return (
            <div
              key={`${item.id}-${index}`}
              className="carousel-item flex-shrink-0 mx-2 lg:mx-6"
              style={{
                width: `${itemDimensions.width}px`,
                margin: `0 ${itemDimensions.margin / 2}px`,
              }}
            >
              <div
                className={`transition-all duration-300 relative mx-5 h-full shadow-slate-500 ${
                  isCenter
                    ? 'scale-110 opacity-100 shadow-2xl shadow-slate-500 '
                    : isLeft || isRight
                    ? 'scale-90 opacity-75 shadow-lg'
                    : 'scale-75 opacity-50 shadow-md'
                } rounded-xl transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer `}
              >
                <Proyecto e={item} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-6">
        <div className="controls flex justify-center gap-4 w-full">
          <button
            onClick={() => handleNavigation('prev')}
            className="btn_base btn-efecto px-6 py-3 max-w-[120px] bg-custom-brown text-whiteSnow rounded-full shadow-lg hover:bg-custom-brown-dark transition-all duration-300"
          >
            ← Anterior
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="btn_base btn-efecto px-6 py-3 max-w-[120px] bg-custom-brown text-whiteSnow rounded-full shadow-lg hover:bg-custom-brown-dark transition-all duration-300"
          >
            Siguiente →
          </button>
        </div>

        <div className="description-container text-center transition-opacity duration-300">
          <p className="text-lg text-colorLetters max-w-2xl mx-auto px-4 font-bold">
            {items[currentIndex]?.parrafo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;