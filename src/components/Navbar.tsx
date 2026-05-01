import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
      setScrolled(window.scrollY > 30);
      setPastHero(window.scrollY > Math.max(window.innerHeight - 220, 420));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? pastHero
              ? "top-0 bg-background/95 border-b border-border/70 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl"
              : "top-0 border-b border-white/10 bg-slate-950/40 backdrop-blur-md"
            : "top-8 md:top-14 bg-black/40 backdrop-blur-sm md:bg-black/20"
        }`}
      >
        {/* UPDATED: Dynamic padding that shrinks when scrolled */}
        <div className={`container flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-2 md:py-3" : "py-3 md:py-5"
        }`}>
          <div className="flex items-center">
            {/* UPDATED: Dynamic logo height that shrinks when scrolled */}
            <img 
              src={partnerLogo} 
              alt="Devasthali x Kartavyakarma" 
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-10 md:h-12" : "h-14 md:h-20"
              }`}
            />
          </div> 
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`relative text-sm font-semibold tracking-[0.25em] uppercase transition-smooth whitespace-nowrap ${
                  pastHero ? "text-foreground/75 hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-accent" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button 
            className="absolute top-8 right-6 p-2 text-foreground" 
            onClick={toggleMenu}
          >
            <X size={32} />
          </button>
          
          <img 
            src={partnerLogo} 
            alt="Logo" 
            className="h-24 w-auto object-contain mb-8"
          />

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActive(link.href);
                setIsOpen(false);
              }}
              className="text-2xl font-bold tracking-[0.15em] uppercase text-foreground/80 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="mt-12 flex gap-6">
            <div className="h-1 w-12 bg-accent rounded-full" />
            <div className="h-1 w-12 bg-festival-blue rounded-full" />
            <div className="h-1 w-12 bg-festival-green rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;