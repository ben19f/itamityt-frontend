// Keep the homepage sample in sync with the public museum profile.
async function loadExampleProfile() {
  try {
    const response = await fetch(
      `${API_URL}/public/profile/muzej_kostej`
    );
    if (!response.ok) return;

    const profile = await response.json();
    const avatar = document.getElementById("example-profile-avatar");
    const gallery = document.querySelector(".example-profile-gallery");
    const links = document.getElementById("example-profile-links");
    const description = document.querySelector(".example-profile-description");

    if (avatar && profile.avatar_url) avatar.src = profile.avatar_url;

    if (gallery) {
      const photos = Array.isArray(profile.photos)
        ? profile.photos.map(photo => typeof photo === "string" ? photo : photo?.url).filter(Boolean).slice(0, 3)
        : [];
      gallery.replaceChildren(...photos.map(url => {
          const wrapper = document.createElement("div");
          wrapper.className = "example-photo";
          const image = document.createElement("img");
          image.src = url;
          image.alt = profile.display_name || "Фото профиля музея костей";
          wrapper.appendChild(image);
          return wrapper;
        }));
    }

    if (description) {
      const text = profile.profile_description ?? profile.description;
      if (typeof text === "string" && text.trim()) description.textContent = text.trim();
    }

    if (links && Array.isArray(profile.items)) {
      const profileLink = document.createElement("a");
      profileLink.className = "example-profile-link";
      profileLink.href = "/uun/muzej_kostej";
      profileLink.textContent = "Открыть профиль";
      const actualLinks = profile.items
        .filter(item => item && item.link_id != null && typeof item.name === "string" && item.name.trim())
        .map(item => {
          const link = document.createElement("a");
          link.className = "example-profile-link";
          link.href = `${REDIRECT_URL}/${encodeURIComponent(item.link_id)}`;
          link.textContent = item.name.trim();
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          return link;
        });
      links.replaceChildren(...(actualLinks.length ? actualLinks : [profileLink]));
    }
  } catch (error) {
    console.error("Не удалось загрузить пример профиля:", error);
  }
}

loadExampleProfile();
