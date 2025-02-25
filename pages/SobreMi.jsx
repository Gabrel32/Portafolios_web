"use client"; // Añade esto al inicio para forzar renderizado en cliente

import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import usePortafolios from '../hook/usePortafolios';
import BackBurble from '../components/BackBurble';

function SobreMi() {
  const { tecnologias } = usePortafolios();
  const [customBrown, setCustomBrown] = useState('#DC5F00');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCustomBrown(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--custom-brown')
        .trim()
    );
  }, []);

  if (!isMounted) return null;

  return (
    <Layout pagina={"Sobre Mi"}>
      <BackBurble
        title="Sobre mi"
        description="Tecnologías Manejadas"
        particleDensity={20}
        bubbleColors={['bg-custom-brown', 'bg-custom-brown/20']}
        center={true}
        showLine={true}
        variant="wide"
        >
<div className="relative bg-transparent w-full max-w-6xl mx-auto rounded-2xl p-8 mb-10 transition-all duration-500 hover:shadow-3xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIj${encodeURIComponent(
              customBrown.replace('#', '')
            )}"Lz48L3N2Zz4=")`,
          }}
        />
        
       

        <section className="mb-10 relative z-10">
          {/* <h4 className="text-2xl font-semibold text-gray-800 dark:text-beige-50 mb-6 animate-slideRight">
            <span className="bg-gradient-to-r from-[var(--custom-brown)] to-[var(--efectHovercolor)] text-transparent bg-clip-text">
              Tecnologías
            </span>
            <span className="ml-2 border-b-2 border-[var(--custom-brown)] inline-block pb-1">Manejadas</span>
          </h4> */}
          
          <ul className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {tecnologias.map((e, index) => (
              <li
                key={e.id}
                className={`flex flex-col items-center p-6 bg-transparent rounded-2xl hover:shadow-xl hover:shadow-zinc-800 shadow-zinc-500  dark:shadow-custom-brown  shadow-custom-dark transition-all duration-300 hover:-translate-y-2 animate-cardPop`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='p-3 dark:bg-[#f5f5f5e0] bg-transparent rounded-full mb-4 transition-transform duration-300 hover:scale-110'>
                  <Image
                    width={60}
                    height={60}
                    src={`/img/${e.icon}`}
                    alt={e.Nombre}
                    className='hover:rotate-12 transition-transform duration-300'
                  />
                </div>
                <span className='text-lg font-medium text-gray-800 dark:text-[#f5f5f5c4] relative'>
                  {e.Nombre}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--custom-brown)] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative z-10">
          <p className='text-xl text-gray-600 dark:text-highlight leading-relaxed text-center animate-fadeInUp'>
            También he trabajado con{' '}
            <Link
              target='_blank'
              className='relative text-[var(--custom-brown)] hover:text-[var(--efectHovercolor)] dark:text-beige-50 dark:hover:text-[var(--efectHovercolor)] transition-colors duration-300 font-semibold group'
              href="https://www.prisma.io"
            >
              <span className="relative">
                ORMs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--efectHovercolor)] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>{' '}
            como{' '}
            {['Prisma', 'Strapi', 'Sequelize'].map((tech, i) => (
              <React.Fragment key={tech}>
                <Link
                  target='_blank'
                  className="relative text-[var(--custom-brown)] hover:text-[var(--efectHovercolor)] dark:text-beige-50 dark:hover:text-[var(--efectHovercolor)] font-semibold group"
                  href={`https://www.${tech.toLowerCase()}.io`}
                >
                  <span className="relative">
                    {tech}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--efectHovercolor)] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                {i < 2 ? ', ' : ''}
              </React.Fragment>
            ))}
            , entre otros.
          </p>
        </section>
      </div>      
      </BackBurble>
      
    </Layout>
  );
}

export default SobreMi;