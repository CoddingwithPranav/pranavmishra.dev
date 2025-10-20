

export default function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-gradient-to-br from-primary/20 via-primary/15 to-white/10 dark:from-primary/30 dark:via-primary/25 dark:to-white/20 backdrop-blur-2xl border border-white/30 dark:border-primary/40 rounded-full shadow-2xl shadow-primary/20 dark:shadow-white/10 group hover:scale-110 transition-all duration-500 overflow-hidden">
    {/* Galaxy Sparkles */}
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {/* Tiny twinkling stars */}
      <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping opacity-50" />
      <div className="absolute top-6 right-4 w-0.5 h-0.5 bg-primary rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-3 left-5 w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-40" />
      
      {/* Galaxy Ring */}
      <div className="absolute inset-0 rounded-full border border-primary/50 dark:border-white/30 animate-spin-slow" />
    </div>
    
    {/* Inner Glow */}
    <div className="absolute inset-0 bg-gradient-radial from-white/25 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    {children}
  </div>
  );
}
