import React from 'react';
import Head from 'next/head';
import Navegacion from '../components/Navegacion';

function Layout({ children, pagina }) {
  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen dark:bg-darkBackground bg-lightBackground">
      {/* SEO y Metadatos */}
      <Head>
        <title>{pagina} - Portafolio</title>
        <meta name="description" content={`Portafolio web: ${pagina}. Descubre proyectos e información relevante.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Gabriel Hernandez" />
        <meta property="og:title" content={`${pagina} - Portafolio`} />
        <meta property="og:description" content="Portafolio web donde encontrarás diversos proyectos e información de interés." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" /> {/* Asegúrate de tener una imagen OG */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Nav */}
      <header className="flex justify-center items-center w-full sm:h-20 border-b border-gray-200 dark:border-gray-700">
        <Navegacion />
      </header>

      {/* Main Content */}
      <main className="flex flex-grow px-4 sm:px-8 py-6 justify-center items-start overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 mt-auto">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Gabriel Hernandez. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default Layout;