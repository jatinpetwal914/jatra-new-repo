import { useEffect, useRef } from "react";
import { Landmark, Leaf, Mountain, Users2 } from "lucide-react";

import backgroundImg from "@/assets/KASAR-BG-WEB.png";
import cultureImg from "@/assets/culture.png";
import adventureImg from "@/assets/Adventure.png";
import sustainabilityImg from "@/assets/Susttainiblity.png";
import communityImg from "@/assets/Community.png";

const pillars = [
  {
    icon: Landmark,
    color: "festival-blue",
    title: "Culture",
    desc: "Living folk traditions, craft and music from the hills.",
    img: cultureImg,
  },
  {
    icon: Mountain,
    color: "festival-yellow",
    title: "Adventure",
    desc: "Outdoor energy woven into a five-day mountain gathering.",
    img: adventureImg,
  },
  {
    icon: Leaf,
    color: "festival-green",
    title: "Sustainability",
    desc: "Thoughtful local choices and low-impact festival design.",
    img: sustainabilityImg,
  },
  {
    icon: Users2,
    color: "festival-red",
    title: "Community",
    desc: "Built with artists, locals, travellers and young volunteers.",
    img: communityImg,
  },
];

const features = [
  { title: "Cultural Revival Initiative", desc: "Reconnects people with Uttarakhand’s roots.", color: "blue" },
  { title: "Vocal for Local", desc: "Supports artisans and local businesses.", color: "yellow" },
  { title: "Folk Arts & Traditions", desc: "Showcases music, dance, storytelling.", color: "green" },
  { title: "Adventure Sports", desc: "Paragliding, trekking, cycling.", color: "blue" },
  { title: "Discussions & Sessions", desc: "Talks by experts and locals.", color: "blue" },
  { title: "Competitions", desc: "Folk, art, sports contests.", color: "blue" },
  { title: "Sustainability", desc: "Eco-friendly practices.", color: "green" },
  { title: "Community Building", desc: "Connecting locals and tourists.", color: "blue" },
  { title: "Tourism Promotion", desc: "Boosting Uttarakhand economy.", color: "blue" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag variables
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    let isPaused = false;

    const speed = 0.5;

    const scroll = () => {
      if (!container || isPaused) return;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    const pause = () => {
      isPaused = true;
      cancelAnimationFrame(animationFrame);
    };

    const resume = () => {
      isPaused = false;
      animationFrame = requestAnimationFrame(scroll);
    };

    container.addEventListener("mousedown", pause);
    container.addEventListener("touchstart", pause);

    container.addEventListener("mouseup", resume);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener("mousedown", pause);
      container.removeEventListener("touchstart", pause);
      container.removeEventListener("mouseup", resume);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("touchend", resume);
    };
  }, []);

  // Mouse Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!isDown || !container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  return (
    <section
      id="about"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#faf6ef]/90"></div>

      <div className="container relative z-10">

        {/* TEXT */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase font-bold tracking-[0.3em] text-red-600">
            About Jatra
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Jatra – Back to the Roots of Uttarakhand
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Jatra reconnects people with Uttarakhand’s roots through culture and adventure.
          </p>
        </div>

        {/* SLIDER */}
        <div className="mt-16">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-red-600 mb-8">
            Key Highlights of Jatra
          </p>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {[...features, ...features].map((item, i) => (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-2xl border bg-white/90 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div
                  className="h-1 w-12 mb-4 rounded-full"
                  style={{ background: `hsl(var(--${item.color}))` }}
                />

                <h3
                  className="text-lg font-semibold"
                  style={{ color: `hsl(var(--${item.color}))` }}
                >
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PILLARS */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, color, title, desc, img }) => (
            <div key={title} className="relative rounded-2xl overflow-hidden">
              <img src={img} className="h-80 w-full object-cover" />

              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <Icon size={20} style={{ color: `hsl(var(--${color}))` }} />
                <h3 className="text-xl text-white">{title}</h3>
                <p className="text-sm text-white/80">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;