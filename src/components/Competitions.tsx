import { ChefHat, Palette, Shirt, Camera, Video, Recycle } from "lucide-react";

const items = [
  { icon: ChefHat, color: "festival-red", title: "Culinary", elig: "Open · 16+", note: "Pahari recipes & street flavours." },
  { icon: Palette, color: "festival-yellow", title: "Painting", elig: "All ages", note: "Aipan, landscapes & free-form." },
  { icon: Shirt, color: "festival-blue", title: "Fashion Show", elig: "18+", note: "Modern meets traditional Uttarakhand." },
  { icon: Camera, color: "festival-green", title: "Photography", elig: "All levels", note: "5-day on-ground photo contest." },
  { icon: Video, color: "festival-red", title: "Reel Making", elig: "Open · 13+", note: "Capture Jatra in 60 seconds." },
  { icon: Recycle, color: "festival-green", title: "Sustainable Craft", elig: "Open", note: "Build with recycled materials." },
];

const Competitions = () => {
  return (
    <section id="competitions" className="relative py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <div className="text-accent text-xs tracking-[0.4em] uppercase font-medium mb-4">
            Compete · Create · Celebrate
          </div>
          <h2 className="text-4xl md:text-6xl mb-4">Competitions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Six on-ground contests open to artists, makers, students and storytellers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, color, title, elig, note }) => (
            <div
              key={title}
              className="group bg-card border border-border/60 rounded-2xl p-7 hover:border-accent/50 hover:-translate-y-1 transition-smooth flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `hsl(var(--${color}) / 0.15)`, border: `1px solid hsl(var(--${color}) / 0.4)` }}
                >
                  <Icon style={{ color: `hsl(var(--${color}))` }} size={22} strokeWidth={1.8} />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-border rounded-full px-3 py-1">
                  {elig}
                </span>
              </div>
              <h3 className="text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{note}</p>
              <a
                href="#register"
                className="text-xs tracking-[0.3em] uppercase font-bold text-accent hover:gap-3 inline-flex items-center gap-2 transition-smooth"
              >
                Register →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competitions;