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
    this.scrollCooldown = 900; // Longer cooldown for snap effect
    this.glitchOverlay = null;
    this.sectionMeta = [];
    this.strongScrollThreshold = 35;
    this.minScrollStrength = 3;

    this.handleSectionRequest = this.handleSectionRequest.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  init() {
    this.sections = gsap.utils.toArray('[data-scroll-section]');
    
    if (this.sections.length === 0) return;

    this.sectionMeta = this.sections.map((section, index) => ({
      element: section,
      id: section.dataset.sectionId || section.id || `section-${index}`,
      title: section.dataset.sectionTitle || section.dataset.title || section.id || `Section ${index + 1}`,
      variant: section.dataset.titleVariant || 'standard',
      difficulty: section.dataset.scrollDifficulty || 'normal',
      mode: section.dataset.scrollMode || 'panel'
    }));

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

    window.addEventListener('requestSectionScroll', this.handleSectionRequest);

    this.dispatchSectionChange();

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
        onToggle: (self) => {
          if (self.isActive) {
            this.updateCurrentSection(index);
          }
        }
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
    document.addEventListener('touchstart', this.onTouchStart, { passive: true });
    document.addEventListener('touchend', this.onTouchEnd, { passive: false });
  }

  onTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
  }

  onTouchEnd(e) {
    this.touchEndY = e.changedTouches[0].clientY;
    const diff = this.touchStartY - this.touchEndY;

    if (Math.abs(diff) > this.minSwipeDistance) {
      const direction = diff > 0 ? 'down' : 'up';
      const changed = this.attemptSectionChange(direction, { strength: this.strongScrollThreshold + 1 });
      if (changed) {
        e.preventDefault();
      }
    }
  }

  setupKeyboardEvents() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
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
      default:
        break;
    }
  }

  handleWheel(e) {
    const now = Date.now();

    if (this.isScrolling || now - this.lastScrollTime < this.scrollCooldown) {
      e.preventDefault();
      return;
    }

    const meta = this.sectionMeta[this.currentSection];
    if (!meta) return;

    const direction = e.deltaY > 0 ? 'down' : 'up';
    const strength = Math.abs(e.deltaY);

    if (meta.mode !== 'scrollable') {
      e.preventDefault();
    }

    const changed = this.attemptSectionChange(direction, { strength });

    if (changed) {
      e.preventDefault();
    }
  }

  attemptSectionChange(direction, { strength = this.strongScrollThreshold + 1, force = false } = {}) {
    const now = Date.now();

    if (this.isScrolling || now - this.lastScrollTime < this.scrollCooldown) {
      return false;
    }

    const meta = this.sectionMeta[this.currentSection];
    if (!meta) return false;

    const mode = meta.mode || 'panel';
    const difficulty = meta.difficulty || 'normal';
    const strongThreshold = difficulty === 'hard' ? this.strongScrollThreshold : this.minScrollStrength;

    if (!force) {
      if (mode === 'scrollable' && !this.isAtScrollableBoundary(direction)) {
        return false;
      }

      if (mode !== 'scrollable' && strength < strongThreshold) {
        if (difficulty === 'hard') {
          this.teaseTransition(direction);
        }
        return false;
      }

      if (mode === 'scrollable' && strength < this.minScrollStrength) {
        return false;
      }
    }

    if (direction === 'down' && this.currentSection < this.sections.length - 1) {
      this.scrollToSection(this.currentSection + 1);
      return true;
    }

    if (direction === 'up' && this.currentSection > 0) {
      this.scrollToSection(this.currentSection - 1);
      return true;
    }

    return false;
  }

  isAtScrollableBoundary(direction) {
    const currentSection = this.sections[this.currentSection];
    if (!currentSection) return true;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    const threshold = Math.min(this.scrollThreshold, windowHeight * 0.35);

    if (direction === 'down') {
      return scrollTop + windowHeight >= sectionTop + sectionHeight - threshold;
    }

    if (direction === 'up') {
      return scrollTop <= sectionTop + threshold;
    }

    return false;
  }

  teaseTransition() {
    if (!this.glitchOverlay || this.isScrolling) return;

    gsap.killTweensOf(this.glitchOverlay);

    gsap.timeline()
      .set(this.glitchOverlay, {
        opacity: 0,
        scale: 1.01,
        filter: 'contrast(1.2) saturate(1.05)'
      })
      .to(this.glitchOverlay, {
        opacity: 0.28,
        duration: 0.18,
        ease: 'power2.out'
      })
      .to(this.glitchOverlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.in'
      });
  }

  handleScroll(direction) {
    return this.attemptSectionChange(direction, { strength: this.strongScrollThreshold + 1 });
  }

  scrollToSection(index) {
    if (this.isScrolling || index < 0 || index >= this.sections.length || index === this.currentSection) return;

    const previousSection = this.currentSection;
    const outgoingSection = this.sections[previousSection];
    const targetSection = this.sections[index];

    if (!targetSection) return;

    this.isScrolling = true;
    this.lastScrollTime = Date.now();
    this.currentSection = index;

    this.dispatchSectionChange();

    // Start glitch transition
    this.triggerGlitchTransition(outgoingSection, targetSection);

    if (outgoingSection) {
      outgoingSection.classList.add('transitioning-out');
    }
    targetSection.classList.add('transitioning-in');

    gsap.delayedCall(0.35, () => {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'auto'
      });
    });

    gsap.delayedCall(0.95, () => {
      if (outgoingSection) {
        outgoingSection.classList.remove('transitioning-out');
      }
      targetSection.classList.remove('transitioning-in');
      this.animateSectionContent(targetSection);
      this.isScrolling = false;
    });
  }

  triggerGlitchTransition(outgoingSection, incomingSection) {
    if (!this.glitchOverlay) return;

    gsap.killTweensOf(this.glitchOverlay);

    const tl = gsap.timeline();

    tl.set(this.glitchOverlay, {
      opacity: 0,
      scale: 1.02,
      filter: 'contrast(1.4) saturate(1.2)'
    })
      .to(this.glitchOverlay, {
        opacity: 0.9,
        duration: 0.18,
        ease: 'power4.out'
      })
      .to(this.glitchOverlay, {
        opacity: 0.75,
        duration: 0.28,
        ease: 'expo.out'
      })
      .to(this.glitchOverlay, {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.out',
        delay: 0.25
      });

    const addGlitchClass = (el) => {
      if (!el) return;
      el.classList.add('glitching');
      setTimeout(() => {
        el.classList.remove('glitching');
      }, 900);
    };

    addGlitchClass(outgoingSection);
    addGlitchClass(incomingSection);
  }

  animateSectionContent(section) {
    if (!section) return;

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
        }, 850);
      }, i * 60);
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

  dispatchSectionChange() {
    const meta = this.sectionMeta[this.currentSection];
    if (!meta) return;

    window.dispatchEvent(new CustomEvent('sectionChange', {
      detail: {
        index: this.currentSection,
        id: meta.id,
        title: meta.title,
        variant: meta.variant,
        total: this.sections.length
      }
    }));
  }

  updateCurrentSection(index) {
    if (this.isScrolling || index === this.currentSection) return;

    this.currentSection = index;
    this.dispatchSectionChange();
  }

  // Public method to manually go to a section
  goToSection(index) {
    this.scrollToSection(index);
  }

  scrollToSectionById(id) {
    const index = this.sectionMeta.findIndex((meta) => meta.id === id);
    if (index === -1) return;
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

  handleSectionRequest(event) {
    const { id } = event.detail || {};
    if (!id) return;

    this.scrollToSectionById(id);
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

    window.removeEventListener('requestSectionScroll', this.handleSectionRequest);

    // Remove glitch overlay
    if (this.glitchOverlay && this.glitchOverlay.parentNode) {
      this.glitchOverlay.parentNode.removeChild(this.glitchOverlay);
    }
    
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];
    
    this.enableNativeScrollSnap();
    
    // Remove other event listeners
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
  }
}

export default ScrollController;
