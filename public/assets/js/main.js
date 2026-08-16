(() => {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && header && nav) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-ba-slider]').forEach((root) => {
    const main = root.querySelector('[data-ba-main]');
    const buttons = root.querySelectorAll('[data-ba-thumb]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        if (!src || !main) return;
        main.setAttribute('src', src);
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  });

  const heroVideo = document.querySelector('.hero-video__media');
  if (heroVideo instanceof HTMLVideoElement) {
    const tryPlay = () => {
      heroVideo.muted = true;
      heroVideo.playsInline = true;
      heroVideo.play().catch(() => {});
    };
    tryPlay();
    document.addEventListener('touchstart', tryPlay, { once: true });
  }
})();
