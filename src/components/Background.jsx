// src/components/Background.jsx
export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
<video
  className="bg-video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  src="/bg2.mp4"
/>
    </div>
  );
}