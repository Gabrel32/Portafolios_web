import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import BackBurble from "../components/BackBurble";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ className, ...props }) => {
  const { isDarkMode, t } = usePortafolios();
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const decorativesRef = useRef([]);

  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current.children, {
        duration: 1.5,
        opacity: 0,
        y: 80,
        stagger: 0.2,
        ease: "power4.out",
      });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const setupMagneticEffect = useCallback(() => {
    if (!buttonRef.current || !buttonContainerRef.current) return;

    const button = buttonRef.current;
    const container = buttonContainerRef.current;
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
        x: gsap.utils.clamp(-maxX, maxX, x * 0.2),
        y: gsap.utils.clamp(-maxY, maxY, y * 0.2),
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const resetPosition = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.2,
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

  useEffect(() => {
    if (!isMounted) return;

    const animations = [];

    if (subtitleRef.current) {
      animations.push(
        gsap.from(subtitleRef.current, {
          duration: 1.2,
          opacity: 0,
          y: 30,
          ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 85%" },
        })
      );
    }

    if (contentRef.current) {
      animations.push(
        gsap.from(contentRef.current.children, {
          duration: 1.2,
          opacity: 0,
          y: 40,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        })
      );
    }

    decorativesRef.current.forEach((el, index) => {
      animations.push(
        gsap.from(el, {
          duration: 2,
          opacity: 0,
          scale: 0.5,
          y: 60,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: el, start: "top 90%" },
        })
      );
    });

    setupMagneticEffect();
    return () => animations.forEach((anim) => anim?.kill());
  }, [isMounted, setupMagneticEffect]);

  if (!isMounted) return null;

  return (
    <Layout pagina={t('header.nav.home')}>
      <BackBurble
        particleDensity={20}
        bubbleColors={["bg-custom-brown", "bg-efectHovercolor"]}
        center={true}
        showLine={false}
        variant="wide"
      >
        <section className={`relative flex items-center ${className}`}>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0" />
            <div className="absolute inset-0 mix-blend-overlay" />
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12">
            <div
              ref={contentRef}
              className="backdrop-blur rounded-3xl p-8 md:p-12 lg:p-16 border border-custom-brown shadow-2xl shadow-custom-brown hover:shadow-custom-brown transition-all duration-700"
            >
              <h1
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8"
              >
                <span className="block font-bold text-custom-brown">
                {t('home.title1')}
                </span>
                <span className="inline-block text-whiteSnow mt-2 relative">
                {t('home.title2')}
                  <span className="absolute -inset-2 bg-custom-brown rounded-[20px] -z-10 animate-pulse-slow" />
                </span>
              </h1>

              <div className="space-y-6 max-w-2xl">
                <p
                  ref={subtitleRef}
                  className="text-2xl md:text-3xl font-semibold text-custom-brown dark:text-primary"
                >
                  {t('home.subtitle')}
                </p>
                <p className="text-lg md:text-xl text-custom-brown dark:text-whiteSnow leading-relaxed">
                  {t('home.description')}
                </p>

                <div ref={buttonContainerRef} className="relative inline-block">
                  <button
                    ref={buttonRef}
                    className="relative px-8 py-4 bg-custom-brown text-whiteSnow rounded-full font-medium transition-all duration-300 hover:bg-efectHovercolor focus:outline-none focus:ring-2 focus:ring-custom-brown"
                    aria-label={t('home.downloadCV')}                 
                    >
                    <span className="relative z-10">
                    {t('home.downloadCV')}                    
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={(el) => (decorativesRef.current[i] = el)}
                className={`absolute ${i === 0 ? "top-10 left-0 w-72 h-72" : i === 1 ? "bottom-20 right-0 w-96 h-96" : "top-1/2 left-1/3 w-56 h-56"}  rounded-full blur-3xl animate-float`}
              />
            ))}
          </div>
        </section>
      </BackBurble>
    </Layout>
  );
};

export default Home;