import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import project1 from "../assets/images/thepassportfillers.png";
import project2 from "../assets/images/defendevil.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "The Passport Fillers",
    description:
      "Developed a responsive travel website focused on showcasing travel packages with a clean, modern UI.",
    image: project1,
    link: "#",
  },
  {
    title: "DefendEvil",
    description: "Another cool project description...",
    image: project2,
    link: "#",
  },
  {
    title: "The Passport Fillers 2",
    description:
      "Designed intuitive layouts for easy browsing of travel packages across all devices.",
    image: project1,
    link: "#",
  },
  {
    title: "DefendEvil 2",
    description: "Another cool project description...",
    image: project2,
    link: "#",
  },
  {
    title: "The Passport Fillers 3",
    description:
      "Designed intuitive layouts for easy browsing of travel packages across all devices.",
    image: project1,
    link: "#",
  },
];

const Project = () => {
  const [heroHeight, setHeroHeight] = useState(0);
  const cardsRef = useRef([]);

  useEffect(() => {
    const updateHeight = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        setHeroHeight(hero.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    // initial hidden state
    gsap.set(cards, { y: 50, opacity: 0 });

    // create triggers
    const triggers = cards.map((card) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () =>
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          }),
        onLeaveBack: () =>
          gsap.to(card, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
          }),
      })
    );

    // ensure above-the-fold items animate too
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        style={{ marginTop: `${heroHeight}px` }}
        className="relative z-10 w-full px-6 sm:px-8 md:px-16 py-8 lg:py-14 bg-[#F6F5F0] text-black rounded-t-[35px] flex justify-center"
      >
        <div className="max-w-7xl w-full">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#0F0F0F] text-center">
            Browser-Ready Builds
          </h2>
          <p className="mt-4 md:mt-6 text-[15px] sm:text-[17px] tracking-normal leading-relaxed text-gray-700 text-center">
            Scroll through what happens when creativity meets code and design
            meets detail.
          </p>

          {/* Cards Section */}
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {projects.map((project, index) => (
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                key={index}
                className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]"
              >
                <div className="border-2 border-black p-2 rounded-xl flex justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-fit rounded-xl"
                  />
                </div>

                <h3 className="mt-4 text-[15px] sm:text-[17px] tracking-normal leading-relaxed text-center underline underline-offset-4">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
