// src/sections/Hero.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    // Initial page load animation
    gsap.fromTo(
      ".hero-text p",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.06 }
    );

    // Animate the 3D model container
    gsap.fromTo(
      ".hero-3d-layout",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
    );

    // Animate the availability badge
    gsap.fromTo(
      ".availability-badge",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6 }
    );
  }, []);

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden snap-section"
      style={{ height: '100dvh' }}
    >
      <div
        className="
          hero-layout 
          min-h-[80vh] md:min-h-[82vh]
          items-start
        "
      >
        {/* LEFT: text column */}
        <header
          className="
            flex flex-col justify-start
            md:w-full w-screen
            md:px-20 px-5
            pt-16 md:pt-14 lg:pt-12
          "
          data-fade-in
        >
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <div
              className="
                hero-text
                font-semibold text-[color:var(--color-black-100)]
                text-[15px] md:text-[16px] leading-[1.45]
                -mt-1
              "
            >
              <p 
                className="text-base leading-snug text-ink max-w-md font-semibold mt-34 ml-32"
                data-slide-up
              >
                Systems-driven developer with a focus on <br />
                low-level infrastructure and intelligent software. <br />
                Building virtual memory pagers, multithreaded <br />
                servers, and custom thread libraries in C and C++.
              </p>
              <br />
              <p 
                className="text-base leading-snug text-ink max-w-md font-semibold ml-32"
                data-slide-up
              >
                Experienced in applied machine learning, from <br />
                airline operations forecasting at American Airlines <br />
                to computer vision, reinforcement learning, and <br />
                predictive modeling in Python and PyTorch.
              </p>
              <br />
              <p 
                className="text-base leading-snug text-ink max-w-md font-semibold ml-32"
                data-slide-up
              >
                Creator of full-stack and mobile products including <br />
                WaitFast, a real-time iOS app with a Flask/AWS backend. <br />
                Graduate of the University of Michigan, B.S. in <br />
                Electrical Engineering &amp; Computer Science, Class of 2025.
              </p>
            </div>
          </div>
        </header>

        {/* RIGHT: 3D model */}
        <figure data-scale-in>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      {/* Bottom-left availability */}
      <aside
        className="
          availability-badge
          fixed left-5 md:left-6 bottom-5 md:bottom-6 z-[60]
          text-[12px] md:text-[13px]
          text-[color:var(--color-black-100)]
          opacity-80 hover:opacity-100 transition
          select-none
        "
        data-fade-in
      >
        <div>University of Michigan CSE 2025</div>
        <div>Available for work</div>
        <a
          href="mailto:adwisi@umich.edu"
          className="underline underline-offset-2 decoration-[color:var(--color-white-50)]"
        >
          adwisi@umich.edu
        </a>
      </aside>
    </section>
  );
};

export default Hero;