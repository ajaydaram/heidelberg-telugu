# జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్.

## 🛡️ సెక్యూరిటీ స్టేటస్ (Security Status)
మీ API కీలు ఇప్పుడు సురక్షితంగా ఉన్నాయి. మనం ఎన్విరాన్మెంట్ వేరియూబుల్స్ (`.env.local`) ఉపయోగిస్తున్నాము మరియు అవి GitHubకు వెళ్లకుండా `.gitignore` సెట్ చేయబడింది.

### **ముఖ్య గమనిక:**
ఒకవేళ మీరు పొరపాటున కీలను GitHubకు పుష్ చేస్తే, వెంటనే Google Cloud Consoleలో కీని **Rotate** చేయండి. పాత కీలను ఎప్పుడూ వాడకండి.

## 🚀 పబ్లిష్ చేయడం ఎలా (Deployment Steps)

యాప్‌ను లైవ్ చేయడానికి ఈ 3 స్టెప్స్ ఫాలో అవ్వండి:

### 1. GitHubకు పుష్ చేయండి
టెర్మినల్‌లో ఈ కమాండ్స్ రన్ చేయండి:
```bash
git add .
git commit -m "Build: ready for deployment"
git push origin main
```

### 2. Firebase App Hosting కనెక్ట్ చేయండి
1. [Firebase Console](https://console.firebase.google.com/) కు వెళ్లండి.
2. మీ ప్రాజెక్ట్‌ను ఎంచుకుని, **Build > App Hosting** క్లిక్ చేయండి.
3. **"Get Started"** నొక్కి మీ GitHub రిపోజిటరీని కనెక్ట్ చేయండి.

### 3. Firebaseలో Environment Variables సెట్ చేయండి
మనం సెక్యూరిటీ కోసం కీలను GitHubకు పంపలేదు కాబట్టి, Firebase డాష్‌బోర్డ్‌లో వాటిని మాన్యువల్‌గా ఇవ్వాలి:
1. App Hosting సెట్టింగ్స్‌లో **Environment Variables** విభాగానికి వెళ్లండి.
2. అక్కడ మీ `.env.local` లో ఉన్న కీలను (ఉదా: `NEXT_PUBLIC_FIREBASE_API_KEY`) యాడ్ చేయండి.

## 🛠️ టెక్నాలజీ (Tech Stack)
- **Framework:** Next.js 15
- **Backend:** Firebase (Auth, Firestore)
- **Styling:** Tailwind CSS, ShadCN UI
- **PWA:** ఆఫ్‌లైన్ రీడింగ్ సపోర్ట్.
