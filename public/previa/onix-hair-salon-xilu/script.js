/* Onix v2 · Fashion-Glam Elevator — Lenis + GSAP ScrollTrigger */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var narrow = window.matchMedia('(max-width: 900px)').matches;
  var KEY = 'onix-intro-seen';

  /* ---- Elevator intro (once per session, skippable, ~1.05s) ---- */
  function runIntro(done) {
    var el = document.getElementById('intro');
    // Só com ?intro=1 — nunca automática. Ainda limitada a 1× por sessão e desligada em reduced-motion.
    var force = /(?:\?|&)intro=1(?:&|$)/.test(location.search);
    var seen = false;
    try { seen = !!sessionStorage.getItem(KEY); } catch (e) {}
    if (!el || reduce || !force || seen) {
      if (el) el.remove();
      done();
      return;
    }
    el.classList.add('is-on');
    document.body.classList.add('is-intro-lock');
    var finished = false;
    var skip = el.querySelector('[data-skip-intro]');
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Esc') finish(); }
    function finish() {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      document.removeEventListener('keydown', onKey);
      el.classList.add('is-opening');
      if (skip) skip.remove();
      window.setTimeout(function () {
        el.remove();
        document.body.classList.remove('is-intro-lock');
        done();
      }, 1100);
    }
    document.addEventListener('keydown', onKey);
    if (skip) { skip.addEventListener('click', finish); try { skip.focus({ preventScroll: true }); } catch (e) { skip.focus(); } }
    window.setTimeout(finish, 1200);
  }

  function lazyMap() {
    var b = document.querySelector('[data-load-map]');
    if (!b) return;
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.title = 'Mapa — Onix Hair Salon';
      f.src = b.getAttribute('data-src');
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      b.closest('.mapa').appendChild(f);
      f.focus();
    });
  }
  lazyMap();

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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function bloomIO() {
    var nodes = document.querySelectorAll('.bloom');
    if (!('IntersectionObserver' in window) || reduce) {
      nodes.forEach(function (n) { n.classList.add('is-bloom'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-bloom');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.28 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function neonOn() {
    var n = document.querySelector('[data-neon]');
    if (!n) return;
    if (reduce) { n.classList.add('is-on'); return; }
    window.setTimeout(function () { n.classList.add('is-on'); }, 120);
  }

  function kenBurns() {
    var img = document.querySelector('.hero__kb');
    if (img && !reduce && !narrow && !saveData) img.classList.add('is-kb');
  }

  function sparkles() {
    var canvas = document.querySelector('[data-sparkle]');
    if (!canvas || reduce || narrow || saveData) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var particles = [];
    var running = false;
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn() {
      particles = [];
      var w = canvas.clientWidth || 300;
      var h = canvas.clientHeight || 300;
      var n = Math.min(28, Math.floor(w / 40));
      for (var i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.8,
          a: 0.15 + Math.random() * 0.45,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.35,
          tw: Math.random() * Math.PI * 2
        });
      }
    }
    function frame() {
      if (!running) return;
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.tw += 0.04;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        var alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.fillStyle = 'rgba(224,192,120,' + alpha + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        running = e.isIntersecting;
        if (running) requestAnimationFrame(frame);
      });
    }, { threshold: 0.1 });
    resize(); spawn();
    io.observe(canvas.parentElement);
    window.addEventListener('resize', function () { resize(); spawn(); }, { passive: true });
  }

  function bootPremium() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      revealIO(); bloomIO(); neonOn(); kenBurns(); sparkles();
      return;
    }
    document.documentElement.classList.add('has-gsap');
    gsap.registerPlugin(ScrollTrigger);

    if (!reduce && !saveData && typeof Lenis !== 'undefined') {
      var lenis = new Lenis({
        duration: 1.05,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: !narrow
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    neonOn();
    kenBurns();
    bloomIO();
    sparkles();

    gsap.utils.toArray('.rv').forEach(function (el) {
      var delay = (parseFloat(getComputedStyle(el).getPropertyValue('--i')) || 0) * 0.06;
      gsap.fromTo(el,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    /* Big type zoom-in */
    gsap.utils.toArray('[data-zoom]').forEach(function (el) {
      var num = el.querySelector('.marco__num');
      if (!num || reduce) return;
      gsap.fromTo(num,
        { scale: 0.72, autoAlpha: 0.3 },
        {
          scale: 1, autoAlpha: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 35%', scrub: 0.6 }
        }
      );
    });

    /* Split parallax */
    if (!reduce && !narrow) {
      gsap.utils.toArray('[data-parallax-slow] img').forEach(function (img) {
        gsap.to(img, {
          yPercent: 12, ease: 'none',
          scrollTrigger: { trigger: img.closest('.experiencia') || img, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
      gsap.utils.toArray('[data-parallax-fast] img').forEach(function (img) {
        gsap.to(img, {
          yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
      var wood = document.querySelector('[data-wood-parallax]');
      if (wood) {
        gsap.to(wood, {
          yPercent: 18, ease: 'none',
          scrollTrigger: { trigger: '.rodape', start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
      var retrato = document.querySelector('.hero__retrato img');
      if (retrato) {
        gsap.to(retrato, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
  }

  function whenReady() {
    function go() {
      if (typeof gsap !== 'undefined') bootPremium();
      else { revealIO(); bloomIO(); neonOn(); kenBurns(); sparkles(); }
    }
    runIntro(function () {
      if (reduce) {
        document.querySelectorAll('.rv').forEach(function (n) { n.classList.add('is-in'); });
        document.querySelectorAll('.bloom').forEach(function (n) { n.classList.add('is-bloom'); });
        neonOn();
        return;
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
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenReady);
  else whenReady();
})();
