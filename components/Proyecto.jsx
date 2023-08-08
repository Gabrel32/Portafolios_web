import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Proyecto({e}) {
  return (
    <div className=' group relative items-center justify-center overflow-hidden cursor-pointer rounded-lg shadow-lg '>
        <div className=' h-86 w-100'>
        <Image key={e.id} width={400} height={400} src={`/imgProyectos/${e.img}.png`} alt={`imagen de ${e.nombre}`} className=' h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform'/>
        </div>
        <div className=' absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black hover:from-black '>
        <div className=' absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[130%] group-hover:translate-y-0 transition-all '>
            <h1 className=' text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2'>{e.Nombre}</h1>
            <p className=' text-xl lg:text-lg italic text-white mb-2 md:mb-3'>{e.parrafo}</p>
            <div className='flex gap-2 justify-evenly'>
                <Link href={e.linkGit} target='_blank' className='flex gap-1 items-center rounded-full py-2 px-5 text-lg capitalize text-gray-100 bg-orange-800 hover:bg-orange-900' >
                    {e.git}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>

                    </Link>
                {e.link && <Link href={e.link} target='_blank' className='flex rounded-full bg-slate-900 py-2 px-5 text-lg capitalize text-white' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    Sitio
                    </Link>}
            </div>
        </div>
        </div>

    </div>
  )
}

export default Proyecto