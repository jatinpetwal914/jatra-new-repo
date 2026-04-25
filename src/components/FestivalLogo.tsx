import logo from "@/assets/jatra-logo.png";

const FestivalLogo = ({ className = "" }: { className?: string }) => {
  return (
    <img
      src={logo}
      alt="JATRA Kasar Festival 2026 logo"
      className={`w-auto h-20 md:h-24 object-contain drop-shadow-2xl select-none ${className}`}
      draggable={false}
    />
  );
};

export default FestivalLogo;
