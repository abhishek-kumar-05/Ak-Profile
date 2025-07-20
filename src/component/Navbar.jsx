import Logo from "../assets/Ak_logo.svg";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaPhone,
} from "react-icons/fa";

const Navbar = () => {
  const [menuAppear, setMenuAppear] = useState(false);
  const links = [
    { label: "Home", href: "#" },
    { label: "Project", href: "#" },
    { label: "About Me", href: "#" },
    { label: "Contact", href: "#" },
  ];
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuAppear(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="hidden w-full fixed top-0 left-0 px-8 py-4 text-white z-50 bg-transparent md:flex items-center justify-between">
        <div>
          <a href="#" onClick={() => setActiveLink("Home")}>
            <img src={Logo} alt="ak logo " className="w-auto h-9" />
          </a>
        </div>
        <div className="flex items-center gap-6 text-base font-medium border-x px-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`relative pb-1 transition-colors duration-500 ease-in-out ${
                activeLink === link.label ? "text-white" : "text-gray-400"
              }`}
            >
              {link.label}{" "}
              {activeLink === link.label && (
                <span className="absolute left-1/4 bottom-0 w-3/4 h-[2px] bg-white rounded-full transition-all duration-500 ease-in-out"></span>
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-7 text-xl">
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

      {/* Mobile apearence */}
      {!menuAppear && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
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
            className="absolute top-0 left-0 h-full w-64 bg-[#1F1F1F] border-2 border-[#2E2E2E] rounded-r-[10px] text-white z-40 transform  transition-transform duration-300 ease-in-out flex flex-col justify-between p-6"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <a
                href="#"
                onClick={() => {
                  setActiveLink("Home");
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
                  onClick={() => {
                    setActiveLink(link.label);
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

            <div className="flex gap-6 text-xl mt-auto pt-6">
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
