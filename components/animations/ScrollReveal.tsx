'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ScrollRevealContainer({ children, className, staggerChildren = 0.12 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren,
            delayChildren: 0,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// Text reveal — splits into lines
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({ text, className, delay = 0, as: Tag = 'h2' }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const lines = text.split('\n');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
