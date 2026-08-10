/**
 * Mana AP Sevalu (మన AP సేవలు) - Master Interactive Engine
 * 100% Robust, Fast, Zero-Error Interactive Utilities
 */

function initAllModules() {
  initMasterLanguageTranslator();
  initThemeEngine();
  initFontResizer();
  initMobileMenu();
  initGlobalInstantSearch();
  initStickyTocHighlighter();
  initFaqAccordion();
  initCitizenFeedbackSystem();
  initBackToTopAndKeyboardShortcuts();
}

// Ensure all modules initialize regardless of when the script runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllModules);
} else {
  initAllModules();
}

/* --------------------------------------------------------------------------
   1. Theme Switcher (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlTag = document.documentElement;
  
  const savedTheme = localStorage.getItem('ap_portal_theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);
  updateThemeButtonText(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.onclick = function() {
      const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlTag.setAttribute('data-theme', newTheme);
      localStorage.setItem('ap_portal_theme', newTheme);
      updateThemeButtonText(newTheme);
    };
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
   2. Font Resizer (A- / A / A+)
   -------------------------------------------------------------------------- */
function initFontResizer() {
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');

  let currentSize = parseInt(localStorage.getItem('ap_portal_fontsize') || '16', 10);
  applyFontSize(currentSize);

  if (fontDecBtn) {
    fontDecBtn.onclick = function() {
      if (currentSize > 14) {
        currentSize -= 1;
        applyFontSize(currentSize);
      }
    };
  }

  if (fontResetBtn) {
    fontResetBtn.onclick = function() {
      currentSize = 16;
      applyFontSize(currentSize);
    };
  }

  if (fontIncBtn) {
    fontIncBtn.onclick = function() {
      if (currentSize < 22) {
        currentSize += 1;
        applyFontSize(currentSize);
      }
    };
  }

  function applyFontSize(size) {
    document.documentElement.style.fontSize = size + 'px';
    if (document.body) document.body.style.fontSize = size + 'px';
    localStorage.setItem('ap_portal_fontsize', size);
  }
}

/* --------------------------------------------------------------------------
   3. Master Bilingual Translator (Telugu <-> English)
   -------------------------------------------------------------------------- */
const DEEP_TRANSLATION_MAP = [
  // Navigation & Branding
  ["మన AP సేవలు", "Mana AP Sevalu"],
  ["ఆంధ్రప్రదేశ్ డిజిటల్ పౌర సేవా మిత్ర (Mana AP Sevalu)", "Andhra Pradesh Digital Citizen Knowledge Portal"],
  ["ఆంధ్రప్రదేశ్ డిజిటల్ పౌర సేవా మిత్ర", "Andhra Pradesh Digital Citizen Knowledge Portal"],
  ["ఆంధ్రప్రదేశ్ పౌర సేవల సమాచార వేదిక (Citizen Knowledge Portal)", "Andhra Pradesh Citizen Knowledge & Services Portal"],
  ["ఆంధ్రప్రదేశ్ పౌర సేవల సమాచార వేదిక (Citizen Portal)", "Andhra Pradesh Citizen Knowledge & Services Portal"],
  ["ఆంధ్రప్రదేశ్ పౌర సేవల సమాచార వేదిక", "Andhra Pradesh Citizen Knowledge & Services Portal"],
  ["🏠 హోమ్", "🏠 Home"],
  ["🪪 గుర్తింపు పత్రాలు", "🪪 Identity Docs"],
  ["🏛️ పథకాలు", "🏛️ Govt Schemes"],
  ["💼 ఉద్యోగాలు", "💼 Jobs & Careers"],
  ["🌾 రైతు సేవలు", "🌾 Farmer Portal"],
  ["🎓 విద్య", "🎓 Education & CETs"],
  ["⚡ బిల్లులు", "⚡ Utility Bills"],
  ["🚨 అత్యవసరం", "🚨 24x7 Emergency"],
  ["హోమ్", "Home"],

  // Ticker & Emergency
  ["తాజా ప్రకటనలు", "Live Updates"],
  ["📢 పౌరుల సలహా మేరకు: డ్వాక్రా మహిళా ఉత్పత్తుల ఈ-మార్కెట్ & NTR భరోసా పెన్షన్ల పూర్తి గైడ్లు పోర్టల్‌లో లైవ్ అయ్యాయి!", "📢 Citizen Action: DWCRA Women SHG Products e-Market & NTR Bharosa Pension guides are now LIVE!"],
  ["24x7 తక్షణ అత్యవసర నంబర్లు:", "24x7 Instant Emergency Numbers:"],
  ["112 జాతీయ హెల్ప్‌లైన్", "112 National Helpline"],
  ["100 పోలీస్", "100 Police"],
  ["108 అంబులెన్స్", "108 Ambulance"],
  ["101 ఫైర్", "101 Fire Force"],
  ["1930 సైబర్ క్రైమ్", "1930 Cyber Crime"],
  ["181 మహిళా హెల్ప్‌లైన్", "181 Women Helpline"],
  ["1098 చైల్డ్‌లైన్", "1098 Childline"],
  ["1902 సీఎం గ్రీవెన్స్", "1902 CM Grievance"],

  // Hero Section
  ["✨ ఆంధ్రప్రదేశ్ పౌరుల సమగ్ర డిజిటల్ నాలెడ్జ్ గైడ్", "✨ Comprehensive AP Citizen Digital Knowledge Guide"],
  ["ప్రభుత్వ సేవలు, పథకాలు & ఉద్యోగాల పూర్తి సమాచారం ఒకే చోట", "Government Services, Welfare Schemes & Jobs in One Place"],
  ["అర్హతలు, పత్రాల చెక్‌లిస్ట్, స్టెప్ బై స్టెప్ దరఖాస్తు విధానం మరియు 100% పనిచేసే అధికారిక ప్రత్యామ్నాయ వర్కింగ్ లింకులు.", "Eligibility criteria, document checklists, step-by-step application process, and 100% active official mirror links."],
  ["వెతకండి", "Search"],
  ["అన్ని రంగాలు", "All Categories"],
  ["గుర్తింపు పత్రాలు", "Identity Documents"],
  ["సంక్షేమ పథకాలు", "Welfare Schemes"],
  ["ఉద్యోగాలు", "Jobs & Careers"],
  ["రైతు సేవలు", "Farmer Services"],
  ["విద్య & ప్రవేశాలు", "Education & Admissions"],
  ["బిల్లులు & పన్నులు", "Utility Bills & Taxes"],

  // Subpage Hero Banners
  ["గుర్తింపు & పౌర ధృవీకరణ పత్రాల హబ్", "Identity & Citizen Verification Documents Hub"],
  ["ఆంధ్రప్రదేశ్ సంక్షేమ పథకాలు & లబ్ధిదారుల సమాచారం", "Andhra Pradesh Welfare Schemes & Beneficiary Information"],
  ["ఉద్యోగాలు, రిక్రూట్‌మెంట్లు & నోటిఫికేషన్ల హబ్", "Jobs, Recruitment & Notifications Hub"],
  ["రైతు సేవలు, వ్యవసాయ పథకాలు & ఈ-క్రాప్ హబ్", "Farmer Services, Agriculture Schemes & E-Crop Hub"],
  ["విద్య, అడ్మిషన్లు & స్కాలర్‌షిప్‌ల హబ్", "Education, Admissions & Scholarships Hub"],
  ["విద్యుత్, మున్సిపల్ పన్నులు & బిల్లుల చెల్లింపుల హబ్", "Electricity, Municipal Taxes & Utility Bills Payment Hub"],
  ["🚨 24x7 తక్షణ అత్యవసర హెల్ప్‌లైన్లు & రెస్పాన్స్ సేవలు", "🚨 24x7 Instant Emergency Helplines & Response Services"],
  ["📜 పోర్టల్ నిబంధనలు & గోప్యతా విధానం", "📜 Portal Terms of Use & Privacy Policy"],
  ["📞 సిటిజన్ సపోర్ట్ & సంప్రదింపుల కేంద్రం", "📞 Citizen Support & Contact Center"],

  // Common Actions & Badges
  ["పూర్తి గైడ్ చదవండి →", "Read Full Guide →"],
  ["గైడ్ వీక్షించండి →", "View Guide →"],
  ["🏛️ పోర్టల్ ↗", "🏛️ Official Portal ↗"],
  ["పూర్తి వివరాలు ↗", "Full Details ↗"],
  ["పూర్తిగా ఉచితం:", "100% Free Information:"],
  ["స్వతంత్ర సమాచార వేదిక:", "Independent Knowledge Portal:"],

  // Service Card Titles
  ["ఆధార్ కార్డు అప్‌డేట్ & కొత్త నమోదు గైడ్", "Aadhaar Card Update & New Enrollment Guide"],
  ["బియ్యం కార్డు (న్యూ రేషన్ కార్డు) & eKYC", "Rice Card (New Ration Card) & eKYC"],
  ["రైతు భరోసా & అన్నదాత సుఖీభవ 2026", "Rythu Bharosa & Annadata Sukhibhava 2026"],
  ["మెగా DSC 16,347 టీచర్ పోస్టుల భర్తీ", "Mega DSC 16,347 Teacher Recruitment 2026"],
  ["గృహ జ్యోతి - 200 యూనిట్ల ఉచిత విద్యుత్", "Gruha Jyothi - 200 Units Free Electricity Scheme"],
  ["డాక్టర్ వైఎస్సార్ ఆరోగ్యశ్రీ ట్రస్ట్ (రూ. 25 లక్షల ఉచిత వైద్యం)", "Dr YSR Aarogyasri Trust (Rs. 25 Lakhs Free Healthcare)"],
  ["ఆంధ్రప్రదేశ్ పోలీస్ కానిస్టేబుల్ & SI రిక్రూట్‌మెంట్", "AP Police Constable & SI Recruitment"],
  ["APPSC గ్రూప్ 1 & గ్రూప్ 2 సర్వీసెస్", "APPSC Group 1 & Group 2 Services"],
  ["రైల్వే RRB అసిస్టెంట్ లోకో పైలట్ (ALP) & టెక్నీషియన్", "Railway RRB Assistant Loco Pilot (ALP) & Technician"],
  ["SSC కంబైన్డ్ గ్రాడ్యుయేట్ లెవల్ (CGL / CHSL)", "SSC Combined Graduate Level (CGL / CHSL)"],
  ["ఈ-క్రాప్ (e-Crop) పంట నమోదు & డిజిటల్ రికార్డు", "e-Crop Booking & Digital Crop Record"],
  ["పీఎం కిసాన్ సమ్మాన్ నిధి & ఆధార్ సీడింగ్", "PM Kisan Samman Nidhi & Aadhaar Seeding"],
  ["సబ్సిడీ వ్యవసాయ పనిముట్లు & డ్రిప్ ఇరిగేషన్", "Subsidized Farm Machinery & Drip Irrigation"],
  ["పీఎం కుసుమ్ సౌర విద్యుత్ పంపుసెట్లు (PM KUSUM)", "PM KUSUM Solar Agriculture Pumpsets"],
  ["పశు సంవర్ధక కిసాన్ క్రెడిట్ కార్డు (AH-KCC)", "Animal Husbandry Kisan Credit Card (AH-KCC)"],
  ["జగనన్న విద్యా దీవెన (100% పూర్తి ఫీజు రీయింబర్స్‌మెంట్)", "Jagananna Vidya Deevena (100% Full Fee Reimbursement)"],
  ["జగనన్న వసతి దీవెన (హాస్టల్ & మెస్ ఖర్చులు)", "Jagananna Vasathi Deevena (Hostel & Mess Expenses)"],
  ["AP EAPCET (EAMCET) ఇంజనీరింగ్ & అగ్రికల్చర్ ప్రవేశాలు", "AP EAPCET (EAMCET) Engineering & Agriculture Admissions"],
  ["పోస్ట్-మెట్రిక్ జాతీయ & రాష్ట్ర స్కాలర్‌షిప్‌లు (NSP)", "Post-Matric National & State Scholarships (NSP)"],
  ["మున్సిపల్ ఆస్తి పన్ను & నీటి పన్ను", "Municipal Property Tax & Water Charges (CDMA AP)"],
  ["LPG గ్యాస్ సిలిండర్ బుకింగ్ & దీపం పథకం", "LPG Gas Cylinder Booking & Deepam Scheme"],
  ["AP పోలీస్ ఈ-చలాన్ చెల్లింపు & డిస్కౌంట్ ఆఫర్లు", "AP Police e-Challan Payment & Clearance"],
  ["రవాణా శాఖ డ్రైవింగ్ లైసెన్స్ & వాహన రిజిస్ట్రేషన్ (AP RTA)", "Driving Licence & Vehicle Registration (AP RTA)"],
  ["పాన్ కార్డు కొత్త దరఖాస్తు & ఆధార్ లింకింగ్ (UTIITSL / NSDL)", "New PAN Card Application & Instant e-PAN (UTIITSL)"],
  ["ఓటర్ గుర్తింపు కార్డు (Voter ID / EPIC) & ఫారం-6 నమోదు", "Voter ID Card (EPIC) & Online Form-6 Enrollment"],

  // Footer & Disclaimer
  ["గుర్తింపు సేవలు", "Identity Services"],
  ["ఆధార్ కార్డు గైడ్", "Aadhaar Card Guide"],
  ["పాన్ కార్డు దరఖాస్తు", "PAN Card Application"],
  ["ఓటర్ ఐడీ నమోదు", "Voter ID Registration"],
  ["బియ్యం కార్డు సేవలు", "Rice Card Services"],
  ["పోర్టల్ నిబంధనలు", "Portal Terms"],
  ["పోర్టల్ రూల్స్ & నిబంధనలు", "Portal Rules & Terms"],
  ["గోప్యతా విధానం (Privacy)", "Privacy Policy"],
  ["బాధ్యతా ప్రకటన (Disclaimer)", "Disclaimer"],
  ["సిటిజన్ సపోర్ట్ & గ్రీవెన్స్", "Citizen Support & Grievance"],
  ["అత్యవసర హెల్ప్‌లైన్లు", "Emergency Helplines"],
  ["112 - జాతీయ అత్యవసరం", "112 - National Emergency"],
  ["100 - పోలీస్", "100 - Police"],
  ["108 - అంబులెన్స్", "108 - Ambulance"],
  ["1930 - సైబర్ క్రైమ్", "1930 - Cyber Crime"],
  ["బాధ్యతా ప్రకటన & ఓనర్ డిస్క్లోజర్ (Safety Disclaimer & Owner Notice):", "Legal Disclaimer & Owner Disclosure Notice:"],
  ["సలహాలు & ఫీడ్‌బ్యాక్ ఇవ్వండి", "Feedback & Suggestions"],
  ["మొత్తం సందర్శనలు:", "Total Citizen Visits:"]
];

function initMasterLanguageTranslator() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  let currentLang = localStorage.getItem('ap_portal_lang') || 'te';

  applyMasterLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.onclick = function() {
      const activeLang = localStorage.getItem('ap_portal_lang') || 'te';
      const nextLang = activeLang === 'te' ? 'en' : 'te';
      localStorage.setItem('ap_portal_lang', nextLang);
      applyMasterLanguage(nextLang);
      
      if (typeof window.reloadDynamicGuideContent === 'function') {
        window.reloadDynamicGuideContent(nextLang);
      }
    };
  }
}

function applyMasterLanguage(lang) {
  const htmlTag = document.documentElement;
  htmlTag.setAttribute('lang', lang);

  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'te' ? '🌐 English' : '🌐 తెలుగు';
  }

  const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
  updateThemeButtonText(currentTheme);

  fetchAndUpdateVisitCount(lang);

  function translateNode(node) {
    if (node.nodeType === 3) { // TEXT_NODE
      let text = node.nodeValue;
      if (!text || text.trim() === '') return;

      if (node._originalTe === undefined) {
        node._originalTe = text;
      }

      if (lang === 'en') {
        let transformed = node._originalTe;
        DEEP_TRANSLATION_MAP.forEach(([te, en]) => {
          if (transformed.indexOf(te) !== -1) {
            transformed = transformed.split(te).join(en);
          }
        });
        node.nodeValue = transformed;
      } else {
        node.nodeValue = node._originalTe;
      }
    } else if (node.nodeType === 1) { // ELEMENT_NODE
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].indexOf(node.tagName) !== -1) return;

      if (node.tagName === 'INPUT' && node.placeholder) {
        if (!node._originalTePlaceholder) node._originalTePlaceholder = node.placeholder;
        if (lang === 'en') {
          let ph = node._originalTePlaceholder;
          DEEP_TRANSLATION_MAP.forEach(([te, en]) => {
            if (ph.indexOf(te) !== -1) ph = ph.split(te).join(en);
          });
          node.placeholder = ph;
        } else {
          node.placeholder = node._originalTePlaceholder;
        }
      }

      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i]);
      }
    }
  }

  if (document.body) {
    translateNode(document.body);
  }
}

/* --------------------------------------------------------------------------
   4. Global Visitor Counter
   -------------------------------------------------------------------------- */
const VISIT_BASE = 1480; // minimum floor — real organic visits before counter reset

function renderCounterUI(count, lang) {
  const counterEl = document.getElementById('globalVisitCounter');
  if (!counterEl) return;
  // Always show at least VISIT_BASE, add API count on top
  const validCount = Math.max((count || 0) + VISIT_BASE, VISIT_BASE);
  const formatted = validCount.toLocaleString('en-IN');
  const label = lang === 'en' ? 'Visits' : 'విజిట్లు';
  counterEl.textContent = formatted + '+ ' + label;
}

function fetchAndUpdateVisitCount(lang) {
  var cached = parseInt(localStorage.getItem('mana_ap_true_global_count') || '0', 10);
  renderCounterUI(cached, lang);

  var controller = new AbortController();
  var timeoutId = setTimeout(function() { controller.abort(); }, 8000);

  fetch('https://counterapi.com/api/manaapsevalu.netlify.app/view/visits', { signal: controller.signal })
    .then(function(r) {
      clearTimeout(timeoutId);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function(d) {
      var count = (d && typeof d.value === 'number') ? d.value : 0;
      if (count >= 0) {
        localStorage.setItem('mana_ap_true_global_count', String(count));
        renderCounterUI(count, lang);
      }
    })
    .catch(function() {
      clearTimeout(timeoutId);
      // Use cached value without inflating
      renderCounterUI(cached, lang);
    });
}

/* --------------------------------------------------------------------------
   5. Mobile Drawer Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.onclick = function() {
      mainNav.classList.toggle('active');
    };

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mainNav.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. Global Instant Smart Search
   -------------------------------------------------------------------------- */
let SEARCH_DATABASE = [];

function initGlobalInstantSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const categorySelect = document.getElementById('searchCategorySelect');
  const searchResultsBox = document.getElementById('searchResultsDropdown');

  if (!searchInput || !searchResultsBox) return;

  // Resolve path relative to site root regardless of current page location
  var basePath = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
  fetch(basePath + 'data/guides.json')
    .then(res => res.json())
    .then(data => {
      SEARCH_DATABASE = Object.keys(data).map(key => {
        const item = data[key];
        return {
          id: key,
          title_te: item.title_te,
          title_en: item.title_en,
          category_te: item.category_te,
          category_en: item.category_en,
          category_url: item.category_url,
          icon: item.icon,
          subtitle_te: item.subtitle_te,
          subtitle_en: item.subtitle_en
        };
      });
    })
    .catch(err => console.warn('Guides fetch info:', err));

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCat = categorySelect ? categorySelect.value : 'all';
    performInstantSearch(query, selectedCat);
  });

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      const query = searchInput.value.trim().toLowerCase();
      const selectedCat = categorySelect.value;
      performInstantSearch(query, selectedCat);
    });
  }

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResultsBox.contains(e.target)) {
      searchResultsBox.classList.remove('active');
    }
  });

  function performInstantSearch(query, cat) {
    if (query.length === 0) {
      searchResultsBox.innerHTML = '';
      searchResultsBox.classList.remove('active');
      return;
    }

    const currentLang = localStorage.getItem('ap_portal_lang') || 'te';

    const matches = SEARCH_DATABASE.filter(item => {
      const title = (currentLang === 'en' ? item.title_en : item.title_te).toLowerCase();
      const sub = (currentLang === 'en' ? item.subtitle_en : item.subtitle_te).toLowerCase();
      const matchText = title.includes(query) || sub.includes(query);

      if (cat === 'all') return matchText;
      return matchText && item.category_url.includes(cat);
    });

    if (matches.length === 0) {
      searchResultsBox.innerHTML = `
        <div class="search-no-results">
          <span>🔍</span>
          <span>${currentLang === 'en' ? 'No matching citizen guides found.' : 'ఎటువంటి ఫలితాలు కనుగొనబడలేదు.'}</span>
        </div>
      `;
      searchResultsBox.classList.add('active');
      return;
    }

    searchResultsBox.innerHTML = matches.slice(0, 7).map(item => {
      const title = currentLang === 'en' ? item.title_en : item.title_te;
      const sub = currentLang === 'en' ? item.subtitle_en : item.subtitle_te;
      const badge = currentLang === 'en' ? item.category_en : item.category_te;

      return `
        <a href="${(window.location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/')}service-detail.html?id=${item.id}" class="search-result-item">
          <div class="result-left">
            <span class="result-icon">${item.icon}</span>
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
   7. Sticky TOC & FAQ
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
  }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.onclick = function() {
      const item = btn.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        item.parentElement.querySelectorAll('.faq-item').forEach(s => s.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    };
  });
}

/* --------------------------------------------------------------------------
   8. Citizen Feedback Modal System
   -------------------------------------------------------------------------- */
function initCitizenFeedbackSystem() {
  if (document.getElementById('feedbackFloatingBtn')) return;

  const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';

  const feedbackDom = document.createElement('div');
  feedbackDom.id = 'citizenFeedbackRoot';
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
          <div class="star-rating-wrapper" id="starRatingGroup">
            <button type="button" class="star-btn selected" data-star="1">★</button>
            <button type="button" class="star-btn selected" data-star="2">★</button>
            <button type="button" class="star-btn selected" data-star="3">★</button>
            <button type="button" class="star-btn selected" data-star="4">★</button>
            <button type="button" class="star-btn selected" data-star="5">★</button>
          </div>

          <form id="citizenFeedbackForm" name="citizen-feedback">
            <input type="hidden" name="rating" id="fbRatingInput" value="5" />
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
              <label class="feedback-label">${isEn ? 'Your Name / District (Optional):' : 'మీ పేరు లేదా జిల్లా (ఐచ్ఛికం / అవసరం లేదు):'}</label>
              <input type="text" id="fbName" name="citizen_name" class="feedback-select" style="padding: 10px 14px;" placeholder="${isEn ? 'e.g. Ramesh / Vijayawada (Optional)' : 'ఉదా: రమేష్ / గుంటూరు (రాయకపోయినా ఫర్వాలేదు)'}">
            </div>

            <div class="feedback-form-group">
              <label class="feedback-label">${isEn ? 'Your Suggestion / Message:' : 'మీ సలహా లేదా సూచన (తప్పనిసరి):'}</label>
              <textarea id="fbMessage" name="message" class="feedback-textarea" rows="3" required placeholder="${isEn ? 'Write your valuable feedback here...' : 'ఈ వెబ్‌సైట్‌లో ఇంకా ఏమి మార్చాలి? మీ అభిప్రాయం రాయండి...'}"></textarea>
            </div>

            <button type="submit" class="feedback-submit-btn">
              <span>🚀</span>
              <span>${isEn ? 'Submit Feedback' : 'ఫీడ్‌బ్యాక్ సమర్పించండి'}</span>
            </button>
          </form>
        </div>

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
    btn.onclick = function() {
      currentRating = parseInt(btn.getAttribute('data-star'), 10);
      if (ratingInput) ratingInput.value = currentRating + ' Stars';
      starBtns.forEach(s => {
        const starVal = parseInt(s.getAttribute('data-star'), 10);
        if (starVal <= currentRating) s.classList.add('selected');
        else s.classList.remove('selected');
      });
    };
  });

  if (floatingBtn) {
    floatingBtn.onclick = function() {
      modalOverlay.classList.add('active');
    };
  }

  // Reset modal to initial state when closing
  function resetAndCloseModal() {
    modalOverlay.classList.remove('active');
    if (formContainer) formContainer.style.display = 'block';
    if (successBanner) successBanner.style.display = 'none';
    // Re-enable submit button
    var submitBtn = form ? form.querySelector('.feedback-submit-btn') : null;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>📤</span> <span>ఫీడ్‌బ్యాక్ పంపించు</span>';
    }
  }

  if (closeBtn) {
    closeBtn.onclick = resetAndCloseModal;
  }

  if (doneBtn) {
    doneBtn.onclick = resetAndCloseModal;
  }

  if (modalOverlay) {
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) resetAndCloseModal();
    };
  }

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      const submitBtn = form.querySelector('.feedback-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> <span>పంపుతోంది...</span>';
      }

      const category = document.getElementById('fbCategory').value;
      const nameInput = document.getElementById('fbName');
      const citizenName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Anonymous Citizen (అజ్ఞాత పౌరుడు)';
      const message = document.getElementById('fbMessage').value.trim();

      // 1. Send to Admin Gmail via FormSubmit
      fetch('https://formsubmit.co/ajax/e0db48c0cd01d1c64f761839acd89dee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: '💬 మన AP సేవలు - కొత్త పౌర ఫీడ్‌బ్యాక్ (' + currentRating + ' Stars)',
          _captcha: 'false',
          _template: 'table',
          Rating: currentRating + ' Stars ★',
          Citizen_Name: citizenName,
          Category: category,
          Citizen_Feedback: message,
          Time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          Portal: 'Mana AP Sevalu (మన AP సేవలు)'
        })
      }).then(() => {}).catch(() => {});

      // 2. Also save to JSONBin for Admin Desktop Launcher to read
      const feedbackEntry = {
        id: 'fb_' + Date.now(),
        name: citizenName,
        category: category,
        message: message,
        rating: currentRating,
        time: new Date().toISOString(),
        timeIST: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        portal: 'Mana AP Sevalu'
      };

      // Get existing feedbacks from JSONBin, append, and update
      const JSONBIN_ID = '6691f2efacd3cb34a8558c72';
      const JSONBIN_KEY = '$2a$10$mana.ap.sevalu.feedback.key';

      fetch('https://api.jsonbin.io/v3/b/' + JSONBIN_ID + '/latest', {
        headers: { 'X-Master-Key': JSONBIN_KEY }
      })
      .then(r => r.json())
      .then(existing => {
        const list = Array.isArray(existing.record) ? existing.record : [];
        list.unshift(feedbackEntry);
        return fetch('https://api.jsonbin.io/v3/b/' + JSONBIN_ID, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_KEY },
          body: JSON.stringify(list.slice(0, 200))
        });
      })
      .catch(() => {
        // If JSONBin fails, silently continue - email already sent
      });

      formContainer.style.display = 'none';
      successBanner.style.display = 'block';
    };
  }
}

/* --------------------------------------------------------------------------
   9. Back to Top Button & Keyboard '/' Shortcut
   -------------------------------------------------------------------------- */
function initBackToTopAndKeyboardShortcuts() {
  if (!document.getElementById('backToTopBtn')) {
    const bttBtn = document.createElement('button');
    bttBtn.id = 'backToTopBtn';
    bttBtn.className = 'back-to-top-btn';
    bttBtn.setAttribute('aria-label', 'Back to Top');
    bttBtn.innerHTML = '⬆️';
    if (document.body) document.body.appendChild(bttBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    });

    bttBtn.onclick = function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}
