import React, { useEffect, useRef } from 'react';

interface ParticleMeshProps {
  particleCount?: number;
  glowColor?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  colorType: 'cyan' | 'emerald' | 'slate';
  phase: number;
  pulseSpeed: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

export const ParticleMeshCanvas: React.FC<ParticleMeshProps> = ({
  particleCount = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const renderCtx: CanvasRenderingContext2D = ctx;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Interactive mouse state with direct tracking for edge connections
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: 75,
      glowRadius: 75,
      active: false,
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      renderCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    const effectiveCount = width < 768 ? Math.floor(particleCount * 0.5) : particleCount;

    // Create particles with diverse depth and harmonic orbits
    const particles: Particle[] = Array.from({ length: effectiveCount }, () => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const baseR = Math.random() * 1.5 + 0.6; // 0.6px to 2.1px depth
      const baseA = Math.random() * 0.45 + 0.2; // 0.2 to 0.65 opacity

      // 45% cyan, 40% emerald, 15% slate silver
      const randColor = Math.random();
      const colorType: 'cyan' | 'emerald' | 'slate' =
        randColor < 0.45 ? 'cyan' : randColor < 0.85 ? 'emerald' : 'slate';

      return {
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: baseR,
        baseRadius: baseR,
        alpha: baseA,
        baseAlpha: baseA,
        colorType,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        orbitRadius: Math.random() * 25 + 10,
        orbitSpeed: (Math.random() - 0.5) * 0.012,
        orbitAngle: Math.random() * Math.PI * 2,
      };
    });

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const getColorString = (type: 'cyan' | 'emerald' | 'slate', alpha: number) => {
      switch (type) {
        case 'cyan':
          return `rgba(6, 182, 212, ${alpha})`;
        case 'emerald':
          return `rgba(16, 185, 129, ${alpha})`;
        case 'slate':
        default:
          return `rgba(148, 163, 184, ${alpha})`;
      }
    };

    const render = () => {
      if (isTabVisible) {
        if (!mouse.active) {
          mouse.x = -9999;
          mouse.y = -9999;
        }

        renderCtx.clearRect(0, 0, width, height);

        // Subtle ambient cursor luminescence
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          const radialGlow = renderCtx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            mouse.glowRadius
          );
          radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
          radialGlow.addColorStop(0.6, 'rgba(16, 185, 129, 0.015)');
          radialGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
          renderCtx.fillStyle = radialGlow;
          renderCtx.beginPath();
          renderCtx.arc(mouse.x, mouse.y, mouse.glowRadius, 0, Math.PI * 2);
          renderCtx.fill();
        }

        // Update particles physics and orbital vortex
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!prefersReducedMotion) {
            p.orbitAngle += p.orbitSpeed;
            p.originX += p.vx;
            p.originY += p.vy;

            // Screen boundary wraparound
            if (p.originX < -30) p.originX = width + 30;
            else if (p.originX > width + 30) p.originX = -30;
            if (p.originY < -30) p.originY = height + 30;
            else if (p.originY > height + 30) p.originY = -30;

            const targetX = p.originX + Math.cos(p.orbitAngle) * p.orbitRadius;
            const targetY = p.originY + Math.sin(p.orbitAngle) * p.orbitRadius;

            // Interactive dynamic orbital vortex around cursor (revolves when stationary)
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius && dist > 0.1 && mouse.active) {
              const force = (mouse.radius - dist) / mouse.radius; // 0 to 1
              const currentAngle = Math.atan2(dy, dx);
              // Orbit speed variation with alternating direction for organic depth
              const orbitDir = i % 2 === 0 ? 1 : -1;
              const orbitAngularSpeed = (0.028 + p.pulseSpeed * 0.4) * orbitDir;
              const nextAngle = currentAngle + orbitAngularSpeed;

              // Retain comfortable orbit distance within the radius zone
              const clampedOrbitDist = Math.max(18, dist);
              const orbitalTargetX = mouse.x + Math.cos(nextAngle) * clampedOrbitDist;
              const orbitalTargetY = mouse.y + Math.sin(nextAngle) * clampedOrbitDist;

              // Smoothly blend toward orbital path
              p.x += (orbitalTargetX - p.x) * 0.22;
              p.y += (orbitalTargetY - p.y) * 0.22;

              p.radius = p.baseRadius * (1 + force * 0.3);
              p.alpha = Math.min(0.85, p.baseAlpha + force * 0.3);
            } else {
              // Gentle spring relaxation back to natural wandering orbit
              p.x += (targetX - p.x) * 0.045;
              p.y += (targetY - p.y) * 0.045;
              p.radius += (p.baseRadius - p.radius) * 0.06;
              p.alpha += (p.baseAlpha - p.alpha) * 0.06;
            }

            p.phase += p.pulseSpeed;
          }
        }

        // Draw connecting edges from cursor dot to surrounding particles within range
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius && dist > 0.1) {
              const proximity = (mouse.radius - dist) / mouse.radius; // 1 at center, 0 at boundary
              const alpha = Math.max(0.08, proximity * 0.6);

              renderCtx.beginPath();
              renderCtx.moveTo(mouse.x, mouse.y);
              renderCtx.lineTo(p.x, p.y);
              renderCtx.strokeStyle =
                p.colorType === 'emerald'
                  ? `rgba(16, 185, 129, ${alpha})`
                  : `rgba(6, 182, 212, ${alpha})`;
              renderCtx.lineWidth = Math.max(0.65, proximity * 1.5);
              renderCtx.stroke();
            }
          }
        }

        // Render individual particle nodes
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const currentAlpha = Math.max(
            0.1,
            Math.min(1, p.alpha + Math.sin(p.phase) * 0.12)
          );

          renderCtx.beginPath();
          renderCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          renderCtx.fillStyle = getColorString(p.colorType, currentAlpha);
          renderCtx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[30]"
      aria-hidden="true"
    />
  );
};

export default ParticleMeshCanvas;
