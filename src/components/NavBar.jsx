import { useState, useEffect } from "react";

import { navLinks } from "../constants";

const NavBar = () => {
  const [sectionTitle, setSectionTitle] = useState("Adam Simpson");
  const [titleVariant, setTitleVariant] = useState("hero");
  const [activeSection, setActiveSection] = useState("hero");

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

    window.addEventListener("sectionChange", handleSectionChange);

    return () => {
      window.removeEventListener("sectionChange", handleSectionChange);
    };
  }, []);

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
        {sectionTitle}
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
