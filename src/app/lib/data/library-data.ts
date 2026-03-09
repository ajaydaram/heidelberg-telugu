
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
        id: "ac-intro",
        title: "పరిచయం",
        items: [{
          id: "ac-i0",
          content: "అపొస్తలుల విశ్వాస ప్రమాణము క్రైస్తవ చర్చీలలో అత్యంత ప్రాచీనమైన మరియు విస్తృతంగా అంగీకరించబడిన విశ్వాస సారాంశం. ఇది అపొస్తలుల బోధనల ఆధారంగా రూపొందించబడింది. ఇది తండ్రి, కుమార, పరిశుద్ధాత్మ అనే త్రిత్వ దేవుని గురించి మరియు సంఘం, పాపక్షమాపణ, నిత్యజీవం గురించి స్పష్టంగా ప్రకటిస్తుంది."
        }]
      },
      {
        id: "ac-1",
        title: "1. తండ్రియైన దేవుడు (God the Father)",
        items: [{
          id: "ac-i1",
          title: "విశ్వాసం",
          content: "భూమ్యాకాశములను సృజించిన సర్వశక్తిగల తండ్రియైన దేవుని నేను నమ్ముచున్నాను.",
          scripture: ["ఆదికాండము 1:1", "యెషయా 44:24", "అపొస్తలుల కార్యములు 4:24"]
        }]
      },
      {
        id: "ac-2",
        title: "2. కుమారుడైన యేసుక్రీస్తు (God the Son)",
        items: [{
          id: "ac-i2",
          content: "ఆయన ఏకకుమారుడును మన ప్రభువునైన యేసుక్రీస్తును నమ్ముచున్నాను. ఈయన పరిశుద్ధాత్మ వలన గర్భమున ధరింపబడి, కన్యయైన మరియకు పుట్టి, పొంతి పిలాతు అధికారము క్రింద శ్రమపడి, సిలువ వేయబడి, చనిపోయి, సమాధి చేయబడెననియు, పాతాళములోనికి దిగెననియు, చనిపోయిన వారిలో నుండి మూడవ దినమున లేచి, పరలోకమునకు ఎక్కి, సర్వశక్తిగల తండ్రియైన దేవుని కుడిపార్శ్వమున కూర్చునియున్నాడనియు, అక్కడ నుండి సజీవులకును చనిపోయినవారికిని తీర్పు తీర్చుటకు వచ్చుననియు నమ్ముచున్నాను.",
          scripture: [
            "మత్తయి 1:18-25 (కన్యక గర్భము)",
            "లూకా 23 (శ్రమలు, సిలువ)",
            "1 కొరింథీయులకు 15:3-4 (పునరుత్థానము)",
            "అపొస్తలుల కార్యములు 1:9-11 (ఆరోహణము)",
            "2 తిమోతి 4:1 (తీర్పు)"
          ]
        }]
      },
      {
        id: "ac-3",
        title: "3. పరిశుద్ధాత్మ మరియు సంఘము (The Holy Spirit and the Church)",
        items: [{
          id: "ac-i3",
          content: "పరిశుద్ధాత్మను నమ్ముచున్నాను. పరిశుద్ధులైన సార్వత్రిక సంఘమును, పరిశుద్ధుల సహవాసమును, పాపక్షమాపణయు, శరీర పునరుత్థానమును, నిత్యజీవమును నమ్ముచున్నాను. ఆమేన్.",
          scripture: [
            "యోహాను 14:16-17 (పరిశుద్ధాత్మ)",
            "ఎఫెసీయులకు 4:4-6 (సంఘము)",
            "1 యోహాను 1:7 (సహవాసము)",
            "ఎఫెసీయులకు 1:7 (పాపక్షమాపణ)",
            "యోహాను 5:28-29 (పునరుత్థానము)",
            "యోహాను 3:16 (నిత్యజీవము)"
          ]
        }]
      }
    ]
  },
  {
    id: "nicene-creed",
    title_te: "నిసియా విశ్వాస ప్రమాణము",
    title_en: "Nicene Creed",
    year: 381,
    category: "Ecumenical",
    type: "confession",
    sections: [{
      id: "nc-1", title: "ప్రమాణము",
      items: [{ id: "nc-i1", title: "త్రిత్వము", content: "దృశ్యాదృశ్యమైన సమస్తమును సృజించిన సర్వశక్తిగల తండ్రియైన అద్వితీయ దేవుని నమ్ముచున్నాము..." }]
    }]
  },
  {
    id: "chalcedonian-creed",
    title_te: "కాల్సిడోనియన్ విశ్వాస ప్రమాణము",
    title_en: "Chalcedonian Creed",
    year: 451,
    category: "Ecumenical",
    type: "confession",
    sections: [{ id: "cc-1", title: "క్రీస్తు స్వభావము", items: [{ id: "cc-i1", content: "మనం మన ప్రభువైన యేసుక్రీస్తును ఒక్కరిగాను, పరిపూర్ణ దైవత్వమును, పరిపూర్ణ మానవత్వమును కలిగిన వానిగా ఒప్పుకుంటున్నాము..." }] }]
  },
  {
    id: "athanasian-creed",
    title_te: "అథనాసియన్ విశ్వాస ప్రమాణము",
    title_en: "Athanasian Creed",
    year: 800,
    category: "Ecumenical",
    type: "confession",
    sections: [{ id: "at-1", title: "త్రిత్వ సత్యము", items: [{ id: "at-i1", content: "త్రిత్వమందున్న దేవునిని ఆరాధించడం సార్వత్రిక విశ్వాసం..." }] }]
  },

  // --- LUTHERAN ---
  {
    id: "luther-small-catechism",
    title_te: "లూథర్ చిన్న కాటెకిజమ్",
    title_en: "Luther's Small Catechism",
    year: 1529,
    category: "Lutheran",
    type: "catechism",
    sections: [{ id: "lsc-1", title: "పది ఆజ్ఞలు", items: [{ id: "lsc-q1", number: 1, question: "మొదటి ఆజ్ఞ అంటే ఏమిటి?", answer: "నేనే నీ దేవుడైన యెహోవాను. నా యెదుట నీకు వేరొక దేవుడు ఉండకూడదు." }] }]
  },
  {
    id: "augsburg-confession",
    title_te: "ఆగ్స్‌బర్గ్ విశ్వాస ప్రమాణము",
    title_en: "Augsburg Confession",
    year: 1530,
    category: "Lutheran",
    type: "confession",
    sections: [{ id: "ac-1", title: "దైవత్వము", items: [{ id: "ac-i1", content: "దేవుడు ఒక్కడే అని, ఆయనలో మూడు వ్యక్తులు ఉన్నారని మేము బోధిస్తున్నాము..." }] }]
  },

  // --- REFORMED ---
  {
    id: "heidelberg",
    title_te: "హీడెల్‌బర్గ్ కాటెకిజమ్",
    title_en: "Heidelberg Catechism",
    year: 1563,
    category: "Reformed",
    type: "catechism",
    sections: [{
      id: "h-1", title: "ఏకైక ఆదరణ",
      items: [{ id: "h-q1", number: 1, question: "జీవితంలోను, మరణంలోను నీ ఏకైక ఆదరణ ఏమిటి?", answer: "నేను నా సొంతవాడను కాను, కానీ నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తుకు చెందినవాడను..." }]
    }]
  },
  {
    id: "belgic-confession",
    title_te: "బెల్జిక్ విశ్వాస ప్రమాణము",
    title_en: "Belgic Confession",
    year: 1561,
    category: "Reformed",
    type: "confession",
    sections: [{ id: "bc-1", title: "దేవుని జ్ఞానము", items: [{ id: "bc-i1", content: "దేవుడు ఒక్కడే అని, ఆయన సకల సంపూర్ణతకు మూలమని మేము నమ్ముతున్నాము..." }] }]
  },
  {
    id: "canons-of-dort",
    title_te: "డోర్ట్ నియమావళి",
    title_en: "Canons of Dort",
    year: 1619,
    category: "Reformed",
    type: "confession",
    sections: [{ id: "cd-1", title: "దైవిక ఎన్నిక", items: [{ id: "cd-i1", content: "దేవుడు తన కృప చేత కొందరిని రక్షణకు ఎన్నుకున్నాడు..." }] }]
  },

  // --- ANGLICAN ---
  {
    id: "thirty-nine-articles",
    title_te: "ముప్పై తొమ్మిది నిబంధనలు",
    title_en: "Thirty-Nine Articles",
    year: 1562,
    category: "Anglican",
    type: "confession",
    sections: [{ id: "39a-1", title: "పరిశుద్ధ త్రిత్వము", items: [{ id: "39a-i1", content: "దేవుడు ఒక్కడే, ఆయన జీవము గలవాడు మరియు సత్యవంతుడు..." }] }]
  },
  {
    id: "anglican-catechism",
    title_te: "ఆంగ్లికన్ కాటెకిజమ్",
    title_en: "Anglican Catechism",
    year: 1662,
    category: "Anglican",
    type: "catechism",
    sections: [{ id: "ang-c1", title: "బాప్తిస్మము", items: [{ id: "ang-q1", number: 1, question: "నీ పేరు ఏమిటి?", answer: "నాకు బాప్తిస్మము ఇచ్చినప్పుడు ఈ పేరు పెట్టబడింది." }] }]
  },

  // --- PRESBYTERIAN (Westminster) ---
  {
    id: "westminster-confession",
    title_te: "వెస్ట్‌మినిస్టర్ విశ్వాస ప్రమాణము",
    title_en: "Westminster Confession",
    year: 1647,
    category: "Presbyterian",
    type: "confession",
    sections: [{ id: "wc-1", title: "పరిశుద్ధ లేఖనము", items: [{ id: "wc-i1", content: "ప్రకృతి వెలుగు దేవుని ఉనికిని చాటినప్పటికీ, రక్షణకు లేఖనములు అత్యవసరము..." }] }]
  },
  {
    id: "westminster-shorter-catechism",
    title_te: "వెస్ట్‌మినిస్టర్ చిన్న కాటెకిజమ్",
    title_en: "Westminster Shorter Catechism",
    year: 1648,
    category: "Presbyterian",
    type: "catechism",
    sections: [{ id: "wsc-1", title: "నరుని ముఖ్య ఉద్దేశ్యం", items: [{ id: "wsc-q1", number: 1, question: "నరుని ముఖ్య ఉద్దేశ్యం ఏమిటి?", answer: "దేవునిని మహిమపరచడం మరియు ఆయనను నిరంతరము ఆనందించడం." }] }]
  },

  // --- BAPTIST ---
  {
    id: "london-baptist-confession",
    title_te: "లండన్ బాప్టిస్ట్ విశ్వాస ప్రమాణము",
    title_en: "London Baptist Confession",
    year: 1689,
    category: "Baptist",
    type: "confession",
    sections: [{ id: "lbc-1", title: "లేఖనములు", items: [{ id: "lbc-i1", content: "పరిశుద్ధ లేఖనములే విశ్వాసమునకు మరియు జీవితమునకు ఏకైక నియమము..." }] }]
  },
  {
    id: "keach-catechism",
    title_te: "కీచ్ కాటెకిజమ్",
    title_en: "Keach’s Catechism",
    year: 1693,
    category: "Baptist",
    type: "catechism",
    sections: [{ id: "kc-1", title: "సృష్టి", items: [{ id: "kc-q1", number: 1, question: "దేవుడు మనల్ని ఎందుకు సృష్టించాడు?", answer: "తన మహిమ కొరకు దేవుడు మనల్ని సృష్టించాడు." }] }]
  },

  // --- MODERN ---
  {
    id: "barmen-declaration",
    title_te: "బార్మెన్ ప్రకటన",
    title_en: "Barmen Declaration",
    year: 1934,
    category: "Modern",
    type: "confession",
    sections: [{ id: "bd-1", title: "క్రీస్తు అధికారం", items: [{ id: "bd-i1", content: "యేసుక్రీస్తు మాత్రమే దేవుని యొక్క ఏకైక వాక్యము..." }] }]
  },
  {
    id: "chicago-statement",
    title_te: "చికాగో ప్రకటన (బైబిలు సత్యము)",
    title_en: "Chicago Statement",
    year: 1978,
    category: "Modern",
    type: "confession",
    sections: [{ id: "cs-1", title: "లేఖనాల అధికారం", items: [{ id: "cs-i1", content: "బైబిలు దైవప్రేరణ ద్వారా ఇవ్వబడింది మరియు అది అమోఘమైనది..." }] }]
  },
  {
    id: "nashville-statement",
    title_te: "నాష్‌విల్ ప్రకటన",
    title_en: "Nashville Statement",
    year: 2017,
    category: "Modern",
    type: "confession",
    sections: [{ id: "ns-1", title: "వివాహము మరియు లింగము", items: [{ id: "ns-i1", content: "దేవుడు మనుష్యులను పురుషులుగాను మరియు స్త్రీలుగాను సృష్టించాడు..." }] }]
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
