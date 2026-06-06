/**
 * ═══════════════════════════════════════════════════
 *  RankUpExam — config.js
 *  Firebase + App Configuration
 * ═══════════════════════════════════════════════════
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyB2qvYKnVC5dcH9GQ7KoybiG3F9LNG3W_Q",
  authDomain:        "rankupexam-e0df5.firebaseapp.com",
  projectId:         "rankupexam-e0df5",
  storageBucket:     "rankupexam-e0df5.firebasestorage.app",
  messagingSenderId: "684780784484",
  appId:             "1:684780784484:web:51ac3d6f42dd1c219f4871",
  measurementId:     "G-BFHJ0L6D41"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ── App-wide constants (edit here for branding) ──
export const CONFIG = {
  siteName:    "RankUpExam",
  siteUrl:     "https://rankupexam.vercel.app",
  telegram:    "https://t.me/rankupexam",
  youtube:     "https://youtube.com/@rankupexam",
  instagram:   "https://instagram.com/rankupexam",
  email:       "rankupexam@gmail.com",
  cglStart:    "2026-06-08",   // 70-day plan start date
  totalDays:   70,
};
