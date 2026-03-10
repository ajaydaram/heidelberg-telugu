
# జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్.

## 🛡️ సెక్యూరిటీ గమనిక (Security Note)
మీ API కీలు ఇప్పుడు సురక్షితంగా ఉన్నాయి. మనం ఎన్విరాన్మెంట్ వేరియబుల్స్ ఉపయోగిస్తున్నాము మరియు అవి GitHubకు వెళ్లకుండా `.gitignore` సెట్ చేయబడింది. 

**ముఖ్య గమనిక:** ఎప్పుడూ కూడా `.env.local` ఫైల్‌ను కమిట్ చేయకండి.

## 🚀 పబ్లిష్ చేసే విధానం (Deployment Steps)

యాప్‌ను Firebase App Hosting ద్వారా లైవ్ చేయడానికి ఈ స్టెప్స్ ఫాలో అవ్వండి:

### 1. కోడ్‌ను పుష్ చేయండి
టెర్మినల్‌లో ఇవి రన్ చేయండి:
```bash
git add .
git commit -m "Deploy: finalize secure environment config"
git push origin main
```

### 2. Firebase App Hosting సెటప్
1. [Firebase Console](https://console.firebase.google.com/) లో మీ ప్రాజెక్ట్‌ను ఎంచుకోండి.
2. **App Hosting** కి వెళ్లి **"Get Started"** క్లిక్ చేయండి.
3. మీ GitHub రిపోజిటరీని కనెక్ట్ చేసి, `main` బ్రాంచ్‌ను ఎంచుకోండి.

### 3. Environment Variables (అత్యంత ముఖ్యం)
సెటప్ చేసేటప్పుడు (మీరు స్క్రీన్‌షాట్‌లో చూపిస్తున్న చోట) లేదా సెటప్ అయిన తర్వాత **Settings > Environment Variables** లో ఈ క్రింది కీలను తప్పకుండా యాడ్ చేయండి:

| Key | Value (మీ Firebase Config నుండి) |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | (మీ కొత్త API కీ) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `studio-5468980590-60a46.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `studio-5468980590-60a46` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `studio-5468980590-60a46.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | (మీ కాన్ఫిగ్ లోని నంబర్) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | (మీ యాప్ ID) |

**గమనిక:** స్క్రీన్‌షాట్‌లో మీరు చూపిస్తున్న ప్రాజెక్ట్ ID `studio-5468980590-60a46`. కాబట్టి పైన ఇచ్చిన విలువలను సరిచూసుకోండి.

## 🛠️ టెక్నాలజీ (Tech Stack)
- **Framework:** Next.js 15
- **Backend:** Firebase
- **Styling:** Tailwind CSS, ShadCN UI
- **AI:** Google Genkit
