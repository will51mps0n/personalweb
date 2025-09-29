// src/App.jsx
import { useEffect, useRef, useState } from 'react';
import About from "./sections/About";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Navbar from "./components/NavBar";
import Background from "./components/Background";
import ScrollController from './utils/ScrollController';

const App = () => {
  const scrollControllerRef = useRef(null);

  useEffect(() => {
    // Initialize scroll controller after DOM is ready
    const timer = setTimeout(() => {
      scrollControllerRef.current = new ScrollController();
      scrollControllerRef.current.init();
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (scrollControllerRef.current) {
        scrollControllerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const handleSectionChange = (event) => {
      const nextId = event?.detail?.id;
      setShowBadge(nextId !== 'experience');
    };

    window.addEventListener('sectionChange', handleSectionChange);

    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
    };
  }, []);

  return (
    <>
      <Background />
      <div className="page-shell" style={{ position: "relative", zIndex: 10 }}>
        <Navbar />

        <div className="page-main">
          {/* Add data-scroll-section to each main section */}
          <div
            data-scroll-section
            data-section-id="hero"
            data-section-title="Adam Simpson"
            data-title-variant="hero"
            data-scroll-difficulty="hard"
            data-scroll-mode="panel"
          >
            <Hero />
          </div>

          <div
            data-scroll-section
            data-section-id="work"
            data-section-title="Select Projects"
            data-scroll-difficulty="hard"
            data-scroll-mode="panel"
          >
            <ShowcaseSection />
          </div>

          <div
            data-scroll-section
            data-section-id="experience"
            data-section-title="Experience"
            data-scroll-difficulty="hard"
            data-scroll-mode="panel"
          >
            <Experience />
          </div>

          <div
            data-scroll-section
            data-section-id="about"
            data-section-title="About Me"
            data-scroll-difficulty="hard"
            data-scroll-mode="panel"
          >
            <About />
          </div>
        </div>

        {/* Desktop Footer - Hidden on Mobile */}
        <div className="desktop-footer">
          <div className="desktop-footer-content">
            <div className="footer-line">University of Michigan CSE 2025</div>
            <div className="footer-line">Available for work</div>
            <div className="footer-line">adwisi@umich.edu</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
