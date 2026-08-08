// ==========================================================================
// SETTINGS MODULE
// ==========================================================================

const settingsModule = (function () {
  let settingsData = {
    site_name: 'మన AP సేవలు (AP Citizen Hub)',
    logo_path: 'assets/images/mana_logo.svg',
    theme_color: '#083344',
    default_language: 'te',
    enable_auto_backup: true
  };

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('settings.json');
      if (res && res.success && typeof res.data === 'object') {
        settingsData = { ...settingsData, ...res.data };
      }
    }
    return settingsData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>⚙️</span> Launcher &amp; Portal Settings</h2>
          <p class="view-subtitle">Customize portal branding, default language, colors, and change your 4-digit Master PIN</p>
        </div>
      </div>

      <div class="panel-box" style="max-width: 720px;">
        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label">Portal Brand Name</label>
          <input type="text" id="set_site_name" class="form-input" value="${settingsData.site_name || ''}" />
        </div>

        <div class="form-row" style="margin-bottom: 16px;">
          <div class="form-group">
            <label class="form-label">Logo Path</label>
            <input type="text" id="set_logo" class="form-input" value="${settingsData.logo_path || 'assets/images/mana_logo.svg'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Default Language</label>
            <select id="set_lang" class="form-select">
              <option value="te" ${settingsData.default_language === 'te' ? 'selected' : ''}>Telugu (తెలుగు)</option>
              <option value="en" ${settingsData.default_language === 'en' ? 'selected' : ''}>English</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label">Theme Primary Color</label>
          <input type="color" id="set_color" class="form-input" style="height: 48px; padding: 4px; cursor: pointer;" value="${settingsData.theme_color || '#083344'}" />
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-subtle); margin: 20px 0;" />

        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label" style="color: var(--gold-light);">Change Master Admin PIN (4 Digits)</label>
          <input type="password" maxlength="4" id="set_pin" class="form-input" placeholder="Enter new 4-digit PIN (default: 1343)" style="width: 220px; font-size: 1.2rem; letter-spacing: 4px;" />
        </div>

        <button class="btn-primary" onclick="settingsModule.saveSettings()">
          <span>💾</span> <span>Save Launcher Settings</span>
        </button>
      </div>
    `;
  }

  async function saveSettings() {
    const site_name = document.getElementById('set_site_name').value.trim();
    const logo_path = document.getElementById('set_logo').value.trim();
    const default_language = document.getElementById('set_lang').value;
    const theme_color = document.getElementById('set_color').value;
    const newPin = document.getElementById('set_pin').value.trim();

    settingsData.site_name = site_name;
    settingsData.logo_path = logo_path;
    settingsData.default_language = default_language;
    settingsData.theme_color = theme_color;
    settingsData.last_updated = new Date().toISOString();

    if (newPin && newPin.length === 4) {
      authModule.changePin(newPin);
      appRenderer.showToast('Master PIN updated to: ' + newPin, 'success');
    }

    if (window.electronAPI) {
      await window.electronAPI.writeJson('settings.json', settingsData);
      appRenderer.showToast('Settings saved successfully!', 'success');
    }
  }

  return { render, saveSettings };
})();

window.settingsModule = settingsModule;
