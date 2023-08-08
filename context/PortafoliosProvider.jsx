import { createContext } from "react";


const PortafoliosContext = createContext()

function PortafoliosProvider({children}){

    function comprobarRuta(id,router){
        const background = "#9a3412"

        if(id === 1 && router.pathname === "/"){
            return background
        } else if(id === 2 && router.pathname === "/Contacto"){
            return background
        }else if(id === 3 && router.pathname === "/SobreMi"){
            return background
        }else if(id === 4 && router.pathname === "/Proyectos"){
            return background
        }else{
            return "none"
        }

    }

    const Proyectos = [
        {
            Nombre:"GuitarsLA", 
            id:0,
            git:"gitlab",
            dsp:"", 
            img:"guitarLa",
            link:"https://next-guitarla.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/guitarla-next-a.git",
            parrafo:"Es un Proyecto de Next con Paginacion una Base de Datos PosgresSql y un Carrito de Compras"
        },
        {
            Nombre:"Control Veterinario", 
            id:1,
            git:"gitlab",
            dsp:"", 
            img:"controlVeterinario",
            link:"https://controlveterinario.netlify.app/",
            linkGit:"https://github.com/Gabrel32/citasPacienteVeterinaria.git",
            parrafo:"Es Proyeto Basico de Gesiton de Citas Desarrollado en React, Tailwindcss"

        },
        {
            Nombre:"Create Interattive", 
            id:2,
            git:"github",
            dsp:"", 
            img:"CreateInterattive",
            link:"https://proyect-indexdb.netlify.app/",
            linkGit:"https://github.com/Gabrel32/proyecto-CRUD-indexDB.git",
            parrafo:"Es Proyecto CRUD con IndexDB"
        },
        {
            Nombre:"Manejo de Gastos", 
            id:3,
            git:"github",
            dsp:"", 
            img:"ManejoGastos",
            link:"https://manejogastos.netlify.app/",
            linkGit:"https://gitlab.com/Gabrel32/controlDeGastos.git",
            parrafo:"Es un Planificador de Gastos con localStorage Desarrollado con React"
        },
        {
            Nombre:"Bebidas Buscador", 
            id:4,
            git:"gitlab",
            dsp:"", 
            img:"BuscadorBebidas",
            link:"https://bebidasbuscador.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/bebidasbuscador.git",
            parrafo:"Es un Buscador de bebidas y tragos, Consultando una API Desarrolado con React Context, Boostrap "
        },
        {
            Nombre:"Clima App", 
            id:5,
            git:"gitlab",
            dsp:"", 
            img:"appClima",
            link:"https://clima-app-sand.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/clima_app.git",
            parrafo:"Es un Consultor de Clima Con vario paises y Ciudades Desarrollado con React Context, tailwindCss"
        },
        {
            Nombre:"Seguros Autos", 
            id:6,
            git:"gitlab",
            dsp:"", 
            img:"AutosSeguros",
            link:"https://segurosautos.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/segurosautos.git",
            parrafo:"Es un Consultor de Seguros de Autos Dependiendo de Diversos factores Desarrollado con React Context, TailwindCss"
        },
        {
            Nombre:"Buscador Noticias", 
            id:7,
            git:"gitlab",
            dsp:"", 
            img:"BuscadorNoticias",
            link:"",
            linkGit:"https://gitlab.com/Gabrel32/buscardor-api-mui.git",
            parrafo:"Es un Consultor de Noticias Filtradas por Varias Categorias, Desarrolado con React Context, MUI"
        },
        {
            Nombre:"Criptos al Instante", 
            id:8,
            git:"gitlab",
            dsp:"", 
            img:"CriptosInstante",
            link:"https://criptos-instante.netlify.app",
            linkGit:"https://gitlab.com/Gabrel32/criptosinstante.git",
            parrafo:"Es un Consultor de Cripto Monedas en tiempo real Conversor a diferenes Monedas"
        }
    ]

    const tecnologias = [
        {Nombre:"Javascript",id:1,icon:"javascript"},
        {Nombre:"Css3",id:2,icon:"css"},
        {Nombre:"Html5",id:3,icon:"html"},
        {Nombre:"Tailwindcss",id:4,icon:"tailwind"},
        {Nombre:"Next",id:5,icon:"next"},
        {Nombre:"Remix",id:6,icon:"remix"},
        {Nombre:"Astro",id:7,icon:"stro"},  
        {Nombre:"Boostrap",id:8,icon:"bostrap"},
        {Nombre:"React",id:9,icon:"react"},
        {Nombre:"MUI",id:10,icon:"mui"},

      ]

    const contacto = [
        {Nombre:"Linkedin",id:1,link:"https://www.linkedin.com/in/gabriel-alejandro-herandez-rendiles-b4aa09267",img:"linkedin"},
        {Nombre:"Telegram",id:2,link:"https://t.me/Alegabo32",img:"telegram"},
        {Nombre:"Whatsapp",id:3,link:"https://wa.link/lc9cdm",img:"whatsapp"},
        // {Nombre:"Telegram",id:4,link:"",img:"Telegram"},

        
    ]

    return (
        <PortafoliosContext.Provider
           value={{
            tecnologias,
            comprobarRuta,
            Proyectos,
            contacto
           }}
        >
            {children}
        </PortafoliosContext.Provider>
    )
}

export {PortafoliosProvider}

export default PortafoliosContext
