'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useScrollProgress, usePrefersReducedMotion } from '@/hooks/useScrollProgress';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  enableFloatingObjects?: boolean;
  backgroundGradient?: string;
}

// Individual floating object component
const FloatingObject: React.FC<{
  obj: {
    id: number;
    shape: string;
    size: number;
    initialX: number;
    initialY: number;
    speed: number;
    rotationSpeed: number;
  };
  scrollMotionValue: import('framer-motion').MotionValue<number>;
}> = ({ obj, scrollMotionValue }) => {
  const y = useTransform(
    scrollMotionValue,
    [0, 1],
    [obj.initialY, obj.initialY - 50]
  );
  
  const rotation = useTransform(
    scrollMotionValue,
    [0, 1],
    [0, 360 * obj.rotationSpeed]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${obj.initialX}%`,
        y,
        rotate: rotation,
        width: obj.size,
        height: obj.size,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ 
        opacity: 0.6, 
        scale: 1,
        transition: { 
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      viewport={{ once: false, margin: "-20%" }}
    >
      <PharmaceuticalShape shape={obj.shape} />
    </motion.div>
  );
};

// Floating geometric shapes for pharmaceutical theme
const FloatingObjects: React.FC<{ prefersReducedMotion: boolean }> = ({ prefersReducedMotion }) => {
  const { scrollProgress } = useScrollProgress();
  const scrollMotionValue = useMotionValue(scrollProgress);
  
  const objects = [
    {
      id: 1,
      shape: 'molecule',
      size: 60,
      initialX: 10,
      initialY: 20,
      speed: 0.3,
      rotationSpeed: 0.5,
    },
    {
      id: 2,
      shape: 'hexagon',
      size: 40,
      initialX: 80,
      initialY: 60,
      speed: 0.6,
      rotationSpeed: -0.3,
    },
    {
      id: 3,
      shape: 'crystal',
      size: 35,
      initialX: 65,
      initialY: 15,
      speed: 0.4,
      rotationSpeed: 0.8,
    },
    {
      id: 4,
      shape: 'pill',
      size: 25,
      initialX: 20,
      initialY: 80,
      speed: 0.7,
      rotationSpeed: -0.6,
    },
    {
      id: 5,
      shape: 'dna',
      size: 45,
      initialX: 90,
      initialY: 30,
      speed: 0.2,
      rotationSpeed: 0.4,
    },
  ];

  // Update motion value when scroll progress changes
  React.useEffect(() => {
    scrollMotionValue.set(scrollProgress);
  }, [scrollProgress, scrollMotionValue]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {objects.map((obj) => (
        <FloatingObject 
          key={obj.id} 
          obj={obj} 
          scrollMotionValue={scrollMotionValue} 
        />
      ))}
    </div>
  );
};

// Pharmaceutical-themed shapes
const PharmaceuticalShape: React.FC<{ shape: string }> = ({ shape }) => {
  const baseClasses = "w-full h-full";
  
  switch (shape) {
    case 'molecule':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border-2 border-primary/30" />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      );
    
    case 'hexagon':
      return (
        <div className={`${baseClasses} transform rotate-45`}>
          <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg border-2 border-secondary/30" />
        </div>
      );
    
    case 'crystal':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-secondary/15 transform rotate-12 rounded-sm border border-primary/40" />
          <div className="absolute inset-1 bg-gradient-to-bl from-secondary/10 to-primary/10 transform -rotate-12 rounded-sm border border-secondary/40" />
        </div>
      );
    
    case 'pill':
      return (
        <div className={`${baseClasses} bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border-2 border-primary/40`}>
          <div className="absolute inset-y-0 left-0 w-1/2 bg-primary/10 rounded-l-full" />
        </div>
      );
    
    case 'dna':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 border-l-2 border-primary/40 transform rotate-12" />
          <div className="absolute inset-0 border-l-2 border-secondary/40 transform -rotate-12" />
          <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2" />
          <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-secondary rounded-full transform -translate-x-1/2" />
        </div>
      );
    
    default:
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border-2 border-primary/30`} />
      );
  }
};

// Morphing background component
const MorphingBackground: React.FC<{ scrollProgress: number; prefersReducedMotion: boolean }> = ({ 
  scrollProgress, 
  prefersReducedMotion 
}) => {
  const [gradientShift, setGradientShift] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setGradientShift(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
    );
  }

  const hueRotation = gradientShift + (scrollProgress * 60);
  
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: `conic-gradient(from ${hueRotation}deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1), hsl(var(--primary) / 0.05))`,
        filter: `hue-rotate(${hueRotation}deg)`,
      }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Main parallax section component
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
  enableFloatingObjects = true,
  backgroundGradient = 'from-background via-primary/5 to-secondary/5',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollProgress } = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Smooth spring animation for scroll-based transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(
    useTransform(useMotionValue(scrollProgress), [0, 1], [0, -100 * speed]),
    springConfig
  );

  // Multiple depth layers for parallax effect
  const backgroundY = useSpring(
    useTransform(useMotionValue(scrollProgress), [0, 1], [0, -30]),
    springConfig
  );
  
  const midgroundY = useSpring(
    useTransform(useMotionValue(scrollProgress), [0, 1], [0, -60]),
    springConfig
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background Layer (0.3x speed) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`} />
        <MorphingBackground 
          scrollProgress={scrollProgress} 
          prefersReducedMotion={prefersReducedMotion} 
        />
      </motion.div>

      {/* Mid-ground Layer (0.6x speed) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : midgroundY }}
      >
        {enableFloatingObjects && (
          <FloatingObjects prefersReducedMotion={prefersReducedMotion} />
        )}
      </motion.div>

      {/* Foreground Content (1x speed) */}
      <motion.div
        className="relative z-10"
        style={{ y: prefersReducedMotion ? 0 : y }}
        initial={{ opacity: 0 }}
        whileInView={{ 
          opacity: 1,
          transition: { 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        viewport={{ once: false, margin: "-10%" }}
      >
        {children}
      </motion.div>

      {/* Subtle noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default ParallaxSection; 