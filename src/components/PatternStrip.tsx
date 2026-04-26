import borderImage from "@/assets/Border1.png";
import { cn } from "@/lib/utils";

const PatternStrip = ({ className, isBottom }: { className?: string; isBottom?: boolean }) => {
  return (
    <div className={cn(
      "w-full overflow-hidden bg-background/80 backdrop-blur-md",
      isBottom ? "border-t border-border/30" : "border-b border-border/30",
      className
    )}>
      <img 
        src={borderImage} 
        alt="Decorative Border" 
        className="w-full h-8 md:h-14 object-contain"
      />
    </div>
  );
};

export default PatternStrip;
