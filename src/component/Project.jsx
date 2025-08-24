import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";

import project1 from "../assets/images/TIP.png";
import project2 from "../assets/images/Ak_portfolio.png";
import project3 from "../assets/images/Image_Resizer.png";

import DialogBox from "./DialogBox";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Threat Inelligence Program",
    description: [
      "A full-stack web app that scan URLs and files for threat visualizes that result with charts. Also aggregates cyber security news for informed analyis.",
      "Built a responsive dashboard with Next.js and styles using Tailwind CSS.",
      "Integrated VirusTotal API to analyze files and URLs, displaying real-time threat status.",
      "Implemented firebase Auth and Firestore for secure login and saving scan history.",
      "Fetched cyber security news using Hacker News API and Cheerio for content scraping.",
      "Visualize threat data using Recharts(pie, line, bar charts) and optional calendar heatmap.",
    ],
    image: project1,
    link: "https://github.com/abhishek-kumar-05/Next-js-Threat-Intelligence-Program",
  },
  {
    title: "Developer Portfolio",
    description: [
      "Built with React + Vite for fast performance and smooth developer experience",
      "Styled using Tailwind CSS with custom animations (GSAP/ScrollTrigger) for modern interactions",
      "Fully responsive design optimized for desktop, tablet, and mobile devices",
      "Deployed as a progressive, SEO-friendly portfolio with clean code structure",
    ],
    image: project2,
    link: "https://defendevil.com/",
  },
  {
    title: "Image Resizer",
    description: [
      "Created a platform that allows you to alter the format type of images and even reduce their size with aid of Reactjs.",
      "Created a drop-and-drag UI with react-dropzone.",
      "Enabled image resizing using Pica for faster uploads and lower bandwidth usage.",
      "Built responsive, user-friendly layout using core React concepts",
    ],
    image: project3,
    link: "https://github.com/abhishek-kumar-05/React-Image-Processing",
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
          <AnimatedText triggerOnScroll>
            <h2 className="text-2xl md:text-4xl font-semibold text-[#0F0F0F] text-center">
              Browser-Ready Builds
            </h2>
            <p className="mt-4 md:mt-6 text-[15px] sm:text-[17px] tracking-normal leading-relaxed text-gray-700 text-center">
              Scroll through what happens when creativity meets code and design
              meets detail.
            </p>
          </AnimatedText>

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
                  className="border-2 border-gray-300 p-2 rounded-xl flex justify-center hover:cursor-pointer"
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
                  className="mt-4 text-[15px] sm:text-[17px] tracking-normal leading-relaxed text-center hover:cursor-pointer "
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
