import Layout from "../layout/Layout";

const Home = ({ className, ...props }) => {
  return (
    <Layout pagina="Home">
      <div
        className={
          "bg-[rgba(255,255,255,0.82)] rounded-[5px] pt-3.5 pr-4 pb-3.5 pl-4 flex flex-col gap-5 items-start justify-start w-full md:w-[70%] mx-10 h-[auto] z-10 shadow-sm " +
          className
        }
      >
        {/* Título */}
        <div className="text-[#000000] text-left text-[24px] sm:text-[32px] md:text-[40px] lg:text-[58px] leading-none font-normal self-stretch">
          Bienvenido a Mi Portafolio Personal Soy{" "}
        </div>

        {/* Subtítulo */}
        <div className="text-[#000000] text-left text-[24px] sm:text-[32px] md:text-[40px] lg:text-[58px] leading-none font-normal self-stretch">
          “Animación”
        </div>

        {/* Descripción */}
        <div className="text-[rgba(0,0,0,0.67)] text-left text-[14px] sm:text-[18px] md:text-[22px] lg:text-[30px] leading-none font-normal self-stretch h-auto">
          Soy un desarrollador web apasionado por crear páginas útiles y
          escalables que mejoren la experiencia del usuario.
        </div>

<button className="btn-base btn-efecto px-4 py-2 rounded w-[150px] h-full">
  <a href="#">
    Descargar CV
  </a>
</button>

      </div>
    </Layout>
  );
};
// href="/CV/cv.pdf" download

export default Home;
