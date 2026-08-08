// ==========================================================================
// MASTER APPLICATION RENDERER ORCHESTRATOR
// ==========================================================================

const appRenderer = (function () {
  let activeModuleId = 'dashboard';
  let hasUnsavedChanges = false;

  const modules = {
    dashboard: window.dashboardModule,
    categories: window.categoriesModule,
    services: window.servicesModule,
    schemes: window.schemesModule,
    jobs: window.jobsModule,
    education: window.educationModule,
    emergency: window.emergencyModule,
    faqs: window.faqsModule,
    media: window.mediaModule,
    backups: window.backupsModule,
    settings: window.settingsModule,
    feedbacks: window.feedbacksModule
  };

  function init() {
    setupNavigation();
    setupGlobalSearch();
    setupThemeToggle();
    setupKeyboardShortcuts();
    setupModalControls();

    // Initialize Auth
    if (window.authModule) {
      window.authModule.init();
      if (window.authModule.isLoggedIn()) {
        onLoginSuccess();
      }
    } else {
      switchModule('dashboard');
    }
  }

  function onLoginSuccess() {
    switchModule('dashboard');
  }

  function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const mod = btn.getAttribute('data-module');
        if (mod) switchModule(mod);
      });
    });

    const btnTopPreview = document.getElementById('btnTopPreview');
    if (btnTopPreview) {
      btnTopPreview.addEventListener('click', () => {
        if (window.electronAPI) {
          window.electronAPI.openExternal('https://ravitejaanand.github.io/');
        } else {
          window.open('../index.html', '_blank');
        }
      });
    }
  }

  function switchModule(moduleId) {
    if (!modules[moduleId]) return;

    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Discard and switch section?')) {
        return;
      }
      setUnsaved(false);
    }

    activeModuleId = moduleId;

    // Update active class on nav
    document.querySelectorAll('.nav-item').forEach(btn => {
      if (btn.getAttribute('data-module') === moduleId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update view containers
    document.querySelectorAll('.module-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${moduleId}`);
    if (targetView) {
      targetView.classList.add('active');
      modules[moduleId].render(targetView);
    }
  }

  function refreshCurrentModule() {
    const targetView = document.getElementById(`view-${activeModuleId}`);
    if (targetView && modules[activeModuleId]) {
      modules[activeModuleId].render(targetView);
    }
  }

  function setupGlobalSearch() {
    const searchInput = document.getElementById('globalAdminSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const activeTable = document.querySelector('.module-view.active .data-table tbody');
      if (!activeTable) return;

      const rows = activeTable.querySelectorAll('tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  function setupThemeToggle() {
    const btn = document.getElementById('btnThemeToggle');
    const icon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('ap_hub_theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (icon) icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ap_hub_theme', next);
        if (icon) icon.textContent = next === 'light' ? '☀️' : '🌙';
      });
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl + F: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const s = document.getElementById('globalAdminSearch');
        if (s) { s.focus(); s.select(); }
      }

      // Ctrl + S: Trigger modal save if open
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const saveBtn = document.getElementById('modalSaveBtn');
        const modal = document.getElementById('universalModal');
        if (modal && modal.classList.contains('active') && saveBtn) {
          saveBtn.click();
        }
      }

      // Escape: Close open modals
      if (e.key === 'Escape') {
        closeModal();
        const pModal = document.getElementById('previewModal');
        if (pModal) pModal.classList.remove('active');
      }
    });
  }

  function setupModalControls() {
    const modal = document.getElementById('universalModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
    }
  }

  function openModal() {
    const modal = document.getElementById('universalModal');
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    const modal = document.getElementById('universalModal');
    if (modal) modal.classList.remove('active');
  }

  function setUnsaved(state) {
    hasUnsavedChanges = state;
    const badge = document.getElementById('saveStatusIndicator');
    const text = document.getElementById('saveStatusText');
    if (!badge || !text) return;

    if (state) {
      badge.className = 'save-status-badge unsaved';
      text.textContent = 'Unsaved Changes';
    } else {
      badge.className = 'save-status-badge saved';
      text.textContent = 'All Changes Synced';
    }
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : '⚠️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  async function manualSync() {
    const btn = document.getElementById('btnSyncGitHub');
    const statusText = document.getElementById('saveStatusText');
    if (btn) { btn.disabled = true; btn.querySelector('span:last-child').textContent = 'Syncing...'; }
    if (statusText) statusText.textContent = '⏳ Pushing to GitHub...';

    if (window.electronAPI && window.electronAPI.gitPush) {
      const res = await window.electronAPI.gitPush();
      if (res && res.success) {
        showToast('✅ Live website updated! Changes are now live on ravitejaanand.github.io', 'success');
        if (statusText) statusText.textContent = 'Live Synced ✅';
      } else {
        showToast('⚠️ Sync issue: ' + (res ? res.error : 'Unknown error'), 'error');
        if (statusText) statusText.textContent = 'Sync Failed ⚠️';
      }
    }
    if (btn) { btn.disabled = false; btn.querySelector('span:last-child').textContent = 'Sync to Live Site'; }
  }

  return {
    init,
    onLoginSuccess,
    switchModule,
    refreshCurrentModule,
    openModal,
    closeModal,
    setUnsaved,
    showToast,
    manualSync
  };
})();

window.appRenderer = appRenderer;

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.appRenderer.init();
});
