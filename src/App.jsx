// src/App.jsx
import { useEffect, useRef } from 'react';
import Footer from "./sections/Footer";
import TechStack from "./sections/TechStack";
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

  return (
    <>
      <Background />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        
        {/* Add data-scroll-section to each main section */}
        <div data-scroll-section>
          <Hero />
        </div>
        
        <div data-scroll-section>
          <ShowcaseSection />
        </div>
        
        <div data-scroll-section>
          <Experience />
        </div>
        
        <div data-scroll-section>
          <TechStack />
        </div>
        
        
          <Footer />
      </div>
    </>
  );
};

export default App;