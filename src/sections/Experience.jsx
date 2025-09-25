// src/sections/Experience.jsx
import { useEffect, useRef, useState } from "react";
import { expCards } from "../constants";
import MobileSectionHeader from "../components/MobileSectionHeader";

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Start with no experience active on desktop
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const [infoPosition, setInfoPosition] = useState(null);
  const timelineRef = useRef(null);
  const collapseTimeoutRef = useRef(null);
  const displayedCards = [...expCards].reverse();

  // Mobile carousel state
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile navigation functions
  const goToPrevious = () => {
    setCurrentMobileIndex((prev) =>
      prev === 0 ? displayedCards.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentMobileIndex((prev) =>
      prev === displayedCards.length - 1 ? 0 : prev + 1
    );
  };

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

  // No initial positioning needed - timeline starts empty

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

  const activeExperience = displayedCards[activeIndex] || null;
  const currentMobileExperience = displayedCards[currentMobileIndex];

  return (
    <section
      id="experience"
      className="snap-section full-height-only"
      style={{
        height: "100vh",
        overflow: isMobile ? "visible" : "hidden"
      }}
    >
      <MobileSectionHeader title="Experience" />

      {isMobile ? (
        /* Mobile Single Experience Layout */
        <div className="mobile-experience-single-container">
          {/* Navigation Controls at Top */}
          <div className="mobile-experience-nav-controls">
            <button
              className="mobile-experience-nav-arrow"
              onClick={goToPrevious}
              aria-label="Previous experience"
              disabled={currentMobileIndex === 0}
            >
              ←
            </button>

            <div className="mobile-experience-counter">
              {currentMobileIndex + 1} / {displayedCards.length}
            </div>

            <button
              className="mobile-experience-nav-arrow"
              onClick={goToNext}
              aria-label="Next experience"
              disabled={currentMobileIndex === displayedCards.length - 1}
            >
              →
            </button>
          </div>

          {/* Experience Card */}
          <div className="mobile-experience-card">
            {/* Company Logo and Date */}
            <div className="mobile-exp-header">
              <div className="mobile-exp-logo-wrapper">
                <img
                  src={currentMobileExperience?.logoPath}
                  alt={`${currentMobileExperience?.company} logo`}
                  className="mobile-exp-logo"
                />
              </div>
              <div className="mobile-exp-date">{currentMobileExperience?.date}</div>
            </div>

            {/* Job Title and Company */}
            <div className="mobile-exp-title-section">
              <h2 className="mobile-exp-title">{currentMobileExperience?.title}</h2>
              <p className="mobile-exp-company">{currentMobileExperience?.company}</p>
            </div>

            {/* Experience Banner Image */}
            {currentMobileExperience?.imgPath && (
              <div className="mobile-exp-banner">
                <img
                  src={currentMobileExperience.imgPath}
                  alt={`${currentMobileExperience.company} banner`}
                />
              </div>
            )}

            {/* Experience Description */}
            {currentMobileExperience?.review && (
              <div className="mobile-exp-review">
                <p>{currentMobileExperience.review}</p>
              </div>
            )}

            {/* Responsibilities */}
            <div className="mobile-exp-responsibilities">
              <h3>Key Responsibilities:</h3>
              <ul>
                {currentMobileExperience?.responsibilities?.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Timeline Layout */
        <div className="horizontal-experience-container">
        {activeExperience && infoPosition && (
          <div
            key={`${activeExperience.company}-${activeIndex}-summary`}
            className="experience-summary"
            style={{ left: infoPosition.left }}
            onMouseEnter={handleDetailsEnter}
            onMouseLeave={handleDetailsLeave}
          >
            {activeExperience.imgPath ? (
              <div className="experience-summary__banner">
                <img src={activeExperience.imgPath} alt={`${activeExperience.company} banner`} />
              </div>
            ) : null}
            {activeExperience.review ? (
              <p>{activeExperience.review}</p>
            ) : null}
          </div>
        )}

        <div className="timeline-shell" data-fade-in>
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
      )}
    </section>
  );
};

export default Experience;
