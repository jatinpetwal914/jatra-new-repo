import { Calendar } from "lucide-react";
import day1 from "@/assets/events/day1-aipan.jpg";
import day2 from "@/assets/events/day2-competitions.jpg";
import day3 from "@/assets/events/day3-stage.jpg";
import day4 from "@/assets/events/day4-jhoda.jpg";
import day5 from "@/assets/events/day5-finale.jpg";

const schedule = [
  {
    day: "Day 1",
    date: "24 June",
    title: "Grand Opening with Jatra",
    color: "festival-blue",
    img: day1,
    items: [
      "Morning Pooja at Kasar Devi Temple",
      "Choliya Performance, MTB Riders & Paragliders",
      "Mangal & Shakuna Geet · Grand Aipan Creation",
      "Panel Discussion — Jatra Festival, Why?",
      "Kamla Devi Live Performance",
      "Aipan Competition · Photography & Reel begins",
    ],
  },
  {
    day: "Day 2",
    date: "25 June",
    title: "Competitions Day",
    color: "festival-yellow",
    img: day2,
    items: [
      "Culinary Competition",
      "Painting Competition",
      "Fashion Show — Modern + Traditional",
      "Panel Discussion: Fashion & Identity",
      "Evening: Upreti Sisters Live Show",
      "Daily Prize Announcement",
    ],
  },
  {
    day: "Day 3",
    date: "26 June",
    title: "Sustainability & Open Stage",
    color: "festival-green",
    img: day3,
    items: [
      "Sustainable Craft Competition",
      "Open Stage Performances",
      "Stand-Up by Shiromani Pant & Rashi Joshi",
      "Performance by Dr. Basanti Bisht",
      "Lalit Mohan Joshi / Digvijay Parihar Live",
    ],
  },
  {
    day: "Day 4",
    date: "27 June",
    title: "Jhoda Chanchari & Arts",
    color: "festival-red",
    img: day4,
    items: [
      "Jhoda Chanchari Gathering with Shiromani Pant",
      "Aiming for Guinness World Record participation",
      "Photography Competition Results",
      "Reel Making Competition Results",
      "Evening: Devasthali Dance Performance",
    ],
  },
  {
    day: "Day 5",
    date: "28–29 June",
    title: "Grand Finale",
    color: "festival-blue",
    img: day5,
    items: [
      "Tug of War — Male & Female Categories",
      "Dhol Samvad: Garhwal · Kumaun · Jaunsar",
      "Janjati Cultural Performance",
      "Devasthali — Vote of Thanks",
      "Closing Act: Devasthali Live Music",
    ],
  },
];

const Schedule = () => {
  return (
    <section id="schedule" className="relative py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <div className="text-accent text-xs tracking-[0.4em] uppercase font-medium mb-4">
            Full Programme
          </div>
          <h2 className="text-4xl md:text-6xl mb-4">5 Days of Jatra</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From Kasar Devi temple bells to dhol samvad finales — every day, a new chapter of the Himalaya.
          </p>
        </div>

        <div className="space-y-10">
          {schedule.map((d, i) => (
            <article
              key={d.day}
              className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 group">
                <img
                  src={d.img}
                  alt={`${d.day} – ${d.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
                <div
                  className="absolute top-5 left-5 flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md text-xs tracking-[0.3em] uppercase font-bold"
                  style={{
                    background: `hsl(var(--${d.color}) / 0.2)`,
                    border: `1px solid hsl(var(--${d.color}) / 0.5)`,
                    color: `hsl(var(--${d.color}))`,
                  }}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {d.date}
                </div>
              </div>
              <div>
                <div
                  className="text-xs tracking-[0.4em] uppercase font-bold mb-3"
                  style={{ color: `hsl(var(--${d.color}))` }}
                >
                  {d.day}
                </div>
                <h3 className="text-3xl md:text-4xl mb-6 leading-tight">{d.title}</h3>
                <ul className="space-y-3">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                      <span
                        className="mt-2 w-1.5 h-1.5 rotate-45 shrink-0"
                        style={{ background: `hsl(var(--${d.color}))` }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;