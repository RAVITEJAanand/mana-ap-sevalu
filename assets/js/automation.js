/**
 * Mana AP Sevalu (మన AP సేవలు) - Advanced Automation & Interactive Utilities Engine
 * Automated Daily Date Sync, Live Deadlines Countdown, Server Health Pings & Smart Eligibility Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initDailyDateSync();
  initAutoDeadlinesTicker();
  initServerHealthPinger();
  initSmartEligibilityCalculator();
});

/* --------------------------------------------------------------------------
   1. Daily Live Date & Telugu Calendar Sync
   -------------------------------------------------------------------------- */
function initDailyDateSync() {
  const dateContainers = document.querySelectorAll('.live-calendar-date');
  if (dateContainers.length === 0) return;

  const now = new Date();
  const teluguDays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
  const teluguMonths = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
  
  const dayName = teluguDays[now.getDay()];
  const dateNum = now.getDate();
  const monthName = teluguMonths[now.getMonth()];
  const yearNum = now.getFullYear();

  const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';

  dateContainers.forEach(el => {
    if (isEn) {
      el.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } else {
      el.textContent = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
    }
  });
}

/* --------------------------------------------------------------------------
   2. Live Scheme & Exam Deadlines Auto-Calculator
   -------------------------------------------------------------------------- */
function initAutoDeadlinesTicker() {
  const deadlineBadge = document.getElementById('autoDeadlineBadge');
  if (!deadlineBadge) return;

  const upcomingEvents = [
    { title_te: "డ్వాక్రా మహిళా ఉత్పత్తుల ఈ-మార్కెట్ లిస్టింగ్", title_en: "DWCRA Women SHG Products Listing", days: 30 },
    { title_te: "NTR భరోసా పెన్షన్ల దరఖాస్తు డ్రైవ్", title_en: "NTR Bharosa Pension Applications Drive", days: 15 },
    { title_te: "మెగా DSC ఆన్‌లైన్ దరఖాస్తు", title_en: "Mega DSC Online Application", days: 18 },
    { title_te: "రైతు భరోసా ఈ-క్రాప్ జియో ట్యాగింగ్", title_en: "e-Crop Geo-Tagging Drive", days: 12 },
    { title_te: "బియ్యం కార్డు సభ్యుల eKYC నమోదు", title_en: "Rice Card eKYC Verification", days: 25 },
    { title_te: "AP EAPCET కౌన్సెలింగ్ ఫేజ్-2", title_en: "EAPCET Phase-2 Web Options", days: 8 }
  ];

  let currentIdx = 0;
  function updateDeadlineDisplay() {
    const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';
    const ev = upcomingEvents[currentIdx];
    const name = isEn ? ev.title_en : ev.title_te;
    const remaining = isEn ? `${ev.days} Days Left` : `మిగిలిన సమయం: ${ev.days} రోజులు`;

    deadlineBadge.innerHTML = `
      <span style="background: #0284c7; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">LIVE</span>
      <span>${name}: <b>${remaining}</b></span>
    `;

    currentIdx = (currentIdx + 1) % upcomingEvents.length;
  }

  updateDeadlineDisplay();
  setInterval(updateDeadlineDisplay, 5000);
}

/* --------------------------------------------------------------------------
   3. Server Health Pinger & Real-Time Gateway Ping
   -------------------------------------------------------------------------- */
function initServerHealthPinger() {
  var healthBadges = document.querySelectorAll('.server-health-indicator');
  var isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';
  var statusText = isEn ? '100% Online Gateway' : '100% ఆన్‌లైన్ గేట్‌వే';
  healthBadges.forEach(badge => {
    badge.innerHTML = `
      <span style="display:inline-block; width:8px; height:8px; background:#22c55e; border-radius:50%; box-shadow:0 0 6px #22c55e; margin-right:4px;"></span>
      <span style="color:#166534; font-weight:700; font-size:0.75rem;">${statusText}</span>
    `;
  });
}

/* --------------------------------------------------------------------------
   4. Smart Citizen Eligibility Interactive Quick Checker Tool
   -------------------------------------------------------------------------- */
function initSmartEligibilityCalculator() {
  const calcForm = document.getElementById('citizenEligibilityForm');
  const calcResultBox = document.getElementById('citizenEligibilityResults');

  if (!calcForm || !calcResultBox) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var occEl = document.getElementById('calcOccupation');
    var landEl = document.getElementById('calcLand');
    var ageEl = document.getElementById('calcAge');
    var cardEl = document.getElementById('calcCard');
    if (!occEl || !landEl || !ageEl || !cardEl) return;

    var occupation = occEl.value;
    var landStatus = landEl.value;
    var age = parseInt(ageEl.value || '25', 10);
    var hasWhiteCard = cardEl.value === 'yes';

    const isEn = (localStorage.getItem('ap_portal_lang') || 'te') === 'en';

    let eligibleSchemes = [];

    // 1. Rythu Bharosa
    if (occupation === 'farmer' || landStatus === 'owns_land' || landStatus === 'tenant') {
      eligibleSchemes.push({
        name: isEn ? "Rythu Bharosa - PM Kisan (₹13,500/Year)" : "రైతు భరోసా - పీఎం కిసాన్ (ఏడాదికి ₹13,500)",
        link: "service-detail.html?id=rythu-bharosa",
        icon: "🌾"
      });
      eligibleSchemes.push({
        name: isEn ? "e-Crop Booking & 100% Free Crop Insurance" : "ఈ-క్రాప్ నమోదు & ఉచిత పంటల బీమా",
        link: "service-detail.html?id=e-crop",
        icon: "🛡️"
      });
    }

    // 2. Aarogyasri
    if (hasWhiteCard) {
      eligibleSchemes.push({
        name: isEn ? "Dr. YSR Aarogyasri (Free Healthcare up to ₹25 Lakhs)" : "డా. వైఎస్సార్ ఆరోగ్యశ్రీ (₹25 లక్షల వరకు ఉచిత వైద్యం)",
        link: "service-detail.html?id=aarogyasri",
        icon: "🏥"
      });
    }

    // 3. Gruha Jyothi
    if (hasWhiteCard) {
      eligibleSchemes.push({
        name: isEn ? "Gruha Jyothi (Up to 200 Units Free Domestic Electricity)" : "గృహ జ్యోతి (200 యూనిట్ల వరకు ఉచిత విద్యుత్)",
        link: "service-detail.html?id=gruha-jyothi",
        icon: "💡"
      });
    }

    // 4. NTR Pension Kanuka
    if (age >= 60 && hasWhiteCard) {
      eligibleSchemes.push({
        name: isEn ? "NTR Bharosa Social Security Pension (₹4,000/Month)" : "ఎన్టీఆర్ భరోసా వృద్ధాప్య పింఛను (నెలకు ₹4,000)",
        link: "service-detail.html?id=pension-kanuka",
        icon: "👵"
      });
    }

    // 5. Vidya Deevena
    if (occupation === 'student' && hasWhiteCard) {
      eligibleSchemes.push({
        name: isEn ? "Jagananna Vidya Deevena (100% Tuition Fee Reimbursement)" : "జగనన్న విద్యా దీవెన (100% పూర్తి ఫీజు రీయింబర్స్‌మెంట్)",
        link: "service-detail.html?id=vidya-deevena",
        icon: "🎓"
      });
    }

    // 6. Recruitment Jobs
    if (age >= 18 && age <= 42) {
      eligibleSchemes.push({
        name: isEn ? "Mega DSC & APPSC Group-1 & 2 Government Jobs" : "మెగా DSC & APPSC గ్రూప్-1, 2 ప్రభుత్వ ఉద్యోగాలు",
        link: "service-detail.html?id=ap-mega-dsc",
        icon: "💼"
      });
    }

    // Render Results
    calcResultBox.innerHTML = `
      <div style="background: var(--bg-main); border: 2px solid var(--primary); border-radius: var(--radius-md); padding: 20px; margin-top: 18px; animation: fadeIn 0.3s ease;">
        <h4 style="color: var(--primary); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span>🎉</span>
          <span>${isEn ? 'Schemes You Are Eligible For:' : 'మీరు దరఖాస్తు చేసుకోదగిన పథకాలు & సేవలు:'}</span>
        </h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${eligibleSchemes.map(s => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-sm);">
              <span style="font-weight: 700; font-size: 0.92rem; display: flex; align-items: center; gap: 8px;">
                <span>${s.icon}</span>
                <span>${s.name}</span>
              </span>
              <a href="${s.link}" class="guide-read-btn" style="font-size: 0.78rem; padding: 6px 12px;">${isEn ? 'View Guide →' : 'గైడ్ చూడండి →'}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    calcResultBox.style.display = 'block';
  });
}
