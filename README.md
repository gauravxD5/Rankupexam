# RankUpExam

India's free government exam preparation platform.

**Live:** [rankupexam.vercel.app](https://rankupexam.vercel.app)

---

## Folder Structure

```
rankupexam/
├── index.html              ← Main site
├── style.css               ← All styles
├── config.js               ← CONFIG (branding, Firebase keys)
├── data.js                 ← 70-day SSC CGL plan + Hard Shifts
├── auth.js                 ← Auth logic (Firebase ready)
├── ui.js                   ← Sidebar, views, navigation
├── quiz.js                 ← Quiz & typing test engine
├── app.js                  ← CGL OS core (XP, Timer, Roadmap)
├── signin.html             ← Google Sign-in page
├── disclaimer.html
├── privacy-policy.html
├── terms.html
├── sitemap.xml
├── mock/
│   ├── index.html          ← Mock test engine (mock.html?id=X)
│   ├── mock.css
│   └── mock.js
└── data/
    ├── flt/
    │   └── flt-01.json
    ├── reasoning/
    │   └── reasoning-01.json
    ├── math/
    │   └── math-01.json
    ├── english/
    │   └── english-01.json
    └── gk/
        └── gk-01.json
```

---

## Mock Test URLs

```
/mock/?id=flt-01          → Full Length Test (25Q, 60min)
/mock/?id=reasoning-01    → Reasoning Sectional
/mock/?id=math-01         → Mathematics Sectional
/mock/?id=english-01      → English Sectional
/mock/?id=gk-01           → General Awareness Sectional
```

---

## Adding Firebase Auth

1. Create project at [firebase.google.com](https://firebase.google.com)
2. Enable Google Sign-in in Authentication
3. Copy your config keys
4. Uncomment the Firebase script in `signin.html`
5. Update `config.js` with your Firebase config

---

## Adding New Tests

1. Create JSON in correct `data/` subfolder
2. Format: see `data/flt/flt-01.json`
3. URL: `/mock/?id=your-test-id`
4. No HTML editing needed — engine auto-loads

---

Built by RankUpExam | rankupexam@gmail.com | [@rankupexam](https://youtube.com/@rankupexam)
