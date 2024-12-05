import React, { useState, useEffect } from 'react';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Índice del elemento actual
    const [sizeWindow, setSizeWindow] = useState(0);

    // Establecer el tamaño de la ventana solo una vez al montar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSizeWindow(window.innerWidth);
        }
    }, []);

    // Función para avanzar al siguiente elemento
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    // Función para retroceder al elemento anterior
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="carousel flex flex-col justify-center items-center gap-10 w-full h-full">
            <div className="carousel-slide flex flex-row justify-center items-center w-full gap-3">
                {/* Elemento anterior */}
                <div className={`carousel-item w-1/4 md:block hidden`}>
                    {items[(currentIndex - 1 + items.length) % items.length] && sizeWindow > 400 ? (
                        <div className="rounded-md opacity-50 shadow-sm shadow-slate-300 border pointer-events-none user-select-none">
                            {items[(currentIndex - 1 + items.length) % items.length]}
                        </div>
                    ) : (
                        <div className="rounded-md invisible">
                            {/* Contenedor vacío pero visible */}
                        </div>
                    )}
                </div>

                {/* Elemento central */}
                <div className={`carousel-item rounded-md shadow-sm shadow-slate-300 w-full md:w-2/4`}>
                    {items[currentIndex]}
                </div>

                {/* Elemento siguiente */}
                <div className={`carousel-item w-1/4 md:block hidden`}>
                    {items[(currentIndex + 1) % items.length] && sizeWindow > 400 ? (
                        <div className="rounded-md opacity-50 shadow-sm shadow-slate-300 pointer-events-none user-select-none">
                            {items[(currentIndex + 1) % items.length]}
                        </div>
                    ) : (
                        <div className="p-4 rounded-md invisible">
                            {/* Contenedor vacío pero visible */}
                        </div>
                    )}
                </div>
            </div>

            {/* Controles del carrusel */}
            <div className='flex justify-around w-48 h-30 items-center gap-5 text-white'>
                <button onClick={prevSlide} className="w-1/3 h-1/3 rounded-md bg-custom-brown flex items-center justify-center">
                   anterior
                </button>
                <button onClick={nextSlide} className="w-1/3 h-1/3 rounded-md bg-custom-brown flex items-center justify-center">
                    siguiente
                </button>
            </div>
        </div>
    );
};

export default Carousel;