import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const templateParams = {
      from_name: formData.from_name,
      to_name: formData.from_name, // Puedes ajustar esto según tu caso
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
        setTimeout(() => setSuccess(false), 3000);
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
    <form onSubmit={handleSubmit} className="mt-12 space-y-6 animate-fadeInUp">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="from_name" className="text-custom-brown font-semibold">
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
            className="w-full px-4 py-3 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-beige-100/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="from_email" className="text-custom-brown font-semibold">
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
            className="w-full px-4 py-3 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-beige-100/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-custom-brown font-semibold">
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
          className="w-full px-4 py-3 h-32 bg-beige-50 dark:bg-completColor border border-custom-brown/20 rounded-lg focus:ring-2 focus:ring-custom-brown focus:border-transparent transition-all resize-none scrollbar-thin scrollbar-thumb-custom-brown/20 scrollbar-track-beige-50/50 dark:scrollbar-track-completColor/50 placeholder-gray-400 dark:placeholder-beige-100/50"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-custom-brown to-efectHovercolor text-beige-50 rounded-lg font-bold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <span className="relative z-10">
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </span>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg animate-shake">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-lg animate-fadeIn">
          ✔️ Mensaje enviado exitosamente
        </div>
      )}
    </form>
  );
}
