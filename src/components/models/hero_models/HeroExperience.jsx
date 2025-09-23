// src/components/models/hero_models/HeroExperience.jsx
// Original ring animation hero background inspired by Adrian Hajdin, with softened styling.
import React from "react";

const HeroExperience = () => {
  return (
    <div className="hero-animation" aria-hidden="true">
      <svg
        className="hero-animation__svg hero-animation__svg--rings"
        viewBox="0 0 602 602"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        role="presentation"
      >
        <g
          className="hero-rings"
          opacity="0.82"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437ZM30.4869 115.912C-8.82897 155.228 -8.82897 218.972 30.4869 258.287L343.713 571.513C383.028 610.829 446.772 610.829 486.088 571.513L571.513 486.088C610.829 446.772 610.829 383.028 571.513 343.713L258.287 30.4869C218.972 -8.82896 155.228 -8.82896 115.912 30.4869L30.4869 115.912Z"
            stroke="url(#ringOuter)"
            strokeWidth="1.85"
            id="path_0"
          />
          <path
            d="M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002L301.148 73.0516L343.713 30.4869C383.028 -8.82896 446.772 -8.82896 486.088 30.4869L571.513 115.912C610.829 155.228 610.829 218.972 571.513 258.287L357.802 471.999L300.852 415.049L514.563 201.337Z"
            stroke="url(#ringMid)"
            strokeWidth="1.65"
            id="path_1"
          />
          <path
            d="M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138C79.5739 421.275 79.5739 408.526 87.437 400.663L301.148 186.952L244.198 130.002L30.4869 343.713C-8.82897 383.028 -8.82897 446.772 30.4869 486.088L115.912 571.513C155.228 610.829 218.972 610.829 258.287 571.513L300.852 528.949L243.901 471.999Z"
            stroke="url(#ringInner)"
            strokeWidth="1.45"
            id="path_2"
          />
        </g>
        <ellipse
          cx="295.027"
          cy="193.118"
          transform="translate(-295.027 -193.118)"
          rx="1.07306"
          ry="1.07433"
          fill="#edf4ff"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </ellipse>
        <path
          d="M294.685 193.474L268.932 219.258"
          transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)"
          stroke="rgba(232, 243, 255, 0.92)"
          strokeWidth="1.45"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </path>
        <ellipse
          cx="295.027"
          cy="193.118"
          transform="translate(-295.027 -193.118)"
          rx="1.07306"
          ry="1.07433"
          fill="#f6f9ff"
        >
          <animateMotion dur="5s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </ellipse>
        <path
          d="M294.685 193.474L268.932 219.258"
          transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)"
          stroke="rgba(216, 235, 255, 0.9)"
          strokeWidth="1.2"
        >
          <animateMotion dur="5s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </path>
        <ellipse
          cx="476.525"
          cy="363.313"
          rx="1.07433"
          ry="1.07306"
          transform="translate(-476.525 -363.313) rotate(90 476.525 363.313)"
          fill="#eef5ff"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M476.171 362.952L450.417 337.168"
          transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)"
          stroke="rgba(232, 243, 255, 0.92)"
          strokeWidth="1.45"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </path>
        <ellipse
          cx="382.164"
          cy="155.029"
          rx="1.07433"
          ry="1.07306"
          transform="translate(-382.164 -155.029) rotate(90 382.164 155.029)"
          fill="#f5f8ff"
        >
          <animateMotion dur="10s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M381.81 154.669L356.057 128.885"
          transform="translate(-381.81 -154.669) rotate(-45 381.81 154.669)"
          stroke="rgba(216, 235, 255, 0.9)"
          strokeWidth="1.2"
        >
          <animateMotion dur="10s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </path>
        <ellipse
          cx="333.324"
          cy="382.691"
          rx="1.07306"
          ry="1.07433"
          transform="translate(-333.324 -382.691) rotate(-180 333.324 382.691)"
          fill="#f2f6ff"
        >
          <animateMotion dur="5s" begin="0" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_1" />
          </animateMotion>
        </ellipse>
        <path
          d="M333.667 382.335L359.42 356.551"
          transform="scale(-1 1) translate(-333.667 -382.335) rotate(45 333.667 382.335)"
          stroke="rgba(216, 235, 255, 0.9)"
          strokeWidth="1.2"
        >
          <animateMotion dur="5s" begin="0" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_1" />
          </animateMotion>
        </path>
        <ellipse
          cx="165.524"
          cy="93.9596"
          rx="1.07306"
          ry="1.07433"
          transform="translate(-165.524 -93.9596)"
          fill="#f2f6ff"
        >
          <animateMotion dur="10s" begin="3" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M165.182 94.3159L139.429 120.1"
          transform="translate(-165.182 -94.3159) rotate(45 165.182 94.3159)"
          stroke="rgba(216, 235, 255, 0.9)"
          strokeWidth="1.2"
        >
          <animateMotion dur="10s" begin="3" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </path>
        <ellipse
          cx="476.525"
          cy="363.313"
          rx="1.07433"
          ry="1.07306"
          transform="translate(-476.525 -363.313) rotate(90 476.525 363.313)"
          fill="#f0f6ff"
        >
          <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M476.171 362.952L450.417 337.168"
          transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)"
          stroke="rgba(232, 243, 255, 0.92)"
          strokeWidth="1.45"
        >
          <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </path>
        <defs>
          <radialGradient id="ringOuter" cx="0.5" cy="0.5" r="0.78">
            <stop offset="0%" stopColor="rgba(140, 183, 232, 0.52)" />
            <stop offset="52%" stopColor="rgba(126, 174, 226, 0.26)" />
            <stop offset="100%" stopColor="rgba(222, 230, 240, 0.08)" />
          </radialGradient>
          <radialGradient id="ringMid" cx="0.5" cy="0.5" r="0.58">
            <stop offset="0%" stopColor="rgba(38, 74, 128, 0.65)" />
            <stop offset="60%" stopColor="rgba(28, 54, 101, 0.4)" />
            <stop offset="100%" stopColor="rgba(210, 224, 239, 0.08)" />
          </radialGradient>
          <radialGradient id="ringInner" cx="0.5" cy="0.5" r="0.42">
            <stop offset="0%" stopColor="rgba(28, 54, 101, 0.72)" />
            <stop offset="58%" stopColor="rgba(23, 45, 86, 0.46)" />
            <stop offset="100%" stopColor="rgba(204, 218, 237, 0.08)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroExperience;
