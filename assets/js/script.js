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
   100% Deep DOM Coverage for Full-Page Language Switch
   -------------------------------------------------------------------------- */

const DEEP_TRANSLATION_MAP = [
  // Brand & Nav
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

  // Ticker & Emergency Speed Dials
  ["తాజా ప్రకటనలు", "Live Updates"],
  ["నూతన బియ్యం కార్డుల ఈ-కేవైసీ సచివాలయాల్లో అందుబాటులో ఉంది • గృహ జ్యోతి 200 యూనిట్లు ఉచిత విద్యుత్ జీరో బిల్లుల పరిశీలన!", "New Rice Card eKYC is active in Sachivalayams • Gruha Jyothi 200 Units Free Electricity Zero Bill Verification Active!"],
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
  ["అత్యవసర హెల్ప్‌లైన్లు", "Emergency Helplines"],
  ["పోర్టల్ నిబంధనలు", "Portal Terms"],

  // Common Actions & Badges
  ["పూర్తి గైడ్ చదవండి →", "Read Full Guide →"],
  ["గైడ్ వీక్షించండి →", "View Guide →"],
  ["🏛️ పోర్టల్ ↗", "🏛️ Official Portal ↗"],
  ["పూర్తి వివరాలు ↗", "Full Details ↗"],
  ["స్పాన్సర్డ్ / Advertisement", "Sponsored / Advertisement"],
  ["మీ మొబైల్‌లోనే తాజా ప్రభుత్వ అప్‌డేట్స్ & జీవోలు పొందండి", "Get Latest Govt Updates & GOs Directly on Your Mobile"],
  ["మన AP సేవలు అధికారిక ఉచిత వాట్సాప్ ఛానెల్‌లో చేరి తక్షణ అలర్ట్స్ అందుకోండి.", "Join our official updates channel and receive instant alerts."],
  ["ఉచితంగా చేరండి", "Join Free"],
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

  // Smart Calculator
  ["స్మార్ట్ అర్హత కాలిక్యులేటర్", "Smart Eligibility Calculator"],
  ["మీ వయస్సు, వృత్తి, భూమి మరియు ఆదాయ వివరాలను ఎంచుకుని మీకు ఏయే ప్రభుత్వ పథకాలు వర్తిస్తాయో తక్షణమే లెక్కించండి.", "Select your age, occupation, land, and income to instantly find which government schemes apply to you."],
  ["వయస్సు వర్గం ఎంచుకోండి", "Select Age Group"],
  ["18 నుండి 35 సంవత్సరాలు (యువత / ఉద్యోగార్థులు)", "18 to 35 Years (Youth / Job Aspirants)"],
  ["35 నుండి 60 సంవత్సరాలు (కుటుంబ పెద్దలు / రైతులు)", "35 to 60 Years (Family Heads / Farmers)"],
  ["60 సంవత్సరాలు పైబడిన వారు (సీనియర్ సిటిజన్లు)", "Above 60 Years (Senior Citizens)"],
  ["వృత్తి / విద్యార్హత", "Occupation / Education"],
  ["రైతు / కౌలు రైతు (వ్యవసాయం)", "Farmer / Tenant Farmer (Agriculture)"],
  ["నిరుద్యోగి / గ్రాడ్యుయేట్ (ఉద్యోగాన్వేషణ)", "Unemployed / Graduate (Job Aspirant)"],
  ["విద్యార్థి (పాఠశాల / కళాశాల)", "Student (School / College)"],
  ["మహిళా కుటుంబ పెద్ద / స్వయం సహాయక సంఘం", "Woman Family Head / SHG Member"],
  ["ఇతర వర్గం / సాధారణ పౌరుడు", "Other / General Citizen"],
  ["వ్యవసాయ భూమి (ఎకరాలు)", "Agricultural Land (Acres)"],
  ["భూమి లేదు (భూమిలేని నిరుపేద / పట్టణ పౌరుడు)", "No Land (Landless / Urban Citizen)"],
  ["5 ఎకరాల లోపు (సన్నకారు రైతు)", "Below 5 Acres (Small Farmer)"],
  ["5 ఎకరాలు పైబడి", "Above 5 Acres"],
  ["వార్షిక కుటుంబ ఆదాయం", "Annual Family Income"],
  ["రూ. 2.5 లక్షల లోపు (బియ్యం కార్డు అర్హులు)", "Below Rs. 2.5 Lakhs (Rice Card Eligible)"],
  ["రూ. 2.5 లక్షల నుండి 5 లక్షలు", "Rs. 2.5 Lakhs to 5 Lakhs"],
  ["రూ. 5 లక్షలు పైబడి", "Above Rs. 5 Lakhs"],
  ["అర్హతగల పథకాలను లెక్కించండి", "Calculate Eligible Schemes"],

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
  ["మొత్తం సందర్శనలు:", "Total Citizen Visits:"],
  ["గమనిక: ఈ పోర్టల్ పౌరులకు అవగాహన కల్పించే స్వతంత్ర డిజిటల్ గైడ్. ప్రతి పేజీ చివర సంబంధిత అధికారిక ప్రభుత్వ మరియు ప్రత్యామ్నాయ సర్వర్ లింకులు అందించబడతాయి.", "Note: This portal is an independent digital knowledge guide for citizen awareness. Official government and mirror server links are provided at the end of every guide."]
];

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

  // Update theme button text
  const currentTheme = htmlTag.getAttribute('data-theme') || 'light';
  updateThemeButtonText(currentTheme);

  // Update global visit counter
  fetchAndUpdateVisitCount(lang);

  // 1. Recursive Deep DOM Text Node Translation
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      if (!text || text.trim() === '') return;

      if (node._originalTe === undefined) {
        node._originalTe = text;
      }

      if (lang === 'en') {
        let transformed = node._originalTe;
        DEEP_TRANSLATION_MAP.forEach(([te, en]) => {
          if (transformed.includes(te)) {
            transformed = transformed.split(te).join(en);
          }
        });
        node.nodeValue = transformed;
      } else {
        node.nodeValue = node._originalTe;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) return;
      
      // Translate input placeholders
      if (node.tagName === 'INPUT' && node.placeholder) {
        if (!node._originalTePlaceholder) node._originalTePlaceholder = node.placeholder;
        if (lang === 'en') {
          let ph = node._originalTePlaceholder;
          DEEP_TRANSLATION_MAP.forEach(([te, en]) => {
            if (ph.includes(te)) ph = ph.split(te).join(en);
          });
          node.placeholder = ph;
        } else {
          node.placeholder = node._originalTePlaceholder;
        }
      }

      // Translate select options
      if (node.tagName === 'OPTION') {
        if (!node._originalTeText) node._originalTeText = node.textContent;
        if (lang === 'en') {
          let optText = node._originalTeText;
          DEEP_TRANSLATION_MAP.forEach(([te, en]) => {
            if (optText.includes(te)) optText = optText.split(te).join(en);
          });
          node.textContent = optText;
        } else {
          node.textContent = node._originalTeText;
        }
      }

      node.childNodes.forEach(child => translateNode(child));
    }
  }

  translateNode(document.body);
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


// --------------------------------------------------------------------------
// 7. Back to Top Button & Keyboard '/' Shortcut
// --------------------------------------------------------------------------
function initBackToTopAndKeyboardShortcuts() {
  // Create Back to Top Button
  if (!document.getElementById('backToTopBtn')) {
    const bttBtn = document.createElement('button');
    bttBtn.id = 'backToTopBtn';
    bttBtn.className = 'back-to-top-btn';
    bttBtn.setAttribute('aria-label', 'Back to Top');
    bttBtn.innerHTML = '⬆️';
    document.body.appendChild(bttBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    });

    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Keyboard '/' shortcut for search
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

  // Setup WhatsApp share button on service-detail page
  const shareBtn = document.getElementById('shareGuideWhatsAppBtn');
  if (shareBtn) {
    const title = document.getElementById('guideDetailTitle') ? document.getElementById('guideDetailTitle').textContent : 'మన AP సేవలు గైడ్';
    const text = encodeURIComponent('🏛️ ' + title + ' పూర్తి వివరాలు & దరఖాస్తు విధానం ఇక్కడ చూడండి:\n👉 ' + window.location.href);
    shareBtn.href = 'https://api.whatsapp.com/send?text=' + text;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initBackToTopAndKeyboardShortcuts();
});
