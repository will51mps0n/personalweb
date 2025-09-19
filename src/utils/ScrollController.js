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
    this.glitchTextDuration = 1.2;
    this.initialRevealPlayed = false;
    this.boundaryHoldStart = null;
    this.boundaryHoldDirection = null;
    this.boundaryHoldDuration = 420;

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
      mode: section.dataset.scrollMode || 'panel',
      boundary: section.dataset.scrollBoundary ? parseFloat(section.dataset.scrollBoundary) : null
    }));

    this.prepareGlitchContentDefaults();

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

    this.runInitialReveal();

  }

  createGlitchOverlay() {
    // Create the glitch overlay element
    this.glitchOverlay = document.createElement('div');
    this.glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(this.glitchOverlay);
  }

  prepareGlitchContentDefaults() {
    this.sections.forEach((section) => {
      const elements = this.getGlitchElements(section);
      if (elements.length === 0) return;

      gsap.set(elements, {
        opacity: 0,
        y: 14,
        filter: 'blur(4px)',
        pointerEvents: 'none'
      });
    });
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

  runInitialReveal() {
    if (this.initialRevealPlayed) return;

    const initialSection = this.sections[0];
    if (!initialSection) return;

    this.initialRevealPlayed = true;

    gsap.delayedCall(0.2, () => {
      const introTimeline = this.triggerGlitchTransition(null, initialSection) || gsap.timeline({ paused: true });

      this.animateSectionContent(initialSection, introTimeline);

      introTimeline.add(() => {
        this.isScrolling = false;
      }, '>');

      introTimeline.play(0);
    });
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
      const atBoundary = mode === 'scrollable' && this.isAtScrollableBoundary(direction, meta);

      if (mode === 'scrollable' && !atBoundary) {
        this.resetBoundaryHold();
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

      if (mode === 'scrollable' && difficulty === 'hard') {
        const holdReady = this.handleBoundaryHold(now, direction, strength);
        if (!holdReady) {
          return false;
        }
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

  isAtScrollableBoundary(direction, meta = null) {
    const currentSection = this.sections[this.currentSection];
    if (!currentSection) return true;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const sectionTop = currentSection.offsetTop;
    const sectionHeight = currentSection.offsetHeight;
    const boundary = meta && Number.isFinite(meta.boundary) ? meta.boundary : this.scrollThreshold;
    const threshold = Math.min(boundary, windowHeight * 0.35);

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
    this.resetBoundaryHold();
    this.lastScrollTime = Date.now();
    this.currentSection = index;

    this.dispatchSectionChange();

    const transitionTimeline = this.triggerGlitchTransition(outgoingSection, targetSection) || gsap.timeline({ paused: true });

    this.animateSectionContent(targetSection, transitionTimeline);

    transitionTimeline.add(() => {
      if (outgoingSection) {
        outgoingSection.classList.add('transitioning-out');
      }
      targetSection.classList.add('transitioning-in');
    }, 0);

    transitionTimeline.to(window, {
      scrollTo: { y: targetSection, autoKill: false },
      duration: 0.9,
      ease: 'power2.inOut'
    }, 0.38);

    transitionTimeline.add(() => {
      if (outgoingSection) {
        outgoingSection.classList.remove('transitioning-out');
      }
      targetSection.classList.remove('transitioning-in');
      this.isScrolling = false;
    }, '>');

    transitionTimeline.play(0);
  }

  triggerGlitchTransition(outgoingSection, incomingSection) {
    if (this.glitchOverlay) {
      gsap.killTweensOf(this.glitchOverlay);
    }

    const timeline = gsap.timeline({ paused: true });

    if (this.glitchOverlay) {
      timeline
        .set(this.glitchOverlay, {
          opacity: 0,
          scale: 1.02,
          filter: 'contrast(1.45) saturate(1.25)'
        }, 0)
        .to(this.glitchOverlay, {
          opacity: 0.95,
          duration: 0.24,
          ease: 'power4.out'
        }, 0)
        .to(this.glitchOverlay, {
          opacity: 0.75,
          duration: 0.32,
          ease: 'expo.out'
        }, 0.24)
        .to(this.glitchOverlay, {
          opacity: 0.42,
          duration: 0.28,
          ease: 'sine.out'
        }, 0.56)
        .to(this.glitchOverlay, {
          opacity: 0,
          duration: 0.74,
          ease: 'power1.out'
        }, 0.84);
    }

    this.applySectionGlitchClass(outgoingSection, 1.6);
    this.applySectionGlitchClass(incomingSection, 1.6);

    this.buildGlitchContentTimeline(timeline, outgoingSection, incomingSection);

    return timeline;
  }

  buildGlitchContentTimeline(timeline, outgoingSection, incomingSection) {
    if (!timeline) return;

    const outgoingElements = this.getGlitchElements(outgoingSection);
    const incomingElements = this.getGlitchElements(incomingSection);

    if (outgoingElements.length > 0) {
      timeline.set(outgoingElements, { pointerEvents: 'none' }, 0);
      timeline.add(() => this.applyGlitchClass(outgoingElements, 1.35), 0.04);
      timeline.to(outgoingElements, {
        opacity: 0,
        y: -12,
        filter: 'blur(6px)',
        duration: 0.45,
        ease: 'power2.in',
        stagger: { each: 0.05, from: 'end' }
      }, 0.14);
    }

    if (incomingElements.length > 0) {
      timeline.set(incomingElements, {
        opacity: 0,
        y: 22,
        filter: 'blur(6px)',
        pointerEvents: 'none'
      }, 0);

      timeline.add(() => this.applyGlitchClass(incomingElements, 1.35), 0.34);

      timeline.to(incomingElements, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.78,
        ease: 'power3.out',
        stagger: 0.06
      }, 0.6);

      timeline.set(incomingElements, { pointerEvents: 'auto' }, '>');
    }
  }

  animateSectionContent(section, timeline = null) {
    if (!section) return;

    const fadeElements = Array.from(section.querySelectorAll('[data-fade-in]'));
    const slideElements = Array.from(section.querySelectorAll('[data-slide-up]'));
    const scaleElements = Array.from(section.querySelectorAll('[data-scale-in]'));

    const hasTimeline = Boolean(timeline);
    const baseTimelineStart = hasTimeline ? 0.92 : 0;

    const animateGroup = (elements, setProps, toProps, timelinePosition, fallbackDelay) => {
      if (elements.length === 0) return;
      gsap.set(elements, setProps);

      if (hasTimeline) {
        timeline.to(elements, { ...toProps }, timelinePosition);
      } else {
        gsap.to(elements, { ...toProps, delay: fallbackDelay });
      }
    };

    animateGroup(
      fadeElements,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
      baseTimelineStart,
      0.4
    );

    animateGroup(
      slideElements,
      { opacity: 0, y: 40, rotationX: 10 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.2)' },
      baseTimelineStart + 0.12,
      0.5
    );

    animateGroup(
      scaleElements,
      { opacity: 0, scale: 0.7, rotation: 5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.9, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
      Math.max(baseTimelineStart - 0.08, 0),
      0.3
    );

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

  getGlitchElements(section) {
    if (!section) return [];
    return Array.from(section.querySelectorAll('[data-glitch-content]'));
  }

  applyGlitchClass(elements, durationMultiplier = 1) {
    const nodes = Array.isArray(elements) ? elements : Array.from(elements || []);
    const duration = this.glitchTextDuration * durationMultiplier * 1000;

    nodes.forEach((node) => {
      if (!node) return;
      this.clearGlitchTimeout(node);
      node.classList.add('glitch-text');
      node.__glitchTimeoutId = setTimeout(() => {
        node.classList.remove('glitch-text');
        node.__glitchTimeoutId = null;
      }, duration);
    });
  }

  applySectionGlitchClass(section, durationMultiplier = 1) {
    if (!section) return;
    const duration = this.glitchTextDuration * durationMultiplier * 1000;

    this.clearGlitchTimeout(section);
    section.classList.add('glitching');
    section.__glitchTimeoutId = setTimeout(() => {
      section.classList.remove('glitching');
      section.__glitchTimeoutId = null;
    }, duration);
  }

  clearGlitchTimeout(target) {
    if (!target || !target.__glitchTimeoutId) return;
    clearTimeout(target.__glitchTimeoutId);
    target.__glitchTimeoutId = null;
  }

  handleBoundaryHold(now, direction, strength) {
    if (this.boundaryHoldDirection !== direction) {
      this.boundaryHoldDirection = direction;
      this.boundaryHoldStart = now;
      return false;
    }

    if (this.boundaryHoldStart === null) {
      this.boundaryHoldStart = now;
      return false;
    }

    const elapsed = now - this.boundaryHoldStart;
    if (elapsed < this.boundaryHoldDuration) {
      return false;
    }

    return strength >= this.strongScrollThreshold;
  }

  resetBoundaryHold() {
    this.boundaryHoldStart = null;
    this.boundaryHoldDirection = null;
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
