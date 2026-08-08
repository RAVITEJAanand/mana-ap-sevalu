// ==========================================================================
// BACKUPS VAULT MODULE
// ==========================================================================

const backupsModule = (function () {
  let backupsList = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.listBackups();
      if (res && res.success) {
        backupsList = res.backups;
      }
    }
    return backupsList;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>💾</span> Auto-Backups Vault</h2>
          <p class="view-subtitle">Every save automatically creates an immutable timestamped snapshot for 100% data safety</p>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Backup File Name</th>
              <th>Snapshot Timestamp</th>
              <th>File Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${backupsList.length === 0 ? `
              <tr>
                <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 30px;">
                  No backups created yet. Any edit you make automatically produces an instant backup.
                </td>
              </tr>
            ` : backupsList.map((b) => `
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 700; color: var(--cyan);">${b.filename}</td>
                <td style="font-size: 0.85rem;">${new Date(b.createdAt).toLocaleString('en-IN')}</td>
                <td style="font-family: var(--font-mono); font-size: 0.8rem;">${(b.sizeBytes / 1024).toFixed(1)} KB</td>
                <td>
                  <button class="btn-table-action" onclick="backupsModule.restore('${b.filename}')">
                    ↺ Restore
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  async function restore(backupFilename) {
    if (confirm(`Are you sure you want to restore from "${backupFilename}"? This will overwrite the active file with this snapshot.`)) {
      if (window.electronAPI) {
        const res = await window.electronAPI.restoreBackup(backupFilename);
        if (res && res.success) {
          appRenderer.showToast(res.message, 'success');
          appRenderer.refreshCurrentModule();
        } else {
          appRenderer.showToast('Restore error: ' + (res ? res.error : 'Unknown'), 'error');
        }
      }
    }
  }

  return { render, restore };
})();

window.backupsModule = backupsModule;
