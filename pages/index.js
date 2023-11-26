import Link from "next/link"
import Layout from "../layout/Layout"

export default function Home() {
  return (
    <>
      <Layout pagina={"inicio"}>
        <div className=" w-6/6 m-auto md:w-4/5 rounded-lg mx-5 h-auto p-5 mb-10" style={{backgroundColor:"#f5f5f5"}}>
          <h1 className=" text-5xl md:text-6xl mx-103">
            Bienvenido a Mi Portafolio Personal Soy <span className="font-bold inline-block">Gabriel Hernandez</span>
          </h1>
          <p className=" mx-10 text-xl mt-5 inline" style={{color:"#Ab987a"}}>Soy un Desarrollador Web que le Gusta Crear Paginas Web Utiles Escalables</p>

    
          <div className=" text-left m-10 ">
            <Link target="_blank" download={true} href={"/CV/cv.pdf"} className=" text-xl p-4 text-white ease-in-out duration-300 bg-orange-800 hover:bg-orange-900">Descargar CV</Link>
          </div>


        </div>

      </Layout>
    </>
  )
}