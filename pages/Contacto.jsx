import React from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
import Image from 'next/image'
import usePortafolios from '../hook/usePortafolios'

function Contacto() {
  const {contacto} = usePortafolios()

  return (
    <Layout pagina={"Sobre Mi"}>
      <div style={{backgroundColor:"#f5f5f5"}} className=" w-6/6 m-auto md:w-4/5 rounded-lg mx-5 h-auto p-5 mb-10">
        <h3 className=' text-2xl lg:text-6xl mx-10'>Alegabo70@gmail.com</h3>
        <h4 className=" mx-10 text lg:text-xl mt-6 inline text-center lg:text-left text-black border-b-2">Contactame</h4>
        <div className=' mt-5 w-6/6 items-center mx-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1'>
        {contacto.map(e=>(
            <Link target='_blank' href={e.link} key={e.id} className=' text-center'><Image width={60} height={60} src={`/img/${e.img}.png`} alt='' className='m-auto'/>{e.Nombre}</Link>
        ))}
        </div>
      </div>
        
    </Layout>
  )
}

export default Contacto