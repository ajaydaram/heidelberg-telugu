"use client"

import * as React from "react"
import { CATECHISM_DATA } from "@/app/lib/data/catechism-data"
import { LordsDayList } from "@/components/lords-day-list"
import { CatechismIntro } from "@/components/catechism-intro"
import { CatechismViewer } from "@/components/catechism-viewer"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X, Moon, Sun, User, Loader2, BookMarked, Monitor, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser } from "@/firebase"

export function CatechismDashboard() {
  const { user, isUserLoading } = useUser()
  const isMobile = useIsMobile()

  const [selectedDayNum, setSelectedDayNum] = React.useState(0)
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'e-ink'>('light')
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [completedDays, setCompletedDays] = React.useState<number[]>([])
  const [favorites, setFavorites] = React.useState<number[]>([])
  const [lastReadDay, setLastReadDay] = React.useState<number | null>(null)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as any
    if (savedTheme) {
      setThemeMode(savedTheme)
      applyTheme(savedTheme)
    }
    
    const savedCompleted = localStorage.getItem('completedDays')
    if (savedCompleted) setCompletedDays(JSON.parse(savedCompleted))
    
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))

    const savedLastRead = localStorage.getItem('lastReadDay')
    if (savedLastRead) setLastReadDay(parseInt(savedLastRead))
  }, [])

  const applyTheme = (mode: 'light' | 'dark' | 'e-ink') => {
    document.documentElement.classList.remove('dark', 'e-ink')
    if (mode === 'dark') document.documentElement.classList.add('dark')
    if (mode === 'e-ink') document.documentElement.classList.add('e-ink')
  }

  const cycleTheme = () => {
    let next: 'light' | 'dark' | 'e-ink'
    if (themeMode === 'light') next = 'dark'
    else if (themeMode === 'dark') next = 'e-ink'
    else next = 'light'
    
    setThemeMode(next)
    applyTheme(next)
    localStorage.setItem('theme', next)
  }

  const handleSelectDay = (num: number) => {
    setSelectedDayNum(num)
    setIsMobileMenuOpen(false)
    if (num > 0) {
      localStorage.setItem('lastReadDay', num.toString())
      setLastReadDay(num)
    }
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleComplete = () => {
    if (selectedDayNum === 0) return
    const next = completedDays.includes(selectedDayNum)
      ? completedDays.filter(d => d !== selectedDayNum)
      : [...completedDays, selectedDayNum]
    setCompletedDays(next)
    localStorage.setItem('completedDays', JSON.stringify(next))
  }

  const handleToggleFavorite = (entryId: number) => {
    const next = favorites.includes(entryId)
      ? favorites.filter(id => id !== entryId)
      : [...favorites, entryId]
    setFavorites(next)
    localStorage.setItem('favorites', JSON.stringify(next))
  }

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (direction === 'next' && selectedDayNum < 52) handleSelectDay(selectedDayNum + 1)
    if (direction === 'prev' && selectedDayNum > 1) handleSelectDay(selectedDayNum - 1)
  }

  const currentDayData = CATECHISM_DATA.find(d => d.number === selectedDayNum)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card z-40 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSelectDay(0)}>
            <BookMarked className="h-6 w-6 text-primary" />
            <h1 className="text-xl md:text-2xl telugu-heading font-bold">జ్ఞాన బోధ</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchDialog 
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            onResultClick={(docId, refId) => {
              const entry = CATECHISM_DATA.flatMap(d => d.entries).find(e => `q${e.id}` === refId)
              if (entry) handleSelectDay(entry.lordsDay)
            }} 
          />
          {lastReadDay && selectedDayNum === 0 && (
            <Button variant="outline" size="sm" onClick={() => handleSelectDay(lastReadDay)} className="hidden md:flex gap-2 telugu-text border-primary/30">
              <PlayCircle className="h-4 w-4" /> కొనసాగించండి
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsReadingMode(!isReadingMode)} title="Reading Mode" className={cn(isReadingMode && "bg-primary/10 text-primary")}>
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={cycleTheme} title="Cycle Theme">
            {themeMode === 'light' && <Sun className="h-5 w-5" />}
            {themeMode === 'dark' && <Moon className="h-5 w-5" />}
            {themeMode === 'e-ink' && <Monitor className="h-5 w-5" />}
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon">
            {isUserLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <User className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={cn(
          "fixed inset-y-0 left-0 w-80 border-r bg-card transition-transform duration-300 z-50 md:relative md:translate-x-0 shrink-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isReadingMode && "md:hidden"
        )}>
          <LordsDayList 
            data={CATECHISM_DATA} 
            selectedNumber={selectedDayNum} 
            onSelect={handleSelectDay}
            completedDays={completedDays}
          />
        </aside>

        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/40 z-45 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

        <main id="main-content" className="flex-1 overflow-y-auto bg-background">
          <div className={cn("mx-auto max-w-5xl p-4 md:p-12 telugu-rendering", isReadingMode && "max-w-3xl")}>
            {selectedDayNum === 0 ? (
              <CatechismIntro 
                isReadingMode={isReadingMode} 
                onStart={() => handleSelectDay(1)}
                lastReadDay={lastReadDay}
                onResume={() => lastReadDay && handleSelectDay(lastReadDay)}
              />
            ) : (
              currentDayData && (
                <CatechismViewer 
                  day={currentDayData}
                  isReadingMode={isReadingMode}
                  isCompleted={completedDays.includes(selectedDayNum)}
                  favorites={favorites}
                  onToggleComplete={handleToggleComplete}
                  onToggleFavorite={handleToggleFavorite}
                  onNavigate={handleNavigate}
                />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
