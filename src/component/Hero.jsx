import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ProfileImage from "../assets/Hero_Image.svg";
import WavingHand from "../assets/Waving-hand.svg";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollToPlugin);

const Hero = ({ isLandscapeMobile, loading }) => {
  const heroRef = useRef();
  const imageRef = useRef();

  useLayoutEffect(() => {
    if (!loading) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  const handleScrollLink = (e) => {
    e.preventDefault();

    const target = document.getElementById("projects");
    if (target) {
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 70,
        },
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="fixed top-0 left-0 w-full min-h-screen  2xl:min-h-0 2xl:py-28  z-0 flex items-center justify-center text-white px-6 sm:px-8 md:px-16 py-4 "
        style={{
          background: "linear-gradient(180deg, #0F0F0F, #2C2C2C)",
        }}
      >
        <div
          className={`max-w-7xl w-full grid ${
            isLandscapeMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }  gap-12 items-center`}
        >
          <div className="space-y-1 md:space-y-3 text-left">
            <AnimatedText active={!loading}>
              <p className="text-lg flex items-end gap-2">
                Hello, World!
                <span className="flex items-start">
                  <img
                    src={WavingHand}
                    alt="waving hand image"
                    className="w-auto h-9 animate-wave"
                  />
                </span>
              </p>
            </AnimatedText>
            <AnimatedText active={!loading}>
              <h2 className="text-xl sm:text-2xl">
                I'm <strong>Abhishek Kumar</strong>
              </h2>
            </AnimatedText>
            <AnimatedText active={!loading}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Frontend Developer
              </h1>
            </AnimatedText>
            <AnimatedText active={!loading}>
              <p className="text-gray-400 max-w-md !mt-2 lg:!mt-4 md:mx-0 text-[15px] sm:text-[17px] leading-relaxed">
                I build modern, responsive web interfaces using tools like
                React, Next.js, and Tailwind CSS. I care about clean design,
                clear code, and creating smooth user experiences that work on
                every screen.
              </p>
            </AnimatedText>
            <AnimatedText active={!loading}>
              <div className="flex flex-wrap  md:justify-start gap-4 !mt-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/11tH0yek6t_rAiJvZv3-A6S6DX8JGXU8M/view?usp=sharing",
                      "_blank"
                    )
                  }
                  className="px-4 py-1  text-[15px] sm:text-[17px] rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] text-white border border-[#22D3EE]"
                >
                  Resume
                </button>
                <a
                  href="#projects"
                  onClick={handleScrollLink}
                  className="text-[15px] sm:text-[17px] px-4 py-1 rounded-full  text-white border border-[#22D3EE]"
                >
                  Explore Projects
                </a>
              </div>
            </AnimatedText>
          </div>

          <div
            className={`flex justify-center md:justify-end  ${
              isLandscapeMobile ? "hidden" : ""
            } `}
          >
            <img
              ref={imageRef}
              src={ProfileImage}
              alt="hero scetion profile image."
              className="w-60 md:w-full h-auto max-w-sm "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
