import React from 'react'
import Head from 'next/head'
import Navegacion from '../components/Navegacion'
import Image from 'next/image'

function Layout({children, pagina}) {
  return (
    <>
    <Head>
        <title>Portafolio - {pagina}</title> 
        <meta name='description' content='Portafolio wed donde encontraras diverso proyecto e informacion de interes para a quien de pueda interesar'></meta>
    </Head>
    <aside className=' items-center p-3 mb-10 options ' style={{backgroundColor:"#0f1626"}}>
        <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-5 items-center'>
        <Image width={70} height={80} src={"/img/icon2.png"} alt='icon' className={" rounded-3xl p-2 mx-auto bg-white mb-3"} ></Image>
        <Navegacion />
        </div>
     
    </aside>
    <main className='options'>
        {children}
    </main>
    </>
  )
}

export default Layout