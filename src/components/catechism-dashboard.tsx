"use client"

import * as React from "react"
import { CATECHISM_DATA } from "@/app/lib/data/catechism-data"
import { LordsDayList } from "@/components/lords-day-list"
import { CatechismViewer } from "@/components/catechism-viewer"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export function CatechismDashboard() {
  const [selectedDayNumber, setSelectedDayNumber] = React.useState(1)
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const isMobile = useIsMobile()

  const selectedDay = CATECHISM_DATA.find(d => d.number === selectedDayNumber) || CATECHISM_DATA[0]

  const handleSelectDay = (num: number) => {
    setSelectedDayNumber(num)
    setIsMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b bg-card shadow-sm z-40 shrink-0">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-xl md:text-2xl telugu-heading font-bold tracking-tight">జ్ఞాన బోధ</h1>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          <SearchDialog />
          <Button 
            variant={isReadingMode ? "secondary" : "ghost"} 
            size="icon" 
            onClick={() => setIsReadingMode(!isReadingMode)}
            title="Reading Mode"
            className="hidden xs:inline-flex"
          >
            <BookOpen className={cn("h-5 w-5", isReadingMode && "text-primary")} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={cn(
          "fixed inset-y-0 left-0 w-[280px] md:w-80 border-r bg-card transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 shrink-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isReadingMode && !isMobile ? "md:hidden" : "md:block"
        )}>
          <LordsDayList 
            data={CATECHISM_DATA} 
            selectedNumber={selectedDayNumber} 
            onSelect={handleSelectDay} 
          />
        </aside>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 touch-pan-y",
          isReadingMode ? "bg-card" : "bg-background"
        )}>
          <div className={cn(
            "mx-auto w-full",
            isReadingMode ? "max-w-3xl py-8 px-4 md:px-12" : "max-w-4xl p-4 md:p-8"
          )}>
            <CatechismViewer day={selectedDay} isReadingMode={isReadingMode} />
          </div>
        </main>
      </div>
    </div>
  )
}
