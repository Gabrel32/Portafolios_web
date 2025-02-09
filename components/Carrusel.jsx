import React, { useState, useEffect, useRef } from 'react';
import Proyecto from './Proyecto';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transition, setTransition] = useState(true);
    const carouselRef = useRef(null);

    // Clonamos elementos para efecto infinito
    const extendedItems = items ? [
        { ...items[items.length - 1], id: 'clone-last' },
        ...items,
        { ...items[0], id: 'clone-first' }
    ] : [];

    useEffect(() => {
        if (items) setIsLoaded(true);
    }, [items]);

    const handleNavigation = (direction) => {
        setTransition(true);
        setCurrentIndex(prev => {
            if (direction === 'next') {
                return prev >= extendedItems.length - 1 ? prev : prev + 1;
            }
            return prev <= 0 ? prev : prev - 1;
        });
    };

    useEffect(() => {
        // Reset invisible cuando llegamos a los clones
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

    if (!isLoaded) return <div className="loading-spinner">Cargando...</div>;

    return (
        <div 
            className="carousel-container max-w-[600px] max-h-[400px] mx-auto overflow-visible relative"
            ref={carouselRef}
        >
            <div 
                className="flex transition-transform duration-300"
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: transition ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
            >
                {extendedItems.map((item, index) => (
                   <div 
                   key={`${item.id}-${index}`}
                   className="carousel-item flex-shrink-0 p-4"
               >
                   <div className={`
                       transition-all duration-300 mx-auto h-full
                       ${
                           index === currentIndex 
                               ? 'scale-100 opacity-100' 
                               : 'scale-90 opacity-50'
                       }
                       ${Math.abs(index - currentIndex) === 1 ? 'z-10' : 'z-0'}
                   `}>
                       <Proyecto e={item} />
                   </div>
               </div>
                ))}
            </div>

            <div className="controls flex justify-center gap-4 mt-4">
                <button 
                    onClick={() => handleNavigation('prev')}
                    className="btn_base btn-efecto px-4 py-2 bg-custom-brown text-white rounded"
                >
                    Anterior
                </button>
                <button 
                    onClick={() => handleNavigation('next')}
                    className="btn_base btn-efecto px-4 py-2 bg-custom-brown text-white rounded"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Carousel;