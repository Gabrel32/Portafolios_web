import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import Image from "next/image";
import usePortafolios from "../hook/usePortafolios";
import ContactForm from "../components/ContactForm";
import BackBurble from "../components/BackBurble";
import NotificationModal from "../components/NotificationModal";

function Contacto() {
  const { contacto, t } = usePortafolios();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCloseModal = () => {
    setSuccess(false);
    setError("");
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <Layout pagina={t("header.nav.contact")}>
      <BackBurble
        particleDensity={20}
        bubbleColors={["bg-custom-brown", "bg-efectHovercolor"]}
        center={true}
        showLine={false}
        variant="wide"
      >
        {/* Modal de notificación */}
        <NotificationModal
          isOpen={success || !!error}
          type={success ? "success" : "error"}
          message={success ? t("contactForm.successMessage") : error}
          onClose={handleCloseModal}
          successTitle={t("contactForm.successTitle")}
          successDescription={t("contactForm.successDescription")}
          errorTitle={t("contactForm.errorTitle")}
          errorDescription={t("contactForm.errorDescription")}
        />

        {/* Sección de contacto */}
        <section className="relative flex items-center py-16 px-6 md:px-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" />
            <div className="absolute mix-blend-overlay" />
          </div>

          {/* Contenedor principal */}
          <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-10">
            {/* Formulario de contacto */}
            <div className="max-w-3xl w-full backdrop-blur rounded-3xl p-6 md:p-8 lg:p-12 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 text-center text-custom-brown relative">
                {t("contact.formTitle")}
                <span className="absolute -inset-2 rounded-full blur-xl animate-pulse-slow bg-custom-brown/20" />
              </h3>
              <ContactForm setSuccess={setSuccess} setError={setError} />
            </div>

            {/* Información de contacto */}
            <div className="max-w-4xl w-full backdrop-blur-xl rounded-3xl z-10 p-6 md:p-8 lg:p-12 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700 mt-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 text-center text-custom-brown relative">
                {t("contact.title")}
                <span className="absolute rounded-full blur-xl animate-pulse-slow bg-custom-brown/20" />
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="text-center">
                  <a
                    href="mailto:Alegabo70@gmail.com"
                    className="text-lg md:text-xl lg:text-2xl font-semibold text-colorLetters hover:text-efectHovercolor transition-all duration-300"
                  >
                    Alegabo70@gmail.com
                  </a>
                </div>

                {/* Redes de contacto */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {contacto.map((e) => (
                    <Link
                      target="_blank"
                      href={e.link}
                      key={e.id}
                      className="group flex flex-col items-center p-3 md:p-4 backdrop-blur-xl rounded-2xl border border-custom-brown shadow-xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="p-2 md:p-3 rounded-full mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          width={40}
                          height={40}
                          src={`/img/${e.img}`}
                          alt={e.Nombre}
                          className="object-contain transition-transform duration-300 group-hover:rotate-6"
                        />
                      </div>
                      <span className="text-sm md:text-base text-colorLetters font-bold relative text-center">
                        {e.Nombre}
                        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
                      </span>
                    </Link>
                  ))}
                </div>

                {/* LinkedIn */}
                <div className="text-center">
                  <p className="text-base md:text-lg text-colorLetters leading-relaxed">
                    {t("contact.linkedinText")}{" "}
                    <Link
                      href="https://linkedin.com/in/tuperfil"
                      className="font-semibold text-colorLetters hover:text-efectHovercolor transition-all duration-300"
                    >
                      LinkedIn
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BackBurble>
    </Layout>
  );
}

export default Contacto;