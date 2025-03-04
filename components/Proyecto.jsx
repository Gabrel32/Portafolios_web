import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import usePortafolios from '../hook/usePortafolios';

const LinkButton = ({ href, target, rel, className, ariaLabel, children }) => (
  <Link
    href={href}
    target={target}
    rel={rel}
    className={`inline-flex items-center justify-center gap-2 transition-all ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </Link>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

const Proyecto = React.memo(({ e, index }) => {
  const { t } = usePortafolios();
  const { img, linkGit, link, git, id } = e;

  const blurDataURL = 'data:image/svg+xml;base64,...'; // Mantén tu blurDataURL

  return (
    <div
      className="relative group rounded-xl overflow-hidden bg-transparent shadow-md  transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      {/* Contenedor de imagen con overlay */}
      <div className="relative h-60 overflow-hidden bg-transparent">
        <Image
          src={`/imgProyectos/${img}.png`}
          alt={`Proyecto ${id}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          placeholder="blur"
          blurDataURL={blurDataURL}
          loading="lazy"
          onError={(e) => (e.target.src = '/imgProyectos/fallback.png')}
        />
        
        {/* Overlay sutil al hover */}
        <div className="absolute inset-0 bg-transparent transition-all duration-300" />
      </div>

      {/* Contenido inferior */}
      <div className="py-3 px-4 bg-transparent">
        <div className="flex flex-row gap-3 justify-between items-center">
          {linkGit && (
            <LinkButton
              href={linkGit}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-efecto px-4 py-2 text-sm font-medium text-whiteSnow bg-secondary rounded-lg hover:bg-secondary/90 w-full sm:w-auto transition-colors whitespace-nowrap"
              ariaLabel={`Repositorio en ${git}`}
            >
              <span className="truncate py-1">{git}</span>
              <ArrowIcon />
            </LinkButton>
          )}

          {link && (
            <LinkButton
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-efecto px-4 py-2 text-sm font-medium text-whiteSnow bg-custom-brown rounded-lg hover:bg-custom-brown/90 w-full sm:w-auto transition-colors whitespace-nowrap"
              ariaLabel="Visitar proyecto en vivo"
            >
              <span className="truncate py-1">{t("project.buttonST")}</span>
              <ArrowIcon />
            </LinkButton>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .btn-efecto {
          position: relative;
          overflow: hidden;
        }

        .btn-efecto::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, transparent 10.01%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s ease-out;
        }

        .btn-efecto:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        /* Nuevo efecto de hover para la tarjeta */
        .group:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .group {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

Proyecto.displayName = 'Proyecto';

export default Proyecto;