
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { searchCatechismContent, SearchCatechismContentOutput } from "@/ai/flows/search-catechism-content"
import { getFullText } from "@/app/lib/data/catechism-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchDialogProps {
  onResultClick: (dayNumber: number) => void
}

export function SearchDialog({ onResultClick }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<SearchCatechismContentOutput | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const fullText = getFullText()
      const response = await searchCatechismContent({ query, catechismText: fullText })
      setResults(response)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (dayNumber: number) => {
    onResultClick(dayNumber)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-muted-foreground bg-muted/20">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline telugu-text">తెలుగులో వెతకండి...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="telugu-heading text-2xl">శోధన (Search)</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="కీవర్డ్‌లు లేదా ప్రశ్నలను నమోదు చేయండి..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="telugu-text h-12"
            />
            <Button type="submit" disabled={loading} className="telugu-text px-6">
              {loading ? "వెతుకుతోంది..." : "వెతకండి"}
            </Button>
          </form>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6">
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          )}

          {results && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {results.summary && (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-foreground/80 telugu-text italic text-lg leading-relaxed">
                  <strong>సారాంశం:</strong> {results.summary}
                </div>
              )}

              <div className="grid gap-4">
                {results.relevantPassages.length > 0 ? (
                  results.relevantPassages.map((p, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleResultClick(p.lordsDayNumber)}
                      className="text-left p-4 rounded-xl border hover:bg-accent/5 transition-colors group"
                    >
                      <div className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">ప్రభువు దినము {p.lordsDayNumber}</div>
                      <div className="telugu-heading text-xl mb-2 group-hover:text-primary transition-colors">{p.question}</div>
                      <div className="telugu-text text-muted-foreground line-clamp-3 leading-relaxed">{p.answer}</div>
                    </button>
                  ))
                ) : !loading && (
                  <div className="text-center py-12 text-muted-foreground telugu-text text-xl">
                    ఫలితాలు ఏవీ కనుగొనబడలేదు.
                  </div>
                )}
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
