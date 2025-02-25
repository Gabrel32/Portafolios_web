import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const BackBurble = ({
  title,
  description,
  children,
  particleDensity = 12,
  bubbleColors = ['bg-custom-brown', 'bg-efectHovercolor/30'],
  center = false,
  showLine = true,
  variant = 'default',
}) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Optimización: usar useCallback para la función de actualización de tamaño
  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  // Optimización: usar useMemo para partículas
  const particles = useMemo(() => {
    const generateParticles = (count, sizeRange, animationTypes) => {
      if (!containerSize.width || !containerSize.height) return [];
      
      const particles = [];
      const gridSize = Math.ceil(Math.sqrt(count));
      const stepX = containerSize.width / gridSize;
      const stepY = containerSize.height / gridSize;

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const size = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0])) + sizeRange[0];
        const animation = animationTypes[Math.floor(Math.random() * animationTypes.length)];

        particles.push(
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full ${bubbleColors[i % bubbleColors.length]} 
              animate-${animation} opacity-[0.15] dark:opacity-[0.15]`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${row * stepY + Math.random() * (stepY / 2)}px`,
              left: `${col * stepX + Math.random() * (stepX / 2)}px`,
              animationDelay: `${Math.random() * 1000}ms`,
            }}
          />
        );
      }
      return particles;
    };

    return generateParticles(
      particleDensity,
      [40, 120],
      ['float', 'pulse-fast', 'orbit-slow', 'orbit-reverse-slow']
    );
  }, [containerSize, particleDensity, bubbleColors]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full min-h-[50vh] py-16 bg-transparent dark:from-gray-900/50"
    >
      {/* Fondo de partículas */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {particles}
      </div>

      {/* Contenido principal */}
      <div className={`relative w-full flex flex-col h-full ${
        variant === 'wide' ? 'max-w-7xl' : 'max-w-4xl'
      } mx-auto px-4`}>
        {title && (
          <div className={`inline-block relative ${center ? 'mx-auto' : ''}`}>
            <h1 className={`text-4xl md:text-5xl font-bold tracking-tight text-custom-brown
              ${variant === 'bold' ? 'lg:text-7xl' : 'lg:text-6xl'}`}>
              {title}
            </h1>
            {showLine && (
              <div className={`absolute ${center ? 'left-1/2 -translate-x-1/2' : 'left-0'}
                w-32 h-1 bg-gradient-to-r ${center ? 
                  'from-transparent via-custom-brown to-transparent' : 
                  'from-custom-brown to-transparent'
                } dark:via-efectHovercolor`}
              />
            )}
          </div>
        )}

        {description && (
          <p className={`mt-4 text-xl md:text-2xl text-primary dark:text-completColor 
            ${center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
            {description}
          </p>
        )}

        {children && (
          <div className="relative mt-8 w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackBurble;