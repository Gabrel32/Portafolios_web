"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Image from "next/image";
import Link from "next/link";
import usePortafolios from "../hook/usePortafolios";
import dynamic from "next/dynamic";

// mejoras en la imporatcion dinamica del backBurbles
const BackBurble = dynamic(() => import("../components/BackBurble"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-gray-100 rounded-md" />,
});

const TechnologyCard = React.memo(({ tech, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Para manejar errores de carga
  const [isClicked, setIsClicked] = useState(false); // Estado para manejar el efecto de clic

  // Usamos useEffect para verificar la carga de la imagen de manera más robusta
  useEffect(() => {
    const img = new window.Image(); 
    img.src = `/img/${tech.icon}`;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false); 
      setHasError(true); 
    };
  }, [tech.icon]);

  // Manejar el efecto de clic
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Restablecer el estado después de 200ms
  };

  return (
    <li
      key={`${tech.id}_${index}`}
      className={`group flex flex-col items-center p-3 md:p-4 backdrop-blur-xl rounded-2xl border border-custom-brown shadow-md shadow-secondary hover:shadow-custom-brown transition-all duration-500 hover:-translate-y-1 animate-cardPop cursor-pointer select-none ${
        isClicked ? " scale-90" : "scale-100"
      }`}

      style={{ animationDelay: `${index * 0.1}s`,WebkitTapHighlightColor: 'transparent' }}
      onClick={handleClick}
    >
      <div className=" bg-whiteSnow p-2.5 rounded-full mb-2 md:mb-2 transition-transform duration-300 group-hover:scale-105">
        {isLoading && !hasError && (
          <div className="w-10 h-10 bg-gray-300 dark:bg-slate-400 rounded-full p-2 animate-pulse" />
        )}
        {!isLoading && !hasError && (
          <Image
            width={40}
            height={40}
            src={`/img/${tech.icon}`}
            alt={tech.Nombre}
            className="object-contain transition-transform duration-300 group-hover:rotate-6"
            loading="lazy"
            sizes="(max-width: 768px) 40px, 40px"
            placeholder="blur"
            blurDataURL="/img/placeholder.png"
          />
        )}
        {hasError && (
          <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center text-red-600">
            X
          </div>
        )}
      </div>
      <span className="text-sm md:text-base font-bold text-colorLetters relative text-center">
        {tech.Nombre}
        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
      </span>
    </li>
  );
});

function SobreMi() {
  const { tecnologias, t } = usePortafolios();

  const renderedTechnologies = useMemo(
    () =>
      tecnologias.map((tech, index) => (
        <TechnologyCard tech={tech} index={index} key={tech.id} />
      )),
    [tecnologias]
  );

  return (
    <Layout pagina={t("header.nav.about")}>
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <p>Loading...</p>
          </div>
        }
      >
        <BackBurble
          particleDensity={13}
          bubbleColors={["bg-custom-brown", "bg-efectHovercolor"]}
          center={true}
          showLine={false}
          variant="wide"
        >
          <section className="relative flex items-center py-4 px-6 md:px-12">
            <div className="relative z-10 min-w-[280px] max-w-xl md:max-w-6xl w-full backdrop-blur-xl rounded-3xl p-3 md:p-4 lg:p-8 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 text-center text-custom-brown relative">
                {t("about.title")}
                <span className="absolute -inset-2 rounded-full blur-xl -z-10 animate-pulse-slow" />
              </h2>
              <p className="text-base md:text-lg text-colorLetters font-bold leading-relaxed text-center mb-10">
                {t("about.description")}
              </p>

              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {renderedTechnologies}
              </ul>

              <p className="text-base md:text-lg text-custom-brown dark:text-whiteSnow leading-relaxed text-center mt-10">
                {t("about.alsoWorkedWith")}{" "}
                <Link
                  target="_blank"
                  className="font-semibold text-custom-brown hover:text-efectHovercolor dark:text-whiteSnow dark:hover:text-efectHovercolor transition-all duration-300 relative group"
                  href="https://www.prisma.io"
                  prefetch={false}
                >
                  <span>
                    {t("about.orms")}
                    <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
                  </span>
                </Link>{" "}
                {t("about.like")}{" "}
                {["Prisma", "Strapi", "Sequelize"].map((tech, i) => (
                  <React.Fragment key={tech}>
                    <Link
                      target="_blank"
                      className="font-semibold text-custom-brown hover:text-efectHovercolor dark:text-whiteSnow dark:hover:text-efectHovercolor transition-all duration-300 relative group"
                      href={`https://www.${tech.toLowerCase()}.io`}
                      prefetch={false}
                    >
                      <span>
                        {tech}
                        <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
                      </span>
                    </Link>
                    {i < 2 ? ", " : ""}
                  </React.Fragment>
                ))}
                {t("about.andOthers")}
              </p>
            </div>
          </section>
        </BackBurble>
      </Suspense>
    </Layout>
  );
}

export default SobreMi;