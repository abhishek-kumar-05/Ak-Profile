import Logo from "../assets/Ak_logo.svg";
import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaPhone,
} from "react-icons/fa";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = ({ isLandscapeMobile, loading }) => {
  const [menuAppear, setMenuAppear] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const ticking = useRef(false);
  const linksRef = useRef([]);
  const underlineRef = useRef(null);
  const navRef = useRef(null);

  const links = useMemo(
    () => [
      { label: "Home", href: "#hero" },
      { label: "Project", href: "#projects" },
      { label: "About Me", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuAppear(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const hero = document.getElementById("hero");
          if (!hero) return;

          const heroBottom = hero.offsetHeight; // actual hero height
          const isPast = window.scrollY >= heroBottom - 80;
          setScrolledPastHero((prev) => {
            if (prev !== isPast) {
              return isPast;
            }
            return prev;
          });
          ticking.current = false;
        });
        ticking.current = true;
      }
      // change after hero is scrolled past
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // making scroll stop in background when the {menuAppear} is true
  useEffect(() => {
    menuAppear
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAppear]);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));

    const computeActive = () => {
      const y = window.scrollY;

      const viewportCenter = y + window.innerHeight / 2;

      // At the very top → Home
      if (y < 10) {
        setActiveLink("Home");
        return;
      }

      let current = "Home";
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;

        const top = el.getBoundingClientRect().top + window.scrollY;

        // If the section top is above the middle of the screen, mark it active
        if (viewportCenter >= top) {
          current = links[i].label;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    computeActive(); // initial
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [links]);

  // Underline animation stays the same
  useEffect(() => {
    const updateUnderline = () => {
      const activeIndex = links.findIndex((l) => l.label === activeLink);
      const activeEl = linksRef.current[activeIndex];
      if (activeEl && underlineRef.current) {
        const { offsetLeft, offsetWidth } = activeEl;
        gsap.to(underlineRef.current, {
          x: offsetLeft,
          width: offsetWidth,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeLink, links]);

  // Optional: smooth-scroll with nav offset so spy + underline never desync
  const handleNavClick = (e, link) => {
    e.preventDefault();
    const targetId = link.href.slice(1);

    if (targetId === "hero" || link.label === "Home") {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setActiveLink(link.label),
      });
    } else {
      const section = document.getElementById(targetId);
      if (section) {
        gsap.to(window, {
          scrollTo: { y: section, offsetY: 70 },
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => setActiveLink(link.label),
        });
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full fixed top-0 left-0 px-16 py-4 z-50 transition-opacity duration-1000 ease-in-out ${
          loading ? "opacity-0" : "opacity-100"
        }  ${
          isLandscapeMobile
            ? "hidden"
            : "hidden md:flex items-center justify-between"
        } ${
          scrolledPastHero
            ? "bg-[#F6F5F0] text-black shadow-lg border-black"
            : "bg-transparent text-white border-white"
        }`}
      >
        <div>
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, { href: "#hero", label: "Home" })}
          >
            <img
              id="navbar-logo"
              src={Logo}
              alt="ak logo "
              className={`w-auto h-9 transition-all duration-300 ${
                scrolledPastHero ? "invert" : ""
              }`}
            />
          </a>
        </div>
        <div className="relative flex items-center md:gap-4 lg:gap-8 text-base font-medium border-x border-current px-4">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative pb-1 transition-colors duration-500 ease-in-out ${
                activeLink === link.label ? "text-current" : "text-current"
              }`}
            >
              {link.label}
            </a>
          ))}
          <span
            ref={underlineRef}
            className="absolute bottom-0  h-[2px] bg-current rounded-full "
            style={{ left: 0, width: 0 }}
          ></span>
        </div>
        <div className="flex items-center gap-7 text-2xl px-3">
          <a href="mailto:13.tech.ak@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/abhishek-kumar-05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/abhishek-kumar-tech-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </nav>

      {/* Mobile apearence */}
      {!menuAppear && (
        <div
          className={`fixed top-4 right-4 z-50 ${
            isLandscapeMobile ? "block" : "md:hidden"
          }`}
        >
          <button
            id="navbar-logo"
            onClick={() => {
              setMenuAppear(true);
            }}
            className="p-2 bg-[#1F1F1F] border-2 border-[#2E2E2E] rounded-full text-white focus:outline-none"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      )}

      {/* slider menu appearence */}
      {menuAppear && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setMenuAppear(false);
          }}
        >
          <div
            className="absolute top-0 right-0 h-full w-64 bg-[#1F1F1F] border-2 border-[#2E2E2E] rounded-l-[10px] text-white z-40 transform  transition-transform duration-300 ease-in-out flex flex-col justify-between p-6"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <a
                href="#hero"
                onClick={(e) => {
                  handleNavClick(e, { href: "#hero", label: "Home" });
                  setMenuAppear(false);
                }}
              >
                <img src={Logo} alt="ak logo" className="w-auto h-10" />
              </a>
            </div>

            <div className="flex flex-col gap-6 mt-10 text-lg font-medium">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setMenuAppear(false);
                  }}
                  className={`flex items-center gap-3 text-left transition-colors duration-300 ${
                    activeLink === link.label
                      ? "text-white font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {link.label === "Home" && <FaHome />}
                  {link.label === "Project" && <FaProjectDiagram />}
                  {link.label === "About Me" && <FaUser />}
                  {link.label === "Contact" && <FaPhone />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="flex gap-6 text-2xl mt-auto pt-6">
              <a href="mailto:13.tech.ak@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a
                href="https://github.com/abhishek-kumar-05"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-kumar-tech-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
