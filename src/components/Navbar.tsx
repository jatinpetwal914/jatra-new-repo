import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#guests", label: "Guests" },
  { href: "#register", label: "Register" },
];

const Navbar = () => {
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setPastHero(window.scrollY > Math.max(window.innerHeight - 220, 420));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-11 left-0 right-0 z-40 hidden md:block transition-smooth ${
        scrolled
          ? pastHero
            ? "bg-background/88 border-b border-border/70 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl"
            : "border-b border-white/10 bg-slate-950/20 backdrop-blur-md"
          : ""
      }`}
    >
      <div className="container flex items-center justify-end gap-10 py-5">
        <div className="flex items-center gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`relative text-sm font-semibold tracking-[0.25em] uppercase transition-smooth ${
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
        <div className="h-10 w-20 shrink-0" aria-hidden />
      </div>
    </nav>
  );
};

export default Navbar;
