import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Proyecto({ e }) {
    const { Nombre, nombre, img, parrafo, linkGit, link, git, id } = e;

    return (
        <div className='group relative items-center justify-center overflow-hidden cursor-pointer rounded-lg shadow-lg'>
            <div className='h-86 w-full sm:h-64 md:h-72 lg:h-80'>
                <Image
                    key={id}
                    width={400}
                    height={400}
                    src={`/imgProyectos/${img}.png`}
                    alt={`imagen de ${nombre}`}
                    className='h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform'
                    quality={75}
                    placeholder='blur'
                    blurDataURL={`/imgProyectos/${img}.png`}
                    loading='lazy'
                />
            </div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 transition-all duration-500 ease-in-out'>
                <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out'>
                    <h1 className='text-lg md:text-2xl font-bold text-white mb-2'>{Nombre}</h1>
                    <p className='text-sm md:text-base italic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500'>{parrafo}</p>
                    <div className='flex gap-2 justify-evenly mb-1 mt-4'>
                        {linkGit && (
                            <Link href={linkGit} target='_blank' className='flex gap-1 items-center rounded-full py-2 px-5 text-lg capitalize text-gray-100 bg-orange-800 hover:bg-orange-900 transition-colors duration-300'>
                                {git}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                            </Link>
                        )}
                        {link && (
                            <Link href={link} target='_blank' className='flex gap-1 items-center rounded-full bg-slate-900 py-2 px-5 text-lg capitalize text-white hover:bg-slate-800 transition-colors duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605 .42 -3 .157 -4 .418 -2 .418 -3" />
                                </svg>
                                Sitio
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Proyecto;


















// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// function Proyecto({ e }) {
//     const { Nombre, nombre, img, parrafo, linkGit, link, git, id } = e;

//     return (
//         <div className='group relative items-center justify-center overflow-hidden cursor-pointer rounded-lg shadow-lg'>
//             <div className='h-86 w-full'>
//                 <Image
//                     key={id}
//                     width={400}
//                     height={400}
//                     src={`/imgProyectos/${img}.png`}
//                     alt={`imagen de ${nombre}`}
//                     className='h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform'
//                 />
//             </div>
//             <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black hover:from-black'>
//                 <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out'>
//                     <h1 className='text-lg md:text-2xl font-bold text-white'>{Nombre}</h1>
//                     <p className='text-xl md:text-base italic text-white'>{parrafo}</p>
//                     <div className='flex gap-2 justify-evenly mb-1'>
//                         {/* <Link href={linkGit} target='_blank' className='flex gap-1 items-center rounded-full py-2 px-5 text-lg capitalize text-gray-100 bg-orange-800 hover:bg-orange-900'>
//                             {git}
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
//                             </svg>
//                         </Link>
//                         {link && (
//                             <Link href={link} target='_blank' className='flex rounded-full bg-slate-900 py-2 px-5 text-lg capitalize text-white iconWeb'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605 .42 -3 .157 -4 .418 -2 .418 -3" />
//                                 </svg>
//                                 Sitio
//                             </Link>
//                         )} */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Proyecto;