import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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

// Design themes matching the "Choose Your Experience" section
const cardThemes = [
  { border: "border-[#8b5cf6]", shadow: "shadow-[#8b5cf6]/10", accent: "text-[#8b5cf6]" }, // Purple
  { border: "border-[#fca311]", shadow: "shadow-[#fca311]/10", accent: "text-[#fca311]" }, // Orange
  { border: "border-[#52b755]", shadow: "shadow-[#52b755]/10", accent: "text-[#52b755]" }, // Green
];

const Guests = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Toggle this to 'false' to reveal the cards!
  const isAnnouncingSoon = true; 

  const scrollCards = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * Math.min(slider.clientWidth * 0.82, 340),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="guests"
      className="relative overflow-hidden bg-[#0d1117] py-16 text-white sm:py-20 md:py-24"
    >
      <div className="container relative px-4 sm:px-6 mx-auto max-w-7xl">
        
        {/* Header Section styled like "Choose Your Experience" */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl fade-in-up">
            
            {/* Title Area with Colored Dots */}
            <div className="flex items-center justify-start gap-4 mb-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] rotate-45"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#fca311] rotate-45"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#52b755] rotate-45"></div>
                <div className="w-8 h-px bg-gray-600"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-sans">
                Voices of <span className="text-[#fca311]">Uttarakhand</span>
              </h2>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base max-w-lg">
              Artists, narrators and keepers of culture who bring the spirit of the region to the festival stage.
            </p>
          </div>

          {/* Action Area: View More Button & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* View More Button */}
            {/* ✅ FIXED BUTTON */}
            <Link
              to="/viewsingers"
              className="flex h-11 items-center justify-center rounded-full border border-gray-600 bg-[#0d1117] px-6 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-[#fca311] hover:text-[#fca311]"
            >
              View More
            </Link>
            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCards(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-600 bg-[#0d1117] text-white transition-all hover:border-[#fca311] hover:text-[#fca311]"
                aria-label="Scroll guests left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCards(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-600 bg-[#0d1117] text-white transition-all hover:border-[#fca311] hover:text-[#fca311]"
                aria-label="Scroll guests right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Slider */}
        <div
          ref={sliderRef}
          className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-8 scroll-smooth"
        >
          {guests.map((guest, index) => {
            const theme = cardThemes[index % cardThemes.length];

            return (
              <article
                key={guest.name}
                className={`group relative min-w-[250px] max-w-[250px] h-[350px] snap-start overflow-hidden rounded-xl border ${theme.border} bg-[#0d1117] transition-transform duration-300 hover:scale-[1.02] shadow-lg ${theme.shadow} flex-shrink-0`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                
                {/* Background Image Layer */}
                <div 
                  className={`absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110 ${isAnnouncingSoon ? 'blur-md grayscale' : ''}`}
                  style={{ backgroundImage: `url(${guest.img})` }}
                ></div>

                {/* Gradient Overlay (Dark at bottom, transparent at top) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/80 to-transparent z-0"></div>

                {/* Card Content */}
                <div className={`relative z-10 flex flex-col items-center justify-end h-full w-full p-6 text-center ${isAnnouncingSoon ? 'opacity-0' : 'opacity-100'}`}>
                  
                  <h3 className="text-2xl font-bold uppercase mb-3 leading-tight text-white">
                    {guest.name}
                  </h3>
                  
                  {/* Small Diamond Separator matching the theme color */}
                  <div className={`w-2 h-2 border ${theme.border} rotate-45 mb-3`}></div>
                  
                  <div className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${theme.accent}`}>
                    {guest.role}
                  </div>
                  
                  <p className="text-gray-300 text-xs leading-relaxed mb-2">
                    {guest.bio}
                  </p>
                </div>

                {/* Announcing Soon Overlay */}
                {isAnnouncingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20">
                    <span className="text-center text-sm font-bold uppercase tracking-[0.3em] text-white border border-white/20 px-3 py-1 rounded-full bg-black/50">
                      Announcing Soon
                    </span>
                  </div>
                )}
                
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Guests;