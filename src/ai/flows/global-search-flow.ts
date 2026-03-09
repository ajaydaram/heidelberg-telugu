'use server';
/**
 * @fileOverview A global AI search agent for the Christian Creeds & Catechisms Library.
 *
 * - globalSearch - A function that handles searching across multiple documents.
 * - GlobalSearchInput - The input type for the globalSearch function.
 * - GlobalSearchOutput - The return type for the globalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchResultSnippetSchema = z.object({
  documentTitle: z.string().describe('The title of the document (e.g., Nicene Creed, Heidelberg Catechism).'),
  sectionTitle: z.string().describe('The section or Lord\'s Day title.'),
  content: z.string().describe('The relevant snippet or Q&A text in Telugu.'),
  referenceId: z.string().describe('An ID or number for navigation (e.g., "q1", "art1").'),
  lordsDayNumber: z.number().optional().describe('The Lord\'s Day number if applicable.'),
});

const GlobalSearchInputSchema = z.object({
  query: z.string().describe('The user\'s natural language query in Telugu.'),
  libraryContext: z.string().describe('The combined text data of all indexed documents.'),
});
export type GlobalSearchInput = z.infer<typeof GlobalSearchInputSchema>;

const GlobalSearchOutputSchema = z.object({
  answer: z.string().describe('A comprehensive answer in Telugu synthesizing information from various creeds.'),
  snippets: z.array(SearchResultSnippetSchema).describe('Specific relevant parts from the documents.'),
});
export type GlobalSearchOutput = z.infer<typeof GlobalSearchOutputSchema>;

export async function globalSearch(input: GlobalSearchInput): Promise<GlobalSearchOutput> {
  return globalSearchFlow(input);
}

const globalSearchPrompt = ai.definePrompt({
  name: 'globalSearchPrompt',
  input: {schema: GlobalSearchInputSchema},
  output: {schema: GlobalSearchOutputSchema},
  prompt: `మీరు ఒక క్రైస్తవ విశ్వాస ప్రమాణాల గ్రంథాలయానికి (Creeds & Catechisms Library) AI నిపుణులు.
మీకు అందించబడిన "libraryContext" లో అనేక విశ్వాస ప్రమాణాలు (ఉదా: నిసియా ప్రమాణం, వెస్ట్‌మినిస్టర్, హీడెల్‌బర్గ్) ఉన్నాయి.

వినియోగదారు అడిగే "query" కు సంబంధించి అన్ని ప్రమాణాల నుండి అత్యంత ఖచ్చితమైన మరియు సంబంధిత సమాచారాన్ని కనుగొనండి.

మీ జవాబు ఈ క్రింది విధంగా ఉండాలి:
1. "answer": వినియోగదారు అడిగిన ప్రశ్నకు వివిధ ప్రమాణాలు ఏమి చెబుతున్నాయో వివరిస్తూ తెలుగులో ఒక చక్కని సారాంశాన్ని అందించండి. ఉదాహరణకు: "పరిశుద్ధాత్మ గురించి నిసియా ప్రమాణం ఆయనను 'ప్రభువును జీవప్రదాత' అని పిలుస్తుండగా, హీడెల్‌బర్గ్ కాటెకిజం ఆయన మనల్ని ఆదరించే వ్యక్తిగా వర్ణిస్తుంది."
2. "snippets": సమాచారానికి ఆధారమైన నిర్దిష్ట భాగాలను ( snippets) అందించండి. ప్రతి స్నిప్పెట్‌లో డాక్యుమెంట్ పేరు, సెక్షన్ మరియు టెక్స్ట్ ఉండాలి.

మీరు శోధిస్తున్న క్వెరీ: "{{{query}}}"

లైబ్రరీ డేటా:
{{{libraryContext}}}
`,
});

const globalSearchFlow = ai.defineFlow(
  {
    name: 'globalSearchFlow',
    inputSchema: GlobalSearchInputSchema,
    outputSchema: GlobalSearchOutputSchema,
  },
  async (input) => {
    const {output} = await globalSearchPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
