import React from 'react';
import ParticleMeshCanvas from './components/ParticleMeshCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { portfolioData } from './data/portfolioData';
import {
  Briefcase,
  ShieldCheck,
  Award,
  Cpu,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';

export const App: React.FC = () => {
  const { experience, certifications, education, skills, personal } = portfolioData;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 60 FPS HTML5 Canvas 2D Kinetic Particle Field & Magnetic Vortex */}
      <ParticleMeshCanvas particleCount={220} />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />

        {/* Professional Experience Section */}
        <section id="experience" className="py-16 md:py-24 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Briefcase size={20} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Professional Experience
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-mono mt-0.5">
                  Enterprise ServiceNow engineering &amp; data architecture
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mt-1">
                        <span>{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                        <Calendar size={13} className="text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Education Section */}
        <section id="certifications" className="py-16 md:py-24 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mainline Certification */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Certifications
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">
                      Official ServiceNow credentials
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          {cert.code}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Issuer: {cert.issuer}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{cert.fullName}</h3>
                      <div className="space-y-1.5 mt-4">
                        {cert.skillsCovered.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="text-emerald-400">•</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Award size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Education
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">
                      Academic foundation &amp; degree
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                          Graduated {edu.completionYear}
                        </span>
                        <span className="text-xs font-mono text-emerald-400">{edu.status}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <p className="text-sm text-slate-400 font-mono mt-0.5">{edu.field}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {edu.institution}, {edu.location}
                      </p>
                      <div className="space-y-1.5 mt-4">
                        {edu.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="text-indigo-400">•</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <Projects />

        {/* Technical Skills Section */}
        <section id="skills" className="py-16 md:py-24 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Cpu size={20} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Technical Competencies
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-mono mt-0.5">
                  Platform architecture, frontend engineering, and backend systems
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{cat.category}</h3>
                  <p className="text-xs font-mono text-slate-400 mb-5">{cat.description}</p>
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-sm">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 mb-6">
                <Terminal size={24} />
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Let's Build Reliable Software
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Open to discussions regarding ServiceNow architecture, CMDB governance, enterprise workflow engineering, and high-performance software projects.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-slate-950 font-medium text-sm hover:bg-emerald-400 transition-colors shadow-sm"
                >
                  <Mail size={16} />
                  <span>{personal.email}</span>
                </a>

                <a
                  href="https://github.com/Usama1k99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 text-sm font-medium hover:border-slate-600 hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                  <ExternalLink size={14} className="text-slate-400" />
                </a>

                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-800/60 bg-slate-900/40 text-slate-500 text-sm font-medium cursor-not-allowed opacity-60"
                  title="LinkedIn (Temporarily disabled)"
                  aria-label="LinkedIn Profile (Disabled)"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Soon</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Syed Usama. All rights reserved.</p>
          <p>Engineered with Vite, React, TypeScript, Tailwind CSS &amp; HTML5 Canvas 2D</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
