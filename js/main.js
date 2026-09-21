(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = (restoreFocus = false) => {
    if (!header || !toggle) return;
    header.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    if (restoreFocus) toggle.focus();
  };

  if (header && toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !header.classList.contains('menu-open');
      header.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });

    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
    });

    document.addEventListener('click', event => {
      if (!(event.target instanceof Node)) return;
      if (header.classList.contains('menu-open') && !header.contains(event.target)) closeMenu();
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const reveals = [...document.querySelectorAll('.reveal')];
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    reveals.forEach(element => observer.observe(element));
  }

  document.querySelectorAll('.official-photo[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = img.dataset.fallback;
      if (!fallback || img.src.endsWith(fallback)) return;
      img.src = fallback;
      img.classList.add('using-fallback');
    }, { once: true });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();