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
        <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full opacity-60" />
      </div>

      <div className="space-y-8 md:space-y-12">
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
                "telugu-content text-foreground/80 pl-5",
                isReadingMode ? "text-xl md:text-2xl leading-relaxed" : "text-lg md:text-xl"
              )}>
                <span className="font-headline font-bold text-primary block mb-2 opacity-80">జవాబు:</span>
                {entry.answer}
              </div>
            </div>
            {!isReadingMode && (
              <div className="mt-8 border-b border-border/50 group-last:border-0" />
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