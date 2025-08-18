import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ children, triggerOnScroll = false, active = true }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    if (triggerOnScroll) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 }, // start values
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [triggerOnScroll, active]);

  return <div ref={textRef}>{children}</div>;
};

export default AnimatedText;
