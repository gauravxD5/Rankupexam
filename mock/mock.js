/**
 * ═══════════════════════════════════════════════════════
 *  RankUpExam Mock Test Engine — mock.js
 *  One engine, any JSON test file
 *  Usage: mock.html?id=flt-01  OR  mock.html?id=reasoning-01
 * ═══════════════════════════════════════════════════════
 */

'use strict';

// ── STATE ────────────────────────────────────────────────
const STATE = {
  test:        null,      // loaded JSON
  testId:      null,
  answers:     {},        // { qIndex: optionIndex }
  visited:     {},        // { qIndex: true }
  marked:      {},        // { qIndex: true }
  currentQ:    0,
  currentSec:  null,
  timerLeft:   0,
  timerRef:    null,
  startTime:   null,
  submitted:   false,
  tabViolations: 0,
};

// ── STORAGE KEY ──────────────────────────────────────────
const SK = () => `rankup_mock_${STATE.testId}`;

// ── INIT ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id     = params.get('id');

  if (!id) {
    showError('No test ID provided in URL.<br>Example: <code>mock.html?id=flt-01</code>');
    return;
  }
  STATE.testId = id;
  loadTest(id);
});

// ── LOAD TEST JSON ───────────────────────────────────────
async function loadTest(id) {
  setText('loadingText', 'Loading test paper...');

  // Determine path from id prefix
  const folder = id.startsWith('flt')       ? 'flt'
               : id.startsWith('reasoning') ? 'reasoning'
               : id.startsWith('math')      ? 'math'
               : id.startsWith('english')   ? 'english'
               : id.startsWith('gk')        ? 'gk'
               : 'flt';

  const path = `../data/${folder}/${id}.json`;

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    STATE.test = await res.json();
    setText('loadingText', 'Preparing your test...');
    setTimeout(() => showInstructionScreen(), 1200);
  } catch (e) {
    showError(`Could not load test: <strong>${id}</strong><br>Make sure the JSON file exists at <code>${path}</code><br><small>${e.message}</small>`);
  }
}

// ── INSTRUCTION SCREEN ───────────────────────────────────
function showInstructionScreen() {
  const t = STATE.test;
  const total = t.questions.length;
  const maxScore = total * 2;
  const dur = t.duration;

  setText('insTitle',    t.title);
  setText('insDuration', dur + ' Min');
  setText('insQCount',   total);
  setText('insMarks',    '+2 / −0.5');
  setText('insMaxScore', maxScore);

  showScreen('instructionScreen');
}

let agreed = false;
function toggleAgree() {
  agreed = !agreed;
  const cb  = document.getElementById('insCheckbox');
  const btn = document.getElementById('btnStart');
  cb.classList.toggle('checked', agreed);
  cb.textContent = agreed ? '✓' : '';
  btn.classList.toggle('ready', agreed);
}

// ── START TEST ───────────────────────────────────────────
function startTest() {
  if (!agreed) return;

  // Check for saved session
  const saved = getSavedSession();
  if (saved) {
    showModal('restoreModal');
    return;
  }
  initFreshTest();
}

function freshStart() {
  clearSavedSession();
  closeModal('restoreModal');
  initFreshTest();
}

function restoreSession() {
  closeModal('restoreModal');
  const saved = getSavedSession();
  STATE.answers   = saved.answers   || {};
  STATE.visited   = saved.visited   || {};
  STATE.marked    = saved.marked    || {};
  STATE.currentQ  = saved.currentQ  || 0;
  STATE.timerLeft = saved.timerLeft || STATE.test.duration * 60;
  STATE.startTime = Date.now() - ((STATE.test.duration * 60 - STATE.timerLeft) * 1000);

  initTestUI();
  enterFullscreen();
}

function initFreshTest() {
  STATE.answers   = {};
  STATE.visited   = {};
  STATE.marked    = {};
  STATE.currentQ  = 0;
  STATE.timerLeft = STATE.test.duration * 60;
  STATE.startTime = Date.now();

  initTestUI();
  enterFullscreen();
}

// ── BUILD TEST UI ────────────────────────────────────────
function initTestUI() {
  const t = STATE.test;

  setText('tbTitle', t.title);

  // Section tabs (only for FLT with multiple sections)
  const sections = getUniqueSections();
  buildSectionTabs(sections);
  STATE.currentSec = sections[0] || null;

  // Build palette
  buildPalette();

  // Update sidebar stats
  updateSidebarStats();

  // Show first question
  renderQuestion(STATE.currentQ);

  // Start timer
  startTimer();

  // Anti-cheat listeners
  setupAntiCheat();

  // Auto-save every 15s
  setInterval(saveSession, 15000);

  showScreen('testScreen');
}

// ── SECTIONS ─────────────────────────────────────────────
function getUniqueSections() {
  const s = [];
  STATE.test.questions.forEach(q => {
    if (!s.includes(q.section)) s.push(q.section);
  });
  return s;
}

function buildSectionTabs(sections) {
  const bar = document.getElementById('sectionTabsBar');
  bar.innerHTML = '';
  if (sections.length <= 1) { bar.style.display = 'none'; return; }

  sections.forEach((sec, i) => {
    const btn = document.createElement('button');
    btn.className = 'sec-tab' + (i === 0 ? ' active' : '');
    const count = STATE.test.questions.filter(q => q.section === sec).length;
    btn.innerHTML = `${sec}<span class="sec-tab-count">${count}</span>`;
    btn.onclick = () => switchSection(sec);
    bar.appendChild(btn);
  });
}

function switchSection(sec) {
  STATE.currentSec = sec;
  document.querySelectorAll('.sec-tab').forEach(t => {
    t.classList.toggle('active', t.textContent.startsWith(sec));
  });
  // Jump to first question of this section
  const idx = STATE.test.questions.findIndex(q => q.section === sec);
  if (idx !== -1) jumpToQ(idx);
}

// ── RENDER QUESTION ──────────────────────────────────────
function renderQuestion(idx) {
  const q = STATE.test.questions[idx];
  if (!q) return;

  STATE.currentQ   = idx;
  STATE.visited[idx] = true;

  // Header
  setText('qNumDisplay', idx + 1);
  setText('qSectionTag', q.section || '');

  // Tags
  const topicEl = document.getElementById('qTopicTag');
  const diffEl  = document.getElementById('qDiffTag');
  topicEl.textContent = q.topic || '';
  diffEl.textContent  = q.difficulty || '';
  diffEl.className    = 'q-tag q-diff-' + (q.difficulty || '').toLowerCase();

  // Question text (supports HTML for images/Hindi)
  document.getElementById('qText').innerHTML = q.question || '';

  // Options
  renderOptions(q, idx);

  // Mark button state
  updateMarkBtn(idx);

  // Palette highlight
  buildPalette();
  updateSidebarStats();

  // Scroll to top
  document.getElementById('qPanel').scrollTo({ top:0, behavior:'smooth' });

  // Animate
  document.getElementById('qPanel').classList.remove('q-transition');
  void document.getElementById('qPanel').offsetWidth;
  document.getElementById('qPanel').classList.add('q-transition');
}

function renderOptions(q, idx) {
  const container = document.getElementById('qOptions');
  container.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((opt, oi) => {
    const div = document.createElement('div');
    div.className = 'q-option';

    const isSelected = STATE.answers[idx] === oi;
    const isMarked   = STATE.marked[idx];

    if (isSelected && isMarked) div.className += ' review-selected';
    else if (isSelected)        div.className += ' selected';

    div.innerHTML = `
      <div class="opt-bubble">${labels[oi]}</div>
      <div class="opt-text">${opt}</div>`;

    div.onclick = () => selectOption(idx, oi);
    container.appendChild(div);
  });
}

// ── OPTION SELECTION ─────────────────────────────────────
function selectOption(qIdx, optIdx) {
  // Toggle off if same option clicked
  if (STATE.answers[qIdx] === optIdx) {
    delete STATE.answers[qIdx];
  } else {
    STATE.answers[qIdx] = optIdx;
  }
  renderOptions(STATE.test.questions[qIdx], qIdx);
  buildPalette();
  updateSidebarStats();
  saveSession();
}

// ── NAVIGATION ───────────────────────────────────────────
function saveAndNext() {
  const total = STATE.test.questions.length;
  if (STATE.currentQ < total - 1) {
    renderQuestion(STATE.currentQ + 1);
  } else {
    // Last question — show submit prompt
    showSubmitModal();
  }
}

function prevQ() {
  if (STATE.currentQ > 0) renderQuestion(STATE.currentQ - 1);
}

function jumpToQ(idx) {
  renderQuestion(idx);
  // Close mobile sidebar if open
  if (window.innerWidth <= 768) toggleSidebar(false);
}

// ── MARK FOR REVIEW ──────────────────────────────────────
function toggleMark() {
  const idx = STATE.currentQ;
  STATE.marked[idx] = !STATE.marked[idx];
  if (!STATE.marked[idx]) delete STATE.marked[idx];
  updateMarkBtn(idx);
  renderOptions(STATE.test.questions[idx], idx);
  buildPalette();
  saveSession();
}

function updateMarkBtn(idx) {
  const btn = document.getElementById('btnMark');
  btn.classList.toggle('marked', !!STATE.marked[idx]);
  btn.textContent = STATE.marked[idx] ? '★ Marked' : '★ Review';
}

// ── CLEAR RESPONSE ───────────────────────────────────────
function clearResponse() {
  delete STATE.answers[STATE.currentQ];
  renderOptions(STATE.test.questions[STATE.currentQ], STATE.currentQ);
  buildPalette();
  updateSidebarStats();
  saveSession();
}

// ── PALETTE ──────────────────────────────────────────────
function buildPalette() {
  const grid = document.getElementById('paletteGrid');
  grid.innerHTML = '';
  const total = STATE.test.questions.length;

  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = 'p-btn';
    btn.textContent = i + 1;

    const answered  = STATE.answers[i] !== undefined;
    const visited   = STATE.visited[i];
    const marked    = STATE.marked[i];
    const isCurrent = i === STATE.currentQ;

    if (isCurrent && answered)         btn.classList.add('current', 'answered');
    else if (isCurrent)                btn.classList.add('current');
    else if (marked && answered)       btn.classList.add('review-answered');
    else if (marked)                   btn.classList.add('review');
    else if (answered)                 btn.classList.add('answered');
    else if (visited)                  btn.classList.add('unanswered');

    btn.onclick = () => jumpToQ(i);
    grid.appendChild(btn);
  }

  // Update mobile badge
  const answeredCount = Object.keys(STATE.answers).length;
  setText('sbCountBadge', answeredCount);
}

// ── SIDEBAR STATS ────────────────────────────────────────
function updateSidebarStats() {
  const total    = STATE.test.questions.length;
  const answered = Object.keys(STATE.answers).length;
  const visited  = Object.keys(STATE.visited).length;
  const review   = Object.keys(STATE.marked).length;
  const notDone  = visited - answered;

  setText('sbAnswered',   answered);
  setText('sbUnanswered', Math.max(0, notDone));
  setText('sbReview',     review);
  setText('sbTotal',      total);

  // Modal counts
  setText('mAnswered',   answered);
  setText('mUnanswered', total - answered);
  setText('mReview',     review);
}

// ── TIMER ────────────────────────────────────────────────
function startTimer() {
  updateTimerDisplay();
  STATE.timerRef = setInterval(() => {
    STATE.timerLeft--;
    updateTimerDisplay();
    if (STATE.timerLeft % 30 === 0) saveSession(); // save every 30s
    if (STATE.timerLeft <= 0) {
      clearInterval(STATE.timerRef);
      autoSubmit();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el  = document.getElementById('timerDisplay');
  const m   = Math.floor(STATE.timerLeft / 60);
  const s   = STATE.timerLeft % 60;
  el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  el.className = 'tb-timer';
  if (STATE.timerLeft <= 300) el.classList.add('warning');
  if (STATE.timerLeft <= 60)  el.classList.add('danger');
}

// ── SUBMIT ───────────────────────────────────────────────
function showSubmitModal() {
  updateSidebarStats();
  showModal('submitModal');

  const total    = STATE.test.questions.length;
  const answered = Object.keys(STATE.answers).length;
  const unanswered = total - answered;

  const sub = document.getElementById('submitModalSub');
  if (unanswered > 0) {
    sub.innerHTML = `⚠️ You have <strong style="color:var(--red)">${unanswered} unanswered</strong> question${unanswered > 1 ? 's' : ''}. Unanswered questions carry no penalty — but answered ones carry +2 marks!`;
  } else {
    sub.innerHTML = `✅ All questions answered! Click Submit to see your results.`;
  }
}

function autoSubmit() {
  STATE.submitted = true;
  clearInterval(STATE.timerRef);
  clearSavedSession();
  showResultScreen();
}

function submitTest() {
  clearInterval(STATE.timerRef);
  STATE.submitted = true;
  closeModal('submitModal');
  clearSavedSession();
  showResultScreen();
}

// ── RESULT CALCULATION ───────────────────────────────────
function showResultScreen() {
  showScreen('resultScreen');

  const qs       = STATE.test.questions;
  const total    = qs.length;
  let correct    = 0;
  let wrong      = 0;
  let skipped    = 0;

  qs.forEach((q, i) => {
    const ans = STATE.answers[i];
    if (ans === undefined) { skipped++; return; }
    if (ans === q.answer)  { correct++; }
    else                   { wrong++; }
  });

  const score     = correct * 2 - wrong * 0.5;
  const maxScore  = total * 2;
  const accuracy  = correct + wrong > 0
    ? Math.round((correct / (correct + wrong)) * 100) : 0;
  const timeUsed  = Math.round((Date.now() - STATE.startTime) / 1000);
  const timeUsedMin = Math.floor(timeUsed / 60);

  // Fill hero
  setText('resultScoreVal', score % 1 === 0 ? score : score.toFixed(1));
  setText('resultScoreMax', `/ ${maxScore}`);
  setText('rsCorrect',  correct);
  setText('rsWrong',    wrong);
  setText('rsSkipped',  skipped);
  setText('rsAccuracy', accuracy + '%');
  setText('rsScore',    score % 1 === 0 ? score : score.toFixed(1));
  setText('rsTime',     timeUsedMin + 'm');

  // Ring animation
  const pct  = Math.min(1, Math.max(0, score / maxScore));
  const circ = 346;
  const ring = document.getElementById('ringFill');
  setTimeout(() => {
    ring.style.strokeDashoffset = circ - (circ * pct);
  }, 300);

  // Rank badge
  setRankBadge(accuracy, score, maxScore);

  // Feedback
  setFeedback(accuracy, correct, total);

  // Section analysis
  buildSectionAnalysis(qs);

  // Chart
  setTimeout(() => buildChart(correct, wrong, skipped), 400);
}

function setRankBadge(accuracy, score, maxScore) {
  const badge = document.getElementById('rankBadge');
  const val   = document.getElementById('rankVal');
  const pct   = (score / maxScore) * 100;

  if (pct >= 80) {
    badge.className = 'rank-badge rb-gold';
    val.textContent = '🥇 Elite'; setText('resultBadgeLabel','🏆 Outstanding Performance');
  } else if (pct >= 65) {
    badge.className = 'rank-badge rb-silver';
    val.textContent = '🥈 Proficient'; setText('resultBadgeLabel','⭐ Good Performance');
  } else if (pct >= 50) {
    badge.className = 'rank-badge rb-bronze';
    val.textContent = '🥉 Average'; setText('resultBadgeLabel','📈 Keep Improving');
  } else {
    badge.className = 'rank-badge rb-iron';
    val.textContent = '💪 Beginner'; setText('resultBadgeLabel','📚 Needs Practice');
  }
}

function setFeedback(accuracy, correct, total) {
  const title = document.getElementById('resultTitle');
  const fb    = document.getElementById('resultFeedback');

  if (accuracy >= 90) {
    title.textContent = 'Outstanding Performance! 🏆';
    fb.textContent    = 'Exceptional accuracy! You are exam-ready. Keep this momentum going.';
  } else if (accuracy >= 75) {
    title.textContent = 'Great Performance! ⭐';
    fb.textContent    = `Good work! ${correct}/${total} correct. Focus on weak areas to push higher.`;
  } else if (accuracy >= 55) {
    title.textContent = 'Decent Attempt! 📈';
    fb.textContent    = `You are improving. Analyse wrong answers carefully and revise those topics.`;
  } else {
    title.textContent = 'Keep Practicing! 💪';
    fb.textContent    = `Don't worry — every attempt makes you stronger. Review explanations carefully.`;
  }
}

function buildSectionAnalysis(qs) {
  const sections = {};
  const colors   = {
    'Reasoning':    '#8ecfe8',
    'Mathematics':  '#d4b870',
    'English':      '#7dd4ae',
    'General Awareness': '#b0a0dd',
    'Math':         '#d4b870',
    'GK':           '#b0a0dd',
  };

  qs.forEach((q, i) => {
    const sec = q.section || 'General';
    if (!sections[sec]) sections[sec] = { correct:0, wrong:0, skipped:0, total:0 };
    sections[sec].total++;
    const ans = STATE.answers[i];
    if (ans === undefined)   sections[sec].skipped++;
    else if (ans === q.answer) sections[sec].correct++;
    else                       sections[sec].wrong++;
  });

  const container = document.getElementById('sectionAnalysis');
  container.innerHTML = '';

  Object.entries(sections).forEach(([name, data]) => {
    const score    = data.correct * 2 - data.wrong * 0.5;
    const maxScore = data.total * 2;
    const pct      = Math.max(0, Math.min(100, (score / maxScore) * 100));
    const color    = colors[name] || '#8ecfe8';

    const row = document.createElement('div');
    row.className = 'sa-row anim-fade-up';
    row.innerHTML = `
      <div class="sa-top">
        <div class="sa-name">${name}</div>
        <div class="sa-score">${score >= 0 ? score.toFixed(1) : score.toFixed(1)} / ${maxScore}</div>
      </div>
      <div class="sa-bar-track">
        <div class="sa-bar-fill" style="width:0%;background:${color}" data-target="${pct}"></div>
      </div>
      <div class="sa-mini-stats">
        <div class="sa-mini">✓ Correct: <span class="c">${data.correct}</span></div>
        <div class="sa-mini">✗ Wrong: <span class="w">${data.wrong}</span></div>
        <div class="sa-mini">— Skipped: <span class="s">${data.skipped}</span></div>
      </div>`;
    container.appendChild(row);
  });

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.sa-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 600);
}

function buildChart(correct, wrong, skipped) {
  const canvas = document.getElementById('resultChart');
  const ctx    = canvas.getContext('2d');
  const total  = correct + wrong + skipped;
  const data   = [correct, wrong, skipped];
  const colors = ['rgba(125,212,174,.8)','rgba(224,120,120,.8)','rgba(100,100,120,.5)'];
  const labels = ['Correct','Wrong','Skipped'];

  const W = canvas.offsetWidth;
  const H = 200;
  canvas.width  = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  canvas.style.height = H + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Bar chart
  const barW   = (W - 80) / data.length;
  const maxVal = Math.max(...data, 1);
  const chartH = H - 50;

  data.forEach((val, i) => {
    const x   = 40 + i * barW + barW * .15;
    const bw  = barW * .7;
    const bh  = (val / maxVal) * chartH;
    const y   = chartH - bh + 20;

    // Bar
    const grad = ctx.createLinearGradient(0, y, 0, y + bh);
    grad.addColorStop(0, colors[i]);
    grad.addColorStop(1, colors[i].replace('.8',',.3').replace('.5',',.15'));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, bw, bh, [4,4,0,0]);
    ctx.fill();

    // Value label
    ctx.fillStyle = '#f0ece0';
    ctx.font = 'bold 13px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(val, x + bw/2, y - 6);

    // Bottom label
    ctx.fillStyle = '#6a6058';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(labels[i], x + bw/2, H - 10);
  });
}

// ── REVIEW MODE ──────────────────────────────────────────
function showReview() {
  const sec = document.getElementById('reviewSection');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior:'smooth' });

  const container = document.getElementById('reviewCards');
  container.innerHTML = '';
  const qs = STATE.test.questions;

  qs.forEach((q, i) => {
    const userAns = STATE.answers[i];
    const correct = userAns === q.answer;
    const skipped = userAns === undefined;
    const labels  = ['A','B','C','D','E'];

    const status = skipped ? 'skip' : correct ? 'correct' : 'wrong';
    const statusClass = skipped ? 'skip-q' : correct ? 'correct-q' : 'wrong-q';

    const card = document.createElement('div');
    card.className = `rq-card ${statusClass} anim-fade-up`;

    const badgeMap = {
      correct: '<span class="review-badge rb-correct">✓ Correct</span>',
      wrong:   '<span class="review-badge rb-wrong">✗ Wrong</span>',
      skip:    '<span class="review-badge rb-skipped">— Skipped</span>',
    };

    let optionsHTML = q.options.map((opt, oi) => {
      let cls = 'review-option unselected';
      let prefix = labels[oi] + '.';
      if (oi === q.answer) {
        cls = 'review-option correct-ans';
        prefix += ' ✓';
      }
      if (oi === userAns && userAns !== q.answer) {
        cls = 'review-option wrong-sel';
        prefix += ' ✗';
      }
      return `<div class="${cls}"><strong style="color:var(--txt3);font-family:var(--mono);font-size:11px;flex-shrink:0">${prefix}</strong><span style="font-size:12px;color:var(--txt2)">${opt}</span></div>`;
    }).join('');

    const expHTML = q.explanation
      ? `<div class="explanation-box">
           <div class="exp-label">💡 Explanation</div>
           <div class="exp-text">${q.explanation}</div>
         </div>` : '';

    card.innerHTML = `
      <div class="review-header">
        <strong style="font-family:var(--mono);font-size:11px;color:var(--txt3)">Q${i+1}</strong>
        <span style="font-size:11px;color:var(--txt2);font-family:var(--mono)">${q.section || ''} · ${q.topic || ''}</span>
        ${badgeMap[status]}
      </div>
      <div style="font-size:13px;color:var(--txt);line-height:1.8;margin-bottom:12px">${q.question}</div>
      ${optionsHTML}
      ${expHTML}`;

    container.appendChild(card);
  });
}

function retryTest() {
  clearSavedSession();
  location.reload();
}

function goHome() {
  history.back();
}

// ── KEYBOARD NAVIGATION ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (STATE.submitted) return;
  const screen = document.getElementById('testScreen');
  if (!screen.classList.contains('active')) return;

  const key = e.key;

  if (key === 'ArrowRight') { e.preventDefault(); saveAndNext(); }
  if (key === 'ArrowLeft')  { e.preventDefault(); prevQ(); }
  if (key === 'm' || key === 'M') { e.preventDefault(); toggleMark(); }

  // 1-4 to select options
  if (['1','2','3','4'].includes(key)) {
    const optIdx = parseInt(key) - 1;
    const q = STATE.test.questions[STATE.currentQ];
    if (q && q.options[optIdx] !== undefined) {
      selectOption(STATE.currentQ, optIdx);
    }
  }
});

// ── ANTI-CHEAT ────────────────────────────────────────────
function setupAntiCheat() {
  // Tab switch detection
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !STATE.submitted) {
      STATE.tabViolations++;
      showWarn('tabWarn');
    }
  });

  // Fullscreen exit detection
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !STATE.submitted) {
      showWarn('fsWarn');
    }
  });

  // Prevent right-click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Beforeunload warning
  window.addEventListener('beforeunload', e => {
    if (!STATE.submitted) {
      saveSession();
      e.preventDefault();
      e.returnValue = 'Test is in progress. Are you sure you want to leave?';
    }
  });
}

// ── FULLSCREEN ────────────────────────────────────────────
function enterFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
}

// ── LOCAL STORAGE ─────────────────────────────────────────
function saveSession() {
  if (STATE.submitted) return;
  const data = {
    answers:   STATE.answers,
    visited:   STATE.visited,
    marked:    STATE.marked,
    currentQ:  STATE.currentQ,
    timerLeft: STATE.timerLeft,
    savedAt:   Date.now(),
  };
  localStorage.setItem(SK(), JSON.stringify(data));
}

function getSavedSession() {
  try {
    const raw = localStorage.getItem(SK());
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Expire after 24h
    if (Date.now() - data.savedAt > 86400000) { clearSavedSession(); return null; }
    return data;
  } catch { return null; }
}

function clearSavedSession() {
  localStorage.removeItem(SK());
}

// ── MODALS ────────────────────────────────────────────────
function showModal(id) {
  document.getElementById(id).classList.add('show');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// ── WARNINGS ─────────────────────────────────────────────
function showWarn(id) {
  const el = document.getElementById(id);
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}
function dismissWarn(id) {
  document.getElementById(id).classList.remove('show');
}

// ── MOBILE SIDEBAR ────────────────────────────────────────
let sidebarOpen = false;
function toggleSidebar(forceClose) {
  sidebarOpen = forceClose === false ? false : !sidebarOpen;
  document.getElementById('sidebar').classList.toggle('mobile-open', sidebarOpen);
  document.getElementById('sbOverlay').classList.toggle('show', sidebarOpen);
}

// ── SCREEN SWITCHER ───────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── HELPERS ───────────────────────────────────────────────
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function showError(msg) {
  document.getElementById('loadingText').innerHTML =
    `<span style="color:#e07878;font-size:13px;max-width:300px;text-align:center;line-height:1.7">${msg}</span>`;
}
