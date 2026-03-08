
"use client"

import * as React from "react"
import { LordsDay, CatechismEntry } from "@/app/lib/data/catechism-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, CheckCircle2, Share2, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CatechismViewerProps {
  day: LordsDay
  isReadingMode: boolean
  isCompleted: boolean
  favorites: number[]
  onToggleComplete: () => void
  onToggleFavorite: (id: number) => void
  onNavigate: (direction: 'next' | 'prev') => void
}

export function CatechismViewer({ day, isReadingMode, isCompleted, favorites, onToggleComplete, onToggleFavorite, onNavigate }: CatechismViewerProps) {
  
  const handleShare = async (entry: CatechismEntry) => {
    const text = `జ్ఞాన బోధ (Heidelberg Catechism)\n\nప్రశ్న ${entry.questionNumber}: ${entry.question}\n\nజవాబు: ${entry.answer.replace(/\[\d+\]/g, '')}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'జ్ఞాన బోధ',
          text: text,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed", err)
      }
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది",
        description: "మీరు ఇప్పుడు దీనిని ఎక్కడైనా షేర్ చేయవచ్చు.",
      })
    }
  }

  const scrollToFootnote = (entryId: number, refId: string) => {
    const element = document.getElementById(`ref-${entryId}-${refId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('bg-primary/20');
      setTimeout(() => element.classList.remove('bg-primary/20'), 2000);
    }
  };

  const renderAnswer = (entry: CatechismEntry) => {
    const parts = entry.answer.split(/(\[\d+\])/g);
    
    return (
      <div className={cn(
        "telugu-text pl-5 whitespace-pre-wrap",
        isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
      )}>
        <span className="telugu-heading font-bold block mb-3 opacity-90 text-primary">జవాబు:</span>
        {parts.map((part, index) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) {
            const refId = match[1];
            return (
              <button
                key={index}
                onClick={() => scrollToFootnote(entry.id, refId)}
                className="inline-flex items-center justify-center w-6 h-6 -translate-y-2 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary rounded-full transition-colors mx-0.5 border border-primary/30"
              >
                {refId}
              </button>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="mb-8 text-center relative">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('prev')} disabled={day.number === 1} className="telugu-text">
            <ChevronLeft className="h-4 w-4 mr-1" /> మునుపటి
          </Button>
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border border-primary/10">
            <Checkbox 
              id="complete-day" 
              checked={isCompleted} 
              onCheckedChange={onToggleComplete}
              className="h-5 w-5 data-[state=checked]:bg-primary"
            />
            <label htmlFor="complete-day" className="telugu-text text-sm font-bold cursor-pointer">
              {isCompleted ? "పూర్తయింది" : "పూర్తి చేయండి"}
            </label>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('next')} disabled={day.number === 52} className="telugu-text">
            తరువాతి <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <h2 className={cn("telugu-heading font-bold", isReadingMode ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl")}>
          {day.title}
        </h2>
        {day.subtitle && (
          <p className={cn("telugu-text text-foreground/60 mt-2", isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
            {day.subtitle}
          </p>
        )}
        <div className="mt-6 w-24 h-1 bg-accent mx-auto rounded-full opacity-60" />
      </div>

      <div className="space-y-16">
        {day.entries.map((entry) => (
          <div key={entry.id} className="group relative">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-start">
                <h3 className={cn(
                  "telugu-text font-bold border-l-4 border-accent pl-4 text-primary/90 flex-1",
                  isReadingMode ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                )}>
                  ప్రశ్న {entry.questionNumber}: {entry.question}
                </h3>
                <div className="flex gap-1 ml-4">
                  <Button variant="ghost" size="icon" onClick={() => onToggleFavorite(entry.id)} className="h-8 w-8">
                    <Heart className={cn("h-5 w-5", favorites.includes(entry.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleShare(entry)} className="h-8 w-8 text-muted-foreground">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {renderAnswer(entry)}

              {entry.explanation && (
                <div className="mt-4 p-5 bg-muted/40 border-l-4 border-primary/30 rounded-r-lg italic telugu-text ml-5 text-foreground/80">
                  <span className="font-bold not-italic block mb-2 telugu-heading text-sm uppercase opacity-70">వివరణ:</span>
                  {entry.explanation}
                </div>
              )}

              {entry.scriptureReferences && entry.scriptureReferences.length > 0 && (
                <div className="mt-8 pl-5 pt-8 border-t border-accent/20">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 telugu-text opacity-70">లేఖన ఆధారాలు</h4>
                  <ul className="space-y-4">
                    {entry.scriptureReferences.map((ref) => (
                      <li key={ref.id} id={`ref-${entry.id}-${ref.id}`} className="text-base md:text-lg text-muted-foreground telugu-text flex gap-3 transition-colors duration-500 rounded p-1">
                        <span className="font-bold text-primary/70 shrink-0">[{ref.id}]</span>
                        <span>{ref.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {day.insights && day.insights.length > 0 && (
          <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
            <h3 className="telugu-heading text-2xl mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">💡</span>
              ముఖ్యమైన అంశాలు
            </h3>
            <ul className="space-y-4">
              {day.insights.map((insight, idx) => (
                <li key={idx} className="telugu-text text-lg md:text-xl flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-20 flex flex-col items-center gap-8 border-t pt-12">
        {isCompleted ? (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in">
            <div className="bg-primary text-primary-foreground p-4 rounded-full shadow-xl">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <p className="telugu-heading text-2xl font-bold text-primary">ఈ దినమును పూర్తి చేశారు!</p>
          </div>
        ) : (
          <Button size="lg" onClick={onToggleComplete} className="telugu-text text-xl h-14 px-10 rounded-full shadow-lg">
            నేను దీనిని చదివి పూర్తి చేశాను
          </Button>
        )}
      </div>
    </div>
  )
}
