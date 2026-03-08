'use server';
/**
 * @fileOverview A Genkit flow for searching the Heidelberg Catechism content in Telugu.
 *
 * - searchCatechismContent - A function that handles searching the Catechism text.
 * - SearchCatechismContentInput - The input type for the searchCatechismContent function.
 * - SearchCatechismContentOutput - The return type for the searchCatechismContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CatechismPassageSchema = z.object({
  lordsDayNumber: z.number().describe('The number of the Lord\'s Day.'),
  question: z.string().describe('The Telugu question from the Catechism.'),
  answer: z.string().describe('The Telugu answer from the Catechism.'),
});

const SearchCatechismContentInputSchema = z.object({
  query: z.string().describe('The natural language query in Telugu to search the Catechism text.'),
  catechismText: z.string().describe(
    'The entire Heidelberg Catechism text in Telugu. ' +
    'It is structured, where each section starts with "ప్రభువు దినము <number>:", ' +
    'followed by "ప్రశ్న <number>:" and "జవాబు <number>:". ' +
    'Example format: "ప్రభువు దినము 1: ప్రశ్న 1: మీ యొక్క ఏకైక ఊరట ఏమిటి? జవాబు 1: ..."'
  ),
});
export type SearchCatechismContentInput = z.infer<typeof SearchCatechismContentInputSchema>;

const SearchCatechismContentOutputSchema = z.object({
  relevantPassages: z.array(CatechismPassageSchema).describe('An array of relevant Catechism passages found based on the query.'),
  summary: z.string().describe('A brief summary in Telugu of how the relevant passages address the query.'),
});
export type SearchCatechismContentOutput = z.infer<typeof SearchCatechismContentOutputSchema>;

export async function searchCatechismContent(input: SearchCatechismContentInput): Promise<SearchCatechismContentOutput> {
  return searchCatechismContentFlow(input);
}

const searchCatechismContentPrompt = ai.definePrompt({
  name: 'searchCatechismContentPrompt',
  input: {schema: SearchCatechismContentInputSchema},
  output: {schema: SearchCatechismContentOutputSchema},
  prompt: `మీరు తెలుగులో హీడెల్‌బర్గ్ కాటెకిజమ్ టెక్స్ట్ ద్వారా శోధించడానికి సహాయపడే ఒక నిపుణులైన శోధన ఇంజిన్.
మీకు "catechismText" అనే టెక్స్ట్ అందించబడుతుంది, ఇది "ప్రభువు దినము <number>:", "ప్రశ్న <number>:" మరియు "జవాబు <number>:" వంటి శీర్షికలతో నిర్మాణాత్మకంగా ఉంటుంది.

వినియోగదారు అడిగిన "query" ఆధారంగా "catechismText" నుండి అత్యంత సంబంధిత భాగాలను కనుగొనండి.
ప్రతి సంబంధిత భాగం కోసం, "lordsDayNumber", "question" మరియు "answer" లను ఖచ్చితంగా సంగ్రహించండి.
సంబంధిత భాగాలను కనుగొన్న తర్వాత, క్వెరీని అవి ఎలా పరిష్కరిస్తాయో తెలుగులో సంక్షిప్త సారాంశాన్ని "summary" లో అందించండి.
ఎక్కువ సంబంధిత ఫలితాలు లేకపోతే, ఖాళీ "relevantPassages" శ్రేణిని తిరిగి ఇవ్వండి మరియు అది ఎందుకు జరిగిందో వివరించే సారాంశాన్ని అందించండి.

ఉదాహరణకు, మీరు "ప్రభువు దినము 1:" తర్వాత "ప్రశ్న 1: మీ యొక్క ఏకైక ఊరట ఏమిటి?" మరియు "జవాబు 1: జీవించినా చనిపోయినా నేను నా సొంతం కాను, కానీ నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తు సొంతం." అనే టెక్స్ట్ ను కనుగొనవచ్చు.

మీరు ఈ క్రింది "query" కోసం శోధిస్తున్నారు: "{{{query}}}"

శోధించడానికి కాటెకిజమ్ టెక్స్ట్:
{{{catechismText}}}
`,
});

const searchCatechismContentFlow = ai.defineFlow(
  {
    name: 'searchCatechismContentFlow',
    inputSchema: SearchCatechismContentInputSchema,
    outputSchema: SearchCatechismContentOutputSchema,
  },
  async (input) => {
    const {output} = await searchCatechismContentPrompt(input);
    if (!output) {
      throw new Error('Failed to get output from prompt.');
    }
    return output;
  }
);
