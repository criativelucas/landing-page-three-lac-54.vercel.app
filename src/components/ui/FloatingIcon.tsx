"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// 3D lime-green icons (Lando-style floating objects). The PNGs are cut out with
// a real alpha channel, so they composite over any section, light or dark.
// Idle bob + mouse-driven 3D tilt; on a viewport without a pointer the tilt
// just never fires, leaving the gentle bob.
export default function FloatingIcon({
  src,
  alt,
  className = "",
  size = 160,
}: {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 });

  function handleMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`js-reveal pointer-events-auto select-none [perspective:800px] ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        // js-reveal also parks the idle bob and the pointer tilt below md: the
        // tilt has no pointer to track on a phone anyway, and an infinite
        // animation per icon is battery the icon isn't earning there.
        className="js-reveal h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(227,255,61,0.25)]"
        />
      </motion.div>
    </motion.div>
  );
}
