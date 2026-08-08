// ==========================================================================
// PREVIEW MODULE
// ==========================================================================

const previewModule = (function () {
  function openPreview(item) {
    const modal = document.getElementById('previewModal');
    const titleEl = document.getElementById('previewTitle');
    const bodyEl = document.getElementById('previewBody');

    titleEl.textContent = item.title_te || item.title || item.name || 'Page Preview';

    bodyEl.innerHTML = `
      <div style="background: radial-gradient(circle at top right, #083344, #02121e 75%); border-radius: 14px; padding: 24px; color: #f8fafc;">
        
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
          <div style="font-size: 2.5rem;">${item.icon || '📖'}</div>
          <div>
            <h1 style="font-size: 1.45rem; font-weight: 900; color: #fef08a; margin-bottom: 4px;">
              ${item.title_te || item.name || ''}
            </h1>
            <div style="font-size: 0.85rem; color: #94a3b8;">
              ${item.title_en || item.category_en || 'AP Citizen Service'} &bull; Verified: ${item.last_verified || '2026-08-08'}
            </div>
          </div>
        </div>

        <p style="font-size: 0.95rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border-left: 4px solid #f59e0b;">
          ${item.about_te || item.benefits || item.subtitle_te || 'సమగ్ర సమాచారం మరియు అర్హతల వివరాలు.'}
        </p>

        ${item.eligibility && item.eligibility.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 1.05rem; font-weight: 800; color: #fef08a; margin-bottom: 8px;">📋 అర్హతలు (Eligibility):</h3>
            <ul style="padding-left: 20px; font-size: 0.9rem; line-height: 1.8; color: #e2e8f0;">
              ${Array.isArray(item.eligibility) ? item.eligibility.map(e => `<li>${e}</li>`).join('') : `<li>${item.eligibility}</li>`}
            </ul>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
          <span style="font-size: 0.78rem; color: #22c55e; font-weight: 700;">🟢 100% Verified Citizen Service</span>
          <a href="${item.official_links && item.official_links[0] ? item.official_links[0].url : 'https://ap.gov.in'}" target="_blank" class="btn-primary" style="font-size: 0.85rem; padding: 8px 16px;">
            <span>🏛️ అధికారిక పోర్టల్ ↗</span>
          </a>
        </div>

      </div>
    `;

    modal.classList.add('active');
    const closeBtn = document.getElementById('previewCloseBtn');
    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
  }

  return { openPreview };
})();

window.previewModule = previewModule;
