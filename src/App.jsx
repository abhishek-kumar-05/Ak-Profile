import { useState, useEffect } from "react";
import Hero from "./component/Hero";
import Navbar from "./component/Navbar";
import Project from "./component/Project";
import Loader from "./component/Loader";
import About from "./component/About";
import Contact from "./component/contact";

export default function App() {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);
  return (
    <div className="relative">
      {/* Always mounted */}
      <Navbar isLandscapeMobile={isLandscapeMobile} loading={loading}/>
      <Hero isLandscapeMobile={isLandscapeMobile} />

      {!loading && (
        <>
          <Project />
          <About/>
          <Contact/>
        </>
      )}
      {/* Loader overlay */}
      {loading && <Loader onComplete={() => setLoading(false)} />}
    </div>
  );
}
