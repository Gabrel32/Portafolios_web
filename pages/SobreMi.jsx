import React from 'react'
import Layout from '../layout/Layout'
import Image from 'next/image'
import Link from 'next/link'
import usePortafolios from '../hook/usePortafolios'


function SobreMi() {
  const {tecnologias} = usePortafolios()

  return (
    <Layout pagina={"Sobre Mi"}>
      <div style={{backgroundColor:"#f5f5f5"}} className=" w-6/6 m-auto md:w-4/5 rounded-lg mx-5 h-auto p-5 mb-10">
        <h3 className=' text-5xl lg:text-6xl mx-10'> Sobre Mi</h3>
        <h4 className=" mx-10 text-xl mt-5 inline text-black border-b-2">Tecnnologias Manejadas</h4>
        <ul className=' mt-5 w-6/6 items-center mx-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1'>
        {tecnologias.map(e=>(
            <li key={e.id} className=' text-center'><Image width={60} height={60} src={`/img/${e.icon}.png`} alt='' className='m-auto'/>{e.Nombre}</li>
        ))}
        </ul>
        <p className=' text-xl mx-10 lg:mx-20 mt-3'>Tambien e manejado <Link target='_blank' className=' text-blue-500 border-b-sky-700' href={"https://www.dreams.es/transformacion-digital/desarrolladores-paginas-web/que-es-un-orm#:~:text=es%20un%20ORM%3F-,Un%20ORM%20(Object%20Relational%20Mapping%20o%20Mapeo%20Objeto%2DRelacional%20en,datos%20virtual%20donde%20los%20datos"}>ORM</Link> Como  
          <Link target='_blank' className=' text-blue-500 border-b-sky-700' href={"https://www.prisma.io"}> Prisma</Link>, <Link target='_blank' className=' text-blue-500 border-b-sky-700' href={"https://strapi.io/"}> Strapi</Link>   </p>
      </div>
    </Layout>
  )
}

export default SobreMi