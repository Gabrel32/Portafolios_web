import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navegacion from '../components/Navegacion';
import usePortafolios from '../hook/usePortafolios';

function Layout({ children, pagina }) {
  const { t,currentTheme } = usePortafolios();
  
  const pageTitle = typeof pagina === 'string' ? pagina : t("layout.defaultPageTitle");

  // Estado para almacenar el color del tema activo
  const [circleColor, setCircleColor] = useState('#DC5F00'); // Valor por defecto: theme-default
  const textColor = '#FFFFFF'; // Letras siempre blancas

  // Detectar el tema activo y actualizar el color
  useEffect(() => {
    const root = document.documentElement;
    const updateThemeColor = () => {
      // const currentTheme = root.className || 'theme-default'; // Tema por defecto si no hay clase
      const isDark = root.classList.contains('dark');

      // Mapa de colores --custom-brown según el tema
      const themeColors = {
        default: isDark ? '#DC5F00' : '#DC5F00', // Naranja brillante
        forest: isDark ? '#3A7D44' : '#3A7D44',  // Verde vibrante
        ocean: isDark ? '#107bcdf1' : '#1a7ccdf1', // Azul vibrante
        desert: isDark ? '#a36128' : '#8B572A',   // Arena natural
        sunset: isDark ? '#8b4740' : '#8b4740',   // Rosa pastel
      };

      // Obtener el color del tema actual o usar el por defecto
      const newColor = themeColors[currentTheme] || '#DC5F00';
      
      setCircleColor(newColor);
    };
    updateThemeColor()
  }, [currentTheme]);

  // SVG como cadena codificada con colores dinámicos
  const faviconSvg = `
  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="20" fill="${circleColor}" />
    <text x="49%" y="55%" text-anchor="middle" dy=".3em" font-size="17" font-family="'Klee One', sans-serif" font-weight="bold" fill="${textColor}">
      GH
    </text>
  </svg>
`;
  const faviconDataUrl = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;

  return (
    <div suppressHydrationWarning className="flex flex-col min-h-screen dark:bg-darkBackground bg-lightBackground">
      {/* SEO y Metadatos */}
      <Head>
        <title>{`${pageTitle} - ${t("layout.siteTitle")}`}</title>
        <meta name="description" content={`${t("layout.siteDescription")}: ${pageTitle}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Gabriel Hernandez" />
        <meta property="og:title" content={`${pageTitle} - ${t("layout.siteTitle")}`} />
        <meta property="og:description" content={t("layout.siteDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Favicon dinámico */}
        <link rel="icon" type="image/svg+xml" href={faviconDataUrl} />
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