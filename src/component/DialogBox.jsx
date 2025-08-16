import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Button from "./Button";
import { HiX } from "react-icons/hi";

const DialogBox = ({ title, description, link, onClose }) => {
  const backdropRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    // const targetElement = boxRef.current;
    // if (targetElement) {
    //   disableBodyScroll(targetElement);
    // }
    document.body.style.overflow = "hidden";

    return () => {
      // if (targetElement) enableBodyScroll(targetElement);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(boxRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.4,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  return (
    <section className="fixed inset-0 z-30 flex justify-center items-center">
      <div
        onClick={handleClose}
        ref={backdropRef}
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
      ></div>

      <div
        ref={boxRef}
        className=" relative max-w-xl w-full max-h-[85vh] mx-4 sm:mx-6 p-4 sm:p-5 space-y-2 sm:space-y-3 text-[15px] sm:text-[17px] leading-relaxed shadow-lg overflow-y-auto bg-[#F6F5F0] rounded-xl"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-medium">{title}</h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            aria-label="Close dialog"
          >
            <HiX size={22} />
          </button>
        </div>

        <p>Quick Look</p>
        <ul className="list-disc list-outside pl-8 text-gray-600 space-y-1">
          {description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <Button text="Inspect" link={link} />
      </div>
    </section>
  );
};

export default DialogBox;
