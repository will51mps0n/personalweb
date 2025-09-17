// src/system/ScrollStages.jsx
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollStages({ debug = false }) {
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".stage");
    const cleanups = [];

    sections.forEach((section) => {
      const content = section.querySelector(".stage-content");
      if (!content) return;

      // knobs you can set per-section as data-* attributes
      const effect = section.dataset.effect || "fade";       // fade | slide-x | slide-y | zoom
      const ease   = section.dataset.ease   || "none";       // none = linear scrub
      const speed  = Number(section.dataset.speed || 1);     // >1 reveals faster, <1 slower
      const blur   = section.dataset.blur === "true";        // optional soft-focus

      // where the animation starts/ends relative to section scroll
      // end distance controls "how long" it plays (feel of speed)
      const endDistance = `${Math.round(100 * (1.2 / speed))}%`; // tuneable

      // pick animation endpoints
      const fromVars =
        effect === "slide-x" ? { xPercent:  25, opacity: 0 } :
        effect === "slide-y" ? { yPercent:  25, opacity: 0 } :
        effect === "zoom"    ? { scale:   0.92, opacity: 0 } :
                               { opacity: 0 };

      const toVars =
        effect === "slide-x" ? { xPercent: -25, opacity: 0 } :
        effect === "slide-y" ? { yPercent: -25, opacity: 0 } :
        effect === "zoom"    ? { scale:   1.08, opacity: 0 } :
                               { opacity: 0 };

      // blur option (nice reference-like softness)
      if (blur) {
        fromVars.filter = "blur(10px) contrast(1.2)";
        toVars.filter   = "blur(10px) contrast(1.2)";
      }

      const tl = gsap.timeline({
        defaults: { ease },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `bottom top+=${endDistance}`,
          scrub: true,
          markers: debug,
          // pin: false,            // sticky means no pin required
          // anticipatePin: 1,      // only if you switch to pinning
        },
      });

      // reveal first half → hide second half
      tl.fromTo(
        content,
        { ...fromVars },
        { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, filter: "none", duration: 0.5 }
      ).to(content, { ...toVars, duration: 0.5 });

      cleanups.push(() => tl.scrollTrigger?.kill());
      cleanups.push(() => tl.kill());
    });

    return () => cleanups.forEach((c) => c());
  }, [debug]);

  return null; // no UI
}
