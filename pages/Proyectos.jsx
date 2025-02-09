import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import usePortafolios from '../hook/usePortafolios';
import Carousel from '../components/Carrusel';

function Proyectos() {
  const { Proyectos } = usePortafolios();


  

  
  

  return (
    <Layout pagina={"Proyectos"}>
      <div className='flex items-center justify-center mt-10'>
        {/* <div className='sm:p-5'> */}
          <Carousel items={Proyectos}/>
          {/* {items} */}
        {/* </div> */}
      </div>
    </Layout>
  );
}

export default Proyectos;