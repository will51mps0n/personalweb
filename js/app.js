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
    intro.classList.add('intro--slide');
    setTimeout(() => (intro.style.display = 'none'), 900);
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

/* ------------------ NAV + HERO REACTIVE ------------------ */
(function reactive(){
  const header = document.getElementById('siteHeader');
  const heroInner = document.querySelector('.hero-inner');
  if (!header || !heroInner) return;

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    // Compact header
    if (y > 30) header.classList.add('nav--compact');
    else header.classList.remove('nav--compact');

    // Lift hero content a touch
    const maxLift = 24;
    const lift = Math.min(maxLift, y * 0.15);
    heroInner.style.transform = `translateY(-${lift}px)`;

    lastY = y;
  }, {passive:true});
})();

/* ------------------ INTERSECTION REVEAL ------------------ */
(function reveal(){
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('reveal--in');
        io.unobserve(e.target);
      }
    }
  }, {root:null, rootMargin:"0px 0px -10% 0px", threshold:0.1});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
