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

  // Efecto magnético para el botón
  useEffect(() => {
    const button = buttonRef.current;
    const container = buttonContainerRef.current;
    if (!button || !container) return;

    let isActive = true;

    const magneticEffect = (e) => {
      if (!isActive) return;

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
      if (!isActive) return;
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
      isActive = false;
      container.removeEventListener("mousemove", magneticEffect);
      container.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl border border-custom-brown/30 bg-whiteSnow/5 dark:bg-black/20 hover:bg-whiteSnow/10 dark:hover:bg-whiteSnow/5 transition-all duration-300 hover:shadow-xl hover:shadow-custom-brown/20 group`}
    >
      <div className="md:w-1/4 flex flex-col items-start">
        <h3 className="text-2xl font-bold text-custom-brown group-hover:text-efectHovercolor transition-colors duration-300">
          {title}
        </h3>
        <p className="text-lg font-medium text-custom-brown mt-1">{company}</p>
        <p className="text-sm text-custom-brown italic mb-4">{period}</p>

        <div
          ref={buttonContainerRef}
          className="relative inline-block w-40 h-12 mt-6"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            className="absolute inline-flex items-center gap-2 px-5 py-2.5 bg-custom-brown text-whiteSnow rounded-full font-bold text-sm transition-all duration-300 hover:bg-efectHovercolor shadow-lg hover:shadow-custom-brown/50 focus:outline-none focus:ring-2 focus:ring-custom-brown"
          >
            <Globe className="w-4 h-4" />
            <span>{t("home.experience.textVisite")}</span>
          </a>
        </div>
      </div>

      <div className="md:w-3/4 border-l-2 border-custom-brown/10 pl-6 md:pl-8 dark:border-whiteSnow/10">
        <p className="text-lg text-custom-brown dark:text-colorLetters leading-relaxed mb-4">
          {description}
        </p>
        <ul className="space-y-3">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-custom-brown dark:text-colorLetters/90"
            >
              <span className="text-custom-brown/60 dark:text-efectHovercolor mt-1.5">
                •
              </span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
