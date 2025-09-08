// Mouse-driven marquee with inertia
document.addEventListener('DOMContentLoaded', () => {
  const marquee = document.getElementById('marquee');
  const track   = document.getElementById('marqueeTrack');
  if (!marquee || !track) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let pos = 0;           // current X offset (px)
  let vx  = 0;           // velocity
  const friction = 0.8;  // lower = stops quicker
  const sensitivity = 0.6;

  let lastX = null;

  function loop(){
    pos += vx;

    // Wrap seamlessly (two copies in markup)
    const cycle = track.scrollWidth / 2;
    if (pos <= -cycle) pos += cycle;
    if (pos > 0)       pos -= cycle;

    track.style.transform = `translateX(${pos}px)`;
    vx *= friction;
    requestAnimationFrame(loop);
  }

  function onMove(e){
    const dx = (typeof e.movementX === 'number' ? e.movementX :
               (lastX === null ? 0 : e.clientX - lastX));
    vx += dx * sensitivity;
    lastX = e.clientX;
  }
  function onLeave(){ lastX = null; }

  marquee.addEventListener('mousemove', onMove, {passive:true});
  marquee.addEventListener('mouseleave', onLeave, {passive:true});

  loop();
});
