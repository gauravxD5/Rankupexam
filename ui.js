/* RankUpExam — ui.js | Sidebar, Views, Navigation, Mock Filter */

// ─── SIDEBAR ───
let sidebarOpen = true;
function toggleSidebar(){
  sidebarOpen = !sidebarOpen;
  const sb = document.getElementById('sidebar');
  const mc = document.getElementById('mainContent');
  const hb = document.getElementById('hamburger');
  if(sidebarOpen){sb.classList.remove('closed');mc.classList.remove('full')}
  else{sb.classList.add('closed');mc.classList.add('full')}
  hb.classList.toggle('active',!sidebarOpen);
}
// Mobile: default closed
if(window.innerWidth < 768){
  sidebarOpen = false;
  document.getElementById('sidebar').classList.add('closed');
  document.getElementById('mainContent').classList.add('full');
}

// ─── SUBMENU ───
function toggleSub(id, parentEl){
  const sub = document.getElementById(id);
  if(!sub) return;
  const isOpen = sub.classList.contains('open');
  sub.classList.toggle('open', !isOpen);
  if(parentEl){
    parentEl.classList.toggle('open', !isOpen);
  }
  // open sidebar if closed
  if(!sidebarOpen){ toggleSidebar(); }
}

// ─── VIEWS ───
function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const el = document.getElementById(id+'View');
  if(el) el.classList.add('active');
  window.scrollTo(0,0);
  // highlight sidebar
  document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
}

function showExam(name){
  if(name==='SSC CGL'){showView('sscCgl');return;}
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('examView').classList.add('active');
  document.getElementById('examViewTag').textContent = name;
  document.getElementById('examViewTitle').innerHTML = name + ' <span class="hl">Mock Tests</span>';
  document.getElementById('examMock1').textContent = name + ' — Full Mock Set 1';
  window.scrollTo(0,0);
}

// ─── MOCK FILTER ───
function filterMock(exam, btn){
  document.querySelectorAll('#mockView .exam-tag').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#mockGrid .mock-card').forEach(c=>{
    c.style.display = (exam==='all' || c.dataset.exam===exam) ? '' : 'none';
  });
}
function filterPDF2(exam, btn){
  document.querySelectorAll('#pdfView .exam-tag').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#pdfGrid2 .mock-card').forEach(c=>{
    c.style.display = (exam==='all' || c.dataset.exam===exam) ? '' : 'none';
  });
}