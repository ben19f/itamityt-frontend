(() => {
  const form = document.getElementById('catalog-filters');
  const results = document.getElementById('catalog-results');
  const message = document.getElementById('catalog-message');
  const pagination = document.getElementById('catalog-pagination');
  const previous = document.getElementById('catalog-prev');
  const next = document.getElementById('catalog-next');
  const pageStatus = document.getElementById('catalog-page-status');
  if (!form || !results || !message) return;

  const pageSize = 20;
  let page = 1;
  let totalPages = 0;
  let requestController;

  function selectedTags() {
    const data = new FormData(form);
    return ['country', 'region', 'city', 'profile_type', 'category']
      .map(name => String(data.get(name) || '').trim())
      .filter(Boolean);
  }

  function renderProfiles(items) {
    results.replaceChildren();
    items.forEach(profile => {
      if (!profile.username) return;
      const link = document.createElement('a');
      link.className = 'catalog-card';
      link.href = `/uun/${encodeURIComponent(profile.username)}`;

      const avatar = document.createElement('span');
      avatar.className = 'catalog-avatar';
      const image = document.createElement('img');
      image.src = profile.avatar_url || '/images/default-avatar.png';
      image.alt = '';
      image.loading = 'lazy';
      avatar.appendChild(image);

      const details = document.createElement('span');
      const name = document.createElement('span');
      name.className = 'catalog-card-name';
      name.textContent = profile.display_name || `@${profile.username}`;
      const username = document.createElement('span');
      username.className = 'catalog-card-username';
      username.textContent = `@${profile.username}`;
      details.append(name, username);

      if (profile.description) {
        const description = document.createElement('span');
        description.className = 'catalog-card-description';
        description.textContent = profile.description;
        details.appendChild(description);
      }
      link.append(avatar, details);
      results.appendChild(link);
    });
  }

  async function loadCatalog() {
    if (requestController) requestController.abort();
    requestController = new AbortController();
    const params = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
    selectedTags().forEach(tag => params.append('tags', tag));
    message.textContent = 'Загружаем каталог…';
    results.replaceChildren();
    pagination.hidden = true;

    try {
      const response = await fetch(`${API_URL}/public/catalog?${params}`, {
        signal: requestController.signal
      });
      if (!response.ok) throw new Error('Не удалось загрузить каталог');
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      totalPages = Number(data.pages) || 0;
      renderProfiles(items);
      message.textContent = data.total
        ? `Найдено страниц: ${data.total}`
        : 'По выбранным фильтрам страницы не найдены.';

      if (totalPages > 1) {
        pagination.hidden = false;
        previous.disabled = page <= 1;
        next.disabled = page >= totalPages;
        pageStatus.textContent = `Страница ${page} из ${totalPages}`;
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      message.textContent = 'Не удалось загрузить каталог. Попробуйте обновить страницу позже.';
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    page = 1;
    loadCatalog();
  });
  form.addEventListener('reset', () => {
    window.setTimeout(() => { page = 1; loadCatalog(); }, 0);
  });
  previous.addEventListener('click', () => {
    if (page > 1) { page -= 1; loadCatalog(); }
  });
  next.addEventListener('click', () => {
    if (page < totalPages) { page += 1; loadCatalog(); }
  });

  loadCatalog();
})();
