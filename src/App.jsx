import { useState, useEffect } from "react";
import Hero from "./component/Hero";
import Navbar from "./component/Navbar";
import Project from "./component/Project";

export default function App() {
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);

  useEffect(() => {
    const checkLandscape = () => {
      const isMediumWidth = window.innerWidth >= 768;
      const isShortHeight = window.innerHeight <= 550;
      setIsLandscapeMobile(isMediumWidth && isShortHeight);
    };

    checkLandscape();
    window.addEventListener("resize", checkLandscape);
    return () => window.removeEventListener("resize", checkLandscape);
  }, []);
  return (
    <>
      <Navbar isLandscapeMobile={isLandscapeMobile} />
      <Hero isLandscapeMobile={isLandscapeMobile} />
      <Project />
    </>
  );
}
