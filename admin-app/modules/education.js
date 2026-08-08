// ==========================================================================
// EDUCATION & SCHOLARSHIPS MODULE
// ==========================================================================

const educationModule = (function () {
  let educationData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('education.json');
      if (res && res.success && Array.isArray(res.data)) {
        educationData = res.data;
      }
    }
    return educationData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>🎓</span> Education, Scholarships &amp; Exams</h2>
          <p class="view-subtitle">Manage Jnanabhumi scholarships, Vidya Deevena, Vasathi Deevena, and entrance tests</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="educationModule.openEditor()">
            <span>➕</span> <span>Add Education Service</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Program Name</th>
              <th>Category</th>
              <th>Eligibility</th>
              <th>Official Portal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${educationData.map((edu, idx) => `
              <tr>
                <td style="font-size: 1.4rem;">${edu.icon || '🎓'}</td>
                <td style="font-weight: 700; color: var(--gold-light);">${edu.name || edu.title || '-'}</td>
                <td><span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--cyan);">${edu.category || 'Scholarship'}</span></td>
                <td style="font-size: 0.84rem; color: var(--text-secondary); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${edu.eligibility || '-'}</td>
                <td>
                  <a href="${edu.link || 'https://jnanabhumi.ap.gov.in'}" target="_blank" class="btn-table-action" style="color: var(--cyan);">Visit ↗</a>
                </td>
                <td>
                  <div class="action-btn-group">
                    <button class="btn-table-action" onclick="educationModule.openEditor(${idx})">Edit</button>
                    <button class="btn-table-action delete" onclick="educationModule.deleteEdu(${idx})">Delete</button>
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
    const edu = isEdit ? educationData[editIndex] : {
      name: '',
      category: 'Scholarship',
      icon: '🎓',
      eligibility: 'ITI, Polytechnic, Degree, Engineering students',
      benefits: '100% Fee Reimbursement & Mess Allowance',
      link: 'https://jnanabhumi.ap.gov.in'
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Education Program' : 'Add Education Program';
    document.getElementById('modalSubtitle').textContent = 'Enter scholarship, exam, or college admission details';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Program Name (పథకం / పరీక్ష పేరు) *</label>
          <input type="text" id="edu_name" class="form-input" value="${edu.name || ''}" required placeholder="e.g. Jagananna Vidya Deevena" />
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select id="edu_category" class="form-select">
            <option value="Scholarship" ${edu.category === 'Scholarship' ? 'selected' : ''}>Scholarship</option>
            <option value="Entrance Exam" ${edu.category === 'Entrance Exam' ? 'selected' : ''}>Entrance Exam</option>
            <option value="College Admission" ${edu.category === 'College Admission' ? 'selected' : ''}>College Admission</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Eligibility Rules (అర్హతలు)</label>
        <textarea id="edu_eligibility" class="form-textarea" rows="2">${edu.eligibility || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Benefits / Fee Structure (ప్రయోజనాలు)</label>
        <textarea id="edu_benefits" class="form-textarea" rows="2">${edu.benefits || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Official Portal URL</label>
        <input type="url" id="edu_link" class="form-input" value="${edu.link || 'https://jnanabhumi.ap.gov.in'}" />
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveEdu(editIndex);
    appRenderer.openModal();
  }

  async function saveEdu(editIndex) {
    const name = document.getElementById('edu_name').value.trim();
    const category = document.getElementById('edu_category').value;
    const eligibility = document.getElementById('edu_eligibility').value.trim();
    const benefits = document.getElementById('edu_benefits').value.trim();
    const link = document.getElementById('edu_link').value.trim();

    if (!name) {
      appRenderer.showToast('Please enter Program Name', 'error');
      return;
    }

    const item = {
      name,
      category,
      icon: '🎓',
      eligibility,
      benefits,
      link
    };

    if (editIndex >= 0) {
      educationData[editIndex] = item;
    } else {
      educationData.push(item);
    }

    const res = await window.electronAPI.writeJson('education.json', educationData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('Education program saved with auto-backup!', 'success');
      educationModule.render(document.getElementById('view-education'));
    }
  }

  async function deleteEdu(index) {
    if (confirm(`Delete education program "${educationData[index].name}"?`)) {
      educationData.splice(index, 1);
      await window.electronAPI.writeJson('education.json', educationData);
      appRenderer.showToast('Item deleted with auto-backup created', 'success');
      educationModule.render(document.getElementById('view-education'));
    }
  }

  return { render, openEditor, deleteEdu };
})();

window.educationModule = educationModule;
