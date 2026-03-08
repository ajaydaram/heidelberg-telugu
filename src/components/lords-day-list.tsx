"use client"

import * as React from "react"
import { LordsDay } from "@/app/lib/data/catechism-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface LordsDayListProps {
  data: LordsDay[]
  selectedNumber: number
  onSelect: (num: number) => void
}

export function LordsDayList({ data, selectedNumber, onSelect }: LordsDayListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground telugu-text">ప్రభువు దినములు (Lord's Days)</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
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
