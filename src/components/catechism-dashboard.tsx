
"use client"

import * as React from "react"
import { CATECHISM_DATA } from "@/app/lib/data/catechism-data"
import { LordsDayList } from "@/components/lords-day-list"
import { CatechismViewer } from "@/components/catechism-viewer"
import { CatechismIntro } from "@/components/catechism-intro"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X, CheckCircle2, Moon, Sun, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser, useFirestore, useAuth, useDoc, setDocumentNonBlocking, initiateAnonymousSignIn } from "@/firebase"
import { doc } from "firebase/firestore"

export function CatechismDashboard() {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()
  const db = useFirestore()
  const isMobile = useIsMobile()

  const [selectedDayNumber, setSelectedDayNumber] = React.useState(0)
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  // Memoize the user profile doc reference to avoid infinite loops
  const userProfileRef = React.useMemo(() => {
    if (!db || !user) return null
    return doc(db, "users", user.uid)
  }, [db, user])

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef)

  // Local state initialized from Firestore or localStorage fallback
  const [completedDays, setCompletedDays] = React.useState<number[]>([])
  const [favorites, setFavorites] = React.useState<number[]>([])

  // Load theme from localStorage only on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Auto sign-in if not authenticated
  React.useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth)
    }
  }, [user, isUserLoading, auth])

  // Sync Firestore data to local state when it loads
  React.useEffect(() => {
    if (userProfile) {
      if (userProfile.completedDays) setCompletedDays(userProfile.completedDays)
      if (userProfile.favorites) setFavorites(userProfile.favorites)
    }
  }, [userProfile])

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
    
    if (userProfileRef) {
      setDocumentNonBlocking(userProfileRef, { theme: next ? 'dark' : 'light' }, { merge: true })
    }
  }

  const toggleComplete = (num: number) => {
    const next = completedDays.includes(num) ? completedDays.filter(d => d !== num) : [...completedDays, num]
    setCompletedDays(next)
    
    if (userProfileRef) {
      setDocumentNonBlocking(userProfileRef, { completedDays: next }, { merge: true })
    }
  }

  const toggleFavorite = (questionId: number) => {
    const next = favorites.includes(questionId) ? favorites.filter(id => id !== questionId) : [...favorites, questionId]
    setFavorites(next)
    
    if (userProfileRef) {
      setDocumentNonBlocking(userProfileRef, { favorites: next }, { merge: true })
    }
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

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsReadingMode(!isReadingMode)} 
            title="Toggle Reading Mode"
            className={cn(isReadingMode && "text-primary bg-primary/10")}
          >
            <BookOpen className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button variant="ghost" size="icon" className="relative">
            {isUserLoading || isProfileLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <User className={cn("h-5 w-5", user ? "text-primary" : "text-muted-foreground")} />
            )}
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
