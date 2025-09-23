// src/sections/ShowcaseSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import CodeNoisePanel from "../components/CodeNoisePanel";

const GITHUB_BASE = "https://github.com/will51mps0n"; // <-- change this once

const pad = (n) => String(n).padStart(2, "0");

const PROJECT_DETAILS = {
  "Power Outage Prediction": {
    category: "Machine Learning",
    summary: [
      "Built a regression pipeline that estimates outage cost from weather and grid telemetry feeds",
      "Engineered feature sets in Pandas and tuned random forest models with cross-validated search",
      "Surface feature importances and forecast reports consumable by utility stakeholders",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Feature Engineering"],
  },
  "Stock Prediction Pipeline": {
    category: "Machine Learning",
    summary: [
      "Developed an end-to-end time-series pipeline with live scraping and technical indicator generation",
      "Benchmarked LSTM, linear, and tree ensembles using walk-forward validation on rolling windows",
      "Automated daily forecast publishing to internal dashboards for quick scenario review",
    ],
    stack: ["Python", "Time Series", "APIs", "LSTM"],
  },
  "Market Indicator Analysis": {
    category: "Machine Learning",
    summary: [
      "Correlated macroeconomic indicators with leading and lagging market behavior across sectors",
      "Applied PCA, cointegration, and clustering to isolate resilient trading signals",
      "Published research notebooks with chart overlays and narrative takeaways for strategy teams",
    ],
    stack: ["Python", "NumPy", "Matplotlib", "Statsmodels"],
  },
  "AlphaZero Othello": {
    category: "Artificial Intelligence",
    summary: [
      "Implemented an AlphaZero-inspired Othello agent with batched Monte Carlo Tree Search",
      "Executed self-play training loops that continually improved policy and value networks",
      "Outperformed handcrafted heuristics after ~200k self-play games and evaluation matches",
    ],
    stack: ["Python", "PyTorch", "Reinforcement Learning", "MCTS"],
  },
  "CIFAR-10 Classifier": {
    category: "Artificial Intelligence",
    summary: [
      "Designed residual CNN baselines and fully connected models to study CIFAR-10 performance",
      "Performed grid searches across depth, augmentation, and schedulers to surpass 92% accuracy",
      "Tracked experiment metrics and exports for reproducibility and comparison",
    ],
    stack: ["PyTorch", "CNN", "Hyperparameter Tuning", "Weights & Biases"],
  },
  "Connect Four AI": {
    category: "Artificial Intelligence",
    summary: [
      "Engineered a perfect-play Connect Four engine using minimax with alpha-beta pruning",
      "Crafted heuristic evaluation functions so mid-game searches remain responsive",
      "Packaged the solver with a Pygame interface so users can spar against the AI",
    ],
    stack: ["Python", "AI Search", "Game Theory", "Pygame"],
  },
  "Multithreaded File Server": {
    category: "Operating Systems",
    summary: [
      "Implemented a multithreaded network file server with socket I/O and hierarchical traversal",
      "Guaranteed concurrency safety and crash consistency via RAII locks and atomic write paths",
      "Stress-tested throughput to validate thread scheduling and hand-over-hand traversal logic",
    ],
    stack: ["C++", "Multithreading", "Boost", "Socket Programming"],
  },
  "Virtual Memory Pager": {
    category: "Operating Systems",
    summary: [
      "Programmed a C++ virtual memory pager managing page tables and per-process metadata",
      "Implemented copy-on-write handling and a fairness-aware clock eviction policy",
      "Benchmarked page-fault behavior across synthetic workloads to validate the design",
    ],
    stack: ["C++", "Virtual Memory", "Clock Algorithm", "MMU Simulation"],
  },
  "Custom Thread Library": {
    category: "Operating Systems",
    summary: [
      "Developed a user-level threading library on top of ucontext for cooperative scheduling",
      "Implemented mutexes and condition variables to coordinate lightweight tasks",
      "Benchmarked context switching speed against pthreads to quantify performance gains",
    ],
    stack: ["C", "ucontext", "Thread Scheduling", "Mutexes"],
  },
  "LC-2K Assembler & Pipeline": {
    category: "Computer Architecture",
    summary: [
      "Built an assembler and five-stage pipeline simulator for the LC-2K instruction set",
      "Modeled forwarding, stalls, and hazard detection to mirror hardware execution",
      "Generated precise traces compatible with course autograders and debugging tools",
    ],
    stack: ["C", "Assembler", "Pipeline Simulation", "Systems"],
  },
  "LC-2K Cache Simulator": {
    category: "Computer Architecture",
    summary: [
      "Implemented a configurable cache simulator supporting variable set and block sizes",
      "Captured hit/miss telemetry across benchmark workloads to study policy impact",
      "Compared LRU and alternative eviction policies to inform teaching lab exercises",
    ],
    stack: ["C", "Cache Simulation", "LRU", "Performance Analysis"],
  },
  "Traveling Salesman Solver": {
    category: "Algorithms",
    summary: [
      "Combined MST heuristics, nearest insertion, and branch-and-bound search for tour quality",
      "Applied 2-opt refinements to tighten solutions on TSPLIB benchmark sets",
      "Automated experimentation and reporting with Bash tooling for repeatability",
    ],
    stack: ["C++", "Algorithms", "Heuristics", "TSPLIB"],
  },
  "WaitFast iOS": {
    category: "Full-Stack Development",
    summary: [
      "Launched an iOS and Flask/PostgreSQL stack that crowdsources venue wait times in real time",
      "Integrated Google and Apple APIs for maps, auth, and geofenced updates",
      "Deployed to AWS and shipped via TestFlight to over 200 campus users",
    ],
    stack: ["SwiftUI", "Flask", "PostgreSQL", "AWS"],
  },
  "Michigan Medicine": {
    category: "Data Science",
    summary: [
      "Collaborated with clinicians to analyze surgical throughput using predictive analytics",
      "Applied probabilistic queuing models to pinpoint bottlenecks in scheduling workflows",
      "Delivered dashboards and tooling that informed rollout decisions across research teams",
    ],
    stack: ["Python", "Operations Research", "Dashboards", "Pandas"],
  },
  "American Airlines": {
    category: "Machine Learning",
    summary: [
      "Forecasted baggage scan distributions using disruption, weather, and crew telemetry",
      "Trained and tuned gradient boosting models deployed across major hubs",
      "Partnered with operations teams to smooth daily staffing variability using model outputs",
    ],
    stack: ["Python", "Gradient Boosting", "Airflow", "AWS"],
  },
  "Portfolio Website": {
    category: "Web Development",
    summary: [
      "Built a modern personal portfolio with custom scroll animations and responsive design",
      "Implemented smooth section transitions using GSAP and custom scroll controllers",
      "Designed with mobile-first approach featuring dynamic navbar and interactive project showcases",
    ],
    stack: ["React", "GSAP", "Tailwind CSS", "JavaScript"],
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
      { title: "Multithreaded File Server", href: `${GITHUB_BASE}/Networked-Fs-Cpp`, img: "" },
      { title: "Virtual Memory Pager", href: `${GITHUB_BASE}/MemoryManager-VM-OSPager`, img: "" },
      { title: "Custom Thread Library", href: `${GITHUB_BASE}/Concurrency-Lib`, img: "" },
      { title: "AlphaZero Othello", href: `${GITHUB_BASE}/Othello-AG0`, img: "" },
      { title: "CIFAR-10 Classifier", href: `${GITHUB_BASE}/Image-CNN`, img: "" },
      { title: "Connect Four AI", href: `${GITHUB_BASE}/Connect-Four-AI`, img: "" },
      { title: "Power Outage Prediction", href: `${GITHUB_BASE}/Power-Outage-Analysis`, img: "" },
      { title: "Stock Prediction Pipeline", href: `${GITHUB_BASE}/Stock-Prediction-Pipeline`, img: "" },
      { title: "Market Indicator Analysis", href: `${GITHUB_BASE}/Market-Indicator-Analysis`, img: "" },
      { title: "LC-2K Assembler & Pipeline", href: `${GITHUB_BASE}/Assembler-and-Simulator`, img: "" },
      { title: "LC-2K Cache Simulator", href: `${GITHUB_BASE}/Cache-Simulator`, img: "" },
      { title: "Traveling Salesman Solver", href: `${GITHUB_BASE}/TSP`, img: "" },
      { title: "WaitFast iOS", href: "https://www.linkedin.com/feed/update/urn:li:activity:7316569467478593537/", img: "" },
      { title: "Portfolio Website", href: `${GITHUB_BASE}/personalweb`, img: "" },
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
