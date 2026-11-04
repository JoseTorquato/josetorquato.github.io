/* Rosé Hair Therapy · Ritual / Spa de luz — motion (GSAP + ScrollTrigger + Lenis) */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var narrow = window.matchMedia('(max-width: 900px)').matches;

  function revealIO() {
    var nodes = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function animateCount(el, target, isFloat) {
    var start = 0;
    var dur = 1100;
    var t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = start + (target - start) * eased;
      if (isFloat) el.textContent = val.toFixed(1).replace('.', ',');
      else el.textContent = Math.round(val).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function setFinal(n) {
    if (n.hasAttribute('data-count')) n.textContent = Number(n.getAttribute('data-count')).toFixed(1).replace('.', ',');
    if (n.hasAttribute('data-count-int')) n.textContent = Number(n.getAttribute('data-count-int')).toLocaleString('pt-BR');
  }
  function armCounters() {
    var nodes = document.querySelectorAll('[data-count], [data-count-int]');
    if (!nodes.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(setFinal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target;
        if (n.dataset.counted) return;
        n.dataset.counted = '1';
        // Above-the-fold: snap to final quickly so LCP/screenshots stay accurate
        var rect = n.getBoundingClientRect();
        var aboveFold = rect.top < window.innerHeight * 0.85;
        if (aboveFold) {
          if (n.hasAttribute('data-count')) animateCount(n, parseFloat(n.getAttribute('data-count')), true);
          if (n.hasAttribute('data-count-int')) animateCount(n, parseInt(n.getAttribute('data-count-int'), 10), false);
          // ensure final after anim window
          setTimeout(function () { setFinal(n); }, 1200);
        } else {
          if (n.hasAttribute('data-count')) animateCount(n, parseFloat(n.getAttribute('data-count')), true);
          if (n.hasAttribute('data-count-int')) animateCount(n, parseInt(n.getAttribute('data-count-int'), 10), false);
        }
        io.unobserve(n);
      });
    }, { threshold: 0.35 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function bootPremium() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      revealIO();
      armCounters();
      return;
    }
    document.documentElement.classList.add('has-gsap');
    gsap.registerPlugin(ScrollTrigger);

    if (!reduce && !saveData && typeof Lenis !== 'undefined') {
      var lenis = new Lenis({
        duration: 1.15,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: !narrow
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    // Soft staggered reveals — breathing feel (slower ease)
    gsap.utils.toArray('.rv').forEach(function (el) {
      var delay = (parseFloat(getComputedStyle(el).getPropertyValue('--i')) || 0) * 0.08;
      gsap.fromTo(el,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: delay,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    // Gentle parallax on hero accent (desktop only)
    var accent = document.querySelector('.hero__accent');
    if (accent && !reduce && !narrow) {
      gsap.to(accent, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    // Soft scale on hero card
    var card = document.querySelector('.hero__card');
    if (card && !reduce && !narrow) {
      gsap.fromTo(card,
        { scale: 1.04 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
        }
      );
    }

    armCounters();
  }

  function whenReady() {
    if (reduce) {
      document.querySelectorAll('.rv').forEach(function (n) { n.classList.add('is-in'); });
      armCounters();
      return;
    }
    function go() {
      if (typeof gsap !== 'undefined') bootPremium();
      else { revealIO(); armCounters(); }
    }
    if (typeof gsap !== 'undefined') { go(); return; }
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (typeof gsap !== 'undefined' || tries > 40) {
        clearInterval(t);
        go();
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', whenReady);
  } else {
    whenReady();
  }
})();

/* Mapa: carrega o iframe do Google só no clique (fachada) */
(function () {
  var b = document.querySelector('.mapa__abrir');
  if (!b) return;
  b.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.title = 'Mapa — Rosé Hair Therapy em Canoas';
    f.src = b.getAttribute('data-mapa-src');
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    b.replaceWith(f);
    f.focus();
  });
})();
