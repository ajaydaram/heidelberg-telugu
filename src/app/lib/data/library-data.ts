
import { CATECHISM_DATA } from './catechism-data';

export type DocType = 'catechism' | 'confession';
export type Category = 'Ecumenical' | 'Reformed' | 'Lutheran' | 'Anglican' | 'Baptist' | 'Presbyterian' | 'Congregational' | 'Modern';

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
  // --- REFORMED ---
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
        id: `h-q${e.questionNumber}`,
        number: e.questionNumber,
        question: e.question,
        answer: e.answer,
        explanation: e.explanation,
        scripture: e.scriptureReferences?.map(r => r.text)
      })),
      insights: day.insights
    }))
  },

  // --- ECUMENICAL ---
  {
    id: "apostles-creed",
    title_te: "అపొస్తలుల విశ్వాస ప్రమాణము",
    title_en: "Apostles' Creed",
    year: 650,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "ac-1",
        title: "విశ్వాస ప్రకటన",
        items: [
          {
            id: "ac-i1",
            title: "తండ్రియైన దేవుడు",
            content: "భూమ్యాకాశములను సృజించిన సర్వశక్తిగల తండ్రియైన దేవుని నేను నమ్ముచున్నాను.",
            scripture: ["ఆదికాండము 1:1", "యెషయా 44:24"]
          },
          {
            id: "ac-i2",
            title: "కుమారుడైన యేసుక్రీస్తు",
            content: "ఆయన ఏకకుమారుడును మన ప్రభువునైన యేసుక్రీస్తును నమ్ముచున్నాను. ఈయన పరిశుద్ధాత్మ వలన గర్భమున ధరింపబడి, కన్యయైన మరియకు పుట్టి, పొంతి పిలాతు అధికారము క్రింద శ్రమపడి, సిలువ వేయబడి, చనిపోయి, సమాధి చేయబడెననియు, పాతాళములోనికి దిగెననియు, చనిపోయిన వారిలో నుండి మూడవ దినమున లేచి, పరలోకమునకు ఎక్కి, సర్వశక్తిగల తండ్రియైన దేవుని కుడిపార్శ్వమున కూర్చునియున్నాడనియు, అక్కడ నుండి సజీవులకును చనిపోయినవారికిని తీర్పు తీర్చుటకు వచ్చుననియు నమ్ముచున్నాను.",
            scripture: ["మత్తయి 1:18-25", "లూకా 23", "1 కొరింథీయులకు 15:3-4"]
          },
          {
            id: "ac-i3",
            title: "పరిశుద్ధాత్మ మరియు సంఘము",
            content: "పరిశుద్ధాత్మను నమ్ముచున్నాను. పరిశుద్ధులైన సార్వత్రిక సంఘమును, పరిశుద్ధుల సహవాసమును, పాపక్షమాపణయు, శరీర పునరుత్థానమును, నిత్యజీవమును నమ్ముచున్నాను. ఆమేన్.",
            scripture: ["యోహాను 14:16-17", "ఎఫెసీయులకు 4:4-6"]
          }
        ]
      }
    ]
  },
  {
    id: "nicene-creed",
    title_te: "నీసియ విశ్వాస ప్రమాణము",
    title_en: "Nicene Creed",
    year: 381,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "nc-1",
        title: "నీసియ విశ్వాస ప్రకటన",
        items: [
          {
            id: "nc-i1",
            title: "అద్వితీయ దేవుడు",
            content: "దృశ్యాదృశ్యములైయున్న సమస్తమును సృజించిన సర్వశక్తిగల తండ్రియైన అద్వితీయ దేవుని నేను నమ్ముచున్నాను.",
            scripture: ["ఆదికాండము 1:1"]
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
        return `${doc.type === 'catechism' ? 'ప్రశ్న ' + i.number + ': ' + i.question + ' జవాబు: ' + i.answer : (i.title || 'ఆర్టికల్') + ': ' + i.content}`;
      }).join('\n');
      return `${s.title}:\n${itemsText}`;
    }).join('\n');
    return `డాక్యుమెంట్: ${doc.title_te} (${doc.title_en})\n${sectionsText}`;
  }).join('\n\n---\n\n');
}
