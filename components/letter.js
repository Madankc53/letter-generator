// ── letter.js — Shared utilities for all letter pages ──

// ── Date Helpers ──
function getDate() {
  const el = document.getElementById('date');
  const val = el ? el.value : '';
  return val ? new Date(val).toLocaleDateString('ne-NP', { day:'2-digit', month:'long', year:'numeric' }) : new Date().toLocaleDateString('ne-NP', { day:'2-digit', month:'long', year:'numeric' });
}

function getDateEN() {
  const el = document.getElementById('date');
  const val = el ? el.value : '';
  return val ? new Date(val).toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' }) : new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
}

// ── Bikram Sambat (BS) Converter ──
const bsData = [
  [2000,30,32,31,32,31,30,30,30,29,30,29,31],
  [2001,31,31,32,31,31,31,30,29,30,29,30,30],
  [2002,31,31,32,32,31,30,30,29,30,29,30,30],
  [2003,31,32,31,32,31,30,30,30,29,29,30,31],
  [2004,30,32,31,32,31,30,30,30,29,30,29,31],
  [2005,31,31,32,31,31,31,30,29,30,29,30,30],
  [2006,31,31,32,32,31,30,30,29,30,29,30,30],
  [2007,31,32,31,32,31,30,30,30,29,29,30,31],
  [2008,31,31,32,31,31,31,30,29,30,29,30,30],
  [2009,31,31,32,32,31,30,30,29,30,29,30,30],
  [2010,31,32,31,32,31,30,30,30,29,29,30,31],
  [2011,31,31,31,32,31,31,30,29,30,29,30,30],
  [2012,31,31,32,31,31,31,30,29,30,29,30,30],
  [2013,31,31,32,32,31,30,30,29,30,29,30,30],
  [2014,31,32,31,32,31,30,30,30,29,29,30,31],
  [2015,31,31,31,32,31,31,30,29,30,29,30,30],
  [2016,31,31,32,31,31,31,30,29,30,29,30,30],
  [2017,31,32,31,32,31,30,30,30,29,29,30,30],
  [2018,31,32,31,32,31,30,30,30,29,30,29,31],
  [2019,31,31,31,32,31,31,30,29,30,29,30,30],
  [2020,31,31,32,31,31,31,30,29,30,29,30,30],
  [2021,31,32,31,32,31,30,30,30,29,29,30,31],
  [2022,30,32,31,32,31,30,30,30,29,30,29,31],
  [2023,31,31,32,31,31,31,30,29,30,29,30,30],
  [2024,31,31,32,32,31,30,30,29,30,29,30,30],
  [2025,31,32,31,32,31,30,30,30,29,29,30,31],
  [2026,31,31,31,32,31,31,30,29,30,29,30,30],
  [2027,31,31,32,31,31,31,30,29,30,29,30,30],
  [2028,31,31,32,32,31,30,30,29,30,29,30,30],
  [2029,31,32,31,32,31,30,30,30,29,29,30,31],
  [2030,31,31,31,32,31,31,30,29,30,29,30,30],
  [2031,31,31,32,31,31,31,30,29,30,29,30,30],
  [2032,31,32,31,32,31,30,30,30,29,30,29,31],
  [2033,31,31,32,32,31,30,30,30,29,30,29,30],
  [2034,31,31,32,32,31,30,30,30,29,30,29,30],
  [2035,31,32,31,32,31,30,30,30,29,29,30,31],
  [2036,31,31,31,32,31,31,30,29,30,29,30,30],
  [2037,31,31,32,31,31,31,30,29,30,29,30,30],
  [2038,31,32,31,32,31,30,30,30,29,29,30,31],
  [2039,31,31,32,32,31,30,30,30,29,30,29,30],
  [2040,31,31,32,32,31,30,30,30,29,30,29,30],
  [2041,31,32,31,32,31,30,30,30,29,29,30,31],
  [2042,31,31,31,32,31,31,30,29,30,29,30,30],
  [2043,31,31,32,31,31,31,30,29,30,29,30,30],
];

function adToBs(adDate) {
  let year = adDate.getFullYear();
  let month = adDate.getMonth() + 1;
  let day = adDate.getDate();

  let bsYear = 2000, bsMonth = 1, bsDay = 1;
  let adRef = new Date(1943, 3, 14); // BS 2000-01-01 = AD 1943-04-14

  let diffDays = Math.floor((adDate - adRef) / 86400000);
  if (diffDays < 0) return null;

  let i = 0;
  while (i < bsData.length) {
    const row = bsData[i];
    const yr = row[0];
    for (let m = 1; m <= 12; m++) {
      const days = row[m];
      if (diffDays < days) {
        return { year: yr, month: m, day: diffDays + 1 };
      }
      diffDays -= days;
    }
    i++;
  }
  return null;
}

const nepMonths = ['बैशाख','जेठ','आषाढ','श्रावण','भाद्र','आश्विन','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत्र'];
const nepDigits = ['०','१','२','३','४','५','६','७','८','९'];

function toNepDigits(n) {
  return String(n).split('').map(c => isNaN(c) ? c : nepDigits[parseInt(c)]).join('');
}

function getBSDate(adDate) {
  const bs = adToBs(adDate || new Date());
  if (!bs) return '';
  return `${toNepDigits(bs.year)} ${nepMonths[bs.month-1]} ${toNepDigits(bs.day)}`;
}

function getBSDateFull(adDate) {
  const d = adDate || new Date();
  const bs = adToBs(d);
  if (!bs) return '';
  return `${toNepDigits(bs.year)}-${toNepDigits(bs.month).padStart ? toNepDigits(String(bs.month).padStart(2,'0')) : toNepDigits(bs.month)}-${toNepDigits(String(bs.day).padStart(2,'0'))}`;
}

// ── Render BS+AD date badge ──
function renderDateBadge(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const dateEl = document.getElementById('date');
  const adDate = dateEl && dateEl.value ? new Date(dateEl.value) : new Date();
  const bs = getBSDate(adDate);
  const ad = adDate.toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
  const ne = adDate.toLocaleDateString('ne-NP', { day:'2-digit', month:'long', year:'numeric' });
  container.innerHTML = `
    <div class="date-badge">
      <div class="date-item">
        <span class="date-label">BS मिति</span>
        <span class="date-value">${bs}</span>
      </div>
      <div class="date-item">
        <span class="date-label">AD Date</span>
        <span class="date-value">${ad}</span>
      </div>
      <div class="date-item">
        <span class="date-label">नेपाली</span>
        <span class="date-value">${ne}</span>
      </div>
    </div>
  `;
}

// ── Letter Modal ──
function showLetter(html) {
  const doc = document.getElementById('letterDoc');
  if (doc) doc.innerHTML = html;
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.style.display = 'block';
  showToast('✅ पत्र तयार भयो!', 'success');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.style.display = 'none';
}

// ── Toast ──
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = type === 'error' ? 'toast error-toast' : 'toast';
  t.style.display = 'block';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.display = 'none', 3200);
}

// ── Reset Form ──
function resetForm() {
  document.querySelectorAll('input:not([type=file]), textarea').forEach(el => {
    if (el.type === 'date') el.valueAsDate = new Date();
    else el.value = '';
  });
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
  showToast('🔄 फारम खाली भयो!', 'success');
}

// ── Copy Letter Text ──
function copyLetterText() {
  const doc = document.getElementById('letterDoc');
  if (!doc) return;
  const text = doc.innerText || doc.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 पत्र कपी भयो!', 'success');
  }).catch(() => {
    showToast('❌ कपी हुन सकेन', 'error');
  });
}

// ── WhatsApp Share ──
function shareWhatsApp() {
  const doc = document.getElementById('letterDoc');
  const text = doc ? (doc.innerText || doc.textContent).substring(0, 1000) : document.title;
  const url = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.href)}`;
  window.open(url, '_blank');
}

// ── Web Share / Clipboard Share ──
function shareLetter() {
  const text = document.title;
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: text, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast('🔗 लिंक कपी भयो!', 'success');
    });
  }
}

// ── PDF Download ──
function downloadPDF() {
  const element = document.getElementById('letterDoc');
  if (!element) return;
  if (typeof html2pdf === 'undefined') {
    window.print();
    return;
  }
  const opt = {
    margin: [10, 12, 10, 12],
    filename: `letter-nepal-${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  showToast('⏳ PDF बनाउँदै छ...', 'success');
  html2pdf().set(opt).from(element).save().then(() => {
    showToast('✅ PDF डाउनलोड भयो!', 'success');
  });
}

// ── Live Preview ──
function initLivePreview(renderFn) {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(el => {
    el.addEventListener('input', () => {
      if (document.getElementById('modalOverlay') &&
          document.getElementById('modalOverlay').style.display === 'block') {
        renderFn(true);
      }
    });
    el.addEventListener('change', () => {
      if (document.getElementById('modalOverlay') &&
          document.getElementById('modalOverlay').style.display === 'block') {
        renderFn(true);
      }
    });
  });
}

// ── Complete Nepal Banks List ──
const NEPAL_BANKS = [
  'नबिल बैंक लि.',
  'नेपाल बैंक लि.',
  'ग्लोबल आइएमई बैंक लि.',
  'कुमारी बैंक लि.',
  'प्रभु बैंक लि.',
  'एनआईसी एशिया बैंक लि.',
  'सिद्धार्थ बैंक लि.',
  'हिमालयन बैंक लि.',
  'लक्ष्मी सनराइज बैंक लि.',
  'राष्ट्रिय वाणिज्य बैंक लि.',
  'एभरेष्ट बैंक लि.',
  'नेपाल इन्भेष्टमेन्ट मेगा बैंक लि.',
  'एनएमबी बैंक लि.',
  'माछापुच्छ्रे बैंक लि.',
  'सनराइज बैंक लि.',
  'सिटिजन्स बैंक इन्टरनेशनल लि.',
  'बैंक अफ काठमाण्डू लि.',
  'प्राइम कमर्सियल बैंक लि.',
  'सानिमा बैंक लि.',
  'मुक्तिनाथ विकास बैंक लि.',
  'जनता बैंक नेपाल लि.',
  'नेपाल एसबिआई बैंक लि.',
  'स्ट्यान्डर्ड चार्टर्ड बैंक नेपाल लि.',
  'नेपाल बंगलादेश बैंक लि.',
  'कृषि विकास बैंक लि.',
];

function populateBankSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">-- बैंक छान्नुहोस् --</option>' +
    NEPAL_BANKS.map(b => `<option value="${b}">${b}</option>`).join('');
}

// ── Close modal on overlay click ──
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('modalOverlay');
  if (overlay && e.target === overlay) closeModal();
});

// ── Escape HTML ──
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
