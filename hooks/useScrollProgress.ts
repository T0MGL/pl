'use client';

import { useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => progress.set(v));
  }, [scrollYProgress, progress]);

  return progress;
}

export function useParallax(offset: number = 50) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);
  return y;
}
