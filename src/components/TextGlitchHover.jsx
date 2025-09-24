import { useEffect, useRef } from 'react';

const TextGlitchHover = ({ children, radius = 80 }) => {
  const textRef = useRef(null);
  const charsRef = useRef([]);
  const animationRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Split text into individual character spans
    const initializeText = () => {
      const text = textElement.textContent;
      textElement.innerHTML = '';
      charsRef.current = [];

      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline';
        span.style.position = 'relative';
        span.style.transition = 'text-shadow 0.1s ease';
        span.dataset.charIndex = index;
        textElement.appendChild(span);
        charsRef.current.push(span);
      });
    };

    // Continuous subtle shake animation for characters in radius
    const continuousShake = () => {
      if (!isHoveringRef.current) return;

      charsRef.current.forEach((span) => {
        if (span.dataset.inRadius === 'true') {
          const intensity = parseFloat(span.dataset.intensity) || 0;
          const baseOffset = Math.floor(intensity * 3);
          const shakeX = (Math.random() - 0.5) * intensity * 0.5;
          const shakeY = (Math.random() - 0.5) * intensity * 0.5;

          span.style.textShadow = `
            -${baseOffset + (Math.random() - 0.5)}px 0 red,
            ${baseOffset + (Math.random() - 0.5)}px 0 cyan
          `;
          span.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
        }
      });

      animationRef.current = requestAnimationFrame(continuousShake);
    };

    const handleMouseMove = (e) => {
      const rect = textElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      isHoveringRef.current = true;

      charsRef.current.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + spanRect.width / 2;
        const spanY = spanRect.top - rect.top + spanRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - spanX, 2) + Math.pow(mouseY - spanY, 2)
        );

        if (distance <= radius) {
          // Mark as in radius and store intensity
          const intensity = 1 - (distance / radius);
          span.dataset.inRadius = 'true';
          span.dataset.intensity = intensity.toString();
        } else {
          // Remove glitch effect
          span.dataset.inRadius = 'false';
          span.style.textShadow = 'none';
          span.style.transform = 'none';
        }
      });

      // Start continuous animation if not already running
      if (!animationRef.current) {
        continuousShake();
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      charsRef.current.forEach((span) => {
        span.style.textShadow = 'none';
        span.style.transform = 'none';
        span.dataset.inRadius = 'false';
      });
    };

    initializeText();
    textElement.addEventListener('mousemove', handleMouseMove);
    textElement.addEventListener('mouseenter', handleMouseEnter);
    textElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      textElement.removeEventListener('mousemove', handleMouseMove);
      textElement.removeEventListener('mouseenter', handleMouseEnter);
      textElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [radius]);

  return (
    <span ref={textRef} style={{ cursor: 'default' }}>
      {children}
    </span>
  );
};

export default TextGlitchHover;