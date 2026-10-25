/* Phone-only helpers (see assets/mobile.css): dots under the swipe rows and
   "Read full bio" buttons for judges. Without this script every card and bio is still fully readable. */
(function () {
  'use strict';
  var root = document.documentElement;
  var phone = window.matchMedia('(max-width:640px)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('m-js');

  function smooth() { return !reduced.matches && !root.hasAttribute('data-a11y-pause') ? 'smooth' : 'auto'; }

  // ---------- Swipe rows ----------
  var rows = [
    { selector:'.tracks-grid', label:'Tracks', noun:'track' },
    { selector:'.speakers-grid', label:'Speakers', noun:'speaker' },
    { selector:'.judges-grid', label:'Judges', noun:'judge' }
  ].map(function (row) {
    row.el = document.querySelector(row.selector);
    return row;
  }).filter(function (row) { return row.el && row.el.children.length > 1; });

  rows.forEach(function (row) {
    var cards = Array.prototype.slice.call(row.el.children);
    var dots = document.createElement('div');
    dots.className = 'm-dots';
    dots.setAttribute('aria-label', row.label + ' cards');
    row.dots = cards.map(function (card, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show ' + row.noun + ' ' + (i + 1) + ' of ' + cards.length);
      dot.addEventListener('click', function () {
        var pad = parseFloat(getComputedStyle(row.el).paddingLeft) || 0;
        var left = card.getBoundingClientRect().left - row.el.getBoundingClientRect().left + row.el.scrollLeft - pad;
        row.el.scrollTo({ left:left, behavior:smooth() });
      });
      dots.appendChild(dot);
      return dot;
    });
    row.cards = cards;
    row.el.insertAdjacentElement('afterend', dots);

    var frame = 0;
    row.el.addEventListener('scroll', function () {
      if (!frame) frame = window.requestAnimationFrame(function () { frame = 0; markDot(row); });
    }, { passive:true });
  });

  function markDot(row) {
    var el = row.el, active = 0;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
      active = row.cards.length - 1;
    } else {
      var start = el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).paddingLeft) || 0);
      var best = Infinity;
      row.cards.forEach(function (card, i) {
        var d = Math.abs(card.getBoundingClientRect().left - start);
        if (d < best) { best = d; active = i; }
      });
    }
    row.dots.forEach(function (dot, i) {
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  // ---------- Judge bios ----------
  var bios = Array.prototype.slice.call(document.querySelectorAll('#judges .speaker-bio'));
  var toggles = bios.map(function (bio, i) {
    if (!bio.id) bio.id = 'judge-bio-' + (i + 1);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'm-more';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', bio.id);
    btn.textContent = 'Read full bio';
    btn.addEventListener('click', function () {
      var open = !bio.classList.contains('m-open');
      bio.classList.toggle('m-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Show less' : 'Read full bio';
    });
    bio.insertAdjacentElement('afterend', btn);
    return { bio:bio, btn:btn };
  });

  // Hide a button when its bio already fits in four lines.
  function checkBios() {
    toggles.forEach(function (t) {
      if (t.bio.classList.contains('m-open')) { t.btn.hidden = false; return; }
      t.btn.hidden = phone.matches && t.bio.scrollHeight <= t.bio.clientHeight + 1;
    });
  }

  // ---------- Switch on/off with the screen size ----------
  function apply() {
    rows.forEach(function (row) {
      if (phone.matches) {
        row.el.setAttribute('role', 'region');
        row.el.setAttribute('aria-label', row.label + ' (swipe for more)');
        row.el.setAttribute('tabindex', '0');
        markDot(row);
      } else {
        row.el.removeAttribute('role');
        row.el.removeAttribute('aria-label');
        row.el.removeAttribute('tabindex');
      }
    });
    checkBios();
  }

  var resizeFrame = 0;
  window.addEventListener('resize', function () {
    if (!resizeFrame) resizeFrame = window.requestAnimationFrame(function () { resizeFrame = 0; apply(); });
  });
  phone.addEventListener('change', apply);
  new MutationObserver(apply).observe(root, { attributes:true, attributeFilter:['data-a11y-size','data-a11y-spacing','data-a11y-lh','data-a11y-dyslexia'] });
  if (document.fonts) document.fonts.ready.then(apply);
  window.addEventListener('load', apply);
  apply();
})();
