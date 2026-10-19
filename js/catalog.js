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
  const apiPageSize = 100;
  let page = 1;
  let totalPages = 0;
  let requestController;

  function selectedFilters() {
    const data = new FormData(form);
    return Object.fromEntries(['country', 'region', 'city', 'profile_type', 'category']
      .map(name => [name, String(data.get(name) || '').trim()])
      .filter(([, value]) => value));
  }

  function matchesFilters(profile, filters) {
    const tags = profile.tags && typeof profile.tags === 'object' ? profile.tags : {};
    return Object.entries(filters).every(([key, value]) => {
      const tagValue = tags[key];
      if (tagValue == null) return false;
      return String(tagValue).trim().toLocaleLowerCase('ru') === value.toLocaleLowerCase('ru');
    });
  }

  function renderProfiles(items) {
    results.replaceChildren();
    const start = (page - 1) * pageSize;
    items.slice(start, start + pageSize).forEach(profile => {
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
      details.append(username, name);
      link.append(avatar, details);
      results.appendChild(link);
    });
  }

  async function loadCatalog() {
    if (requestController) requestController.abort();
    requestController = new AbortController();
    const filters = selectedFilters();
    const tagKeys = Object.keys(filters);
    message.textContent = 'Загружаем каталог…';
    results.replaceChildren();
    pagination.hidden = true;

    try {
      const firstParams = new URLSearchParams({ page: '1', page_size: String(apiPageSize) });
      tagKeys.forEach(key => firstParams.append('tags', key));
      const firstResponse = await fetch(`${API_URL}/public/catalog?${firstParams}`, {
        signal: requestController.signal
      });
      if (!firstResponse.ok) throw new Error('Не удалось загрузить каталог');
      const firstData = await firstResponse.json();
      let items = Array.isArray(firstData.items) ? firstData.items : [];
      const apiPages = Number(firstData.pages) || 0;

      for (let apiPage = 2; apiPage <= apiPages; apiPage += 1) {
        const params = new URLSearchParams({ page: String(apiPage), page_size: String(apiPageSize) });
        tagKeys.forEach(key => params.append('tags', key));
        const response = await fetch(`${API_URL}/public/catalog?${params}`, {
          signal: requestController.signal
        });
        if (!response.ok) throw new Error('Не удалось загрузить каталог');
        const data = await response.json();
        if (Array.isArray(data.items)) items = items.concat(data.items);
      }

      items = items.filter(profile => matchesFilters(profile, filters));
      totalPages = Math.ceil(items.length / pageSize);
      renderProfiles(items);
      message.textContent = items.length
        ? `Найдено страниц: ${items.length}`
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
