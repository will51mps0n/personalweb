// src/utils/ScrollController.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

class ScrollController {
  constructor() {
    this.sections = [];
    this.currentSection = 0;
    this.isScrolling = false;
    this.observer = null;
    this.scrollTriggers = [];
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
    this.scrollThreshold = 100;
    this.lastScrollTime = 0;
    this.scrollCooldown = 800; // Longer cooldown for snap effect
    this.glitchOverlay = null;
  }

  init() {
    this.sections = gsap.utils.toArray('[data-scroll-section]');
    
    if (this.sections.length === 0) return;

    // Create glitch overlay
    this.createGlitchOverlay();

    // Disable native scroll snap completely for snap effect
    this.disableNativeScrollSnap();
    
    // Set up scroll triggers for each section
    this.setupScrollTriggers();
    
    // Set up observer for wheel/touch events
    this.setupObserver();
    
    // Set up touch events for mobile
    this.setupTouchEvents();
    
    // Set up keyboard navigation
    this.setupKeyboardEvents();

    console.log(`ScrollController initialized with ${this.sections.length} sections`);
  }

  createGlitchOverlay() {
    // Create the glitch overlay element
    this.glitchOverlay = document.createElement('div');
    this.glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(this.glitchOverlay);
  }

  disableNativeScrollSnap() {
    document.documentElement.style.scrollSnapType = 'none';
    document.body.style.scrollSnapType = 'none';
  }

  enableNativeScrollSnap() {
    document.documentElement.style.scrollSnapType = 'y proximity';
    document.body.style.scrollSnapType = 'y proximity';
  }

  setupScrollTriggers() {
    this.sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => this.updateCurrentSection(index),
        onEnterBack: () => this.updateCurrentSection(index),
      });
      
      this.scrollTriggers.push(trigger);
    });
  }

  setupObserver() {
    // Use a simpler approach - just listen to wheel events directly
    this.handleWheel = this.handleWheel.bind(this);
    window.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  setupTouchEvents() {
    let startY = 0;
    let endY = 0;

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      
      if (Math.abs(diff) > this.minSwipeDistance) {
        if (diff > 0) {
          this.handleScroll('down');
        } else {
          this.handleScroll('up');
        }
      }
    }, { passive: true });
  }

  setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          this.handleScroll('down');
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this.handleScroll('up');
          break;
        case 'Home':
          e.preventDefault();
          this.scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          this.scrollToSection(this.sections.length - 1);
          break;
      }
    });
  }

  handleSwipe() {
    const diff = this.touchStartY - this.touchEndY;
    
    if (Math.abs(diff) > this.minSwipeDistance) {
      if (diff > 0) {
        this.handleScroll('down');
      } else {
        this.handleScroll('up');
      }
    }
  }

  handleWheel(e) {
    const now = Date.now();
    if (this.isScrolling || now - this.lastScrollTime < this.scrollCooldown) return;

    const currentSection = this.sections[this.currentSection];
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    
    // Check if we can scroll within the current section
    const isAtTop = scrollTop <= sectionTop + 50; // Increased threshold
    const isAtBottom = scrollTop + windowHeight >= sectionTop + sectionHeight - 50;
    
    // Only snap to next/prev section if we're at the boundaries AND scroll is strong enough
    const scrollStrength = Math.abs(e.deltaY);
    const minScrollStrength = 3; // Minimum scroll strength to trigger section change
    
    if (scrollStrength > minScrollStrength) {
      if (e.deltaY > 0 && isAtBottom && this.currentSection < this.sections.length - 1) {
        // Scrolling down, at bottom of section
        e.preventDefault();
        this.lastScrollTime = now;
        this.scrollToSection(this.currentSection + 1);
      } else if (e.deltaY < 0 && isAtTop && this.currentSection > 0) {
        // Scrolling up, at top of section
        e.preventDefault();
        this.lastScrollTime = now;
        this.scrollToSection(this.currentSection - 1);
      }
    }
  }

  handleScroll(direction) {
    // Keep this for compatibility but the wheel handler is doing the work now
    const now = Date.now();
    if (this.isScrolling || now - this.lastScrollTime < this.scrollCooldown) return;

    if (direction === 'down' && this.currentSection < this.sections.length - 1) {
      this.lastScrollTime = now;
      this.scrollToSection(this.currentSection + 1);
    } else if (direction === 'up' && this.currentSection > 0) {
      this.lastScrollTime = now;
      this.scrollToSection(this.currentSection - 1);
    }
  }

  scrollToSection(index, duration = 0.4) {
    if (this.isScrolling || index < 0 || index >= this.sections.length) return;

    this.isScrolling = true;
    const previousSection = this.currentSection;
    this.currentSection = index;

    const targetSection = this.sections[index];
    const currentSectionEl = this.sections[previousSection];
    
    // Start glitch transition
    this.triggerGlitchTransition();
    
    // Add transition classes
    currentSectionEl.classList.add('transitioning-out');
    targetSection.classList.add('transitioning-in');
    
    // Instant snap to section with slight delay for effect
    setTimeout(() => {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'auto' // Instant, no smooth scrolling
      });
      
      // Remove transition classes and add reveal
      setTimeout(() => {
        currentSectionEl.classList.remove('transitioning-out');
        targetSection.classList.remove('transitioning-in');
        
        // Trigger content reveal animation
        this.animateSectionContent(targetSection, index);
        
        this.isScrolling = false;
      }, 100);
      
    }, 200); // Brief delay for glitch effect
  }

  triggerGlitchTransition() {
    if (!this.glitchOverlay) return;
    
    // Show glitch overlay
    gsap.set(this.glitchOverlay, { opacity: 1 });
    
    // Hide it after animation
    gsap.to(this.glitchOverlay, {
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
      ease: "power2.out"
    });
    
    // Add glitch effect to current section
    const currentSectionEl = this.sections[this.currentSection];
    if (currentSectionEl) {
      currentSectionEl.classList.add('glitching');
      setTimeout(() => {
        currentSectionEl.classList.remove('glitching');
      }, 400);
    }
  }

  animateSectionContent(section, index) {
    // Find elements to animate within the section
    const fadeElements = section.querySelectorAll('[data-fade-in]');
    const slideElements = section.querySelectorAll('[data-slide-up]');
    const scaleElements = section.querySelectorAll('[data-scale-in]');
    const textElements = section.querySelectorAll('h1, h2, h3, p');
    
    // Add glitch text effect to headings during transition
    textElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('glitch-text');
        setTimeout(() => {
          el.classList.remove('glitch-text');
        }, 300);
      }, i * 50);
    });

    // Reset and animate fade elements with stagger
    if (fadeElements.length > 0) {
      gsap.set(fadeElements, { opacity: 0, y: 20, scale: 0.95 });
      gsap.to(fadeElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.4
      });
    }

    // Reset and animate slide elements
    if (slideElements.length > 0) {
      gsap.set(slideElements, { opacity: 0, y: 40, rotationX: 10 });
      gsap.to(slideElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        delay: 0.5
      });
    }

    // Reset and animate scale elements
    if (scaleElements.length > 0) {
      gsap.set(scaleElements, { opacity: 0, scale: 0.7, rotation: 5 });
      gsap.to(scaleElements, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3
      });
    }

    // Add overall section content reveal
    const sectionContent = section.querySelector('.section-content') || section;
    sectionContent.classList.add('section-content');
  }

  updateCurrentSection(index) {
    if (!this.isScrolling) {
      this.currentSection = index;
    }
  }

  // Public method to manually go to a section
  goToSection(index) {
    this.scrollToSection(index);
  }

  // Get current section info
  getCurrentSection() {
    return {
      index: this.currentSection,
      element: this.sections[this.currentSection],
      total: this.sections.length
    };
  }

  destroy() {
    // Clean up
    if (this.observer) {
      this.observer.kill();
    }
    
    // Remove wheel event listener
    if (this.handleWheel) {
      window.removeEventListener('wheel', this.handleWheel);
    }
    
    // Remove glitch overlay
    if (this.glitchOverlay && this.glitchOverlay.parentNode) {
      this.glitchOverlay.parentNode.removeChild(this.glitchOverlay);
    }
    
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];
    
    this.enableNativeScrollSnap();
    
    // Remove other event listeners
    document.removeEventListener('keydown', this.setupKeyboardEvents);
    document.removeEventListener('touchstart', this.setupTouchEvents);
    document.removeEventListener('touchend', this.setupTouchEvents);
  }
}

export default ScrollController;