import React, { useState } from 'react';

const About = () => {
  const [activeStack, setActiveStack] = useState(0);

  const techStacks = [
    {
      category: "Systems Programming",
      title: "Low-Level Systems",
      description: "Operating systems, kernel development, and hardware interfaces",
      technologies: ["C", "C++", "Assembly", "POSIX", "Threading", "Memory Management"],
      experience: "Virtual memory pagers, multithreaded servers, and custom thread libraries"
    },
    {
      category: "Machine Learning",
      title: "AI & Data Science",
      description: "Applied ML from computer vision to predictive analytics",
      technologies: ["Python", "PyTorch", "scikit-learn", "OpenCV", "Pandas", "NumPy"],
      experience: "Production ML at American Airlines, computer vision at Michigan Medicine"
    },
    {
      category: "Full-Stack Development",
      title: "Product Engineering",
      description: "End-to-end development from mobile apps to cloud infrastructure",
      technologies: ["SwiftUI", "React", "Flask", "PostgreSQL", "AWS", "Docker"],
      experience: "WaitFast iOS app with 200+ users, full AWS deployment and scaling"
    }
  ];

  const activeStackData = techStacks[activeStack];

  return (
    <section id="about" className="snap-section full-height-only about-section">
      <div className="about-inner" data-glitch-content>

        {/* Technologies Section */}
        <div className="tech-section" data-fade-in>
          <div className="tech-intro">
            <p className="tech-subtitle">
              I've worked with a range of technologies across systems programming,
              machine learning, and full-stack development.
            </p>
          </div>

          {/* Technology Stacks Grid */}
          <div className="tech-stacks-grid">
            <div className="tech-categories">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  className={`tech-category-card ${index === activeStack ? 'active' : ''}`}
                  onClick={() => setActiveStack(index)}
                  onMouseEnter={() => setActiveStack(index)}
                  data-slide-up
                >
                  <div className="tech-category-icon">
                    {index === 0 && <SystemsIcon />}
                    {index === 1 && <MLIcon />}
                    {index === 2 && <FullStackIcon />}
                  </div>
                  <div className="tech-category-info">
                    <h3 className="tech-category-title">{stack.title}</h3>
                    <p className="tech-category-desc">{stack.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Stack Details */}
            <div className="tech-stack-details" data-fade-in>
              <div className="code-noise-panel is-active">
                <div className="code-noise-panel__content">
                  <div className="code-noise-panel__inner">
                    <div className="code-noise-panel__label">{activeStackData.category}</div>
                    <h3 className="code-noise-panel__title">{activeStackData.title}</h3>
                    <p className="tech-experience-desc">{activeStackData.experience}</p>

                    <div className="code-noise-panel__stack">
                      <p>Technologies</p>
                      <ul>
                        {activeStackData.technologies.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Content */}
        <div className="about-content-section" data-slide-up>
          <h3 className="about-content-title">Adam Simpson / Software Developer</h3>
          <div className="about-columns">
            <div className="about-copy">
              <p>
                Hi! I'm Adam Simpson, a systems and ML focused software developer based in Houston, Texas, with a
                B.S. in Electrical Engineering and Computer Science from the University of Michigan. I
                gravitate toward the intersection of operating systems, hardware, and intelligent software.
              </p>
              <p>
                My background spans multithreaded network file servers, user-level threading libraries,
                and LC-2K assemblers. I enjoy profiling race conditions, designing fair eviction policies for
                virtual memory pagers, and documenting architectural challenges.
              </p>
            </div>
            <div className="about-copy">
              <p>
                I also build data-driven systems in Python and C++. Recent work with American
                Airlines and Michigan Medicine blended gradient boosting, queue theory, and dashboards
                to help operations teams make better staffing decisions.
              </p>
              <p>
                Outside the terminal, I shipped WaitFast, a SwiftUI app with Flask and PostgreSQL backend
                hosted on AWS. Whether breaking down low-level C++, production ML, or full-stack execution,
                I bring a detail-oriented mindset to software development.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Icon components
const SystemsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M8 21h8M12 17v4" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 8h10M7 12h6" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MLIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M12 1v6m0 8v6M4.22 4.22l4.24 4.24m8.48 0l4.24-4.24M1 12h6m8 0h6m-2.78 6.78l-4.24-4.24m-8.48 0L4.22 19.78" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FullStackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3h20v18H2V3z" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="rgba(6, 79, 148, 0.8)" strokeWidth="1.5"/>
    <path d="M2 3h20v4H2V3z" fill="rgba(6, 107, 189, 0.1)"/>
    <circle cx="6" cy="5" r="1" fill="rgba(6, 79, 148, 0.7)"/>
    <circle cx="9" cy="5" r="1" fill="rgba(6, 79, 148, 0.7)"/>
    <circle cx="12" cy="5" r="1" fill="rgba(6, 79, 148, 0.7)"/>
  </svg>
);

export default About;