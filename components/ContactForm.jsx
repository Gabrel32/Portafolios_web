import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import NotificationModal from "./NotificationModal";

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
  const locale = navigator.language.startsWith("es") ? "es-ES" : "es-MX";
  const formattedDate = now.toLocaleDateString(locale, optionsDate);
  const formattedTime = now.toLocaleTimeString(locale, optionsTime);
  return { date: formattedDate, time: formattedTime };
};

const predefinedMessages = [
  "Hola, quisiera más información sobre tus servicios.",
  "Estoy interesado en trabajar contigo. ¿Podemos hablar?",
  "Tengo una pregunta sobre un proyecto que me gustaría discutir.",
  "Me encantaría colaborar contigo en un proyecto futuro.",
  "¿Podrías ayudarme con una consulta técnica?",
  "Quisiera cotizar un servicio personalizado.",
  "¿Tienes disponibilidad para nuevas oportunidades?",
  "Necesito asesoría profesional en un tema específico.",
  "¿Ofreces servicios de consultoría?",
  "Me gustaría programar una reunión virtual.",
  "¿Tienes referencias de trabajos anteriores?",
  "Quisiera conocer más sobre tu experiencia laboral.",
  "¿Podrías compartir ejemplos de proyectos similares?",
  "Estoy evaluando opciones para mi empresa, ¿podemos conversar?",
  "¿Cuál es tu tarifa por hora de trabajo?",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: predefinedMessages[0],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [errors, setErrors] = useState({
    from_name: "",
    from_email: "",
    message: ""
  });

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { from_name: "", from_email: "", message: "" };

    if (!formData.from_name.trim()) {
      newErrors.from_name = "Por favor, ingresa tu nombre";
    }
    
    if (!formData.from_email.trim()) {
      newErrors.from_email = "Por favor, ingresa tu correo electrónico";
    } else if (!isValidEmail(formData.from_email)) {
      newErrors.from_email = "Por favor, ingresa un correo válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor, selecciona un mensaje";
    }

    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    
    const { date, time } = formatDateAndTime();
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
        setFormData({
          from_name: "",
          from_email: "",
          message: predefinedMessages[0]
        });
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
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handlePredefinedMessage = (message) => {
    setFormData({
      ...formData,
      message: message,
    });
    setShowMessages(false);
    if (errors.message) {
      setErrors({ ...errors, message: "" });
    }
  };

  return (
    <>
      {/* Los NotificationModal se mantienen iguales */}
      
      <form onSubmit={handleSubmit} className="mt-12 space-y-6 animate-fadeInUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <label htmlFor="from_name" className="text-custom-brown font-semibold block">
              Nombre
            </label>
            <input
              id="from_name"
              name="from_name"
              type="text"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={`w-full px-4 py-3 bg-beige-50 dark:bg-completColor border ${
                errors.from_name ? "border-red-500" : "border-custom-brown/20"
              } rounded-lg focus:outline-none focus:border-custom-brown transition-all placeholder-gray-400 dark:placeholder-beige-100/50 dark:text-beige-50`}
              disabled={loading}
            />
            <div className="absolute -bottom-5 h-5">
              {errors.from_name && (
                <p className="text-red-500 text-sm">{errors.from_name}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="from_email" className="text-custom-brown font-semibold block">
              Correo
            </label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              value={formData.from_email}
              onChange={handleChange}
              placeholder="Tu correo"
              className={`w-full px-4 py-3 bg-beige-50 dark:bg-completColor border ${
                errors.from_email ? "border-red-500" : "border-custom-brown/20"
              } rounded-lg focus:outline-none focus:border-custom-brown transition-all placeholder-gray-400 dark:placeholder-beige-100/50 dark:text-beige-50`}
              disabled={loading}
            />
            <div className="absolute -bottom-5 h-5">
              {errors.from_email && (
                <p className="text-red-500 text-sm">{errors.from_email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 relative">
          <label htmlFor="message" className="text-custom-brown font-semibold block">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            className={`w-full px-4 py-3 h-32 bg-beige-50 dark:bg-completColor border ${
              errors.message ? "border-red-500" : "border-custom-brown/20"
            } rounded-lg resize-none cursor-default focus:outline-none focus:border-custom-brown transition-all scrollbar-thin scrollbar-thumb-custom-brown/20 scrollbar-track-beige-50/50 dark:scrollbar-track-completColor/50 placeholder-gray-400 dark:text-beige-50`}
            disabled={loading}
            readOnly
          />
          <div className="absolute -bottom-5 h-5">
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          
          <div className="relative mt-8">
            <button
              type="button"
              onClick={() => setShowMessages(!showMessages)}
              className="px-4 py-2 bg-custom-brown text-beige-50 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-custom-brown focus:ring-offset-2"
            >
              Seleccionar mensaje
              <svg
                className={`w-4 h-4 transform transition-transform ${showMessages ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showMessages && (
              <div className="absolute z-10 mt-2 w-full bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {predefinedMessages.map((msg, index) => (
                  <div
                    key={index}
                    onClick={() => handlePredefinedMessage(msg)}
                    className={`px-4 py-3 cursor-pointer text-sm ${
                      formData.message === msg
                        ? "bg-custom-brown/10 text-custom-brown dark:bg-gray-700 dark:text-beige-50"
                        : "text-custom-brown hover:bg-custom-brown/10 dark:text-beige-50 dark:hover:bg-gray-700"
                    } transition-colors`}
                  >
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-custom-brown to-efectHovercolor text-beige-50 rounded-lg font-bold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-custom-brown focus:ring-offset-2"
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