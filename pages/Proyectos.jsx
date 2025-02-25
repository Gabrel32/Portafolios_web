import React from 'react';
import Layout from '../layout/Layout';
import usePortafolios from '../hook/usePortafolios';
import Carousel from '../components/Carrusel';
import BackBurble from '../components/BackBurble';

function Proyectos() {
  const { Proyectos } = usePortafolios();

  // Componente reutilizable para el encabezado de sección mejorado
  const SectionHeader = ({ title, description, children }) => (
    <header className="relative overflow-hidden py-16 px-6 text-center bg-transparent from-white/50 to-transparent dark:from-gray-900/50">
      <div className="absolute inset-0 z-0 opacity-50 ">
        {/* Partículas grandes con diferentes animaciones */}
        <div className="absolute w-64 h-64 bg-custom-brown rounded-full -top-32 -left-32 animate-orbit-slow" />
        <div className="absolute w-72 h-72 bg-efectHovercolor/30 rounded-full -bottom-48 -right-48 animate-orbit-reverse-slow delay-300" />
        
        {/* Partículas medianas */}
        <div className="absolute w-24 h-24 bg-custom-brown rounded-full top-1/4 left-1/3 animate-float" />
        <div className="absolute w-28 h-28 bg-efectHovercolor/40 rounded-full top-1/3 right-1/4 animate-float delay-500" />
        
        {/* Partículas pequeñas */}
        <div className="absolute w-12 h-12 bg-custom-brown rounded-full top-10 left-20 animate-pulse-fast" />
        <div className="absolute w-16 h-16 bg-efectHovercolor/30 rounded-full bottom-20 right-32 animate-pulse-fast delay-200" />
      </div>
      <div className="relative mx-auto max-w-2xl lg:max-w-4xl">
        <div className="inline-block relative">
          <h1 className="text-5xl font-bold tracking-tight text-custom-brown sm:text-6xl lg:text-7xl transform transition-all duration-500 hover:scale-105">
            {title}
          </h1>
          {/* Línea decorativa */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-custom-brown to-transparent dark:via-efectHovercolor" />
        </div>
       
      </div>
      <div className='relative overflow-hidden mt-20'>

      {children}
      </div>

    </header>
  );

  return (
    <Layout pagina="Proyectos">
      {/* Contenedor para prevenir scroll horizontal */}

      <BackBurble
        title="Proyectos"
        // description="Explora nuestras características únicas."
        particleDensity={20}
        bubbleColors={['bg-custom-brown', 'bg-custom-brown/20']}
        center={true}
        showLine={true}
        variant="wide"
        >
          <Carousel items={Proyectos} />
      </BackBurble>
        

    </Layout>
  );
}

export default Proyectos;