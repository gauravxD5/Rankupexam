/**
 * ═══════════════════════════════════════════════════════
 *  RankUpExam — auth.js
 *  Firebase authentication module.
 *  Google Sign-In, persistent session, logout.
 *  Depends on: config.js (must load first)
 * ═══════════════════════════════════════════════════════
 */

import { initializeApp }             from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider,
         signInWithPopup, signOut,
         onAuthStateChanged }         from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// ── Init ──────────────────────────────────────────────────
const app      = initializeApp(window.CONFIG.firebase);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// ── UI helpers ────────────────────────────────────────────
function setLoggedIn(user) {
  document.getElementById('authLoginBtn').style.display  = 'none';
  const uw = document.getElementById('authUser');
  uw.style.display = 'flex';
  const photo = user.photoURL || '';
  document.getElementById('authAvatar').src    = photo;
  document.getElementById('authDdAvatar').src  = photo;
  const first = (user.displayName || 'User').split(' ')[0];
  document.getElementById('authName').textContent    = first;
  document.getElementById('authDdName').textContent  = user.displayName || '';
  document.getElementById('authDdEmail').textContent = user.email || '';
  // Notify app layer
  window.dispatchEvent(new CustomEvent('ru:login', { detail: { user } }));
}

function setLoggedOut() {
  document.getElementById('authLoginBtn').style.display = 'flex';
  document.getElementById('authUser').style.display     = 'none';
  window.dispatchEvent(new Event('ru:logout'));
}

// ── Auth state observer (restores session on refresh) ─────
onAuthStateChanged(auth, user => {
  if (user) setLoggedIn(user);
  else      setLoggedOut();
});

// ── Sign In ───────────────────────────────────────────────
window.signInWithGoogle = async function () {
  const btn = document.getElementById('authGoogleBtn');
  const txt = document.getElementById('googleBtnText');
  btn.disabled = true;
  btn.classList.add('loading');
  txt.textContent = 'Signing in…';
  try {
    const result = await signInWithPopup(auth, provider);
    closeAuthModal();
    setLoggedIn(result.user);
  } catch (e) {
    txt.textContent = 'Continue with Google';
    btn.disabled = false;
    btn.classList.remove('loading');
    if (e.code !== 'auth/popup-closed-by-user')
      alert('Sign-in failed: ' + e.message);
  }
};

// ── Sign Out ──────────────────────────────────────────────
window.authSignOut = async function () {
  await signOut(auth);
  setLoggedOut();
  document.getElementById('authUserDd').classList.remove('open');
};
