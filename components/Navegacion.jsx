import ButtonNav from "./ButtonNav";
import usePortafolios from "../hook/usePortafolios";
import { useState, useEffect } from "react";
import DarkModeButton from "./DarkModeButton";

function Navegacion({ className, ...props }) {
  const { buttonNavs } = usePortafolios();
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para cerrar el menú al hacer clic fuera
  const closeMenu = (e) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={`rounded-corner-small flex flex-col sm:flex-row gap-5 items-center justify-between sm:justify-center relative overflow-hidden ${className}`}>
      {/* Sección del título */}
      <div className="flex flex-row gap-2 sm:gap-5 items-center justify-evenly h-[89px] relative w-full">
        <div className="text-[#000000] dark:text-white text-center text-[24px] sm:text-[30px] md:text-[40px] leading-none relative w-fit h-[60px] flex items-center">
          Gabriel
        </div>
        <div className="text-[#dc5f00] text-center text-[24px] sm:text-[30px] md:text-[40px] leading-none font-normal relative w-fit h-[60px] flex items-center justify-center">
          Hernandez
        </div>

        {/* Icono de verificación */}
        <div className="w-[25px] h-[25px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-xl"
          >
            <path
              d="M26 15.1667C26 13.06 24.9167 11.2333 23.3407 10.3667C23.5314 9.78667 23.6353 9.16 23.6353 8.5C23.6353 5.55333 21.5183 3.16933 18.9085 3.16933C18.3267 3.16933 17.7695 3.28133 17.2545 3.50267C16.4894 1.72 14.8701 0.5 13.0006 0.5C11.1312 0.5 9.51431 1.72267 8.74549 3.5C8.2317 3.28 7.67335 3.16667 7.09147 3.16667C4.47922 3.16667 2.36465 5.55333 2.36465 8.5C2.36465 9.15867 2.46741 9.78533 2.65806 10.3667C1.08328 11.2333 0 13.0573 0 15.1667C0 17.16 0.968144 18.8973 2.40427 19.8147C2.37951 20.0413 2.36465 20.268 2.36465 20.5C2.36465 23.4467 4.47922 25.8333 7.09147 25.8333C7.67335 25.8333 8.23047 25.7187 8.74425 25.5C9.51183 27.2787 11.1287 28.5 12.9994 28.5C14.8713 28.5 16.4882 27.2787 17.2545 25.5C17.7683 25.7173 18.3254 25.8307 18.9085 25.8307C21.5208 25.8307 23.6353 23.444 23.6353 20.4973C23.6353 20.2653 23.6205 20.0387 23.5945 19.8133C25.0281 18.8973 26 17.16 26 15.168V15.1667ZM17.8092 10.7213L12.4435 19.388C12.264 19.6773 11.9706 19.8333 11.6697 19.8333C11.4927 19.8333 11.3132 19.78 11.1547 19.6653L11.0123 19.54L8.02248 16.32C7.65973 15.9293 7.65973 15.296 8.02248 14.9067C8.38522 14.5173 8.97329 14.5147 9.33479 14.9067L11.5261 17.2627L16.2616 9.60933C16.5464 9.14933 17.1233 9.028 17.5492 9.33333C17.9775 9.64 18.0939 10.2613 17.8092 10.72V10.7213Z"
              fill="#1DA1F2"
            />
          </svg>
        </div>

        {/* Botones para móvil */}
        <div className="flex flex-row gap-4 items-center justify-between sm:hidden w-full">
          <div className="flex gap-4">
            <DarkModeButton />
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl relative z-20 transition-transform transform active:scale-95 text-black dark:text-white"
            >
              <svg
                width="40"
                height="37"
                viewBox="0 0 40 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 18.5H35M5 9.25H35M5 27.75H35"
                  stroke="currentColor"
                  strokeOpacity="0.85"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Modal para móvil */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 transition-opacity ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 w-[200px] h-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-10 h-full p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-black dark:text-white absolute top-4 right-4"
            >
              &times;
            </button>
            {buttonNavs.map((e) => (
              <ButtonNav
                key={e.name}
                name={e.name}
                icon={e.icon}
                directionPath={e?.directionPath}
              />
            ))}
            <div className="sm:hidden">
              <DarkModeButton />
            </div>
          </div>
        </div>
      </div>

      {/* Vista de escritorio */}
      <div className="hidden sm:flex flex-row gap-4 items-center justify-center w-full h-[70px] relative">
        {buttonNavs.map((e) => (
          <ButtonNav key={e.name} name={e.name} icon={e.icon} directionPath={e?.directionPath} />
        ))}
        <DarkModeButton />
      </div>
    </div>
  );
}

export default Navegacion;