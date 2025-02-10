import React from 'react';
import Layout from '../layout/Layout';
import usePortafolios from '../hook/usePortafolios';
import Carousel from '../components/Carrusel';

function Proyectos() {
  const { Proyectos } = usePortafolios();

  // Componente reutilizable para el encabezado de sección
  const SectionHeader = ({ title, description }) => (
    <header className="relative isolate overflow-hidden py-16 px-6 text-center sm:px-8">
      {/* Fondo con efecto de partículas sutiles */}
      <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-15">
        <div className="absolute inset-0 animate-gradient-pulse bg-[size:200%_200%] bg-gradient-to-tr from-custom-brown/30 via-transparent to-efectHovercolor/30" />
      </div>
      
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="text-4xl font-light tracking-tight text-custom-brown dark:text-white sm:text-5xl lg:text-6xl animate-fadeIn">
          {title}
        </h1>
        
        {description && (
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fadeIn">
            {description}
          </p>
        )}
        
        {/* Separador decorativo animado */}
        <div className="mt-8 mx-auto w-48 h-1 bg-gradient-to-r from-custom-brown via-efectHovercolor to-transparent dark:from-blue-400 dark:via-purple-400 rounded-full animate-grow" />
      </div>
    </header>
  );

  return (
    <Layout pagina="Proyectos">
      <SectionHeader
        title="Nuestros Proyectos"
      />

        <Carousel items={Proyectos} />
    </Layout>
  );
}

export default Proyectos;
