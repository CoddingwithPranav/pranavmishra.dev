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
    <div className="relative h-[28rem] p-6 bg-gradient-to-br from-card/95 via-card/80 to-card/95 dark:from-card/20 dark:via-card/10 dark:to-card/20 backdrop-blur-2xl shadow-xl rounded-2xl border border-border/30 dark:border-border/40 transition-all duration-500 max-w-sm w-full mx-auto hover:shadow-2xl hover:-translate-y-3 group overflow-hidden">
      {/* Decorative Corner Gradient */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full -translate-x-8 translate-y-8 opacity-50" />
      
      {/* Background Year with Enhanced Gradient */}
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center text-primary/5 dark:text-primary/10 text-8xl sm:text-9xl font-black select-none pointer-events-none opacity-20"
        style={{
          background: "linear-gradient(135deg, transparent 0%, var(--primary)/5 50%, var(--secondary)/8 100%)",
          padding: "1rem 2rem",
        }}
      >
        {year}
      </div>

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary/80 mb-0 border-b-0 pb-0">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
              <FaEye className="text-primary text-xl" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-muted-foreground tracking-wide uppercase">
              {views.toLocaleString()} views
            </span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black mb-0 text-foreground tracking-tight leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="flex-1 flex items-end">
          <div
            className="prose prose-sm max-w-[95%] text-muted-foreground leading-relaxed font-light dark:text-muted-foreground line-clamp-4 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Subtle Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}