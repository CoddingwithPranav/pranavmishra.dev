import { cn } from "@/lib/utils";

interface SkillWrapperProps {
  imageUrl: string;
  name: string;
}

export default function SkillWrapper({ 
  imageUrl, 
  name, 
}: SkillWrapperProps) {
  return (
    <div className={cn(
      "relative p-6 overflow-hidden rounded-full group hover:scale-110 transition-all duration-500",
      `bg-gradient-to-br from-primary/20 via-primary/15 to-white/10 
       dark:from-primary/30 dark:via-primary/25 dark:to-white/20 
       backdrop-blur-2xl border border-white/30 dark:border-primary/40 
       shadow-primary/20 dark:shadow-white/10`
    )}>
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping opacity-50" />
        <div className="absolute top-6 right-4 w-0.5 h-0.5 bg-[color:var(--skill-color)] rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-3 left-5 w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-40" />
        
        <div 
          className={cn(
            "absolute inset-0 rounded-full border animate-spin-slow",
            `border-primary/50 dark:border-white/30`
          )} 
        />
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-radial from-white/25 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
      
      {/* Logo Image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-16 h-16 transition-all duration-500">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-contain rounded-full shadow-lg animate-float"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 pointer-events-none z-20">
        <div className={cn(
          "px-4 py-2  text-xl w-full block text-center text-secondary bg-background font-medium tracking-wider"
        )}>
          {name}
        </div>
      </div>
    </div>
  );
}