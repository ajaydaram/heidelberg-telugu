
export type DocType = 'catechism' | 'confession';
export type Category = 'Ecumenical' | 'Reformed' | 'Baptist' | 'Lutheran';

export interface LibraryItem {
  id: string;
  number?: number;
  title?: string;
  question?: string;
  answer?: string;
  content?: string;
  scripture?: string[];
}

export interface LibrarySection {
  id: string;
  title: string;
  items: LibraryItem[];
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
    sections: [
      {
        id: "day-1",
        title: "లార్డ్స్ డే 1",
        items: [
          {
            id: "q1",
            number: 1,
            question: "జీవితంలోను, మరణంలోను నీ ఏకైక ఆదరణ ఏమిటి?",
            answer: "నేను నాకు చెందినవాడను కాదు గానీ, నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తుకు చెందినవాడను...",
            scripture: ["1 కొరింథీయులకు 6:19-20", "రోమీయులకు 14:8"]
          }
        ]
      }
    ]
  },
  {
    id: "apostles-creed",
    title_te: "అపోస్తలుల విశ్వాస ప్రమాణము",
    title_en: "Apostles' Creed",
    year: 150,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "creed-body",
        title: "ప్రమాణము",
        items: [
          {
            id: "art1",
            title: "విశ్వాసము",
            content: "భూమ్యాకాశములను సృజించిన సర్వశక్తిగల తండ్రియైన దేవుని నేను నమ్ముచున్నాను. ఆయన ఏక కుమారుడును మన ప్రభువైన యేసుక్రీస్తును నమ్ముచున్నాను..."
          }
        ]
      }
    ]
  }
];
