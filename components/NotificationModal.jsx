import { useEffect } from "react";

const NotificationModal = ({
  isOpen,
  type,
  message, // Mensaje principal recibido desde el componente padre
  onClose,
  successTitle = "¡Éxito!", // Título por defecto para éxito
  successDescription, // Descripción adicional opcional para éxito
  errorTitle = "¡Error!", // Título por defecto para error
  errorDescription, // Descripción adicional opcional para error
}) => {
  // Cerrar el modal al presionar la tecla "Escape"
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Determinar el título y la descripción según el tipo
  const title = type === "success" ? successTitle : errorTitle;
  const description = type === "success" 
    ? (successDescription ? `${message} ${successDescription}` : message) 
    : (errorDescription ? `${message} ${errorDescription}` : message);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose} // Cerrar al hacer clic fuera del modal
    >
      <div
        className="bg-beige-50 dark:bg-completColor rounded-xl p-8 max-w-md w-full shadow-xl relative border-2 border-custom-brown/20 animate-cardPop"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro del modal lo cierre
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-custom-brown hover:text-efectHovercolor transition-colors text-2xl font-bold"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <div className="text-center space-y-4 animate-fadeInUp">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
              type === "success"
                ? "bg-custom-brown/10 animate-softBounce"
                : "bg-red-100 dark:bg-red-900/20 animate-pulse-fast"
            }`}
          >
            {type === "success" ? (
              <svg
                className="w-8 h-8 text-custom-brown"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>

          <h3
            className={`text-2xl font-bold ${
              type === "success" ? "text-custom-brown" : "text-red-500"
            } animate-textShimmer`}
          >
            {title}
          </h3>

          <p className="text-custom-brown leading-relaxed animate-fadeInUp">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;