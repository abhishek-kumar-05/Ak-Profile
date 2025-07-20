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
          <img src={Logo} alt="ak logo " className="w-auto h-9" />
        </div>
        <div className="flex items-center gap-6 text-base font-medium border-x px-4">
          <div>Home</div>
          <div>Project</div>
          <div>About Me</div>
          <div>Contact</div>
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
              <img src={Logo} alt="ak logo" className="w-auto h-10" />
            </div>

            <div className="flex flex-col gap-6 mt-10 text-lg font-medium">
              <div className="flex items-center gap-3">
                <FaHome />
                <span>Home</span>
              </div>
              <div className="flex items-center gap-3">
                <FaProjectDiagram />
                <span>Project</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUser />
                <span>About Me</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone />
                <span>Contact</span>
              </div>
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
