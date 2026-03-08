import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CatechismViewerProps {
  day: LordsDay
  isReadingMode: boolean
}

export function CatechismViewer({ day, isReadingMode }: CatechismViewerProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-8 text-center">
        {!isReadingMode && (
          <Badge variant="outline" className="mb-2 text-primary border-primary/30">
            Heidelberg Catechism
          </Badge>
        )}
        <h2 className={cn(
          "font-headline font-bold text-primary",
          isReadingMode ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        )}>
          {day.title}
        </h2>
        {day.subtitle && (
          <p className={cn(
            "font-headline text-foreground/60 mt-1",
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
            <div className="flex flex-col space-y-4">
              <div className="relative">
                {!isReadingMode && (
                  <div className="absolute -left-12 top-0 text-3xl font-headline text-accent/30 hidden lg:block select-none">
                    Q{entry.questionNumber}
                  </div>
                )}
                <h3 className={cn(
                  "font-headline font-semibold text-foreground/90 telugu-content border-l-4 border-accent pl-4",
                  isReadingMode ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                )}>
                  ప్రశ్న {entry.questionNumber}: {entry.question}
                </h3>
              </div>
              
              <div className={cn(
                "telugu-content text-foreground/80 pl-5 whitespace-pre-wrap",
                isReadingMode ? "text-xl md:text-2xl leading-relaxed" : "text-lg md:text-xl"
              )}>
                <span className="font-headline font-bold text-primary block mb-2 opacity-80">జవాబు:</span>
                {entry.answer}
              </div>

              {entry.explanation && (
                <div className={cn(
                  "mt-4 p-4 bg-muted/50 border-l-2 border-primary/20 rounded-r-lg italic telugu-content ml-5 text-foreground/70",
                  isReadingMode ? "text-lg md:text-xl" : "text-base md:text-lg"
                )}>
                  <span className="font-bold not-italic block mb-1 opacity-60">వివరణ:</span>
                  {entry.explanation}
                </div>
              )}

              {entry.scriptureReferences && entry.scriptureReferences.length > 0 && (
                <div className={cn(
                  "mt-6 pl-5 pt-6 border-t border-accent/20",
                  isReadingMode ? "max-w-2xl" : ""
                )}>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">లేఖన ఆధారాలు (Scripture Footnotes)</h4>
                  <ul className="space-y-2">
                    {entry.scriptureReferences.map((ref) => (
                      <li key={ref.id} className="text-sm md:text-base text-muted-foreground telugu-content flex gap-2">
                        <span className="font-bold text-primary/60">[{ref.id}]</span>
                        <span>{ref.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {!isReadingMode && (
              <div className="mt-12 border-b border-border/30 group-last:border-0" />
            )}
          </div>
        ))}
      </div>
      
      {isReadingMode && (
        <div className="mt-20 text-center text-muted-foreground/40 font-headline text-lg italic">
          జ్ఞాన బోధ - అంతం
        </div>
      )}
    </div>
  )
}
