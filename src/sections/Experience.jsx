import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from 'react';

import { expCards } from "../constants";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-item").forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            scroller,
            horizontal: true,
            start: "left 85%",
            end: "left 30%",
          },
        });
      });

      gsap.to(".timeline-axis-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-horizontal",
          scroller,
          horizontal: true,
          start: "left left",
          end: "right right",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const handleSectionChange = (event) => {
      const { id } = event.detail || {};
      window.dispatchEvent(new CustomEvent(id === 'experience' ? 'disableMainScroll' : 'enableMainScroll'));
    };

    const handleWheel = (event) => {
      const dominantDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
      if (dominantDelta === 0) return;

      scroller.scrollLeft += dominantDelta;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    const handleKeydown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const delta = event.key === 'ArrowRight'
          ? scroller.clientWidth * 0.6
          : -scroller.clientWidth * 0.6;
        scroller.scrollLeft += delta;
      }
    };

    window.addEventListener('sectionChange', handleSectionChange);
    scroller.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeydown);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
      scroller.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('keydown', handleKeydown);
      window.dispatchEvent(new CustomEvent('enableMainScroll'));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="snap-section experience-isolated"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div
        ref={scrollContainerRef}
        className="experience-scroll experience-scroll-horizontal w-full h-full md:px-20 px-5"
      >
        <h1 className="sr-only">Professional Work Experience</h1>
        <div className="timeline-horizontal" ref={timelineRef}>
          <span className="timeline-axis" aria-hidden="true">
            <span className="timeline-axis-fill" />
          </span>
          {expCards.map((card) => (
            <div key={card.title} className="timeline-item">
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-media">
                <GlowCard card={card}>
                  <div>
                    <img src={card.imgPath} alt={card.title} />
                  </div>
                </GlowCard>
              </div>
              <div className="timeline-copy">
                <div className="timeline-logo">
                  <img src={card.logoPath} alt={`${card.company} logo`} />
                </div>
                <div>
                  <h2 className="timeline-title">{card.title}</h2>
                  <p className="timeline-date">{card.date}</p>
                  <p className="timeline-section-label">Responsibilities</p>
                  <ul className="timeline-list">
                    {card.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
