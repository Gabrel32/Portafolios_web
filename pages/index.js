import Layout from "../layout/Layout";
import usePortafolios from "../hook/usePortafolios";

const Home = ({ className, ...props }) => {
  const { isDarkMode } = usePortafolios();
  return (
    <Layout pagina="Home">
      <div className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
        {/* Diseño asimétrico */}
        <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 transform -rotate-2 md:rotate-0">
          <div className="backdrop-blur-xl bg-transparent rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 shadow-xl shadow-[var(--custom-brown)]/10 border-4 border-[var(--custom-brown)]/20 space-y-8 md:space-y-12">
            
            {/* Título con efecto de superposición mejorado */}
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-4 bg-[var(--custom-brown)]/10 dark:bg-[var(--custom-brown)]/20 rounded-3xl transform rotate-3 scale-95 group-hover:rotate-0 transition-all duration-500 opacity-75 group-hover:opacity-100" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl relative mix-blend-multiply dark:mix-blend-lighten">
                <span className="block text-[var(--custom-brown)] -mb-2 px-2">Desarrollo</span>
                <span className="block text-[var(--beige-50)] bg-[var(--custom-brown)] px-4 rounded-2xl mt-3 w-fit">Web</span>
              </h1>
            </div>

            {/* Contenido con animación mejorada */}
            <div className="ml-8 md:ml-12 border-l-4 border-[var(--custom-brown)] pl-6 md:pl-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[var(--custom-brown)] rounded-full mt-2 shrink-0 animate-pulse" />
                <div className="overflow-hidden">
                  <p className="text-2xl md:text-3xl text-[var(--custom-brown)] dark:text-[var(--beige-50)] font-medium mb-2">
                    <span className="animate-text-reveal [animation-delay:0.2s]">Gabriel</span>{' '}
                    <span className="animate-text-reveal [animation-delay:0.4s]">Hernández</span>
                  </p>
                  <p className="text-lg md:text-xl text-[var(--custom-brown)]/80 dark:text-[var(--beige-50)]/80 max-w-2xl animate-fade-in-delayed">
                    Especializado en crear soluciones web innovadoras y escalables,
                    combinando diseño moderno con tecnología de vanguardia para
                    ofrecer experiencias de usuario excepcionales.
                  </p>
                </div>
              </div>

              {/* Botón con mejor contraste */}
              <div className="ml-4 transform hover:skew-x-3 transition-transform duration-300">
                <button className="btn_base btn_efecto px-6 py-3 rounded-xl bg-[var(--custom-brown)] hover:bg-[var(--efectHovercolor)] dark:bg-[var(--beige-50)] dark:hover:bg-[var(--beige-50)]/90 dark:text-[var(--custom-brown)] text-[var(--beige-50)] font-semibold text-lg shadow-lg shadow-[var(--custom-brown)]/20 flex items-center gap-2">
                  Descargar CV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos dinámicos */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[var(--custom-brown)]/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[var(--custom-brown)]/15 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-[var(--beige-50)]/30 dark:bg-[var(--custom-brown)]/10 rounded-full blur-xl animate-float" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(20%); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out 2s infinite;
        }
        .animate-text-reveal {
          animation: text-reveal 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          opacity: 0;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        .btn_efecto:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px -5px rgba(var(--custom-brown-rgb), 0.4) !important;
        }
        .dark .btn_efecto:hover {
          box-shadow: 0 8px 25px -5px rgba(var(--beige-50-rgb), 0.3) !important;
        }
        .group:hover .absolute {
          background-color: rgba(var(--custom-brown-rgb), 0.15);
        }
      `}</style>
    </Layout>
  );
};

export default Home;