import { useState, useEffect } from "react";

const Project = () => {
  const [heroHeight, setHeroHeight] = useState(0);

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
  return (
    <>
      <section
        id="projects"
        style={{ marginTop: `${heroHeight}px` }}
        className="relative z-10 min-h-screen rounded-t-[35px] bg-[#F6F5F0] text-black flex items-center justify-center"
      >
        <h2 className="text-4xl font-semibold">Second Section</h2>
      </section>
    </>
  );
};

export default Project;
