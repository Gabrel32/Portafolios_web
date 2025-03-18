module.exports = {
  // Otras configuraciones de Next.js (si las tienes)
  reactStrictMode: true, // Ejemplo de otra configuración

  // Configuración personalizada de Webpack
  webpack: (config, { isServer }) => {
    // Evitar conflictos con módulos de Node.js en el lado del cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // Mantén las configuraciones existentes
        fs: false, // Deshabilita el módulo 'fs' en el cliente
      };
    }

    return config; // Devuelve la configuración modificada
  },
};