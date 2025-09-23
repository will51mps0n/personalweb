import React, { useState, useEffect } from 'react';

const Technologies = () => {
  const [activeStack, setActiveStack] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const techStacks = [
    {
      category: "Systems Programming",
      title: "Low-Level Systems",
      description: "Operating systems, kernel development, and hardware-software interfaces",
      technologies: ["C", "C++", "Assembly", "POSIX", "Linux Kernel", "Memory Management", "Threading", "Socket Programming"],
      education: "Deep coursework in Operating Systems, Computer Architecture, and Systems Programming",
      projects: "Virtual Memory Pager • Multithreaded File Server • Custom Thread Library • LC-2K Pipeline"
    },
    {
      category: "AI & Machine Learning",
      title: "Intelligent Systems",
      description: "Machine learning, computer vision, and artificial intelligence applications",
      technologies: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Pandas", "NumPy", "Reinforcement Learning"],
      education: "Machine Learning Theory, Computer Vision, AI Search Algorithms, and Statistical Learning",
      projects: "AlphaZero Othello • CIFAR-10 CNN • Stock Prediction • Power Outage Analysis • Computer Vision Pipeline"
    },
    {
      category: "Software Engineering",
      title: "Full-Stack Development",
      description: "End-to-end software development from mobile to cloud infrastructure",
      technologies: ["SwiftUI", "React", "Flask", "PostgreSQL", "AWS", "Docker", "Git", "RESTful APIs"],
      education: "Software Engineering Practices, Database Systems, Web Development, and Cloud Computing",
      projects: "WaitFast iOS App • Real-time Analytics Dashboard • Distributed Systems • Cloud Deployment"
    }
  ];

  const allTechnologies = [
    "C", "C++", "Python", "Swift", "JavaScript", "Assembly", "SQL", "Bash",
    "PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "Pandas", "NumPy",
    "React", "SwiftUI", "Flask", "PostgreSQL", "MongoDB", "AWS", "Docker",
    "Linux", "Git", "RESTful APIs", "Socket Programming", "Multithreading",
    "Computer Vision", "Machine Learning", "Deep Learning", "Reinforcement Learning",
    "Operating Systems", "Computer Architecture", "Algorithms", "Data Structures",
    "Cybersecurity", "Distributed Systems", "Cloud Computing", "Mobile Development"
  ];

  const educationAreas = [
    "Computer Architecture", "Operating Systems", "Machine Learning Theory",
    "Artificial Intelligence", "Computer Vision", "Data Structures & Algorithms",
    "Cybersecurity", "Database Systems", "Distributed Systems", "Software Engineering",
    "Statistical Learning", "Linear Algebra", "Discrete Mathematics", "Signal Processing"
  ];

  const activeStackData = techStacks[activeStack];

  // Carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % allTechnologies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTechs = () => {
    const visibleCount = 5;
    const techs = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentCarouselIndex + i) % allTechnologies.length;
      techs.push(allTechnologies[index]);
    }
    return techs;
  };

  return (
    <section
      id="technologies"
      className="snap-section full-height-only"
      style={{ height: '100vh' }}
    >
      <div className="tech-page-container" data-glitch-content>
        {/* Header */}
        <header className="tech-header">
          <h1 className="tech-main-title">Technologies</h1>
          <p className="tech-subtitle">
            I've worked with a range of technologies across systems programming,
            AI/ML, and full-stack development. From low-level C++ to production ML pipelines.
          </p>
        </header>

        {/* Animated Tech Carousel */}
        <div className="tech-carousel-section">
          <div className="carousel-label">Experience with</div>
          <div className="tech-carousel">
            <div className="carousel-track">
              {getVisibleTechs().map((tech, index) => (
                <div
                  key={`${tech}-${currentCarouselIndex}-${index}`}
                  className={`carousel-item ${index === 2 ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${(index - 2) * 120}px) scale(${index === 2 ? 1.1 : 0.9})`,
                    opacity: index === 2 ? 1 : 0.6,
                    zIndex: index === 2 ? 10 : 1
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Technology Categories */}
        <div className="tech-categories-grid">
          <div className="tech-categories">
            {techStacks.map((stack, index) => (
              <div
                key={index}
                className={`tech-category-card ${index === activeStack ? 'active' : ''}`}
                onClick={() => setActiveStack(index)}
                onMouseEnter={() => setActiveStack(index)}
                data-glitch-content
              >
                <div className="tech-category-icon">
                  {index === 0 && <SystemsIcon />}
                  {index === 1 && <AIIcon />}
                  {index === 2 && <EngineeringIcon />}
                </div>
                <div className="tech-category-info">
                  <h3 className="tech-category-title">{stack.title}</h3>
                  <p className="tech-category-desc">{stack.description}</p>
                </div>
                <div className="tech-category-glow"></div>
              </div>
            ))}
          </div>

          {/* Active Stack Details */}
          <div className="tech-stack-details">
            <div className="code-noise-panel is-active">
              <div className="code-noise-panel__content">
                <div className="code-noise-panel__inner">
                  <div className="code-noise-panel__label">{activeStackData.category}</div>
                  <h3 className="code-noise-panel__title">{activeStackData.title}</h3>

                  {/* Education Background */}
                  <div className="education-section">
                    <h4 className="education-title">Academic Foundation</h4>
                    <p className="education-desc">{activeStackData.education}</p>
                  </div>

                  {/* Technology Stack */}
                  <div className="code-noise-panel__stack">
                    <p>Core Technologies</p>
                    <ul>
                      {activeStackData.technologies.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Notable Projects */}
                  <div className="projects-section">
                    <h4 className="projects-title">Notable Projects</h4>
                    <p className="projects-desc">{activeStackData.projects}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Areas Floating Animation */}
        <div className="education-floating">
          <div className="floating-label">Academic Background</div>
          <div className="education-items">
            {educationAreas.map((area, index) => (
              <div
                key={area}
                className="education-item"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced icon components with more detail
const SystemsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M8 21h8" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 17v4" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 8h10M7 12h6" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="8" r="1" fill="rgba(6, 107, 189, 0.6)"/>
    <circle cx="18" cy="12" r="1" fill="rgba(6, 107, 189, 0.6)"/>
  </svg>
);

const AIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M12 1v6m0 8v6M4.22 4.22l4.24 4.24m8.48 0l4.24-4.24M1 12h6m8 0h6m-2.78 6.78l-4.24-4.24m-8.48 0L4.22 19.78" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="rgba(6, 107, 189, 0.8)"/>
  </svg>
);

const EngineeringIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M2 12h2M22 12h-2M12 2v2M12 20v2" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default Technologies;