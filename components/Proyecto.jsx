import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Proyecto({ e }) {
    const { Nombre, nombre, img, parrafo, linkGit, link, git, id } = e;

    return (
        <div className='group relative items-center justify-center overflow-hidden cursor-pointer rounded-lg hover:shadow-xl transition-shadow duration-300 shadow-lg'>
            {/* Contenedor de imagen con aspecto ratio consistente */}
            <div className='w-full aspect-video relative'>
                <Image
                    key={id}
                    fill
                    src={`/imgProyectos/${img}.png`}
                    alt={`Imagen del proyecto ${nombre}`}
                    className='object-cover transform transition-transform duration-500 group-hover:scale-105'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${btoa(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="#e5e7eb"/></svg>`
                    )}`}
                    loading='lazy'
                />
            </div>
            
            {/* Overlay con efectos mejorados */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent/60 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center translate-y-[20%] group-hover:translate-y-0 transition-transform duration-500 ease-out'>
                    <h1 className='text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg'>{Nombre}</h1>
                    <p className='text-sm md:text-base text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300 max-w-md'>
                        {parrafo}
                    </p>
                    
                    {/* Botones con diseño responsive */}
                    <div className='flex flex-wrap gap-3 mt-4 w-full justify-center'>
                        {linkGit && (
                            <Link
                                href={linkGit}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-full transition-colors duration-300 text-sm md:text-base'
                            >
                                <span>{git}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                            </Link>
                        )}
                        {link && (
                            <Link
                                href={link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-colors duration-300 text-sm md:text-base'
                            >
                                <span>Sitio</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605 .42-3.113 1.157-4.418" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Proyecto;