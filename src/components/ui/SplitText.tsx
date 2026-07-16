"use client";

import { motion } from "motion/react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

// Word-level kinetic entrance (Lando-style), but split on WORDS not letters so
// it stays legible with PT-BR accents and long headlines. Wrapped in
// MotionConfig reducedMotion="user" (layout.tsx), so motion is auto-neutralized
// for users who ask for it.
export default function SplitText({
  text,
  as = "h1",
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: { y: "0%", rotate: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}
