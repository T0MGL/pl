'use client';

import { motion, useScroll, useTransform, type UseScrollOptions } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.3 = moderate, 0.5 = strong
  offset?: UseScrollOptions['offset'];
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.15,
  offset = ['start end', 'end start'],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}px`, `${speed * 100}px`]
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

// Parallax image wrapper — image slightly larger than container
export function ParallaxImage({
  children,
  className,
  speed = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-10%] h-[120%] w-full">
        {children}
      </motion.div>
    </div>
  );
}
