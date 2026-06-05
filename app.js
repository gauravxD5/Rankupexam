/**
 * ═══════════════════════════════════════════════════════
 *  RankUpExam — app.js
 *  Core application logic.
 *  Depends on: config.js, data.js (must load before this)
 * ═══════════════════════════════════════════════════════
 */

/* ───────────────────────────────────────────────────────
   0. THEME — Dark / Light with localStorage persistence
   ─────────────────────────────────────────────────────── */
const THEME_KEY = 'rankupexam_theme';
function applyTheme(theme) {
  const body = document.body;
  const ttD  = document.getElementById('ttDark');
  const ttL  = document.getElementById('ttLight');
  if (theme === 'light') {
    body.classList.add('light');
    if (ttD) ttD.classList.remove('active');
    if (ttL) ttL.classList.add('active');
  } else {
    body.classList.remove('light');
    if (ttD) ttD.classList.add('active');
    if (ttL) ttL.classList.remove('active');
  }
  localStorage.setItem(THEME_KEY, theme);
}
window.setTheme = function(theme) { applyTheme(theme); };
// Restore saved theme on load
(function() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  if (saved === 'light') document.body.classList.add('light');
})();

/* ───────────────────────────────────────────────────────
   1. ADMIN MODE
   ?admin=true in URL → sets localStorage flag
   Persists across page reloads.
   ─────────────────────────────────────────────────────── */
const ADMIN_KEY = CONFIG.adminKey;
(function checkAdminURL() {
  const params = new URLSearchParams(location.search);
  if (params.get('admin') === 'true') {
    localStorage.setItem(ADMIN_KEY, '1');
    // Clean URL without reload
    history.replaceState({}, '', location.pathname);
  }
})();
const IS_ADMIN = localStorage.getItem(ADMIN_KEY) === '1';

// Expose for other modules
window.IS_ADMIN = IS_ADMIN;

/* ───────────────────────────────────────────────────────
   2. DATE / UNLOCK LOGIC
   startDate = CONFIG.startDate = "2026-06-08"
   todayDay  = days elapsed since startDate + 1
   Admin → all 70 unlocked. Normal → future locked.
   ─────────────────────────────────────────────────────── */
function computeTodayDay() {
  const start  = new Date(CONFIG.startDate);
  start.setHours(0, 0, 0, 0);
  const now    = new Date();
  now.setHours(0, 0, 0, 0);
  const diff   = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diff + 1, CONFIG.totalDays));
}

const TODAY_DAY = computeTodayDay();

function isDayUnlocked(d) {
  if (IS_ADMIN) return true;
  return d <= TODAY_DAY;
}

/* ───────────────────────────────────────────────────────
   3. STATE — localStorage persistence
   ─────────────────────────────────────────────────────── */
const SK = CONFIG.storageKey;

function loadState() {
  try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(SK, JSON.stringify(s)); } catch {}
}

let STATE = loadState();
STATE.completedDays = STATE.completedDays || [];
STATE.xp            = STATE.xp            || 0;
STATE.streak        = STATE.streak        || 0;
STATE.lastCompleted = STATE.lastCompleted || null;
STATE.todayChecks   = STATE.todayChecks   || {};
STATE.actions       = STATE.actions       || {};

/* ───────────────────────────────────────────────────────
   4. XP & LEVELS
   ─────────────────────────────────────────────────────── */
function getLevel(xp) {
  return CONFIG.xpLevels.find(l => xp >= l.min && xp < l.max) || CONFIG.xpLevels[0];
}
function getRankBadge(streak) {
  if (streak >= 30) return '🥇';
  if (streak >= 14) return '🥈';
  if (streak >= 7)  return '🥉';
  if (streak >= 3)  return '⭐';
  return '—';
}
function updateXPUI() {
  const xp     = STATE.xp;
  const streak = STATE.streak;
  const level  = getLevel(xp);
  const pct    = Math.min(100, ((xp - level.min) / (level.max - level.min)) * 100);

  setText('xpVal',          xp);
  setText('streakVal',       streak);
  setText('daysCompleted',  STATE.completedDays.length);
  setText('rankBadge',      getRankBadge(streak));
  setText('xpBarFill',      null, 'width', pct + '%');
  document.getElementById('xpBarFill').style.width = pct + '%';
  setText('xpLevelBadge',   level.name);
  setText('xpCountDisplay', xp + ' / ' + level.max + ' XP to next level');
  setText('navXP',           xp + ' XP');
  setText('navStreak',       '🔥 ' + streak);
  const fireEl = document.getElementById('streakFire');
  if (fireEl) fireEl.textContent = streak >= 3 ? '🔥' : '⭐';
}
function addXP(amount) {
  STATE.xp = (STATE.xp || 0) + amount;
  saveState(STATE);
  updateXPUI();
}

/* ───────────────────────────────────────────────────────
   5. UTILITY
   ─────────────────────────────────────────────────────── */
function setText(id, text, prop, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (prop) { el.style[prop] = val; }
  else       { el.textContent = text; }
}
function isLive(link) {
  return link && link !== '#' && link.trim() !== '';
}

/* ───────────────────────────────────────────────────────
   6. TODAY VIEW — render from data.js
   ─────────────────────────────────────────────────────── */
function renderTodayView() {
  const dayObj = DAYS.find(d => d.d === TODAY_DAY) || DAYS[0];

  // Hero
  setText('thDayNum',   'Day ' + dayObj.d);
  setText('thTopic',    dayObj.topic);
  setText('thSub',      dayObj.sub || '');
  setText('todayMissionBadge', 'Day ' + dayObj.d);

  // Shortcut
  const shortcutEl = document.getElementById('todayShortcut');
  if (shortcutEl)
    shortcutEl.innerHTML = '<strong>⚡ Shortcut:</strong> ' + (dayObj.shortcut || 'Focus aur mehnat karo!');

  // Action buttons
  renderTodayButtons(dayObj);

  // Checklist
  renderChecklist(dayObj);

  // Quick stats
  setText('qs1', Math.max(0, CONFIG.totalDays - TODAY_DAY));
  setText('qs2', Math.round((TODAY_DAY / CONFIG.totalDays) * 100) + '%');
  setText('qs3', 'W' + Math.ceil(TODAY_DAY / 7));

  // Header day counter
  const shDay = document.getElementById('shDayCount');
  if (shDay) shDay.textContent = 'Day ' + TODAY_DAY + ' / ' + CONFIG.totalDays;

  // Progress bar in header
  const fill = document.getElementById('shProgFill');
  if (fill) fill.style.width = ((TODAY_DAY / CONFIG.totalDays) * 100) + '%';

  // Milestone meta
  setText('mbMeta', 'Day ' + TODAY_DAY + ' of ' + CONFIG.totalDays + ' · ' + Math.max(0, CONFIG.totalDays - TODAY_DAY) + ' days remaining');
  const mbFill = document.getElementById('mbFill');
  if (mbFill) mbFill.style.width = ((TODAY_DAY / CONFIG.totalDays) * 100).toFixed(1) + '%';

  // Complete button state
  updateCompleteBtnState();
}

function renderTodayButtons(dayObj) {
  const locked = !isDayUnlocked(dayObj.d);

  const pdfEl        = document.getElementById('todayPdfBtn');
  const mockEl       = document.getElementById('todayMockBtn');
  const ytEl         = document.getElementById('todayYtBtn');
  const ytAnalysisEl = document.getElementById('todayYtAnalysisBtn');

  // Helper: set button state
  function setBtn(el, href, cls, label, sub, action) {
    if (!el) return;
    if (!locked && isLive(href)) {
      el.href      = href;
      el.target    = '_blank';
      el.className = 'tm-btn ' + cls;
      el.onclick   = () => logAction(action);
      el.querySelector('.tm-btn-sub').textContent = sub;
    } else if (!locked) {
      el.className     = 'tm-btn tm-lock';
      el.removeAttribute('href');
      el.querySelector('.tm-btn-label').textContent = label;
      el.querySelector('.tm-btn-sub').textContent   = 'Coming Soon';
    } else {
      el.className = 'tm-btn tm-lock';
    }
  }

  setBtn(pdfEl,        dayObj.pdf,        'tm-pdf',      'PDF Notes',    '+' + CONFIG.xpRewards.pdf + ' XP',        'pdf');
  setBtn(mockEl,       dayObj.mock,       'tm-mock',     'Mock Test',    '25Q · 15Min · +' + CONFIG.xpRewards.mock + ' XP', 'mock');
  setBtn(ytEl,         dayObj.yt,         'tm-yt',       'Watch Video',  '+' + CONFIG.xpRewards.yt + ' XP',         'yt');
  setBtn(ytAnalysisEl, dayObj.ytAnalysis, 'tm-analysis', 'PDF Analysis', 'Lecture +' + (CONFIG.xpRewards.ytAnalysis||15) + ' XP', 'ytAnalysis');
}

/* ───────────────────────────────────────────────────────
   7. CHECKLIST
   ─────────────────────────────────────────────────────── */
let checksDone = 0;

function renderChecklist(dayObj) {
  const container = document.getElementById('checklistItems');
  if (!container) return;
  container.innerHTML = '';
  checksDone = 0;
  const topics = dayObj.topics || [];
  const savedChecks = STATE.todayChecks[TODAY_DAY] || [];

  topics.forEach((topic, idx) => {
    const isChecked = savedChecks[idx] === true;
    if (isChecked) checksDone++;

    const item = document.createElement('div');
    item.className = 'tcl-item' + (isChecked ? ' checked' : '');
    item.innerHTML = `
      <div class="tcl-check" id="chk${idx}">${isChecked ? '✓' : '›'}</div>
      <div class="tcl-text">${topic}</div>`;
    item.addEventListener('click', () => toggleCheck(item, idx, topics.length));
    container.appendChild(item);
  });

  updateCheckProgress(topics.length);
}

function toggleCheck(el, idx, total) {
  if (!STATE.todayChecks[TODAY_DAY])
    STATE.todayChecks[TODAY_DAY] = [];

  el.classList.toggle('checked');
  const chk = document.getElementById('chk' + idx);

  if (el.classList.contains('checked')) {
    if (chk) chk.textContent = '✓';
    checksDone++;
    if (!STATE.todayChecks[TODAY_DAY][idx]) {
      STATE.todayChecks[TODAY_DAY][idx] = true;
      addXP(CONFIG.xpRewards.check);
    }
  } else {
    if (chk) chk.textContent = '›';
    checksDone = Math.max(0, checksDone - 1);
    STATE.todayChecks[TODAY_DAY][idx] = false;
  }
  saveState(STATE);
  updateCheckProgress(total);
}

function updateCheckProgress(total) {
  const prog = document.getElementById('checkProgress');
  if (prog) prog.textContent = checksDone + ' / ' + total + ' done';
  updateCompleteBtnState(total);
}

/* ───────────────────────────────────────────────────────
   8. COMPLETE DAY BUTTON
   ─────────────────────────────────────────────────────── */
function updateCompleteBtnState(total) {
  const dayObj = DAYS.find(d => d.d === TODAY_DAY) || DAYS[0];
  const topicCount = total || (dayObj.topics || []).length;
  const btn = document.getElementById('completeDayBtn');
  if (!btn) return;

  if (STATE.completedDays.includes(TODAY_DAY)) {
    btn.className   = 'complete-btn done';
    btn.textContent = '🎉 Day ' + TODAY_DAY + ' Complete!';
  } else if (checksDone >= topicCount && topicCount > 0) {
    btn.className   = 'complete-btn ready';
    btn.textContent = '✅ Mark Day ' + TODAY_DAY + ' as Complete (+' + CONFIG.xpRewards.complete + ' XP)';
  } else {
    btn.className   = 'complete-btn locked';
    btn.textContent = '🔒 Complete all topics to unlock Day Complete (' + checksDone + '/' + topicCount + ')';
  }
}

window.completeDay = function () {
  const dayObj   = DAYS.find(d => d.d === TODAY_DAY) || DAYS[0];
  const topicCnt = (dayObj.topics || []).length;
  if (checksDone < topicCnt) return;
  if (STATE.completedDays.includes(TODAY_DAY)) return;

  STATE.completedDays.push(TODAY_DAY);
  STATE.xp = (STATE.xp || 0) + CONFIG.xpRewards.complete;

  const today = new Date().toDateString();
  if (STATE.lastCompleted) {
    const diff = (new Date() - new Date(STATE.lastCompleted)) / (1000 * 60 * 60 * 24);
    if      (diff < 1.5) STATE.streak = (STATE.streak || 0) + 1;
    else if (diff > 1.5) STATE.streak = 1;
  } else {
    STATE.streak = 1;
  }
  STATE.lastCompleted = today;
  saveState(STATE);
  updateXPUI();
  updateCompleteBtnState(topicCnt);
  renderHeatmap();
  showCompletion();
};

window.logAction = function (type) {
  if (!STATE.actions[TODAY_DAY]) STATE.actions[TODAY_DAY] = {};
  if (!STATE.actions[TODAY_DAY][type]) {
    STATE.actions[TODAY_DAY][type] = true;
    addXP(CONFIG.xpRewards[type] || 10);
    saveState(STATE);
  }
};

/* ───────────────────────────────────────────────────────
   9. COMPLETION OVERLAY
   ─────────────────────────────────────────────────────── */
function showCompletion() {
  const streak = STATE.streak;
  setText('cmEmoji', streak >= 7 ? '🏆' : streak >= 3 ? '🔥' : '🎉');
  setText('cmTitle', 'Day ' + TODAY_DAY + ' Complete!');
  setText('cmXp',    '+' + CONFIG.xpRewards.complete + ' XP earned · Streak: ' + streak + ' days 🔥');
  document.getElementById('completionOverlay').classList.add('show');
}
window.closeCompletion = function () {
  document.getElementById('completionOverlay').classList.remove('show');
};

/* ───────────────────────────────────────────────────────
   10. HEATMAP
   ─────────────────────────────────────────────────────── */
function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let d = 1; d <= CONFIG.totalDays; d++) {
    const cell    = document.createElement('div');
    cell.className = 'wh-cell';
    cell.title     = 'Day ' + d;
    cell.textContent = d;
    if (STATE.completedDays.includes(d)) {
      cell.classList.add('done');
    } else if (d === TODAY_DAY) {
      cell.classList.add('today');
    } else if (isDayUnlocked(d)) {
      cell.classList.add('open');
    } else {
      cell.classList.add('locked');
    }
    grid.appendChild(cell);
  }
}

/* ───────────────────────────────────────────────────────
   11. ROADMAP / DAYS TABLE
   ─────────────────────────────────────────────────────── */
const SUBJ_COLOR = { quant: 'cyan', english: 'em', reasoning: 'violet', ga: 'amb', mix: 'gold' };
const SUBJ_LABEL = { quant: 'Quant', english: 'English', reasoning: 'Reasoning', ga: 'GA', mix: 'Mix' };

function dayRowHTML(day) {
  const unlocked = isDayUnlocked(day.d);
  const done     = STATE.completedDays.includes(day.d);
  const isToday  = day.d === TODAY_DAY;

  const pdfBtn  = isLive(day.pdf)        && unlocked
    ? `<a href="${day.pdf}"        target="_blank" class="tbl-link tbl-pdf">📄 PDF</a>`
    : `<span class="tbl-link tbl-na">${isLive(day.pdf) && !unlocked ? '🔒' : 'Soon'}</span>`;
  const mockBtn = isLive(day.mock)       && unlocked
    ? `<a href="${day.mock}"       target="_blank" class="tbl-link tbl-mock">🧪 Mock</a>`
    : `<span class="tbl-link tbl-na">${isLive(day.mock) && !unlocked ? '🔒' : 'Soon'}</span>`;
  const ytBtn   = isLive(day.yt)         && unlocked
    ? `<a href="${day.yt}"         target="_blank" class="tbl-link tbl-yt">▶ Video</a>`
    : `<span class="tbl-link tbl-na">${isLive(day.yt) && !unlocked ? '🔒' : 'Soon'}</span>`;
  const analysisBtn = isLive(day.ytAnalysis) && unlocked
    ? `<a href="${day.ytAnalysis}" target="_blank" class="tbl-link tbl-analysis">🎬 Analysis</a>`
    : `<span class="tbl-link tbl-na">${isLive(day.ytAnalysis) && !unlocked ? '🔒' : 'Soon'}</span>`;

  const statusBadge = done
    ? `<span class="st-badge st-done">✓ Done</span>`
    : isToday
    ? `<span class="st-badge st-today">⚡ Today</span>`
    : unlocked
    ? `<span class="st-badge st-open">Open</span>`
    : `<span class="st-badge st-lock">🔒</span>`;

  const rowClass = [
    'day-row',
    done     ? 'dr-done'  : '',
    isToday  ? 'dr-today' : '',
    !unlocked? 'dr-locked': '',
    day.type === 'weekly-test' ? 'dr-test' : '',
    day.type === 'full-test'   ? 'dr-flt'  : ''
  ].filter(Boolean).join(' ');

  const subjColor = SUBJ_COLOR[day.subj] || 'txt2';
  const subjLabel = SUBJ_LABEL[day.subj] || day.subj;

  return `<div class="${rowClass}" data-day="${day.d}">
    <div class="dr-day"><span class="dr-num">${day.d}</span><span class="dr-subj" style="color:var(--${subjColor})">${subjLabel}</span></div>
    <div class="dr-topic"><div class="dr-topic-main">${day.topic}</div><div class="dr-topic-sub">${day.sub || ''}</div></div>
    <div class="dr-action">${pdfBtn}</div>
    <div class="dr-action">${mockBtn}</div>
    <div class="dr-action">${ytBtn}</div>
    <div class="dr-action">${analysisBtn}</div>
    <div class="dr-action">${statusBadge}</div>
  </div>`;
}

let activeWeekFilter = 0;

window.fw = function (wk, el) {
  activeWeekFilter = wk;
  document.querySelectorAll('.wt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderDays(wk);
};

function renderDays(wk) {
  const list = document.getElementById('daysList');
  if (!list) return;

  let filtered = DAYS;
  if (wk === 10) {
    filtered = DAYS.filter(d => d.d >= 61);
  } else if (wk > 0) {
    const start = (wk - 1) * 7 + 1;
    const end   = wk * 7;
    filtered = DAYS.filter(d => d.d >= start && d.d <= end);
  }

  // Use DocumentFragment for performance with 500+ days
  const frag = document.createDocumentFragment();
  filtered.forEach(day => {
    const div = document.createElement('div');
    div.innerHTML = dayRowHTML(day);
    frag.appendChild(div.firstElementChild);
  });
  list.innerHTML = '';
  list.appendChild(frag);
}

/* ───────────────────────────────────────────────────────
   12. HARD SHIFTS
   ─────────────────────────────────────────────────────── */
const YR_COLORS = { '2021': 'hard-3', '2022': 'hard-2', '2023': 'hard-2', '2024': 'hard-1', '2025': 'hard-1' };
const RANK_CLS  = { 1: 'r1', 2: 'r2', 3: 'r3' };
const RANK_LBL  = { 1: '🔥 Hardest', 2: '⚡ Very Hard', 3: '💪 Hard' };

function shiftCardHTML(s) {
  const hasMock = isLive(s.mock);
  const hasYT   = isLive(s.yt);
  const tryBtn  = hasMock
    ? `<a href="${s.mock}" target="_blank" class="sca sca-try">🧪 Attempt Now</a>`
    : `<span class="sca sca-try" style="opacity:.35;cursor:not-allowed">🧪 Coming Soon</span>`;
  const ytBtn   = hasYT
    ? `<a href="${s.yt}" target="_blank" class="sca sca-yt">▶ YT Solution</a>`
    : `<span class="sca sca-yt" style="opacity:.35;cursor:not-allowed">▶ Soon</span>`;
  return `<div class="shift-card ${YR_COLORS[s.yr] || 'hard-2'}">
    <div class="sc-top"><div class="sc-name">${s.date} · ${s.shift}</div><span class="sc-rank ${RANK_CLS[s.rank] || 'r3'}">${RANK_LBL[s.rank] || 'Hard'}</span></div>
    <div class="sc-meta">SSC ${s.label}</div>
    <div class="sc-actions">${tryBtn}${ytBtn}</div>
  </div>`;
}

function renderShifts(yr, containerId) {
  const list     = document.getElementById(containerId);
  if (!list) return;
  const filtered = yr === 'all' ? SHIFTS : SHIFTS.filter(s => s.yr === yr);
  const frag     = document.createDocumentFragment();
  filtered.forEach(s => {
    const div = document.createElement('div');
    div.innerHTML = shiftCardHTML(s);
    frag.appendChild(div.firstElementChild);
  });
  list.innerHTML = '';
  list.appendChild(frag);
  const cnt = document.getElementById('shiftCount');
  if (cnt) cnt.textContent = filtered.length + ' Shifts';
}

window.setYear  = function (yr, el) {
  document.querySelectorAll('.ryt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderShifts(yr, 'shiftList');
};
window.setYearS = function (yr, el) {
  document.querySelectorAll('#shiftYearTabs .ryt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderShifts(yr, 'shiftListFull');
};
window.renderShiftsFull = function (yr) { renderShifts(yr, 'shiftListFull'); };

/* ───────────────────────────────────────────────────────
   13. VIEW SWITCHER
   ─────────────────────────────────────────────────────── */
window.switchView = function (view) {
  ['todayView', 'roadmapView', 'shiftsView', 'aboutView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  ['vsToday', 'vsRoadmap', 'vsShifts', 'vsAbout'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  const viewMap = { today: 'todayView', roadmap: 'roadmapView', shifts: 'shiftsView', about: 'aboutView' };
  const vsMap   = { today: 'vsToday',   roadmap: 'vsRoadmap',   shifts: 'vsShifts',   about: 'vsAbout'   };

  const target = document.getElementById(viewMap[view]);
  const vsBtn  = document.getElementById(vsMap[view]);
  if (target) target.style.display = 'block';
  if (vsBtn)  vsBtn.classList.add('active');

  if (view === 'roadmap') renderDays(activeWeekFilter);
  if (view === 'shifts')  renderShifts('all', 'shiftListFull');
};

/* ───────────────────────────────────────────────────────
   14. TIMER
   ─────────────────────────────────────────────────────── */
let timerLeft = 0, timerRunning = false, timerInterval = null;

window.timerToggle = function () {
  if (!timerRunning) {
    const h = parseInt(document.getElementById('timerHrs').value)  || 0;
    const m = parseInt(document.getElementById('timerMins').value) || 0;
    if (!timerLeft) timerLeft = h * 3600 + m * 60;
    if (!timerLeft) return;
    timerRunning = true;
    document.getElementById('timerStartBtn').textContent = '⏸';
    document.getElementById('timerDisp').classList.add('running');
    timerInterval = setInterval(() => {
      if (timerLeft <= 0) { timerDone(); return; }
      timerLeft--;
      updateTimerDisplay();
    }, 1000);
  } else {
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('timerStartBtn').textContent = '▶';
    document.getElementById('timerDisp').classList.remove('running');
  }
};
window.timerReset = function () {
  timerRunning = false;
  timerLeft    = 0;
  clearInterval(timerInterval);
  document.getElementById('timerStartBtn').textContent  = '▶';
  document.getElementById('timerDisp').textContent      = '00:00:00';
  document.getElementById('timerDisp').classList.remove('running');
};
function timerDone() {
  timerRunning = false;
  clearInterval(timerInterval);
  const disp = document.getElementById('timerDisp');
  disp.textContent = 'DONE! ✓';
  disp.style.color = 'var(--em)';
  setTimeout(() => { disp.style.color = 'var(--cyan)'; timerLeft = 0; updateTimerDisplay(); }, 3000);
}
function updateTimerDisplay() {
  const h = Math.floor(timerLeft / 3600);
  const m = Math.floor((timerLeft % 3600) / 60);
  const s = timerLeft % 60;
  document.getElementById('timerDisp').textContent =
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/* ───────────────────────────────────────────────────────
   15. AUTH MODAL CONTROLS
   ─────────────────────────────────────────────────────── */
window.openAuthModal = function () {
  document.getElementById('authModalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
};
window.closeAuthModal = function () {
  document.getElementById('authModalOverlay').classList.remove('show');
  document.body.style.overflow = '';
};
window.handleOverlayClick = function (e) {
  if (e.target === document.getElementById('authModalOverlay')) closeAuthModal();
};
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuthModal(); });

/* ───────────────────────────────────────────────────────
   16. BRANDING — inject from config
   ─────────────────────────────────────────────────────── */
function injectBranding() {
  document.querySelectorAll('[data-yt-href]').forEach(el => {
    el.href = CONFIG.youtube;
    el.textContent = el.textContent.replace('@rankupexam', CONFIG.youtubeHandle);
  });
  document.querySelectorAll('[data-tg-href]').forEach(el => {
    el.href = CONFIG.telegram;
  });
  document.querySelectorAll('[data-tg-cta-title]').forEach(el => {
    el.textContent = CONFIG.tgCtaTitle;
  });
  document.querySelectorAll('[data-tg-cta-sub]').forEach(el => {
    el.textContent = CONFIG.tgCtaSub;
  });
  document.querySelectorAll('[data-footer-note]').forEach(el => {
    el.textContent = CONFIG.footerNote;
  });
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = CONFIG.email;
    if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.email;
  });
  // Admin badge
  if (IS_ADMIN) {
    const badge = document.getElementById('adminBadge');
    if (badge) badge.style.display = 'flex';
  }
}

/* ───────────────────────────────────────────────────────
   17. INIT
   ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme toggle UI
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  injectBranding();
  updateXPUI();
  renderTodayView();
  renderHeatmap();
  renderShifts('all', 'shiftList');
});
