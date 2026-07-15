export default function Logomark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M11 4 L18 4 L11 15 L4 15 Z" />
      <path d="M28 4 L28 9 L22 9 L22 4 Z" />
      <path d="M21 12 L28 12 L14 28 L7 28 Z" />
    </svg>
  );
}
