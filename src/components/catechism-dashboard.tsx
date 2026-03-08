
"use client"

import * as React from "react"
import { CATECHISM_DATA } from "@/app/lib/data/catechism-data"
import { LordsDayList } from "@/components/lords-day-list"
import { CatechismViewer } from "@/components/catechism-viewer"
import { CatechismIntro } from "@/components/catechism-intro"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X, CheckCircle2, Moon, Sun, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export function CatechismDashboard() {
  const [selectedDayNumber, setSelectedDayNumber] = React.useState(0) // 0 for Intro
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [completedDays, setCompletedDays] = React.useState<number[]>([])
  const [favorites, setFavorites] = React.useState<number[]>([]) // IDs of favorited questions
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const isMobile = useIsMobile()

  // Load state from localStorage
  React.useEffect(() => {
    const savedProgress = localStorage.getItem('catechism-progress')
    const savedFavorites = localStorage.getItem('catechism-favorites')
    const savedTheme = localStorage.getItem('theme')
    
    if (savedProgress) setCompletedDays(JSON.parse(savedProgress))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleComplete = (num: number) => {
    setCompletedDays(prev => {
      const next = prev.includes(num) ? prev.filter(d => d !== num) : [...prev, num]
      localStorage.setItem('catechism-progress', JSON.stringify(next))
      return next
    })
  }

  const toggleFavorite = (questionId: number) => {
    setFavorites(prev => {
      const next = prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
      localStorage.setItem('catechism-favorites', JSON.stringify(next))
      return next
    })
  }

  const handleSelectDay = (num: number) => {
    setSelectedDayNumber(num)
    setIsMobileMenuOpen(false)
    const contentArea = document.getElementById('main-content')
    if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectedDay = CATECHISM_DATA.find(d => d.number === selectedDayNumber)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b bg-card shadow-sm z-40 shrink-0">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-xl md:text-2xl telugu-heading font-bold cursor-pointer" onClick={() => handleSelectDay(0)}>జ్ఞాన బోధ</h1>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary">{completedDays.length}/52</span>
          </div>
          
          <SearchDialog onResultClick={(dayNum) => handleSelectDay(dayNum)} />
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant={isReadingMode ? "secondary" : "ghost"} 
            size="icon" 
            onClick={() => setIsReadingMode(!isReadingMode)}
            className="hidden xs:inline-flex"
          >
            <BookOpen className={cn("h-5 w-5", isReadingMode && "text-primary")} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={cn(
          "fixed inset-y-0 left-0 w-[280px] md:w-80 border-r bg-card transition-transform duration-300 z-50 md:relative md:translate-x-0 shrink-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isReadingMode && !isMobile ? "md:hidden" : "md:block"
        )}>
          <LordsDayList 
            data={CATECHISM_DATA} 
            selectedNumber={selectedDayNumber} 
            onSelect={handleSelectDay}
            completedDays={completedDays}
          />
        </aside>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-45 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <main id="main-content" className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          isReadingMode ? "bg-card" : "bg-background"
        )}>
          <div className={cn(
            "mx-auto w-full",
            isReadingMode ? "max-w-3xl py-8 px-4 md:px-12" : "max-w-4xl p-4 md:p-8"
          )}>
            {selectedDayNumber === 0 ? (
              <CatechismIntro isReadingMode={isReadingMode} onStart={() => handleSelectDay(1)} />
            ) : selectedDay ? (
              <CatechismViewer 
                day={selectedDay} 
                isReadingMode={isReadingMode} 
                isCompleted={completedDays.includes(selectedDay.number)}
                favorites={favorites}
                onToggleComplete={() => toggleComplete(selectedDay.number)}
                onToggleFavorite={toggleFavorite}
                onNavigate={(dir) => handleSelectDay(dir === 'next' ? selectedDayNumber + 1 : selectedDayNumber - 1)}
              />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}
