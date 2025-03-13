import React, { useEffect } from "react";
import Layout from '../layout/Layout';
import usePortafolios from '../hook/usePortafolios';
import BackBurble from '../components/BackBurble';
import Carousel from '../components/Carrusel';

const Proyectos = ({ className, ...props }) => {
  const { t, Proyectos } = usePortafolios();

  // Optimización: Memoizar el contenido del carrusel
  const carouselContent = React.useMemo(() => {
    if (Proyectos === undefined) {
      return <p className="text-custom-brown text-lg">{t('projectsPage.loading')}</p>;
    } else if (Proyectos && Proyectos.length > 0) {
      return <Carousel items={Proyectos} />;
    } else {
      return <p className="text-custom-brown text-lg">{t('projectsPage.empty')}</p>;
    }
  }, [Proyectos, t]);

  return (
    <Layout pagina={t('header.nav.projects')}>
      <BackBurble
        particleDensity={10} // Reducir densidad de partículas
        bubbleColors={['bg-custom-brown', 'bg-secundary']}
        center={true}
        showLine={false}
        variant="wide"
      >
        <section className={`relative w-full flex flex-col items-center justify-center ${className ?? ""}`}>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-custom-brown mb-8">
              <span className="text-custom-brown relative">
                {t('projectsPage.title.second')}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-custom-brown rounded-full opacity-75" />
              </span>
            </h1>

            <div className="w-full max-w-4xl mx-auto mt-8">
              {carouselContent}
            </div>
          </div>

          {/* Optimización: Simplificar el fondo animado */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-10 left-20 w-40 h-40 rounded-full blur-3xl opacity-30 bg-custom-brown" />
            <div className="absolute bottom-10 right-20 w-56 h-56 rounded-full blur-3xl opacity-30 bg-custom-brown" />
          </div>
        </section>
      </BackBurble>
    </Layout>
  );
};

export default Proyectos;