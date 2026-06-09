// components/loader.js — loads header and footer on every page

(function () {
  const BASE = getBase();

  function getBase() {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
      if (s.src && s.src.includes('components/loader.js')) {
        return s.src.replace('components/loader.js', '');
      }
    }
    return '/';
  }

  async function loadComponent(url, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const html = await res.text();
      target.innerHTML = html;
      // Execute scripts inside loaded component
      target.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        if (old.src) s.src = old.src;
        else s.textContent = old.textContent;
        document.head.appendChild(s);
      });
    } catch (e) {
      console.warn('loader.js: failed to load', url, e.message);
    }
  }

  function loadAll() {
    loadComponent(BASE + 'components/header.html', 'site-header');
    loadComponent(BASE + 'components/footer.html', 'site-footer');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }
})();
