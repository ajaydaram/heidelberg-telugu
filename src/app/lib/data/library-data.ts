import { CATECHISM_DATA } from './catechism-data';

export type DocType = 'catechism' | 'confession';
export type Category = 'Ecumenical' | 'Reformed' | 'Lutheran' | 'Anglican' | 'Baptist' | 'Presbyterian' | 'Modern';

export interface LibraryItem {
  id: string;
  number?: number;
  title?: string;
  question?: string;
  answer?: string;
  content?: string;
  scripture?: string[];
  explanation?: string;
}

export interface LibrarySection {
  id: string;
  title: string;
  items: LibraryItem[];
  insights?: string[];
}

export interface LibraryDocument {
  id: string;
  title_te: string;
  title_en: string;
  year: number;
  category: Category;
  type: DocType;
  sections: LibrarySection[];
}

export const LIBRARY_DATA: LibraryDocument[] = [
  {
    id: "heidelberg",
    title_te: "హీడెల్‌బర్గ్ కాటెకిజమ్",
    title_en: "Heidelberg Catechism",
    year: 1563,
    category: "Reformed",
    type: "catechism",
    sections: CATECHISM_DATA.map(day => ({
      id: `h-day-${day.number}`,
      title: day.title + (day.subtitle ? ` - ${day.subtitle}` : ''),
      items: day.entries.map(e => ({
        id: `h-q${e.id}`,
        number: e.questionNumber,
        question: e.question,
        answer: e.answer,
        explanation: e.explanation,
        scripture: e.scriptureReferences?.map(r => r.text)
      })),
      insights: day.insights
    }))
  }
];

export function getLibraryFullText(): string {
  return LIBRARY_DATA.map(doc => {
    const sections = doc.sections.map(s => {
      const items = s.items.map(i => {
        return `${i.title || ''} ${i.question || ''} ${i.answer || ''} ${i.content || ''}`;
      }).join(' ');
      return `${s.title}: ${items}`;
    }).join('\n');
    return `${doc.title_te} (${doc.title_en}): ${sections}`;
  }).join('\n\n');
}
