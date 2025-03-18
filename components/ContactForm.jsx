import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import usePortafolios from "../hook/usePortafolios";

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

// Función para comparar arrays
const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};

export default function ContactForm({ setSuccess, setError }) {
  const { t } = usePortafolios();
  const predefinedMessages = t("contactForm.predefinedMessages", { returnObjects: true });

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: predefinedMessages[0],
  });

  const [loading, setLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [errors, setErrors] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const prevMessagesRef = useRef(predefinedMessages);

  useEffect(() => {
    if (!areArraysEqual(prevMessagesRef.current, predefinedMessages)) {
      setFormData((prevData) => ({
        ...prevData,
        message: predefinedMessages[0],
      }));
      prevMessagesRef.current = predefinedMessages;
    }
  }, [predefinedMessages]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { from_name: "", from_email: "", message: "" };

    if (!formData.from_name.trim()) {
      newErrors.from_name = t("contactForm.errors.nameRequired");
    }

    if (!formData.from_email.trim()) {
      newErrors.from_email = t("contactForm.errors.emailRequired");
    } else if (!isValidEmail(formData.from_email)) {
      newErrors.from_email = t("contactForm.errors.invalidEmail");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contactForm.errors.messageRequired");
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError(""); // Reseteamos el error en el padre
    setSuccess(false); // Reseteamos el éxito en el padre

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
        setSuccess(true); // Actualizamos el estado en el padre
        setFormData({
          from_name: "",
          from_email: "",
          message: predefinedMessages[0],
        });
      } else {
        setError(t("contactForm.errors.sendError")); // Actualizamos el error en el padre
      }
    } catch (err) {
      setError(t("contactForm.errors.connectionError")); // Actualizamos el error en el padre
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
    <form onSubmit={handleSubmit} className="mt-12 space-y-6 animate-fadeInUp">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 relative">
          <label htmlFor="from_name" className="text-custom-brown font-semibold block">
            {t("contactForm.labels.name")}
          </label>
          <input
            id="from_name"
            name="from_name"
            type="text"
            value={formData.from_name}
            onChange={handleChange}
            placeholder={t("contactForm.placeholders.name")}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors.from_name ? "border-red-500" : "border-custom-brown"
            } rounded-lg focus:outline-none focus:border-custom-brown transition-all placeholder-colorLetters dark:text-whiteSnow`}
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
            {t("contactForm.labels.email")}
          </label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            value={formData.from_email}
            onChange={handleChange}
            placeholder={t("contactForm.placeholders.email")}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors.from_email ? "border-red-500" : "border-custom-brown"
            } rounded-lg focus:outline-none focus:border-custom-brown transition-all placeholder-colorLetters dark:text-whiteSnow`}
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
          {t("contactForm.labels.message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          className={`w-full px-4 py-3 h-32 bg-transparent border text-colorLetters  ${
            errors.message ? "border-red-500" : "border-custom-brown"
          } rounded-lg resize-none cursor-default focus:outline-none focus:border-custom-brown transition-all scrollbar-thin scrollbar-thumb-custom-brown scrollbar-track-colorLetters dark:scrollbar-track-completColor placeholder-gray-400`}
          disabled={loading}
          readOnly
        />
        <div className="absolute -bottom-5 h-5">
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="relative mt-8 z-[9999]">
  <button
    type="button"
    onClick={() => setShowMessages(!showMessages)}
    style={{ WebkitTapHighlightColor: 'transparent' }} // Desactiva el resaltado

    className=" btn-efecto font-bold px-4 py-2 bg-custom-brown text-whiteSnow rounded-lg text-sm hover:bg-opacity-90 transition-colors flex items-center gap-2 focus:ring-custom-brown focus:ring-offset-2"
  >
    {t("contactForm.selectMessage")}
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
    <div className="absolute z-[9999] mt-2 w-full bg-beige-50 dark:bg-completColor border border-custom-brown rounded-lg shadow-lg max-h-60 overflow-y-auto left-0 min-w-[300px] transform translate-y-2">
      {predefinedMessages.map((msg, index) => (
        <div
          key={index}
          onClick={() => handlePredefinedMessage(msg)}
          className={`px-4 py-3 cursor-pointer text-sm ${
            formData.message === msg
              ? "bg-completColor hover:bg-secondary"
              : "text-colorLetters hover:bg-secondary hover:text-whiteSnow"
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
          style={{ WebkitTapHighlightColor: 'transparent' }} // Desactiva el resaltado

          className="btn-efecto font-bold px-8 py-3 bg-gradient-to-r from-custom-brown to-efectHovercolor text-whiteSnow rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-custom-brown focus:ring-offset-2"
        >
          <span className="relative z-1 flex items-center gap-2">
            {loading && (
              <svg
                className="w-4 h-4 animate-spin text-whiteSnow"
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
            {loading ? t("contactForm.sending") : t("contactForm.sendMessage")}
          </span>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </button>
      </div>
    </form>
  );
}