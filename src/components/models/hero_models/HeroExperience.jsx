// src/components/models/hero_models/HeroExperience.jsx

import React from "react";
// NOTE: from hero_models -> components, go up two levels:
import VantaRings from "../../VantaRings";

/**
 * HeroExperience
 * Replaces the 3D Canvas with a Vanta.js animated background.
 * This component only provides the animated backdrop; your hero text/button
 * should be layered above it in the parent (e.g., your Hero section).
 */
const HeroExperience = () => {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[100vh] overflow-hidden">
      {/* Vanta background fills the section */}

      {/* Optional: place any foreground overlay here if needed
          <div className="relative z-10">...</div>
       */}
    </div>
  );
};

export default HeroExperience;