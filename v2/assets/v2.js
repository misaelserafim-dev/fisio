/* [Nome] Fisioterapia — v2: menu do celular, tamanho do texto, animação da planta */
(function () {
  'use strict';
  var root = document.documentElement;

  // A planta só se desenha se a pessoa não pediu menos movimento
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('anima');

  // Menu do celular
  var botao = document.querySelector('[data-menu]');
  var menu = document.getElementById('menu');
  function abrir(sim) {
    menu.classList.toggle('aberto', sim);
    botao.setAttribute('aria-expanded', String(sim));
  }
  if (botao && menu) {
    botao.addEventListener('click', function () { abrir(!menu.classList.contains('aberto')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { abrir(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('aberto')) { abrir(false); botao.focus(); } });
  }

  // Tamanho do texto: quatro degraus, guardado no aparelho
  var degraus = ['0.9', '1', '1.15', '1.3'];
  var atual = 1;
  try { var salvo = localStorage.getItem('fisio-v2-texto'); if (degraus.indexOf(salvo) >= 0) atual = degraus.indexOf(salvo); } catch (e) {}
  document.querySelectorAll('[data-texto]').forEach(function (b) {
    b.addEventListener('click', function () {
      atual = Math.min(degraus.length - 1, Math.max(0, atual + Number(b.getAttribute('data-texto'))));
      root.style.setProperty('--texto', degraus[atual]);
      try { localStorage.setItem('fisio-v2-texto', degraus[atual]); } catch (e) {}
    });
  });

  // Foto que ainda não existe: fica o desenho de fundo
  document.querySelectorAll('.equipe__foto img').forEach(function (img) {
    function esconde() { img.style.visibility = 'hidden'; }
    if (img.complete && img.naturalWidth === 0) esconde();
    img.addEventListener('error', esconde, { once: true });
  });

  var ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();
