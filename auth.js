/**
 * RankUpExam — auth.js
 * Firebase Auth — Google Sign-in
 * Plain script version (no ES module export issues)
 */

// Auth functions exposed globally for nav pill + signin page
window.rankupAuth = {
  user: null,
  
  init: async function() {
    // Only run if Firebase is available
    if (typeof firebase === 'undefined') return;
    
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
      = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
    
    const app  = initializeApp(CONFIG.firebase, 'rankupexam');
    const auth = getAuth(app);
    const prov = new GoogleAuthProvider();
    
    onAuthStateChanged(auth, (user) => {
      window.rankupAuth.user = user;
      window.rankupAuth.updateNavPill(user);
    });
    
    window.rankupAuth._auth = auth;
    window.rankupAuth._prov = prov;
    window.rankupAuth._signOut = () => signOut(auth);
    window.rankupAuth._signIn  = () => signInWithPopup(auth, prov);
  },
  
  updateNavPill: function(user) {
    const pill = document.getElementById('nav-signin-btn');
    if (!pill) return;
    if (user) {
      pill.classList.add('signed-in');
      pill.innerHTML = user.photoURL
        ? `<img src="${user.photoURL}" class="nsp-avatar" alt=""> <span class="nsp-txt">${user.displayName.split(' ')[0]}</span>`
        : `<span class="nsp-icon">✅</span><span class="nsp-txt">${user.displayName.split(' ')[0]}</span>`;
    } else {
      pill.classList.remove('signed-in');
      pill.innerHTML = '<span class="nsp-icon">👤</span><span class="nsp-txt">Sign In</span>';
    }
  }
};

// Try init (will silently fail if Firebase SDK not loaded)
try { window.rankupAuth.init(); } catch(e) {}
