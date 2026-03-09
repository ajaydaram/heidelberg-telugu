
"use client"

import * as React from "react"
import { LIBRARY_DATA } from "@/app/lib/data/library-data"
import { LibraryBrowser } from "@/components/library-browser"
import { DocumentViewer } from "@/components/document-viewer"
import { LibraryPortal } from "@/components/library-portal"
import { SearchDialog } from "@/components/search-dialog"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen, X, Moon, Sun, User, Loader2, Library, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUser } from "@/firebase"

export function CatechismDashboard() {
  const { user, isUserLoading } = useUser()
  const isMobile = useIsMobile()

  const [selectedDocId, setSelectedDocId] = React.useState("")
  const [isReadingMode, setIsReadingMode] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'e-ink'>('light')
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as any
    if (savedTheme) {
      setThemeMode(savedTheme)
      applyTheme(savedTheme)
    }
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
            <h1 className="text-xl md:text-2xl telugu-heading font-bold">విశ్వాస సంగ్రహం</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchDialog 
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            onResultClick={(docId) => {
              handleSelectDoc(docId)
            }} 
          />
          <Button variant="ghost" size="icon" onClick={() => setIsReadingMode(!isReadingMode)} title="Reading Mode" className={cn(isReadingMode && "bg-primary/10 text-primary")}>
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={cycleTheme} title="Cycle Theme (Light/Dark/E-Ink)">
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
          <LibraryBrowser selectedDocId={selectedDocId} onSelect={handleSelectDoc} />
        </aside>

        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/40 z-45 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

        <main id="main-content" className="flex-1 overflow-y-auto bg-background">
          <div className={cn("mx-auto max-w-5xl p-4 md:p-12 telugu-rendering", isReadingMode && "max-w-3xl")}>
            {!selectedDocId ? (
              <LibraryPortal onSelectDoc={handleSelectDoc} onOpenSearch={() => setIsSearchOpen(true)} />
            ) : (
              selectedDoc && <DocumentViewer document={selectedDoc} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
