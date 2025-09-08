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
 // Center the intro lines precisely
const NUDGE_UP_PX = 40;
if (document.fonts && document.fonts.ready) { await document.fonts.ready; }
requestAnimationFrame(() => {
  const svg   = document.getElementById('name-svg');
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');

  const vb = svg.viewBox.baseVal;
  const cx = vb.x + vb.width / 2;
  const cy = vb.y + vb.height / 2 - NUDGE_UP_PX;

  // center both lines horizontally
  line1.setAttribute('text-anchor','middle');
  line2.setAttribute('text-anchor','middle');
  line1.setAttribute('x', cx);
  line2.setAttribute('x', cx);

  // vertical spacing between lines (tweak if you want them closer/farther)
    const lineGap = 80; // spacing between lines
    line1.setAttribute('y', cy - lineGap/2 - 20); // move Hi up by 20px
    line2.setAttribute('y', cy + lineGap/2);
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
