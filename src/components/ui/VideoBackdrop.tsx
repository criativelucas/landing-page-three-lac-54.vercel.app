// Ambient looping video wash. Sits behind content at very low opacity, so it
// reads as texture, never as a thing to watch.
//
// Plain <video>, no JS: autoPlay+muted+loop+playsInline is what mobile Safari
// requires to start without a tap, and `poster` covers the window before the
// first frame decodes (and the case where the file never loads at all) so the
// section is never a blank hole. Decorative, so aria-hidden.
//
// Motion here is pure decoration, which is exactly what prefers-reduced-motion
// exists to kill: globals.css drops the element entirely for those users, and
// the section falls back to the flat bg-ink it had before this existed.
export default function VideoBackdrop({
  className = "",
  opacityClass = "opacity-[0.14]",
}: {
  className?: string;
  opacityClass?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <video
        className={`video-backdrop h-full w-full object-cover ${opacityClass}`}
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-bg.jpg"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
