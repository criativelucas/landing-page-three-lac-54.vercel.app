"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Entrance offset. Pass 0 for elements whose position must not depend on the
   *  animation having run (e.g. anything flush-mounted to a section edge). */
  y?: number;
}) {
  return (
    <motion.div
      className={`js-reveal ${className ?? ""}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
