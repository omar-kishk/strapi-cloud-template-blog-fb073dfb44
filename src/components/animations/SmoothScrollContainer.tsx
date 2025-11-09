'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useScrollProgress';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({
  children,
  className = '',
  showProgress = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Always call hooks at the top level
  const scrollMotionValue = useMotionValue(0);
  const smoothScrollY = useSpring(scrollMotionValue, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastScrollY = 0;
    
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const currentScrollY = latest * (containerRef.current?.scrollHeight || 0);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
      
      scrollMotionValue.set(latest);
    });

    return unsubscribe;
  }, [scrollYProgress, scrollMotionValue, prefersReducedMotion]);

  // Update CSS custom properties for scroll-based animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = smoothScrollY.on('change', (latest) => {
      document.documentElement.style.setProperty('--smooth-scroll-y', `${latest}px`);
      document.documentElement.style.setProperty('--scroll-progress', scrollYProgress.get().toString());
      document.documentElement.style.setProperty('--scroll-direction', scrollDirection);
    });

    return unsubscribe;
  }, [smoothScrollY, scrollYProgress, scrollDirection, prefersReducedMotion]);

  // Disable smooth scrolling for reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${className} relative`}>
      {/* Scroll progress indicator */}
      {showProgress && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
          style={{
            width: progressWidth,
          }}
        />
      )}

      {/* Smooth scroll content */}
      <motion.div
        style={{
          y: smoothScrollY,
          willChange: 'transform',
        }}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Scroll direction indicator for debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <AnimatePresence>
          {scrollDirection === 'down' && (
            <motion.div
              className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-2 text-sm z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div>Direction: down</div>
              <div>Progress: {Math.round((scrollYProgress.get() || 0) * 100)}%</div>
            </motion.div>
          )}
          {scrollDirection === 'up' && (
            <motion.div
              className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-2 text-sm z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div>Direction: up</div>
              <div>Progress: {Math.round((scrollYProgress.get() || 0) * 100)}%</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

// Enhanced scroll reveal component
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Calculate initial position based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  const initialTransform = getInitialTransform();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...initialTransform,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier from guidelines
        },
      }}
      viewport={{ 
        once: triggerOnce, 
        margin: `-${Math.round((1 - threshold) * 100)}%` 
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation component
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
  direction = 'up',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  // Separate transition configuration
  const childTransition = {
    duration: 0.6,
    ease: "easeOut" as const,
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div 
          key={index} 
          variants={childVariants}
          transition={childTransition}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SmoothScrollContainer; 