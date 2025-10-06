import { FaEye } from "react-icons/fa";

export default function RetroCard() {
  return (
    <div className="relative p-6 bg-card/10 dark:bg-card/20 backdrop-blur-xl shadow-md rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 transition-all duration-300 max-w-sm hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
      {/* Background Year with Gradient */}
      <div className="absolute  bottom-0 right-0 flex items-center justify-center text-muted/10 dark:text-muted/5 text-9xl font-bold select-none pointer-events-none opacity-30"
           style={{
             background: "linear-gradient(135deg, transparent 0%, var(--muted)/10 100%)",
           }}>
        2024
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-primary mb-5 border-b border-border/20 dark:border-border/30 pb-2">
          <FaEye className="text-xl" />
          <span className="text-lg font-medium text-muted-foreground">2,000 views</span>
        </div>
        <h3 className="text-2xl font-bold mb-5 text-primary dark:text-foreground tracking-tight">
          The 2024 Retrospective
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed font-light max-w-[90%]">
          First Full-Time Year, Solo travel while working, socializing and more!
        </p>
      </div>
    </div>
  );
}