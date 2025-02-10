import React from 'react';
import Layout from '../layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import usePortafolios from '../hook/usePortafolios';

function SobreMi() {
  const { tecnologias } = usePortafolios();

  return (
    <Layout pagina={"Sobre Mi"}>
      <div className="relative bg-transparent w-full max-w-6xl mx-auto rounded-2xl p-8 mb-10 transition-all duration-500 shadow-2xl shadow-black dark:shadow-white hover:shadow-3xl overflow-hidden">
        {/* Efecto de fondo decorativo */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZGM1ZjAwIi8+PC9zdmc+')]" />
        
        <h3 className='text-5xl lg:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-custom-brown to-efectHovercolor animate-fadeIn'>
          Sobre Mi
        </h3>
        
        <section className="mb-10 relative z-10">
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-beige-50 mb-6 animate-slideRight">
            <span className="bg-gradient-to-r from-custom-brown to-efectHovercolor text-transparent bg-clip-text">
              Tecnologías
            </span>
            <span className="ml-2 border-b-2 border-custom-brown inline-block pb-1">Manejadas</span>
          </h4>
          
          <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {tecnologias.map((e, index) => (
              <li
                key={e.id}
                className={`flex flex-col items-center p-6 bg-white dark:bg-completColor rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-cardPop delay-${index + 1}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='p-3 bg-gradient-to-br from-custom-brown/10 to-efectHovercolor/10 rounded-full mb-4 transition-transform duration-300 hover:scale-110'>
                  <Image
                    width={60}
                    height={60}
                    src={`/img/${e.icon}`}
                    alt={e.Nombre}
                    className='hover:rotate-12 transition-transform duration-300'
                  />
                </div>
                <span className='text-lg font-medium text-gray-800 dark:text-beige-50 relative'>
                  {e.Nombre}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"></span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative z-10">
          <p className='text-xl text-gray-700 dark:text-beige-50 leading-relaxed text-center animate-fadeInUp'>
            También he trabajado con{' '}
            <Link
              target='_blank'
              className='relative text-custom-brown hover:text-efectHovercolor dark:text-beige-50 dark:hover:text-efectHovercolor transition-colors duration-300 font-semibold group'
              href={"https://www.prisma.io"}
            >
              <span className="relative">
                ORMs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-efectHovercolor transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>{' '}
            como{' '}
            {['Prisma', 'Strapi', 'Sequelize'].map((tech, i) => (
              <React.Fragment key={tech}>
                <Link
                  target='_blank'
                  className="relative text-custom-brown hover:text-efectHovercolor dark:text-beige-50 dark:hover:text-efectHovercolor font-semibold group"
                  href={`https://www.${tech.toLowerCase()}.io`}
                >
                  <span className="relative">
                    {tech}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-efectHovercolor transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                {i < 2 ? ', ' : ''}
              </React.Fragment>
            ))}
            , entre otros.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export default SobreMi;