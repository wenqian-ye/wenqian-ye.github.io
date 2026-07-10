/* Lightweight tab switcher — no dependencies.
   Markup:
     <div class="tabs"> <button class="tab-btn" data-target="id">Label</button> ... </div>
     <div class="tab-pane" id="id"> ... </div>
   Supports deep-linking via #id in the URL. */
(function () {
  function activate(btn, btns, panes) {
    var target = btn.getAttribute("data-target");
    btns.forEach(function (b) { b.classList.toggle("active", b === btn); });
    panes.forEach(function (p) { p.classList.toggle("active", p.id === target); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".tabs").forEach(function (bar) {
      var btns = Array.prototype.slice.call(bar.querySelectorAll(".tab-btn"));
      if (!btns.length) return;
      var panes = btns.map(function (b) {
        return document.getElementById(b.getAttribute("data-target"));
      }).filter(Boolean);

      btns.forEach(function (btn) {
        btn.addEventListener("click", function () { activate(btn, btns, panes); });
      });

      // Honor a matching hash on load, else keep the markup's default active tab.
      var hash = window.location.hash.replace("#", "");
      var match = btns.filter(function (b) { return b.getAttribute("data-target") === hash; })[0];
      if (match) activate(match, btns, panes);
      else if (!btns.some(function (b) { return b.classList.contains("active"); })) {
        activate(btns[0], btns, panes);
      }
    });
  });
})();
