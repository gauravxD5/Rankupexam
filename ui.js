/* RankUpExam — ui.js | Sidebar, Views, Navigation, Mock Filter */

// ─── SIDEBAR ───
let sidebarOpen = true;
function toggleSidebar(){
  sidebarOpen = !sidebarOpen;
  const sb = document.getElementById('sidebar');
  const mc = document.getElementById('mainContent');
  const hb = document.getElementById('hamburger');
  if(sb) sb.classList.toggle('closed', !sidebarOpen);
  if(mc) mc.classList.toggle('full',   !sidebarOpen);
  if(hb) hb.classList.toggle('active', !sidebarOpen);
}

// Mobile: start closed
window.addEventListener('DOMContentLoaded', () => {
  if(window.innerWidth < 900){
    sidebarOpen = false;
    const sb = document.getElementById('sidebar');
    const mc = document.getElementById('mainContent');
    if(sb) sb.classList.add('closed');
    if(mc) mc.classList.add('full');
  }
});

// ─── SUBMENU ───
function toggleSub(id, parentEl){
  const sub = document.getElementById(id);
  if(!sub) return;
  const isOpen = sub.classList.contains('open');
  sub.classList.toggle('open', !isOpen);
  if(parentEl) parentEl.classList.toggle('open', !isOpen);
  if(!sidebarOpen) toggleSidebar();
}

// ─── VIEWS ───
function showView(id){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(id + 'View');
  if(el) el.classList.add('active');
  window.scrollTo(0, 0);
  document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));

  // CGL OS sticky header
  const hdr = document.getElementById('cglStickyHdr');
  if(hdr) hdr.style.display = id === 'sscCgl' ? 'block' : 'none';

  // Init CGL OS on first open
  if(id === 'sscCgl') {
    setTimeout(() => {
      if(typeof initCglOS === 'function') initCglOS();
    }, 50);
  }

  // Close mobile sidebar
  if(window.innerWidth < 900 && sidebarOpen) toggleSidebar();
}

function showExam(name){
  if(name === 'SSC CGL'){ showView('sscCgl'); return; }
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('examView');
  if(el) el.classList.add('active');
  const tag = document.getElementById('examViewTag');
  const ttl = document.getElementById('examViewTitle');
  const m1  = document.getElementById('examMock1');
  if(tag) tag.textContent = name;
  if(ttl) ttl.innerHTML  = name + ' <span class="hl">Mock Tests</span>';
  if(m1)  m1.textContent  = name + ' — Full Mock Set 1';
  window.scrollTo(0, 0);
}

// ─── MOCK FILTER ───
function filterMock(exam, btn){
  document.querySelectorAll('#mockView .exam-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#mockGrid .mock-card').forEach(c => {
    c.style.display = (exam === 'all' || c.dataset.exam === exam) ? '' : 'none';
  });
}

function filterPDF2(exam, btn){
  document.querySelectorAll('#pdfView .exam-tag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#pdfGrid2 .mock-card').forEach(c => {
    c.style.display = (exam === 'all' || c.dataset.exam === exam) ? '' : 'none';
  });
}
