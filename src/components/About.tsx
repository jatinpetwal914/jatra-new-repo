import { Landmark, Leaf, Mountain, Users2 } from "lucide-react";

const pillars = [
  {
    icon: Landmark,
    color: "festival-blue",
    title: "Culture",
    desc: "Living folk traditions, craft and music from the hills.",
  },
  {
    icon: Mountain,
    color: "festival-yellow",
    title: "Adventure",
    desc: "Outdoor energy woven into a five-day mountain gathering.",
  },
  {
    icon: Leaf,
    color: "festival-green",
    title: "Sustainability",
    desc: "Thoughtful local choices and low-impact festival design.",
  },
  {
    icon: Users2,
    color: "festival-red",
    title: "Community",
    desc: "Built with artists, locals, travellers and young volunteers.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#faf6ef_0%,#fffaf2_45%,#f7f1e6_100%)] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,183,77,0.18),transparent_68%)]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center fade-in-up">
          <div className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-accent">
            About the Festival
          </div>
          <h2 className="text-4xl leading-tight text-foreground md:text-5xl">
            Uttarakhand&apos;s First Youth-Led Culture &amp; Adventure Festival
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            JATRA brings together music, mountain stories, heritage craft and outdoor spirit in one
            thoughtful five-day gathering shaped by Uttarakhand&apos;s youth.
          </p>
        </div>

        <div className="mt-16 grid divide-y divide-border/60 border-y border-border/60 md:grid-cols-4 md:divide-x md:divide-y-0">
          {pillars.map(({ icon: Icon, color, title, desc }, index) => (
            <div
              key={title}
              className="flex flex-col items-center px-6 py-8 text-center"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: `hsl(var(--${color}) / 0.1)` }}
              >
                <Icon size={24} style={{ color: `hsl(var(--${color}))` }} strokeWidth={1.9} />
              </div>
              <h3 className="text-lg text-foreground">{title}</h3>
              <p className="mt-2 max-w-[15rem] text-sm leading-6 text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
