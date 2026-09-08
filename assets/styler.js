/**
 * Strzałki przy taśmie ze stylami.
 *
 * Sama taśma przewija się bez tego skryptu — gestem palca i kółkiem myszy.
 * Tutaj tylko dokładamy strzałki i wygaszamy je na krańcach, żeby było
 * widać, że dalej już nic nie ma.
 */
(function () {
  'use strict';

  var tasma = document.querySelector('[data-styler-track]');
  if (!tasma) { return; }

  var przyciski = document.querySelectorAll('[data-styler]');
  if (!przyciski.length) { return; }

  function krok() {
    var kafel = tasma.querySelector('.styl');
    if (!kafel) { return 400; }
    var odstep = parseFloat(getComputedStyle(tasma.firstElementChild).gap) || 26;
    return kafel.getBoundingClientRect().width + odstep;
  }

  function odswiez() {
    var max = tasma.scrollWidth - tasma.clientWidth;
    przyciski.forEach(function (b) {
      var kierunek = parseInt(b.getAttribute('data-styler'), 10);
      b.disabled = kierunek < 0 ? tasma.scrollLeft < 4 : tasma.scrollLeft > max - 4;
    });
  }

  przyciski.forEach(function (b) {
    b.addEventListener('click', function () {
      tasma.scrollBy({
        left: krok() * parseInt(b.getAttribute('data-styler'), 10),
        behavior: 'smooth'
      });
    });
  });

  tasma.addEventListener('scroll', odswiez, { passive: true });
  window.addEventListener('resize', odswiez);
  odswiez();
})();
