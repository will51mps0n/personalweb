// src/App.jsx
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Navbar from "./components/NavBar";
import Background from "./components/Background"; // <-- add

const App = () => (
  <>
    <Background />  {/* sits behind everything */}

    <div style={{ position: "relative", zIndex: 10 }}>
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <Experience />
      <TechStack />
      <Footer />
    </div>
  </>
);

export default App;
