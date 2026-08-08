// ==========================================================================
// FAQ KNOWLEDGEBASE MODULE
// ==========================================================================

const faqsModule = (function () {
  let faqsData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('faqs.json');
      if (res && res.success && Array.isArray(res.data)) {
        faqsData = res.data;
      }
    }
    return faqsData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>❓</span> Citizen FAQ Knowledgebase</h2>
          <p class="view-subtitle">Manage frequently asked questions with accordion-style previews</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="faqsModule.openEditor()">
            <span>➕</span> <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${faqsData.map((faq, idx) => `
          <div class="stat-card" style="padding: 18px 22px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
              <div>
                <div style="font-weight: 800; font-size: 1.05rem; color: var(--gold-light); margin-bottom: 6px;">
                  Q: ${faq.question || '-'}
                </div>
                <div style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
                  A: ${faq.answer || '-'}
                </div>
                <div style="margin-top: 10px;">
                  <span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--cyan);">Topic: ${faq.related_topic_id || 'General'}</span>
                </div>
              </div>
              <div class="action-btn-group">
                <button class="btn-table-action" onclick="faqsModule.openEditor(${idx})">Edit</button>
                <button class="btn-table-action delete" onclick="faqsModule.deleteFaq(${idx})">Delete</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function openEditor(editIndex = -1) {
    const isEdit = editIndex >= 0;
    const faq = isEdit ? faqsData[editIndex] : {
      question: '',
      answer: '',
      related_topic_id: 'schemes'
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit FAQ' : 'Add New FAQ';
    document.getElementById('modalSubtitle').textContent = 'Write a clear, helpful question and answer for citizens';

    modalBody.innerHTML = `
      <div class="form-group">
        <label class="form-label">Citizen Question (ప్రశ్న) *</label>
        <input type="text" id="faq_q" class="form-input" value="${faq.question || ''}" required placeholder="ఉదా: రేషన్ కార్డు eKYC ఎక్కడ చేయించాలి?" />
      </div>

      <div class="form-group">
        <label class="form-label">Detailed Answer (సమాధానం) *</label>
        <textarea id="faq_a" class="form-textarea" rows="4" required placeholder="సవివరమైన సమాధానం...">${faq.answer || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Related Category / Topic Slug</label>
        <input type="text" id="faq_topic" class="form-input" value="${faq.related_topic_id || 'schemes'}" placeholder="schemes, jobs, education, identity..." />
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveFaq(editIndex);
    appRenderer.openModal();
  }

  async function saveFaq(editIndex) {
    const question = document.getElementById('faq_q').value.trim();
    const answer = document.getElementById('faq_a').value.trim();
    const related_topic_id = document.getElementById('faq_topic').value.trim();

    if (!question || !answer) {
      appRenderer.showToast('Please enter Question and Answer', 'error');
      return;
    }

    const item = {
      id: 'faq_' + Date.now(),
      question,
      answer,
      related_topic_id: related_topic_id || 'schemes'
    };

    if (editIndex >= 0) {
      faqsData[editIndex] = item;
    } else {
      faqsData.unshift(item);
    }

    const res = await window.electronAPI.writeJson('faqs.json', faqsData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('FAQ saved with auto-backup!', 'success');
      faqsModule.render(document.getElementById('view-faqs'));
    }
  }

  async function deleteFaq(index) {
    if (confirm(`Delete FAQ "${faqsData[index].question}"?`)) {
      faqsData.splice(index, 1);
      await window.electronAPI.writeJson('faqs.json', faqsData);
      appRenderer.showToast('FAQ deleted with auto-backup created', 'success');
      faqsModule.render(document.getElementById('view-faqs'));
    }
  }

  return { render, openEditor, deleteFaq };
})();

window.faqsModule = faqsModule;
