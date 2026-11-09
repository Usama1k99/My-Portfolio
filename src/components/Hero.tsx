import React from 'react';
import { Building2, MapPin, CheckCircle2, ShieldCheck, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { TypewriterHeadline } from './TypewriterHeadline';
import mePhoto from '../assets/me.png';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            {/* Minimalist Authentic Developer Status Indicator (Anti-AI) */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 mb-6 shadow-inner tracking-tight">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 ring-4 ring-cyan-500/10"></span>
              <span className="text-slate-500 font-normal">role //</span>
              <span className="text-slate-200 font-medium">ServiceNow Developer</span>
              <span className="text-slate-600">@</span>
              <span className="text-cyan-400 font-medium">Cynosure Technologies</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              {personal.name}
            </h1>

            {/* Typewriter headline with caret */}
            <div className="mb-4 min-h-[2rem]">
              <TypewriterHeadline />
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm mb-8 font-mono">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/30 border border-indigo-900/40 text-indigo-300 shadow-sm">
                <Building2 size={15} className="text-indigo-400" />
                <span>Cynosure Technologies</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/30 border border-emerald-900/40 text-emerald-300 shadow-sm">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>CIS-DF Certified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/30 border border-cyan-900/40 text-cyan-300 shadow-sm">
                <CheckCircle2 size={15} className="text-cyan-400" />
                <span>{personal.experienceYears} Experience</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 shadow-sm">
                <MapPin size={15} className="text-slate-500" />
                <span>{personal.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-cyan-950/40 hover:shadow-cyan-950/70 hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://github.com/Usama1k99"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm font-medium hover:border-slate-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm font-medium hover:border-slate-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                aria-label="Send Email"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 bg-slate-900 shadow-xl shadow-slate-950/60 group">
              <img
                src={mePhoto}
                alt="Syed Usama"
                className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
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
