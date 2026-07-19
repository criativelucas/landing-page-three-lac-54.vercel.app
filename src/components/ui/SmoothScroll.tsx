"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Lenis inertia scroll (Lando-style weight). Skipped entirely when the user
// asks for reduced motion: hijacking the scroll wheel is exactly the kind of
// motion that setting exists to opt out of. Native anchor scrolling still works
// because Lenis drives the real document scroll position.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // /pitch is a slide deck driven by mandatory scroll snap; Lenis animates
    // scrollTop itself, so the two fight and the snap never settles.
    if (pathname.startsWith("/pitch")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices keep native scrolling. Phones already have inertia in the
    // OS, and layering Lenis on top of it costs a rAF loop per frame to make
    // the scroll feel worse than the one the platform ships.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Lenis defaults this off; without it every in-page anchor (nav, CTAs,
      // skip-link) silently stops working once Lenis takes over the scroll.
      anchors: { offset: -80 },
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
