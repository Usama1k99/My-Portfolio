import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      setVisible(scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title={`Back to top (${Math.round(scrollProgress)}% scrolled)`}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg shadow-slate-950/60 transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-950/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Circular SVG Scroll Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          strokeWidth="2.5"
          className="stroke-slate-800"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-cyan-400 transition-all duration-100 ease-out"
          fill="none"
        />
      </svg>

      {/* Up Arrow Icon */}
      <ArrowUp
        size={17}
        className="text-slate-300 group-hover:text-cyan-400 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </button>
  );
};

export default BackToTop;
