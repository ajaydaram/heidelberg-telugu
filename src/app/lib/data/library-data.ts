
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
            answer: "నేను నా సొంతవాడను కాను, కానీ నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తుకు చెందినవాడను. ఆయన తన అమూల్యమైన రక్తముతో నా పాపములన్నిటికీ పూర్తి ప్రాయశ్చిత్తము చేసి, నన్ను అపవాది యొక్క అధికారము నుండి విడిపించాడు.",
            scripture: ["1 కొరింథీయులకు 6:19-20", "రోమీయులకు 14:8"]
          }
        ]
      }
    ]
  },
  {
    id: "nicene-creed",
    title_te: "నిసియా విశ్వాస ప్రమాణము",
    title_en: "Nicene Creed",
    year: 325,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "nicene-body",
        title: "ప్రమాణము",
        items: [
          {
            id: "nicene-1",
            title: "తండ్రి",
            content: "దృశ్యాదృశ్యమైన సమస్తమును సృజించిన సర్వశక్తిగల తండ్రియైన అద్వితీయ దేవుని నమ్ముచున్నాము."
          },
          {
            id: "nicene-2",
            title: "కుమారుడు",
            content: "దేవుని అద్వితీయ కుమారుడును, సమస్త యుగములకు పూర్వము తండ్రి నుండి జన్మించినవాడును, వెలుగు నుండి వెలుగును, నిజమైన దేవుని నుండి నిజమైన దేవుడునైన అద్వితీయ ప్రభువైన యేసుక్రీస్తును నమ్ముచున్నాము."
          },
          {
            id: "nicene-3",
            title: "పరిశుద్ధాత్మ",
            content: "ప్రభువును జీవప్రదాతయునైన పరిశుద్ధాత్మను నమ్ముచున్నాము. ఆయన తండ్రి నుండియు కుమారుని నుండియు బయలువెడలి, తండ్రితోను కుమారునితోను సమానముగా ఆరాధింపబడి మహిమపరచబడుచున్నాడు."
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
            content: "భూమ్యాకాశములను సృజించిన సర్వశక్తిగల తండ్రియైన దేవుని నేను నమ్ముచున్నాను. ఆయన ఏక కుమారుడును మన ప్రభువైన యేసుక్రీస్తును నమ్ముచున్నాను. ఈయన పరిశుద్ధాత్మ వలన గర్భమున ధరింపబడి, కన్యయైన మరియకు పుట్టి..."
          }
        ]
      }
    ]
  }
];

export function getLibraryFullText(): string {
  return LIBRARY_DATA.map(doc => {
    const sectionsText = doc.sections.map(s => {
      const itemsText = s.items.map(i => {
        return `${doc.type === 'catechism' ? 'ప్రశ్న ' + i.number + ': ' + i.question + ' జవాబు: ' + i.answer : i.title + ': ' + i.content}`;
      }).join('\n');
      return `${s.title}:\n${itemsText}`;
    }).join('\n');
    return `డాక్యుమెంట్: ${doc.title_te} (${doc.title_en})\n${sectionsText}`;
  }).join('\n\n---\n\n');
}
