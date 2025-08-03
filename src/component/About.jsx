import AboutImage from "../assets/About_profile.svg";
const About = () => {
  return (
    <>
      <section
        id="about"
        className="relative z-10 w-full min-h-max px-6 sm:px-8 md:px-16 py-8 lg:py-14 flex  justify-center bg-[#F6F5F0] "
      >
        <div className="max-w-7xl w-full space-y-12">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#0F0F0F]">
              Who I Am, and How I Build
            </h2>
            <p className="mt-2 md:mt-4 text-[15px] sm:text-[17px]  text-gray-700">
              Crafting digital calm — fast, focused, and friction-free.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src={AboutImage}
                alt="About section illustration"
                className="w-60 md-80 lg:w-96 h-auto max-w-sm "
              />
            </div>

            {/* Text */}
            <div className="order-2 lg:order-1 text-left text-[15px] sm:text-[17px] tracking-normal leading-relaxed  text-gray-800 space-y-4">
              <p>
                I’m Abhishek Kumar — a frontend developer passionate about
                building clean, accessible, and performance-first web
                experiences. I bring ideas to life with modern web tools and a
                minimalist mindset. My coding approach emphasizes clarity and
                modularity — each component purposeful, each interaction smooth.
                Whether it's React or Tailwind, I love turning UI concepts into
                scalable, reusable designs. As a self-driven learner, I believe
                in growing through practice — pushing pixels, writing code, and
                constantly refining. I aim to make every interaction feel
                effortless and every page worth exploring.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
