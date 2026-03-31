'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const variantClass = {
    up:    'reveal',
    left:  'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}
