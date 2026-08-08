// ==========================================================================
// EMERGENCY HELPLINES MODULE
// ==========================================================================

const emergencyModule = (function () {
  let emergencyData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('emergency.json');
      if (res && res.success && Array.isArray(res.data)) {
        emergencyData = res.data;
      }
    }
    return emergencyData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>🚨</span> 24x7 Emergency Helplines</h2>
          <p class="view-subtitle">Critical toll-free speed dial numbers for police, ambulance, women, children, and cyber crime</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="emergencyModule.openEditor()">
            <span>➕</span> <span>Add Emergency Helpline</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Helpline Name</th>
              <th>Speed Dial Number</th>
              <th>Category</th>
              <th>Verified Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${emergencyData.map((em, idx) => `
              <tr>
                <td style="font-weight: 700; color: var(--gold-light);">${em.service_name || em.title || '-'}</td>
                <td style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--red);">${em.number || em.phone || '-'}</td>
                <td><span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--cyan);">${em.category || 'Emergency'}</span></td>
                <td>
                  <span class="badge-tag badge-published">
                    ${em.verified !== false ? '✓ 24x7 Verified' : 'Standard'}
                  </span>
                </td>
                <td>
                  <div class="action-btn-group">
                    <button class="btn-table-action" onclick="emergencyModule.openEditor(${idx})">Edit</button>
                    <button class="btn-table-action delete" onclick="emergencyModule.deleteEmergency(${idx})">Delete</button>
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
    const em = isEdit ? emergencyData[editIndex] : {
      service_name: '',
      number: '112',
      description: '24x7 Unified National Emergency Response System',
      category: 'National Emergency',
      source: 'Government of Andhra Pradesh',
      verified: true,
      add_call_btn: true
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Emergency Helpline' : 'Add Emergency Helpline';
    document.getElementById('modalSubtitle').textContent = 'Set speed dial number, description, and direct call action';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Service Name (సేవ పేరు) *</label>
          <input type="text" id="em_name" class="form-input" value="${em.service_name || em.title || ''}" required placeholder="e.g. 100 Police Control Room" />
        </div>
        <div class="form-group">
          <label class="form-label">Toll-Free Speed Dial Number *</label>
          <input type="text" id="em_number" class="form-input" value="${em.number || em.phone || ''}" required placeholder="e.g. 100 or 1930" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" id="em_cat" class="form-input" value="${em.category || 'Emergency'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Official Source</label>
          <input type="text" id="em_source" class="form-input" value="${em.source || 'AP State Disaster Management'}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Description / Purpose</label>
        <textarea id="em_desc" class="form-textarea" rows="2">${em.description || ''}</textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">24x7 Verified Status</label>
          <select id="em_verified" class="form-select">
            <option value="true" ${em.verified !== false ? 'selected' : ''}>Verified Official Government Helpline</option>
            <option value="false" ${em.verified === false ? 'selected' : ''}>Unverified / Temporary</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Show 1-Click Call Button</label>
          <select id="em_callbtn" class="form-select">
            <option value="true" ${em.add_call_btn !== false ? 'selected' : ''}>Yes (tel: link)</option>
            <option value="false" ${em.add_call_btn === false ? 'selected' : ''}>No</option>
          </select>
        </div>
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveEmergency(editIndex);
    appRenderer.openModal();
  }

  async function saveEmergency(editIndex) {
    const service_name = document.getElementById('em_name').value.trim();
    const number = document.getElementById('em_number').value.trim();
    const category = document.getElementById('em_cat').value.trim();
    const source = document.getElementById('em_source').value.trim();
    const description = document.getElementById('em_desc').value.trim();
    const verified = document.getElementById('em_verified').value === 'true';
    const add_call_btn = document.getElementById('em_callbtn').value === 'true';

    if (!service_name || !number) {
      appRenderer.showToast('Please enter Service Name and Number', 'error');
      return;
    }

    const item = {
      service_name,
      number,
      category,
      source,
      description,
      verified,
      add_call_btn
    };

    if (editIndex >= 0) {
      emergencyData[editIndex] = item;
    } else {
      emergencyData.push(item);
    }

    const res = await window.electronAPI.writeJson('emergency.json', emergencyData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('Emergency helpline saved with auto-backup!', 'success');
      emergencyModule.render(document.getElementById('view-emergency'));
    }
  }

  async function deleteEmergency(index) {
    if (confirm(`Delete emergency number "${emergencyData[index].service_name}"?`)) {
      emergencyData.splice(index, 1);
      await window.electronAPI.writeJson('emergency.json', emergencyData);
      appRenderer.showToast('Emergency number deleted with auto-backup created', 'success');
      emergencyModule.render(document.getElementById('view-emergency'));
    }
  }

  return { render, openEditor, deleteEmergency };
})();

window.emergencyModule = emergencyModule;
