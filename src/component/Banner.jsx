"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const keywords = [
  "Responsive",
  "Interactive",
  "Intuitive",
  "Cross-Browser",
  "Dynamic",
  "Reusable",
  "Consistent UI",
  "Future-Ready",
];

const Banner = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // half because duplicated

    gsap.to(track, {
      x: -totalWidth,
      duration: 30, // slower = smoother
      repeat: -1,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % -totalWidth}px`, // seamless loop
      },
    });
  }, []);

  return (
    <div className="relative z-10 w-full bg-[#F6F5F0] py-8 lg:py-14 overflow-hidden">
      <div
        className="bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] border border-[#22D3EE] overflow-hidden py-1"
        style={{ transform: "rotate(-4deg)" }}
      >
        <div
          ref={trackRef}
          className="whitespace-nowrap will-change-transform"
          style={{ display: "inline-block" }}
        >
          {/* Duplicate row for seamless loop */}
          {[...keywords, ...keywords].map((word, i) => (
            <span
              key={i}
              className="text-white text-[15px] sm:text-[17px] font-bold uppercase px-6 inline-block"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
