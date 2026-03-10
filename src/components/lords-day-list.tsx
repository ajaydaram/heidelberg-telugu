"use client"

import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BookMarked, CheckCircle2, Circle, ChevronDown, Layers } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface LordsDayListProps {
  data: LordsDay[]
  selectedNumber: number
  onSelect: (num: number) => void
  completedDays: number[]
}

export function LordsDayList({ data, selectedNumber, onSelect, completedDays }: LordsDayListProps) {
  
  const sections = [
    { title: "ప్రస్తావన (Intro)", range: [1, 1], subtitle: "ఏకైక ఆదరణ" },
    { title: "మొదటి భాగం: దోషం (Guilt)", range: [2, 4], subtitle: "నరుని దౌర్భాగ్యం" },
    { title: "రెండవ భాగం: కృప (Grace)", range: [5, 31], subtitle: "నరుని విమోచన" },
    { title: "మూడవ భాగం: కృతజ్ఞత (Gratitude)", range: [32, 52], subtitle: "దేవునికి విధేయత" }
  ]

  const getDayStatus = (num: number) => {
    if (completedDays.includes(num)) return <CheckCircle2 className="h-4 w-4 text-primary" />
    return <Circle className="h-4 w-4 opacity-30 text-muted-foreground" />
  }

  const findActiveSection = () => {
    if (selectedNumber === 0) return "intro"
    const section = sections.find(s => selectedNumber >= s.range[0] && selectedNumber <= s.range[1])
    return section ? section.title : "grace"
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b flex items-center justify-between bg-muted/20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground telugu-text">విషయ సూచిక</h2>
        <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {completedDays.length} / 52
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          <button
            onClick={() => onSelect(0)}
            className={cn(
              "w-full text-left px-4 py-4 rounded-xl transition-all duration-200 group flex items-center gap-3",
              selectedNumber === 0 ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-accent"
            )}
          >
            <BookMarked className={cn("w-5 h-5", selectedNumber === 0 ? "text-white" : "text-primary")} />
            <span className="telugu-heading text-xl font-bold">యాప్ పరిచయం</span>
          </button>

          <Accordion type="multiple" defaultValue={[findActiveSection()]} className="w-full">
            {sections.map((section) => (
              <AccordionItem value={section.title} key={section.title} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 rounded-xl group">
                  <div className="flex items-center gap-3 text-left">
                    <Layers className="w-4 h-4 text-primary opacity-60" />
                    <div className="flex flex-col">
                      <span className="telugu-heading text-lg font-bold group-data-[state=open]:text-primary">{section.title}</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-60 tracking-tighter">{section.subtitle}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-2">
                  <div className="space-y-1 ml-4 border-l-2 border-primary/10 pl-2">
                    {data.filter(d => d.number >= section.range[0] && d.number <= section.range[1]).map((day) => (
                      <button
                        key={day.number}
                        onClick={() => onSelect(day.number)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm telugu-text relative group",
                          selectedNumber === day.number
                            ? "bg-primary/10 text-primary font-bold"
                            : "hover:bg-accent text-foreground/70"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getDayStatus(day.number)}
                            <span className="line-clamp-1">{day.title}</span>
                          </div>
                          {selectedNumber === day.number && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
