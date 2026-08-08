// ==========================================================================
// SCHEMES MODULE
// ==========================================================================

const schemesModule = (function () {
  let schemesData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('schemes.json');
      if (res && res.success && Array.isArray(res.data)) {
        schemesData = res.data;
      }
    }
    return schemesData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>🏛️</span> Government Welfare Schemes</h2>
          <p class="view-subtitle">Manage welfare benefits, eligibility rules, and application links</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="schemesModule.openEditor()">
            <span>➕</span> <span>Add New Scheme</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Scheme Name</th>
              <th>Category</th>
              <th>Benefits</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${schemesData.map((sc, idx) => `
              <tr>
                <td style="font-size: 1.4rem;">${sc.icon || '🏛️'}</td>
                <td style="font-weight: 700; color: var(--gold-light);">${sc.name || sc.name_te || '-'}</td>
                <td><span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--cyan);">${sc.category || 'Welfare'}</span></td>
                <td style="font-size: 0.84rem; color: var(--text-secondary); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sc.benefits || sc.short_description || '-'}</td>
                <td>
                  <span class="badge-tag ${sc.status !== 'draft' ? 'badge-published' : 'badge-draft'}">
                    ${sc.status !== 'draft' ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div class="action-btn-group">
                    <button class="btn-table-action" onclick="schemesModule.openEditor(${idx})">Edit</button>
                    <button class="btn-table-action delete" onclick="schemesModule.deleteScheme(${idx})">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function openEditor(editIndex = -1) {
    const isEdit = editIndex >= 0;
    const sc = isEdit ? schemesData[editIndex] : {
      name: '',
      category: 'Welfare',
      icon: '🏛️',
      eligibility: '',
      benefits: '',
      documents: '',
      how_to_apply: '',
      official_link: 'https://ap.gov.in',
      status: 'active'
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Scheme' : 'Add New Scheme';
    document.getElementById('modalSubtitle').textContent = 'Provide eligibility, benefits, and required documents';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Scheme Name (పథకం పేరు) *</label>
          <input type="text" id="sch_name" class="form-input" value="${sc.name || ''}" required placeholder="e.g. NTR Bharosa Pension" />
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" id="sch_category" class="form-input" value="${sc.category || 'Welfare'}" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Icon Emoji</label>
          <input type="text" id="sch_icon" class="form-input" value="${sc.icon || '🏛️'}" style="width: 80px; text-align: center; font-size: 1.4rem;" />
        </div>
        <div class="form-group">
          <label class="form-label">Official Link</label>
          <input type="url" id="sch_link" class="form-input" value="${sc.official_link || 'https://ap.gov.in'}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Key Benefits (ప్రయోజనాలు) *</label>
        <textarea id="sch_benefits" class="form-textarea" rows="2" required placeholder="లబ్ధిదారులకు అందే ప్రయోజనాలు...">${sc.benefits || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Eligibility Criteria (అర్హతలు)</label>
        <textarea id="sch_eligibility" class="form-textarea" rows="3" placeholder="ఎవరెవరు అర్హులు...">${sc.eligibility || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Required Documents (కావలసిన పత్రాలు)</label>
        <textarea id="sch_documents" class="form-textarea" rows="2" placeholder="ఆధార్ కార్డు, రేషన్ కార్డు, మొదలైనవి...">${sc.documents || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">How to Apply (దరఖాస్తు విధానం)</label>
        <textarea id="sch_apply" class="form-textarea" rows="2" placeholder="సచివాలయం లేదా ఆన్‌లైన్ దరఖాస్తు దశలు...">${sc.how_to_apply || ''}</textarea>
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveScheme(editIndex);
    appRenderer.openModal();
  }

  async function saveScheme(editIndex) {
    const name = document.getElementById('sch_name').value.trim();
    const category = document.getElementById('sch_category').value.trim();
    const icon = document.getElementById('sch_icon').value.trim() || '🏛️';
    const benefits = document.getElementById('sch_benefits').value.trim();
    const eligibility = document.getElementById('sch_eligibility').value.trim();
    const documents = document.getElementById('sch_documents').value.trim();
    const how_to_apply = document.getElementById('sch_apply').value.trim();
    const official_link = document.getElementById('sch_link').value.trim();

    if (!name || !benefits) {
      appRenderer.showToast('Please enter Scheme Name and Benefits', 'error');
      return;
    }

    const item = {
      name,
      category,
      icon,
      benefits,
      eligibility,
      documents,
      how_to_apply,
      official_link,
      status: 'active',
      last_verified: new Date().toISOString().split('T')[0]
    };

    if (editIndex >= 0) {
      schemesData[editIndex] = item;
    } else {
      schemesData.unshift(item);
    }

    const res = await window.electronAPI.writeJson('schemes.json', schemesData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('Scheme saved successfully with auto-backup!', 'success');
      schemesModule.render(document.getElementById('view-schemes'));
    }
  }

  async function deleteScheme(index) {
    if (confirm(`Delete scheme "${schemesData[index].name}"?`)) {
      schemesData.splice(index, 1);
      await window.electronAPI.writeJson('schemes.json', schemesData);
      appRenderer.showToast('Scheme deleted with auto-backup created', 'success');
      schemesModule.render(document.getElementById('view-schemes'));
    }
  }

  return { render, openEditor, deleteScheme };
})();

window.schemesModule = schemesModule;
