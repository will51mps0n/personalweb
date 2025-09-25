import { useState, useEffect } from 'react';

const MobileSectionHeader = ({ title, className = "" }) => {
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
    <div className={`mobile-section-header ${className}`}>
      <h1 className="mobile-section-title">{title}</h1>
    </div>
  );
};

export default MobileSectionHeader;