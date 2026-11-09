import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Persistent coordinates and target references across renders
  const coordsRef = useRef({
    mouseX: -9999,
    mouseY: -9999,
    ringX: -9999,
    ringY: -9999,
    ringW: 28,
    ringH: 28,
    ringRadius: 9999,
    isMouseDown: false,
    activeTarget: null as HTMLElement | null,
    hasMoved: false,
  });

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
    const coords = coordsRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      coords.mouseX = e.clientX;
      coords.mouseY = e.clientY;
      // Expose cursor position globally for scroll-based hover evaluation across components
      (window as unknown as { __cursorPos?: { x: number; y: number; hasMoved: boolean } }).__cursorPos = {
        x: e.clientX,
        y: e.clientY,
        hasMoved: true,
      };

      if (!coords.hasMoved) {
        coords.hasMoved = true;
        coords.ringX = e.clientX;
        coords.ringY = e.clientY;
        setIsVisible(true);
      }

      // Check for interactive elements to magnetically encompass
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest<HTMLElement>(
          'a, button, [role="button"], input, select, textarea, [data-magnetic="true"], .interactive-target'
        );

        if (interactiveEl) {
          coords.activeTarget = interactiveEl;
          setIsHovered(true);
        } else {
          coords.activeTarget = null;
          setIsHovered(false);
        }
      }
    };

    // Re-evaluate hover under stationary cursor when page is scrolled
    const checkHoverUnderCursor = (x: number, y: number) => {
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) return;
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (el) {
        const interactiveEl = el.closest<HTMLElement>(
          'a, button, [role="button"], input, select, textarea, [data-magnetic="true"], .interactive-target'
        );

        if (interactiveEl) {
          coords.activeTarget = interactiveEl;
          setIsHovered(true);
        } else {
          coords.activeTarget = null;
          setIsHovered(false);
        }

        // Dispatch synthetic pointermove and mousemove so underlying interactive elements trigger their hover
        el.dispatchEvent(
          new PointerEvent('pointermove', {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        el.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      } else {
        coords.activeTarget = null;
        setIsHovered(false);
      }
    };

    let scrollRafId = 0;
    const handleScroll = () => {
      if (!coords.hasMoved) return;
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = 0;
        checkHoverUnderCursor(coords.mouseX, coords.mouseY);
      });
    };

    const handleMouseDown = () => {
      coords.isMouseDown = true;
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      coords.isMouseDown = false;
      setIsMouseDown(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      coords.activeTarget = null;
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    let rafId: number;

    const updateCursor = () => {
      if (!coords.hasMoved) {
        rafId = requestAnimationFrame(updateCursor);
        return;
      }

      let targetX = coords.mouseX;
      let targetY = coords.mouseY;
      let targetW = 28;
      let targetH = 28;
      let targetRadius = 9999;

      if (coords.activeTarget && coords.activeTarget.isConnected) {
        const rect = coords.activeTarget.getBoundingClientRect();
        // Check if element is visible and within reasonable bounding size for encompassing
        if (rect.width > 0 && rect.height > 0 && rect.width < 600 && rect.height < 250) {
          // Verify that cursor is still near the target (hasn't scrolled away)
          const isStillNear =
            coords.mouseX >= rect.left - 20 &&
            coords.mouseX <= rect.right + 20 &&
            coords.mouseY >= rect.top - 20 &&
            coords.mouseY <= rect.bottom + 20;

          if (isStillNear) {
            targetX = rect.left + rect.width / 2;
            targetY = rect.top + rect.height / 2;
            targetW = rect.width + 12;
            targetH = rect.height + 8;

            const computedStyle = window.getComputedStyle(coords.activeTarget);
            const computedRadius = parseFloat(computedStyle.borderRadius) || 0;
            if (computedRadius >= 16 || computedStyle.borderRadius.includes('9999')) {
              targetRadius = 9999;
            } else if (computedRadius > 0) {
              targetRadius = computedRadius + 4;
            } else {
              targetRadius = 8;
            }
          } else {
            coords.activeTarget = null;
            setIsHovered(false);
          }
        } else {
          coords.activeTarget = null;
          setIsHovered(false);
        }
      }

      // Physics interpolation: snappier when encompassing
      const lerpFactor = prefersReducedMotion ? 1 : 0.28;

      coords.ringX += (targetX - coords.ringX) * lerpFactor;
      coords.ringY += (targetY - coords.ringY) * lerpFactor;
      coords.ringW += (targetW - coords.ringW) * lerpFactor;
      coords.ringH += (targetH - coords.ringH) * lerpFactor;
      coords.ringRadius += (targetRadius - coords.ringRadius) * lerpFactor;

      // Update encompassing frame transform & bounding box
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${coords.ringX - coords.ringW / 2}px, ${coords.ringY - coords.ringH / 2}px, 0)`;
        ringRef.current.style.width = `${coords.ringW}px`;
        ringRef.current.style.height = `${coords.ringH}px`;
        ringRef.current.style.borderRadius = `${coords.ringRadius}px`;
      }

      // Micro-dot: strictly centered on mouse coordinates via translate(-50%, -50%)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${coords.mouseX}px, ${coords.mouseY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); // Run only once on mount! Never reset on click or visibility change!

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
      {/* Precision Distinguishable Cursor Dot (Dead-center geometric alignment) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
      >
        <div
          className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 ring-2 ring-cyan-400/25 ${
            isHovered
              ? 'bg-cyan-300 scale-110 shadow-[0_0_12px_rgba(6,182,212,0.95)] ring-cyan-300/40'
              : isMouseDown
              ? 'bg-cyan-200 scale-90 shadow-[0_0_8px_rgba(6,182,212,0.7)]'
              : 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
          }`}
        />
      </div>

      {/* Encompassing Element Frame: ONLY visible on hover over interactive elements (No free-floating ring) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform border transition-[opacity,border-color,background-color,box-shadow] duration-200 ${
          isHovered
            ? 'opacity-100 border-cyan-400/80 bg-cyan-400/[0.08] shadow-[0_0_15px_rgba(6,182,212,0.25)]'
            : 'opacity-0 border-transparent bg-transparent pointer-events-none'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
