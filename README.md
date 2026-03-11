
# 📖 జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్. ఇది క్రైస్తవ విశ్వాస పునాదులను సులభంగా అర్థం చేసుకోవడానికి రూపొందించబడిన ఒక ఆధునిక డిజిటల్ ప్లాట్‌ఫారమ్.

## ✨ ముఖ్య ఫీచర్లు (Key Features)

- **పూర్తి తెలుగు అనువాదం:** 52 ప్రభు దినములు (Lord's Days) మరియు 129 ప్రశ్నలు-జవాబులు.
- **లేఖన ఆధారాలు:** ప్రతి జవాబుకు తగిన బైబిలు రిఫరెన్సులు.
- **విభిన్న మోడ్స్:** చదువుకోవడానికి వీలుగా Light, Dark, మరియు కంటికి హాయినిచ్చే E-Ink మోడ్స్.
- **PWA సపోర్ట్:** యాప్‌ను మీ ఫోన్ లేదా కంప్యూటర్‌లో ఇన్‌స్టాల్ చేసుకుని ఆఫ్‌లైన్‌లో కూడా వాడుకోవచ్చు.
- **AI సెర్చ్:** మీరు అడిగే ప్రశ్నలకు కాటెకిజం నుండి సరైన సమాధానాలను వెతికి ఇచ్చే AI సదుపాయం.

## 🚀 సాంకేతిక వివరాలు (Tech Stack)

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS & ShadCN UI
- **Backend:** Firebase (Firestore & Auth)
- **AI:** Google Genkit (Gemini 2.5 Flash)

## 🛠️ సెటప్ మరియు పబ్లిష్ (Deployment)

ఈ యాప్ **Firebase App Hosting** ద్వారా విజయవంతంగా లైవ్ చేయబడింది.

### Environment Variables
యాప్ సరిగ్గా పనిచేయడానికి Firebase App Hosting డాష్‌బోర్డ్‌లో ఈ క్రింది వేరియబుల్స్ సెట్ చేయాలి:

| Key | Description |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | మీ Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `intermediate-telugu.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `intermediate-telugu` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `intermediate-telugu.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | (Firebase Config నుండి) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | (Firebase Config నుండి) |

## 🛡️ భద్రత (Security)
భద్రతా కారణాల దృష్ట్యా, API కీలు నేరుగా కోడ్‌లో లేవు. అవి కేవలం `Environment Variables` ద్వారా మాత్రమే యాక్సెస్ చేయబడతాయి. గిట్ హిస్టరీ నుండి పాత కీలు తొలగించబడ్డాయి.

---
Developed with ❤️ for the Telugu Christian Community.
