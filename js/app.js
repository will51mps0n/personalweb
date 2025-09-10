// Respect reduced motion preference
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   Custom cursor with simple physics (inertia + squish)
   - Grows/tints on [data-hover]
   - Tints on mousedown
   ========================================================= */
(function cursorPhysics(){
  var cursor = document.getElementById('cursor');
  if (!cursor) return;

  var targetX = window.innerWidth/2, targetY = window.innerHeight/2;
  var x = targetX, y = targetY, vx = 0, vy = 0;
  var ease = REDUCED ? 1 : 0.18;       // follow instantly if reduced motion
  var friction = REDUCED ? 1 : 0.85;   // no inertia if reduced motion

  function onMove(e){
    var p = e.touches ? e.touches[0] : e;
    targetX = p.clientX; targetY = p.clientY;
    if (REDUCED){ x = targetX; y = targetY; draw(); }
  }

  function draw(){
    // squish based on speed
    var speed = Math.sqrt(vx*vx + vy*vy);
    var k = Math.min(1.5, speed / 15);
    var sx = 1 + (REDUCED ? 0 : k * 0.6);
    var sy = 1 - (REDUCED ? 0 : k * 0.3);
    cursor.style.transform =
      'translate(' + (x-12) + 'px,' + (y-12) + 'px) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
  }

  function loop(){
    vx = vx * friction + (targetX - x) * ease;
    vy = vy * friction + (targetY - y) * ease;
    x += vx; y += vy;
    draw();
    if (!REDUCED) requestAnimationFrame(loop);
  }

  window.addEventListener('mousemove', onMove, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:true});

  window.addEventListener('mousedown', function(){ cursor.classList.add('cursor--down'); });
  window.addEventListener('mouseup',   function(){ cursor.classList.remove('cursor--down'); });

  // Hover state on anything with [data-hover]
  document.addEventListener('mouseover', function(e){
    if (e.target.closest('[data-hover]')) cursor.classList.add('cursor--hover');
  });
  document.addEventListener('mouseout', function(e){
    if (e.target.closest('[data-hover]')) cursor.classList.remove('cursor--hover');
  });

  draw();
  if (!REDUCED) loop();
})();

// Lottie intro animation
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const container = document.getElementById("lottie-hello");

  if (!container) return;

  const anim = lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "assets/cat.json" // <-- your animation JSON
  });

  // When the animation finishes, trigger the slide-up
  anim.addEventListener("complete", () => {
    setTimeout(() => {
      intro.classList.add("intro--slide");
    }, 200); // small delay feels smoother
  });

  // Safety: if it fails to load, slide up anyway
  anim.addEventListener("data_failed", () => {
    intro.classList.add("intro--slide");
  });
});


/* =========================================================
   Intro typewriter → slide-up reveal
   ========================================================= */
(function introGate(){
  var intro = document.getElementById('intro');
  var out = document.getElementById('type');
  if (!intro || !out) return;

  var text = "Hi, I'm Adam Simpson";
  var i = 0;

  function tick(){
    if (i <= text.length){
      out.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, REDUCED ? 0 : 48);
    }else{
      setTimeout(function(){
        intro.classList.add('intro--slide');
        setTimeout(function(){ intro.style.display = 'none'; }, REDUCED ? 0 : 950);
      }, REDUCED ? 0 : 450);
    }
  }

  setTimeout(tick, REDUCED ? 0 : 350);
})();

/* =========================================================
   One-line hero marquee (mouse-driven inertia)
   - Repeats text inside #heroTrack for seamless wrap
   - Horizontal velocity comes from mouse delta X
   ========================================================= */
(function heroMarquee(){
  var track = document.getElementById('heroTrack');
  if (!track) return;

  var pos = 0, vx = 0;
  var friction = REDUCED ? 1 : 0.92;
  var sensitivity = REDUCED ? 0 : 0.35;
  var lastX = null;
  var cycle = 0;

  function recalc(){
    // Half the scroll width because content is duplicated
    cycle = track.scrollWidth / 2;
  }

  function render(){
    track.style.transform = 'translate3d(' + pos + 'px,-50%,0)';
  }

  function loop(){
    pos += vx;
    if (pos <= -cycle) pos += cycle;
    if (pos > 0)       pos -= cycle;
    render();
    vx *= friction;
    requestAnimationFrame(loop);
  }

  function onMove(e){
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    if (lastX !== null){
      var dx = x - lastX;
      vx += dx * sensitivity;
    }
    lastX = x;
    if (REDUCED){ pos = 0; render(); } // frozen if reduced motion
  }

  window.addEventListener('mousemove', onMove, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('resize', recalc);

  recalc();
  if (!REDUCED) loop();
})();
