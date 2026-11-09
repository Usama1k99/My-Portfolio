import React, { useState } from 'react';
import { Github, ExternalLink, Lock, ShieldCheck, Terminal, Binary, FileCode } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const { projects } = portfolioData;

  const categories = ['All', 'Web Engineering', 'Desktop App', 'Backend / Bot', 'Systems / C++'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  const getCategoryIcon = (category: ProjectItem['category']) => {
    switch (category) {
      case 'Web Engineering':
        return <FileCode size={16} className="text-emerald-400" />;
      case 'Desktop App':
        return <Lock size={16} className="text-indigo-400" />;
      case 'Backend / Bot':
        return <Terminal size={16} className="text-sky-400" />;
      case 'Systems / C++':
        return <Binary size={16} className="text-purple-400" />;
      default:
        return <ShieldCheck size={16} className="text-slate-400" />;
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
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <span className="text-xs font-mono text-slate-400">{project.category}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400/90 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {project.language}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  {project.technicalDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-emerald-500 mt-0.5">•</span>
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
                      className="px-2 py-0.5 rounded text-xs font-mono bg-slate-950 border border-slate-800 text-slate-400"
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
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={15} />
                    <span>Source Code</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <span>Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
