// src/sections/Experience.jsx
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";

import { expCards } from "../constants";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const timelineContentRef = useRef(null);
  const duplicatedCards = useMemo(() => [...expCards, ...expCards], []);

  useGSAP(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        gsap.from(card, {
          xPercent: -100,
          opacity: 0,
          transformOrigin: "left left",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            scroller,
          },
        });
      });

      ScrollTrigger.create({
        trigger: ".timeline-content",
        start: "top top",
        end: "bottom bottom",
        scroller,
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: self.progress,
            transformOrigin: "bottom bottom",
            duration: 0.12,
            ease: "none",
          });
        },
      });

      gsap.utils.toArray(".expText").forEach((text) => {
        gsap.from(text, {
          opacity: 0,
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: text,
            start: "top 60%",
            scroller,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const timelineContent = timelineContentRef.current;
    if (!scrollContainer || !timelineContent) return;

    const totalHeight = timelineContent.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;
    const halfHeight = totalHeight / 2;

    let lock = false;

    const handleScroll = () => {
      if (lock) return;
      const { scrollTop } = scrollContainer;

      if (scrollTop >= halfHeight) {
        lock = true;
        scrollContainer.scrollTop = scrollTop - halfHeight;
        setTimeout(() => {
          lock = false;
        }, 40);
      } else if (scrollTop <= 0) {
        lock = true;
        scrollContainer.scrollTop = halfHeight - containerHeight;
        setTimeout(() => {
          lock = false;
        }, 40);
      }
    };

    const handleWheel = (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      scrollContainer.scrollTop += event.deltaY;
      event.preventDefault();
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    scrollContainer.scrollTop = 40;
    ScrollTrigger.refresh();

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel, true);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleSectionChange = (event) => {
      const { id } = event.detail || {};
      if (id === "experience") {
        document.body.classList.add("experience-active");
        window.dispatchEvent(new CustomEvent("disableMainScroll"));
      } else {
        document.body.classList.remove("experience-active");
        window.dispatchEvent(new CustomEvent("enableMainScroll"));
      }
    };

    window.addEventListener("sectionChange", handleSectionChange);

    return () => {
      window.removeEventListener("sectionChange", handleSectionChange);
      document.body.classList.remove("experience-active");
      window.dispatchEvent(new CustomEvent("enableMainScroll"));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="snap-section experience-isolated"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
        ref={scrollContainerRef}
        className="experience-scroll w-full h-full md:px-20 px-5"
      >
        <h1 className="sr-only">Professional Work Experience</h1>
        <div className="mt-12 md:mt-20 relative pb-20">
          <div ref={timelineContentRef} className="timeline-content">
            <div className="relative z-50 xl:space-y-32 space-y-10">
            {duplicatedCards.map((card, index) => (
                <div key={`${card.title}-${index}`} className="exp-card-wrapper timeline-card">
                  <div className="xl:w-2/6">
                    <GlowCard card={card} index={index}>
                      <div>
                        <img src={card.imgPath} alt={card.title} />
                      </div>
                    </GlowCard>
                  </div>
                  <div className="xl:w-4/6">
                    <div className="flex items-start">
                      <div className="timeline-wrapper">
                        <div className="timeline" />
                        <div className="gradient-line w-1 h-full" />
                      </div>
                      <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                        <div className="timeline-logo">
                          <img src={card.logoPath} alt={`${card.company} logo`} />
                        </div>
                        <div>
                          <h2 className="font-semibold text-3xl text-[color:var(--color-white-50)]">{card.title}</h2>
                          <p className="my-5 text-white-50">&nbsp;{card.date}</p>
                          <p className="text-blue-50 italic">Responsibilities</p>
                          <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-[color:var(--color-black-100)]">
                            {card.responsibilities.map((responsibility, idx) => (
                              <li key={idx} className="text-lg">
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
