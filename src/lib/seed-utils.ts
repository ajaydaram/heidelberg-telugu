'use client';

import { Firestore, doc, setDoc, writeBatch, collection } from 'firebase/firestore';
import { CATECHISM_DATA } from '@/app/lib/data/catechism-data';

/**
 * Utility to seed the local CATECHISM_DATA into Firestore.
 * This follows the structure defined in backend.json.
 */
export async function seedCatechismData(db: Firestore) {
  const batch = writeBatch(db);

  for (const day of CATECHISM_DATA) {
    // 1. Create the Lord's Day document
    const dayRef = doc(db, "lords_days", `day-${day.number}`);
    batch.set(dayRef, {
      id: `day-${day.number}`,
      dayNumber: day.number,
      titleTelugu: day.title,
      subtitle: day.subtitle || "",
      insights: day.insights || []
    });

    // 2. Create sub-collection for Q&A pairs
    for (const entry of day.entries) {
      const qaRef = doc(db, "lords_days", `day-${day.number}`, "catechism_qas", `q-${entry.questionNumber}`);
      batch.set(qaRef, {
        id: `q-${entry.questionNumber}`,
        lordSDayId: `day-${day.number}`,
        questionNumber: entry.questionNumber,
        questionTextTelugu: entry.question,
        answerTextTelugu: entry.answer,
        explanation: entry.explanation || "",
        scriptureReferences: entry.scriptureReferences || []
      });
    }
  }

  await batch.commit();
  console.log("Catechism data successfully seeded to Firestore!");
}
