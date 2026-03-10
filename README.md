# జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్.

## 🛡️ సెక్యూరిటీ స్టేటస్ (Security Status)
మీ API కీలు ఇప్పుడు సురక్షితంగా ఉన్నాయి. మనం ఎన్విరాన్మెంట్ వేరియబుల్స్ (`.env.local`) ఉపయోగిస్తున్నాము మరియు అవి GitHubకు వెళ్లకుండా `.gitignore` సెట్ చేయబడింది.

### **ఒకవేళ మీరు మళ్ళీ కీ మార్చాల్సి వస్తే:**
1. `.env.local` ఫైల్‌లో మార్చండి.
2. Firebase Console (App Hosting) లో కూడా 'Environment Variables' అప్‌డేట్ చేయండి.

## 🚀 పబ్లిష్ చేయడం ఎలా (Deployment)
1. మీ కోడ్‌ను GitHubకు పుష్ చేయండి: `git push origin main`.
2. Firebase Consoleలో 'App Hosting' ద్వారా కనెక్ట్ చేయండి.
3. Firebase Dashboardలో `NEXT_PUBLIC_FIREBASE_API_KEY` మరియు `NEXT_PUBLIC_FIREBASE_PROJECT_ID` వేరియబుల్స్ సెట్ చేయడం మర్చిపోకండి.

## 🛠️ టెక్నాలజీ (Tech Stack)
- **Framework:** Next.js 15 (App Router)
- **Backend:** Firebase (Auth, Firestore)
- **Styling:** Tailwind CSS, ShadCN UI
- **PWA:** Offline reading support included.
