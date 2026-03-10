# జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్.

## 🚀 సెక్యూరిటీ గమనిక (Security Note) - అత్యవసరం

మీ API కీ పొరపాటున GitHub హిస్టరీలో ఎక్స్‌పోజ్ అయింది. దీనిని పరిష్కరించడానికి మీరు మీ కంప్యూటర్‌లో ఈ క్రింది కమాండ్స్ రన్ చేయాలి:

### **1. హిస్టరీ నుండి పాత కీని తొలగించడానికి:**
మీ టెర్మినల్ (Terminal) లో ఈ మూడు లైన్లను రన్ చేయండి:
```bash
git rm --cached .env
git commit -m "Remove sensitive files from history"
git push origin main
```

### **2. కొత్త కీని సెటప్ చేయడానికి:**
మీ ప్రాజెక్ట్ ఫోల్డర్‌లో `.env.local` అనే ఫైల్‌ను సృష్టించి (ఒకవేళ లేకపోతే), అందులో మీ కొత్త కీని ఇలా జోడించండి:
`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC4lGRKUGnV_GGoFo_0kEJl52PIbr5SBj0`

## 🛠️ టెక్నాలజీ (Tech Stack)
- **Framework:** Next.js 15
- **Backend:** Firebase (App Hosting)
- **Fonts:** Mandali, Gidugu

## 📦 ప్రచురణ (Deployment)
1. GitHubకు కోడ్‌ను పుష్ చేయండి.
2. Firebase Consoleలో 'App Hosting' కనెక్ట్ చేయండి.
3. Firebase Dashboardలో Environment Variables సెట్ చేయడం మర్చిపోకండి.
