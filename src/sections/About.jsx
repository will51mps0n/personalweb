const About = () => {
  return (
    <section id="about" className="snap-section full-height-only about-section">
      <div className="about-inner" data-glitch-content>
        <h2 className="about-title">Adam Simpson · Software Developer</h2>
        <div className="about-copy">
          <p>
            Hi, I’m Adam Simpson — a systems-minded software developer with a love for
            low-level infrastructure, intelligent tooling, and data-driven products. I studied
            Electrical Engineering and Computer Science at the University of Michigan, where I dug
            into operating systems, compilers, and distributed systems while building projects that
            touched everything from virtual memory to real-time analytics.
          </p>
          <p>
            My work spans C and C++ systems programming — building multithreaded file servers,
            custom threading libraries, and virtual memory pagers — as well as applied machine
            learning and full-stack development. I’ve shipped production-grade pipelines, delivered
            forecasting tools for airline operations, and launched WaitFast, an iOS app with a live
            Flask/PostgreSQL/AWS backend.
          </p>
          <p>
            I’m happiest when I’m architecting reliable systems, profiling for performance, or
            translating messy data into decisions. Whether it’s infrastructure, ML, or product, I
            bring a focus on clarity, craftsmanship, and continuous learning to every build.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
