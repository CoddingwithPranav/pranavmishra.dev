import { cn } from "@/lib/utils";

export default function FeatureCard({ rotateDeg = 12 }: { rotateDeg?: number }) {
  return (
    <div
      className={cn(
        `rotate-${rotateDeg}`,
        "p-6 bg-card/10  dark:bg-card/20 backdrop-blur-xl shadow-lg rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 transition-all duration-300 max-w-sm",
      )}
    >
      <h3 className="text-xl font-semibold mb-4 text-primary dark:text-foreground">
        Feature Title
      </h3>
      <p className="text-lg text-muted-foreground leading-relaxed font-light transition-all duration-300 ease-in-out">
        This is a brief description of the feature. It explains what the feature is about and its benefits.
      </p>
    </div>
  );
}