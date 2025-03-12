import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import usePortafolios from '../hook/usePortafolios';

const LinkButton = ({ href, target, rel, className, ariaLabel, children, iconType }) => (
  <Link
    href={href}
    target={target}
    rel={rel}
    className={`inline-flex items-center justify-center gap-2 transition-all ${className}`}
    aria-label={ariaLabel}
  >
    {children}
    {iconType === 'gitlab' ? <GitLabIcon /> : (iconType === 'github' ? <GitHubIcon /> : <LiveDemoIcon />)}
  </Link>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GitLabIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
);

const LiveDemoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxwYXRoIGZpbGw9IiNjY2MiIGQ9Ik0wIDBoOHY4SDB6Ii8+PC9zdmc+';

const Proyecto = React.memo(({ e, index }) => {
  const { t } = usePortafolios();
  const { img, linkGit, link, git, id, title, tech = [] } = e;

  // Determinar el tipo de icono
  const gitIconType = git?.includes('gitlab') ? 'gitlab' : 'github';

  return (
    <div
      className="relative group rounded-lg overflow-hidden bg-glass hover:bg-glass-hover transition-all duration-300 hover:shadow-xl hover:shadow-primary"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="relative h-52 overflow-hidden rounded-lg">
        <Image
          src={`/imgProyectos/${img}.png`}
          alt={`Proyecto ${id}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          placeholder="blur"
          blurDataURL={blurDataURL}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-dark-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-whiteSnow mb-2">{title}</h3>
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((t, i) => (
                <span key={i} className="px-2 py-1 text-xs font-medium rounded-lg bg-tech-badge text-tech-text">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Botones siempre visibles */}
        <div className="flex flex-row gap-3 mt-2">
          {linkGit && (
            <LinkButton
              href={linkGit}
              iconType={gitIconType}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-efecto px-3 py-1.5 text-sm font-medium bg-primary hover:bg-primary-hover rounded-lg text-whiteSnow"
              ariaLabel={`Repositorio en ${git}`}
            >
              {git}
            </LinkButton>
          )}

          {link && (
            <LinkButton
              href={link}
              iconType="live"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-efecto px-3 py-1.5 text-sm font-medium bg-primary hover:bg-primary-hover rounded-lg text-whiteSnow"
              ariaLabel="Visitar proyecto en vivo"
            >
              {t("project.buttonST")}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
});

Proyecto.displayName = 'Proyecto';
export default Proyecto;