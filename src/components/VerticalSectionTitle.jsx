import { useState, useEffect } from 'react';

const VerticalSectionTitle = ({ title, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className={`vertical-section-title ${className}`}>
      <h2 className="vertical-section-title-text">{title}</h2>
    </div>
  );
};

export default VerticalSectionTitle;