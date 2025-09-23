// src/sections/Experience.jsx
import { useEffect, useRef, useState } from "react";
import { expCards } from "../constants";

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const [infoPosition, setInfoPosition] = useState(null);
  const timelineRef = useRef(null);
  const collapseTimeoutRef = useRef(null);
  const displayedCards = [...expCards].reverse();

  const clearCollapseTimeout = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  const scheduleCollapse = () => {
    clearCollapseTimeout();
    collapseTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
      setInfoPosition(null);
      collapseTimeoutRef.current = null;
    }, 120);
  };

  const handleNodeClick = (index) => {
    clearCollapseTimeout();
    updateInfoPosition(index);
    setActiveIndex(index);
  };

  const handleNodeEnter = (index) => {
    clearCollapseTimeout();
    setActiveIndex(index);
    updateInfoPosition(index);
  };

  const handleNodeLeave = () => {
    scheduleCollapse();
  };

  const handleDetailsEnter = () => {
    clearCollapseTimeout();
  };

  const handleDetailsLeave = () => {
    scheduleCollapse();
  };

  const updateInfoPosition = (index) => {
    if (!timelineRef.current) return;
    const nodes = timelineRef.current.querySelectorAll('.timeline-node');
    const node = nodes[index];
    if (!node) return;

    const containerElement = timelineRef.current.closest('.horizontal-experience-container');
    if (!containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    const centerX = nodeRect.left + nodeRect.width / 2;
    const relativeX = centerX - containerRect.left;
    setInfoPosition({ left: relativeX });
  };

  const handleScroll = (direction) => {
    clearCollapseTimeout();
    const lastIndex = displayedCards.length - 1;

    if (direction === "left") {
      if (activeIndex === null) return;
      if (activeIndex === 0) {
        setActiveIndex(null);
        setInfoPosition(null);
      } else {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? null : prev - 1;
          if (nextIndex !== null) updateInfoPosition(nextIndex);
          return nextIndex;
        });
      }
    } else if (direction === "right") {
      if (activeIndex === null) {
        updateInfoPosition(0);
        setActiveIndex(0);
      } else if (activeIndex < lastIndex) {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : prev + 1;
          updateInfoPosition(nextIndex);
          return nextIndex;
        });
      }
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

    if (activeIndex === null) return;

    const nodes = timelineRef.current.querySelectorAll('.timeline-node');
    const containerWidth = timelineRef.current.offsetWidth;

    if (!nodes.length) return;

    const activeNode = nodes[activeIndex];
    if (!activeNode) return;

    updateInfoPosition(activeIndex);

    const nodeCenter = activeNode.offsetLeft + activeNode.offsetWidth / 2;
    const scrollPosition = nodeCenter - containerWidth / 2;

    timelineRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => () => clearCollapseTimeout(), []);

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
      const width = Math.max(0, lastCenter - firstCenter);

      setLineStyle({ left: firstCenter, width });
    };

    const handleResize = () => requestAnimationFrame(measureLine);

    measureLine();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeExperience = activeIndex !== null ? displayedCards[activeIndex] : null;

  return (
    <section
      id="experience"
      className="snap-section full-height-only"
      style={{ height: "100vh", overflow: "hidden" }}
      data-glitch-content
    >
      <div className="horizontal-experience-container">
        <div className="timeline-shell">
          <div ref={timelineRef} className="horizontal-timeline">
            <div className="timeline-track">
              <div
                className="timeline-line"
                style={{ left: lineStyle.left, width: lineStyle.width }}
              />

              <div className="timeline-nodes">
                {displayedCards.map((card, index) => (
                  <div className="timeline-node-wrapper" key={`${card.company}-${index}`}>
                    <div className="node-date">{card.startDate}</div>
                    <div
                      className={`timeline-node ${index === activeIndex ? "active" : ""}`}
                      onClick={() => handleNodeClick(index)}
                      onMouseEnter={() => handleNodeEnter(index)}
                      onMouseLeave={handleNodeLeave}
                      role="button"
                      tabIndex={0}
                      aria-pressed={index === activeIndex}
                      onFocus={() => handleNodeEnter(index)}
                      onBlur={handleNodeLeave}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {activeExperience && infoPosition && (
          <div
            key={`${activeExperience.company}-${activeIndex}`}
            className="experience-info"
            style={{ left: infoPosition.left }}
            onMouseEnter={handleDetailsEnter}
            onMouseLeave={handleDetailsLeave}
          >
            <div className="experience-info-header">
              <div className="experience-info-meta">
                <h2>{activeExperience.title}</h2>
                <p className="experience-info-company">{activeExperience.company}</p>
              </div>
              <p className="experience-info-date">{activeExperience.date}</p>
            </div>
            <ul className="experience-info-list">
              {activeExperience.responsibilities.slice(0, 4).map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        )}

        {activeExperience && (
          <div className="progress-indicator">
            {activeIndex + 1} of {displayedCards.length}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
