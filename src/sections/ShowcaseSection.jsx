// src/sections/ShowcaseSection.jsx
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const pad = (n) => String(n).padStart(2, "0");

export default function AppShowcase() {
  const sectionRef = useRef(null);

  // The item that stays selected (drives the top counter & underline)
  const [activeIndex, setActiveIndex] = useState(1); // 1-based

  // Only used to control the “muffle the others” effect while the pointer is inside the list
  const [isPointerInList, setIsPointerInList] = useState(false);

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
      <header className="work-header">
        <h2 className="work-title">Select projects</h2>
        <div className="work-count">
          <span className="work-current">{pad(activeIndex)}</span>
          <span className="work-divider">/</span>
          <span className="work-total">{pad(total)}</span>
        </div>
      </header>

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
                <a className="ref-link" href={p.href} title={p.title}>
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
