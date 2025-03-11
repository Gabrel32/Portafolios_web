import React from 'react';
import Head from 'next/head';
import Navegacion from '../components/Navegacion';
import usePortafolios from '../hook/usePortafolios'; // Importa el hook para usar traducciones

function Layout({ children, pagina }) {
  const { t } = usePortafolios(); // Usa el hook para obtener las traducciones

  // Asegurarse de que `pagina` sea una cadena de texto
  const pageTitle = typeof pagina === 'string' ? pagina : t("layout.defaultPageTitle"); // Fallback con traducción

  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen dark:bg-darkBackground bg-lightBackground">
      {/* SEO y Metadatos */}
      <Head>
        <title>{`${pageTitle} - ${t("layout.siteTitle")}`}</title> {/* Título dinámico */}
        <meta name="description" content={`${t("layout.siteDescription")}: ${pageTitle}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Gabriel Hernandez" />
        <meta property="og:title" content={`${pageTitle} - ${t("layout.siteTitle")}`} />
        <meta property="og:description" content={t("layout.siteDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" /> {/* Asegúrate de tener una imagen OG */}
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Nav */}
      <header className="flex justify-center items-center w-full sm:h-20 border-b border-gray-200 dark:border-gray-700">
        <Navegacion />
      </header>

      {/* Main Content */}
      <main className="flex flex-grow justify-center items-start overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-transparent text-center py-6 mt-auto">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Gabriel Hernandez. {t("layout.footerRights")}
        </p>
      </footer>
    </div>
  );
}

export default Layout;