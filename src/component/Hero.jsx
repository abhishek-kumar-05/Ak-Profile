import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ProfileImage from "../assets/Hero_Image.svg";
import WavingHand from "../assets/Waving-hand.svg";
import Button from "./Button";

const Hero = ({ isLandscapeMobile }) => {
  console.log("hero checkinh :--", isLandscapeMobile);
  const heroRef = useRef();

  useLayoutEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

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
            <h2 className="text-xl sm:text-2xl">
              I'm <strong>Abhishek Kumar</strong>
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Frontend Developer
            </h1>
            <p className="text-gray-400 max-w-md !mt-2  md:mx-0 text-sm sm:text-base">
              I build modern, responsive web interfaces using tools like React,
              Next.js, and Tailwind CSS. I care about clean design, clear code,
              and creating smooth user experiences that work on every screen.
            </p>
            <div className="flex flex-wrap  md:justify-start gap-4 !mt-4">
              <Button text="About Me" link="#" />
              <a
                href="#"
                className="px-4 py-1 rounded-full  text-white border border-[#22D3EE]"
              >
                Explore Projects
              </a>
            </div>
          </div>

          <div
            className={`flex justify-center lg:justify-end  ${
              isLandscapeMobile ? "hidden" : "sm:hidden md:block"
            } `}
          >
            <img
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
