import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
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
                "telugu-text pl-5 whitespace-pre-wrap text-foreground",
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
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-70">లేఖన ఆధారాలు (Scripture Footnotes)</h4>
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
      </div>
    </div>
  )
}
