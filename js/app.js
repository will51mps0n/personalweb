// Respect reduced motion
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------ LOTTIE INTRO ------------------ */
(function intro(){
  const intro = document.getElementById('intro');
  const slot = document.getElementById('lottie-hello');
  if (!intro || !slot || !window.lottie) return;

  const anim = lottie.loadAnimation({
    container: slot,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'assets/cat.json' // your file
  });

  const finish = () => {
    // slide up and remove from flow
    intro.classList.add('intro--slide');
    setTimeout(() => (intro.style.display = 'none'), 1000);
  };

  anim.addEventListener('complete', () => setTimeout(finish, 150));
  anim.addEventListener('data_failed', finish);

  if (REDUCED) finish();
})();

/* ------------------ CURSOR ------------------ */
(function cursor(){
  const c = document.getElementById('cursor');
  if (!c) return;

  const set = (e) => {
    const p = e.touches ? e.touches[0] : e;
    c.style.left = p.clientX + 'px';
    c.style.top  = p.clientY + 'px';
  };
  window.addEventListener('mousemove', set, {passive:true});
  window.addEventListener('touchmove', set, {passive:true});
  window.addEventListener('mousedown', () => c.classList.add('cursor--down'));
  window.addEventListener('mouseup',   () => c.classList.remove('cursor--down'));

  document.addEventListener('mouseover', (e)=>{
    if (e.target.closest('[data-hover]')) c.classList.add('cursor--hover');
  });
  document.addEventListener('mouseout', (e)=>{
    if (e.target.closest('[data-hover]')) c.classList.remove('cursor--hover');
  });
})();

/* ------------------ HERO MARQUEE ------------------ */
(function marquee(){
  const track = document.getElementById('heroTrack');
  if (!track) return;

  let pos = 0, vx = 0;
  const friction = REDUCED ? 1 : 0.92;
  const sens      = REDUCED ? 0 : 0.35;
  let lastX = null, cycle = track.scrollWidth / 2;

  const render = () => track.style.transform = `translate3d(${pos}px,-50%,0)`;
  const recalc = () => (cycle = track.scrollWidth / 2);

  const loop = () => {
    pos += vx;
    if (pos <= -cycle) pos += cycle;
    if (pos > 0)       pos -= cycle;
    render(); vx *= friction;
    if (!REDUCED) requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', (e)=>{
    if (REDUCED) return;
    if (lastX !== null) vx += (e.clientX - lastX) * sens;
    lastX = e.clientX;
  }, {passive:true});

  window.addEventListener('resize', recalc);
  render(); if (!REDUCED) loop();
})();
