import { Variants, Transition } from 'framer-motion';

/**
 * AURA BOTANICA — LUXURY ANIMATION MOTION ENGINE
 * Quiet Luxury + Organic Movement + Editorial Motion
 */

// Custom cubic-bezier easing curves
export const luxuryEase = [0.16, 1, 0.3, 1] as const; // Decelerating luxury curve
export const smoothEase = [0.22, 1, 0.36, 1] as const; // Clean interactive curve

// Transition presets
export const transitions = {
  fast: { duration: 0.25, ease: smoothEase } satisfies Transition,
  normal: { duration: 0.45, ease: smoothEase } satisfies Transition,
  medium: { duration: 0.7, ease: luxuryEase } satisfies Transition,
  editorial: { duration: 0.95, ease: luxuryEase } satisfies Transition,
  drawer: { type: 'spring', damping: 28, stiffness: 240, mass: 0.8 } satisfies Transition,
};

// Reusable Motion Variants
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.medium,
  },
};

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.medium,
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.editorial,
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: 0.25, ease: smoothEase },
  },
};

export const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: transitions.drawer,
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3, ease: smoothEase },
  },
};

export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
};

export const buttonTapMotion = {
  scale: 0.98,
  transition: { duration: 0.15, ease: smoothEase },
};

export const heartPulseMotion = {
  scale: [1, 1.22, 1],
  transition: { duration: 0.3, ease: luxuryEase },
};
