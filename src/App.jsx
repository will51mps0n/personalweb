// src/App.jsx
import { useEffect, useRef, useState } from 'react';
import About from "./sections/About";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Navbar from "./components/NavBar";
import Background from "./components/Background";
import AvailabilityBadge from "./components/AvailabilityBadge";
import ScrollController from './utils/ScrollController';

const App = () => {
  const scrollControllerRef = useRef(null);
  const [showBadge, setShowBadge] = useState(true);

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
      const id = event.detail?.id;
      setShowBadge(id !== 'experience');
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
        <AvailabilityBadge visible={showBadge} />

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
            data-section-id="about"
            data-section-title="About"
            data-scroll-difficulty="hard"
            data-scroll-mode="panel"
          >
            <About />
          </div>

          <div
            data-scroll-section
            data-section-id="experience"
            data-section-title="Experience"
            data-scroll-difficulty="hard"
            data-scroll-mode="scrollable"
          >
            <Experience />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
