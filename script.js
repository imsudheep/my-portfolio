// ============ BEN KIM PORTFOLIO — SECTION SCROLL ============

(function () {
  'use strict';

  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.dot');
  const nav = document.getElementById('fixedNav');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navOverlayClose = document.getElementById('navOverlayClose');
  const navLinks = document.querySelectorAll('.nav-overlay-link');

  let currentIndex = 0;

  // ---- Initialize ----
  function init() {
    updateDots(0);
  }

  // ---- Navigate to section (smooth scroll) ----
  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }

  // ---- Update dot navigation ----
  function updateDots(index) {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  // ---- Nav hide/show on scroll direction ----
  let lastScrollY = window.scrollY;

  document.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ---- Dot click navigation ----
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      goToSection(index);
    });
  });

  // ---- Hamburger menu ----
  hamburgerBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    navOverlay.classList.toggle('open');
  });

  // ---- Nav overlay close button ----
  navOverlayClose.addEventListener('click', function () {
    hamburgerBtn.classList.remove('active');
    navOverlay.classList.remove('open');
  });

  // Close overlay on backdrop click
  navOverlay.addEventListener('click', function (e) {
    if (e.target === this) {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('open');
    }
  });

  // ---- Nav overlay links ----
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      goToSection(index);
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('open');
    });
  });

  // ---- Journey horizontal scroll (sticky + translateX) ----
  const journeySection = document.getElementById('journey');
  const journeyContent = journeySection?.querySelector('.journey-content');

  let jResizeTimer;

  function initJourneyScroll() {
    if (!journeySection || !journeyContent) return 0;

    const maxScroll = Math.max(0, journeyContent.scrollWidth - window.innerWidth);
    journeySection.style.height = (window.innerHeight + maxScroll) + 'px';
    return maxScroll;
  }

  function updateJourneyScroll() {
    if (!journeySection || !journeyContent) return;

    const sectionRect = journeySection.getBoundingClientRect();
    const sectionHeight = journeySection.offsetHeight;
    const viewportH = window.innerHeight;
    const scrollable = sectionHeight - viewportH;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(1, -sectionRect.top / scrollable));
    const maxScroll = Math.max(0, journeyContent.scrollWidth - window.innerWidth);

    journeyContent.style.transform = 'translateX(' + (-progress * maxScroll) + 'px)';
  }

  window.addEventListener('resize', function () {
    clearTimeout(jResizeTimer);
    jResizeTimer = setTimeout(function () {
      initJourneyScroll();
      updateJourneyScroll();
    }, 100);
  });

  initJourneyScroll();
  document.addEventListener('scroll', updateJourneyScroll, { passive: true });
  updateJourneyScroll();

  // ---- Dot nav: use journey-pin for position tracking ----
  const journeyPin = journeySection?.querySelector('.journey-pin');

  function onScroll() {
    let closestIndex = 0;
    let closestDist = Infinity;
    sections.forEach(function (s, i) {
      var target = s;
      if (i === 1 && journeyPin) target = journeyPin;
      var rect = target.getBoundingClientRect();
      var dist = Math.abs(rect.top);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
      updateDots(currentIndex);
      var videos = sections[currentIndex].querySelectorAll('video');
      videos.forEach(function (v) {
        v.play()['catch'](function () {});
      });
    }
  }

  document.addEventListener('scroll', onScroll, { passive: true });

  // ---- Init ----
  init();

})();
