import usePortafolios from "../hook/usePortafolios";
import { useRouter } from "next/router";

function ButtonNav({
  name = "",
  id,
  style = {},
  icon = {},
  directionPath = "/",
}) {
  const { comprobarRuta, isDarkMode } = usePortafolios();
  const router = useRouter();

  const isActive = comprobarRuta(directionPath, router);

  const buttonClass = isActive
    ? "text-colorLetters hover:border-custom-brown hover:text-custom-brown border-b-2 border-colorLetters scale-100"
    : " text-custom-brown hover:text-colorLetters dark:text-colorLetters dark:hover:text-custom-brown";

  return (
    <button
      onClick={() => router.push(directionPath)}
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
