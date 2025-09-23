// src/components/models/hero_models/HeroExperience.jsx
// Michigan-themed hero SVG displayed on the landing experience.
import React from "react";
import michiganHeroSvg from "../../../heroSVG.svg";

const HeroExperience = () => {
  return (
    <div className="hero-animation" aria-hidden="true">
      <img
        src={michiganHeroSvg}
        className="hero-animation__svg hero-animation__svg--um"
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default HeroExperience;
