document.addEventListener('DOMContentLoaded', async () => {
  const root   = document.documentElement;
  const intro  = document.getElementById('intro');
  const svg    = document.getElementById('name-svg');
  const group  = document.getElementById('name-group');
  const textEl = document.getElementById('name-text');
  const welcome= document.getElementById('welcome');
  const siteEl = document.getElementById('site');
  const particles = document.getElementById('particles');

  // Center the intro name precisely
  const NUDGE_UP_PX = 40;
  if (document.fonts && document.fonts.ready) { await document.fonts.ready; }
  requestAnimationFrame(() => {
    const vb = svg.viewBox.baseVal;
    const box = textEl.getBBox();
    const cx = box.x + box.width/2;
    const cy = box.y + box.height/2;
    const targetX = vb.x + vb.width/2;
    const targetY = vb.y + vb.height/2 - NUDGE_UP_PX;
    group.setAttribute('transform', `translate(${targetX - cx},${targetY - cy})`);
  });

  // Timings: draw -> slide up -> remove
  const toMS = v => parseFloat(getComputedStyle(root).getPropertyValue(v)) * 1000;
  const drawMS  = toMS('--draw');
  const holdMS  = toMS('--hold');
  const slideMS = toMS('--slide');

  setTimeout(() => intro.classList.add('slide-away'), drawMS + holdMS);
  setTimeout(() => intro.remove(), drawMS + holdMS + slideMS + 40);

  // Click or Enter/Space to show the site
  function openSite(){
    welcome.setAttribute('hidden','');
    siteEl.removeAttribute('hidden');
    if (particles) particles.style.display = 'none';
    document.body.style.overflow = 'auto';
    window.scrollTo(0,0);
  }
  welcome.addEventListener('click', openSite);
  window.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openSite();
  });
});
