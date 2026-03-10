/**
 * Firebase Client Configuration
 * 
 * Note: These values are public and safe to be exposed in client-side code
 * as long as security rules are properly configured.
 */
export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-5468980590-60a46",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:663520245955:web:fdd30037010257c2fc4a76",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDP-luz-WuMkZ4_2noIgD7AqBCWkunex0U",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-5468980590-60a46.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "663520245955"
};
