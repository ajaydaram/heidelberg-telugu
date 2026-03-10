"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Info, History, Sparkles, LayoutGrid, Heart, Play, ArrowRightCircle } from "lucide-react"

interface CatechismIntroProps {
  isReadingMode: boolean
  onStart: () => void
  lastReadDay: number | null
  onResume: () => void
}

export function CatechismIntro({ isReadingMode, onStart, lastReadDay, onResume }: CatechismIntroProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12">
      <div className="text-center mb-12">
        {!isReadingMode && (
          <Badge variant="outline" className="mb-2 text-primary border-primary/30 px-4 py-1">
            Introduction
          </Badge>
        )}
        <h2 className={cn(
          "telugu-heading font-bold text-primary",
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

      {lastReadDay && (
        <div className="bg-primary/5 border-2 border-primary/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in zoom-in duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-xl">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h4 className="telugu-heading text-xl font-bold">మీరు ఇక్కడ ఆగిపోయారు</h4>
              <p className="telugu-text text-muted-foreground">ప్రభు దినము {lastReadDay}</p>
            </div>
          </div>
          <Button onClick={onResume} size="lg" className="telugu-text w-full md:w-auto rounded-full gap-2">
            చదవడం కొనసాగించండి <ArrowRightCircle className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className="grid gap-8">
        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">1. కేటకిజం అంటే ఏమిటి?</h3>
          </div>
          <p className="telugu-text text-lg md:text-xl leading-relaxed text-foreground/80">
            "కేటకిజం" అనే పదం గ్రీకు భాషలోని <strong>katecheo</strong> నుండి వచ్చింది, దీని అర్థం <strong>"నోటి మాట ద్వారా బోధించడం."</strong> ఇది క్రైస్తవ విశ్వాసంలోని ప్రాథమిక సత్యాలను ప్రశ్నలు మరియు జవాబుల రూపంలో నేర్చుకునే ఒక పద్ధతి.
          </p>
        </section>

        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="telugu-heading text-2xl md:text-3xl font-bold">2. దీని నిర్మాణం: మూడు 'G'లు</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group">
              <h4 className="telugu-heading text-2xl font-bold text-primary mb-3">1. Guilt (దోషం)</h4>
              <p className="telugu-text text-lg">మన పాపం ఎంత భయంకరమైనదో, మనకు రక్షకుడు ఎంత అవసరమో ఇది చూపిస్తుంది.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group">
              <h4 className="telugu-heading text-2xl font-bold text-primary mb-3">2. Grace (కృప)</h4>
              <p className="telugu-text text-lg">క్రీస్తు మనల్ని ఎలా రక్షించాడో, మనం ఏమి నమ్మాలో వివరిస్తుంది.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group">
              <h4 className="telugu-heading text-2xl font-bold text-primary mb-3">3. Gratitude (కృతజ్ఞత)</h4>
              <p className="telugu-text text-lg">రక్షించబడిన మనం దేవునికి ఎలా కృతజ్ఞత తెలుపుకోవాలి?</p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart className="w-24 h-24" />
          </div>
          <h3 className="telugu-heading text-2xl md:text-3xl font-bold mb-6 border-b border-primary-foreground/20 pb-4">ప్రధాన ప్రశ్న (The Theme)</h3>
          <div className="space-y-6">
            <p className="telugu-text text-xl md:text-2xl font-bold italic">
              "జీవితంలోను, మరణంలోను నీకు ఉన్న ఏకైక ఆదరణ (Comfort) ఏమిటి?"
            </p>
            <p className="telugu-text text-lg md:text-xl leading-relaxed opacity-90">
              జవాబు: నేను నా సొంతవాడను కాను, కానీ నా నమ్మకమైన రక్షకుడైన యేసుక్రీస్తుకు చెందినవాడను.
            </p>
          </div>
        </section>

        <div className="text-center py-8">
          <Button size="lg" onClick={onStart} className="telugu-text text-2xl h-16 px-12 rounded-full shadow-2xl animate-pulse hover:animate-none">
            మొదటి పాఠం నుండి ప్రారంభించండి <ArrowRightCircle className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
