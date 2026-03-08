
"use client"

import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BookMarked } from "lucide-react"

interface LordsDayListProps {
  data: LordsDay[]
  selectedNumber: number
  onSelect: (num: number) => void
}

export function LordsDayList({ data, selectedNumber, onSelect }: LordsDayListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground telugu-text">విషయ సూచిక (Contents)</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {/* Introduction Item */}
          <button
            onClick={() => onSelect(0)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group mb-2",
              selectedNumber === 0
                ? "bg-accent text-accent-foreground border-l-4 border-primary"
                : "hover:bg-accent/50"
            )}
          >
            <div className="flex items-center gap-3">
              <BookMarked className={cn(
                "w-5 h-5",
                selectedNumber === 0 ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )} />
              <span className="telugu-heading text-lg font-bold">పరిచయం (Introduction)</span>
            </div>
          </button>

          <div className="px-2 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest telugu-text opacity-50">
            ప్రభువు దినములు (Lord's Days)
          </div>

          {data.map((day) => (
            <button
              key={day.number}
              onClick={() => onSelect(day.number)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                selectedNumber === day.number
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="telugu-heading text-lg">{day.title}</span>
                {selectedNumber === day.number && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
