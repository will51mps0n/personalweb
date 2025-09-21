// src/sections/Hero.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
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
          data-glitch-content
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

            <div className="hero-socials" aria-label="Social links">
              <a
                className="hero-social-button"
                href="https://www.linkedin.com/in/adam-simpson-b6a3201a7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="hero-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.5 3.75C5.5 5.14 4.39 6.25 3 6.25C1.61 6.25 0.5 5.14 0.5 3.75C0.5 2.36 1.61 1.25 3 1.25C4.39 1.25 5.5 2.36 5.5 3.75ZM0.75 8.5H5.25V21.5H0.75V8.5ZM8.75 8.5H13.05V10.29H13.11C13.72 9.15 15.09 7.95 17.21 7.95C21.6 7.95 22.5 10.83 22.5 14.66V21.5H18.02V15.41C18.02 13.98 17.99 12.15 15.96 12.15C13.9 12.15 13.58 13.68 13.58 15.31V21.5H9.08L9.08 8.5H8.75Z" />
                </svg>
              </a>
              <a
                className="hero-social-button"
                href="https://github.com/will51mps0n"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg className="hero-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0.75C5.65 0.75 0.5 5.9 0.5 12.25C0.5 17.32 3.84 21.62 8.38 23.09C8.95 23.2 9.16 22.84 9.16 22.52C9.16 22.23 9.14 21.47 9.13 20.49C6.02 21.16 5.37 19.08 5.37 19.08C4.85 17.77 4.07 17.44 4.07 17.44C2.97 16.7 4.15 16.72 4.15 16.72C5.36 16.81 5.99 18 5.99 18C7.08 19.83 8.92 19.29 9.6 18.98C9.71 18.21 10 17.69 10.33 17.4C7.76 17.11 5.03 16.07 5.03 11.72C5.03 10.48 5.47 9.49 6.2 8.73C6.08 8.44 5.68 7.31 6.31 5.72C6.31 5.72 7.25 5.4 9.13 6.76C10.01 6.52 10.95 6.4 11.88 6.4C12.81 6.4 13.75 6.52 14.64 6.76C16.52 5.4 17.46 5.72 17.46 5.72C18.09 7.31 17.69 8.44 17.57 8.73C18.3 9.49 18.74 10.48 18.74 11.72C18.74 16.09 16 17.1 13.41 17.39C13.83 17.77 14.21 18.53 14.21 19.66C14.21 21.27 14.18 22.41 14.18 22.52C14.18 22.84 14.39 23.21 14.97 23.09C19.5 21.61 22.84 17.31 22.84 12.25C22.84 5.9 17.7 0.75 11.34 0.75Z" />
                </svg>
              </a>
              <a
                className="hero-social-button"
                href="mailto:adwisi@umich.edu"
                aria-label="Email"
              >
                <svg className="hero-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.5 4.75H20.5C21.47 4.75 22.25 5.53 22.25 6.5V17.5C22.25 18.47 21.47 19.25 20.5 19.25H3.5C2.53 19.25 1.75 18.47 1.75 17.5V6.5C1.75 5.53 2.53 4.75 3.5 4.75ZM20.5 7.31L12.05 12.44L3.5 7.28V17.5H20.5V7.31ZM12.05 10.56L20.5 5.44H3.5L12.05 10.56Z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* RIGHT: 3D model */}
        <figure data-scale-in data-glitch-content>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

    </section>
  );
};

export default Hero;
