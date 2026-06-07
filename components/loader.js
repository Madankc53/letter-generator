// components/loader.js
// Loads header and footer into every page automatically

(function () {
  const BASE = getBase();

  function getBase() {
    // Works whether site is at root or subdirectory
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
      if (s.src && s.src.includes('components/loader.js')) {
        return s.src.replace('components/loader.js', '');
      }
    }
    return '/';
  }

  async function loadComponent(url, targetId) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load ' + url);
      const html = await res.text();
      const target = document.getElementById(targetId);
      if (target) {
        target.innerHTML = html;
        // Execute any scripts inside the component
        target.querySelectorAll('script').forEach(oldScript => {
          const newScript = document.createElement('script');
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        });
      }
    } catch (err) {
      console.warn('Component load error:', err.message);
    }
  }

  // Load header and footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }

  function loadAll() {
    loadComponent(BASE + 'components/header.html', 'site-header');
    loadComponent(BASE + 'components/footer.html', 'site-footer');
  }
})();
