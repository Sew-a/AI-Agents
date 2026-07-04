const loadedBodies = new Set();

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.nav-item[data-tab]');
  const contents = document.querySelectorAll('.tab-content');
  const copyToast = document.getElementById('copy-toast');

  function activateTab(tabId) {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    const tab = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    const content = document.getElementById(`tab-${tabId}`);
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');

    window.location.hash = tabId;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  const hash = window.location.hash.replace('#', '');
  if (hash && document.querySelector(`.nav-item[data-tab="${hash}"]`)) {
    activateTab(hash);
  } else {
    activateTab('home');
  }

  async function loadPromptBody(id, path) {
    const body = document.getElementById(`prompt-body-${id}`);
    if (!body) return;
    if (loadedBodies.has(id)) { body.classList.toggle('open'); return; }
    try {
      const res = await fetch(path);
      const text = await res.text();
      const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      body.innerHTML = `<div style="display:flex;gap:0.5rem;margin-bottom:0.75rem">
        <button class="btn btn-primary" data-copy="${escaped.replace(/"/g, '&quot;')}">Copy to Clipboard</button>
      </div>
      <pre><code>${escaped}</code></pre>`;
      loadedBodies.add(id);
      body.classList.add('open');
    } catch {
      body.innerHTML = '<p style="color:#dc2626">Failed to load prompt content.</p>';
      body.classList.add('open');
    }
  }

  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-toggle-prompt]');
    if (toggleBtn) {
      const id = toggleBtn.dataset.togglePrompt;
      const path = toggleBtn.dataset.path;
      toggleBtn.textContent = 'Loading...';
      loadPromptBody(id, path);
    }
  });

  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const text = copyBtn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 2000);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 2000);
      });
    }
  });
});
