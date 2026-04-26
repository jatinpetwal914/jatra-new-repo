import { useEffect, useRef } from "react";
import { Landmark, Leaf, Mountain, Users2 } from "lucide-react";
import mountainImg from "@/assets/hero-mountains.jpg";
import backgroundImg from "@/assets/KASAR-BG-WEB.png";

const pillars = [
  {
    icon: Landmark,
    color: "festival-blue",
    title: "Culture",
    desc: "Living folk traditions, craft and music from the hills.",
    img: "/src/assets/culture.png",
  },
  {
    icon: Mountain,
    color: "festival-yellow",
    title: "Adventure",
    desc: "Outdoor energy woven into a five-day mountain gathering.",
    img: "/src/assets/Adventure.png",
  },
  {
    icon: Leaf,
    color: "festival-green",
    title: "Sustainability",
    desc: "Thoughtful local choices and low-impact festival design.",
    img: "/src/assets/Susttainiblity.png",
  },
  {
    icon: Users2,
    color: "festival-red",
    title: "Community",
    desc: "Built with artists, locals, travellers and young volunteers.",
    img: "/src/assets/Community.png",
  },
];

const features = [
  { title: "Cultural Revival Initiative", desc: "Reconnects people with Uttarakhand’s roots, promoting pride in heritage, traditions, and lifestyle.", color: "blue" },
  { title: "Vocal for Local", desc: "Supports artisans, craftsmen, and local businesses with traditional and handmade products.", color: "yellow" },
  { title: "Folk Arts & Traditions", desc: "Showcases folk music, dance, and storytelling from the hills.", color: "green" },
  { title: "Adventure Sports Integration", desc: "Paragliding, trekking, cycling races, and outdoor challenges.", color: "blue" },
  { title: "Cultural Discussions & Sessions", desc: "Talks and knowledge-sharing by experts, locals, and youth.", color: "blue" },
  { title: "Competitions & Engagement", desc: "Folk performances, art, sports, and local skill contests.", color: "blue" },
  { title: "Cleanliness & Sustainability", desc: "Eco-friendly practices and environmental awareness.", color: "green" },
  { title: "Community Building", desc: "Bringing locals, tourists, and youth together.", color: "blue" },
  { title: "Tourism Promotion", desc: "Highlighting Uttarakhand’s beauty and boosting local economy.", color: "blue" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    let speed = 0.5;

    const scroll = () => {
      if (!container) return;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section id="about" className="py-24 relative" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 bg-[#faf6ef]/90"></div>
      <div className="container relative z-10">

        {/* 🔥 ABOUT TEXT */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase  font-bold tracking-[0.3em] text-accent">
            About Jatra
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl leading-tight">
            Jatra – Back to the Roots of Uttarakhand
          </h2>

          <p className="mt-6 text-lg text-muted-foreground leading-8">
            Jatra reconnects people with Uttarakhand’s roots and promotes pride in
            heritage, traditions, and lifestyle through a cultural and adventure-driven festival.
          </p>
        </div>

        {/* SLIDER */}
        <div className="mt-16">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-accent mb-8">
            Key Highlights of Jatra
          </p>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
          >
            {[...features, ...features].map((item, i) => (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-2xl border border-border/50 bg-white/90 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* COLOR BAR */}
                <div
                  className="h-1 w-12 mb-4 rounded-full"
                  style={{ background: `hsl(var(--${item.color}))` }}
                />

                {/* TITLE */}
                <h3
                  className="text-lg font-semibold break-words"
                  style={{ color: `hsl(var(--${item.color}))` }}
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm text-muted-foreground leading-6 break-words">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 PILLARS */}
        <div className="mt-20">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-accent">
            The Four Pillars of Jatra
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, color, title, desc, img }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl shadow-md"
              >
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: `hsl(var(--${color}) / 0.2)` }}
                  >
                    <Icon   size={20} style={{ color: `hsl(var(--${color}))` }}></Icon>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;