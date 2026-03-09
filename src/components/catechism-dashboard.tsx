
"use client"

import * as React from "react"
import { LIBRARY_DATA } from "@/app/lib/data/library-data"
import { LibraryBrowser } from "@/components/library-browser"
import { DocumentViewer } from "@/components/document-viewer"
import { CatechismIntro } from "@/components/catechism-intro"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X, Moon, Sun, User, Loader2, Library } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser } from "@/firebase"

export function CatechismDashboard() {
  const { user, isUserLoading } = useUser()
  const isMobile = useIsMobile()

  const [selectedDocId, setSelectedDocId] = React.useState("")
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const handleSelectDoc = (id: string) => {
    setSelectedDocId(id)
    setIsMobileMenuOpen(false)
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectedDoc = LIBRARY_DATA.find(d => d.id === selectedDocId)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card z-40 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedDocId("")}>
            <Library className="h-6 w-6 text-primary" />
            <h1 className="text-xl md:text-2xl telugu-heading font-bold">జ్ఞాన నిధి</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchDialog onResultClick={() => {}} />
          <Button variant="ghost" size="icon" onClick={() => setIsReadingMode(!isReadingMode)} className={cn(isReadingMode && "bg-primary/10 text-primary")}>
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
          <LibraryBrowser selectedDocId={selectedDocId} onSelect={handleSelectDoc} />
        </aside>

        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/40 z-45 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

        <main id="main-content" className="flex-1 overflow-y-auto bg-background">
          <div className={cn("mx-auto max-w-4xl p-4 md:p-12", isReadingMode && "max-w-3xl")}>
            {!selectedDocId ? (
              <CatechismIntro isReadingMode={isReadingMode} onStart={() => handleSelectDoc("heidelberg")} />
            ) : (
              selectedDoc && <DocumentViewer document={selectedDoc} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
