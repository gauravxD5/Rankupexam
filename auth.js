/**
 * ═══════════════════════════════════════════════════
 *  RankUpExam — auth.js
 *  Google Sign-in / Sign-out / Auth State
 * ═══════════════════════════════════════════════════
 */

import { auth } from "./config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginBtn  = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");
const userBox   = document.getElementById("user-box");

// ── Sign In ──
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user   = result.user;

      localStorage.setItem("rankup-user", JSON.stringify({
        name:  user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid:   user.uid
      }));

      window.location.reload();

    } catch (error) {
      alert("Sign-in failed: " + error.message);
      console.error(error);
    }
  });
}

// ── Sign Out ──
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("rankup-user");
    window.location.reload();
  });
}

// ── Auth State Listener ──
onAuthStateChanged(auth, (user) => {
  if (user && userBox) {
    userBox.innerHTML = `
      <div class="user-profile">
        <img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar">
        <div class="user-info">
          <h3 class="user-name">${user.displayName}</h3>
          <p class="user-email">${user.email}</p>
        </div>
      </div>
    `;
  }

  // Update nav sign-in button across site
  const navSignInBtn = document.getElementById("nav-signin-btn");
  if (navSignInBtn) {
    if (user) {
      navSignInBtn.innerHTML = `<img src="${user.photoURL}" style="width:22px;height:22px;border-radius:50%;object-fit:cover;border:1px solid var(--gold)"> ${user.displayName.split(' ')[0]}`;
      navSignInBtn.onclick = () => window.location.href = '/signin.html';
    } else {
      navSignInBtn.textContent = 'Sign In';
      navSignInBtn.onclick = () => window.location.href = '/signin.html';
    }
  }
});

// ── Helper: get current user from localStorage (sync) ──
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("rankup-user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
