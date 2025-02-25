import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import BackBurble from "../components/BackBurble";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ className, ...props }) => {
  const { isDarkMode } = usePortafolios();
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const decorativesRef = useRef([]);
  const animationRef = useRef(null); // Referencia para almacenar la animación

  // Animación inicial del título
  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        duration: 1.8,
        opacity: 0,
        y: 100,
        rotationX: -10,
        ease: "power4.out",
        immediateRender: false
      });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  // Efecto magnético optimizado
  const setupMagneticEffect = useCallback(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let isActive = true;

    const magneticEffect = (e) => {
      if (!isActive) return;
      
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
      
      if (animationRef.current) animationRef.current.kill();
      
      animationRef.current = gsap.to(button, {
        x: gsap.utils.clamp(-15, 15, x),
        y: gsap.utils.clamp(-15, 15, y),
        scale: 1.03,
        duration: 0.15,
        ease: "power1.out",
        overwrite: "auto"
      });
    };

    const resetPosition = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: "power1.out",
        overwrite: "auto"
      });
    };

    button.addEventListener("mousemove", magneticEffect);
    button.addEventListener("mouseleave", resetPosition);

    return () => {
      isActive = false;
      button.removeEventListener("mousemove", magneticEffect);
      button.removeEventListener("mouseleave", resetPosition);
      gsap.set(button, { x: 0, y: 0, scale: 1 });
    };
  }, []);

  // Animaciones secundarias
  useEffect(() => {
    if (!isMounted) return;

    const animations = [];
    
    if (subtitleRef.current) {
      animations.push(
        gsap.from(subtitleRef.current, {
          duration: 1.2,
          opacity: 0,
          y: 40,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%"
          }
        })
      );
    }

    if (contentRef.current) {
      animations.push(
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
        })
      );
    }

    decorativesRef.current = decorativesRef.current.filter(Boolean);
    decorativesRef.current.forEach((el, index) => {
      animations.push(
        gsap.from(el, {
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
        })
      );
    });

    setupMagneticEffect();
    return () => animations.forEach(anim => anim?.kill());
  }, [isMounted, setupMagneticEffect]);

  if (!isMounted) return null;

  return (
    <Layout pagina="Home">
      <BackBurble
        particleDensity={20}
        bubbleColors={['bg-custom-brown', 'bg-efectHovercolor']} // Solo clases definidas
        center={true}
        showLine={true}
        variant="wide"
      >
        <div className={`relative py-10 flex items-center overflow-hidden ${className}`}>
          <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 animate-gradient-flow">
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-soft-light" />
          </div>

          <div 
            className="relative z-10 w-full max-w-6xl md:px-8"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div 
              ref={contentRef}
              className="backdrop-blur-lg rounded-[4rem] md:rounded-[5rem] p-8 md:p-12 lg:p-16 shadow-md border-4 border-custom-brown/70 backdrop-blur-md shadow-custom-brown/50 transition-all duration-500 hover:backdrop-blur-xl hover:shadow-custom-brown/80 hover:border-custom-brown/90"
            >
              <div className="relative group mb-5" ref={titleRef}>
                <div className="absolute -inset-4 bg-transparent rounded-3xl transform rotate-3 scale-95 group-hover:rotate-0 transition-all duration-700 opacity-75 group-hover:opacity-100 mix-blend-multiply" />
                <h1 className="text-5xl md:text-6xl lg:text-7xl relative">
                  <span className="block text-left text-custom-brown -mb-2 px-2 font-bold bg-clip-text bg-gradient-to-r from-[var(--custom-brown)] to-[var(--accent)] neon-text">
                    Desarrollo
                  </span>
                  <span className="block text-[var(--beige-50)] bg-[var(--custom-brown)] py-2 px-4 rounded-2xl mt-3 w-fit relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                    <span className="relative right-3 z-10">Web</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-custom-brown dark:via-white via-zinc-800 to-transparent opacity-40 animate-shine" />
                  </span>
                </h1>
              </div>

              <div className="ml-8 md:ml-12 border-l-4 border-custom-brown pl-6 md:pl-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[var(--custom-brown)] rounded-full mt-2 shrink-0 animate-pulse-fast" />
                  <div className="overflow-hidden">
                    <p
                      className="text-2xl md:text-3xl text-[var(--custom-brown)] font-medium mb-2"
                      ref={subtitleRef}
                    >
                      Gabriel Hernández
                    </p>
                    <p className="text-lg md:text-xl text-[var(--custom-brown)] dark:text-[var(--beige-50)] max-w-2xl leading-relaxed">
                      Especializado en crear soluciones web innovadoras y escalables,
                      combinando diseño moderno con tecnología de vanguardia para
                      ofrecer experiencias de usuario excepcionales.
                    </p>
                  </div>
                </div>

                <div className="ml-4" ref={buttonRef}>
                  <button 
                    className="absolute inset-0 bg-gradient-to-r from-custom-brown via-custom-brown to-transparent opacity-40 animate-shine"
                    aria-label="Descargar currículum vitae"
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <span className="relative z-10">Descargar CV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
             // En los elementos decorativos
              <div 
                key={i}
                ref={el => decorativesRef.current[i] = el}
                className={`absolute ${i === 0 ? 'top-1/4 -left-20 w-64 h-64 animate-float' : i === 1 ? 'bottom-1/3 -right-40 w-96 h-96 animate-float-delayed' : 'top-1/3 right-20 w-48 h-48 animate-float-slow'} bg-custom-brown dark:bg-beige-50 rounded-full blur-xl`}
              />
            ))}
          </div>
        </div>
      </BackBurble>
    </Layout>
  );
};

export default Home;