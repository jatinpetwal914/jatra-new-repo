import { Drum, Landmark, Leaf, Palette, Users2 } from "lucide-react";

const days = [
  {
    day: 1,
    color: "festival-blue",
    icon: Landmark,
    title: "Opening Day",
    desc: "Welcome rituals, aipan and first live sets.",
  },
  {
    day: 2,
    color: "festival-yellow",
    icon: Palette,
    title: "Creative Day",
    desc: "Food, fashion, painting and reel challenges.",
  },
  {
    day: 3,
    color: "festival-green",
    icon: Leaf,
    title: "Earth & Stage",
    desc: "Eco talks, local makers and the open stage.",
  },
  {
    day: 4,
    color: "festival-red",
    icon: Users2,
    title: "Folk Voices",
    desc: "Jhoda, chanchari and stories from the hills.",
  },
  {
    day: 5,
    color: "festival-blue",
    icon: Drum,
    title: "Finale Day",
    desc: "Dhol samvad, awards and the closing concert.",
  },
];

const Events = () => {
  return (
    <section id="events" className="relative bg-[#f4ede3] py-24 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center fade-in-up">
          <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-accent">
            Five Days of Celebration
          </div>
          <h2 className="text-4xl md:text-5xl">EVENTS SCHEDULE</h2>
        </div>

        <div className="no-scrollbar mt-14 flex snap-x gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {days.map((day, index) => {
            const Icon = day.icon;

            return (
              <article
                key={day.day}
                className="group min-w-[16rem] snap-start rounded-[1.75rem] border border-stone-200/80 bg-white/95 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.28)] transition-smooth hover:-translate-y-2 md:min-w-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: `hsl(var(--${day.color}))` }}
                >
                  Day {day.day}
                </div>
                <Icon
                  className="mt-6 h-10 w-10 transition-smooth group-hover:scale-110"
                  style={{ color: `hsl(var(--${day.color}))` }}
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 text-xl leading-tight text-foreground">{day.title}</h3>
                <p className="mt-3 truncate text-sm leading-6 text-muted-foreground">{day.desc}</p>
                <div
                  className="mt-6 h-1.5 w-full rounded-full"
                  style={{ backgroundColor: `hsl(var(--${day.color}))` }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
