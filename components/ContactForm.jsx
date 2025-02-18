import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import NotificationModal from "./NotificationModal";

// Función para formatear la fecha y la hora
const formatDateAndTime = () => {
  const now = new Date();
  const optionsDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const optionsTime = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Usar el idioma del navegador o español por defecto
  const locale = navigator.language.startsWith("es") ? "es-ES" : "es-MX";

  // Formatear fecha y hora
  const formattedDate = now.toLocaleDateString(locale, optionsDate);
  const formattedTime = now.toLocaleTimeString(locale, optionsTime);

  // Combinar fecha y hora en el formato deseado
  const fullDateTime = `${formattedDate}, ${formattedTime}`;
  return { date: fullDateTime.split(", ")[0], time: fullDateTime.split(", ")[1] };
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.from_name || !formData.from_email || !formData.message) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const { date, time } = formatDateAndTime(); // Obtener fecha y hora formateadas

    const templateParams = {
      from_name: formData.from_name,
      to_name: "Sr. Hernández",
      from_email: formData.from_email,
      message: formData.message,
      date: date,
      time: time,
      reply_to: formData.from_email,
    };

    try {
      const response = await emailjs.send(
        "service_9fa3i7j",
        "template_cd15fxg",
        templateParams,
        "eUduW7kk-a--PPfBd"
      );
      if (response.status === 200) {
        setSuccess(true);
        setFormData({ from_name: "", from_email: "", message: "" });
      } else {
        setError("Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión. Verifica tu conexión a internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {success && (
        <NotificationModal
          type="success"
          message="Tu mensaje ha sido enviado exitosamente. Me pondré en contacto contigo pronto."
          onClose={() => setSuccess(false)}
        />
      )}
      {error && (
        <NotificationModal
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}
      <form onSubmit={handleSubmit} className="mt-12 space-y-6 animate-fadeInUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="from_name" className="text-custom-brown font-semibold block">
              Nombre
            </label>
            <input
              id="from_name"
              name="from_name"
              type="text"
              required
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-beige-100/50 dark:text-beige-50"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="from_email" className="text-custom-brown font-semibold block">
              Correo
            </label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              required
              value={formData.from_email}
              onChange={handleChange}
              placeholder="Tu correo"
              className="w-full px-4 py-3 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-beige-100/50 dark:text-beige-50"
              disabled={loading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-custom-brown font-semibold block">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={20}
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            className="w-full px-4 py-3 h-32 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all resize-none scrollbar-thin scrollbar-thumb-custom-brown/20 scrollbar-track-beige-50/50 dark:scrollbar-track-completColor/50 placeholder-gray-400 dark:placeholder-beige-100/50 dark:text-beige-50"
            disabled={loading}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-custom-brown to-efectHovercolor text-beige-50 rounded-lg font-bold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading && (
                <svg
                  className="w-4 h-4 animate-spin text-beige-50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                    opacity="0.75"
                  />
                </svg>
              )}
              {loading ? "Enviando..." : "Enviar Mensaje"}
            </span>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          </button>
        </div>
      </form>
    </>
  );
}