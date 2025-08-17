const Button = ({ text, link }) => {
  return (
    <div className="flex items-center">
      <a
        href={link}
        target="blank"
        className="px-4 py-1  text-[15px] sm:text-[17px] rounded-full bg-gradient-to-b from-[#0EA5E9] to-[#8B5CF6] text-white border border-[#22D3EE]"
      >
        {text}
      </a>
    </div>
  );
};

export default Button;
