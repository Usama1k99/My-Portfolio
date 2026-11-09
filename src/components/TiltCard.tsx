import React, { useRef, useState, useEffect, useCallback } from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 7)
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{
    transform: string;
    glareX: number;
    glareY: number;
    isHovered: boolean;
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const updateTilt = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      glareX,
      glareY,
      isHovered: true,
    });
  }, [maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateTilt(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      isHovered: false,
    }));
  };

  // Re-evaluate and maintain hover/tilt state while page is being scrolled under stationary cursor
  useEffect(() => {
    const handleScroll = () => {
      const card = cardRef.current;
      if (!card) return;

      const mousePos = (window as unknown as { __cursorPos?: { x: number; y: number; hasMoved: boolean } }).__cursorPos;
      if (!mousePos || !mousePos.hasMoved) return;

      const rect = card.getBoundingClientRect();
      const isInside =
        mousePos.x >= rect.left &&
        mousePos.x <= rect.right &&
        mousePos.y >= rect.top &&
        mousePos.y <= rect.bottom;

      if (isInside) {
        updateTilt(mousePos.x, mousePos.y);
      } else if (style.isHovered) {
        setStyle((prev) => ({
          ...prev,
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          isHovered: false,
        }));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [style.isHovered, updateTilt]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${style.isHovered ? 'card-is-hovered' : ''} ${className}`}
      style={{
        transform: style.transform,
        transition: style.isHovered ? 'transform 0.12s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      {...rest}
    >
      {children}

      {/* Dynamic Cursor Spotlight Glare Sheen (matched to 65px glow radius) */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: style.isHovered ? 1 : 0,
            background: `radial-gradient(circle 65px at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.06), transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default TiltCard;

