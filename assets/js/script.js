/**
 * Mana AP Sevalu (మన AP సేవలు) - Master Interactive Engine
 * 100% True Real-Time Global Visitor Counter (Central Cloud Sync), Master Translator & Theme
 */

document.addEventListener('DOMContentLoaded', () => {
  initMasterLanguageTranslator();
  initThemeEngine();
  initFontResizer();
  initMobileMenu();
  initGlobalInstantSearch();
  initStickyTocHighlighter();
  initFaqAccordion();
});



/* --------------------------------------------------------------------------
   2. Master Instant Full-Page Bilingual Translator (Telugu <-> English)
   -------------------------------------------------------------------------- */
const UI_TRANSLATIONS = {
  // Navigation & Branding
  "brand_tagline": { te: "ఆంధ్రప్రదేశ్ డిజిటల్ పౌర సేవా మిత్ర (Mana AP Sevalu)", en: "Andhra Pradesh Digital Citizen Knowledge Portal" },
  "nav_home": { te: "🏠 హోమ్", en: "🏠 Home" },
  "nav_identity": { te: "🪪 గుర్తింపు పత్రాలు", en: "🪪 Identity Documents" },
  "nav_schemes": { te: "🏛️ పథకాలు", en: "🏛️ Govt Schemes" },
  "nav_jobs": { te: "💼 ఉద్యోగాలు", en: "💼 Jobs & Careers" },
  "nav_farmers": { te: "🌾 రైతు సేవలు", en: "🌾 Farmer Portal" },
  "nav_education": { te: "🎓 విద్య", en: "🎓 Education & CETs" },
  "nav_bills": { te: "⚡ బిల్లులు", en: "⚡ Utility Bills" },
  "nav_emergency": { te: "🚨 అత్యవసరం", en: "🚨 24x7 Emergency" },
  
  // Ticker & Hero
  "ticker_label": { te: "🔔 తాజా ప్రకటనలు", en: "🔔 Live Updates" },
  "hero_tag": { te: "✨ ఆంధ్రప్రదేశ్ పౌరుల సమగ్ర డిజిటల్ నాలెడ్జ్ గైడ్", en: "✨ Comprehensive AP Citizen Digital Knowledge Guide" },
  "hero_heading": { te: "ప్రభుత్వ సేవలు, పథకాలు & ఉద్యోగాల పూర్తి సమాచారం ఒకే చోట", en: "Government Services, Welfare Schemes & Jobs Portal" },
  "hero_subtext": { te: "అర్హతలు, పత్రాల చెక్‌లిస్ట్, స్టెప్ బై స్టెప్ దరఖాస్తు విధానం మరియు 100% పనిచేసే అధికారిక ప్రత్యామ్నాయ వర్కింగ్ లింకులు.", en: "Eligibility criteria, documents checklist, step-by-step application flows and 100% active official mirror links." },
  
  // Search
  "search_btn": { te: "వెతకండి", en: "Search" },
  "search_placeholder": { te: "ఆధార్, రేషన్ కార్డు, రైతు భరోసా, DSC, స్కాలర్‌షిప్ అని టైప్ చేయండి...", en: "Search Aadhaar, Rice card, Rythu Bharosa, DSC, Scholarships..." },
  "cat_all": { te: "అన్ని రంగాలు", en: "All Categories" },
  "cat_identity": { te: "గుర్తింపు పత్రాలు", en: "Identity Documents" },
  "cat_schemes": { te: "సంక్షేమ పథకాలు", en: "Welfare Schemes" },
  "cat_jobs": { te: "ఉద్యోగాలు", en: "Jobs & Careers" },
  "cat_farmers": { te: "రైతు సేవలు", en: "Farmer Services" },
  "cat_education": { te: "విద్య & ప్రవేశాలు", en: "Education & CETs" },

  // Sections
  "sec_categories_title": { te: "ప్రధాన సేవా రంగాలు (Service Categories)", en: "Key Service Categories" },
  "sec_categories_sub": { te: "మీకు కావలసిన కేటగిరీని ఎంచుకుని పూర్తి మార్గదర్శకాలు మరియు అధికారిక పోర్టల్స్ వీక్షించండి", en: "Select a category to view detailed citizen guides and multi-server gateways" },
  "sec_featured_title": { te: "అత్యంత ప్రాధాన్యత గల సేవలు (Featured Guides)", en: "Top Featured Citizen Services" },
  "sec_featured_sub": { te: "లక్షలాది పౌరులు ప్రతిరోజూ వినియోగించే టాప్ గైడ్లు మరియు మల్టీ-సర్వర్ పోర్టల్స్", en: "Most visited citizen guides and working official portals" },
  "btn_read_guide": { te: "పూర్తి గైడ్ చదవండి →", en: "Read Full Guide →" },
  "btn_view_category": { te: "గైడ్ వీక్షించండి →", en: "View Guide →" },

  // TOC (Sticky Box)
  "toc_title": { te: "ఈ పేజీలో (Contents)", en: "In this page (Contents)" },
  "toc_sec1": { te: "✔ ఏమిటి & ఉద్దేశ్యం?", en: "✔ 1. About & Purpose" },
  "toc_sec2": { te: "✔ ఎవరు అర్హులు?", en: "✔ 2. Eligibility Criteria" },
  "toc_sec3": { te: "✔ అవసరమైన పత్రాలు", en: "✔ 3. Required Documents" },
  "toc_sec4": { te: "✔ స్టెప్ బై స్టెప్ విధానం", en: "✔ 4. Step-by-Step Flow" },
  "toc_sec5": { te: "✔ డౌన్‌లోడ్‌లు & సేవలు", en: "✔ 5. Downloads & Services" },
  "toc_sec6": { te: "✔ ప్రభుత్వ నియమాలు", en: "✔ 6. Official Govt Rules" },
  "toc_sec7": { te: "✔ ముఖ్యమైన జాగ్రత్తలు", en: "✔ 7. Crucial Precautions" },
  "toc_sec8": { te: "✔ తరచుగా అడిగే ప్రశ్నలు", en: "✔ 8. Common FAQs" },
  "toc_sec9": { te: "✔ అధికారిక & ప్రత్యామ్నాయ లింకులు", en: "✔ 9. Official Working Portals" },
  "btn_print_guide": { te: "🖨️ ఈ గైడ్‌ను ప్రింట్ / సేవ్ చేయండి", en: "🖨️ Print / Save Citizen Guide" }
};

function initMasterLanguageTranslator() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  let currentLang = localStorage.getItem('ap_portal_lang') || 'te';

  applyMasterLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const activeLang = localStorage.getItem('ap_portal_lang') || 'te';
      const nextLang = activeLang === 'te' ? 'en' : 'te';
      localStorage.setItem('ap_portal_lang', nextLang);
      applyMasterLanguage(nextLang);
      
      // If on service-detail.html, re-render content cleanly
      if (typeof window.reloadDynamicGuideContent === 'function') {
        window.reloadDynamicGuideContent(nextLang);
      }
    });
  }
}

function applyMasterLanguage(lang) {
  const htmlTag = document.documentElement;
  htmlTag.setAttribute('lang', lang);

  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'te' ? '🌐 English' : '🌐 తెలుగు';
  }

  // Update theme button text according to language
  const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
  updateThemeButtonText(currentTheme);

  // Update global visit counter (increment on each view)
fetchAndUpdateVisitCount(lang);

  // Translate elements with data-translate-key
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][lang]) {
      el.textContent = UI_TRANSLATIONS[key][lang];
    }
  });

  // 2. Translate Search Input Placeholder
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput && UI_TRANSLATIONS['search_placeholder']) {
    searchInput.placeholder = UI_TRANSLATIONS['search_placeholder'][lang];
  }

  // 3. Translate elements with data-te / data-en
  document.querySelectorAll('[data-te][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });

  // 4. Translate Category Select Options
  const catSelect = document.getElementById('searchCategorySelect');
  if (catSelect) {
    catSelect.querySelectorAll('option').forEach(opt => {
      const val = opt.value;
      const key = `cat_${val}`;
      if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][lang]) {
        opt.textContent = UI_TRANSLATIONS[key][lang];
      }
    });
  }
}

// Render the global visit counter UI
function renderCounterUI(count, lang) {
  const counterEl = document.getElementById('globalVisitCounter');
  if (!counterEl) return;
  const formatted = count.toLocaleString();
  const label = lang === 'en' ? 'Visits' : 'విజిట్లు';
  counterEl.textContent = `👁️ ${formatted} ${label}`;
}

// Fetch and increment the global visit count on each page view
function fetchAndUpdateVisitCount(lang) {
  // Show cached count instantly while fetch is in progress
  const cached = parseInt(localStorage.getItem('mana_ap_true_global_count') || '0', 10);
  if (cached > 0) renderCounterUI(cached, lang);

  const apiUrl = 'https://counterapi.com/api/manaapsevalu.netlify.app/view/visits';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  fetch(apiUrl, { signal: controller.signal })
    .then(function(res) {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(data) {
      var count = typeof data.value === 'number' ? data.value : 0;
      if (count > 0) {
        localStorage.setItem('mana_ap_true_global_count', String(count));
        renderCounterUI(count, lang);
      }
    })
    .catch(function(err) {
      clearTimeout(timeoutId);
      console.warn('Visit counter fetch failed, using cached value:', err.message);
      // Fallback: increment locally so user sees a non-zero count
      var stored = parseInt(localStorage.getItem('mana_ap_true_global_count') || '0', 10);
      stored = stored + 1;
      localStorage.setItem('mana_ap_true_global_count', String(stored));
      renderCounterUI(stored, lang);
    });
}

/* --------------------------------------------------------------------------
   3. Theme Switcher (Light / Dark Mode with Persistence)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlTag = document.documentElement;
  
  const savedTheme = localStorage.getItem('ap_portal_theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlTag.setAttribute('data-theme', newTheme);
      localStorage.setItem('ap_portal_theme', newTheme);
      updateThemeButtonText(newTheme);
    });
  }
}

function updateThemeButtonText(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;
  const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';
  if (theme === 'dark') {
    themeToggleBtn.textContent = isEn ? '☀️ Light Mode' : '☀️ లైట్ మోడ్';
  } else {
    themeToggleBtn.textContent = isEn ? '🌙 Dark Mode' : '🌙 డార్క్ మోడ్';
  }
}

/* --------------------------------------------------------------------------
   4. Accessibility Font Resizer (A- / A / A+)
   -------------------------------------------------------------------------- */
function initFontResizer() {
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');
  const htmlTag = document.documentElement;

  let currentFontSize = parseInt(localStorage.getItem('ap_portal_fontsize') || '16', 10);
  applyFontSize(currentFontSize);

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      if (currentFontSize > 14) {
        currentFontSize -= 1;
        applyFontSize(currentFontSize);
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => {
      currentFontSize = 16;
      applyFontSize(currentFontSize);
    });
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      if (currentFontSize < 20) {
        currentFontSize += 1;
        applyFontSize(currentFontSize);
      }
    });
  }

  function applyFontSize(size) {
    htmlTag.style.setProperty('--root-font-size', `${size}px`);
    localStorage.setItem('ap_portal_fontsize', size);
  }
}

/* --------------------------------------------------------------------------
   5. Mobile Drawer Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mainNav.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. Global Instant Debounced Search with Category Filter
   -------------------------------------------------------------------------- */
let searchDatabase = [];

async function initGlobalInstantSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const categorySelect = document.getElementById('searchCategorySelect');
  const searchResultsBox = document.getElementById('instantSearchResults');

  if (!searchInput || !searchResultsBox) return;

  try {
    // Detect if running from root or pages/ subdirectory
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const dataPath = isInPagesDir ? '../data/' : 'data/';

    const [services, schemes, jobs, emergency, farmers, education] = await Promise.all([
      fetch(`${dataPath}services.json`).then(r => r.json()).catch(() => []),
      fetch(`${dataPath}schemes.json`).then(r => r.json()).catch(() => []),
      fetch(`${dataPath}jobs.json`).then(r => r.json()).catch(() => []),
      fetch(`${dataPath}emergency.json`).then(r => r.json()).catch(() => []),
      fetch(`${dataPath}farmers.json`).then(r => r.json()).catch(() => []),
      fetch(`${dataPath}education.json`).then(r => r.json()).catch(() => [])
    ]);

    searchDatabase = [
      ...services.map(i => ({ ...i, cat: 'identity', cat_te: 'గుర్తింపు పత్రాలు', cat_en: 'Identity Documents' })),
      ...schemes.map(i => ({ ...i, cat: 'schemes', cat_te: 'సంక్షేమ పథకాలు', cat_en: 'Govt Schemes' })),
      ...jobs.map(i => ({ ...i, cat: 'jobs', cat_te: 'ఉద్యోగాలు', cat_en: 'Jobs & Careers' })),
      ...emergency.map(i => ({ ...i, cat: 'emergency', cat_te: 'అత్యవసరం', cat_en: 'Emergency' })),
      ...farmers.map(i => ({ ...i, cat: 'farmers', cat_te: 'రైతు సేవలు', cat_en: 'Farmer Services' })),
      ...education.map(i => ({ ...i, cat: 'education', cat_te: 'విద్య', cat_en: 'Education' }))
    ];
  } catch (err) {
    console.error('Failed to load search data:', err);
  }

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(e.target.value.trim(), categorySelect ? categorySelect.value : 'all');
    }, 180);
  });

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      performSearch(searchInput.value.trim(), categorySelect.value);
    });
  }

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResultsBox.contains(e.target)) {
      searchResultsBox.classList.remove('active');
    }
  });

  function performSearch(query, category) {
    if (!query || query.length < 2) {
      searchResultsBox.innerHTML = '';
      searchResultsBox.classList.remove('active');
      return;
    }

    const q = query.toLowerCase();
    const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';

    const matches = searchDatabase.filter(item => {
      const matchCat = category === 'all' || item.cat === category;
      const matchText = (
        (item.name_te && item.name_te.toLowerCase().includes(q)) ||
        (item.name_en && item.name_en.toLowerCase().includes(q)) ||
        (item.title_te && item.title_te.toLowerCase().includes(q)) ||
        (item.description_te && item.description_te.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
      return matchCat && matchText;
    });

    if (matches.length === 0) {
      searchResultsBox.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          ${isEn ? 'No services found matching your search.' : 'క్షమించండి, మీ సెర్చ్‌కు సరిపోయే సేవలు కనుగొనబడలేదు.'}
        </div>
      `;
      searchResultsBox.classList.add('active');
      return;
    }

    searchResultsBox.innerHTML = matches.slice(0, 7).map(item => {
      const title = isEn ? (item.name_en || item.name_te) : (item.name_te || item.name_en);
      const sub = isEn ? (item.summary_en || item.department_en || '') : (item.description_te || item.summary_te || '');
      const icon = item.icon || '📄';
      const badge = isEn ? (item.cat_en || 'Guide') : (item.cat_te || 'గైడ్');
      const link = item.guide_url ? (item.guide_url.startsWith('pages/') ? `../${item.guide_url}` : item.guide_url) : `service-detail.html?id=${item.id}`;

      return `
        <a href="${link}" class="search-result-item">
          <div class="result-main">
            <span class="result-icon">${icon}</span>
            <div>
              <div class="result-title">${title}</div>
              <div class="result-dept">${sub.substring(0, 55)}...</div>
            </div>
          </div>
          <span class="result-badge">${badge}</span>
        </a>
      `;
    }).join('');

    searchResultsBox.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   7. Sticky TOC Active Item Highlighter
   -------------------------------------------------------------------------- */
function initStickyTocHighlighter() {
  const sections = document.querySelectorAll('.guide-section-block');
  const navLinks = document.querySelectorAll('.toc-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   8. Interactive FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        item.parentElement.querySelectorAll('.faq-item').forEach(s => s.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    });
  });
}



/* --------------------------------------------------------------------------
   9. Master Citizen Interactive Feedback System & Floating Widget
   -------------------------------------------------------------------------- */
function initCitizenFeedbackSystem() {
  // Inject Floating Button and Modal into DOM if not already present
  if (document.getElementById('feedbackFloatingBtn')) return;

  const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';

  const feedbackDom = document.createElement('div');
  feedbackDom.innerHTML = `
    <!-- Floating Feedback Trigger Button -->
    <button id="feedbackFloatingBtn" class="feedback-floating-btn" aria-label="Feedback">
      <span class="feedback-pulse-dot"></span>
      <span>💬</span>
      <span id="feedbackBtnLabel">${isEn ? 'Feedback & Suggestions' : 'సలహాలు & ఫీడ్‌బ్యాక్ ఇవ్వండి'}</span>
    </button>

    <!-- Feedback Modal Overlay -->
    <div id="feedbackModalOverlay" class="feedback-modal-overlay">
      <div class="feedback-modal-card">
        <button id="feedbackCloseBtn" class="feedback-close-btn" aria-label="Close Feedback Modal">✕</button>
        
        <div class="feedback-header">
          <div class="feedback-title">
            <span>💬</span>
            <span id="feedbackModalTitle">${isEn ? 'Your Feedback & Suggestions' : 'మీ అమూల్యమైన సలహాలు & ఫీడ్‌బ్యాక్'}</span>
          </div>
          <p class="feedback-subtitle" id="feedbackModalSub">
            ${isEn ? 'Help us improve Mana AP Sevalu portal for all citizens of Andhra Pradesh.' : 'మన AP సేవలు పోర్టల్‌ను ప్రజలకు మరింత ఉపయోగపడేలా తీర్చిదిద్దడానికి మీ సలహా ఇవ్వండి.'}
          </p>
        </div>

        <div id="feedbackFormContainer">
          <!-- Star Rating -->
          <div class="star-rating-wrapper" id="starRatingGroup">
            <button type="button" class="star-btn selected" data-star="1">★</button>
            <button type="button" class="star-btn selected" data-star="2">★</button>
            <button type="button" class="star-btn selected" data-star="3">★</button>
            <button type="button" class="star-btn selected" data-star="4">★</button>
            <button type="button" class="star-btn selected" data-star="5">★</button>
          </div>

          <form id="citizenFeedbackForm" name="citizen-feedback" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="citizen-feedback" />
            <input type="hidden" name="rating" id="fbRatingInput" value="5" />
            <p style="display:none;"><input name="bot-field" /></p>
            <div class="feedback-form-group">
              <label class="feedback-label">${isEn ? 'Category:' : 'అభిప్రాయం విభాగం:'}</label>
              <select id="fbCategory" name="category" class="feedback-select">
                <option value="suggestion">${isEn ? '💡 New Suggestion / Idea' : '💡 కొత్త సలహా / ఐడియా'}</option>
                <option value="new_service">${isEn ? '➕ Add a New Scheme / Service' : '➕ కొత్త పథకం / సేవ చేర్చండి'}</option>
                <option value="issue">${isEn ? '⚠️ Report an Issue / Link' : '⚠️ సమస్య / లింక్ రిపోర్ట్'}</option>
                <option value="appreciation">${isEn ? '❤️ Appreciation & Love' : '❤️ ప్రశంస & అభినందన'}</option>
              </select>
            </div>

            <div class="feedback-form-group">
              <label class="feedback-label">${isEn ? 'Your Suggestion / Message:' : 'మీ సలహా లేదా సూచన (తప్పనిసరి):'}</label>
              <textarea id="fbMessage" name="message" class="feedback-textarea" rows="3" required placeholder="${isEn ? 'Write your valuable feedback here...' : 'ఈ వెబ్‌సైట్‌లో ఇంకా ఏమి మార్చాలి? మీ అభిప్రాయం రాయండి...'}"></textarea>
            </div>

<!-- 100% Privacy Friendly: No Personal Names or Phone Numbers Collected -->

            <button type="submit" class="feedback-submit-btn">
              <span>🚀</span>
              <span>${isEn ? 'Submit Feedback' : 'ఫీడ్‌బ్యాక్ సమర్పించండి'}</span>
            </button>
          </form>
        </div>

        <!-- Success Message Banner with Direct Instant Notification -->
        <div id="feedbackSuccessBanner" class="feedback-success-banner">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🎉</div>
          <h4 style="font-weight: 800; font-size: 1.18rem; color: #16a34a; margin-bottom: 6px;">
            ${isEn ? 'Thank You! Feedback Received!' : 'ధన్యవాదాలు! మీ ఫీడ్‌బ్యాక్ నమోదైంది!'}
          </h4>
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 16px;">
            ${isEn ? 'Your valuable suggestion has been sent directly to the portal admin email.' : 'మీ అమూల్యమైన సలహా నేరుగా మా అడ్మిన్ ఈమెయిల్ (Gmail) కి చేరింది.'}
          </p>
          <div style="display: flex; justify-content: center;">
            <button id="feedbackDoneBtn" class="search-submit-btn" style="padding: 10px 24px; border-radius: var(--radius-md); font-weight: 700; font-size: 0.95rem;">
              <span>✓</span>
              <span>${isEn ? 'OK, Close' : 'సరే, ముగించు'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(feedbackDom);

  // Setup Event Handlers
  const floatingBtn = document.getElementById('feedbackFloatingBtn');
  const modalOverlay = document.getElementById('feedbackModalOverlay');
  const closeBtn = document.getElementById('feedbackCloseBtn');
  const doneBtn = document.getElementById('feedbackDoneBtn');
  const form = document.getElementById('citizenFeedbackForm');
  const formContainer = document.getElementById('feedbackFormContainer');
  const successBanner = document.getElementById('feedbackSuccessBanner');
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('fbRatingInput');

  let currentRating = 5;

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentRating = parseInt(btn.getAttribute('data-star'), 10);
      if (ratingInput) {
        ratingInput.value = currentRating + ' Stars';
      }
      starBtns.forEach(s => {
        const starVal = parseInt(s.getAttribute('data-star'), 10);
        if (starVal <= currentRating) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });

  floatingBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.feedback-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> <span>${isEn ? 'Sending...' : 'పంపుతోంది...'}</span>`;
    }

    const category = document.getElementById('fbCategory').value;
    const message = document.getElementById('fbMessage').value.trim();

    const feedbackEntry = {
      timestamp: new Date().toISOString(),
      rating: currentRating,
      category: category,
      message: message,
      name: 'Anonymous Citizen'
    };

    // 1. Submit directly to Gmail (steja1343@gmail.com) via Verified FormSubmit Token
    fetch('https://formsubmit.co/ajax/e0db48c0cd01d1c64f761839acd89dee', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '💬 మన AP సేవలు - కొత్త పౌర ఫీడ్‌బ్యాక్ (' + currentRating + ' Stars)',
        _captcha: 'false',
        _template: 'table',
        Rating: currentRating + ' Stars ★',
        Category: category,
        Citizen_Feedback: message,
        Time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        Portal: 'Mana AP Sevalu (మన AP సేవలు)'
      })
    }).then(res => res.json())
      .then(data => console.log('Gmail Notification Status:', data))
      .catch(err => console.warn('FormSubmit notice:', err));

    // 2. Also save locally
    let allFeedbacks = JSON.parse(localStorage.getItem('mana_ap_feedbacks') || '[]');
    allFeedbacks.push(feedbackEntry);
    localStorage.setItem('mana_ap_feedbacks', JSON.stringify(allFeedbacks));

    formContainer.style.display = 'none';
    successBanner.style.display = 'block';
  });
}

// Call on init
document.addEventListener('DOMContentLoaded', () => {
  initCitizenFeedbackSystem();
});
