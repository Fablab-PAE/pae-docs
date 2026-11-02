// Print buttons of the guides:
// - "Imprimer la page" in a guide's page actions menu (src/components/PageActions.astro):
//   the whole page; Starlight's print styles and src/styles/custom.css leave out the menus.
// - the safety sheet's "Print" button (end of the guides): only that sheet (the print
//   styles in custom.css hide the rest of the page while html.printing-sheet is set).
// Ctrl+P prints the whole page, like the menu item.
//
// Pictures: they load only when scrolled near (loading="lazy") and come in several widths
// (srcset), so a print could show empty spaces: pictures never scrolled to are not
// downloaded, and the paper width makes the browser pick a width it has not downloaded.
// So before printing, every picture loads now (the buttons wait for them, 10 s at most), then
// is "frozen" to the file it already has (srcset put aside) until the print is done.
// Ctrl+P cannot wait: pictures already loaded print, the others may stay empty.
(function () {
  var WAIT_MS = 10000;
  var frozen = [];

  function pictures() {
    return Array.prototype.slice.call(document.querySelectorAll('main img'));
  }

  // Start loading every picture now (they were waiting to be scrolled to)
  function loadAll() {
    pictures().forEach(function (img) {
      if (img.loading === 'lazy') img.loading = 'eager';
    });
  }

  // Keep the file the picture already shows: no other width is picked for the paper
  function freeze(img) {
    if (!img.hasAttribute('srcset') || !img.currentSrc) return;
    frozen.push({ img: img, srcset: img.getAttribute('srcset'), sizes: img.getAttribute('sizes'), src: img.getAttribute('src') });
    img.removeAttribute('sizes');
    img.removeAttribute('srcset');
    img.src = img.currentSrc;
  }

  function unfreeze() {
    frozen.forEach(function (f) {
      f.img.setAttribute('src', f.src);
      if (f.sizes) f.img.setAttribute('sizes', f.sizes);
      f.img.setAttribute('srcset', f.srcset);
    });
    frozen = [];
  }

  // Resolves when every picture has loaded (or failed), or after WAIT_MS
  function picturesReady() {
    loadAll();
    var waits = pictures().map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    });
    var timeout = new Promise(function (resolve) {
      setTimeout(resolve, WAIT_MS);
    });
    return Promise.race([Promise.all(waits), timeout]);
  }

  function printWhenReady() {
    var root = document.documentElement;
    root.style.cursor = 'progress';
    picturesReady().then(function () {
      root.style.cursor = '';
      pictures().forEach(freeze);
      window.print();
    });
  }

  function clear() {
    document.documentElement.classList.remove('printing-sheet');
    document.querySelectorAll('.safety-sheet.is-printing').forEach(function (sheet) {
      sheet.classList.remove('is-printing');
    });
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest) return;
    if (event.target.closest('[data-print-guide]')) {
      clear();
      printWhenReady();
      return;
    }
    var button = event.target.closest('[data-print-sheet]');
    var sheet = button && button.closest('.safety-sheet');
    if (!sheet) return;
    clear();
    sheet.classList.add('is-printing');
    document.documentElement.classList.add('printing-sheet');
    printWhenReady();
  });

  // Pointer or keyboard on the page actions: start loading the pictures, so the wait is short
  function warmUp(event) {
    if (event.target.closest && event.target.closest('[data-page-actions]')) loadAll();
  }
  document.addEventListener('pointerover', warmUp);
  document.addEventListener('focusin', warmUp);

  // Ctrl+P: no waiting possible; freeze the pictures already loaded
  window.addEventListener('beforeprint', function () {
    if (frozen.length) return; // a button already prepared the pictures
    loadAll();
    pictures().forEach(function (img) {
      if (img.complete) freeze(img);
    });
  });

  window.addEventListener('afterprint', function () {
    clear();
    unfreeze();
  });
})();
