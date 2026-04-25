import { Mountain, Sun, Cog, Zap } from "lucide-react";

const items = [
  { color: "festival-blue", Icon: Mountain },
  { color: "festival-yellow", Icon: Sun },
  { color: "festival-green", Icon: Cog },
  { color: "festival-red", Icon: Zap },
];

const Diamond = ({ color, Icon }: { color: string; Icon: any }) => (
  <div
    className="w-5 h-5 rotate-45 border-[1.5px] flex items-center justify-center shrink-0 rounded-sm opacity-80"
    style={{ borderColor: `hsl(var(--${color}))` }}
  >
    <Icon className="-rotate-45" size={9} strokeWidth={2.25} style={{ color: `hsl(var(--${color}))` }} />
  </div>
);

const PatternStrip = () => {
  const row = Array.from({ length: 28 }, (_, i) => items[i % items.length]);
  return (
    <div className="w-full overflow-hidden py-2 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="flex items-center justify-around gap-4 px-4">
        {row.map((it, i) => (
          <Diamond key={i} color={it.color} Icon={it.Icon} />
        ))}
      </div>
    </div>
  );
};

export default PatternStrip;
