/* =========================================================
   [Nome] Fisioterapia — interações
   - Menu do celular
   - Painel de acessibilidade (tamanho do texto, reduzir animações)
   - Indicador de rolagem e parallax na abertura
   - Efeito de rolagem para navegadores sem animation-timeline
   - Fotos que ainda não existem mostram o espaço reservado
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* modo privado */ }
  }
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function motionOff() {
    return reduceMotionQuery.matches || root.classList.contains('calm');
  }

  /* ---------- Menu do celular ---------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var sheet = document.getElementById('menu-celular');

  function setMenu(open) {
    if (!menuBtn || !sheet) return;
    sheet.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    root.classList.toggle('menu-open', open);
  }

  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', function () { setMenu(sheet.hidden); });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Painel de acessibilidade ---------- */
  var a11y = document.querySelector('[data-a11y]');
  var a11yBtn = document.querySelector('[data-a11y-toggle]');
  var a11yPanel = document.getElementById('a11y-painel');

  function setPanel(open) {
    if (!a11yBtn || !a11yPanel) return;
    a11yPanel.hidden = !open;
    a11yBtn.setAttribute('aria-expanded', String(open));
    a11yBtn.setAttribute('aria-label', open ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade');
  }
  if (a11yBtn && a11yPanel) {
    a11yBtn.addEventListener('click', function () { setPanel(a11yPanel.hidden); });
    document.addEventListener('click', function (e) {
      if (!a11yPanel.hidden && !a11y.contains(e.target)) setPanel(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (sheet && !sheet.hidden) { setMenu(false); menuBtn.focus(); }
    if (a11yPanel && !a11yPanel.hidden) { setPanel(false); a11yBtn.focus(); }
  });

  // Tamanho do texto
  var sizes = [
    { zoom: '0.9', label: 'menor' },
    { zoom: '1', label: 'normal' },
    { zoom: '1.15', label: 'grande' },
    { zoom: '1.3', label: 'extra grande' }
  ];
  var NORMAL = 1;
  var sizeIndex = sizes.findIndex(function (s) { return s.zoom === load('fisio-zoom'); });
  if (sizeIndex < 0) sizeIndex = NORMAL;

  function applySize() {
    var s = sizes[sizeIndex];
    root.style.setProperty('--zoom', s.zoom);
    save('fisio-zoom', s.zoom);
    document.querySelectorAll('[data-text-label]').forEach(function (el) { el.textContent = s.label; });
  }
  document.querySelectorAll('[data-size]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var step = Number(btn.getAttribute('data-size'));
      sizeIndex = step === 0 ? NORMAL : Math.min(sizes.length - 1, Math.max(0, sizeIndex + step));
      applySize();
    });
  });
  applySize();

  // Reduzir animações
  var calmBtn = document.querySelector('[data-calm]');
  function applyCalm(on) {
    root.classList.toggle('calm', on);
    if (calmBtn) calmBtn.setAttribute('aria-checked', String(on));
    if (on) resetHero();
  }
  if (calmBtn) {
    calmBtn.addEventListener('click', function () {
      var on = !root.classList.contains('calm');
      save('fisio-calm', on ? '1' : '0');
      applyCalm(on);
    });
  }

  /* ---------- Abertura: indicador de rolagem + parallax ---------- */
  var cue = document.querySelector('[data-scroll-cue]');
  var heroText = document.querySelector('.hero__text');
  var heroFig = document.querySelector('.hero__fig');
  var ticking = false;

  function resetHero() {
    if (heroText) { heroText.style.transform = ''; heroText.style.opacity = ''; }
    if (heroFig) heroFig.style.transform = '';
  }

  function updateHero() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;

    if (cue) cue.classList.toggle('is-hidden', y > 60);

    if (motionOff() || y > vh * 1.3) return;
    var mobile = window.innerWidth <= 760;
    // O texto desce mais devagar e some; a foto desce menos — dá a sensação de profundidade
    var textSpeed = mobile ? 0.12 : 0.32;
    var figSpeed = mobile ? 0.05 : 0.14;
    if (heroText) {
      heroText.style.transform = 'translate3d(0,' + (y * textSpeed).toFixed(1) + 'px,0)';
      heroText.style.opacity = Math.max(0, 1 - y / (vh * 0.85)).toFixed(3);
    }
    if (heroFig) heroFig.style.transform = 'translate3d(0,' + (y * figSpeed).toFixed(1) + 'px,0)';
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateHero); }
  }, { passive: true });
  window.addEventListener('resize', updateHero);
  reduceMotionQuery.addEventListener('change', function () { if (motionOff()) resetHero(); });

  applyCalm(root.classList.contains('calm'));
  updateHero();

  /* ---------- Fotos ainda não enviadas ---------- */
  document.querySelectorAll('.media img, .member__photo img').forEach(function (img) {
    function hide() { img.style.visibility = 'hidden'; }
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide, { once: true });
  });

  /* ---------- Rolagem em navegadores sem animation-timeline ---------- */
  var supportsTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (!supportsTimeline && 'IntersectionObserver' in window) {
    root.classList.add('io');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });
  }

  /* ---------- Ano no rodapé ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
