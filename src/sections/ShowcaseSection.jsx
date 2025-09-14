// src/sections/ShowcaseSection.jsx
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const pad = (n) => String(n).padStart(2, "0");

export default function AppShowcase() {
  const sectionRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null); // 1-based
  const current = hoverIndex ?? 1;

  // ONE flat list in the exact order you want numbered 01..14
  const projects = useMemo(
    () => [
      { title: "Power Outage Cost Estimator — Python/ML", href: "#power-ml", img: "" },
      { title: "Stock Prediction Pipeline — Python", href: "#stocks", img: "" },
      { title: "Market-Indicator-Analysis ", href: "#stocks", img: "" },
      { title: "AlphaZero Othello — Python/AI", href: "#alphazero", img: "" },
      { title: "CIFAR-10 Classifier — Python/AI", href: "#cifar10", img: "" },
      { title: "Connect Four AI — Python", href: "#connect4", img: "" },

      { title: "Multithreaded File Server — C++", href: "#file-server", img: "" },
      { title: "Virtual Memory Pager — C++", href: "#pager", img: "" },
      { title: "Custom Thread Library — C++", href: "#threads", img: "" },
      { title: "LC-2K Assembler & Pipeline Simulator — C", href: "#lc2k-asm-sim", img: "" },
      { title: "LC-2K Cache Simulator — C", href: "#lc2k-cache", img: "" },
      { title: "Traveling Salesman Solver — C++", href: "#tsp", img: "" },

      { title: "WaitFast — iOS + Flask + AWS", href: "#waitfast", img: "" },
      { title: "Michigan Medicine — Software Dev / Researcher", href: "#experience", img: "" },
      { title: "American Airlines — Data Science", href: "#experience", img: "" },
    ],
    []
  );

  const total = projects.length; // 14

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".ref-list li"),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power2.out" }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="work-section ref-wrap">
      <header className="work-header">
        <h2 className="work-title">Select projects</h2>
        <div className="work-count">
          <span className="work-current">{pad(current)}</span>
          <span className="work-divider">/</span>
          <span className="work-total">{pad(total)}</span>
        </div>
      </header>

      <div className="ref-body">
        {/* LEFT: two-column list (single global numbering) */}
        <ol className="ref-list">
          {projects.map((p, i) => {
            const idx = i + 1;
            return (
              <li
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(idx)}
                onBlur={() => setHoverIndex(null)}
              >
                <span className="num">{pad(idx)}</span>
                <a className="ref-link" href={p.href}>{p.title}</a>
              </li>
            );
          })}
        </ol>

        {/* RIGHT: sticky media viewer (images later) */}
        <aside className="ref-media">
          <div className="ref-media-frame">
            {/* When you add images, set projects[i].img and show it here */}
            {/* For now, a placeholder block */}
            <div className="ref-media-placeholder">
              {/* You can swap in an <img src={projects[(hoverIndex ?? 1)-1].img} .../> later */}
              Coming soon
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
