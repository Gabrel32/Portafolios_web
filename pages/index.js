import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState, useCallback } from "react";
import BackBurble from "../components/BackBurble";
import { useRouter } from "next/router";
import cvPdf from "../public/CV/cv.pdf";
import Image from "next/image";
import { Globe } from "lucide-react";
import ExperienceCard from "../components/ExperienceCard";

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
  const router = useRouter();

  const experiences = [
    {
      title: t("home.experience.alcarvan.title"),
      company: "Sistemas Tecnológicos Alcarván",
      period: "Feb 2023 - Presente",
      link: "https://www.alcaravan.com.ve/",
      description: t("home.experience.alcarvan.description", {
        defaultValue:
          "Desarrollo de libros matemáticos interactivos, enfocado en la digitalización de contenidos educativos y la creación de experiencias de usuario intuitivas.",
      }),
      points: [
        t(
          "home.experience.alcarvan.point1",
          "Implementación de Playwright para pruebas E2E, asegurando la calidad del software en más de 150 escenarios interactivos.",
        ),
        t(
          "home.experience.alcarvan.point2",
          "Diseño y desarrollo de interfaces para la visualización de conceptos matemáticos complejos, mejorando la comprensión del usuario.",
        ),
        t(
          "home.experience.alcarvan.point3",
          "Creación de una estructura de testing robusta para garantizar la estabilidad del proyecto.",
        ),
      ],
    },
    {
      title: t("home.experience.trigon.title"),
      company: "Trigan.org",
      period: "Mar 2020 - Ene 2021",
      link: "https://trigan.org/",
      description: t("home.experience.trigon.description", {
        defaultValue:
          "Desarrollo Frontend con React, enfocado en la creación de interfaces dinámicas y responsivas.",
      }),
      points: [
        t(
          "home.experience.trigon.point1",
          "Desarrollo de componentes reutilizables en React para mejorar la eficiencia del código.",
        ),
        t(
          "home.experience.trigon.point2",
          "Implementación de soluciones frontend para aplicaciones web interactivas.",
        ),
        t(
          "home.experience.trigon.point3",
          "Colaboración en el diseño y desarrollo de interfaces centradas en el usuario.",
        ),
      ],
    },
    {
      title: t("home.experience.truco.title"),
      company: "trucoclub.app",
      period: "Ago 2025 - Feb 2026",
      link: "https://www.trucoclub.app/",
      description: t("home.experience.truco.description"),
      points: [
        t("home.experience.truco.point1"),
        t("home.experience.truco.point2"),
        t("home.experience.truco.point3"),
      ],
    },
  ];

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
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              once: true,
            },
          }),
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
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              once: true,
            },
          }),
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
            }),
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
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 85%",
              once: true,
            },
          }),
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
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 85%",
              once: true,
            },
          }),
        );
      }
    });

    const cleanupMainButton = setupMagneticEffect(
      buttonRef,
      buttonContainerRef,
    );

    return () => {
      ctx.revert();
      cleanupMainButton();
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
        <section
          className={`relative flex flex-col items-center py-12 ${className}`}
        >
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
                <span className="flex flex-row gap-0 flex-wrap md:gap-5 text-custom-brown">
                  {t("home.title1")}
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

                <div
                  ref={buttonContainerRef}
                  className="relative inline-block w-40 h-16"
                >
                  <button
                    ref={buttonRef}
                    className="absolute px-8 py-4 bg-custom-brown text-whiteSnow rounded-full font-bold transition-all duration-300 hover:bg-efectHovercolor focus:outline-none"
                    aria-label={t("home.downloadCV")}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = cvPdf;
                      link.download = "gabriel-hernandez.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span className="relative z-10">
                      {t("home.downloadCV")}
                    </span>
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
                  <Image
                    src="/Selfie/selfie.jpg"
                    alt={t("home.aboutAlt")}
                    width={192}
                    height={192}
                    className="rounded-full object-cover border-4 border-custom-brown hover:rotate-3 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg md:text-xl text-custom-brown dark:text-colorLetters leading-relaxed">
                    {t("home.aboutDescription", {
                      defaultValue:
                        "Desarrollador Frontend especializado en crear experiencias educativas interactivas. Combino mis conocimientos en matemáticas avanzadas con desarrollo web moderno para transformar conceptos complejos en interfaces intuitivas y accesibles.",
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
              <h2 className="text-4xl md:text-5xl font-bold text-custom-brown mb-12">
                {t("home.experienceTitle")}
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <ExperienceCard key={index} index={index} t={t} {...exp} />
                ))}
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
