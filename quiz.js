/* RankUpExam — quiz.js | Typing Test + Quiz Engine */

// ─── TYPING TEST ───
const passages = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistency is the key to success in any competitive examination.",
  "India has one of the largest railway networks in the world. The Indian Railways connects every corner of the country and employs millions of people.",
  "SSC conducts Combined Graduate Level examination every year to recruit candidates for various Group B and Group C posts in Government departments.",
  "Banking sector in India has grown significantly over the past decade. Public sector banks play a vital role in the economic development of the nation.",
  "General knowledge and current affairs are important sections in almost every government examination conducted in India including SSC and Railway exams."
];
let typingTimer=null, typingTime=60, typingRunning=false, typingStarted=false;
let currentPassage='', typedChars=0, errorCount=0;

function initTyping(){
  currentPassage = passages[Math.floor(Math.random()*passages.length)];
  renderPassage();
  document.getElementById('typingInput').value='';
  document.getElementById('wpmVal').textContent='0';
  document.getElementById('accVal').textContent='100%';
  document.getElementById('errVal').textContent='0';
  document.getElementById('timeVal').textContent=typingTime;
  typingRunning=false; typingStarted=false;
  clearInterval(typingTimer);
}

function renderPassage(typed=''){
  const p = document.getElementById('typingPassage');
  let html='';
  for(let i=0;i<currentPassage.length;i++){
    if(i<typed.length){
      if(typed[i]===currentPassage[i]) html+=`<span class="char-correct">${currentPassage[i]}</span>`;
      else html+=`<span class="char-wrong">${currentPassage[i]}</span>`;
    } else if(i===typed.length){
      html+=`<span class="char-current">${currentPassage[i]}</span>`;
    } else {
      html+=`<span>${currentPassage[i]}</span>`;
    }
  }
  p.innerHTML=html;
}

function startTypingTimer(){
  if(typingStarted||typingRunning) return;
}

function onType(){
  const input = document.getElementById('typingInput');
  const typed = input.value;
  if(!typingStarted && typed.length>0){
    typingStarted=true; typingRunning=true;
    let t=typingTime;
    typingTimer=setInterval(()=>{
      t--;
      document.getElementById('timeVal').textContent=t;
      // WPM
      const words = typed.trim().split(/\s+/).filter(w=>w).length;
      const elapsed = typingTime-t;
      if(elapsed>0) document.getElementById('wpmVal').textContent=Math.round((words/elapsed)*60);
      if(t<=0){
        clearInterval(typingTimer);typingRunning=false;
        input.disabled=true;
        alert(`Test Complete!\nWPM: ${document.getElementById('wpmVal').textContent}\nAccuracy: ${document.getElementById('accVal').textContent}`);
      }
    },1000);
  }
  renderPassage(typed);
  // accuracy
  let correct=0,errors=0;
  for(let i=0;i<typed.length;i++){
    if(i<currentPassage.length){
      if(typed[i]===currentPassage[i]) correct++;
      else errors++;
    }
  }
  errorCount=errors;
  const acc = typed.length>0 ? Math.round((correct/typed.length)*100) : 100;
  document.getElementById('accVal').textContent=acc+'%';
  document.getElementById('errVal').textContent=errors;
}

function setTypingMode(secs, btn){
  typingTime=secs;
  document.querySelectorAll('.t-mode-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  resetTyping();
}

function resetTyping(){
  clearInterval(typingTimer);
  document.getElementById('typingInput').disabled=false;
  initTyping();
}

// Init typing on load
initTyping();

// ─── QUIZ DATA ───
const QD={
  ssc1:{title:'SSC CGL Tier-1 Mock',questions:[
    {q:'Agar A ki age B se 5 saal zyada hai aur ratio 3:2 hai, to A ki age?',opts:['10','15','12','20'],ans:1,exp:'B=2x, A=3x. 3x−2x=5 → x=5. A=15 ✅'},
    {q:'India ka pehla satellite kaun sa tha?',opts:['Bhaskara','Aryabhata','INSAT-1A','Rohini'],ans:1,exp:'Aryabhata — 1975 mein launch hua. ✅'},
    {q:'60 km/h ki speed se 5 minute mein kitni duri?',opts:['4 km','5 km','6 km','3 km'],ans:1,exp:'60km/h = 1km/min. 5×1 = 5 km ✅'},
    {q:'"Satyamev Jayate" kahan se liya gaya?',opts:['Rigveda','Mundaka Upanishad','Bhagavad Gita','Atharva Veda'],ans:1,exp:'Mundaka Upanishad — National Motto. ✅'},
    {q:'ODD ONE OUT: 3, 5, 7, 9, 11',opts:['3','7','9','11'],ans:2,exp:'9 = 3×3 composite hai, baaki sab prime. ✅'},
  ]},
  sscgk:{title:'SSC CGL GK Quick Fire',questions:[
    {q:'PM ka official residence?',opts:['Rashtrapati Bhavan','7 Lok Kalyan Marg','South Block','Teen Murti'],ans:1,exp:'7 Lok Kalyan Marg. ✅'},
    {q:'India ka largest river island?',opts:['Sriharikota','Majuli','Elephanta','Divar'],ans:1,exp:'Majuli — Assam, Brahmaputra. ✅'},
    {q:'Photosynthesis ke liye kaunsa pigment?',opts:['Haemoglobin','Chlorophyll','Melanin','Carotene'],ans:1,exp:'Chlorophyll. ✅'},
    {q:'Satyajit Ray ko Bharat Ratna kab mila?',opts:['1990','1992','1988','1995'],ans:1,exp:'1992 — hospital bed pe award diya gaya. ✅'},
  ]},
  rrb1:{title:'RRB JE General Awareness',questions:[
    {q:'Railway Budget General Budget mein kab merge hua?',opts:['2014','2016','2017','2019'],ans:2,exp:'2017 mein — 92 saal baad. ✅'},
    {q:'Konkan Railway kaunse states se guzarti hai?',opts:['Goa only','MH-Goa','MH-Goa-KA-KL','GJ-MH'],ans:2,exp:'Maharashtra, Goa, Karnataka, Kerala. ✅'},
    {q:'Broad Gauge width?',opts:['1000mm','1435mm','1676mm','762mm'],ans:2,exp:'1676mm — India mein sabse common. ✅'},
    {q:'National Rail Museum kahan?',opts:['Mumbai','Chennai','Kolkata','New Delhi'],ans:3,exp:'New Delhi — Chanakyapuri. ✅'},
  ]},
  bpsc1:{title:'BPSC AEDO Mock Set 1',questions:[
    {q:'Power Factor kya hota hai?',opts:['Active/Apparent Power','Voltage×Current','Reactive/Active','Impedance ratio'],ans:0,exp:'PF = Active(W)/Apparent(VA). Unity PF ideal. ✅'},
    {q:'Transformer efficiency badhane ke liye?',opts:['Core losses badhaao','Copper losses badhaao','Dono losses kam karo','Flux badhaao'],ans:2,exp:'Core + copper losses minimize karo. ✅'},
    {q:'3-phase induction motor synchronous speed?',opts:['Ns=120P/f','Ns=120f/P','Ns=60f/P','Ns=fP/120'],ans:1,exp:'Ns=120f/P. ✅'},
    {q:'Capacitor DC supply se connect karne par?',opts:['Current flow karta rahega','Steady state mein current zero','Burn hoga','Frequency dependent'],ans:1,exp:'Capacitor DC block karta hai. Current→0. ✅'},
  ]},
  rrbtech:{title:'RRB JE Electrical Technical',questions:[
    {q:"Thevenin's theorem equivalent?",opts:['Current source+parallel R','Voltage source+series R','Two voltage sources','Ideal transformer'],ans:1,exp:'Vth + Rth series mein. ✅'},
    {q:"Fleming's Left Hand Rule?",opts:['Generator','Transformer','Motor','Alternator'],ans:2,exp:'Left=Motor, Right=Generator. ✅'},
    {q:'ACSR full form?',opts:['Al Copper Steel Reinforced','Al Conductor Steel Reinforced','Al Core Steel Rail','Advanced Conductor Steel Reinforced'],ans:1,exp:'Aluminium Conductor Steel Reinforced. ✅'},
    {q:'Single phase transformer turns ratio?',opts:['N1/N2=V2/V1','N1/N2=V1/V2','N1×N2=V1×V2','N1+N2'],ans:1,exp:'N1/N2=V1/V2. ✅'},
  ]},
  ca1:{title:'Current Affairs Quiz — June 2026',questions:[
    {q:'India SpaDeX mission mein kya achieve kiya?',opts:['Moon landing','Space docking','Mars orbit','Satellite launch'],ans:1,exp:'Space Docking — India teesra desh bana. ✅'},
    {q:'World Environment Day 2026 ki theme?',opts:['Ocean Protection','Land Restoration','Clean Air','Forest Conservation'],ans:1,exp:'Land Restoration, Desertification & Drought Resilience. ✅'},
    {q:'RBI Repo Rate 2026 mein kitna hai?',opts:['5.5%','5.75%','6.0%','6.25%'],ans:2,exp:'6.0% — MPC ne stable rakha. ✅'},
    {q:'ICC Champions Trophy 2025 winner?',opts:['Australia','Pakistan','India','England'],ans:2,exp:'India — Rohit Sharma ki captaincy mein. ✅'},
  ]},
  comp1:{title:'Computer Awareness Quiz',questions:[
    {q:'CPU ka full form?',opts:['Central Processing Unit','Computer Processing Unit','Central Program Unit','Core Processing Unit'],ans:0,exp:'Central Processing Unit — computer ka brain. ✅'},
    {q:'WWW ka inventor kaun hai?',opts:['Bill Gates','Tim Berners-Lee','Steve Jobs','Mark Zuckerberg'],ans:1,exp:'Tim Berners-Lee — 1989 mein WWW invent kiya. ✅'},
    {q:'RAM ka full form?',opts:['Read Access Memory','Random Access Memory','Rapid Access Memory','Read And Modify'],ans:1,exp:'Random Access Memory — temporary storage. ✅'},
    {q:'1 GB = ?',opts:['1000 MB','1024 MB','512 MB','2048 MB'],ans:1,exp:'1 GB = 1024 MB. ✅'},
  ]}
};

let cQ=null,qi=0,sc=0,ans=false;
function startQuiz(id){
  if(!QD[id]){alert('Coming soon!');return;}
  cQ=QD[id];qi=0;sc=0;ans=false;
  document.getElementById('qTitle').textContent=cQ.title;
  document.getElementById('quizOverlay').classList.add('active');
  renderQ();
}
function renderQ(){
  const q=cQ.questions[qi],t=cQ.questions.length;
  document.getElementById('qProg').style.width=(qi/t*100)+'%';
  document.getElementById('qBody').innerHTML=`
    <div class="q-text">Q${qi+1}/${t} — ${q.q}</div>
    <div class="q-opts">${q.opts.map((o,i)=>`<button class="q-opt" onclick="pick(${i})">${String.fromCharCode(65+i)}) ${o}</button>`).join('')}</div>
    <div class="q-exp" id="qexp">${q.exp}</div>
    <div class="q-footer">
      <div class="q-score-txt">Score: ${sc}/${qi}</div>
      <button class="btn-mock" id="nxtBtn" onclick="nextQ()" style="display:none;width:auto;padding:8px 20px">
        ${qi+1<t?'Next →':'Finish 🎯'}
      </button>
    </div>`;
  ans=false;
}
function pick(i){
  if(ans)return;ans=true;
  const q=cQ.questions[qi];
  document.querySelectorAll('.q-opt').forEach((b,j)=>{
    b.disabled=true;
    if(j===q.ans)b.classList.add('correct');
    else if(j===i&&i!==q.ans)b.classList.add('wrong');
  });
  if(i===q.ans)sc++;
  document.getElementById('qexp').classList.add('show');
  document.getElementById('nxtBtn').style.display='inline-block';
  document.querySelector('.q-score-txt').textContent=`Score: ${sc}/${qi+1}`;
}
function nextQ(){
  qi++;
  if(qi>=cQ.questions.length){showResult();return;}
  renderQ();
}
function showResult(){
  const t=cQ.questions.length,pct=Math.round(sc/t*100);
  const msg=pct>=80?'🏆 Outstanding!':pct>=60?'👍 Accha kiya!':'💪 Aur practice karo.';
  document.getElementById('qProg').style.width='100%';
  const key=Object.keys(QD).find(k=>QD[k]===cQ);
  document.getElementById('qBody').innerHTML=`
    <div class="qresult">
      <div class="qr-pct">${pct}%</div>
      <div class="qr-sub">${sc} out of ${t} correct</div>
      <div class="qr-msg">${msg}</div>
      <div class="qr-btns">
        <button class="btn-mock" style="width:auto;padding:10px 24px" onclick="startQuiz('${key}')">Retry →</button>
        <button class="btn-mock" style="width:auto;padding:10px 24px" onclick="closeQuiz()">Close</button>
      </div>
    </div>`;
}
function closeQuiz(){document.getElementById('quizOverlay').classList.remove('active')}