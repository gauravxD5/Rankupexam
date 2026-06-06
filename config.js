/**
 * RankUpExam — config.js
 * NO ES module syntax — plain script so app.js can access CONFIG globally
 */

const CONFIG = {
  siteName:       "RankUpExam",
  tagline:        "60+10 Day SSC CGL Operating System",
  siteUrl:        "https://rankupexam.in",
  telegram:       "https://t.me/rankupexam",
  telegramHandle: "@rankupexam",
  youtube:        "https://youtube.com/@rankupexam",
  youtubeHandle:  "@rankupexam",
  instagram:      "https://instagram.com/rankupexam",
  instagramHandle:"@rankupexam",
  email:          "rankupexam@gmail.com",
  founder:        "Guru",

  // Program
  totalDays:  70,
  startDate:  "2026-06-08",
  storageKey: "rankupexam_v4",
  adminKey:   "rankupexam_admin_v1",

  // Firebase — used by signin.html separately
  firebase: {
    apiKey:            "AIzaSyB2qvYKnVC5dcH9GQ7KoybiG3F9LNG3W_Q",
    authDomain:        "rankupexam-e0df5.firebaseapp.com",
    projectId:         "rankupexam-e0df5",
    storageBucket:     "rankupexam-e0df5.firebasestorage.app",
    messagingSenderId: "684780784484",
    appId:             "1:684780784484:web:51ac3d6f42dd1c219f4871",
    measurementId:     "G-BFHJ0L6D41"
  },

  xpLevels: [
    { name:"Beginner",     min:0,    max:500   },
    { name:"Intermediate", min:500,  max:1500  },
    { name:"Expert",       min:1500, max:3000  },
    { name:"Master",       min:3000, max:6000  },
    { name:"Elite",        min:6000, max:99999 }
  ],
  xpRewards: { pdf:25, mock:75, yt:25, ytAnalysis:15, check:5, complete:100 },

  tgCtaTitle: "Daily Tricks on Telegram — RankUpExam",
  tgCtaSub:   "Roz ek shortcut trick, PYQ analysis, aur motivation. 1000+ aspirants already joined!",
  footerNote: "© 2026 RankUpExam.in · 100% Free · No Paywall",
};

window.CONFIG = CONFIG;
