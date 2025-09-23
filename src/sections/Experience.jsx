// src/sections/Experience.jsx
import { useEffect, useRef, useState } from "react";
import { expCards } from "../constants";

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
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

    const nodes = timelineRef.current.querySelectorAll('.timeline-node');
    const containerWidth = timelineRef.current.offsetWidth;

    if (!nodes.length) return;

    const activeNode = nodes[activeIndex];
    if (!activeNode) return;

    const nodeCenter = activeNode.offsetLeft + activeNode.offsetWidth / 2;
    const scrollPosition = nodeCenter - containerWidth / 2;

    timelineRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!timelineRef.current) return;

    const measureLine = () => {
      const track = timelineRef.current?.querySelector('.timeline-track');
      if (!track) return;
      const nodeElements = track.querySelectorAll('.timeline-node');
      if (nodeElements.length === 0) return;

      const firstNode = nodeElements[0];
      const lastNode = nodeElements[nodeElements.length - 1];

      const firstCenter = firstNode.offsetLeft + firstNode.offsetWidth / 2;
      const lastCenter = lastNode.offsetLeft + lastNode.offsetWidth / 2;

      const lineStart = firstCenter - firstNode.offsetWidth / 2;
      const lineEnd = lastCenter + lastNode.offsetWidth / 2;
      const width = Math.max(0, lineEnd - lineStart);

      setLineStyle({ left: lineStart, width });
    };

    const handleResize = () => requestAnimationFrame(measureLine);

    measureLine();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            <div
              className="timeline-line"
              style={{ left: lineStyle.left, width: lineStyle.width }}
            />

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
