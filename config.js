/**
 * ═══════════════════════════════════════════════════════
 *  RankUpExam — config.js
 *  Edit this file to update branding, links, Firebase,
 *  social handles, and contact info.
 *  DO NOT edit index.html for any of these changes.
 * ═══════════════════════════════════════════════════════
 */

const CONFIG = {

  // ── Site identity ──────────────────────────────────────
  siteName:    "RankUpExam",
  tagline:     "60+10 Day SSC CGL Operating System",
  description: "60 din mein poora syllabus + weekly mix tests. Last 10 din — sirf Full Length Tests. Roz PDF notes, 15-min mock (25 Qs), aur YouTube video solution.",
  founder:     "Guru",

  // ── Program settings ──────────────────────────────────
  totalDays:   70,
  startDate:   "2026-06-08",   // ← DO NOT CHANGE after launch

  // ── Social / contact ──────────────────────────────────
  email:          "rankupexam@gmail.com",
  telegram:       "https://t.me/rankupexam",
  telegramHandle: "@rankupexam",
  youtube:        "https://youtube.com/@rankupexam",
  youtubeHandle:  "@rankupexam",
  instagram:      "https://instagram.com/rankupexam",
  instagramHandle:"@rankupexam",
  githubPages:    "https://rankupexam.github.io",   // update after deploy

  // ── Firebase ──────────────────────────────────────────
  // Replace with your actual Firebase project credentials
  firebase: {
    apiKey:            "AIzaSyB2qyVKnVC5dcH9GQ7KoybiG3F9LNG3W_Q",
    authDomain:        "rankupexam-e0df5.firebaseapp.com",
    projectId:         "rankupexam-e0df5",
    storageBucket:     "rankupexam-e0df5.firebasestorage.app",
    messagingSenderId: "684780784484",
    appId:             "1:684780784484:web:51ac3d6f42dd1c219f4871",
    measurementId:     "G-BFHJ0L6D41"
  },

  // ── XP / Level thresholds ─────────────────────────────
  xpLevels: [
    { name: "Beginner",     min: 0,    max: 500   },
    { name: "Intermediate", min: 500,  max: 1500  },
    { name: "Expert",       min: 1500, max: 3000  },
    { name: "Master",       min: 3000, max: 6000  },
    { name: "Elite",        min: 6000, max: 99999 }
  ],

  // XP rewards per action
  xpRewards: { pdf: 25, mock: 75, yt: 25, ytAnalysis: 15, check: 5, complete: 100 },

  // ── Admin ─────────────────────────────────────────────
  // Access via ?admin=true in URL — persists in localStorage
  adminKey: "rankupexam_admin_v1",

  // ── localStorage key ──────────────────────────────────
  storageKey: "rankupexam_v4",

  // ── Telegram CTA copy ─────────────────────────────────
  tgCtaTitle: "Daily Tricks on Telegram — RankUpExam",
  tgCtaSub:   "Roz ek shortcut trick, PYQ analysis, aur motivation. 1000+ aspirants already joined!",

  // ── Footer / legal ────────────────────────────────────
  footerNote: "© 2026 RankUpExam. Designed for SSC CGL aspirants.",

};

// Make available globally
window.CONFIG = CONFIG;
