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

    // Interactive mouse state with direct tracking and click gravity
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: 80,
      active: false,
      isMouseDown: false,
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

    const onMouseDown = () => {
      mouse.isMouseDown = true;
    };

    const onMouseUp = () => {
      mouse.isMouseDown = false;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
      mouse.isMouseDown = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
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

        // Dynamic gravity parameters
        const currentRadius = mouse.isMouseDown ? 150 : 80;
        const minOrbitDist = mouse.isMouseDown ? 6 : 18;

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

            // Interactive dynamic orbital vortex around cursor (with click gravity)
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < currentRadius && dist > 0.1 && mouse.active) {
              const force = (currentRadius - dist) / currentRadius; // 0 to 1
              const currentAngle = Math.atan2(dy, dx);
              const orbitDir = i % 2 === 0 ? 1 : -1;
              const speedMult = mouse.isMouseDown ? 1.6 : 1.0;
              const orbitAngularSpeed = (0.028 + p.pulseSpeed * 0.4) * orbitDir * speedMult;
              const nextAngle = currentAngle + orbitAngularSpeed;

              // On click: closer particles get pulled even closer to the dot
              const orbitCompression = mouse.isMouseDown ? 0.45 : 1.0;
              const clampedOrbitDist = Math.max(minOrbitDist, dist * orbitCompression);

              const orbitalTargetX = mouse.x + Math.cos(nextAngle) * clampedOrbitDist;
              const orbitalTargetY = mouse.y + Math.sin(nextAngle) * clampedOrbitDist;

              // Faster attraction pull speed on click
              const pullSpeed = mouse.isMouseDown ? 0.38 : 0.22;
              p.x += (orbitalTargetX - p.x) * pullSpeed;
              p.y += (orbitalTargetY - p.y) * pullSpeed;

              p.radius = p.baseRadius * (1 + force * (mouse.isMouseDown ? 0.5 : 0.3));
              p.alpha = Math.min(0.9, p.baseAlpha + force * (mouse.isMouseDown ? 0.45 : 0.3));
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

        // 1. Render subtle ambient particle-to-particle mesh edges (subtler default edges)
        const maxMeshDist = width < 768 ? 65 : 80;
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxMeshDist) {
              const proximity = (maxMeshDist - dist) / maxMeshDist;
              const alpha = proximity * 0.12;

              renderCtx.beginPath();
              renderCtx.moveTo(pi.x, pi.y);
              renderCtx.lineTo(pj.x, pj.y);
              renderCtx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
              renderCtx.lineWidth = 0.55;
              renderCtx.stroke();
            }
          }
        }

        // 2. Render prominent cursor-to-particle connecting edges (visibly more prominent than default)
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < currentRadius && dist > 0.1) {
              const proximity = (currentRadius - dist) / currentRadius; // 1 at center, 0 at boundary
              const alpha = Math.max(0.18, proximity * (mouse.isMouseDown ? 0.85 : 0.65));

              renderCtx.beginPath();
              renderCtx.moveTo(mouse.x, mouse.y);
              renderCtx.lineTo(p.x, p.y);
              renderCtx.strokeStyle =
                p.colorType === 'emerald'
                  ? `rgba(16, 185, 129, ${alpha})`
                  : `rgba(6, 182, 212, ${alpha})`;
              renderCtx.lineWidth = Math.max(0.85, proximity * (mouse.isMouseDown ? 2.2 : 1.7));
              renderCtx.stroke();
            }
          }
        }

        // 3. Render individual particle nodes
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
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
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
