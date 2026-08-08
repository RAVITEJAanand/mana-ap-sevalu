// ==========================================================================
// JOBS & RECRUITMENT MODULE
// ==========================================================================

const jobsModule = (function () {
  let jobsData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('jobs.json');
      if (res && res.success && Array.isArray(res.data)) {
        jobsData = res.data;
      }
    }
    return jobsData;
  }

  async function render(container) {
    await loadData();
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>💼</span> Jobs &amp; Recruitment Notifications</h2>
          <p class="view-subtitle">Manage government teacher jobs, police recruitment, civil services, and application links</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="jobsModule.openEditor()">
            <span>➕</span> <span>Add New Job Notification</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Organization</th>
              <th>Qualification</th>
              <th>Last Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${jobsData.map((job, idx) => {
              const isExpired = job.last_date && job.last_date < today;
              return `
                <tr>
                  <td style="font-weight: 700; color: var(--gold-light);">${job.title || job.title_te || '-'}</td>
                  <td>${job.organization || job.dept || '-'}</td>
                  <td style="font-size: 0.84rem;">${job.qualification || 'Any Degree / SSC'}</td>
                  <td style="font-family: var(--font-mono); color: ${isExpired ? 'var(--red)' : 'var(--green)'};">
                    ${job.last_date || 'Ongoing'}
                  </td>
                  <td><span class="badge-tag" style="background: rgba(168,85,247,0.2); color: var(--purple);">${job.job_type || 'Govt'}</span></td>
                  <td>
                    <span class="badge-tag ${!isExpired ? 'badge-published' : 'badge-draft'}">
                      ${!isExpired ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td>
                    <div class="action-btn-group">
                      <button class="btn-table-action" onclick="jobsModule.openEditor(${idx})">Edit</button>
                      <button class="btn-table-action delete" onclick="jobsModule.deleteJob(${idx})">Delete</button>
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

  function openEditor(editIndex = -1) {
    const isEdit = editIndex >= 0;
    const job = isEdit ? jobsData[editIndex] : {
      title: '',
      organization: 'AP Government',
      location: 'Andhra Pradesh',
      qualification: 'Any Degree / B.Ed / SSC',
      last_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      apply_link: 'https://ap.gov.in',
      notification_pdf: '',
      job_type: 'Govt Job',
      status: 'active'
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Job Notification' : 'Add New Job Notification';
    document.getElementById('modalSubtitle').textContent = 'Enter recruitment details, eligibility, deadlines, and official links';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Job Title (పోస్టు పేరు) *</label>
          <input type="text" id="job_title" class="form-input" value="${job.title || ''}" required placeholder="e.g. AP Mega DSC 2026 Teacher Recruitment" />
        </div>
        <div class="form-group">
          <label class="form-label">Organization / Department *</label>
          <input type="text" id="job_org" class="form-input" value="${job.organization || ''}" required placeholder="e.g. AP School Education Dept" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Required Qualification</label>
          <input type="text" id="job_qual" class="form-input" value="${job.qualification || ''}" placeholder="e.g. D.Ed / B.Ed / Any Degree" />
        </div>
        <div class="form-group">
          <label class="form-label">Job Type</label>
          <select id="job_type" class="form-select">
            <option value="Regular Govt Job" ${job.job_type === 'Regular Govt Job' ? 'selected' : ''}>Regular Govt Job</option>
            <option value="Contract / Outsourcing" ${job.job_type === 'Contract / Outsourcing' ? 'selected' : ''}>Contract / Outsourcing</option>
            <option value="Central Govt in AP" ${job.job_type === 'Central Govt in AP' ? 'selected' : ''}>Central Govt in AP</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Last Date to Apply (గడువు తేదీ) *</label>
          <input type="date" id="job_date" class="form-input" value="${job.last_date || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Job Location</label>
          <input type="text" id="job_loc" class="form-input" value="${job.location || 'All Districts, AP'}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Online Application Link (Apply URL)</label>
        <input type="url" id="job_apply_link" class="form-input" value="${job.apply_link || 'https://ap.gov.in'}" />
      </div>

      <div class="form-group">
        <label class="form-label">Official Notification PDF Link (Optional)</label>
        <input type="text" id="job_pdf" class="form-input" value="${job.notification_pdf || ''}" placeholder="assets/images/notification.pdf or https://..." />
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveJob(editIndex);
    appRenderer.openModal();
  }

  async function saveJob(editIndex) {
    const title = document.getElementById('job_title').value.trim();
    const organization = document.getElementById('job_org').value.trim();
    const qualification = document.getElementById('job_qual').value.trim();
    const job_type = document.getElementById('job_type').value;
    const last_date = document.getElementById('job_date').value;
    const location = document.getElementById('job_loc').value.trim();
    const apply_link = document.getElementById('job_apply_link').value.trim();
    const notification_pdf = document.getElementById('job_pdf').value.trim();

    if (!title || !organization || !last_date) {
      appRenderer.showToast('Please enter Title, Organization, and Last Date', 'error');
      return;
    }

    const item = {
      title,
      organization,
      qualification,
      job_type,
      last_date,
      location,
      apply_link,
      notification_pdf,
      status: 'active'
    };

    if (editIndex >= 0) {
      jobsData[editIndex] = item;
    } else {
      jobsData.unshift(item);
    }

    const res = await window.electronAPI.writeJson('jobs.json', jobsData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('Job notification saved with auto-backup!', 'success');
      jobsModule.render(document.getElementById('view-jobs'));
    }
  }

  async function deleteJob(index) {
    if (confirm(`Delete job "${jobsData[index].title}"?`)) {
      jobsData.splice(index, 1);
      await window.electronAPI.writeJson('jobs.json', jobsData);
      appRenderer.showToast('Job deleted with auto-backup created', 'success');
      jobsModule.render(document.getElementById('view-jobs'));
    }
  }

  return { render, openEditor, deleteJob };
})();

window.jobsModule = jobsModule;
