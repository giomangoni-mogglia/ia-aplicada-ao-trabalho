"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

export default function SectionTransition({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
  };

  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={inView ? v.animate : v.initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
