// src/sections/ShowcaseSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import CodeNoisePanel from "../components/CodeNoisePanel";

const GITHUB_BASE = "https://github.com/will51mps0n"; // <-- change this once

const pad = (n) => String(n).padStart(2, "0");

const PROJECT_DETAILS = {
  "Power Outage Prediction": {
    summary: [
      "Predicts regional outage risk from weather and grid telemetry",
      "Blends gradient boosting with interpretability dashboards",
      "Automates feature refresh and dataset versioning",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Weights & Biases"],
  },
  "Stock Prediction Pipeline": {
    summary: [
      "Builds streaming ETL for equities fundamentals and sentiment",
      "Trains ensemble regressors with walk-forward validation",
      "Ships daily forecasts into a lightweight dashboard",
    ],
    stack: ["Python", "Airflow", "PostgreSQL", "XGBoost"],
  },
  "Market Indicator Analysis": {
    summary: [
      "Correlates macro indicators with leading/lagging behavior",
      "Runs PCA and cointegration testing for signal selection",
      "Produces research-ready notebooks with visual overlays",
    ],
    stack: ["Python", "NumPy", "Matplotlib", "Statsmodels"],
  },
  "AlphaZero Othello": {
    summary: [
      "Implements AlphaZero self-play for 8x8 Othello",
      "Optimizes MCTS rollout with batched GPU inference",
      "Beats handcrafted heuristics after ~200k games",
    ],
    stack: ["Python", "PyTorch", "CUDA", "NumPy"],
  },
  "CIFAR-10 Classifier": {
    summary: [
      "Designs residual CNN with mixup and cosine LR warmups",
      "Achieves >92% top-1 accuracy on CIFAR-10",
      "Exports model with ONNX runtime benchmarks",
    ],
    stack: ["PyTorch", "TorchVision", "Weights & Biases"],
  },
  "Connect Four AI": {
    summary: [
      "Combines minimax + alpha-beta pruning for perfect play",
      "Adds heuristic scoring for mid-game board states",
      "Ships with CLI and web playground modes",
    ],
    stack: ["Python", "TypeScript", "React", "WebSockets"],
  },
  "Multithreaded File Server": {
    summary: [
      "Implements epoll-backed file sharing server in C++",
      "Supports streaming uploads with zero-copy buffers",
      "Includes soak tests and perf traces under load",
    ],
    stack: ["C++", "pthread", "asio", "gRPC"],
  },
  "Virtual Memory Pager": {
    summary: [
      "Simulates OS pager with FIFO, LRU, and Clock policies",
      "Benchmarks page faults across workloads",
      "Visualizes frame residency over time",
    ],
    stack: ["C", "Python", "Matplotlib"],
  },
  "Custom Thread Library": {
    summary: [
      "Builds user-level threads on top of setcontext",
      "Implements cooperative scheduler with mutex/condvars",
      "Achieves 6x faster context switches vs POSIX threads",
    ],
    stack: ["C", "Valgrind", "gdb"],
  },
  "LC-2K Assembler & Pipeline": {
    summary: [
      "Creates assembler + 5-stage pipeline simulator",
      "Models hazards with forwarding and stall logic",
      "Exports trace files for course autograder",
    ],
    stack: ["C", "LC-2K", "Pipeline Simulation"],
  },
  "LC-2K Cache Simulator": {
    summary: [
      "Evaluates cache replacement and associativity policies",
      "Plots miss curves across benchmark suite",
      "Provides modular hooks for new policy experiments",
    ],
    stack: ["C", "Python", "Cache Simulation"],
  },
  "Traveling Salesman Solver": {
    summary: [
      "Combines branch-and-bound with 2-opt refinements",
      "Parallelizes search with work stealing",
      "Delivers 98% optimal tours on TSPLIB medium sets",
    ],
    stack: ["C++", "OpenMP", "TSPLIB"],
  },
  "WaitFast iOS": {
    summary: [
      "Pushes live restaurant wait times to SwiftUI clients",
      "Leverages Flask + Postgres with geofenced updates",
      "Shipped to iOS TestFlight for campus pilots",
    ],
    stack: ["SwiftUI", "Flask", "PostgreSQL", "AWS"],
  },
  "Michigan Medicine": {
    summary: [
      "Predictive analytics for surgical scheduling throughput",
      "Identified friction points with probabilistic queuing",
      "Partnered with clinicians on rollout dashboards",
    ],
    stack: ["Python", "Pandas", "Plotly", "Operations Research"],
  },
  "American Airlines": {
    summary: [
      "Forecasted hub staffing from flight disruption data",
      "Trained gradient boosting with weather + crew features",
      "Reduced daily variance in scheduling decisions",
    ],
    stack: ["Python", "LightGBM", "Airflow", "AWS"],
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
