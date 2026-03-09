
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
    title_te: "నీసియ విశ్వాస ప్రమాణము",
    title_en: "Nicene Creed",
    year: 381,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "nc-1",
        title: "1. అద్వితీయ దేవుడు (One God)",
        items: [{
          id: "nc-i1",
          content: "దృశ్యాదృశ్యములైయున్న సమస్తమును సృజించిన సర్వశక్తిగల తండ్రియైన అద్వితీయ దేవుని నేను నమ్ముచున్నాను.",
          scripture: ["ఆదికాండము 1:1", "కొలొస్సయులకు 1:16"]
        }]
      },
      {
        id: "nc-2",
        title: "2. ప్రభువైన యేసుక్రీస్తు (One Lord Jesus Christ)",
        items: [{
          id: "nc-i2",
          content: "దేవుని ఏకకుమారుడును, సమస్త యుగములకు పూర్వము తండ్రి నుండి పుట్టినవాడును, వెలుగు నుండి వెలుగును, నిజమైన దేవుని నుండి నిజమైన దేవుడును, పుట్టినవాడే గాని సృజింపబడినవాడు కాడు. ఆయన తండ్రితో ఏక సత్తా కలిగినవాడు. ఆయన ద్వారా సమస్తమును కలిగెను.",
          scripture: ["యోహాను 1:1", "హెబ్రీయులకు 1:3"]
        }]
      },
      {
        id: "nc-3",
        title: "3. మనుష్యావతారము మరియు రక్షణ (Incarnation & Salvation)",
        items: [{
          id: "nc-i3",
          content: "ఆయన మనుష్యులమైన మన కొరకును, మన రక్షణ కొరకును పరలోకము నుండి దిగివచ్చి, పరిశుద్ధాత్మ వలన కన్యయైన మరియ గర్భమున శరీరధారియై మనుష్యుడుగా పుట్టెను. ఆయన పొంతి పిలాతు అధికారము క్రింద మన కొరకు సిలువ వేయబడి, శ్రమపడి, సమాధి చేయబడెను. లేఖనముల ప్రకారము మూడవ దినమున ఆయన పునరుత్థానుడై పరలోకమునకు ఎక్కి తండ్రి కుడిపార్శ్వమున కూర్చునియున్నాడు. సజీవులకును చనిపోయినవారికిని తీర్పు తీర్చుటకు ఆయన ప్రభావముతో తిరిగి వచ్చును. ఆయన రాజ్యమునకు అంతముండదు.",
          scripture: ["మత్తయి 1:23", "1 కొరింథీయులకు 15:3-4", "లూకా 1:33"]
        }]
      },
      {
        id: "nc-4",
        title: "4. పరిశుద్ధాత్మ మరియు సంఘము (The Holy Spirit & The Church)",
        items: [{
          id: "nc-i4",
          content: "ప్రభువును జీవదాతయునైన పరిశుద్ధాత్మను నేను నమ్ముచున్నాను. ఆయన తండ్రి నుండియు కుమారుని నుండియు బయలుదేరుచున్నాడు. ఆయన తండ్రితోను కుమారునితోను కలిసి ఆరాధింపబడుచు, మహిమపరచబడుచున్నాడు. ఆయన ప్రవక్తల ద్వారా మాట్లాడెను. అద్వితీయమైన, పరిశుద్ధమైన, సార్వత్రికమైన, అపొస్తలికమైన సంఘమును నేను నమ్ముచున్నాను. పాపక్షమాపణ కొరకైన అద్వితీయ బాప్తిస్మమును నేను అంగీకరించుచున్నాను. చనిపోయినవారి పునరుత్థానము కొరకును, రాబోవు లోకములోని నిత్యజీవము కొరకును నేను ఎదురుచూచుచున్నాను. ఆమేన్.",
          scripture: ["యోహాను 15:26", "ఎఫెసీయులకు 4:4-5", "ప్రకటన 21:4"]
        }]
      }
    ]
  },
  {
    id: "chalcedonian-creed",
    title_te: "కాల్సెదోనియ విశ్వాస ప్రకటన",
    title_en: "Chalcedonian Creed",
    year: 451,
    category: "Ecumenical",
    type: "confession",
    sections: [
      {
        id: "cc-1",
        title: "1. దైవత్వము మరియు మనుష్యత్వము (Divinity and Humanity)",
        items: [{
          id: "cc-i1",
          content: "పరిశుద్ధ పితరులను అనుసరించి, మేమందరము ఏకగ్రీవముగా మా ప్రభువైన యేసుక్రీస్తును అద్వితీయ కుమారునిగా ఒప్పుకొనుచున్నాము. ఆయన దైవత్వమందు సంపూర్ణుడు, మనుష్యత్వమందును సంపూర్ణుడు. ఆయన నిజమైన దేవుడు మరియు హేతుబద్ధమైన ఆత్మయు శరీరమును కలిగిన నిజమైన మనుష్యుడు.",
          scripture: ["యోహాను 20:28", "తీతుకు 2:13", "హెబ్రీయులకు 2:14"]
        }]
      },
      {
        id: "cc-2",
        title: "2. ఏక సత్తా మరియు జననము (Co-essential and Begotten)",
        items: [{
          id: "cc-i2",
          content: "ఆయన దైవత్వమును బట్టి తండ్రితో <glossary term=\"Substance\">ఏక సత్తా (సారము)</glossary> కలిగినవాడు, మనుష్యత్వమును బట్టి పాపము తప్ప సమస్త విషయములలో మనతో ఏక సత్తా కలిగినవాడు. ఆయన దైవత్వమును బట్టి యుగములకు పూర్వము తండ్రి నుండి పుట్టినవాడు.",
          scripture: ["యోహాను 10:30", "హెబ్రీయులకు 4:15"]
        }]
      },
      {
        id: "cc-3",
        title: "3. రెండు స్వభావములు (Two Natures in One Person)",
        items: [{
          id: "cc-i3",
          content: "ఆయన అద్వితీయ కుమారుడును, ప్రభువును అయిన క్రీస్తుగా రెండు స్వభావములలో గుర్తించబడవలెను. ఈ రెండు స్వభావములు <b>కలగాపులగము కాకుండ (without confusion)</b>, <b>మార్పు చెందకుండ (without change)</b>, <b>విభజింపబడకుండ (without division)</b>, <b>ఎడబాయకుండ (without separation)</b> ఉండును. ఈ రెండు స్వభావముల భేదము ఐక్యత వలన తొలగిపోదు.",
          scripture: ["రోమీయులకు 1:3-4", "1 తిమోతి 2:5"]
        }]
      },
      {
        id: "cc-4",
        title: "4. అద్వితీయ వ్యక్తి (One and the Same Person)",
        items: [{
          id: "cc-i4",
          content: "ఆయన ఇద్దరు వ్యక్తులుగా విభజింపబడలేదు, కానీ అద్వితీయ కుమారుడును, వాక్యమును, ప్రభువైన యేసుక్రీస్తునై యున్నాడు. పూర్వకాలపు ప్రవక్తలు ఆయనను గూర్చి సాక్ష్యమిచ్చినట్లు, ప్రభువైన యేసుక్రీస్తు స్వయముగా మనకు బోధించినట్లు ఇది ఉన్నది.",
          scripture: ["అపొస్తలుల కార్యములు 10:43", "యోహాను 14:6"]
        }]
      }
    ]
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

  // --- ANGLICAN ---
  {
    id: "anglican-catechism",
    title_te: "ఆంగ్లికన్ కాటెకిజమ్",
    title_en: "Anglican Catechism",
    year: 1662,
    category: "Anglican",
    type: "catechism",
    sections: [{ id: "ang-c1", title: "బాప్తిస్మము", items: [{ id: "ang-q1", number: 1, question: "నీ పేరు ఏమిటి?", answer: "నాకు బాప్తిస్మము ఇచ్చినప్పుడు ఈ పేరు పెట్టబడింది." }] }]
  },

  // --- PRESBYTERIAN ---
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
    id: "keach-catechism",
    title_te: "కీచ్ కాటెకిజమ్",
    title_en: "Keach’s Catechism",
    year: 1693,
    category: "Baptist",
    type: "catechism",
    sections: [{ id: "kc-1", title: "సృష్టి", items: [{ id: "kc-q1", number: 1, question: "దేవుడు మనల్ని ఎందుకు సృష్టించాడు?", answer: "తన మహిమ కొరకు దేవుడు మనల్ని సృష్టించాడు." }] }]
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
