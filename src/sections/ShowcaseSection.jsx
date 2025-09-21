// src/sections/ShowcaseSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import CodeNoisePanel from "../components/CodeNoisePanel";

const GITHUB_BASE = "https://github.com/will51mps0n"; // <-- change this once

const pad = (n) => String(n).padStart(2, "0");

const PROJECT_DETAILS = {
  "Power Outage Prediction": {
    summary: [
      "Regressed outage cost using engineered weather + grid telemetry features",
      "Trained tuned random forests with cross-validated hyperparameter sweeps",
      "Packaged reports with interpretable plots for utility stakeholders",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Feature Engineering"],
  },
  "Stock Prediction Pipeline": {
    summary: [
      "Orchestrated end-to-end stock ETL with live scraping and indicator creation",
      "Benchmarked LSTM, linear, and tree-based models with walk-forward tests",
      "Automated forecast publishing to a lightweight analytics dashboard",
    ],
    stack: ["Python", "Time Series", "APIs", "LSTM"],
  },
  "Market Indicator Analysis": {
    summary: [
      "Mapped macro indicators to leading/lagging behaviors across markets",
      "Ran PCA and cointegration studies to isolate durable trading signals",
      "Documented findings with polished research notebooks and visuals",
    ],
    stack: ["Python", "NumPy", "Matplotlib", "Statsmodels"],
  },
  "AlphaZero Othello": {
    summary: [
      "Trained an AlphaZero-style agent with self-play and MCTS on 8x8 boards",
      "Batched GPU inference to accelerate thousands of rollouts per update",
      "Surpassed handcrafted heuristics after ~200k competitive games",
    ],
    stack: ["Python", "PyTorch", "Reinforcement Learning", "MCTS"],
  },
  "CIFAR-10 Classifier": {
    summary: [
      "Compared CNN architectures with grid-searched depth and augmentation",
      "Hit 92%+ accuracy on CIFAR-10 using scheduled LR and mixup",
      "Logged experiments and exports through W&B for reproducibility",
    ],
    stack: ["PyTorch", "CNN", "Hyperparameter Tuning", "Weights & Biases"],
  },
  "Connect Four AI": {
    summary: [
      "Engineered a perfect-play agent via minimax and alpha-beta pruning",
      "Crafted heuristic board scoring to speed mid-game evaluation",
      "Bundled a playable UI so users can spar against the solver",
    ],
    stack: ["Python", "AI Search", "Game Theory", "Pygame"],
  },
  "Multithreaded File Server": {
    summary: [
      "Served hierarchical files over TCP with concurrent client handling",
      "Guaranteed crash consistency using atomic writes and RAII guarded locks",
      "Stress-tested thread-safe I/O paths under sustained parallel load",
    ],
    stack: ["C++", "Multithreading", "Boost", "Socket Programming"],
  },
  "Virtual Memory Pager": {
    summary: [
      "Simulated OS paging with copy-on-write, protection bits, and eviction",
      "Implemented clock-based replacement alongside FIFO/LRU comparisons",
      "Analyzed page-fault behavior across synthetic workloads",
    ],
    stack: ["C++", "Virtual Memory", "Clock Algorithm", "MMU Simulation"],
  },
  "Custom Thread Library": {
    summary: [
      "Built user-level threads with ucontext and cooperative scheduling",
      "Added mutex and condition variable primitives for synchronization",
      "Benchmarked context switches against pthread baselines",
    ],
    stack: ["C", "ucontext", "Thread Scheduling", "Mutexes"],
  },
  "LC-2K Assembler & Pipeline": {
    summary: [
      "Authored an assembler and five-stage pipeline simulator for LC-2K",
      "Modeled hazards with forwarding, stalling, and precise state tracing",
      "Generated compatible traces for automated grading harnesses",
    ],
    stack: ["C", "Assembler", "Pipeline Simulation", "Systems"],
  },
  "LC-2K Cache Simulator": {
    summary: [
      "Implemented parameterized caches with configurable sets and blocks",
      "Tracked hit/miss metrics across varied memory access workloads",
      "Evaluated LRU and alternative eviction strategies for teaching labs",
    ],
    stack: ["C", "Cache Simulation", "LRU", "Performance Analysis"],
  },
  "Traveling Salesman Solver": {
    summary: [
      "Blended MST heuristics, nearest insertion, and branch-and-bound search",
      "Scripted 2-opt refinements to tighten tour quality on TSPLIB sets",
      "Automated batch experimentation with Bash tooling",
    ],
    stack: ["C++", "Algorithms", "Heuristics", "TSPLIB"],
  },
  "WaitFast iOS": {
    summary: [
      "Delivered an iOS app crowdsourcing real-time venue wait times",
      "Backed by Flask APIs, PostgreSQL, and AWS-hosted services",
      "Piloted the experience through TestFlight for campus users",
    ],
    stack: ["SwiftUI", "Flask", "PostgreSQL", "AWS"],
  },
  "Michigan Medicine": {
    summary: [
      "Analyzed surgical scheduling throughput with predictive analytics",
      "Modeled bottlenecks using probabilistic queuing theory",
      "Shipped clinician-facing dashboards to guide rollout decisions",
    ],
    stack: ["Python", "Operations Research", "Dashboards", "Pandas"],
  },
  "American Airlines": {
    summary: [
      "Forecasted hub staffing using disruption, weather, and crew feeds",
      "Trained gradient boosting models deployed on internal pipelines",
      "Helped operations teams smooth daily scheduling variability",
    ],
    stack: ["Python", "Gradient Boosting", "Airflow", "AWS"],
  },
};

export default function AppShowcase() {
  const sectionRef = useRef(null);

  // The item that stays selected (drives the top counter & underline)
  const [activeIndex, setActiveIndex] = useState(1); // 1-based

  // Only used to control the “muffle the others” effect while the pointer is inside the list
  const [isPointerInList, setIsPointerInList] = useState(false);

  const projects = useMemo(() => {
    const base = [
      { title: "Power Outage Prediction", href: `${GITHUB_BASE}/Power-Outage-Analysis`, img: "" },
      { title: "Stock Prediction Pipeline", href: `${GITHUB_BASE}/Stock-Prediction-Pipeline`, img: "" },
      { title: "Market Indicator Analysis", href: `${GITHUB_BASE}/Market-Indicator-Analysis`, img: "" },
      { title: "AlphaZero Othello", href: `${GITHUB_BASE}/Othello-AG0`, img: "" },
      { title: "CIFAR-10 Classifier", href: `${GITHUB_BASE}/Image-CNN`, img: "" },
      { title: "Connect Four AI", href: `${GITHUB_BASE}/Connect-Four-AI`, img: "" },
      { title: "Multithreaded File Server", href: `${GITHUB_BASE}/Networked-Fs-Cpp`, img: "" },
      { title: "Virtual Memory Pager", href: `${GITHUB_BASE}/MemoryManager-VM-OSPager`, img: "" },
      { title: "Custom Thread Library", href: `${GITHUB_BASE}/Concurrency-Lib`, img: "" },
      { title: "LC-2K Assembler & Pipeline", href: `${GITHUB_BASE}/Assembler-and-Simulator`, img: "" },
      { title: "LC-2K Cache Simulator", href: `${GITHUB_BASE}/Cache-Simulator`, img: "" },
      { title: "Traveling Salesman Solver", href: `${GITHUB_BASE}/TSP`, img: "" },
      { title: "WaitFast iOS", href: "#waitfast", img: "" },
      { title: "Michigan Medicine", href: "#experience", img: "" },
      { title: "American Airlines", href: "#experience", img: "" },
    ];

    return base.map((item) => ({
      ...item,
      ...(PROJECT_DETAILS[item.title] || {}),
    }));
  }, []);

  const total = projects.length;

  const activeProject = projects[activeIndex - 1] || null;
  const showDetails = isPointerInList;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("projectCounterChange", {
      detail: {
        current: activeIndex,
        total,
      }
    }));

    return () => {
      window.dispatchEvent(new CustomEvent("projectCounterChange", { detail: null }));
    };
  }, [activeIndex, total]);

  return (
    <section id="work" data-title="Projects" ref={sectionRef} className="work-section ref-wrap">
      <div className="ref-body">
        {/* LEFT: list */}
        <ol
          className="ref-list"
          data-hover={isPointerInList ? "true" : "false"}
          onMouseEnter={() => setIsPointerInList(true)}
          onMouseLeave={() => setIsPointerInList(false)}
        >
          {projects.map((p, i) => {
            const idx = i + 1;
            const isActive = idx === activeIndex;
            return (
              <li
                key={idx}
                className={isActive ? "is-active" : ""}
                onMouseEnter={() => setActiveIndex(idx)}    // set, but never clear on leave
                onFocus={() => {
                  setActiveIndex(idx);
                  setIsPointerInList(true);
                }}         // keyboard focus also sets it
                onBlur={({ currentTarget }) => {
                  if (!currentTarget?.parentNode?.contains(document.activeElement)) {
                    setIsPointerInList(false);
                  }
                }}
                data-glitch-content
              >
                <span className="num">{pad(idx)}</span>
                <a className="ref-link" href={p.href} title={p.title} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {p.title}
                </a>
              </li>
            );
          })}
        </ol>

        {/* RIGHT: sticky media viewer (can swap to image for activeIndex later) */}
        <aside className="ref-media" data-glitch-content>
          <div className="ref-media-frame">
            <CodeNoisePanel project={showDetails ? activeProject : null} />
          </div>
        </aside>
      </div>
    </section>
  );
}
