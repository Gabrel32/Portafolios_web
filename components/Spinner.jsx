import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Contenedor relativo para posicionar el anillo y su "recorte" */}
      <div className="relative">
        {/* Círculo exterior con degradado y animación de giro */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-spin" />
        {/* Círculo interior para simular un recorte y dejar visible solo el anillo */}
        <div className="absolute inset-1 rounded-full bg-gray-900" />
      </div>
    </div>
  );
};

export default Spinner;
