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

  useGSAP(() => {
    // Loop through each timeline card and animate them in
    // as the user scrolls to each card
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      // Animate the card coming in from the left
      // and fade in
      gsap.from(card, {
        // Move the card in from the left
        xPercent: -100,
        // Make the card invisible at the start
        opacity: 0,
        // Set the origin of the animation to the left side of the card
        transformOrigin: "left left",
        // Animate over 1 second
        duration: 1,
        // Use a power2 ease-in-out curve
        ease: "power2.inOut",
        // Trigger the animation when the card is 80% of the way down the screen
        scrollTrigger: {
          // The card is the trigger element
          trigger: card,
          // Trigger the animation when the card is 80% down the screen
          start: "top 80%",
          // Use the scrollable container as the scroller
          scroller: scrollContainerRef.current,
        },
      });
    });

    // Animate the timeline height as the user scrolls within the container
    gsap.to(".timeline", {
      scaleY: 0,
      transformOrigin: "bottom bottom",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-content", // Use a wrapper around timeline content
        start: "top top",
        end: "bottom bottom",
        scroller: scrollContainerRef.current,
        scrub: 1, // Smooth scrubbing animation
        onUpdate: (self) => {
          // Animate the timeline bar revealing as we scroll down
          gsap.to(".timeline", {
            scaleY: self.progress,
            duration: 0.1,
            ease: "none"
          });
        },
      },
    });

    // Loop through each expText element and animate them in
    // as the user scrolls to each text element
    gsap.utils.toArray(".expText").forEach((text) => {
      // Animate the text opacity from 0 to 1
      // and move it from the left to its final position
      // over 1 second with a power2 ease-in-out curve
      gsap.from(text, {
        // Set the opacity of the text to 0
        opacity: 0,
        // Move the text from the left to its final position
        // (xPercent: 0 means the text is at its final position)
        xPercent: 0,
        // Animate over 1 second
        duration: 1,
        // Use a power2 ease-in-out curve
        ease: "power2.inOut",
        // Trigger the animation when the text is 60% down the screen
        scrollTrigger: {
          // The text is the trigger element
          trigger: text,
          // Trigger the animation when the text is 60% down the screen
          start: "top 60%",
          scroller: scrollContainerRef.current,
        },
      });
    }, "<"); // position parameter - insert at the start of the animation
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isAtTop = true;
    let isAtBottom = false;

    const checkScrollBoundaries = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const threshold = 5;
      
      isAtTop = scrollTop <= threshold;
      isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      
      // Debug logging
      console.log('Experience scroll boundaries:', {
        scrollTop,
        clientHeight,
        scrollHeight,
        threshold,
        isAtTop,
        isAtBottom,
        sum: scrollTop + clientHeight,
        target: scrollHeight - threshold
      });
    };

    const handleScroll = () => {
      checkScrollBoundaries();
    };

    const handleWheel = (event) => {
      checkScrollBoundaries();
      
      const { deltaY } = event;
      const scrollingUp = deltaY < 0;
      const scrollingDown = deltaY > 0;

      // Only allow section navigation when at boundaries
      if ((scrollingUp && isAtTop) || (scrollingDown && isAtBottom)) {
        // Let the main ScrollController handle section navigation
        console.log('Allowing section navigation:', { 
          direction: scrollingUp ? 'up' : 'down', 
          isAtTop, 
          isAtBottom 
        });
        return;
      } else {
        // Stop propagation to prevent section navigation
        console.log('Preventing section navigation - not at boundary');
        event.stopPropagation();
      }
    };

    // Force an initial scroll to ensure we're not at bottom on load
    scrollContainer.scrollTop = 0;
    
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Initial boundary check with a small delay
    setTimeout(checkScrollBoundaries, 100);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="snap-section"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div 
        ref={scrollContainerRef}
        className="experience-scroll w-full h-full md:px-20 px-5"
        style={{ 
          height: '100%', 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <h1 className="sr-only">Professional Work Experience</h1>
        <div className="mt-12 md:mt-20 relative pb-20">
          {/* Timeline content wrapper for animation trigger */}
          <div className="timeline-content">
            <div className="relative z-50 xl:space-y-32 space-y-10">
              {expCards.map((card) => (
                <div key={card.title} className="exp-card-wrapper timeline-card">
                  <div className="xl:w-2/6">
                    <GlowCard card={card}>
                      <div>
                        <img src={card.imgPath} alt="exp-img" />
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
                          <img src={card.logoPath} alt="logo" />
                        </div>
                        <div>
                          <h1 className="font-semibold text-3xl text-[color:var(--color-white-50)]">{card.title}</h1>
                          <p className="my-5 text-white-50">
                            &nbsp;{card.date}
                          </p>
                          <p className="text-[#839CB5] italic">
                            Responsibilities
                          </p>
                          <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-[color:var(--color-black-100)]">
                            {card.responsibilities.map((responsibility, index) => (
                              <li key={index} className="text-lg">
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