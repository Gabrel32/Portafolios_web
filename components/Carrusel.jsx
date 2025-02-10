import React, { useState, useEffect, useRef } from 'react';
import Proyecto from './Proyecto';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transition, setTransition] = useState(true);
    const [itemDimensions, setItemDimensions] = useState({ width: 300, margin: 8 });
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const trackRef = useRef(null);

    const extendedItems = items ? [
        { ...items[items.length - 1], id: 'clone-last' },
        ...items,
        { ...items[0], id: 'clone-first' }
    ] : [];

    useEffect(() => {
        if (items) setIsLoaded(true);
    }, [items]);

   // Medir dimensiones responsivas (Versión mejorada)
   useEffect(() => {
    const updateDimensions = () => {
        if (itemRef.current && containerRef.current) {
            const containerStyle = window.getComputedStyle(containerRef.current);
            const itemStyle = window.getComputedStyle(itemRef.current);
            const isMobile = containerRef.current.offsetWidth < 1024;
            
            const containerPadding = parseInt(containerStyle.paddingLeft) + parseInt(containerStyle.paddingRight);
            
            setItemDimensions({
                width: isMobile ? 280 : 400,
                margin: isMobile ? 
                    parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight) :
                    32,
                containerPadding: containerPadding
            });
        }
    };

    // Ejecutar inmediatamente y después de un pequeño delay
    const timeoutId = setTimeout(updateDimensions, 50); // Pequeño delay para asegurar montaje del DOM
    
    // Configurar listeners
    window.addEventListener('resize', updateDimensions);
    
    // Limpieza
    return () => {
        window.removeEventListener('resize', updateDimensions);
        clearTimeout(timeoutId);
    };
}, [items]); // Añadir items como dependencia
    const handleNavigation = (direction) => {
        setTransition(true);
        setCurrentIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
    };

    // Reinicio suave del carrusel
    useEffect(() => {
        if (currentIndex === extendedItems.length - 1) {
            setTimeout(() => {
                setTransition(false);
                setCurrentIndex(1);
            }, 300);
        }
        if (currentIndex === 0) {
            setTimeout(() => {
                setTransition(false);
                setCurrentIndex(extendedItems.length - 2);
            }, 300);
        }
    }, [currentIndex]);

    // Calcular desplazamiento preciso
    const getTranslateX = () => {
        if (!containerRef.current) return 0;
        
        const itemTotalWidth = itemDimensions.width + itemDimensions.margin;
        const containerWidth = containerRef.current.offsetWidth - itemDimensions.containerPadding;
        const centerOffset = (containerWidth - itemDimensions.width) / 2;
        
        return -currentIndex * itemTotalWidth + centerOffset;
    };

    if (!isLoaded) return <div className="loading-spinner">Cargando...</div>;

     return (
        <div 
            className="carousel-container w-full max-w-[700px] lg:max-w-[1300px] mx-auto absolute top-[38%] px-4"
            ref={containerRef}
        >
            <div 
                className="flex transition-transform duration-300"
                ref={trackRef}
                style={{ 
                    transform: `translateX(${getTranslateX()}px)`,
                    transition: transition ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
            >
                {extendedItems.map((item, index) => (
                    <div 
                        key={`${item.id}-${index}`}
                        ref={index === 1 ? itemRef : null}
                        className="carousel-item flex-shrink-0 mx-2 lg:mx-4 "
                        style={{ 
                            width: `${itemDimensions.width}px`,
                            margin: `0 ${itemDimensions.margin / 2}px`
                        }}
                    >
                        <div className={`transition-all duration-300 mx-auto h-full 
                            ${index === currentIndex ? 
                                'scale-100 opacity-100 shadow-2xl' : 
                                'scale-90 opacity-50 shadow-lg'
                            }
                            bg-white rounded-xl overflow-hidden transform transition-transform duration-300
                            hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
                        >
                            <Proyecto e={item} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles con mejor diseño */}
            <div className="controls flex justify-center gap-4 mt-10 w-full">
                <button 
                    onClick={() => handleNavigation('prev')}
                    className="btn_base btn-efecto px-6 py-3 bg-custom-brown text-white rounded-full shadow-lg
                    hover:bg-custom-brown-dark hover:shadow-xl transition-all duration-300"
                >
                    ← Anterior
                </button>
                <button 
                    onClick={() => handleNavigation('next')}
                    className="btn_base btn-efecto px-6 py-3 bg-custom-brown text-white rounded-full shadow-lg
                    hover:bg-custom-brown-dark hover:shadow-xl transition-all duration-300"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
};

export default Carousel;