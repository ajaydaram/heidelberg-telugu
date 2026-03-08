
"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Info, History, Sparkles, LayoutGrid, Heart, Play } from "lucide-react"

interface CatechismIntroProps {
  isReadingMode: boolean
  onStart: () => void
}

export function CatechismIntro({ isReadingMode, onStart }: CatechismIntroProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12">
      <div className="text-center mb-12">
        {!isReadingMode && (
          <Badge variant="outline" className="mb-2 text-primary border-primary/30 px-4 py-1">
            Introduction
          </Badge>
        )}
        <h2 className={cn(
          "telugu-heading font-bold",
          isReadingMode ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"
        )}>
          హైడెల్బర్గ్ కేటకిజం: ఒక పరిచయం
        </h2>
        <p className={cn(
          "telugu-text text-foreground/60 mt-2",
          isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        )}>
          విశ్వాసపు పునాదులను అర్థం చేసుకోవడం
        </p>
        <div className="mt-6 w-24 h-1 bg-accent mx-auto rounded-full opacity-60" />
      </div>

      <div className="grid gap-8">
        {/* Section 1 */}
        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">1. కేటకిజం అంటే ఏమిటి?</h3>
          </div>
          <p className="telugu-text text-lg md:text-xl leading-relaxed text-foreground/80">
            "కేటకిజం" అనే పదం గ్రీకు భాషలోని <strong>katecheo</strong> నుండి వచ్చింది, దీని అర్థం <strong>"నోటి మాట ద్వారా బోధించడం."</strong> ఇది క్రైస్తవ విశ్వాసంలోని ప్రాథమిక సత్యాలను ప్రశ్నలు మరియు జవాబుల రూపంలో నేర్చుకునే ఒక పద్ధతి. అపోస్తలుల కాలం నుండి సత్యమైన ఉపదేశాన్ని తర్వాతి తరానికి అందించడానికి సంఘం దీనిని ఉపయోగిస్తోంది.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent-foreground flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">2. దీని చరిత్ర (The History)</h3>
          </div>
          <ul className="space-y-4 telugu-text text-lg md:text-xl text-foreground/80">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>ఎప్పుడు:</strong> ఇది క్రీ.శ. 1563లో ప్రచురించబడింది.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>ఎక్కడ:</strong> జర్మనీలోని హైడెల్బర్గ్ (Heidelberg) అనే నగరంలో.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>ఎవరూ:</strong> ఫ్రెడరిక్ III అనే రాజు కోరిక మేరకు, జకారియాస్ ఉర్సినస్ మరియు కాస్పర్ ఒలేవియానస్ అనే ఇద్దరు యువ దైవజనులు దీనిని రాశారు.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span><strong>ఎందుకు:</strong> అప్పట్లో సంఘంలో ఉన్న విభేదాలను తొలగించి, బైబిలు సత్యాలను సామాన్య ప్రజలకు సులభంగా అర్థమయ్యేలా వివరించడానికి దీనిని తయారు చేశారు.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">3. దీని ప్రత్యేకత ఏమిటి?</h3>
          </div>
          <p className="telugu-text text-lg md:text-xl leading-relaxed text-foreground/80 italic">
            చాలా కేటకిజంలు కేవలం తర్కంతో (Logic) కూడిన విషయాలను చెబుతాయి, కానీ హైడెల్బర్గ్ కేటకిజం <strong>హృదయాన్ని తాకేలా</strong> ఉంటుంది. ఇది "మనం ఏమి నమ్మాలి?" అని మాత్రమే చెప్పదు, కానీ "ఆ నమ్మకం నీకు ఎలాంటి <strong>ఆదరణను (Comfort)</strong> ఇస్తుంది?" అని అడుగుతుంది.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">4. దీని నిర్మాణం: మూడు 'G'లు</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <h4 className="telugu-heading text-xl font-bold text-primary mb-2">1. Guilt (దోషం)</h4>
              <p className="telugu-text text-base">మన పాపం ఎంత భయంకరమైనదో, మనకు రక్షకుడు ఎంత అవసరమో ఇది చూపిస్తుంది.</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <h4 className="telugu-heading text-xl font-bold text-primary mb-2">2. Grace (కృప)</h4>
              <p className="telugu-text text-base">క్రీస్తు మనల్ని ఎలా రక్షించాడో, మనం ఏమి నమ్మాలో వివరిస్తుంది.</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
              <h4 className="telugu-heading text-xl font-bold text-primary mb-2">3. Gratitude (కృతజ్ఞత)</h4>
              <p className="telugu-text text-base">రక్షించబడిన మనం దేవునికి ఎలా కృతజ్ఞత తెలుపుకోవాలి?</p>
            </div>
          </div>
        </section>

        {/* Opening Sentence */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart className="w-24 h-24" />
          </div>
          <h3 className="telugu-heading text-2xl md:text-3xl font-bold mb-6 border-b border-primary-foreground/20 pb-4">పరిచయ వాక్యము (The Opening Sentence)</h3>
          <div className="space-y-6">
            <p className="telugu-text text-xl md:text-2xl font-bold italic">
              ప్రశ్న 1: జీవితంలోను, మరణంలోను నీకు ఉన్న ఏకైక ఆదరణ (Comfort) ఏమిటి?
            </p>
            <p className="telugu-text text-lg md:text-xl leading-relaxed opacity-90">
              జవాబు: నేను నా సొంతవాడను కాను, కానీ నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తుకు చెందినవాడను. ఆయన తన అమూల్యమైన రక్తముతో నా పాపములన్నిటికీ పూర్తి ప్రాయశ్చిత్తము చేసి, నన్ను అపవాది యొక్క అధికారము నుండి విడిపించాడు.
            </p>
          </div>
        </section>

        <div className="text-center py-8 space-y-6">
          <p className="telugu-text text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
            ఈ కేటకిజం చదవడం అంటే కేవలం జ్ఞానాన్ని పెంచుకోవడం కాదు, మనల్ని ప్రేమించి ప్రాణమిచ్చిన దేవునిని మరింత ఎక్కువగా ప్రేమించడం.
          </p>
          <Button size="lg" onClick={onStart} className="telugu-text text-xl h-14 px-10 rounded-full shadow-xl animate-bounce">
            చదవడం ప్రారంభించండి <Play className="ml-2 h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  )
}
