# జ్ఞాన బోధ (Heidelberg Catechism Telugu)

హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) యొక్క తెలుగు అనువాదం మరియు వివరణాత్మక అధ్యయన యాప్. ఇది క్రైస్తవ విశ్వాస సత్యాలను 52 వారాల (ప్రభువు దినములు) పాఠాలుగా అందిస్తుంది.

## 🚀 ఫీచర్లు (Features)

- **సంపూర్ణ బోధనలు:** మొత్తం 52 ప్రభువు దినముల (Lord's Days) ప్రశ్నలు మరియు జవాబులు తెలుగులో.
- **AI సెర్చ్:** జెంకిట్ (Genkit) ద్వారా పనిచేసే ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ శోధన.
- **పురోగతి ట్రాకింగ్:** మీరు ఏ పాఠాలు పూర్తి చేశారో గుర్తుంచుకోవడానికి 'Mark as Read' మరియు 'Continue Reading'.
- **E-Ink Optimization:** Boox Go 10.3 వంటి డివైజ్‌ల కోసం ప్రత్యేకమైన హై-కాంట్రాస్ట్ థీమ్.
- **ఆఫ్‌లైన్ సదుపాయం:** ఒకసారి లోడ్ అయిన తర్వాత ఇంటర్నెట్ లేకపోయినా చదువుకోవచ్చు (PWA).

## 🛠️ టెక్నాలజీ (Tech Stack)

- **Framework:** Next.js 15 (App Router)
- **Backend:** Firebase (Authentication, App Hosting)
- **UI:** Tailwind CSS, ShadCN UI, Lucide Icons
- **Fonts:** Mandali (Body), Gidugu (Headings)

## 📦 పబ్లిష్ చేసే విధానం (Deployment Guide)

ఈ యాప్‌ను **Firebase App Hosting** ద్వారా పబ్లిష్ చేయడానికి ఈ స్టెప్స్ ఫాలో అవ్వండి:

### 1. GitHub పుష్
ముందుగా మీ కోడ్‌ను GitHubకు పుష్ చేయండి. రహస్య కీలు (`.env`) వెళ్లకుండా `.gitignore` ఇప్పటికే సెట్ చేయబడింది.
```bash
git add .
git commit -m "Final version for publishing"
git push origin main
```

### 2. Firebase App Hosting కనెక్ట్ చేయడం
- Firebase Consoleలో **App Hosting** విభాగంలోకి వెళ్లి మీ GitHub రిపోజిటరీని కనెక్ట్ చేయండి.
- బిల్డ్ సెట్టింగ్స్‌లో "Next.js" ఆటోమేటిక్‌గా గుర్తించబడుతుంది.

### 3. Environment Variables సెట్ చేయడం (ముఖ్యమైనది)
యాప్ లైవ్ అయ్యాక సరిగ్గా పనిచేయడానికి Firebase Consoleలో ఈ వేరియబుల్స్ జోడించండి:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 💻 లోకల్ డెవలప్‌మెంట్

```bash
npm install
npm run dev
```

---
దేవుని మహిమ కొరకు మరియు విశ్వాసుల క్షేమం కొరకు అభివృద్ధి చేయబడింది.