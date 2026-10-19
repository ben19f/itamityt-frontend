async function loadExampleProfile() {
  const profileUrl = "/uun/muzej_kostej";
  const avatar = document.getElementById("example-profile-avatar");
  const avatarBlock = document.getElementById("example-profile-avatar-block");
  const name = document.getElementById("example-profile-name");
  const username = document.getElementById("example-profile-username");
  const verification = document.getElementById("example-profile-verification");
  const gallery = document.getElementById("example-profile-gallery");
  const description = document.getElementById("example-profile-description");
  const links = document.getElementById("example-profile-links");

  try {
    const response = await fetch(`${API_URL}/public/profile/muzej_kostej`);
    if (!response.ok) throw new Error(`Profile request failed: ${response.status}`);
    const profile = await response.json();

    if (typeof profile.avatar_url === "string" && profile.avatar_url.trim()) {
      avatar.src = profile.avatar_url.trim();
      avatar.hidden = false;
      avatarBlock.hidden = false;
    } else {
      avatar.hidden = true;
      avatarBlock.hidden = true;
    }
    if (typeof profile.display_name === "string" && profile.display_name.trim()) {
      name.textContent = profile.display_name.trim();
    }
    if (typeof profile.username === "string" && profile.username.trim()) {
      username.textContent = `@${profile.username.trim()}`;
    }

    const photos = Array.isArray(profile.photos)
      ? profile.photos
          .map(photo => typeof photo === "string" ? photo : photo?.url)
          .filter(url => typeof url === "string" && url.trim())
          .slice(0, 3)
      : [];
    gallery.replaceChildren(...photos.map(url => {
      const wrapper = document.createElement("div");
      wrapper.className = "example-photo";
      const image = document.createElement("img");
      image.src = url;
      image.alt = profile.display_name || "Фото профиля музея костей";
      image.loading = "lazy";
      wrapper.appendChild(image);
      return wrapper;
    }));
    gallery.hidden = photos.length === 0;

    const profileDescription = profile.profile_description ?? profile.description;
    if (typeof profileDescription === "string" && profileDescription.trim()) {
      description.textContent = profileDescription.trim();
      description.hidden = false;
    } else {
      description.hidden = true;
    }

    const verificationRows = [];
    if (["Y", "X"].includes(profile.owner_verified)) {
      verificationRows.push({
        verified: profile.owner_verified === "Y",
        text: profile.owner_verified === "Y" ? "Проверено пользователем" : "Не проверено пользователем"
      });
    }
    if (["Y", "X"].includes(profile.service_verified)) {
      verificationRows.push({
        verified: profile.service_verified === "Y",
        text: profile.service_verified === "Y" ? "Проверено сервисом itamityt.ru" : "Не проверено сервисом itamityt.ru"
      });
    }
    verification.replaceChildren(...verificationRows.map(row => {
      const item = document.createElement("div");
      item.className = "example-verify-item";
      const status = document.createElement("span");
      status.className = `example-verify-status ${row.verified ? "example-verify-yes" : "example-verify-no"}`;
      status.textContent = row.verified ? "✓" : "×";
      const label = document.createElement("span");
      label.textContent = row.text;
      item.append(status, label);
      return item;
    }));
    verification.hidden = verificationRows.length === 0;

    const actualLinks = Array.isArray(profile.items)
      ? profile.items.filter(item => item && item.link_id != null && typeof item.name === "string" && item.name.trim())
      : [];
    links.replaceChildren(...actualLinks.map(item => {
      const link = document.createElement("a");
      link.className = "example-profile-link";
      link.href = `${REDIRECT_URL}/${encodeURIComponent(item.link_id)}`;
      link.textContent = item.name.trim();
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return link;
    }));
    if (!actualLinks.length) {
      const link = document.createElement("a");
      link.className = "example-profile-link";
      link.href = profileUrl;
      link.textContent = "Открыть профиль";
      links.appendChild(link);
    }
  } catch (error) {
    console.error("Не удалось загрузить пример профиля:", error);
  }
}

loadExampleProfile();
