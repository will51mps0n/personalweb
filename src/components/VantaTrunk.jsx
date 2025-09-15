// src/components/VantaTrunk.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import TRUNK from "vanta/dist/vanta.trunk.min";
import p5 from "p5";

export default function VantaTrunk({
  color = 0x0077b6,
  backgroundColor = 0xf2f0ef,
  spacing = 0.0,
  chaos = 1.0,
}) {
  const ref = useRef(null);
  const [vanta, setVanta] = useState(null);

  useEffect(() => {
    if (!vanta && ref.current) {
      const v = TRUNK({
        el: ref.current,
        THREE,
        p5,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 400.0,
        minWidth: 400.0,
        backgroundColor,
        color,
        spacing,
        chaos,
        scale: 1.0,
        scaleMobile: 1.0,
      });
      setVanta(v);
    }
    return () => {
      if (vanta) vanta.destroy();
    };
  }, [vanta, color, backgroundColor, spacing, chaos]);

  // Changed: Remove absolute positioning, let it fill the container
  return <div ref={ref} className="w-full h-full min-h-[100vh]" />;
}