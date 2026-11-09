import React from 'react';
import { Building2, MapPin, CheckCircle2, ShieldCheck, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import mePhoto from '../assets/me.png';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active ServiceNow Developer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              {personal.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-emerald-400 font-mono mb-4">
              {personal.headline}
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-400 mb-8 font-mono">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <Building2 size={15} className="text-indigo-400" />
                <span>Cynosure Technologies</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>CIS-DF Certified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <MapPin size={15} className="text-slate-400" />
                <span>{personal.location}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>{personal.experienceYears} Experience</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-medium text-sm hover:bg-emerald-400 transition-colors shadow-sm"
              >
                <span>View Projects</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://github.com/Usama1k99"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm font-medium hover:border-slate-600 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>

              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800/60 bg-slate-900/40 text-slate-500 text-sm font-medium cursor-not-allowed opacity-60"
                title="LinkedIn (Temporarily disabled)"
                aria-label="LinkedIn Profile (Disabled)"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Soon</span>
              </button>

              <a
                href="mailto:usama1k999@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm font-medium hover:border-slate-600 hover:text-white transition-colors"
                aria-label="Send Email"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-xl">
              <img
                src={mePhoto}
                alt="Syed Usama"
                className="w-full h-full object-cover object-center filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
