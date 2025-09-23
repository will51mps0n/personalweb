import { useEffect, useRef } from 'react';

const TextGlitchHover = ({ children, radius = 50 }) => {
  const textRef = useRef(null);
  const charsRef = useRef([]);

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
        span.style.display = char === ' ' ? 'inline' : 'inline-block';
        span.style.position = 'relative';
        span.style.transition = 'text-shadow 0.1s ease';
        span.dataset.charIndex = index;
        textElement.appendChild(span);
        charsRef.current.push(span);
      });
    };

    const handleMouseMove = (e) => {
      const rect = textElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      charsRef.current.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + spanRect.width / 2;
        const spanY = spanRect.top - rect.top + spanRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - spanX, 2) + Math.pow(mouseY - spanY, 2)
        );

        if (distance <= radius) {
          // Apply glitch effect
          const intensity = 1 - (distance / radius);
          const offset = Math.floor(intensity * 3);
          span.style.textShadow = `
            -${offset}px 0 red,
            ${offset}px 0 cyan
          `;
          span.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
        } else {
          // Remove glitch effect
          span.style.textShadow = 'none';
          span.style.transform = 'none';
        }
      });
    };

    const handleMouseLeave = () => {
      charsRef.current.forEach((span) => {
        span.style.textShadow = 'none';
        span.style.transform = 'none';
      });
    };

    initializeText();
    textElement.addEventListener('mousemove', handleMouseMove);
    textElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      textElement.removeEventListener('mousemove', handleMouseMove);
      textElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [radius]);

  return (
    <span ref={textRef} style={{ cursor: 'default' }}>
      {children}
    </span>
  );
};

export default TextGlitchHover;