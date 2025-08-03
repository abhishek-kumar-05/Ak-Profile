import React, { useLayoutEffect, useRef } from "react";
import Matter from "matter-js";
import gsap from "gsap";

// Icons
import html from "../assets/icons/html-icon.png";
import css from "../assets/icons/css-icon.png";
import js from "../assets/icons/javascript-icon.png";
import tailwind from "../assets/icons/tailwind-css-icon.png";
import react from "../assets/icons/react-js-icon.png";
import next from "../assets/icons/nextjs-icon.png";
import github from "../assets/icons/github-icon.png";
import firebase from "../assets/icons/google-firebase-icon.png";

const techIcons = [html, css, js, tailwind, react, next, github, firebase];
const ICON_RADIUS = 28;

const TechStack = () => {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const wallsRef = useRef([]);
  const rafRef = useRef();

  const initializePhysics = () => {
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    if (!engineRef.current) {
      engineRef.current = Matter.Engine.create();
    }

    const engine = engineRef.current;
    const world = engine.world;
    Matter.World.clear(world, false);
    engine.gravity.y = 0;

    // Walls
    const walls = [
      Matter.Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true }), // top
      Matter.Bodies.rectangle(width / 2, height, width, 10, { isStatic: true }), // bottom
      Matter.Bodies.rectangle(0, height / 2, 10, height, { isStatic: true }), // left
      Matter.Bodies.rectangle(width, height / 2, 10, height, {
        isStatic: true,
      }), // right
    ];
    Matter.World.add(world, walls);
    wallsRef.current = walls;

    // Icons
    const icons = techIcons.map((_, i) =>
      Matter.Bodies.circle(
        ICON_RADIUS + Math.random() * (width - ICON_RADIUS * 2),
        ICON_RADIUS + Math.random() * (height - ICON_RADIUS * 2),
        ICON_RADIUS,
        {
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          inertia: Infinity,
          label: `icon-${i}`,
        }
      )
    );
    icons.forEach((body) => {
      Matter.Body.setVelocity(body, {
        x: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2),
        y: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2),
      });
    });

    Matter.World.add(world, icons);
    bodiesRef.current = icons;

    const update = () => {
      Matter.Engine.update(engine, 1000 / 60);
      bodiesRef.current.forEach((body, i) => {
        const { x, y } = body.position;
        if (iconRefs.current[i]) {
          gsap.set(iconRefs.current[i], {
            x: x - ICON_RADIUS,
            y: y - ICON_RADIUS,
          });
        }
      });
      rafRef.current = requestAnimationFrame(update);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(update);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    initializePhysics();

    const observer = new ResizeObserver(() => {
      initializePhysics();
    });

    observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      Matter.World.clear(engineRef.current?.world || {});
      Matter.Engine.clear(engineRef.current);
    };
  }, []);

  return (
    <section
      id="tech"
      className="relative z-10 w-full px-6 sm:px-8 md:px-16 py-8 lg:py-14 bg-[#F6F5F0] flex flex-col items-center justify-center"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#0F0F0F]">
          What I Work With
        </h2>
        <p className="mt-2 md:mt-4 text-gray-700 text-[15px] sm:text-[17px] md:max-w-auto mx-auto px-2">
          I use tools that simplify development and focus on creating fast,
          intuitive, and consistent user experiences.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[400px] sm:h-[380px] md:h-[420px] rounded-3xl 
  bg-white/70 backdrop-blur-lg shadow-[inset_0_4px_40px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] blur-2xl opacity-40 scale-110" />
        </div>

        {/* Icons */}
        {techIcons.map((icon, i) => (
          <img
            key={i}
            src={icon}
            ref={(el) => (iconRefs.current[i] = el)}
            alt={`tech-icon-${i}`}
            className="w-14 h-14 sm:w-16 sm:h-16  lg:w-[85px] lg:h-[85px] rounded-full absolute top-0 left-0 object-contain border-[2.5px] border-white shadow-md bg-white z-10"
          />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
