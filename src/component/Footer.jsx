import Logo from "../assets/Ak_logo.svg";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#F6F5F0] py-4 w-full flex justify-center items-center">
      <img src={Logo} alt="Logo image" className="w-auto h-10 invert" />
    </footer>
  );
};

export default Footer;
