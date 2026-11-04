/* Premium motion core — frame scrub + map + counters + reveals */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);

  function tickClock() {
    var el = document.getElementById('clock');
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date());
    } catch (e) {
      var d = new Date();
      el.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }
  }
  if (document.getElementById('clock')) { tickClock(); setInterval(tickClock, 15000); }

  (function () {
    var box = document.querySelector('[data-map-src]');
    var btn = document.querySelector('[data-map-load]');
    if (!box || !btn) return;
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.title = box.getAttribute('data-map-title') || 'Mapa';
      iframe.src = box.getAttribute('data-map-src');
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  })();

  function animateCount(el, target, isFloat) {
    var dur = 1100, t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      var val = target * e;
      if (isFloat) el.textContent = val.toFixed(1).replace('.', ',');
      else el.textContent = Math.round(val).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(frame);
      else {
        if (isFloat) el.textContent = target.toFixed(1).replace('.', ',');
        else el.textContent = Math.round(target).toLocaleString('pt-BR');
      }
    }
    requestAnimationFrame(frame);
  }
  function armCounters() {
    var nodes = document.querySelectorAll('[data-count], [data-count-int]');
    if (!nodes.length) return;
    function setFinal(n) {
      if (n.hasAttribute('data-count')) n.textContent = Number(n.getAttribute('data-count')).toFixed(1).replace('.', ',');
      if (n.hasAttribute('data-count-int')) n.textContent = Number(n.getAttribute('data-count-int')).toLocaleString('pt-BR');
    }
    if (reduce || !('IntersectionObserver' in window)) { nodes.forEach(setFinal); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || e.target.dataset.counted) return;
        e.target.dataset.counted = '1';
        if (e.target.hasAttribute('data-count')) animateCount(e.target, parseFloat(e.target.getAttribute('data-count')), true);
        if (e.target.hasAttribute('data-count-int')) animateCount(e.target, parseInt(e.target.getAttribute('data-count-int'), 10), false);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function bootSequence() {
    var section = document.querySelector('.seq');
    if (!section) return;
    var canvas = section.querySelector('.seq__canvas');
    var poster = section.querySelector('.seq__poster');
    if (!canvas) { section.classList.add('is-static'); return; }
    var useMobile = narrow || saveData || (window.innerWidth < 900);
    var total = parseInt(section.getAttribute(useMobile ? 'data-frames-m' : 'data-frames-d'), 10) || 1;
    var base = useMobile ? 'assets/frames/m/' : 'assets/frames/d/';
    var frames = new Array(total);
    var current = -1;
    var ctx = canvas.getContext('2d', { alpha: false });
    function pad(n) { var s = String(n); while (s.length < 4) s = '0' + s; return s; }
    function coverDraw(img) {
      if (!img || !img.complete) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = canvas.clientWidth || window.innerWidth;
      var h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var ir = img.width / img.height, cr = w / h, dw, dh, dx, dy;
      if (ir > cr) { dh = h; dw = h * ir; dx = (w - dw) / 2; dy = 0; }
      else { dw = w; dh = w / ir; dx = 0; dy = (h - dh) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    }
    function nearestLoaded(i) {
      if (frames[i]) return frames[i];
      for (var d = 1; d < total; d++) {
        if (i - d >= 0 && frames[i - d]) return frames[i - d];
        if (i + d < total && frames[i + d]) return frames[i + d];
      }
      return null;
    }
    function showFrame(i) {
      i = Math.max(0, Math.min(total - 1, i | 0));
      if (i === current) return;
      var img = nearestLoaded(i);
      if (!img) return;
      current = i; coverDraw(img);
    }
    function loadOne(i) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
          frames[i] = img;
          if (i === 0) { coverDraw(img); section.classList.add('is-ready'); }
          resolve();
        };
        img.onerror = function () { resolve(); };
        img.src = base + 'f_' + pad(i + 1) + '.webp';
      });
    }
    async function preloadRest() {
      var batch = 4;
      for (var i = 1; i < total; i += batch) {
        var jobs = [];
        for (var j = i; j < Math.min(total, i + batch); j++) jobs.push(loadOne(j));
        await Promise.all(jobs);
        await new Promise(function (r) { setTimeout(r, 0); });
      }
    }
    function scheduleRest() {
      var started = false;
      function go() { if (started) return; started = true; preloadRest(); }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { go(); io.disconnect(); } });
        }, { rootMargin: '200% 0px' });
        io.observe(section);
      }
      if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 3500 });
      else setTimeout(go, 1800);
    }
    if (reduce || saveData) {
      section.classList.add('is-static');
      if (poster) poster.src = 'assets/frames/end.webp';
      return;
    }
    loadOne(0).then(scheduleRest);
    window.addEventListener('resize', function () {
      if (current >= 0) { var img = nearestLoaded(current); if (img) coverDraw(img); }
    }, { passive: true });
    function bindScrub() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        function onScroll() {
          var rect = section.getBoundingClientRect();
          var totalScroll = section.offsetHeight - window.innerHeight;
          var scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
          var p = totalScroll > 0 ? scrolled / totalScroll : 0;
          showFrame(Math.round(p * (total - 1)));
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: section, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate: function (self) { showFrame(Math.round(self.progress * (total - 1))); }
      });
    }
    bindScrub();
  }

  function bootJourney() {
    var root = document.querySelector('[data-journey]');
    var track = document.querySelector('[data-journey-track]');
    if (!root || !track) return;
    if (reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(max-width: 700px)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    var getScroll = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 48); };
    gsap.to(track, {
      x: function () { return -getScroll(); }, ease: 'none',
      scrollTrigger: {
        trigger: root, start: 'top top', end: function () { return '+=' + getScroll(); },
        pin: true, scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true
      }
    });
  }

  function bootSteps() {
    var steps = document.querySelectorAll('[data-step]');
    if (!steps.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('is-on'); });
    }, { threshold: 0.55 });
    steps.forEach(function (s) { io.observe(s); });
  }

  function bootWorlds() {
    var root = document.querySelector('[data-worlds]');
    if (!root) return;
    var tabs = root.querySelectorAll('[data-world]');
    var panels = root.querySelectorAll('[data-world-panel]');
    function setWorld(id) {
      root.setAttribute('data-active', id);
      tabs.forEach(function (t) { t.classList.toggle('is-on', t.getAttribute('data-world') === id); t.setAttribute('aria-selected', t.getAttribute('data-world') === id ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-world-panel') !== id; });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { setWorld(t.getAttribute('data-world')); });
    });
    if (!reduce && tabs.length > 1) {
      var i = 0;
      setInterval(function () {
        if (document.hidden) return;
        i = (i + 1) % tabs.length;
        setWorld(tabs[i].getAttribute('data-world'));
      }, 7000);
    }
  }

  function bootCompare() {
    var root = document.querySelector('[data-compare]');
    if (!root) return;
    var range = root.querySelector('input[type="range"]');
    var after = root.querySelector('.compare__after');
    if (!range || !after) return;
    function apply() { after.style.clipPath = 'inset(0 ' + (100 - range.value) + '% 0 0)'; }
    range.addEventListener('input', apply); apply();
  }

  function revealIO() {
    var nodes = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || reduce) { nodes.forEach(function (n) { n.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function bootPremiumReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || reduce) { revealIO(); return; }
    document.documentElement.classList.add('has-gsap');
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.rv').forEach(function (el) {
      if (el.closest && el.closest('.seq__overlay')) { el.classList.add('is-in'); return; }
      var delay = (parseFloat(getComputedStyle(el).getPropertyValue('--i')) || 0) * 0.07;
      gsap.fromTo(el, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: delay,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });
  }

  function whenReady() {
    bootSequence(); armCounters(); bootSteps(); bootWorlds(); bootCompare();
    function go() {
      bootPremiumReveals(); bootJourney();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
    if (typeof gsap !== 'undefined') { go(); return; }
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (typeof gsap !== 'undefined' || tries > 50) { clearInterval(t); go(); }
    }, 40);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenReady);
  else whenReady();
})();
