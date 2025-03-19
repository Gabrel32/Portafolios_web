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

    // Agrega un loader para archivos PDF
    config.module.rules.push({
      test: /\.(pdf)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/_next/static/files', // Ruta donde se servirán los archivos
            outputPath: 'static/files', // Ruta donde se guardarán los archivos en la carpeta de construcción
          },
        },
      ],
    });

    return config; // Devuelve la configuración modificada
  },
};