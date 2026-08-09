interface SkillWrapperProps {
  imageUrl: string;
  name: string;
}

/** Static stack tile -- logo above its label, no motion. */
export default function SkillWrapper({ imageUrl, name }: SkillWrapperProps) {
  return (
    <div className="flex w-24 flex-col items-center gap-2.5 rounded-xl border border-border/50 bg-white px-3 py-4 transition-colors hover:border-primary/40 sm:w-28">
      <img
        src={imageUrl}
        alt=""
        aria-hidden
        className="h-9 w-9 object-contain sm:h-10 sm:w-10"
      />
      <span className="text-center font-mono text-[11px] leading-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}
