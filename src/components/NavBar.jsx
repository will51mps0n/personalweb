import { useState, useEffect, useMemo } from "react";

import { navLinks } from "../constants";

const pad = (value) => String(value).padStart(2, "0");

const NavBar = () => {
  const [sectionTitle, setSectionTitle] = useState("Adam Simpson");
  const [titleVariant, setTitleVariant] = useState("hero");
  const [activeSection, setActiveSection] = useState("hero");
  const [projectCounter, setProjectCounter] = useState(null);

  useEffect(() => {
    const handleSectionChange = (event) => {
      const { id, title, variant } = event.detail || {};

      if (id) {
        setActiveSection(id);
      }

      if (title) {
        setSectionTitle(title);
      }

      setTitleVariant(variant || "standard");
    };

    const handleProjectCounterChange = (event) => {
      const detail = event.detail;
      if (detail && typeof detail.current === "number" && typeof detail.total === "number") {
        setProjectCounter({ current: detail.current, total: detail.total });
      } else {
        setProjectCounter(null);
      }
    };

    window.addEventListener("sectionChange", handleSectionChange);
    window.addEventListener("projectCounterChange", handleProjectCounterChange);

    return () => {
      window.removeEventListener("sectionChange", handleSectionChange);
      window.removeEventListener("projectCounterChange", handleProjectCounterChange);
    };
  }, []);

  const showCounter = useMemo(() => {
    return activeSection === "work" && projectCounter;
  }, [activeSection, projectCounter]);

  const handleNavClick = (target) => {
    const targetId = target.replace('#', '');
    window.dispatchEvent(
      new CustomEvent('requestSectionScroll', {
        detail: { id: targetId },
      })
    );
  };

  return (
    <header className="navbar" role="banner">
      <div className={`navbar-title ${titleVariant === 'hero' ? 'hero' : 'standard'}`}>
        <span className="navbar-title__text">{sectionTitle}</span>
        {showCounter ? (
          <span className="navbar-title__counter">
            {pad(projectCounter.current)}/
            {pad(projectCounter.total)}
          </span>
        ) : null}
      </div>

      <nav className="mini-nav" aria-label="Section navigation">
        {navLinks.map(({ link, name }) => {
          const id = link.replace('#', '');
          const isActive = activeSection === id;

          return (
            <button
              key={name}
              type="button"
              className={`mini-nav__item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleNavClick(link)}
            >
              {name}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default NavBar;
