/* CT Four Force v3 — motion layer (GSAP + ScrollTrigger + Lenis). Content is visible without JS. */
(function () {
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var fmt = function (v, d) { return v.toFixed(d).replace('.', ','); };

  function counters(useGsap) {
    document.querySelectorAll('.count').forEach(function (el) {
      var to = parseFloat(el.dataset.to), d = +el.dataset.dec || 0;
      if (!useGsap) { el.textContent = fmt(to, d); return; }
      var o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: function () { el.textContent = fmt(o.v, d); } });
    });
  }

  if (rm || saveData || !window.gsap || !window.ScrollTrigger) { counters(false); return; }
  document.documentElement.classList.add('motion');
  gsap.registerPlugin(ScrollTrigger);

  // Lenis smooth scroll (desktop + mobile ok; skipped on reduced-motion)
  if (window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); } });
    });
  }

  // Split-text headline (words), reveal
  var h = document.querySelector('.split');
  if (h) {
    var walk = function (node) {
      Array.from(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var w = document.createElement('span'); w.className = 'w';
            var i = document.createElement('span'); i.textContent = p; w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    h.setAttribute('aria-label', h.textContent); walk(h);
    gsap.from(h.querySelectorAll('.w > span'), { yPercent: 110, duration: .9, ease: 'power4.out', stagger: .07, delay: .1 });
    gsap.from(['.hero__eyebrow', '.hero__sub', '.hero__actions', '.stats'], { y: 20, opacity: 0, duration: .8, ease: 'power3.out', stagger: .1, delay: .5 });
  }

  // Hero parallax on the real photo (CSS ken-burns keeps running on the img; parallax on wrapper)
  gsap.to('.hero__bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__inner', { yPercent: -12, opacity: .3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Staggered reveal: batch per viewport entry
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%', once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .12, overwrite: true }); }
  });

  counters(true);

  // Cursor-follow light, desktop only
  if (fine) {
    var light = document.querySelector('.cursor-light');
    var x = gsap.quickTo(light, 'x', { duration: .6, ease: 'power3' }), y = gsap.quickTo(light, 'y', { duration: .6, ease: 'power3' });
    window.addEventListener('pointermove', function (e) { document.body.classList.add('has-cursor'); x(e.clientX); y(e.clientY); }, { passive: true });
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
