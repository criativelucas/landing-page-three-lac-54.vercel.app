// Pulsing "live" dot (Breedlove-style). Pure CSS via Tailwind's animate-ping;
// the solid core stays put while a translucent ring expands and fades.
export default function LivePing({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
