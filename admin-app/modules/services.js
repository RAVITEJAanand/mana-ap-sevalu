// ==========================================================================
// SERVICES & GUIDES MODULE (Core Rich Content System)
// ==========================================================================

const servicesModule = (function () {
  let guidesData = {};

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('guides.json');
      if (res && res.success && typeof res.data === 'object') {
        guidesData = res.data;
      }
    }
    return guidesData;
  }

  async function render(container) {
    await loadData();
    const guideKeys = Object.keys(guidesData);

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>📖</span> Services &amp; Citizen Guides</h2>
          <p class="view-subtitle">The core digital knowledge base with rich step-by-step application instructions</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="servicesModule.openEditor()">
            <span>➕</span> <span>Create New Service Guide</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Telugu Title</th>
              <th>English Title</th>
              <th>Category</th>
              <th>Last Verified</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${guideKeys.map((key) => {
              const item = guidesData[key];
              const isPublished = item.status !== 'draft';
              return `
                <tr>
                  <td style="font-size: 1.4rem;">${item.icon || '📖'}</td>
                  <td style="font-weight: 700; color: var(--gold-light);">${item.title_te || key}</td>
                  <td>${item.title_en || '-'}</td>
                  <td><span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--cyan);">${item.category_en || item.category_te || 'General'}</span></td>
                  <td style="font-family: var(--font-mono); font-size: 0.8rem;">${item.last_verified || '2026-08-08'}</td>
                  <td>
                    <span class="badge-tag ${isPublished ? 'badge-published' : 'badge-draft'}">
                      ${isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div class="action-btn-group">
                      <button class="btn-table-action" onclick="servicesModule.previewGuide('${key}')">👁️ Preview</button>
                      <button class="btn-table-action" onclick="servicesModule.openEditor('${key}')">Edit</button>
                      <button class="btn-table-action delete" onclick="servicesModule.deleteGuide('${key}')">Delete</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function openEditor(editKey = null) {
    const isEdit = Boolean(editKey && guidesData[editKey]);
    const item = isEdit ? guidesData[editKey] : {
      title_te: '',
      title_en: '',
      slug: '',
      category_te: 'సంక్షేమ పథకాలు',
      category_en: 'Welfare Schemes',
      icon: '🏛️',
      subtitle_te: '',
      subtitle_en: '',
      about_te: '',
      about_en: '',
      eligibility: ['ఆంధ్రప్రదేశ్ పౌరులు అర్హులు.'],
      sections: [],
      official_links: [{ title: 'అధికారిక పోర్టల్', url: 'https://ap.gov.in' }],
      last_verified: new Date().toISOString().split('T')[0],
      status: 'published'
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Service Guide' : 'Create New Service Guide';
    document.getElementById('modalSubtitle').textContent = 'Fill in rich structured fields, dynamic sections, and official source links';

    const currentKey = editKey || '';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Service Slug / Key (Unique ID) *</label>
          <input type="text" id="svc_key" class="form-input" value="${currentKey}" ${isEdit ? 'readonly style="opacity:0.7;"' : ''} required placeholder="e.g. rythu-bharosa" />
        </div>
        <div class="form-group">
          <label class="form-label">Icon Emoji</label>
          <input type="text" id="svc_icon" class="form-input" value="${item.icon || '📖'}" style="width: 80px; text-align: center; font-size: 1.4rem;" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Title (తెలుగు) *</label>
          <input type="text" id="svc_title_te" class="form-input" value="${item.title_te || ''}" required placeholder="ఉదా: రైతు భరోసా సమగ్ర గైడ్" />
        </div>
        <div class="form-group">
          <label class="form-label">Title (English) *</label>
          <input type="text" id="svc_title_en" class="form-input" value="${item.title_en || ''}" required placeholder="e.g. Rythu Bharosa Comprehensive Guide" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category (తెలుగు)</label>
          <input type="text" id="svc_cat_te" class="form-input" value="${item.category_te || 'సంక్షేమ పథకాలు'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Category (English)</label>
          <input type="text" id="svc_cat_en" class="form-input" value="${item.category_en || 'Welfare Schemes'}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Short Description / Subtitle (తెలుగు)</label>
        <input type="text" id="svc_sub_te" class="form-input" value="${item.subtitle_te || ''}" placeholder="సంక్షిప్త వివరాలు..." />
      </div>

      <div class="form-group">
        <label class="form-label">Full About / Overview Content (తెలుగు) *</label>
        <textarea id="svc_about_te" class="form-textarea" rows="4" required placeholder="పథకం లేదా సేవ పూర్తి వివరాలు...">${item.about_te || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Eligibility Criteria (1 per line)</label>
        <textarea id="svc_eligibility" class="form-textarea" rows="3" placeholder="ప్రతి అర్హతను ఒక కొత్త లైన్ లో రాయండి...">${Array.isArray(item.eligibility) ? item.eligibility.join('\n') : ''}</textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Publication Status</label>
          <select id="svc_status" class="form-select">
            <option value="published" ${item.status !== 'draft' ? 'selected' : ''}>Published (Live)</option>
            <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>Draft (Hidden)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Last Verified Date</label>
          <input type="date" id="svc_verified" class="form-input" value="${item.last_verified || new Date().toISOString().split('T')[0]}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Official Portal Link URL</label>
        <input type="url" id="svc_official_url" class="form-input" value="${item.official_links && item.official_links[0] ? item.official_links[0].url : 'https://ap.gov.in'}" placeholder="https://..." />
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveGuide(isEdit, currentKey);
    appRenderer.openModal();
  }

  async function saveGuide(isEdit, oldKey) {
    const key = (isEdit ? oldKey : document.getElementById('svc_key').value.trim()).toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const title_te = document.getElementById('svc_title_te').value.trim();
    const title_en = document.getElementById('svc_title_en').value.trim();
    const icon = document.getElementById('svc_icon').value.trim() || '📖';
    const category_te = document.getElementById('svc_cat_te').value.trim();
    const category_en = document.getElementById('svc_cat_en').value.trim();
    const subtitle_te = document.getElementById('svc_sub_te').value.trim();
    const about_te = document.getElementById('svc_about_te').value.trim();
    const status = document.getElementById('svc_status').value;
    const last_verified = document.getElementById('svc_verified').value;
    const official_url = document.getElementById('svc_official_url').value.trim();
    const eligRaw = document.getElementById('svc_eligibility').value.trim();
    const eligibility = eligRaw ? eligRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

    if (!key || !title_te || !about_te) {
      appRenderer.showToast('Please fill all required fields (Key, Title, About Content)', 'error');
      return;
    }

    const item = guidesData[key] || {};
    item.title_te = title_te;
    item.title_en = title_en;
    item.slug = key;
    item.icon = icon;
    item.category_te = category_te;
    item.category_en = category_en;
    item.subtitle_te = subtitle_te;
    item.about_te = about_te;
    item.status = status;
    item.last_verified = last_verified;
    item.eligibility = eligibility;
    item.official_links = [{ title: 'అధికారిక పోర్టల్', url: official_url || 'https://ap.gov.in' }];

    guidesData[key] = item;

    const res = await window.electronAPI.writeJson('guides.json', guidesData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast(`Service "${title_en || key}" saved successfully with auto-backup!`, 'success');
      servicesModule.render(document.getElementById('view-services'));
    } else {
      appRenderer.showToast('Error saving service: ' + (res ? res.error : 'Unknown error'), 'error');
    }
  }

  async function deleteGuide(key) {
    if (confirm(`Are you sure you want to delete guide "${key}"?`)) {
      delete guidesData[key];
      await window.electronAPI.writeJson('guides.json', guidesData);
      appRenderer.showToast('Service guide deleted with auto-backup created', 'success');
      servicesModule.render(document.getElementById('view-services'));
    }
  }

  function previewGuide(key) {
    const item = guidesData[key];
    if (!item) return;
    previewModule.openPreview(item);
  }

  return {
    render,
    openEditor,
    previewGuide,
    deleteGuide
  };
})();

window.servicesModule = servicesModule;
