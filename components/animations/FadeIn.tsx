'use client';

import { motion, type Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const directionMap: Record<string, { x?: number; y?: number }> = {
  up:    { y: 30 },
  down:  { y: -30 },
  left:  { x: 30 },
  right: { x: -30 },
  none:  {},
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 30,
  once = true,
  threshold = 0.15,
}: FadeInProps) {
  const initial = {
    opacity: 0,
    ...directionMap[direction],
  };

  if (distance !== 30 && directionMap[direction]) {
    if (direction === 'up') initial.y = distance;
    if (direction === 'down') initial.y = -distance;
    if (direction === 'left') initial.x = distance;
    if (direction === 'right') initial.x = -distance;
  }

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
