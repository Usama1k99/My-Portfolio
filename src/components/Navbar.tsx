import React, { useState } from 'react';
import { Terminal, FileDown, Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 text-slate-100 hover:text-cyan-400 transition-colors">
            <Terminal className="text-cyan-400" size={20} />
            <span className="font-mono font-semibold tracking-tight text-sm sm:text-base">
              syed-usama<span className="text-cyan-400">.dev</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={portfolioData.personal.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-900/90 text-xs font-mono font-medium text-slate-200 hover:border-cyan-500/50 hover:text-white transition-all shadow-sm"
            >
              <FileDown size={14} className="text-cyan-400" />
              <span>Resume PDF</span>
            </a>
          </nav>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded text-sm text-slate-300 hover:text-white hover:bg-slate-800/40"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={portfolioData.personal.resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded border border-slate-700 bg-slate-900 text-sm font-medium text-slate-200 hover:text-white"
              >
                <FileDown size={16} className="text-emerald-400" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
