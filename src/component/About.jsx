import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutImage from "../assets/About_profile.svg";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageRef = useRef();
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);
  return (
    <>
      <section
        id="about"
        className="relative z-10 w-full min-h-max px-6 sm:px-8 md:px-16 py-8 lg:py-14 flex  justify-center bg-[#F6F5F0] "
      >
        <div className="max-w-7xl w-full space-y-10">
          {/* Heading */}
          <div className="text-center">
            <AnimatedText triggerOnScroll>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#0F0F0F]">
                Who I Am, and How I Build
              </h2>

              <p className="mt-4 md:mt-6 text-[15px] sm:text-[17px]  text-gray-700">
                Crafting digital calm — fast, focused, and friction-free.
              </p>
            </AnimatedText>
          </div>

          {/* Grid Content */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                ref={imageRef}
                src={AboutImage}
                alt="About section illustration"
                className="w-60 md-80 lg:w-96 h-auto max-w-sm "
              />
            </div>

            {/* Text */}
            <div className="order-2 lg:order-1">
              <AnimatedText triggerOnScroll>
                <div className=" text-left text-[15px] sm:text-[17px] tracking-normal leading-relaxed  text-gray-800 space-y-4">
                  <p>
                    I’m Abhishek Kumar — a frontend developer passionate about
                    building clean, accessible, and performance-first web
                    experiences. I bring ideas to life with modern web tools and
                    a minimalist mindset. My coding approach emphasizes clarity
                    and modularity — each component purposeful, each interaction
                    smooth. Whether it's React or Tailwind, I love turning UI
                    concepts into scalable, reusable designs. As a self-driven
                    learner, I believe in growing through practice — pushing
                    pixels, writing code, and constantly refining. I aim to make
                    every interaction feel effortless and every page worth
                    exploring.
                  </p>
                </div>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
