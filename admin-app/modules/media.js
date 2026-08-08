// ==========================================================================
// MEDIA & ASSETS MANAGER MODULE
// ==========================================================================

const mediaModule = (function () {
  let mediaList = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.listMedia();
      if (res && res.success) {
        mediaList = res.media;
      }
    }
    return mediaList;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>🖼️</span> Media &amp; Document Manager</h2>
          <p class="view-subtitle">Upload and manage images, government logos, icons, and official notification PDFs</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="mediaModule.uploadFile('images')">
            <span>📤</span> <span>Upload Image</span>
          </button>
          <button class="btn-secondary" onclick="mediaModule.uploadFile('icons')">
            <span>🎨</span> <span>Upload Icon / SVG</span>
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px;">
        ${mediaList.map((m) => `
          <div class="stat-card" style="padding: 16px; text-align: center;">
            <div style="height: 100px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 10px; margin-bottom: 12px; overflow: hidden;">
              ${m.name.endsWith('.svg') || m.name.endsWith('.png') || m.name.endsWith('.jpg') || m.name.endsWith('.webp')
                ? `<img src="../${m.relPath}" style="max-height: 80px; max-width: 100%; object-fit: contain;" alt="${m.name}">`
                : `<span style="font-size: 2.5rem;">📄</span>`}
            </div>
            
            <div style="font-weight: 700; font-size: 0.86rem; color: var(--gold-light); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${m.name}">
              ${m.name}
            </div>

            <div style="font-size: 0.74rem; color: var(--text-muted); margin: 4px 0 10px; font-family: var(--font-mono);">
              ${(m.sizeBytes / 1024).toFixed(1)} KB
            </div>

            <button class="btn-table-action" style="width: 100%; font-size: 0.76rem;" onclick="mediaModule.copyRelPath('${m.relPath}')">
              📋 Copy Path
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  async function uploadFile(targetFolder) {
    if (window.electronAPI) {
      const res = await window.electronAPI.uploadMedia(targetFolder);
      if (res && res.success) {
        appRenderer.showToast(`File "${res.fileName}" imported into ${res.relPath}!`, 'success');
        mediaModule.render(document.getElementById('view-media'));
      }
    }
  }

  function copyRelPath(relPath) {
    navigator.clipboard.writeText(relPath);
    appRenderer.showToast(`Copied "${relPath}" to clipboard!`, 'success');
  }

  return { render, uploadFile, copyRelPath };
})();

window.mediaModule = mediaModule;
