import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Proyecto({ e }) {
    const { Nombre, nombre, img, parrafo, linkGit, link, git, id } = e;

    return (
        <div className='group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out'>
            {/* Contenedor de imagen con mejor rendimiento */}
            <div className='w-full aspect-video relative overflow-hidden'>
                <Image
                    key={id}
                    fill
                    src={`/imgProyectos/${img}.png`}
                    alt={`Imagen del proyecto ${nombre}`}
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    quality={85}
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${btoa(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="#1a202c"/></svg>`
                    )}`}
                    loading='lazy'
                />
            </div>
            
            {/* Overlay con mejor contraste y legibilidad */}
            <div className='absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-8 group-hover:translate-y-0'>
                    <h1 className='text-2xl lg:text-3xl font-bold text-custom-brown mb-3 drop-shadow-2xl'>
                        {Nombre}
                    </h1>
                    <p className='text-base lg:text-lg text-custom-brown/90 font-medium mb-6 line-clamp-3 leading-relaxed transition-all duration-500'>
                        {parrafo}
                    </p>
                    
                    {/* Botones con interacción mejorada */}
                    <div className='flex flex-col sm:flex-row gap-3 justify-start'>
                        {linkGit && (
                            <Link
                                href={linkGit}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-5 py-2.5 bg-custom-brown text-white rounded-xl hover:bg-custom-brown/95 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl'
                            >
                                <span className='text-sm lg:text-base font-semibold'>{git}</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2}
                                    stroke="currentColor" 
                                    className='w-5 h-5 flex-shrink-0'
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                            </Link>
                        )}
                        {link && (
                            <Link
                                href={link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl'
                            >
                                <span className='text-sm lg:text-base font-semibold'>Visitar</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2}
                                    stroke="currentColor" 
                                    className='w-5 h-5 flex-shrink-0'
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
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