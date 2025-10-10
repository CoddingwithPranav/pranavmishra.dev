"use client";

import { FaEye } from "react-icons/fa";

interface RetroCardProps {
  year: string;
  title: string;
  description: string;
  views: number;
}

export default function RetroCard({ year, title, description, views }: RetroCardProps) {
  return (
    <div className="relative p-4 sm:p-6 bg-card/10 dark:bg-card/20 backdrop-blur-xl shadow-md rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 transition-all duration-300 max-w-sm w-full mx-auto hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
      {/* Background Year with Gradient */}
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center text-muted/10 dark:text-muted/5 text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(135deg, transparent 0%, var(--muted)/10 100%)",
        }}
      >
        {year}
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-primary mb-4 sm:mb-5 border-b border-border/20 dark:border-border/30 pb-2">
          <FaEye className="text-lg sm:text-xl" />
          <span className="text-base sm:text-lg font-medium text-muted-foreground">
            {views.toLocaleString()} views
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-primary dark:text-foreground tracking-tight">
          {title}
        </h3>
        <div
          className="prose prose-sm max-w-[90%] text-base text-muted-foreground leading-relaxed font-light dark:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}