import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import usePortafolios from '../hook/usePortafolios';
import Proyecto from '../components/Proyecto';
import Carousel from '../components/Carrusel';

function Proyectos() {
  const { Proyectos } = usePortafolios();
  const [items, setItems] = useState([]);


  // Usamos useEffect para actualizar items cuando Proyectos cambia
  useEffect(() => {
    if (Proyectos) {
      // Llenamos el array de items con los componentes Proyecto
      const proyectosComponents = Proyectos.map(e => (
        
        <Proyecto e={e} key={e.id} />
      ));
      setItems(proyectosComponents);
    }
  }, [Proyectos]);
  

  return (
    <Layout pagina={"Proyectos"}>
      <div className='flex items-center justify-center mb-10'>
        <div className=' lg:p-20 p-5'>
          <Carousel items={items}/>
          {/* {items} */}
        </div>
      </div>
    </Layout>
  );
}

export default Proyectos;