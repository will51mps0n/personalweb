// src/sections/Experience.jsx
import { useEffect, useRef, useState } from "react";
import { expCards } from "../constants";

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);

  const handleNodeClick = (index) => {
    setActiveIndex(index);
  };

  const handleScroll = (direction) => {
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (direction === "right" && activeIndex < expCards.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleScroll("left");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleScroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    if (!timelineRef.current) return;

    const nodeWidth = 120; // Approximate width + gap per node
    const containerWidth = timelineRef.current.offsetWidth;
    const scrollPosition = activeIndex * nodeWidth - containerWidth / 2 + nodeWidth / 2;

    timelineRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  }, [activeIndex]);

  const activeExperience = expCards[activeIndex];

  return (
    <section
      id="experience"
      className="snap-section full-height-only"
      style={{ height: "100vh", overflow: "hidden" }}
      data-glitch-content
    >
      <div className="horizontal-experience-container">
        <button
          className="nav-arrow nav-arrow-left"
          onClick={() => handleScroll("left")}
          disabled={activeIndex === 0}
          aria-label="Previous experience"
        >
          ←
        </button>

        <div ref={timelineRef} className="horizontal-timeline">
          <div className="timeline-track">
            <div className="timeline-line" />

            <div className="timeline-nodes">
              {expCards.map((card, index) => (
                <div
                  key={index}
                  className={`timeline-node ${index === activeIndex ? "active" : ""}`}
                  onClick={() => handleNodeClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleNodeClick(index);
                    }
                  }}
                >
                  <div className="node-circle">
                    <img
                      src={card.logoPath}
                      alt={`${card.company} logo`}
                      className="node-logo"
                    />
                  </div>
                  <div className="node-label">{card.company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="nav-arrow nav-arrow-right"
          onClick={() => handleScroll("right")}
          disabled={activeIndex === expCards.length - 1}
          aria-label="Next experience"
        >
          →
        </button>

        <div className="experience-details">
          {activeExperience && (
            <div className="experience-card">
              <div className="experience-header">
                <img
                  src={activeExperience.logoPath}
                  alt={`${activeExperience.company} logo`}
                  className="experience-logo"
                />
                <div>
                  <h2 className="experience-title">{activeExperience.title}</h2>
                  <p className="experience-company">{activeExperience.company}</p>
                  <p className="experience-date">{activeExperience.date}</p>
                </div>
              </div>

              <div className="experience-content">
                <h3>Responsibilities</h3>
                <ul className="responsibilities-list">
                  {activeExperience.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="progress-indicator">
          {activeIndex + 1} of {expCards.length}
        </div>
      </div>
    </section>
  );
};

export default Experience;
