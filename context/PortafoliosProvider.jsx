import { createContext,useState,useEffect } from "react";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslations from '../locales/es/common.json';
import enTranslations from '../locales/en/common.json';
import deTranslations from '../locales/de/common.json';
import zhTranslations from '../locales/zh/common.json';
import ptTranslations from '../locales/pt/common.json';
import ruTranslations from '../locales/ru/common.json';

// Configuración de idiomas
const resources = {
    en: {
      translation: enTranslations
    },
    es: {
      translation: esTranslations
    },
    de:{
      translation: deTranslations
    },
    zh:{
      translation: zhTranslations
    },
    pt:{
      translation:ptTranslations
    },
    ru:{
      translation:ruTranslations
    }

  };

  i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });


const PortafoliosContext = createContext()

function PortafoliosProvider({children}){
    
    const [isReady, setIsReady] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [currentTheme, setCurrentTheme] = useState('default')
    const [currentLanguage, setCurrentLanguage] = useState('es');

  
    // Cargar configuración desde localStorage
    useEffect(() => {
      if (typeof window === 'undefined') return
  
      const savedTheme = localStorage.getItem('theme') || 'default'
      const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  
      // Sincronizar estado inicial
      setCurrentTheme(savedTheme)
      setIsDarkMode(savedDarkMode)
      setIsReady(true)
  
      // Forzar actualización del DOM
      const applyStyles = () => {
        const themeClass = `theme-${savedTheme}`
        const darkClass = savedDarkMode ? 'dark' : ''
        document.documentElement.className = `${themeClass} ${darkClass}`
      }
      
      // Ejecutar inmediatamente y en evento load
      applyStyles()
      window.addEventListener('load', applyStyles)
      
      return () => window.removeEventListener('load', applyStyles)
    }, [])
  
    // Efecto para cambios posteriores
    useEffect(() => {
      if (!isReady || typeof window === 'undefined') return
      
      const themeClass = `theme-${currentTheme}`
      const darkClass = isDarkMode ? 'dark' : ''
      document.documentElement.className = `${themeClass} ${darkClass}`
      
      localStorage.setItem('theme', currentTheme)
      localStorage.setItem('darkMode', isDarkMode.toString())
    }, [currentTheme, isDarkMode, isReady])


     // Cargar configuración de idioma desde localStorage
     useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const savedLang = localStorage.getItem('language') || 'es';
        setCurrentLanguage(savedLang);
        i18n.changeLanguage(savedLang);
      }, []);
      
      const changeLanguage = (lng) => {
        setCurrentLanguage(lng);
        i18n.changeLanguage(lng); // Cambia el idioma en i18n
        localStorage.setItem('language', lng); // Guarda el idioma en localStorage
      };
  
    function comprobarRuta(route, router) {
        return route == router.pathname;
    }

    const [Proyectos, setProyectos] = useState([
      {
          id: "guitars-la",
          git: "gitlab",
          img: "guitarLa",
        //   link: "https://next-guitarla.vercel.app/",
          linkGit: "https://gitlab.com/Gabrel32/guitarla-next-a.git"
      },
      {
          id: "product-hunt",
          git: "github",
          img: "Product-hunt",
        //   link: "https://product-hunt-gsho.vercel.app/",
          linkGit: "https://github.com/Gabrel32/Product-Hunt.git"
      },
      {
          id: "mern-uptask",
          git: "github",
          img: "mernUptask",
        //   link: "https://mern-uptask.vercel.app/",
          linkGit: "https://github.com/Gabrel32/Mern-uptask_frontend.git",
          linkBackend: "https://github.com/Gabrel32/Mern-uptask_Backend.git"
      },
      {
          id: "veterinary-control",
          git: "gitlab",
          img: "controlVeterinario",
          link: "https://controlveterinario.netlify.app/",
          linkGit: "https://github.com/Gabrel32/citasPacienteVeterinaria.git"
      },
    //   {
    //       id: "create-interactive",
    //       git: "github",
    //       img: "CreateInterattive",
    //       link: "https://proyect-indexdb.netlify.app/",
    //       linkGit: "https://github.com/Gabrel32/proyecto-CRUD-indexDB.git"
    //   },
      {
          id: "expense-manager",
          git: "github",
          img: "ManejoGastos",
          link: "https://manejogastos.netlify.app/",
          linkGit: "https://gitlab.com/Gabrel32/controlDeGastos.git"
      },
      {
          id: "drink-finder",
          git: "gitlab",
          img: "BuscadorBebidas",
          link: "https://bebidasbuscador.vercel.app/",
          linkGit: "https://gitlab.com/Gabrel32/bebidasbuscador.git"
      },
      {
          id: "weather-app",
          git: "gitlab",
          img: "appClima",
          link: "https://clima-app-sand.vercel.app/",
          linkGit: "https://gitlab.com/Gabrel32/clima_app.git"
      },
      {
          id: "car-insurance",
          git: "gitlab",
          img: "AutosSeguros",
          link: "https://segurosautos.vercel.app/",
          linkGit: "https://gitlab.com/Gabrel32/segurosautos.git"
      },
      {
          id: "news-finder",
          git: "gitlab",
          img: "BuscadorNoticias",
          link: "",
          linkGit: "https://gitlab.com/Gabrel32/buscardor-api-mui.git"
      },
      {
          id: "instant-cryptos",
          git: "gitlab",
          img: "CriptosInstante",
          link: "https://criptos-instante.netlify.app",
          linkGit: "https://gitlab.com/Gabrel32/criptosinstante.git"
      }
  ]);

  // Efecto para cargar traducciones
  useEffect(() => {
      const updateProyectos = () => {
          const projectsData = i18n.t('projects', { returnObjects: true });
          
          setProyectos(prev => prev.map(proyecto => ({
              ...proyecto,
              Nombre: projectsData[proyecto.id]?.name || proyecto.Nombre,
              parrafo: projectsData[proyecto.id]?.description || ""
          })));
      };

      updateProyectos();
  }, [i18n.language]);

    const tecnologias = [
        {Nombre:"Javascript",id:1,icon:"javascript.svg"},
        {Nombre:"Css3",id:2,icon:"css.svg"},
        {Nombre:"Html5",id:3,icon:"html.svg"},
        {Nombre:"Tailwindcss",id:4,icon:"tailwindcss.svg"},
        {Nombre:"Next",id:5,icon:"nextjs.svg"},
        {Nombre:"Remix",id:6,icon:"remix.svg"},
        {Nombre:"Playwright",id:13,icon:"playwright.svg"},
        {Nombre:"Jsxgraph",id:14,icon:"jsxgraph.svg"},
        {Nombre:"Jasmine",id:14,icon:"jasmine.svg"},
        {Nombre:"Astro",id:7,icon:"astro.svg"},  
        {Nombre:"Boostrap",id:8,icon:"bostrap.svg"},
        {Nombre:"React",id:9,icon:"react.svg"},
        {Nombre:"MUI",id:10,icon:"mui.svg"},
        {Nombre:"MongoDB",id:11,icon:"mongodb.svg"},
        {Nombre:"Socket.io",id:12,icon:"socket.svg"},
        {Nombre:"Docker, Docker compose",id:12,icon:"docker.svg"},




      ]

    const contacto = [
        {Nombre:"Linkedin",id:1,link:"https://www.linkedin.com/in/gabriel-hernandez-rendiles",img:"linkedin.svg"},
        {Nombre:"Telegram",id:2,link:"https://t.me/Alegabo32",img:"telegram.svg"},
        {Nombre:"Whatsapp",id:3,link:"https://wa.link/lc9cdm",img:"whatsapp.svg"},
        // {Nombre:"Telegram",id:4,link:"",img:"Telegram"},

        
    ]

    const buttonNavs = [
        {
            name:i18n.t('header.nav.home'),
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
            name:i18n.t('header.nav.contact'),
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
            name:i18n.t('header.nav.about'),
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
            name:i18n.t('header.nav.projects'),
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
            currentTheme,
            toggleDarkMode: () => setIsDarkMode(prev => !prev),
            changeTheme: (newTheme) => setCurrentTheme(newTheme),
            isReady,
            currentLanguage,
            changeLanguage,
            t: i18n.t // Función de traducción
           }}
        >
            {children}
        </PortafoliosContext.Provider>
    )
}

export {PortafoliosProvider}

export default PortafoliosContext
