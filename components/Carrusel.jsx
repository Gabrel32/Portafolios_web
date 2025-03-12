import React, { useState, useEffect, useRef } from 'react';
import Proyecto from './Proyecto';
import Spinner from './Spinner';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(2); // Índice inicial ajustado
  const [isLoaded, setIsLoaded] = useState(false);
  const [transition, setTransition] = useState(true);
  const [itemDimensions, setItemDimensions] = useState({ width: 300, margin: 8 });
  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const trackRef = useRef(null);

  const extendedItems = items
    ? [
        { ...items[items.length - 2], id: 'clone-second-last' }, // Clon del penúltimo
        { ...items[items.length - 1], id: 'clone-last' }, // Clon del último
        ...items,
        { ...items[0], id: 'clone-first' }, // Clon del primero
        { ...items[1], id: 'clone-second' }, // Clon del segundo
      ]
    : [];

  useEffect(() => {
    if (items) setIsLoaded(true);
  }, [items]);

  // Medir dimensiones responsivas
  useEffect(() => {
    const updateDimensions = () => {
      if (itemRef.current && containerRef.current) {
        const containerStyle = window.getComputedStyle(containerRef.current);
        const itemStyle = window.getComputedStyle(itemRef.current);
        const isMobile = containerRef.current.offsetWidth < 1024;

        const containerPadding = parseInt(containerStyle.paddingLeft) + parseInt(containerStyle.paddingRight);

        setItemDimensions({
          width: isMobile ? 350 : 500,
          margin: isMobile ? parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight) : 60, // Aumentar margen
          containerPadding: containerPadding,
        });
      }
    };

    const timeoutId = setTimeout(updateDimensions, 50);
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [items]);

  const handleNavigation = (direction) => {
    setTransition(true);
    setCurrentIndex((prev) => (direction === 'next' ? prev + 1 : prev - 1));
  };

  // Reinicio suave del carrusel
  useEffect(() => {
    if (currentIndex === extendedItems.length - 2) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(2);
      }, 300);
    }
    if (currentIndex === 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedItems.length - 3);
      }, 300);
    }
  }, [currentIndex]);

  const getTranslateX = () => {
    if (!containerRef.current) return 0;

    const itemTotalWidth = itemDimensions.width + itemDimensions.margin;
    const containerWidth = containerRef.current.offsetWidth - itemDimensions.containerPadding;
    const centerOffset = (containerWidth - itemDimensions.width) / 2;

    return -currentIndex * itemTotalWidth + centerOffset;
  };

  if (!isLoaded) return <Spinner />;

  return (
    <div className="carousel-container w-full max-w-[1300px] mx-auto py-10" ref={containerRef}>
      <div className="item-name-container text-center mb-10 transition-opacity duration-300">
        <h2 className="text-3xl font-bold text-colorLetters">
          {extendedItems[currentIndex]?.Nombre}
        </h2>
      </div>

      <div
        className="flex transition-transform duration-300"
        ref={trackRef}
        style={{
          transform: `translateX(${getTranslateX()}px)`,
          transition: transition ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}
      >
        {extendedItems.map((item, index) => {
          const isCenter = index === currentIndex;
          const isLeft = index === currentIndex - 1 || index === currentIndex - 2;
          const isRight = index === currentIndex + 1 || index === currentIndex + 2;

          return (
            <div
              key={`${item.id}-${index}`}
              ref={index === 2 ? itemRef : null} // Referencia al elemento central
              className="carousel-item flex-shrink-0 mx-2 lg:mx-6" // Aumentar margen
              style={{
                width: `${itemDimensions.width}px`,
                margin: `0 ${itemDimensions.margin / 2}px`,
              }}
            >
              <div
                className={`transition-all duration-300 relative mx-5 h-full ${
                  isCenter
                    ? 'scale-110 opacity-100 shadow-2xl' // Elemento central más grande
                    : isLeft || isRight
                    ? 'scale-90 opacity-75 shadow-lg' // Elementos secundarios más pequeños
                    : 'scale-75 opacity-50 shadow-md' // Elementos más alejados
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
            className="btn_base btn-efecto px-6 py-3 bg-custom-brown text-whiteSnow rounded-full shadow-lg hover:bg-custom-brown-dark hover:shadow-xl transition-all duration-300"
          >
            ← Anterior
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="btn_base btn-efecto px-6 py-3 bg-custom-brown text-whiteSnow rounded-full shadow-lg hover:bg-custom-brown-dark hover:shadow-xl transition-all duration-300"
          >
            Siguiente →
          </button>
        </div>

        <div className="description-container text-center transition-opacity duration-300">
          <p className="text-lg text-colorLetters max-w-2xl mx-auto px-4 font-bold">
            {extendedItems[currentIndex]?.parrafo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;