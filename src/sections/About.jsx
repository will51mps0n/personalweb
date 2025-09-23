import TextGlitchHover from '../components/TextGlitchHover';

const About = () => {
  return (
    <section id="about" className="snap-section full-height-only about-section">
      <div className="about-inner" data-glitch-content>
        <h2 className="about-title">Adam Simpson · Software Developer</h2>
        <div className="about-columns">
          <div className="about-copy">
            <p>
              <TextGlitchHover radius={60}>
                Hi! I'm Adam Simpson, a systems and ML focused software developer based in Houston, Texas, with a
                B.S. in Electrical Engineering and Computer Science from the University of Michigan. I
                gravitate toward the layer where operating systems, hardware, and intelligent software
                intersect; hands-on work in kernel design, cybersecurity, and distributed systems keeps
                me just as energized as product delivery.
              </TextGlitchHover>
            </p>
            <p>
              <TextGlitchHover radius={60}>
                My background spans multithreaded network file servers, user-level threading libraries,
                and LC-2K assemblers, cache simulators, and pipelines that mirror real hardware. I enjoy
                profiling race conditions, designing fair eviction policies for virtual memory pagers,
                and documenting the architectural challenges to tackle with others.
              </TextGlitchHover>
            </p>
            <p>
              <TextGlitchHover radius={60}>
                I also build data-driven systems in Python and C++. From outage-cost regressors and
                stock forecasting pipelines to AlphaZero-style game agents and CNNs for CIFAR-10, I'm
                comfortable turning messy telemetry into deployable models. Recent work with American
                Airlines and Michigan Medicine blended gradient boosting, queue theory, and dashboards
                to help operations teams make better staffing and scheduling decisions.
              </TextGlitchHover>
            </p>
          </div>
          <div className="about-copy">
            <p>
              <TextGlitchHover radius={60}>
                Outside the terminal window, I shipped WaitFast, a SwiftUI app with a Flask and
                PostgreSQL backend hosted on AWS that crowdsources venue wait times in real time. I've
                contributed to research published with Michigan Medicine, helped secure startup funding
                through Dare to Dream and the Michigan Business Challenge, and regularly mentor students
                through EECS tutoring.
              </TextGlitchHover>
            </p>
            <p>
              <TextGlitchHover radius={60}>
                Whether breaking down low-level C++, production ML, or full-stack execution, I try
                to bring a calm, detail-oriented mindset and clear communication with software development. I'm
                always open to new collaborations, optimizing infrastructure, shipping new products, or
                pushing research concepts into the wild. I enjoy coding with others and working on complex challenges,
                or building interesting tools and interfaces.
              </TextGlitchHover>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
