// "Print the sheet" buttons of the safety sheets at the end of the guides: print only that
// sheet (the print styles in src/styles/custom.css hide the rest of the page while
// html.printing-sheet is set). Ctrl+P still prints the whole page.
(function () {
  function clear() {
    document.documentElement.classList.remove('printing-sheet');
    document.querySelectorAll('.safety-sheet.is-printing').forEach(function (sheet) {
      sheet.classList.remove('is-printing');
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-print-sheet]');
    var sheet = button && button.closest('.safety-sheet');
    if (!sheet) return;
    clear();
    sheet.classList.add('is-printing');
    document.documentElement.classList.add('printing-sheet');
    window.print();
  });

  window.addEventListener('afterprint', clear);
})();
