
import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

interface CatechismViewerProps {
  day: LordsDay
  isReadingMode: boolean
  isCompleted: boolean
  onToggleComplete: () => void
  onNavigate: (direction: 'next' | 'prev') => void
}

export function CatechismViewer({ day, isReadingMode, isCompleted, onToggleComplete, onNavigate }: CatechismViewerProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <div className="mb-8 text-center relative">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('prev')} className="telugu-text">
            <ChevronLeft className="h-4 w-4 mr-1" /> మునుపటి
          </Button>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border">
            <Checkbox 
              id="complete-day" 
              checked={isCompleted} 
              onCheckedChange={onToggleComplete}
              className="h-5 w-5 data-[state=checked]:bg-primary border-primary/30"
            />
            <label htmlFor="complete-day" className="telugu-text text-sm font-bold cursor-pointer select-none">
              {isCompleted ? "పూర్తయింది" : "పూర్తి చేయండి"}
            </label>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('next')} disabled={day.number === 52} className="telugu-text">
            తరువాతి <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {!isReadingMode && (
          <Badge variant="outline" className="mb-2 text-primary border-primary/30 px-4 py-1">
            Heidelberg Catechism
          </Badge>
        )}
        <h2 className={cn(
          "telugu-heading font-bold",
          isReadingMode ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"
        )}>
          {day.title}
        </h2>
        {day.subtitle && (
          <p className={cn(
            "telugu-text text-foreground/60 mt-1",
            isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          )}>
            {day.subtitle}
          </p>
        )}
        <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full opacity-60" />
      </div>

      <div className="space-y-12 md:space-y-16">
        {day.entries.map((entry) => (
          <div key={entry.id} className="group">
            <div className="flex flex-col space-y-6">
              <div className="relative">
                {!isReadingMode && (
                  <div className="absolute -left-12 top-0 text-3xl telugu-heading text-accent/30 hidden lg:block select-none">
                    Q{entry.questionNumber}
                  </div>
                )}
                <h3 className={cn(
                  "telugu-text font-bold border-l-4 border-accent pl-4 text-primary/90",
                  isReadingMode ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                )}>
                  ప్రశ్న {entry.questionNumber}: {entry.question}
                </h3>
              </div>
              
              <div className={cn(
                "telugu-text pl-5 whitespace-pre-wrap text-[#1a1a1a] dark:text-foreground",
                isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
              )}>
                <span className="telugu-heading font-bold block mb-3 opacity-90 text-primary">జవాబు:</span>
                {entry.answer}
              </div>

              {entry.explanation && (
                <div className={cn(
                  "mt-4 p-5 bg-muted/40 border-l-4 border-primary/30 rounded-r-lg italic telugu-text ml-5 text-foreground/80 shadow-sm",
                  isReadingMode ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                )}>
                  <span className="font-bold not-italic block mb-2 opacity-70 telugu-heading text-sm uppercase tracking-wider">వివరణ:</span>
                  {entry.explanation}
                </div>
              )}

              {entry.scriptureReferences && entry.scriptureReferences.length > 0 && (
                <div className={cn(
                  "mt-8 pl-5 pt-8 border-t border-accent/20",
                  isReadingMode ? "max-w-2xl" : ""
                )}>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-70 telugu-text">లేఖన ఆధారాలు (Scripture Footnotes)</h4>
                  <ul className="space-y-4">
                    {entry.scriptureReferences.map((ref) => (
                      <li key={ref.id} className="text-base md:text-lg text-muted-foreground telugu-text flex gap-3 leading-relaxed">
                        <span className="font-bold text-primary/70 shrink-0">[{ref.id}]</span>
                        <span>{ref.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {!isReadingMode && (
              <div className="mt-16 border-b border-border/20 group-last:border-0" />
            )}
          </div>
        ))}

        {day.insights && day.insights.length > 0 && (
          <div className="mt-16 p-6 md:p-8 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
            <h3 className="telugu-heading text-2xl mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">💡</span>
              ముఖ్యమైన అంశాలు (Key Insights)
            </h3>
            <ul className="space-y-4">
              {day.insights.map((insight, idx) => (
                <li key={idx} className="telugu-text text-lg md:text-xl flex gap-3 leading-relaxed">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 border-t pt-12">
        {isCompleted ? (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-300">
            <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <p className="telugu-heading text-2xl font-bold text-primary">మీరు ఈ దినమును పూర్తి చేశారు!</p>
          </div>
        ) : (
          <Button size="lg" onClick={onToggleComplete} className="telugu-text text-xl h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
            నేను దీనిని చదివి పూర్తి చేశాను
          </Button>
        )}

        <div className="flex gap-4 w-full max-w-md mt-4">
          <Button 
            variant="outline" 
            className="flex-1 telugu-text text-lg h-12" 
            onClick={() => onNavigate('prev')}
          >
            మునుపటి దినము
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 telugu-text text-lg h-12" 
            onClick={() => onNavigate('next')}
            disabled={day.number === 52}
          >
            తరువాతి దినము
          </Button>
        </div>
      </div>
    </div>
  )
}
