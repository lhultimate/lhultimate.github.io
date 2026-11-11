/* lhultimate — small progressive enhancements, no dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- header state + active section ---------- */
  var header = document.querySelector("[data-header]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);

    var marker = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) current = section.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  if (header || navLinks.length) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealEls.forEach(function (el, i) {
      // Keep staggered groups (stat rows, cards) from arriving all at once.
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0) el.style.setProperty("--delay", Math.min(index, 5) * 70 + "ms");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- pointer spotlight on cards ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var lit = document.querySelectorAll(".card, .feature");
    Array.prototype.forEach.call(lit, function (el) {
      el.addEventListener(
        "pointermove",
        function (event) {
          var rect = el.getBoundingClientRect();
          el.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 100).toFixed(2) + "%");
          el.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 100).toFixed(2) + "%");
        },
        { passive: true }
      );
    });
  }

  /* ---------- scorebug clocks ---------- */
  var clocks = Array.prototype.slice.call(document.querySelectorAll("[data-clock], [data-clock-secondary]"));
  if (!clocks.length) return;

  // A quarter of game clock, counting down and resetting — purely decorative.
  var remaining = 12 * 60; // seconds

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function render() {
    var minutes = Math.floor(remaining / 60);
    var seconds = remaining % 60;
    var text = pad(minutes) + ":" + pad(seconds);
    clocks.forEach(function (el) { el.textContent = text; });
  }

  render();

  if (reduceMotion) return;

  window.setInterval(function () {
    remaining = remaining > 0 ? remaining - 1 : 12 * 60;
    render();
  }, 1000);
})();
