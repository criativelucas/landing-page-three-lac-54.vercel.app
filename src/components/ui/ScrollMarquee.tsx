"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

// Lando-style scroll-reactive marquee: idle auto-scroll, but scroll velocity
// speeds it up and scroll direction flips it. One item list is repeated enough
// times to cover any viewport; `wrap` keeps the x offset seamless.
export default function ScrollMarquee({
  items,
  baseVelocity = 40,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  // -20% because the track is duplicated; wrapping in [-20, -45] keeps a
  // continuous loop regardless of how many copies render.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const sep = "·";

  return (
    <div className="flex overflow-hidden bg-accent py-3 font-pixel text-xs tracking-wide text-accent-ink">
      <motion.div className="flex shrink-0 whitespace-nowrap" style={{ x }} aria-hidden>
        {Array.from({ length: 4 }).map((_, copy) => (
          <span key={copy} className="flex items-center">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="px-4">{item}</span>
                <span className="opacity-50">{sep}</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
