import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);

  useLayoutEffect(() => {
    const paths = loaderRef.current.querySelectorAll("path");

    // Prepare each path for drawing
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "none",
        stroke: "#ffffff",
        strokeWidth: 2,
      });
    });

    // Animate drawing with scale-up
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        gsap.to(paths, {
          fill: (i, el) => el.getAttribute("data-fill"),
          strokeWidth: 0,
          duration: 1,
          onComplete,
        });
      },
    });

    tl.fromTo(
      loaderRef.current,
      { scale: 1 },
      { scale: 1.2, duration: 0.5, ease: "power1.out" } // slight zoom in
    )
      .to(paths, {
        strokeDashoffset: 0,
        duration: 3, // longer draw duration
        stagger: 0.4,
      })
      .to(loaderRef.current, { scale: 1, duration: 0.5, ease: "power1.in" }); // return to normal size
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0F0F0F, #2C2C2C)",
      }}
    >
      <svg
        ref={loaderRef}
        width="300" // slightly larger
        height="540"
        viewBox="0 0 269 488"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-36" // bigger than before
      >
        <path
          d="M61.3926 330.997L98.9255 406.535L0.195312 347.752C0.195312 347.752 120.25 34.9844 134.066 0.423828L268.993 347.752L134.066 487.456L136.712 330.997H61.3926Z"
          data-fill="white"
        />
        <path
          d="M135.773 269.825L202.62 175.836L155.545 269.825L202.62 330.641V416.588L183.79 330.641L135.773 269.825Z"
          data-fill="black"
        />
        <path
          d="M134.351 1.29688L136.716 129.575V158.137V216.764L136.712 331.011H126.359L134.351 1.29688Z"
          data-fill="black"
        />
      </svg>
    </div>
  );
};

export default Loader;
