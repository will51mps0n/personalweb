import { useState } from "react";

const skillsStacks = [
  {
    category: "Systems Programming",
    title: "Low-Level Systems",
    description: "Threading libraries, virtual memory pagers, distributed services.",
    focus: "Resource schedulers, profiler-driven performance work, and kernel-adjacent tooling.",
    tools: ["C", "C++", "Assembly", "gdb", "POSIX", "OpenMP"],
    highlights: [
      "Multithreaded network file servers with fairness guarantees",
      "Custom LC-2K toolchain + cache/branch simulators",
    ],
    icon: SystemsIcon,
  },
  {
    category: "Machine Learning",
    title: "Applied ML & Data",
    description: "Operational analytics, computer vision, forecasting pipelines.",
    focus: "Deployable models that blend statistical rigor with production instrumentation.",
    tools: ["Python", "PyTorch", "scikit-learn", "Pandas", "OpenCV", "Snowflake"],
    highlights: [
      "Airline staffing forecasts and surge planning dashboards",
      "Biomedical CV tooling for droplet detection & angle estimation",
    ],
    icon: MLIcon,
  },
  {
    category: "Product Engineering",
    title: "Full-Stack Delivery",
    description: "SwiftUI frontends, Flask APIs, AWS infra, and product polish.",
    focus: "Shaping end-to-end products with observability, resilience, and quick iteration.",
    tools: ["SwiftUI", "React", "Flask", "PostgreSQL", "Docker", "AWS"],
    highlights: [
      "WaitFast iOS app with real-time venue telemetry",
      "Client MVPs with automated document analysis and LLM workflows",
    ],
    icon: FullStackIcon,
  },
];

const highlightTiles = [
  {
    title: "Backend & Platforms",
    body: "Experience with: C++, Python, Flask, FastAPI, PostgreSQL, AWS, Docker",
    icon: ServerIcon,
  },
  {
    title: "Frontend & UX",
    body: "Experience with: React, SwiftUI, Tailwind, Vite, Three.js",
    icon: FrontendIcon,
  },
  {
    title: "Systems & Security",
    body: "Experience with: Linux, gdb, Valgrind, OS design, threat modeling",
    icon: ShieldIcon,
  },
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStack = skillsStacks[activeIndex];

  return (
    <section id="skills" className="snap-section full-height-only skills-section">
      <div className="skills-inner" data-glitch-content>
        <header className="skills-header">
          <p className="skills-overline">Core Capabilities</p>
          <h2 className="skills-title">Skills & Tooling</h2>
        </header>

        <div className="skills-grid">
          <div className="skills-categories">
            {skillsStacks.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <button
                  key={stack.category}
                  type="button"
                  className={`skills-card ${index === activeIndex ? "active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="skills-card-icon">
                    <Icon />
                  </span>
                  <span className="skills-card-body">
                    <span className="skills-card-overline">{stack.category}</span>
                    <span className="skills-card-title">{stack.title}</span>
                    <span className="skills-card-desc">{stack.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="skills-panel">
            <div className="code-noise-panel is-active">
              <article className="code-noise-panel__content">
                <div className="code-noise-panel__inner">
                  <p className="code-noise-panel__label">{activeStack.category}</p>
                  <h3 className="code-noise-panel__title">{activeStack.title}</h3>
                  <p className="skills-focus">{activeStack.focus}</p>
                  <div className="code-noise-panel__stack">
                    <p>Tooling</p>
                    <ul>
                      {activeStack.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                  <ul className="skills-highlights-list">
                    {activeStack.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="skills-highlight-grid">
          {highlightTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div key={tile.title} className="skills-highlight-card">
                <span className="skills-highlight-icon">
                  <Icon />
                </span>
                <h3 className="skills-highlight-title">{tile.title}</h3>
                <p className="skills-highlight-body">{tile.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SystemsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="2.75" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M7 7L17 17" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L17 7" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MLIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="3.25" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <circle cx="7" cy="7" r="2.25" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <circle cx="17" cy="7" r="2.25" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <circle cx="7" cy="17" r="2.25" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <circle cx="17" cy="17" r="2.25" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M9.5 9.5L14.5 4.5M14.5 9.5L9.5 14.5M9.5 14.5L14.5 19.5M14.5 14.5L9.5 9.5" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FullStackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3.25" y="4.25" width="17.5" height="15.5" rx="1.75" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M3 7H21" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M9 19V16C9 15.1716 9.67157 14.5 10.5 14.5H13.5C14.3284 14.5 15 15.1716 15 16V19" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="6" r="0.9" fill="rgba(6, 79, 148, 0.7)" />
    <circle cx="10" cy="6" r="0.9" fill="rgba(6, 79, 148, 0.7)" />
    <circle cx="13" cy="6" r="0.9" fill="rgba(6, 79, 148, 0.7)" />
  </svg>
);

const ServerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="5" width="20" height="7" rx="1.8" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <rect x="4" y="16" width="20" height="7" rx="1.8" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <circle cx="8" cy="8.5" r="0.9" fill="rgba(6, 79, 148, 0.7)" />
    <circle cx="8" cy="19.5" r="0.9" fill="rgba(6, 79, 148, 0.7)" />
    <path d="M13 8.5H20" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 19.5H20" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FrontendIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3.5" y="5.5" width="21" height="15" rx="2.2" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M3.5 18H24.5" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" />
    <path d="M11 22.5H17" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="10" r="1" fill="rgba(6, 79, 148, 0.7)" />
    <circle cx="12" cy="10" r="1" fill="rgba(6, 79, 148, 0.7)" />
    <circle cx="15" cy="10" r="1" fill="rgba(6, 79, 148, 0.7)" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 3L6.5 6V13.5C6.5 18.5 9.9 23 14 25C18.1 23 21.5 18.5 21.5 13.5V6L14 3Z" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 14L13.2 16.2L17 11.5" stroke="rgba(6, 79, 148, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Skills;
