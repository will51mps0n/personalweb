document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w,h,dpr,pts,mouse;
  const DENSITY = 0.00009, CONNECT = 120, SPEED = 0.35, PULL = 0.12;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width  = Math.floor(innerWidth  * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width  = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    const n = Math.round(innerWidth * innerHeight * DENSITY);
    pts = Array.from({length:n}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*SPEED*dpr,
      vy: (Math.random()-0.5)*SPEED*dpr,
      r: 1.6*dpr
    }));
  }

  mouse = { x:-9999, y:-9999 };
  window.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * dpr;
    mouse.y = (e.clientY - r.top)  * dpr;
  });
  window.addEventListener('mouseleave', ()=>{ mouse.x=mouse.y=-9999; });

  function frame(){
    ctx.clearRect(0,0,w,h);
    const line = getComputedStyle(root).getPropertyValue('--line').trim() || '#bdbdbd';
    ctx.fillStyle = ctx.strokeStyle = line; ctx.lineWidth = 1.2*dpr; ctx.globalAlpha = 0.9;

    for (const p of pts){
      const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx,dy);
      if (dist < 180*dpr){
        p.vx += (dx/(dist||1))*PULL*0.02*dpr;
        p.vy += (dy/(dist||1))*PULL*0.02*dpr;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>w) p.vx*=-1;
      if (p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }

    const cell=80*dpr, cols=Math.ceil(w/cell), rows=Math.ceil(h/cell);
    const grid=Array.from({length:cols*rows},()=>[]);
    pts.forEach((p,i)=>{
      const c=Math.max(0,Math.min(cols-1,Math.floor(p.x/cell)));
      const r=Math.max(0,Math.min(rows-1,Math.floor(p.y/cell)));
      grid[r*cols+c].push(i);
    });

    ctx.beginPath();
    for (let r=0;r<rows;r++){
      for (let c=0;c<cols;c++){
        const bucket=[];
        for (let rr=r; rr<=Math.min(rows-1,r+1); rr++)
          for (let cc=c; cc<=Math.min(cols-1,c+1); cc++)
            bucket.push(...grid[rr*cols+cc]);

        for (let i=0;i<bucket.length;i++){
          const a=pts[bucket[i]];
          for (let j=i+1;j<bucket.length;j++){
            const b=pts[bucket[j]];
            const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
            if (d < CONNECT*dpr){
              const alpha = 1 - (d/(CONNECT*dpr));
              ctx.globalAlpha = 0.9*alpha;
              ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            }
          }
        }
      }
    }
    ctx.stroke(); ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, {passive:true});
  resize(); requestAnimationFrame(frame);
});
