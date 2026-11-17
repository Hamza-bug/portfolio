"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

import { personalProfile, type ProjectItem } from "@/data/site";

const previewMap: Record<ProjectItem["preview"], { label: string; bars: number[] }> = {
  warehouse: { label: "Warehouse Ops", bars: [28, 44, 60, 52, 80, 68, 92] },
  mobile: { label: "Vehicle Flow", bars: [18, 36, 48, 64, 76, 58, 88] },
  inventory: { label: "Part Catalog", bars: [20, 42, 55, 72, 62, 84, 94] },
  pos: { label: "POS Console", bars: [32, 54, 70, 60, 82, 76, 90] },
  guard: { label: "Access Control", bars: [26, 40, 64, 52, 74, 82, 96] },
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" data-reveal className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#9fcaf7]">Portfolio</p>
          <h2 className="mt-5 text-3xl font-medium uppercase tracking-[-0.05em] text-white md:text-5xl">
            SELECTED WORK
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            A collection of products and digital solutions I have worked on.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {personalProfile.projects.map((project, index) => {
            const preview = previewMap[project.preview];

            return (
              <article
                key={project.name}
                className="group project-card overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(12,15,22,0.9)] shadow-[0_22px_60px_rgba(5,7,16,0.42)] transition duration-300 hover:-translate-y-1 hover:border-[#a4d1ff]/30 hover:bg-[rgba(16,19,25,0.96)]"
              >
                <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${project.accent}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),transparent_35%)]" />
                  <div className="absolute inset-6 rounded-[24px] border border-white/10 bg-[rgba(8,12,19,0.36)] p-5 backdrop-blur-sm">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.32em] text-slate-200">
                        <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                        <span>{project.category}</span>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-[26px] font-medium uppercase tracking-[-0.06em] text-white">{project.name}</div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technology.slice(0, 3).map((item) => (
                              <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-slate-200">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex h-20 items-end gap-1.5 rounded-xl border border-white/10 bg-black/15 p-2">
                          {preview.bars.map((value, barIndex) => (
                            <span
                              key={`${project.name}-${barIndex}`}
                              className="block w-2 rounded-full bg-white/80"
                              style={{ height: `${value}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{project.category}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white transition hover:border-[#9ccfff]/40 hover:bg-[#9ccfff]/10"
                    >
                      View Details
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <p className="text-sm leading-7 text-slate-300">{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#0b1017] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.6)] md:p-8">
            <button
              type="button"
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div className={`relative h-56 overflow-hidden rounded-[22px] bg-gradient-to-br ${selectedProject.accent}`}>
              <div className="absolute inset-4 rounded-[18px] border border-white/10 bg-[rgba(8,12,19,0.42)] p-5 backdrop-blur-sm">
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[9px] uppercase tracking-[0.34em] text-slate-200">{selectedProject.category}</span>
                  <div className="text-[30px] font-medium uppercase tracking-[-0.06em] text-white">{selectedProject.name}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.technology.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-slate-200">
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 text-base leading-8 text-slate-300">{selectedProject.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {selectedProject.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
