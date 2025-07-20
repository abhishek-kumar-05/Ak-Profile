import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const LogoIntro = ({ onComplete }) => {
  const logoRef = useRef();

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete,
    });

    tl.set(logoRef.current, {
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 3,
      zIndex: 50,
    });

    tl.to(logoRef.current, {
      top: "2rem",
      left: "2rem",
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      duration: 1.2,
    });
  }, [onComplete]);
  return (
    <div ref={logoRef}>
      <img src="./SVG/Ak_logo.svg" alt="ak profile logo" />
    </div>
  );
};

export default LogoIntro;
