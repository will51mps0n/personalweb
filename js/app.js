// ===== Custom cursor with 'physics' squish =====
(function(){
  var cursor = document.getElementById('cursor');
  var targetX = window.innerWidth/2, targetY = window.innerHeight/2;
  var x = targetX, y = targetY;
  var vx = 0, vy = 0;
  var ease = 0.18;   // how fast the cursor follows
  var friction = 0.85; // velocity decay
  var lastX = x, lastY = y;
  var isDown = false;
  function onMove(e){
    var p = e.touches ? e.touches[0] : e;
    targetX = p.clientX; targetY = p.clientY;
  }
  function loop(){
    var dx = targetX - x;
    var dy = targetY - y;
    vx = vx * friction + dx * ease;
    vy = vy * friction + dy * ease;
    x += vx; y += vy;

    // squish based on velocity
    var speed = Math.min(1.5, Math.sqrt(vx*vx + vy*vy) / 15);
    var scaleX = 1 + speed*0.6;
    var scaleY = 1 - speed*0.3;
    cursor.style.transform = 'translate(' + (x-12) + 'px,' + (y-12) + 'px) scale(' + scaleX.toFixed(3) + ',' + scaleY.toFixed(3) + ')';

    requestAnimationFrame(loop);
  }
  window.addEventListener('mousemove', onMove, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('mousedown', function(){ isDown = true; cursor.classList.add('cursor--down'); });
  window.addEventListener('mouseup',   function(){ isDown = false; cursor.classList.remove('cursor--down'); });

  // hover detection: any element with [data-hover] toggles hover state
  document.addEventListener('mouseover', function(e){
    var el = e.target.closest('[data-hover]');
    if (el) cursor.classList.add('cursor--hover');
  });
  document.addEventListener('mouseout', function(e){
    var el = e.target.closest('[data-hover]');
    if (el) cursor.classList.remove('cursor--hover');
  });
  loop();
})();

// ===== Intro typewriter + slide up =====
(function(){
  var intro = document.getElementById('intro');
  var el = document.getElementById('type');
  if (!intro || !el) return;

  var text = "Hi, I'm Adam Simpson";
  var i = 0;
  function tick(){
    if (i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, 50);
    }else{
      // small delay then slide up
      setTimeout(function(){
        intro.classList.add('intro--slide');
        // after slide finishes, remove from flow
        setTimeout(function(){ intro.style.display = 'none'; }, 950);
      }, 500);
    }
  }
  // slight delay to mimic reference
  setTimeout(tick, 400);
})();
