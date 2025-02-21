import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ className, ...props }) => {
  const { isDarkMode } = usePortafolios();
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const decorativesRef = useRef([]);

  // Animación inicial del título optimizada
  useLayoutEffect(() => {
    gsap.from(titleRef.current, {
      duration: 1.8,
      opacity: 0,
      y: 100,
      rotationX: -10,
      ease: "power4.out",
      immediateRender: false
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  // Efecto magnético mejorado con límites
  const setupMagneticEffect = useCallback(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "sine.out" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "sine.out" });
    const scaleTo = gsap.quickTo(button, "scale", { duration: 0.15, ease: "power1.out" });

    const magneticEffect = (e) => {
      const rect = button.getBoundingClientRect();
      const x = Math.min(Math.max((e.clientX - rect.left - rect.width / 2) * 0.1, -15), 15);
      const y = Math.min(Math.max((e.clientY - rect.top - rect.height / 2) * 0.1, -15), 15);
      
      xTo(x);
      yTo(y);
      scaleTo(1.03);
    };

    const resetPosition = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    };

    button.addEventListener("mousemove", magneticEffect);
    button.addEventListener("mouseleave", resetPosition);

    return () => {
      button.removeEventListener("mousemove", magneticEffect);
      button.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  // Animaciones secundarias con mejor gestión
  useEffect(() => {
    if (!isMounted) return;

    const animations = [
      gsap.from(subtitleRef.current, {
        duration: 1.2,
        opacity: 0,
        y: 40,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%"
        }
      }),
      gsap.from(contentRef.current.children, {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%"
        }
      }),
      ...decorativesRef.current.map((el, index) => 
        el ? gsap.from(el, {
          duration: 2.5,
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotate: index % 2 === 0 ? 10 : -10,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%"
          }
        }) : null
      )
    ];

    setupMagneticEffect();
    return () => animations.forEach(anim => anim?.kill());
  }, [isMounted, setupMagneticEffect]);

  if (!isMounted) return null;

  return (
    <Layout pagina="Home">
      <div className={`relative py-10 flex items-center overflow-hidden ${className}`}>
        {/* Fondo con animación sutil */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 animate-gradient-flow">
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-soft-light" />
        </div>

        {/* Contenido principal optimizado */}
        <div 
          className="relative z-10 w-full max-w-6xl md:px-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={contentRef}
            className={`backdrop-blur-lg bg-gradient-to-br from-[var(--custom-brown)]/10 via-transparent to-[var(--custom-brown)]/5 dark:from-[var(--custom-brown)]/25 dark:to-[var(--custom-brown)]/35 rounded-[4rem] md:rounded-[5rem] p-8 md:p-12 lg:p-16 shadow-2xl border-4 transition-all duration-500
              ${isHovered ? 
                'backdrop-blur-xl shadow-[var(--custom-brown)]/30 border-[var(--custom-brown)]/25' : 
                'backdrop-blur-md shadow-[var(--custom-brown)]/15 border-[var(--custom-brown)]/20'
              }`}
          >
            {/* Título con efecto neon mejorado */}
            <div className="relative group mb-5" ref={titleRef}>
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--custom-brown)]/15 to-[var(--accent)]/15 rounded-3xl transform rotate-3 scale-95 group-hover:rotate-0 transition-all duration-700 opacity-75 group-hover:opacity-100 mix-blend-multiply" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl relative">
                <span className="block text-custom-brown -mb-2 px-2 font-bold bg-clip-text bg-gradient-to-r from-[var(--custom-brown)] to-[var(--accent)] neon-text">
                  Desarrollo
                </span>
                <span className="block text-[var(--beige-50)] bg-[var(--custom-brown)] py-2 px-4 rounded-2xl mt-3 w-fit relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <span className="relative z-10">Web</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40 animate-shine" />
                </span>
              </h1>
            </div>

            {/* Contenido con mejor jerarquía visual */}
            <div className="ml-8 md:ml-12 border-l-4 border-[var(--custom-brown)]/30 pl-6 md:pl-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[var(--custom-brown)] rounded-full mt-2 shrink-0 animate-pulse-fast" />
                <div className="overflow-hidden">
                  <p
                    className="text-2xl md:text-3xl text-[var(--custom-brown)] dark:text-[var(--beige-50)] font-medium mb-2"
                    ref={subtitleRef}
                  >
                    Gabriel Hernández
                  </p>
                  <p className="text-lg md:text-xl text-[var(--custom-brown)]/80 dark:text-[var(--beige-50)]/80 max-w-2xl leading-relaxed">
                    Especializado en crear soluciones web innovadoras y escalables,
                    combinando diseño moderno con tecnología de vanguardia para
                    ofrecer experiencias de usuario excepcionales.
                  </p>
                </div>
              </div>

              {/* Botón con mejor feedback visual */}
              <div className="ml-4" ref={buttonRef}>
                <button 
                  className="btn_base px-6 py-3 rounded-xl bg-[var(--custom-brown)] hover:bg-[var(--efectHovercolor)] dark:bg-[var(--beige-50)] dark:hover:bg-[var(--beige-50)]/90 dark:text-[var(--custom-brown)] text-[var(--beige-50)] font-semibold text-lg shadow-lg flex items-center gap-2 relative overflow-hidden transition-all duration-300 hover:shadow-[var(--custom-brown)]/30"
                  aria-label="Descargar currículum vitae"
                >
                  <span className="relative z-10">Descargar CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos con animaciones variadas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              ref={el => decorativesRef.current[i] = el}
              className={`absolute ${i === 0 ? 'top-1/4 -left-20 w-64 h-64 animate-float' : i === 1 ? 'bottom-1/3 -right-40 w-96 h-96 animate-float-delayed' : 'top-1/3 right-20 w-48 h-48 animate-float-slow'} bg-[var(--custom-brown)]/10 dark:bg-[var(--beige-50)]/10 rounded-full blur-xl`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        .neon-text {
          text-shadow: 0 0 12px rgba(var(--accent-rgb), 0.6),
                       0 0 24px rgba(var(--accent-rgb), 0.4),
                       0 0 36px rgba(var(--accent-rgb), 0.2);
          animation: neon-pulse 2.5s ease-in-out infinite;
        }
        
        @keyframes neon-pulse {
          0%, 100% { 
            text-shadow: 0 0 12px rgba(var(--accent-rgb), 0.6),
                         0 0 24px rgba(var(--accent-rgb), 0.4),
                         0 0 36px rgba(var(--accent-rgb), 0.2);
            filter: drop-shadow(0 0 2px rgba(var(--accent-rgb), 0.2));
          }
          50% { 
            text-shadow: 0 0 16px rgba(var(--accent-rgb), 0.8),
                         0 0 32px rgba(var(--accent-rgb), 0.6),
                         0 0 48px rgba(var(--accent-rgb), 0.4);
            filter: drop-shadow(0 0 5px rgba(var(--accent-rgb), 0.3));
          }
        }
        
        .animate-shine {
          animation: shine 3.5s linear infinite;
        }
        
        .btn_base {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        
        .btn_base:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px -8px rgba(var(--custom-brown-rgb), 0.5) !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;