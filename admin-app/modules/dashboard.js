// ==========================================================================
// DASHBOARD MODULE
// ==========================================================================

const dashboardModule = (function () {
  async function render(container) {
    let stats = { categories: 8, services: 14, schemes: 10, jobs: 12, education: 6, emergency: 8, faqs: 3, backups: 0, media: 4 };
    
    if (window.electronAPI && window.electronAPI.getAppStats) {
      const res = await window.electronAPI.getAppStats();
      if (res && res.success) {
        stats = { ...stats, ...res.stats };
      }
    }

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>📊</span> Dashboard Overview</h2>
          <p class="view-subtitle">Live system totals, quick actions, and website JSON content status</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="appRenderer.switchModule('services')">
            <span>➕</span> <span>New Service Guide</span>
          </button>
          <button class="btn-secondary" onclick="appRenderer.switchModule('backups')">
            <span>💾</span> <span>View Backups Vault</span>
          </button>
        </div>
      </div>

      <!-- Hero Stat Cards Grid -->
      <div class="stats-grid">
        <div class="stat-card" onclick="appRenderer.switchModule('categories')" style="cursor: pointer;">
          <div class="stat-header"><span>CATEGORIES</span><span>🗂️</span></div>
          <div class="stat-value">${stats.categories}</div>
          <div class="stat-footer"><span>✓</span> 100% Synced</div>
        </div>

        <div class="stat-card" onclick="appRenderer.switchModule('services')" style="cursor: pointer;">
          <div class="stat-header"><span>SERVICES &amp; GUIDES</span><span>📖</span></div>
          <div class="stat-value">${stats.services}</div>
          <div class="stat-footer"><span>✓</span> Rich Formats</div>
        </div>

        <div class="stat-card" onclick="appRenderer.switchModule('schemes')" style="cursor: pointer;">
          <div class="stat-header"><span>WELFARE SCHEMES</span><span>🏛️</span></div>
          <div class="stat-value">${stats.schemes}</div>
          <div class="stat-footer"><span>✓</span> Direct Benefit</div>
        </div>

        <div class="stat-card" onclick="appRenderer.switchModule('jobs')" style="cursor: pointer;">
          <div class="stat-header"><span>ACTIVE JOBS</span><span>💼</span></div>
          <div class="stat-value">${stats.jobs}</div>
          <div class="stat-footer"><span>✓</span> Notifications Live</div>
        </div>
      </div>

      <!-- Secondary Stats & Quick Actions -->
      <div class="panels-grid">
        
        <!-- Left: Quick Update Hub -->
        <div class="panel-box">
          <div class="panel-head">
            <div class="panel-title"><span>⚡</span> Quick Content Actions</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="stat-card" onclick="appRenderer.switchModule('education')" style="cursor: pointer; padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">🎓</div>
              <div style="font-weight: 800; font-size: 0.95rem;">Education &amp; Scholarships</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${stats.education} Items Active</div>
            </div>

            <div class="stat-card" onclick="appRenderer.switchModule('emergency')" style="cursor: pointer; padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">🚨</div>
              <div style="font-weight: 800; font-size: 0.95rem;">Emergency Helplines</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${stats.emergency} Speed-dial Numbers</div>
            </div>

            <div class="stat-card" onclick="appRenderer.switchModule('faqs')" style="cursor: pointer; padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">❓</div>
              <div style="font-weight: 800; font-size: 0.95rem;">Citizen FAQs</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${stats.faqs} Questions Answered</div>
            </div>

            <div class="stat-card" onclick="appRenderer.switchModule('media')" style="cursor: pointer; padding: 16px;">
              <div style="font-size: 1.4rem; margin-bottom: 6px;">🖼️</div>
              <div style="font-weight: 800; font-size: 0.95rem;">Media &amp; Assets</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${stats.media} Files in Storage</div>
            </div>
          </div>
        </div>

        <!-- Right: System & Backup Health -->
        <div class="panel-box">
          <div class="panel-head">
            <div class="panel-title"><span>🛡️</span> System Health</div>
          </div>

          <div class="control-list">
            <div class="control-btn" style="cursor: default;">
              <span>📁 Storage Engine</span>
              <span class="badge-tag badge-published">Local JSON Direct</span>
            </div>
            <div class="control-btn" style="cursor: default;">
              <span>💾 Automatic Backups</span>
              <span class="badge-tag badge-published">${stats.backups} Snapshots</span>
            </div>
            <div class="control-btn" style="cursor: default;">
              <span>🌐 Public Web Integration</span>
              <span class="badge-tag badge-published">100% Static HTML</span>
            </div>
            <div class="control-btn" onclick="appRenderer.switchModule('backups')" style="cursor: pointer; background: rgba(245,158,11,0.15); border-color: var(--gold);">
              <span>🔄 Open Backups Vault</span>
              <span>↗</span>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  return { render };
})();

window.dashboardModule = dashboardModule;
