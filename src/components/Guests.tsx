import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import kamla from "@/assets/guests/kamla-devi.jpg";
import digvijay from "@/assets/guests/digvijay-parihar.jpg";
import shiromani from "@/assets/guests/shiromani-pant.jpg";
import basanti from "@/assets/guests/basanti-bisht.jpg";
import lalit from "@/assets/guests/lalit-mohan-joshi.jpg";

const guests = [
  {
    img: kamla,
    name: "Kamla Devi",
    role: "Folk Singer",
    bio: "Carries Kumaoni folk traditions with a rooted stage voice.",
  },
  {
    img: digvijay,
    name: "Digvijay Parihar",
    role: "Playback Singer",
    bio: "Brings a contemporary live sound to the mountain stage.",
  },
  {
    img: shiromani,
    name: "Shiromani Pant",
    role: "Folk Narrator",
    bio: "Known for storytelling that keeps Himalayan memory alive.",
  },
  {
    img: lalit,
    name: "Lalit Mohan Joshi",
    role: "Folk Singer",
    bio: "A familiar voice of Kumaoni music and regional tradition.",
  },
  {
    img: basanti,
    name: "Dr. Basanti Bisht",
    role: "Jagar Singer",
    bio: "Preserves a powerful sacred vocal tradition from Uttarakhand.",
  },
];

const Guests = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    slider.scrollBy({
      left: direction * Math.min(slider.clientWidth * 0.82, 340),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="guests"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0d1825_0%,#122032_50%,#17273b_100%)] py-16 text-white sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,184,76,0.18),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.04))]" />

      <div className="container relative px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl fade-in-up">
            <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-accent">
              Featured Guests
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">VOICES OF UTTARAKHAND</h2>
            <p className="mt-4 text-base leading-7 text-white/72 sm:max-w-lg">
              Artists, narrators and keepers of culture who bring the spirit of the region to the
              festival stage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-smooth hover:bg-white/15"
              aria-label="Scroll guests left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-smooth hover:bg-white/15"
              aria-label="Scroll guests right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-4 scroll-smooth sm:gap-5"
        >
          {guests.map((guest, index) => (
            <article
  key={guest.name}
  className="group relative min-w-[240px] max-w-[260px] snap-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 backdrop-blur-xl transition-smooth"
  style={{ animationDelay: `${index * 60}ms` }}
>
  {/* Blurred Content */}
  <div className="pointer-events-none blur-md select-none">
    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
      <img
        src={guest.img}
        alt={`${guest.name} - ${guest.role}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
    </div>
    <div className="p-5">
      <h3 className="text-xl leading-tight text-white">{guest.name}</h3>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {guest.role}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/72">{guest.bio}</p>
    </div>
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <span className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-white">
      Announcing Soon
    </span>
  </div>
</article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guests;
