// Reduced motion
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- INTRO (hold, then slide) ---------- */
(function intro(){
  const intro = document.getElementById('intro');
  const slot  = document.getElementById('lottie-hello');
  if (!intro || !slot || !window.lottie) return;

  document.documentElement.classList.add('intro-open');
  document.body.classList.add('intro-open');

  const MIN_HOLD_MS = 900;
  const start = performance.now();
  let finished = false;

  const endIntro = () => {
    if (finished) return; finished = true;
    intro.classList.add('intro--slide');
    setTimeout(() => {
      intro.style.display = 'none';
      document.documentElement.classList.remove('intro-open');
      document.body.classList.remove('intro-open');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 900);
  };

  const anim = lottie.loadAnimation({
    container: slot, renderer:'svg', loop:false,
    autoplay: !REDUCED, path:'assets/kitty.json'
  });

  const finishAfterHold = () => {
    const wait = Math.max(0, MIN_HOLD_MS - (performance.now() - start));
    setTimeout(endIntro, wait);
  };

  anim.addEventListener('DOMLoaded', () => REDUCED && anim.goToAndStop(0, true));
  anim.addEventListener('complete', finishAfterHold);
  anim.addEventListener('data_failed', finishAfterHold);
  setTimeout(finishAfterHold, 4000);
})();

/* ---------- Brand Lottie (hover play, click home) ---------- */
(function brandLottie(){
  const mount = document.getElementById('brandLottie');
  if (!mount || !window.lottie) return;

  const anim = lottie.loadAnimation({
    container: mount, renderer:'svg', loop:true, autoplay:false,
    path:'assets/kitty.json'
  });
  const root = mount.closest('.brand--lottie');
  const play = () => !REDUCED && anim.play();
  const stop = () => { anim.pause(); anim.goToAndStop(0, true); };

  root.addEventListener('mouseenter', play);
  root.addEventListener('focus', play);
  root.addEventListener('mouseleave', stop);
  root.addEventListener('blur', stop);
  root.addEventListener('click', (e)=>{ e.preventDefault(); document.getElementById('hero').scrollIntoView({behavior:'smooth'}); });

  anim.addEventListener('DOMLoaded', () => anim.goToAndStop(0, true));
})();

/* ---------- Doodle Lotties (looping placeholders) ---------- */
(function doodles(){
  if (!window.lottie) return;
  document.querySelectorAll('.loz-doodle[data-lottie]').forEach(el=>{
    const path = el.getAttribute('data-lottie') || '';
    if (!path) return;
    const a = lottie.loadAnimation({ container: el, renderer:'svg', loop:true, autoplay:!REDUCED, path });
    if (REDUCED) a.goToAndStop(0, true);
  });
})();

/* ---------- Footer Marquee: endless & gapless ---------- */
(function stackMarquee(){
  const marquee = document.querySelector('.stack-marquee');
  if (!marquee) return;
  const base = marquee.querySelector('.stack-track');

  // Duplicate items until width > 2.5x container (ensures endless)
  function tile(){
    // Reset to original once on resize
    const originals = Array.from(base.children).slice();
    base.innerHTML = '';
    originals.forEach(n=>base.appendChild(n.cloneNode(true)));

    const containerW = marquee.clientWidth || 1;
    while (base.scrollWidth < containerW * 2.5) {
      originals.forEach(n=>base.appendChild(n.cloneNode(true)));
    }
    // set CSS vars
    const speed = Number(marquee.dataset.speed) || 70; // px/sec
    const w = base.scrollWidth;
    const dur = w / speed;
    marquee.style.setProperty('--w', w + 'px');
    marquee.style.setProperty('--dur', dur + 's');

    // Add one clone track for smooth wrap
    let clone = marquee.querySelector('.stack-track[data-clone]');
    if (clone) clone.remove();
    clone = base.cloneNode(true);
    clone.setAttribute('data-clone','');
    clone.setAttribute('aria-hidden','true');
    marquee.appendChild(clone);
  }

  tile();
  let t;
  window.addEventListener('resize', ()=>{ clearTimeout(t); t = setTimeout(tile, 120); });
})();

/* ---------- Reveal ---------- */
(function reveal(){
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){ e.target.classList.add('reveal--in'); io.unobserve(e.target); }
    }
  }, {root:null, rootMargin:"0px 0px -10% 0px", threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
