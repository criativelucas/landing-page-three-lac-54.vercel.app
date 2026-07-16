"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide native cursor, except on touch devices where this won't show anyway
    document.documentElement.style.cursor = "none";
    
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable element
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");
      
      if (isClickable) {
        setIsHovering(true);
        // Check if external link
        if (target.closest("a[target='_blank']")) {
          setIsExternal(true);
        } else {
          setIsExternal(false);
        }
      } else {
        setIsHovering(false);
        setIsExternal(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.style.cursor = "auto";
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden items-center justify-center rounded-full mix-blend-difference lg:flex"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
        marginLeft: isHovering ? -24 : -8,
        marginTop: isHovering ? -24 : -8,
        backgroundColor: "white",
      }}
      animate={{
        scale: isHovering ? 1 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {isExternal && (
        <span className="text-black font-medium text-lg leading-none" style={{ marginTop: "-2px" }}>
          ↗
        </span>
      )}
    </motion.div>
  );
}
