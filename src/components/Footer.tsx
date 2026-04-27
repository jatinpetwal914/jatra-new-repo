import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import FestivalLogo from "./FestivalLogo";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#register", label: "Register" },
];

const socials = [
  { href: "https://www.instagram.com/jatra.thekasarfestival?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/", label: "YouTube", Icon: Youtube },
  { href: "https://www.facebook.com/Jatrathekasarfestival", label: "Facebook", Icon: Facebook },
];

const Footer = () => (
  <footer id="footer" className="border-t border-white/8 bg-[#0b1724] text-white">
    <div className="container py-14 sm:py-16">
      <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <FestivalLogo className="h-16 md:h-20" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
            A youth-led celebration of culture, adventure and mountain stories in Kasar Devi.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-smooth hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Quick Links</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-smooth hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-white/75">
            <a href="tel:+911234567890" className="flex items-start gap-3 transition-smooth hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>+91 74650 86956</span>
            </a>
            <a
              href="contact@jatrafest.in"
              className="flex items-start gap-3 transition-smooth hover:text-white"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>team@jatrafestival.in</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Kasar Devi, Almora, Uttarakhand</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 JATRA. All rights reserved.</p>
        <p>Designed for a cleaner, calmer festival experience.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
