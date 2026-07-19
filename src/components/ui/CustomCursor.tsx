"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Spring-following cursor dot (OFF+BRAND style). Only engages on a real pointer
// at lg+ with motion allowed; the native cursor is hidden ONLY while this is
// actually rendering, so a narrow window or a touch device never ends up with
// no cursor at all. Re-evaluates on resize/pointer changes.
const ACTIVE_QUERY = "(pointer: fine) and (min-width: 1024px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const activeMq = window.matchMedia(ACTIVE_QUERY);
    const reducedMq = window.matchMedia(REDUCED_QUERY);
    const evaluate = () => setEnabled(activeMq.matches && !reducedMq.matches);

    evaluate();
    activeMq.addEventListener("change", evaluate);
    reducedMq.addEventListener("change", evaluate);
    return () => {
      activeMq.removeEventListener("change", evaluate);
      reducedMq.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button'], input, select, textarea");
      setIsHovering(!!clickable);
      setIsExternal(!!target.closest("a[target='_blank']"));
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.style.cursor = "";
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
        marginLeft: isHovering ? -24 : -8,
        marginTop: isHovering ? -24 : -8,
        backgroundColor: "white",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {isExternal && (
        <span className="text-lg font-medium leading-none text-black" style={{ marginTop: "-2px" }}>
          ↗
        </span>
      )}
    </motion.div>
  );
}
