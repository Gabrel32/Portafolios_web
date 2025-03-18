// pages/SobreMi.jsx
import React, { Suspense, useMemo } from "react";
import Layout from "../layout/Layout";
import Link from "next/link";
import usePortafolios from "../hook/usePortafolios";
import dynamic from "next/dynamic";
import TechnologyCard from "../components/TechnologyCard"; // Importar el componente independiente

// Mejoras en la importación dinámica del BackBurble
const BackBurble = dynamic(() => import("../components/BackBurble"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-gray-100 rounded-md" />,
});

function SobreMi() {
  const { tecnologias, t } = usePortafolios();

  // Renderizado de las tecnologías
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