"use client";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  rotateDeg?: number;
}

export default function FeatureCard({ rotateDeg = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "p-4 sm:p-6 bg-card/10 dark:bg-card/20 backdrop-blur-xl shadow-lg rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 transition-all duration-300 w-full max-w-sm mx-auto",
      )}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary dark:text-foreground">
        Feature Title
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light transition-all duration-300 ease-in-out">
        This is a brief description of the feature. It explains what the feature is about and its benefits.
      </p>
    </div>
  );
}