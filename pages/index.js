import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState, useCallback } from "react";
import BackBurble from "../components/BackBurble";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ className = "", ...props }) => {
  const { isDarkMode, t } = usePortafolios();
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const decorativesRef = useRef([]);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const alcarvanButtonRef = useRef(null); // Ref para el botón de Alcarván
  const alcarvanContainerRef = useRef(null); // Ref para el contenedor de Alcarván
  const trigonButtonRef = useRef(null); // Ref para el botón de Trigon
  const trigonContainerRef = useRef(null); // Ref para el contenedor de Trigon
  const router = useRouter();

  // Animación inicial del título
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        duration: 1.5,
        opacity: 0,
        y: 80,
        stagger: 0.2,
        ease: "power4.out",
        rotationX: 90,
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // Montaje y limpieza de animaciones
  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Efecto magnético genérico reutilizable
  const setupMagneticEffect = useCallback((buttonRef, containerRef) => {
    const button = buttonRef.current;
    const container = containerRef.current;
    if (!button || !container) return;

    let isActive = true;

    const magneticEffect = (e) => {
      if (!isActive) return;

      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const x = e.clientX - (buttonRect.left + buttonRect.width / 2);
      const y = e.clientY - (buttonRect.top + buttonRect.height / 2);

      const maxX = (containerRect.width - buttonRect.width) / 2;
      const maxY = (containerRect.height - buttonRect.height) / 2;

      gsap.to(button, {
        x: gsap.utils.clamp(-maxX, maxX, x * 0.3),
        y: gsap.utils.clamp(-maxY, maxY, y * 0.3),
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const resetPosition = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", magneticEffect);
    container.addEventListener("mouseleave", resetPosition);

    return () => {
      isActive = false;
      container.removeEventListener("mousemove", magneticEffect);
      container.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  // Animaciones de scroll y efectos magnéticos
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      const animations = [];

      if (subtitleRef.current) {
        animations.push(
          gsap.from(subtitleRef.current, {
            duration: 1.2,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            scrollTrigger: { trigger: subtitleRef.current, start: "top 85%", once: true },
          })
        );
      }

      if (contentRef.current) {
        animations.push(
          gsap.from(contentRef.current.children, {
            duration: 1.2,
            opacity: 0,
            y: 40,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true },
          })
        );
      }

      decorativesRef.current.forEach((el) => {
        if (el) {
          animations.push(
            gsap.from(el, {
              duration: 2,
              opacity: 0,
              scale: 0.5,
              y: 60,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            })
          );
        }
      });

      if (aboutRef.current) {
        animations.push(
          gsap.from(aboutRef.current.children, {
            duration: 1.5,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: aboutRef.current, start: "top 85%", once: true },
          })
        );
      }

      if (experienceRef.current) {
        animations.push(
          gsap.from(experienceRef.current.children, {
            duration: 1.5,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: experienceRef.current, start: "top 85%", once: true },
          })
        );
      }
    });

    const cleanupMainButton = setupMagneticEffect(buttonRef, buttonContainerRef);
    const cleanupAlcarvanButton = setupMagneticEffect(alcarvanButtonRef, alcarvanContainerRef);
    const cleanupTrigonButton = setupMagneticEffect(trigonButtonRef, trigonContainerRef);

    return () => {
      ctx.revert();
      cleanupMainButton();
      cleanupAlcarvanButton();
      cleanupTrigonButton();
    };
  }, [isMounted, setupMagneticEffect]);

  if (!isMounted) return null;

  return (
    <Layout pagina={t("header.nav.home")}>
      <BackBurble
        particleDensity={10}
        bubbleColors={["bg-custom-brown", "bg-efectHovercolor"]}
        center={true}
        showLine={false}
        variant="wide"
      >
        <section className={`relative flex flex-col items-center py-12 ${className}`}>
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" />
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12">
            {/* Hero Section */}
            <div
              ref={contentRef}
              className="backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700"
            >
              <h1
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
              >
                <span className="flex flex-row gap-0 flex-wrap md:gap-5 text-custom-brown">{t("home.title1")}

                <span className="inline-block text-whiteSnow dark:text-whiteSnow mt-2 relative">
                  {t("home.title2")}
                  <span className="absolute -inset-2 bg-custom-brown rounded-[20px] -z-10 animate-pulse" />
                </span>
                </span>
              </h1>

              <div className="flex flex-col space-y-6 max-w-2xl">
                <p
                  ref={subtitleRef}
                  className="text-2xl md:text-3xl font-semibold text-custom-brown dark:text-primary"
                >
                  {t("home.subtitle")}
                </p>
                <p className="text-lg md:text-xl text-custom-brown dark:text-colorLetters leading-relaxed">
                  {t("home.description")}
                </p>

                <div ref={buttonContainerRef} className="relative inline-block w-40 h-16">
                  <button
                    ref={buttonRef}
                    className="absolute px-8 py-4 bg-custom-brown text-whiteSnow rounded-full font-bold transition-all duration-300 hover:bg-efectHovercolor focus:outline-none"
                    aria-label={t("home.downloadCV")}
                    style={{ WebkitTapHighlightColor: 'transparent' }} // Desactiva el resaltado

                  >
                    <span className="relative z-10">{t("home.downloadCV")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div
              ref={aboutRef}
              className="mt-16 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-custom-brown shadow-2xl shadow-custom-brown transition-all duration-700"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-custom-brown mb-6">
                {t("home.aboutTitle")}
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <img
                    src="/tu-foto.jpg"
                    alt={t("home.aboutAlt")}
                    className="rounded-full w-48 h-48 object-cover border-4 border-custom-brown hover:rotate-3 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg md:text-xl text-custom-brown dark:text-colorLetters leading-relaxed">
                    {t("home.aboutDescription", {
                      defaultValue: "Desarrollador Frontend especializado en crear experiencias educativas interactivas. Combino mis conocimientos en matemáticas avanzadas con desarrollo web moderno para transformar conceptos complejos en interfaces intuitivas y accesibles."
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div
              ref={experienceRef}
              className="mt-16 backdrop-blur-md rounded-3xl p-8 md:p-12 lg:p-16 border border-custom-brown shadow-2xl shadow-custom-brown transition-all duration-700"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-custom-brown mb-8">
                {t("home.experienceTitle")}
              </h2>
              <div className="space-y-8">
                {/* Experiencia Alcarván */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <h3 className="text-2xl font-bold text-custom-brown">
                      {t("home.experience.alcarvan.title")}
                    </h3>
                    <p className="text-lg text-custom-brown">Sistemas Tecnológicos Alcarván</p>
                    <p className="text-sm text-custom-brown">Feb 2021 - Presente</p>
                    <div ref={alcarvanContainerRef} className="relative inline-block w-40 h-12 mt-2">
                      <a
                        href="https://www.alcaravan.com.ve/"
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={alcarvanButtonRef}
                        className="absolute inline-flex items-center gap-2 px-4 py-2 bg-custom-brown text-whiteSnow rounded-full font-bold transition-all duration-200 hover:bg-efectHovercolor focus:outline-none focus:ring-2 focus:ring-custom-brown hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V9h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span>{t("home.experience.textVisite")}</span>                      
                      </a>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-lg text-custom-brown dark:text-colorLetters">
                      {t("home.experience.alcarvan.description", {
                        defaultValue: "Desarrollo de libros matemáticos interactivos, enfocado en la digitalización de contenidos educativos y la creación de experiencias de usuario intuitivas."
                      })}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.alcarvan.point1", "Implementación de Playwright para pruebas E2E, asegurando la calidad del software en más de 150 escenarios interactivos.")}
                      </li>
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.alcarvan.point2", "Diseño y desarrollo de interfaces para la visualización de conceptos matemáticos complejos, mejorando la comprensión del usuario.")}
                      </li>
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.alcarvan.point3", "Creación de una estructura de testing robusta para garantizar la estabilidad del proyecto.")}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Experiencia Trigon */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <h3 className="text-2xl font-bold text-custom-brown">
                      {t("home.experience.trigon.title")}
                    </h3>
                    <p className="text-lg text-custom-brown">Trigan.org</p>
                    <p className="text-sm text-custom-brown">Mar 2020 - Ene 2021</p>
                    <div ref={trigonContainerRef} className="relative inline-block w-40 h-12 mt-2">
                      <a
                        href="https://trigan.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={trigonButtonRef}
                        className="absolute inline-flex items-center gap-2 px-4 py-2 bg-custom-brown text-whiteSnow rounded-full font-bold transition-all duration-200 hover:bg-efectHovercolor focus:outline-none focus:ring-2 focus:ring-custom-brown hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V9h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span>{t("home.experience.textVisite")}</span>                      
                      </a>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-lg text-custom-brown dark:text-colorLetters">
                      {t("home.experience.trigon.description", {
                        defaultValue: "Desarrollo Frontend con React, enfocado en la creación de interfaces dinámicas y responsivas."
                      })}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.trigon.point1", "Desarrollo de componentes reutilizables en React para mejorar la eficiencia del código.")}
                      </li>
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.trigon.point2", "Implementación de soluciones frontend para aplicaciones web interactivas.")}
                      </li>
                      <li className="text-custom-brown dark:text-colorLetters">
                        - {t("home.experience.trigon.point3", "Colaboración en el diseño y desarrollo de interfaces centradas en el usuario.")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-custom-brown mb-4">
                {t("home.ctaTitle")}
              </h2>
              <button
                onClick={() => router.push("/Contacto")}
                className="inline-block px-8 py-4 bg-custom-brown text-whiteSnow rounded-full font-medium transition-all duration-300 hover:bg-efectHovercolor focus:outline-none focus:ring-2 focus:ring-custom-brown hover:scale-110"
              >
                {t("home.contactButton")}
              </button>
            </div>
          </div>
        </section>
      </BackBurble>
    </Layout>
  );
};

export default Home;

