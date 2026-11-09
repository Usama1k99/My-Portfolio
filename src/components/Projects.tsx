import React, { useState } from 'react';
import { Github, ExternalLink, Lock, ShieldCheck, Terminal, Binary, FileCode } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { TiltCard } from './TiltCard';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const { projects } = portfolioData;

  const categories = ['All', 'Desktop App', 'Web Engineering', 'Backend / Bot', 'Systems / C++'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  const getCategoryStyles = (category: ProjectItem['category']) => {
    switch (category) {
      case 'Desktop App':
        return {
          icon: <Lock size={16} className="text-cyan-400" />,
          badge: 'text-cyan-300 bg-cyan-950/40 border-cyan-900/50',
          accentBorder: 'group-hover:via-cyan-400/70',
          bulletColor: 'text-cyan-400',
        };
      case 'Web Engineering':
        return {
          icon: <FileCode size={16} className="text-emerald-400" />,
          badge: 'text-emerald-300 bg-emerald-950/40 border-emerald-900/50',
          accentBorder: 'group-hover:via-emerald-400/70',
          bulletColor: 'text-emerald-400',
        };
      case 'Backend / Bot':
        return {
          icon: <Terminal size={16} className="text-sky-400" />,
          badge: 'text-sky-300 bg-sky-950/40 border-sky-900/50',
          accentBorder: 'group-hover:via-sky-400/70',
          bulletColor: 'text-sky-400',
        };
      case 'Systems / C++':
        return {
          icon: <Binary size={16} className="text-teal-400" />,
          badge: 'text-teal-300 bg-teal-950/40 border-teal-900/50',
          accentBorder: 'group-hover:via-teal-400/70',
          bulletColor: 'text-teal-400',
        };
      default:
        return {
          icon: <ShieldCheck size={16} className="text-slate-400" />,
          badge: 'text-slate-300 bg-slate-900 border-slate-800',
          accentBorder: 'group-hover:via-cyan-400/70',
          bulletColor: 'text-cyan-400',
        };
    }
  };

  return (
    <section id="projects" className="relative z-10 py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Engineering Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Authentic software systems, desktop security tools, and cryptographic implementations built from scratch.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 ${
                  filter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const styles = getCategoryStyles(project.category);

            return (
              <TiltCard
                key={project.id}
                maxTilt={6.5}
                className="relative flex flex-col justify-between p-6 rounded-xl border border-slate-800/90 bg-slate-900/85 backdrop-blur-[5px] card-blur-5px hover:border-slate-700/80 hover:bg-slate-900/95 hover:shadow-2xl hover:shadow-slate-950/80 transition-all duration-300 group overflow-hidden"
              >
                {/* Subtle top border glow on card hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent ${styles.accentBorder} transition-all duration-500`}
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      {styles.icon}
                      <span className="text-xs font-mono text-slate-400">{project.category}</span>
                    </div>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${styles.badge}`}>
                      {project.language}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors duration-200 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {project.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className={`${styles.bulletColor} mt-0.5 flex-shrink-0`}>•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/80 border border-slate-800/90 text-slate-400 group-hover:border-slate-700/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors group/link"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github size={15} className="group-hover/link:text-cyan-400 transition-colors" />
                      <span>Source Code</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group/demo"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <span>Demo</span>
                        <ExternalLink size={14} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
