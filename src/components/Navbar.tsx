import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import partnerLogo from "@/assets/devasthaliXkartavyakarma.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#guests", label: "Guests" },
  { href: "#register", label: "Register" },
  { href: "#sponsors", label: "Sponsors" },
];

const Navbar = () => {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > Math.max(window.innerHeight - 100, 300));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          scrolled
            ? pastHero
              ? "top-0 bg-background/95 border-b border-border/70 shadow-md backdrop-blur-xl"
              : "top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg"
            : "top-0 md:top-14 bg-black/40 backdrop-blur-sm md:bg-black/10"
        }`}
      >
        {/* FIXED HEIGHT CONTAINER: Prevents "bulging" by locking the mobile height to h-16 or h-20 */}
        <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
        }`}>
          
          <div className="flex items-center">
            <img 
              src={partnerLogo} 
              alt="Partner Logos" 
              /* Max-height is key here to keep the logo from expanding the navbar */
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-10 md:h-12" : "h-12 md:h-16"
              } max-w-[200px] md:max-w-none`}
            />
          </div> 

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`relative text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${
                  pastHero ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span 
                    layoutId="underline" 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#FFB800]" 
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Larger and clearer */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              pastHero ? "text-foreground" : "text-white"
            }`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[110] bg-background/98 backdrop-blur-3xl transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <button 
            className="absolute top-6 right-6 p-2 text-foreground" 
            onClick={toggleMenu}
          >
            <X size={32} />
          </button>
          
          <img 
            src={partnerLogo} 
            alt="Logo" 
            className="h-16 w-auto object-contain mb-4"
          />

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActive(link.href);
                setIsOpen(false);
              }}
              className="text-xl font-black tracking-[0.2em] uppercase text-foreground/80 hover:text-[#FFB800] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;