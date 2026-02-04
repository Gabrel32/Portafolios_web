import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <div
          className="absolute inset-0 rounded-full border-4 border-t-custom-brown border-l-primary border-b-accent border-r-transparent animate-spin"
          style={{ animationDuration: "1s" }}
        />
        <div className="absolute inset-1 rounded-full bg-whiteSnow dark:bg-completColor" />
      </div>
      <p className="text-lg font-medium text-custom-brown animate-pulse">
        Cargando proyectos...
      </p>
    </div>
  );
};

export default Spinner;
