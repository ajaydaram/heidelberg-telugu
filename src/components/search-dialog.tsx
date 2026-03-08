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

export function SearchDialog() {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">తెలుగులో వెతకండి...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">శోధన (Search)</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input 
            placeholder="కీవర్డ్‌లు లేదా ప్రశ్నలను నమోదు చేయండి..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-body"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "వెతుకుతోంది..." : "వెతకండి"}
          </Button>
        </form>

        <ScrollArea className="flex-1 pr-4">
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}

          {results && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {results.summary && (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg text-sm text-foreground/80 telugu-content italic">
                  <strong>సారాంశం:</strong> {results.summary}
                </div>
              )}

              {results.relevantPassages.length > 0 ? (
                results.relevantPassages.map((p, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-0">
                    <div className="text-xs font-bold text-primary mb-1">ప్రభువు దినము {p.lordsDayNumber}</div>
                    <div className="font-headline text-lg mb-1">{p.question}</div>
                    <div className="text-sm text-muted-foreground telugu-content">{p.answer}</div>
                  </div>
                ))
              ) : !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  ఫలితాలు ఏవీ కనుగొనబడలేదు.
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}