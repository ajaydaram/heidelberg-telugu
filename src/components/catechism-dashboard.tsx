"use client"

import * as React from "react"
import { CATECHISM_DATA, LordsDay } from "@/app/lib/data/catechism-data"
import { LordsDayList } from "@/components/lords-day-list"
import { CatechismViewer } from "@/components/catechism-viewer"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Search, Menu, BookOpen, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CatechismDashboard() {
  const [selectedDayNumber, setSelectedDayNumber] = React.useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const selectedDay = CATECHISM_DATA.find(d => d.number === selectedDayNumber) || CATECHISM_DATA[0]

  const handleSelectDay = (num: number) => {
    setSelectedDayNumber(num)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-card shadow-sm z-30">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-headline text-primary font-bold tracking-wide">జ్ఞాన బోధ</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchDialog />
          <Button 
            variant={isReadingMode ? "secondary" : "ghost"} 
            size="icon" 
            onClick={() => setIsReadingMode(!isReadingMode)}
            title="Reading Mode"
          >
            <BookOpen className={cn("h-5 w-5", isReadingMode && "text-primary")} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Sidebar - Hidden in reading mode or mobile unless toggled */}
        <aside className={cn(
          "w-80 border-r bg-card transition-all duration-300 ease-in-out absolute md:relative z-20 h-full",
          !isSidebarOpen || isReadingMode ? "md:-ml-80" : "md:ml-0",
          isMobileMenuOpen ? "left-0" : "-left-80 md:left-0"
        )}>
          <LordsDayList 
            data={CATECHISM_DATA} 
            selectedNumber={selectedDayNumber} 
            onSelect={handleSelectDay} 
          />
        </aside>

        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-10 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          isReadingMode ? "p-0 bg-card" : "p-4 md:p-8"
        )}>
          <div className={cn(
            "mx-auto",
            isReadingMode ? "max-w-3xl py-12 px-6 md:px-12" : "max-w-4xl"
          )}>
            <CatechismViewer day={selectedDay} isReadingMode={isReadingMode} />
          </div>
        </main>
      </div>
    </div>
  )
}