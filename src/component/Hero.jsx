import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

const Hero = () => {
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
    <div
      className="h-[100vh] w-full  px-4"
      style={{
        background: "linear-gradient(180deg, #0F0F0F, #2C2C2C)",
      }}
    >
      <Navbar/>
      
    </div>
  );
};

export default Hero;
