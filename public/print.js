// Print buttons of the guides:
// - "Print the guide" (top of each guide, src/components/PageTitle.astro): the whole page;
//   Starlight's print styles and src/styles/custom.css leave out the menus.
// - "Print the sheet" (safety sheets at the end of the guides): only that sheet (the print
//   styles in custom.css hide the rest of the page while html.printing-sheet is set).
// Ctrl+P prints the whole page, like the guide button.
(function () {
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
      window.print();
      return;
    }
    var button = event.target.closest('[data-print-sheet]');
    var sheet = button && button.closest('.safety-sheet');
    if (!sheet) return;
    clear();
    sheet.classList.add('is-printing');
    document.documentElement.classList.add('printing-sheet');
    window.print();
  });

  window.addEventListener('afterprint', clear);
})();
