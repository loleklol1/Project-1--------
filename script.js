document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 500);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const tabs = document.querySelectorAll('[data-tabgroup]');
  tabs.forEach((group) => {
    const buttons = group.querySelectorAll('.tab');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.id === target));
      });
    });
  });

  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  
  const pages = [
    { title: 'Головна', url: 'index.html', hint: 'Огляд компанії, переваги та напрямки' },
    { title: 'Митні Послуги', url: 'customs.html', hint: 'Оформлення, супровід, митний контроль' },
    { title: 'Логістичні послуги', url: 'logistics.html', hint: 'Маршрути, доставка, координація' },
    { title: 'Корисна Інформація', url: 'info.html', hint: 'Курс валют, ЗЕД, калькулятори' },
    { title: 'Контакти', url: 'contacts.html', hint: 'Заявка, телефон, email' },
    { title: 'Курс валют', url: 'info.html#kurs', hint: 'Курс валют НБУ' },
    { title: 'Класифікатор товарів ЗЕД', url: 'info.html#zed', hint: 'Каталог УКТ ЗЕД' },
    { title: 'Розрахувати митні платежі', url: 'info.html#customs-calc', hint: 'Калькулятор зборів' },
    { title: 'Вартість для легкового авто', url: 'info.html#auto-calc', hint: 'Калькулятор розмитнення авто' },
  ];

  function renderResults(query) {
    if (!results) return;
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      results.style.display = 'none';
      results.innerHTML = '';
      return;
    }
    const matches = pages.filter(p =>
      p.title.toLowerCase().includes(q) || p.hint.toLowerCase().includes(q)
    ).slice(0, 6);

    results.innerHTML = matches.length
      ? matches.map(item => `<a href="${item.url}"><strong>${item.title}</strong><span>${item.hint}</span></a>`).join('')
      : `<a href="javascript:void(0)"><strong>Нічого не знайдено</strong><span>Спробуйте інший запит</span></a>`;
    results.style.display = 'block';
  }

  if (searchInput && results) {
    searchInput.addEventListener('input', (e) => renderResults(e.target.value));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-shell')) {
        results.style.display = 'none';
      }
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return;
      const match = pages.find(p => p.title.toLowerCase() === q) || pages.find(p => p.title.toLowerCase().includes(q));
      if (match) window.location.href = match.url;
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Логіка для мобільного меню
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.add('open');
      menuOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMenu() {
    navLinks?.classList.remove('open');
    menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
});