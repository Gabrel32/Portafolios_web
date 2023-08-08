import React from 'react'
import Layout from '../layout/Layout'
import usePortafolios from '../hook/usePortafolios'
import Proyecto from '../components/Proyecto'

function Proyectos() {
  const {Proyectos} = usePortafolios()
  return (
    <Layout pagina={"Proyectos"}>
      <div className='flex items-center justify-center mb-10'>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3'>
          {Proyectos.map(e=>(
            <Proyecto e={e} key={e.id}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Proyectos