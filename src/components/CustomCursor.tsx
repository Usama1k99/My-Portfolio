import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const isCoarse =
      window.matchMedia('(pointer: coarse)').matches ||
      !window.matchMedia('(pointer: fine)').matches;

    if (isCoarse) {
      setIsTouchDevice(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Real-time cursor coordinates
    let mouseX = -100;
    let mouseY = -100;

    // Smoothed ring state
    let ringX = -100;
    let ringY = -100;
    let ringW = 28;
    let ringH = 28;
    let ringRadius = 9999;

    let activeTarget: HTMLElement | null = null;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      // Check for interactive elements to magnetically encompass
      const target = e.target as HTMLElement | null;
      if (target) {
        // Encompass buttons, links, navigation items, pills, and interactive badges
        const interactiveEl = target.closest<HTMLElement>(
          'a, button, [role="button"], input, select, textarea, [data-magnetic="true"], .interactive-target'
        );

        if (interactiveEl) {
          activeTarget = interactiveEl;
          setIsHovered(true);
        } else {
          activeTarget = null;
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      activeTarget = null;
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const updateCursor = () => {
      let targetX = mouseX;
      let targetY = mouseY;
      let targetW = 28;
      let targetH = 28;
      let targetRadius = 9999;

      if (activeTarget && activeTarget.isConnected) {
        const rect = activeTarget.getBoundingClientRect();
        // Check if element is visible and within reasonable bounding size for encompassing
        if (rect.width > 0 && rect.height > 0 && rect.width < 600 && rect.height < 250) {
          targetX = rect.left + rect.width / 2;
          targetY = rect.top + rect.height / 2;
          targetW = rect.width + 12;
          targetH = rect.height + 8;

          const computedStyle = window.getComputedStyle(activeTarget);
          const computedRadius = parseFloat(computedStyle.borderRadius) || 0;
          if (computedRadius >= 16 || computedStyle.borderRadius.includes('9999')) {
            targetRadius = 9999;
          } else if (computedRadius > 0) {
            targetRadius = computedRadius + 4;
          } else {
            targetRadius = 8;
          }
        } else {
          activeTarget = null;
          setIsHovered(false);
        }
      }

      if (isMouseDown && !activeTarget) {
        targetW = 22;
        targetH = 22;
      }

      // Physics interpolation: snappier when encompassing, fluid spring when free-floating
      const lerpFactor = prefersReducedMotion ? 1 : activeTarget ? 0.28 : 0.18;

      ringX += (targetX - ringX) * lerpFactor;
      ringY += (targetY - ringY) * lerpFactor;
      ringW += (targetW - ringW) * lerpFactor;
      ringH += (targetH - ringH) * lerpFactor;
      ringRadius += (targetRadius - ringRadius) * lerpFactor;

      // Update ring transform & bounding box
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - ringW / 2}px, ${ringY - ringH / 2}px, 0)`;
        ringRef.current.style.width = `${ringW}px`;
        ringRef.current.style.height = `${ringH}px`;
        ringRef.current.style.borderRadius = `${ringRadius}px`;
      }

      // Micro-dot stays strictly locked to actual mouse coordinates
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
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
  }, [isVisible, isMouseDown]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Micro-Dot: Kept as-is, locked directly to mouse position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-transform duration-150 ${
            isHovered
              ? 'bg-cyan-300 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
              : isMouseDown
              ? 'bg-cyan-200 scale-75'
              : 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]'
          }`}
        />
      </div>

      {/* Kinetic Ring: Encompasses hovered elements, or smoothly trails as circular ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform border transition-[border-color,background-color,box-shadow] duration-200 ${
          isHovered
            ? 'border-cyan-400/80 bg-cyan-400/[0.08] shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            : isMouseDown
            ? 'border-cyan-300 bg-cyan-400/20'
            : 'border-cyan-400/40 bg-cyan-500/[0.02]'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
