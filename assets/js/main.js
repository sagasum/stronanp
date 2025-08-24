// assets/js/main.js
(function () {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // ====== NAV shadow on scroll ======
  const nav = $('.nav') || $('header.nav');
  let lastShadow = false;
  const onScroll = () => {
    if (!nav) return;
    const scrolled = window.scrollY > 8;
    if (scrolled !== lastShadow) {
      nav.classList.toggle('scrolled', scrolled);
      lastShadow = scrolled;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ====== Burger menu (mobile) ======
  const burger = $('.burger');
  const menu = $('.menu');
  function openMenu() {
    if (!menu) return;
    menu.dataset.open = '1';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.position = 'absolute';
    menu.style.top = (nav?.offsetHeight || 62) + 'px';
    menu.style.right = '20px';
    menu.style.background = '#fff';
    menu.style.border = '1px solid rgba(2,6,23,.08)';
    menu.style.borderRadius = '12px';
    menu.style.padding = '10px';
    menu.style.gap = '10px';
    menu.style.boxShadow = '0 10px 30px rgba(16,24,40,.12)';
    menu.style.zIndex = '60';
  }
  function closeMenu() {
    if (!menu) return;
    menu.dataset.open = '0';
    menu.style.display = '';
    menu.style.flexDirection = '';
    menu.style.position = '';
    menu.style.top = '';
    menu.style.right = '';
    menu.style.background = '';
    menu.style.border = '';
    menu.style.borderRadius = '';
    menu.style.padding = '';
    menu.style.gap = '';
    menu.style.boxShadow = '';
    menu.style.zIndex = '';
  }
  function toggleMenu() {
    if (!menu) return;
    (menu.dataset.open === '1') ? closeMenu() : openMenu();
  }
  if (burger && menu) {
    burger.addEventListener('click', toggleMenu);
    // close on outside click
    document.addEventListener('click', (e) => {
      if (menu.dataset.open !== '1') return;
      if (!menu.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
    // close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
    // close after selecting a link
    $$('.menu a').forEach(a => a.addEventListener('click', () => closeMenu()));
  }

  // ====== Smooth scroll for in-page anchors ======
  $$('.menu a[href^="#"], a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1 && $(id)) {
        e.preventDefault();
        $(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ====== Footer year ======
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ====== Active link based on pathname ======
  (function setActiveNav() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    // map file -> menu text (must match visible label)
    const map = {
      'index.html': 'Oferta',
      'prismanp.html': 'PRISMA-NP',
      'szkolenia.html': 'Szkolenia',
      'firmy.html': 'Firmy',
      'kontakt.html': 'Kontakt',
      'onas.html': 'O nas'
    };
    const current = map[file] || null;
    if (!current) return;
    $$('.menu a').forEach(a => {
      const match = a.textContent.trim().toLowerCase() === current.toLowerCase();
      a.classList.toggle('active', match);
    });
  })();

  // ====== Progressive enhancement: guard mailto forms ======
  $$('form[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      const email = form.querySelector('input[type="email"]');
      const name = form.querySelector('input[name="name"], input[name="Name"], input[name="imie"], input[name="Imię"]');
      if (email && !email.value) {
        e.preventDefault();
        alert('Podaj adres e-mail, żebyśmy mogli odpisać 🙂');
        email.focus();
        return;
      }
      if (name && !name.value) {
        e.preventDefault();
        alert('Podaj swoje imię i nazwisko 🙂');
        name.focus();
      }
    });
  });

  // ====== FAQ accordion (optional; works if markup exists) ======
  $$('.faq-item h3').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('open');
    });
  });
})();

  // ====== High Contrast Toggle ======
  const toggleBtn = document.querySelector('.contrast-toggle');
  if (toggleBtn) {
    const applyState = () => {
      document.body.classList.toggle('high-contrast', localStorage.getItem('contrast') === '1');
    };
    applyState();
    toggleBtn.addEventListener('click', () => {
      const current = localStorage.getItem('contrast') === '1';
      localStorage.setItem('contrast', current ? '0' : '1');
      applyState();
    });
  }
