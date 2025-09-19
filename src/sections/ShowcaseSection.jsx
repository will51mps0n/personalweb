// src/sections/ShowcaseSection.jsx
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const GITHUB_BASE = "https://github.com/will51mps0n"; // <-- change this once

const pad = (n) => String(n).padStart(2, "0");

export default function AppShowcase() {
  const sectionRef = useRef(null);

  // The item that stays selected (drives the top counter & underline)
  const [activeIndex, setActiveIndex] = useState(1); // 1-based

  // Only used to control the “muffle the others” effect while the pointer is inside the list
  const [isPointerInList, setIsPointerInList] = useState(false);

  const projects = useMemo(
    () => [
      // --- ML / DS ---
      { title: "Power Outage Prediction", href: `${GITHUB_BASE}/Power-Outage-Analysis`, img: "" },
      { title: "Stock Prediction Pipeline", href: `${GITHUB_BASE}/Stock-Prediction-Pipeline`, img: "" },
      { title: "Market Indicator Analysis", href: `${GITHUB_BASE}/Market-Indicator-Analysis`, img: "" },

      // --- AI / Games ---
      { title: "AlphaZero Othello", href: `${GITHUB_BASE}/Othello-AG0`, img: "" },
      { title: "CIFAR-10 Classifier", href: `${GITHUB_BASE}/Image-CNN`, img: "" },
      { title: "Connect Four AI", href: `${GITHUB_BASE}/Connect-Four-AI`, img: "" },

      // --- Systems ---
      { title: "Multithreaded File Server", href: `${GITHUB_BASE}/Networked-Fs-Cpp`, img: "" },
      { title: "Virtual Memory Pager", href: `${GITHUB_BASE}/MemoryManager-VM-OSPager`, img: "" },
      { title: "Custom Thread Library", href: `${GITHUB_BASE}/Concurrency-Lib`, img: "" },
      { title: "LC-2K Assembler & Pipeline", href: `${GITHUB_BASE}/Assembler-and-Simulator`, img: "" },
      { title: "LC-2K Cache Simulator", href: `${GITHUB_BASE}/Cache-Simulator`, img: "" },
      { title: "Traveling Salesman Solver", href: `${GITHUB_BASE}/TSP`, img: "" },

      // --- Misc / Portfolio / Personal ---
      // If this is your site’s code repo:
      // { title: "Personal Portfolio", href: `${GITHUB_BASE}/Adam-Simpson-Portfolio`, img: "" },

      // --- App / Experience anchors (no public repo yet) ---
      { title: "WaitFast iOS", href: "#waitfast", img: "" },            // keep site anchor
      { title: "Michigan Medicine", href: "#experience", img: "" },      // keep site anchor
      { title: "American Airlines", href: "#experience", img: "" },      // keep site anchor
    ],
    []
  );

  const total = projects.length;

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".ref-list li"),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power2.out" }
    );
  }, []);

  return (
    <section id="work" data-title="Projects" ref={sectionRef} className="work-section ref-wrap">
      <div className="work-count-floating">
        <span className="work-current">{pad(activeIndex)}</span>
        <span className="work-divider">/</span>
        <span className="work-total">{pad(total)}</span>
      </div>

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
                onFocus={() => setActiveIndex(idx)}         // keyboard focus also sets it
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
        <aside className="ref-media">
          <div className="ref-media-frame">
            <div className="ref-media-placeholder">Coming soon</div>
          </div>
        </aside>
      </div>
    </section>
  );
}
