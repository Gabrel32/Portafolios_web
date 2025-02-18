import React from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import Image from "next/image";
import usePortafolios from "../hook/usePortafolios";
import ContactForm from "../components/ContactForm";

function Contacto() {
  const { contacto } = usePortafolios();

  return (
    <Layout pagina={"Contacto"}>
      <div className="flex flex-col md:flex-row items-center justify-center px-4 py-8 md:px-8 lg:px-16 space-y-8 md:space-y-0 md:space-x-10">
        {/* Formulario de Contacto */}
        <div className="max-w-3xl w-full bg-white dark:bg-completColor rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl relative z-10">
          <h3 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-custom-brown to-efectHovercolor">
            Envíame un mensaje
          </h3>
          <ContactForm />
        </div>

        {/* Sección de Contacto */}
        <div className="max-w-4xl w-full bg-beige-50 dark:bg-completColor rounded-2xl p-8 mb-10 shadow-2xl transition-all duration-500 hover:shadow-3xl overflow-hidden relative">
          {/* Patrón de fondo decorativo */}
          <div
            className="absolute inset-0 opacity-10 dark:opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZGM1ZjAwIi8+PC9zdmc=')]"
          />
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-custom-brown to-efectHovercolor animate-fadeIn">
            Contáctame
          </h2>
          <div className="space-y-6">
            {/* Dirección de correo electrónico */}
            <div className="text-center">
              <a
                href="mailto:Alegabo70@gmail.com"
                className="text-xl font-semibold text-custom-brown hover:text-efectHovercolor transition-colors duration-300"
              >
                Alegabo70@gmail.com
              </a>
            </div>

            {/* Redes sociales */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {contacto.map((e, index) => (
                <Link
                  target="_blank"
                  href={e.link}
                  key={e.id}
                  className={`group flex flex-col items-center p-4 bg-white dark:bg-completColor rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-cardPop`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-3 bg-gradient-to-br from-custom-brown/10 to-efectHovercolor/10 rounded-full mb-3 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      width={60}
                      height={60}
                      src={`/img/${e.img}.png`}
                      alt={e.Nombre}
                      className="dark:invert-[0.8] hover:rotate-12 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-800 dark:text-beige-50 relative">
                    {e.Nombre}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Enlace a LinkedIn */}
            <div className="text-center animate-fadeInUp">
              <p className="text-gray-600 dark:text-beige-100">
                O envíame un mensaje directo a través de{" "}
                <Link
                  href="https://linkedin.com/in/tuperfil"
                  className="text-custom-brown hover:text-efectHovercolor dark:text-beige-50 dark:hover:text-efectHovercolor font-semibold transition-colors duration-300"
                >
                  LinkedIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contacto;