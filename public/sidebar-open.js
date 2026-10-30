// Side menu groups stay open: the menu has few links, so folding them is not needed.
// Clicks on a group title (Enter/Space become clicks too) do nothing, and every group is
// opened when the page loads (Starlight remembers groups folded earlier in the visit).
(function () {
  var TITLE = '.sidebar-content details > summary';

  document.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest(TITLE)) event.preventDefault();
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sidebar-content details').forEach(function (group) {
      group.open = true;
    });
  });
})();
