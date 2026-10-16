"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  kicker,
  title,
  sub,
  dark = false,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignCls} gap-4`}>
      <div className="flex items-center gap-3">
        <span className="font-display text-sm italic text-brass">{index}</span>
        <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-cream/70" : "text-moss"
          }`}
        >
          {kicker}
        </span>
      </div>
      <h2
        className={`max-w-2xl font-display text-3xl leading-[1.12] font-medium text-balance sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`max-w-xl text-[15px] leading-relaxed ${dark ? "text-cream/70" : "text-moss"}`}>
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
