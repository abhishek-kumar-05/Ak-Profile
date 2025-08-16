import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import project1 from "../assets/images/thepassportfillers.png";
import project2 from "../assets/images/defendevil.png";
import DialogBox from "./DialogBox";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "The Passport Fillers",
    description: [
      "Developed a responsive travel website focused on showcasing travel packages with a clean, modern UI.",
      "Built using Next.js and Tailwind CSS to ensure performance, scalability, and smooth design flow.",
      "Designed intuitive layouts for easy browsing of travel packages across all device types.",
      "Created under the guidance of Syris, following real-world frontend development standards and best practices.",
    ],
    image: project1,
    link: "https://thepassportfillers.com/",
  },
  {
    title: "DefendEvil",
    description: [
      "A cybersecurity tool to scan URLs and files for threats.",
      "Built using Next.js, TailwindCSS, and VirusTotal API.",
    ],
    image: project2,
    link: "https://defendevil.com/",
  },
  {
    title: "The Passport Fillers 2",
    description: [
      "Developed a responsive travel website focused on showcasing travel packages with a clean, modern UI.",
      "Built using Next.js and Tailwind CSS to ensure performance, scalability, and smooth design flow.",
      "Designed intuitive layouts for easy browsing of travel packages across all device types.",
      "Created under the guidance of Syris, following real-world frontend development standards and best practices.",
    ],
    image: project1,
    link: "https://thepassportfillers.com/",
  },
  {
    title: "DefendEvil 2",
    description: [
      "A cybersecurity tool to scan URLs and files for threats.",
      "Built using Next.js, TailwindCSS, and VirusTotal API.",
    ],
    image: project2,
    link: "https://defendevil.com/",
  },
  {
    title: "The Passport Fillers 3",
    description: [
      "Developed a responsive travel website focused on showcasing travel packages with a clean, modern UI.",
      "Built using Next.js and Tailwind CSS to ensure performance, scalability, and smooth design flow.",
      "Designed intuitive layouts for easy browsing of travel packages across all device types.",
      "Created under the guidance of Syris, following real-world frontend development standards and best practices.",
    ],
    image: project1,
    link: "https://thepassportfillers.com/",
  },
];

const Project = () => {
  const [heroHeight, setHeroHeight] = useState(0);
  const [projectDetail, setProjectDetail] = useState(null);
  const cardsRef = useRef([]);
  const titleRef = useRef([]);

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
    if (!heroHeight) return;
    const cards = cardsRef.current.filter(Boolean);
    const titles = titleRef.current.filter(Boolean);
    if (!cards.length) return;

    // initial hidden state
    gsap.set(cards, { y: 50, opacity: 0 });
    gsap.set(titles, { y: 20, opacity: 0 });

    // create triggers
    const triggers = cards.map((card, i) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          });
          gsap.to(titles[i], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2, // small overlap
          });
        },

        onLeaveBack: () => {
          gsap.to(card, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
          });
          gsap.to(titles[i], {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
          });
        },
      })
    );

    // ensure above-the-fold items animate too
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [heroHeight]);

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
                <div
                  onClick={() => setProjectDetail(project)}
                  className="border-2 border-black p-2 rounded-xl flex justify-center"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-fit rounded-xl"
                  />
                </div>

                <h3
                  onClick={() => setProjectDetail(project)}
                  ref={(el) => (titleRef.current[index] = el)}
                  className="mt-4 text-[15px] sm:text-[17px] tracking-normal leading-relaxed text-center "
                >
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {projectDetail && (
        <DialogBox
          title={projectDetail.title}
          description={projectDetail.description}
          link={projectDetail.link}
          onClose={() => setProjectDetail(null)}
        />
      )}
    </>
  );
};

export default Project;
