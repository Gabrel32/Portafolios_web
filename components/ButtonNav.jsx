import usePortafolios from "../hook/usePortafolios";
import { useRouter } from "next/router";

function ButtonNav({
  name = "", // Nombre del botón
  id, // Identificador único del botón
  style = {}, // Estilos personalizados para el botón
  icon = {}, // Icono que se pasa como SVG o componente React
  directionPath = "/", // Ruta a la que se dirige el botón
}) {
  const { comprobarRuta, isDarkMode } = usePortafolios(); // Asegúrate de que `isDarkMode` esté disponible
  const router = useRouter();

  // Determinar si el botón está activo
  const isActive = comprobarRuta(directionPath, router);

  // Clase dinámica basada en si el botón está activo o no
  const buttonClass = isActive
    ? "text-colorLetters hover:border-custom-brown hover:text-custom-brown border-b-2 border-colorLetters scale-100" // Estilo activo
    : " text-custom-brown hover:text-colorLetters dark:text-whiteSnow dark:hover:text-custom-brown"; // Estilo inactivo

  return (
    <button
      onClick={() => router.push(directionPath)} // Redirecciona a la ruta
      type="button"
      className={`flex text-center font-semibold items-center justify-center px-4 py-2 rounded-lg gap-1 transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${buttonClass} ${style.button ?? ""}`}
    >
      {name}
      {icon.src && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-4 transition-transform duration-200 ease-out hover:scale-110"
          dangerouslySetInnerHTML={{ __html: icon.src }}
        />
      )}
    </button>
  );
}

export default ButtonNav;