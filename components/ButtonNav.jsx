import usePortafolios from "../hook/usePortafolios";
import { useRouter } from "next/router";
function ButtonNav({
  name = "",          // Nombre del botón
  id,                 // Identificador único del botón
  style = {},         // Estilos personalizados para el botón
  icon = {},          // Icono que se pasa como SVG o componente React
  directionPath = "/",// Ruta a la que se dirige el botón
}) {
  const { comprobarRuta } = usePortafolios();
  const router = useRouter();

  // Si el botón está activo, cambia el fondo
  const backgroundColor = comprobarRuta(id, router);
  

  return (
    <button
      style={{ backgroundColor:backgroundColor }}
      id={id}
      onClick={() => router.push(directionPath)}  // Redirecciona a la ruta
      type="button"
      className={` flex items-center justify-center btn-base btn-efecto w-[120px] lg:w-[140px] h-[40px] rounded-lg gap-2 font-light ${style.button ?? ""}`}
    >
      {name}
      {icon.src && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 fill-current"
          dangerouslySetInnerHTML={{ __html: icon.src }}
        />
      )}
    </button>
  );
}

export default ButtonNav;
