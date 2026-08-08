// ==========================================================================
// CATEGORIES MODULE
// ==========================================================================

const categoriesModule = (function () {
  let categoriesData = [];

  async function loadData() {
    if (window.electronAPI) {
      const res = await window.electronAPI.readJson('categories.json');
      if (res && res.success && Array.isArray(res.data)) {
        categoriesData = res.data;
      }
    }
    return categoriesData;
  }

  async function render(container) {
    await loadData();

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title"><span>🗂️</span> Categories Management</h2>
          <p class="view-subtitle">Organize and structure the portal's main sections and icons</p>
        </div>
        <div class="view-actions">
          <button class="btn-primary" onclick="categoriesModule.openEditor()">
            <span>➕</span> <span>Add New Category</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Icon</th>
              <th>Telugu Name</th>
              <th>English Name</th>
              <th>Slug</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${categoriesData.map((cat, idx) => `
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 700;">#${cat.order || idx + 1}</td>
                <td style="font-size: 1.4rem;">${cat.icon || '📁'}</td>
                <td style="font-weight: 700; color: var(--gold-light);">${cat.name_te || '-'}</td>
                <td>${cat.name_en || '-'}</td>
                <td style="font-family: var(--font-mono); color: var(--cyan);">${cat.slug || '-'}</td>
                <td>
                  <span class="badge-tag ${cat.visible !== false ? 'badge-published' : 'badge-draft'}" style="cursor: pointer;" onclick="categoriesModule.toggleVisibility(${idx})">
                    ${cat.visible !== false ? '✓ Visible' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div class="action-btn-group">
                    <button class="btn-table-action" title="Move Up" onclick="categoriesModule.moveCategory(${idx}, -1)">▲</button>
                    <button class="btn-table-action" title="Move Down" onclick="categoriesModule.moveCategory(${idx}, 1)">▼</button>
                    <button class="btn-table-action" onclick="categoriesModule.openEditor(${idx})">Edit</button>
                    <button class="btn-table-action delete" onclick="categoriesModule.deleteCategory(${idx})">Delete</button>
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
    const cat = isEdit ? categoriesData[editIndex] : {
      id: 'new_cat_' + Date.now(),
      name_te: '',
      name_en: '',
      slug: '',
      icon: '🏛️',
      order: categoriesData.length + 1,
      visible: true
    };

    const modalBody = document.getElementById('modalBody');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit Category' : 'Add New Category';
    document.getElementById('modalSubtitle').textContent = 'Modify category details and ordering for the public navigation';

    modalBody.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Telugu Name (తెలుగు పేరు) *</label>
          <input type="text" id="cat_name_te" class="form-input" value="${cat.name_te || ''}" required placeholder="ఉదా: సంక్షేమ పథకాలు" />
        </div>
        <div class="form-group">
          <label class="form-label">English Name *</label>
          <input type="text" id="cat_name_en" class="form-input" value="${cat.name_en || ''}" required placeholder="e.g. Welfare Schemes" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Slug (Identifier) *</label>
          <input type="text" id="cat_slug" class="form-input" value="${cat.slug || ''}" required placeholder="e.g. schemes" />
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" id="cat_order" class="form-input" value="${cat.order || 1}" min="1" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Category Icon (Select or Type Emoji)</label>
        <div style="display: flex; gap: 8px; align-items: center;">
          <input type="text" id="cat_icon" class="form-input" style="width: 80px; font-size: 1.4rem; text-align: center;" value="${cat.icon || '🏛️'}" />
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${['🏛️', '💼', '🌾', '🎓', '🏥', '💡', '🪪', '🚨', '📜', '⚖️', '🛍️', '🚌'].map(em => `
              <button type="button" class="btn-table-action" onclick="document.getElementById('cat_icon').value = '${em}'">${em}</button>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Visibility on Public Portal</label>
        <select id="cat_visible" class="form-select">
          <option value="true" ${cat.visible !== false ? 'selected' : ''}>Active &amp; Visible</option>
          <option value="false" ${cat.visible === false ? 'selected' : ''}>Hidden / Draft</option>
        </select>
      </div>
    `;

    document.getElementById('modalSaveBtn').onclick = () => saveCategory(editIndex);
    appRenderer.openModal();
  }

  async function saveCategory(editIndex) {
    const name_te = document.getElementById('cat_name_te').value.trim();
    const name_en = document.getElementById('cat_name_en').value.trim();
    const slug = document.getElementById('cat_slug').value.trim();
    const icon = document.getElementById('cat_icon').value.trim() || '📁';
    const order = parseInt(document.getElementById('cat_order').value, 10) || 1;
    const visible = document.getElementById('cat_visible').value === 'true';

    // Validation
    if (!name_te || !name_en || !slug) {
      appRenderer.showToast('Please fill all required fields (Telugu name, English name, Slug)', 'error');
      return;
    }

    const item = {
      id: slug,
      name_te,
      name_en,
      slug,
      icon,
      order,
      visible
    };

    if (editIndex >= 0) {
      categoriesData[editIndex] = item;
    } else {
      categoriesData.push(item);
    }

    // Sort by order
    categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));

    const res = await window.electronAPI.writeJson('categories.json', categoriesData);
    if (res && res.success) {
      appRenderer.closeModal();
      appRenderer.showToast('Category saved successfully with auto-backup!', 'success');
      categoriesModule.render(document.getElementById('view-categories'));
    } else {
      appRenderer.showToast('Error saving category: ' + (res ? res.error : 'Unknown error'), 'error');
    }
  }

  async function toggleVisibility(index) {
    if (categoriesData[index]) {
      categoriesData[index].visible = categoriesData[index].visible === false ? true : false;
      await window.electronAPI.writeJson('categories.json', categoriesData);
      appRenderer.showToast('Category visibility updated', 'success');
      categoriesModule.render(document.getElementById('view-categories'));
    }
  }

  async function moveCategory(index, delta) {
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= categoriesData.length) return;

    const temp = categoriesData[index];
    categoriesData[index] = categoriesData[targetIdx];
    categoriesData[targetIdx] = temp;

    categoriesData.forEach((c, idx) => c.order = idx + 1);

    await window.electronAPI.writeJson('categories.json', categoriesData);
    categoriesModule.render(document.getElementById('view-categories'));
  }

  async function deleteCategory(index) {
    if (confirm(`Are you sure you want to delete category "${categoriesData[index].name_en}"?`)) {
      categoriesData.splice(index, 1);
      await window.electronAPI.writeJson('categories.json', categoriesData);
      appRenderer.showToast('Category deleted with auto-backup created', 'success');
      categoriesModule.render(document.getElementById('view-categories'));
    }
  }

  return {
    render,
    openEditor,
    toggleVisibility,
    moveCategory,
    deleteCategory
  };
})();

window.categoriesModule = categoriesModule;
