import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTextHover, setIsTextHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(pointer: fine)').matches;
    if (isCoarse) {
      setIsTouchDevice(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Real-time cursor coordinates
    let mouseX = -100;
    let mouseY = -100;
    // Smoothed ring coordinates
    let ringX = -100;
    let ringY = -100;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      // Check for interactive targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], .tilt-card-container, [data-interactive="true"]')
        );
        const isText = Boolean(
          target.closest('input, textarea, [contenteditable="true"]')
        );

        setIsHovered(isInteractive && !isText);
        setIsTextHover(isText);
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // High performance render loop with lerp spring tracking
    const updateCursor = () => {
      if (prefersReducedMotion) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        // Smooth lerp: 0.16 interpolation factor for kinetic fluid ring trail
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  // Ring dimension calculations based on state
  let ringClasses = 'border-cyan-400/50 bg-cyan-500/[0.03]';
  let ringSize = 'w-7 h-7 -top-3.5 -left-3.5'; // 28px default

  if (isMouseDown) {
    ringClasses = 'border-cyan-300 scale-75 bg-cyan-400/20';
    ringSize = 'w-6 h-6 -top-3 -left-3';
  } else if (isTextHover) {
    ringClasses = 'border-cyan-400/80 bg-cyan-500/10 w-2 h-7 -top-3.5 -left-1 rounded-sm';
    ringSize = '';
  } else if (isHovered) {
    ringClasses = 'border-cyan-400/90 bg-cyan-400/10 shadow-[0_0_15px_rgba(6,182,212,0.25)]';
    ringSize = 'w-12 h-12 -top-6 -left-6'; // 48px expanded
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Micro-Dot (Immediate response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-transform duration-150 ${
            isTextHover
              ? 'bg-cyan-300 opacity-60'
              : isHovered
              ? 'bg-cyan-300 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
              : isMouseDown
              ? 'bg-cyan-200 scale-75'
              : 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]'
          }`}
        />
      </div>

      {/* Kinetic Magnetic Trailing Ring (Spring Lerp) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
      >
        <div
          className={`relative rounded-full border transition-[width,height,transform,background-color,border-color,box-shadow] duration-200 ease-out ${ringSize} ${ringClasses}`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
