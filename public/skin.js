// TEST: "Style" switch between Starlight's own look and a Tailwind / Flowbite look
// (src/styles/skin-tailwind.css). Local preview only: on the public site there is no
// button and the site keeps its normal look. The choice is remembered in this browser.
// Loaded first in <head>, so the saved look is applied before the page shows (no flash).
(function () {
  var PUBLIC_HOST = 'fablab-pae.github.io';
  var KEY = 'pae-skin';
  if (location.hostname === PUBLIC_HOST) return;

  var root = document.documentElement;
  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(skin) {
    if (skin === 'tailwind') root.setAttribute('data-skin', 'tailwind');
    else root.removeAttribute('data-skin');
  }
  apply(saved());

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'skin-switch';
    button.title = 'Test : changer le style du site (aperçu local seulement)';
    function label() {
      button.textContent = 'Style : ' + (root.getAttribute('data-skin') === 'tailwind' ? 'Tailwind' : 'Astro');
    }
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-skin') === 'tailwind' ? 'astro' : 'tailwind';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* not remembered, still switched */ }
      label();
    });
    label();
    document.body.appendChild(button);
  });
})();
