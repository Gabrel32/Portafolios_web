import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Globe } from "lucide-react";

const ExperienceCard = ({
  title,
  company,
  period,
  link,
  description,
  points = [],
  t,
  index,
}) => {
  const containerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // El efecto magnético suele ser molesto o inexistente en móviles (touch)
    // Solo lo activamos si el dispositivo tiene puntero (mouse)
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const button = buttonRef.current;
    const container = buttonContainerRef.current;
    if (!button || !container) return;

    const magneticEffect = (e) => {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - (buttonRect.left + buttonRect.width / 2);
      const y = e.clientY - (buttonRect.top + buttonRect.height / 2);
      const maxX = (containerRect.width - buttonRect.width) / 2;
      const maxY = (containerRect.height - buttonRect.height) / 2;

      gsap.to(button, {
        x: gsap.utils.clamp(-maxX, maxX, x * 0.3),
        y: gsap.utils.clamp(-maxY, maxY, y * 0.3),
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const resetPosition = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", magneticEffect);
    container.addEventListener("mouseleave", resetPosition);

    return () => {
      container.removeEventListener("mousemove", magneticEffect);
      container.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row gap-6 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-custom-brown bg-whiteSnow dark:bg-black/20 hover:bg-whiteSnow/50 transition-all duration-300 hover:shadow-xl group"
    >
      <div className="w-full md:w-1/4 flex flex-col items-start">
        <h3 className="text-xl md:text-2xl font-bold text-custom-brown group-hover:text-efectHovercolor transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base md:text-lg font-medium text-custom-brown mt-1">
          {company}
        </p>
        <p className="text-xs md:text-sm text-custom-brown italic opacity-70">
          {period}
        </p>

        <div
          ref={buttonContainerRef}
          className="relative flex items-center mt-4 md:mt-6 w-full md:w-40 h-12"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-custom-brown text-whiteSnow rounded-full font-bold text-sm transition-all duration-300 hover:bg-efectHovercolor shadow-md w-full md:w-auto md:absolute"
          >
            <Globe className="w-4 h-4" />
            <span>{t("home.experience.textVisite")}</span>
          </a>
        </div>
      </div>

      <div className="w-full md:w-3/4 border-t-2 md:border-t-0 md:border-l-2 border-custom-brown/20 pt-6 md:pt-0 md:pl-8 dark:border-colorLetters">
        <p className="text-base md:text-lg text-custom-brown dark:text-colorLetters leading-relaxed mb-4">
          {description}
        </p>
        <ul className="space-y-3">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm md:text-base text-custom-brown dark:text-colorLetters"
            >
              <span className="text-custom-brown dark:text-efectHovercolor font-bold">
                •
              </span>
              <span className="flex-1 opacity-90">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
