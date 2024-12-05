import Link from "next/link"
import Layout from "../layout/Layout"

export default function Home() {
  return (
    <>
      <Layout pagina={"inicio"}>
        <div className=" w-6/6 lg:w-4/5 rounded-lg mx-3 h-2/3 px-0 lg:p-5 mb-10" style={{backgroundColor:"#f5f5f5"}}>
          <h1 className=" text-5xl md:text-6xl mx-10 ">
            Bienvenido a Mi Portafolio Personal Soy <span className="inline-block bg-amber-800 text-white p-2 rounded-md tracking-wider mt-2">Gabriel Hernandez</span>
          </h1>
          <p className=" w-fit text-xl mt-5 mx-5 lg:mx-0 flex" style={{color:"#Ab987a"}}>Soy un desarrollador web apasionado por crear páginas útiles y escalables que mejoren la experiencia del usuario.</p>
          <div className=" text-left m-5">
            <Link target="_blank" download={true} href={"/CV/cv.pdf"} className=" efect text-xl p-4 text-white ease-in-out duration-300 bg-orange-800 hover:bg-orange-900 font-serif">Descargar CV</Link>
          </div>
        </div>

      </Layout>
    </>
  )
}