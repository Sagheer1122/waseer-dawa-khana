'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpVariants, fadeLeftVariants, fadeRightVariants, fadeInVariants, scaleInVariants } from '@/lib/motion';

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  className?: string;
  amount?: number;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className,
  amount = 0.2,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const getVariants = () => {
    switch (direction) {
      case 'left':
        return fadeLeftVariants;
      case 'right':
        return fadeRightVariants;
      case 'fade':
        return fadeInVariants;
      case 'scale':
        return scaleInVariants;
      case 'up':
      default:
        return fadeUpVariants;
    }
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
