"use client";

import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Image from "next/image";
import Link from "next/link";
import usePortafolios from "../hook/usePortafolios";
import BackBurble from "../components/BackBurble";

function SobreMi() {
  const { tecnologias, t } = usePortafolios();
  return (
    <Layout pagina={t("header.nav.about")}>
      <BackBurble
        particleDensity={20}
        bubbleColors={["bg-custom-brown", "bg-efectHovercolor"]}
        center={true}
        showLine={false}
        variant="wide"
      >
        <section className="relative flex items-center py-4 px-6 md:px-12">

          {/* Main Content */}
          <div className="relative z-10 min-w-[280px] max-w-xl md:max-w-6xl w-full backdrop-blur-xl rounded-3xl p-3 md:p-4 lg:p-8 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 text-center text-custom-brown relative">
              {t("about.title")}
              <span className="absolute -inset-2 rounded-full blur-xl -z-10 animate-pulse-slow " />
            </h2>
            <p className="text-base md:text-lg text-colorLetters font-bold leading-relaxed text-center mb-10">
              {t("about.description")}
            </p>

            {/* Technologies */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ">
              {tecnologias.map((e, index) => (
                <li
                  key={`${e.id}_${index}`}
                  className="group flex flex-col items-center p-3 md:p-4 backdrop-blur-xl rounded-2xl border border-custom-brown shadow-md shadow-secondary hover:shadow-custom-brown transition-all duration-500 hover:-translate-y-1 animate-cardPop  "
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className=" dark:text-whiteSnow bg-whiteSnow p-2 md:p-3 rounded-full mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      width={40}
                      height={40}
                      src={`/img/${e.icon}`}
                      alt={e.Nombre}
                      className="object-contain transition-transform duration-300 group-hover:rotate-6"
                    />
                  </div>
                  <span className="text-sm md:text-base font-bold text-colorLetters relative text-center">
                    {e.Nombre}
                    <span className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-3/4" />
                  </span>
                </li>
              ))}
            </ul>

            {/* Additional Text */}
            <p className="text-base md:text-lg text-custom-brown dark:text-whiteSnow leading-relaxed text-center mt-10">
              {t("about.alsoWorkedWith")}{" "}
              <Link
                target="_blank"
                className="font-semibold text-custom-brown hover:text-efectHovercolor dark:text-whiteSnow dark:hover:text-efectHovercolor transition-all duration-300 relative group"
                href="https://www.prisma.io"
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
    </Layout>
  );
}

export default SobreMi;