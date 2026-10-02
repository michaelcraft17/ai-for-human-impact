/* Native document scrolling; only decoration and navigation respond to progress. */
(function () {
  'use strict';
  var root = document.documentElement;
  var header = document.querySelector('header');
  var mission = document.getElementById('mission');
  var hero = document.querySelector('.hero');
  var guide = document.querySelector('.scroll-guide');
  var guideLabel = guide.querySelector('.scroll-guide-label');
  var topLink = guide.querySelector('a');
  var sections = Array.from(document.querySelectorAll('main > section[id]'));
  var navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0, headerHeight = 74, currentId = null;
  function motionAllowed() { return !reduced.matches && !root.hasAttribute('data-a11y-pause'); }
  function render() {
    frame = 0;
    var motion = motionAllowed();
    root.classList.toggle('motion-enabled', motion && 'IntersectionObserver' in window);
    var distance = root.scrollHeight - window.innerHeight;
    var progress = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
    root.style.setProperty('--page-progress', motion ? String(progress) : '0');
    if (mission) {
      var bounds = mission.getBoundingClientRect();
      var passage = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
      mission.style.setProperty('--mission-drift', motion ? ((passage - .5) * 48) + 'px' : '0px');
    }
    var current = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= headerHeight + 120) current = section;
    });
    var id = current ? current.id : '';
    if (id !== currentId) {
      currentId = id;
      guideLabel.textContent = current ? (id === 'mission' ? 'Our mission' : current.querySelector('h2').textContent) : '';
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
    // Do not remove a focused control from the keyboard user's tab sequence.
    guide.hidden = hero.getBoundingClientRect().bottom > headerHeight && !guide.contains(document.activeElement);
  }
  function requestRender() { if (!frame) frame = window.requestAnimationFrame(render); }
  function measure() {
    if (header) {
      headerHeight = header.getBoundingClientRect().height;
      root.style.setProperty('--header-height', headerHeight + 'px');
    }
    requestRender();
  }
  topLink.addEventListener('click', function (event) {
    event.preventDefault();
    var heading = hero.querySelector('h1');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll:true });
    window.scrollTo({ top:0, behavior:motionAllowed() ? 'smooth' : 'instant' });
  });
  guide.addEventListener('focusout', requestRender);
  window.addEventListener('scroll', requestRender, { passive:true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  reduced.addEventListener('change', requestRender);
  new MutationObserver(measure).observe(root, { attributes:true, attributeFilter:['data-a11y-pause','data-a11y-size','data-a11y-spacing','data-a11y-lh','data-a11y-dyslexia'] });
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    observer.observe(document.body);
  }
  if (document.fonts) document.fonts.ready.then(measure);
  measure();
})();
