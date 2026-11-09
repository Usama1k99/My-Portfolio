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
  connectedAt: number;
  releaseDuration: number;
  releaseProgress: number;
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
      radius: 100,
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

    let stationaryTime = 0; // accumulated ms of stationary cursor

    const onMouseMove = (e: MouseEvent) => {
      // If mouse moved noticeably, reset stationary timer
      const moveDist = Math.hypot(e.clientX - mouse.targetX, e.clientY - mouse.targetY);
      if (moveDist > 2) {
        stationaryTime = 0;
      }
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
      // Trigger individual organic release timings (0.3s to 0.5s) for particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          // Reset progress and randomize release duration between 300ms (0.3s) and 500ms (0.5s)
          p.releaseDuration = 300 + Math.random() * 200;
          p.releaseProgress = 1.0; // Start at full tension, decays to 0 over 0.3s - 0.5s
        }
      }
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
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: baseR,
        baseRadius: baseR,
        alpha: baseA,
        baseAlpha: baseA,
        colorType,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        orbitRadius: Math.random() * 20 + 8,
        orbitSpeed: (Math.random() - 0.5) * 0.004,
        orbitAngle: Math.random() * Math.PI * 2,
        connectedAt: -1,
        // Individualized release duration between 0.3s (300ms) and 0.5s (500ms)
        releaseDuration: 300 + Math.random() * 200,
        releaseProgress: 0,
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

    // Time-based smooth progress tracking for 1.0s pull and 0.7s release
    let lastTime = performance.now();
    let clickProgress = 0.0;

    const render = () => {
      if (isTabVisible) {
        const now = performance.now();
        const deltaMs = Math.min(50, Math.max(1, now - lastTime));
        lastTime = now;

        if (mouse.isMouseDown) {
          // Slowly pull together over exactly 1.0 second (1000ms)
          clickProgress = Math.min(1.0, clickProgress + deltaMs / 1000);
        } else {
          // Progress decays as particles release into free space
          clickProgress = Math.max(0.0, clickProgress - deltaMs / 400);
        }

        // Smooth cubic easing (smoothstep: 3x^2 - 2x^3) for organic deceleration
        const easedProgress = clickProgress * clickProgress * (3 - 2 * clickProgress);

        if (!mouse.active) {
          mouse.x = -9999;
          mouse.y = -9999;
        }

        renderCtx.clearRect(0, 0, width, height);

        // General pull radius: 100px; click radius is 0.7x (70px)
        const generalRadius = 100;
        const clickRadius = generalRadius * 0.7; // 70px
        const innerRadius = generalRadius - easedProgress * (generalRadius - clickRadius); // 100px -> 70px

        // While cursor is active and stationary, expand effective pull boundary from 1x (100px) to 2x (200px) over 10 seconds
        if (mouse.active) {
          stationaryTime = Math.min(10000, stationaryTime + deltaMs);
        } else {
          stationaryTime = 0;
        }

        const stationaryProgress = stationaryTime / 10000; // 0.0 to 1.0 over 10s
        // Maximum gravity cutoff: strictly 0 gravity beyond outerGravityRadius (which expands up to 2x generalRadius)
        const outerGravityRadius = generalRadius * (1.0 + stationaryProgress); // 100px -> 200px

        const pullSpeed = 0.16 + easedProgress * 0.04;
        const speedMult = 1.0 + easedProgress * 0.15;

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

            // Decay individual release progress (0.3s - 0.5s range)
            if (p.releaseProgress > 0) {
              p.releaseProgress = Math.max(0, p.releaseProgress - deltaMs / p.releaseDuration);
            }

            // Interactive dynamic orbital vortex around cursor center
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            // Gravity only affects particles within outerGravityRadius (strictly 0 outside)
            const isInGravityRange = dist <= outerGravityRadius && dist > 0.1 && mouse.active;
            const isHeldOrReleasing = mouse.isMouseDown || p.releaseProgress > 0;

            if (isInGravityRange && (dist <= innerRadius || isHeldOrReleasing || stationaryProgress > 0)) {
              // Calculate gradient force: 1.0 inside innerRadius, smoothly tapering to 0.0 at outerGravityRadius
              let gravityStrength = 1.0;
              if (dist > innerRadius) {
                // Smooth cosine / linear gradient between innerRadius and outerGravityRadius
                const t = (outerGravityRadius - dist) / Math.max(1, outerGravityRadius - innerRadius);
                gravityStrength = Math.max(0, Math.min(1, t));
              }

              const currentAngle = Math.atan2(dy, dx);
              const orbitDir = i % 2 === 0 ? 1 : -1;
              const orbitAngularSpeed = (0.028 + p.pulseSpeed * 0.4) * orbitDir * speedMult * gravityStrength;
              const nextAngle = currentAngle + orbitAngularSpeed;

              // Individual smooth blend: when releasing, smoothly expands back from compressed orbit into free space
              const effectiveTension = mouse.isMouseDown ? easedProgress : p.releaseProgress;
              const particleOrbitCompression = 1.0 - effectiveTension * 0.2;
              const particleMinOrbitDist = 32 - effectiveTension * 8;
              const clampedOrbitDist = Math.max(particleMinOrbitDist, dist * particleOrbitCompression);

              const orbitalTargetX = mouse.x + Math.cos(nextAngle) * clampedOrbitDist;
              const orbitalTargetY = mouse.y + Math.sin(nextAngle) * clampedOrbitDist;

              // Graceful, smooth attraction pull speed weighted by gravity gradient
              const effectivePull = pullSpeed * gravityStrength * (mouse.isMouseDown ? 1.0 : (p.releaseProgress > 0 ? effectiveTension : 0.7));
              
              // Blend towards orbital target according to gravity strength, rest follows natural path
              p.x += (orbitalTargetX - p.x) * effectivePull + (targetX - p.x) * (1 - gravityStrength) * 0.02;
              p.y += (orbitalTargetY - p.y) * effectivePull + (targetY - p.y) * (1 - gravityStrength) * 0.02;

              const force = Math.max(0, (innerRadius - dist) / innerRadius);
              p.radius = p.baseRadius * (1 + force * (0.3 + effectiveTension * 0.15));
              p.alpha = Math.min(0.9, p.baseAlpha + force * (0.3 + effectiveTension * 0.15));
            } else {
              // Strictly 0 gravity beyond outer boundary: smoothly and gracefully relaxes to wandering free space orbit
              p.x += (targetX - p.x) * 0.04;
              p.y += (targetY - p.y) * 0.04;
              p.radius += (p.baseRadius - p.radius) * 0.06;
              p.alpha += (p.baseAlpha - p.alpha) * 0.06;
            }

            p.phase += p.pulseSpeed;
          }
        }

        // 1. Particle-to-particle mesh edges: 1.5x forming radius, vibrant cyan/emerald styling matching cursor edges
        const maxMeshDist = width < 768 ? 95 : 120; // 1.5x previous radius
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxMeshDist) {
              const proximity = (maxMeshDist - dist) / maxMeshDist;
              const alpha = Math.max(0.16, proximity * 0.65);

              renderCtx.beginPath();
              renderCtx.moveTo(pi.x, pi.y);
              renderCtx.lineTo(pj.x, pj.y);

              const isEmerald = pi.colorType === 'emerald' || pj.colorType === 'emerald';
              renderCtx.strokeStyle = isEmerald
                ? `rgba(16, 185, 129, ${alpha})`
                : `rgba(6, 182, 212, ${alpha})`;
              renderCtx.lineWidth = Math.max(0.85, proximity * 1.7);
              renderCtx.stroke();
            }
          }
        }

        // 2. Cursor-to-particle connecting edges (emanating from exact center of cursor dot with 0.7s temporary formation prominence)
        // Edge connection distance expands gracefully alongside the stationary gravity field
        const connectionRadius = outerGravityRadius;
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < connectionRadius && dist > 0.1) {
              if (p.connectedAt <= 0) {
                p.connectedAt = now;
              }

              // Age of connection in milliseconds
              const ageMs = now - p.connectedAt;
              // Temporary prominent burst over ~0.7 seconds (700ms)
              const sparkProgress = Math.max(0, Math.min(1, 1 - ageMs / 700));
              const spark = sparkProgress * sparkProgress * (3 - 2 * sparkProgress);

              const proximity = (connectionRadius - dist) / connectionRadius; // 1 at center, 0 at boundary

              // Temporarily increased brightness for 0.7s
              const baseAlpha = Math.max(0.18, proximity * (0.65 + easedProgress * 0.15));
              const alpha = Math.min(1.0, baseAlpha + spark * 0.35);

              // Temporarily increased thickness for 0.7s
              const baseLineWidth = Math.max(0.9, proximity * (1.7 + easedProgress * 0.4));
              const lineWidth = baseLineWidth + spark * 1.6;

              renderCtx.beginPath();
              renderCtx.moveTo(mouse.x, mouse.y);
              renderCtx.lineTo(p.x, p.y);
              renderCtx.strokeStyle =
                p.colorType === 'emerald'
                  ? `rgba(16, 185, 129, ${alpha})`
                  : `rgba(6, 182, 212, ${alpha})`;
              renderCtx.lineWidth = lineWidth;
              renderCtx.stroke();
            } else {
              p.connectedAt = -1;
            }
          }
        } else {
          for (let i = 0; i < particles.length; i++) {
            particles[i].connectedAt = -1;
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
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleMeshCanvas;
