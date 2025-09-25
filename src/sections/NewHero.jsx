// src/sections/NewHero.jsx
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NewHero = () => {
  const nameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Character split utility
  const splitChars = (el) => {
    if (!el) return [];
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      span.style.display = "inline-block";
      span.style.transform = "translateY(120%)";
      span.style.willChange = "transform,opacity";
      frag.appendChild(span);
    }
    el.appendChild(frag);
    return el.querySelectorAll(".char");
  };

  // Scramble effect
  const scrambleChars = (targets, finalText, duration = 1.6, delay = 0) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const chars = Array.from(targets);
    const final = finalText.split("");
    const start = performance.now() + delay * 1000;
    const end = start + duration * 1000;

    function tick(now) {
      if (now < start) return requestAnimationFrame(tick);
      const t = Math.min(1, (now - start) / (duration * 1000));
      chars.forEach((span, i) => {
        if (t < i / chars.length) {
          span.textContent = charset[(Math.random() * charset.length) | 0];
        } else {
          span.textContent = final[i] ?? "";
        }
      });
      if (now < end) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  useGSAP(() => {
    if (!isLoaded) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Name animation - much slower and after grid starts
    if (nameRef.current) {
      const chars = splitChars(nameRef.current);
      if (chars.length > 0) {
        tl.from(chars, {
          duration: 2.5, // Much slower
          y: 150,
          stagger: 0.08, // Slower stagger
          ease: 'expo',
          onStart: () => {
            scrambleChars(chars, "ADAM SIMPSON", 2.2, 0); // Longer scramble
          }
        }, 0.2);
      }
    }

    // Footer metadata
    tl.from('.meta-span', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'expo',
      stagger: 0.1
    }, 1.5) // Start after name
    // Navigation stack
    .from('.nav-item', {
      duration: 1.0,
      y: 40,
      opacity: 0,
      ease: 'expo.out',
      stagger: 0.06
    }, 1.8); // Start after metadata

  }, [isLoaded]);

  // Set loaded state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden snap-section"
      style={{ height: '100dvh' }}
    >
      <div className="hero-new-layout">
        {/* Temporary colored background for top half */}
        <div className="stage-container" style={{ backgroundColor: '#DAE0D2' }} />

        {/* Content */}
        <div className="hero-content">
          {/* Role badge over grid */}
          <div className="role-badge">
            Systems & ML Developer
          </div>

          {/* Main title */}
          <h1 ref={nameRef} className="hero-name" id="hero-name">
            ADAM SIMPSON
          </h1>

          {/* Footer metadata - 3 columns */}
          <div className="meta-footer">
            <div className="meta-col">
              <span className="meta-span">university of michigan</span>
              <span className="meta-span">cse • class of 2025</span>
            </div>
            <div className="meta-col">
              <span className="meta-span">ann arbor, mi</span>
              <span className="meta-span">adwisi@umich.edu</span>
            </div>
            <div className="meta-col">
              <span className="meta-span">available for work</span>
              <span className="meta-span">systems & ml focus</span>
            </div>
          </div>
        </div>

        {/* Bottom-right vertical nav */}
        <nav className="stack-nav" aria-label="Section navigation">
          <a href="#projects" className="nav-item">Projects</a>
          <a href="#experience" className="nav-item">Experience</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>
        </nav>
      </div>
    </section>
  );
};

export default NewHero;