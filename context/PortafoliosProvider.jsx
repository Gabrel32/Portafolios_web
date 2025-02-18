import { createContext,useState,useEffect } from "react";


const PortafoliosContext = createContext()

function PortafoliosProvider({children}){
    const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');

  // Cargar configuración inicial
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setCurrentTheme(savedTheme);
    setIsDarkMode(savedDarkMode || prefersDark);
  }, []);

  // Aplicar clases CSS
  useEffect(() => {
    const themeClass = `theme-${currentTheme}`;
    const darkClass = isDarkMode ? 'dark' : '';
    document.documentElement.className = `${themeClass} ${darkClass}`;
    
    localStorage.setItem('theme', currentTheme);
    localStorage.setItem('darkMode', isDarkMode);
  }, [currentTheme, isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const changeTheme = (newTheme) => setCurrentTheme(newTheme);



    function comprobarRuta(id,router){
        const background = "#DC5F00"

        if(id == 1 && router.pathname == "/"){
            return background
        } else if(id == 2 && router.pathname == "/Contacto"){
            return background
        }else if(id == 3 && router.pathname == "/SobreMi"){
            return background
        }else if(id == 4 && router.pathname == "/Proyectos"){
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
            Nombre:"Product Hunt", 
            id:0,
            git:"github",
            dsp:"", 
            img:"Product-hunt",
            link:"https://product-hunt-gsho.vercel.app/",
            linkGit:"https://github.com/Gabrel32/Product-Hunt.git",
            parrafo:"es un clon de product hunt con firebase, next y styled components  "
        },
        {
            Nombre:"MERN-Uptask", 
            id:1,
            git:"github",
            dsp:"", 
            img:"mernUptask",
            link:"https://mern-uptask.vercel.app/",
            linkGit:"https://github.com/Gabrel32/Mern-uptask_frontend.git",
            linkBackend:"https://github.com/Gabrel32/Mern-uptask_Backend.git",
            parrafo:"Es un Proyecto Mern stack con base de mongodb, y cambios en tiempo real con socket.io "
        },
        {
            Nombre:"Control Veterinario", 
            id:2,
            git:"gitlab",
            dsp:"", 
            img:"controlVeterinario",
            link:"https://controlveterinario.netlify.app/",
            linkGit:"https://github.com/Gabrel32/citasPacienteVeterinaria.git",
            parrafo:"Es Proyeto Basico de Gesiton de Citas Desarrollado en React, Tailwindcss"

        },
        {
            Nombre:"Create Interattive", 
            id:3,
            git:"github",
            dsp:"", 
            img:"CreateInterattive",
            link:"https://proyect-indexdb.netlify.app/",
            linkGit:"https://github.com/Gabrel32/proyecto-CRUD-indexDB.git",
            parrafo:"Es Proyecto CRUD con IndexDB"
        },
        {
            Nombre:"Manejo de Gastos", 
            id:4,
            git:"github",
            dsp:"", 
            img:"ManejoGastos",
            link:"https://manejogastos.netlify.app/",
            linkGit:"https://gitlab.com/Gabrel32/controlDeGastos.git",
            parrafo:"Es un Planificador de Gastos con localStorage Desarrollado con React"
        },
        {
            Nombre:"Bebidas Buscador", 
            id:5,
            git:"gitlab",
            dsp:"", 
            img:"BuscadorBebidas",
            link:"https://bebidasbuscador.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/bebidasbuscador.git",
            parrafo:"Es un Buscador de bebidas y tragos, Consultando una API Desarrolado con React Context, Boostrap "
        },
        {
            Nombre:"Clima App", 
            id:6,
            git:"gitlab",
            dsp:"", 
            img:"appClima",
            link:"https://clima-app-sand.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/clima_app.git",
            parrafo:"Es un Consultor de Clima Con vario paises y Ciudades Desarrollado con React Context, tailwindCss"
        },
        {
            Nombre:"Seguros Autos", 
            id:7,
            git:"gitlab",
            dsp:"", 
            img:"AutosSeguros",
            link:"https://segurosautos.vercel.app/",
            linkGit:"https://gitlab.com/Gabrel32/segurosautos.git",
            parrafo:"Es un Consultor de Seguros de Autos Dependiendo de Diversos factores Desarrollado con React Context, TailwindCss"
        },
        {
            Nombre:"Buscador Noticias", 
            id:8,
            git:"gitlab",
            dsp:"", 
            img:"BuscadorNoticias",
            link:"",
            linkGit:"https://gitlab.com/Gabrel32/buscardor-api-mui.git",
            parrafo:"Es un Consultor de Noticias Filtradas por Varias Categorias, Desarrolado con React Context, MUI"
        },
        {
            Nombre:"Criptos al Instante", 
            id:9,
            git:"gitlab",
            dsp:"", 
            img:"CriptosInstante",
            link:"https://criptos-instante.netlify.app",
            linkGit:"https://gitlab.com/Gabrel32/criptosinstante.git",
            parrafo:"Es un Consultor de Cripto Monedas en tiempo real Conversor a diferenes Monedas"
        }
    ]

    const tecnologias = [
        {Nombre:"Javascript",id:1,icon:"javascript.svg"},
        {Nombre:"Css3",id:2,icon:"css.svg"},
        {Nombre:"Html5",id:3,icon:"html.svg"},
        {Nombre:"Tailwindcss",id:4,icon:"tailwindcss.svg"},
        {Nombre:"Next",id:5,icon:"nextjs.svg"},
        {Nombre:"Remix",id:6,icon:"remix.svg"},
        {Nombre:"Astro",id:7,icon:"astro.svg"},  
        {Nombre:"Boostrap",id:8,icon:"bostrap.svg"},
        {Nombre:"React",id:9,icon:"react.svg"},
        {Nombre:"MUI",id:10,icon:"mui.svg"},
        {Nombre:"MongoDB",id:11,icon:"mongodb.svg"},
        {Nombre:"Socket.io",id:12,icon:"socket.svg"},



      ]

    const contacto = [
        {Nombre:"Linkedin",id:1,link:"https://www.linkedin.com/in/gabriel-hernandez-rendiles",img:"linkedin.svg"},
        {Nombre:"Telegram",id:2,link:"https://t.me/Alegabo32",img:"telegram.svg"},
        {Nombre:"Whatsapp",id:3,link:"https://wa.link/lc9cdm",img:"whatsapp.svg"},
        // {Nombre:"Telegram",id:4,link:"",img:"Telegram"},

        
    ]

    const buttonNavs = [
        {
            name:"Portafolios",
            icon:{
                src:`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 icon_utils fill-current">
                        <path fill="currentColor" d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                        <path fill="currentColor" d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                    </svg>`,
                w:"25",
                h:"25"
            },
        },
        {
            name:"Contacto",
            icon:{
                src:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-current">
                    <path fill="currentColor" d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>`,
                w:"25",
                h:"25"
            },
            directionPath:"/Contacto"
        },
        {
            name:"Sobre mi",
            icon:{
                src:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-current">
                    <path fill="currentColor" fillRule="evenodd" d="M1 6a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V6zm4 1.5a2 2 0 114 0 2 2 0 01-4 0zm2 3a4 4 0 00-3.665 2.395.75.75 0 00.416 1A8.98 8.98 0 007 14.5a8.98 8.98 0 003.249-.604.75.75 0 00.416-1.001A4.001 4.001 0 007 10.5zm5-3.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zm0 6.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zm.75-4a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
                </svg>`,
                w:"25",
                h:"25"
            },
            directionPath:"/SobreMi"
        },
        {
            name:"Proyectos",
            icon:{
                src:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-current">
                    <path fill="currentColor" fillRule="evenodd" d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    <path fill="currentColor" d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z" />
                </svg>`,
                w:"25",
                h:"25"
            },
            directionPath:"/Proyectos"
        },
        

    ]

    return (
        <PortafoliosContext.Provider
           value={{
            tecnologias,
        comprobarRuta,
        Proyectos,
        contacto,
        buttonNavs,
        isDarkMode,
        toggleDarkMode,
        currentTheme,
        changeTheme
           }}
        >
            {children}
        </PortafoliosContext.Provider>
    )
}

export {PortafoliosProvider}

export default PortafoliosContext
