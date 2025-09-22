// src/components/models/hero_models/HeroExperience.jsx
// Animated hero background inspired by Adrian Hajdin's portfolio project.
import React from "react";

const HeroExperience = () => {
  return (
    <div className="hero-animation">
      <svg
        className="hero-animation__svg"
        viewBox="0 0 602 602"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        role="presentation"
        aria-hidden="true"
      >
        <g
          opacity="0.98"
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
          fill="#8fbbe9"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </ellipse>
        <path
          d="M294.685 193.474L268.932 219.258"
          transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)"
          stroke="rgba(6, 79, 148, 0.95)"
          strokeWidth="1.5"
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
          fill="#bcd6f1"
        >
          <animateMotion dur="5s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_2" />
          </animateMotion>
        </ellipse>
        <path
          d="M294.685 193.474L268.932 219.258"
          transform="translate(-294.685 -193.474) rotate(45 294.685 193.474)"
          stroke="rgba(8, 98, 170, 0.98)"
          strokeWidth="1.3"
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
          fill="#9fc3ec"
        >
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M476.171 362.952L450.417 337.168"
          transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)"
          stroke="rgba(6, 79, 148, 0.95)"
          strokeWidth="1.5"
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
          fill="#c7dcf2"
        >
          <animateMotion dur="10s" begin="1" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M381.81 154.669L356.057 128.885"
          transform="translate(-381.81 -154.669) rotate(-45 381.81 154.669)"
          stroke="rgba(8, 98, 170, 0.98)"
          strokeWidth="1.3"
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
          fill="#bfd8f1"
        >
          <animateMotion dur="5s" begin="0" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_1" />
          </animateMotion>
        </ellipse>
        <path
          d="M333.667 382.335L359.42 356.551"
          transform="scale(-1 1) translate(-333.667 -382.335) rotate(45 333.667 382.335)"
          stroke="rgba(8, 98, 170, 0.98)"
          strokeWidth="1.3"
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
          fill="#bfd8f1"
        >
          <animateMotion dur="10s" begin="3" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M165.182 94.3159L139.429 120.1"
          transform="translate(-165.182 -94.3159) rotate(45 165.182 94.3159)"
          stroke="rgba(8, 98, 170, 0.98)"
          strokeWidth="1.3"
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
          fill="#78aee3"
        >
          <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </ellipse>
        <path
          d="M476.171 362.952L450.417 337.168"
          transform="translate(-476.525 -363.313) rotate(-45 476.171 362.952)"
          stroke="rgba(6, 79, 148, 0.95)"
          strokeWidth="1.5"
        >
          <animateMotion dur="12s" begin="4" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#path_0" />
          </animateMotion>
        </path>
        <defs>
          <radialGradient id="ringOuter" cx="0.5" cy="0.5" r="0.78">
            <stop offset="0%" stopColor="rgba(140, 183, 232, 0.55)" />
            <stop offset="45%" stopColor="rgba(126, 174, 226, 0.28)" />
            <stop offset="82%" stopColor="rgba(241, 239, 236, 0.78)" />
            <stop offset="100%" stopColor="rgba(241, 239, 236, 1)" />
          </radialGradient>
          <radialGradient id="ringMid" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="rgba(116, 168, 225, 0.62)" />
            <stop offset="52%" stopColor="rgba(94, 152, 214, 0.33)" />
            <stop offset="86%" stopColor="rgba(241, 239, 236, 0.82)" />
            <stop offset="100%" stopColor="rgba(241, 239, 236, 1)" />
          </radialGradient>
          <radialGradient id="ringInner" cx="0.5" cy="0.5" r="0.82">
            <stop offset="0%" stopColor="rgba(102, 156, 218, 0.64)" />
            <stop offset="58%" stopColor="rgba(76, 132, 199, 0.38)" />
            <stop offset="88%" stopColor="rgba(241, 239, 236, 0.86)" />
            <stop offset="100%" stopColor="rgba(241, 239, 236, 1)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroExperience;
