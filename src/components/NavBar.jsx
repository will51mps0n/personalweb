import { useState, useEffect, useMemo } from "react";

import { navLinks } from "../constants";

const pad = (value) => String(value).padStart(2, "0");

const NavBar = () => {
  const [sectionTitle, setSectionTitle] = useState("Adam Simpson");
  const [titleVariant, setTitleVariant] = useState("hero");
  const [activeSection, setActiveSection] = useState("hero");
  const [projectCounter, setProjectCounter] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile detection and scroll handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (!isMobile) return;

      const currentScrollY = window.scrollY;
      // On mobile, just track scroll for navbar background, but keep it always visible
      setLastScrollY(currentScrollY);
    };

    // Initial check
    checkMobile();

    // Add event listeners
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const showCounter = useMemo(() => {
    return activeSection === "work" && projectCounter;
  }, [activeSection, projectCounter]);

  const handleNavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget.getAttribute('data-target');
    const targetId = target.replace('#', '');

    console.log('Nav clicked:', targetId); // Debug log

    // For mobile, use direct scrollIntoView for reliable navigation
    if (isMobile) {
      const targetElement = document.getElementById(targetId);
      console.log('Target element found:', targetElement); // Debug log
      if (targetElement) {
        // Force smooth scrolling using window.scrollTo
        const elementTop = targetElement.offsetTop;
        const navbarHeight = 70;

        window.scrollTo({
          top: elementTop - navbarHeight,
          behavior: 'smooth'
        });

        // Also try scrollIntoView as backup
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 50);
      }
      return;
    }

    // For desktop, use the existing scroll controller
    window.dispatchEvent(
      new CustomEvent('requestSectionScroll', {
        detail: { id: targetId },
      })
    );
  };

  return (
    <header
      className={`navbar ${isMobile ? `navbar--mobile ${lastScrollY > 50 ? 'navbar--scrolled' : ''}` : ''}`}
      role="banner"
    >
      {/* Desktop layout */}
      {!isMobile ? (
        <>
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
                  onClick={handleNavClick}
                  data-target={link}
                >
                  {name}
                </button>
              );
            })}
          </nav>
        </>
      ) : (
        /* Mobile layout - horizontal nav only */
        <nav className="mobile-nav" aria-label="Section navigation">
          {navLinks.map(({ link, name }) => {
            const id = link.replace('#', '');
            const isActive = activeSection === id;

            return (
              <button
                key={name}
                type="button"
                className={`mobile-nav__item ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={handleNavClick}
                data-target={link}
              >
                {name}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default NavBar;
