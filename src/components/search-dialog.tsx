
"use client"

import * as React from "react"
import { Search, Sparkles, BookText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { globalSearch, GlobalSearchOutput } from "@/ai/flows/global-search-flow"
import { getLibraryFullText } from "@/app/lib/data/library-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface SearchDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onResultClick: (docId: string, referenceId: string) => void
}

export function SearchDialog({ open: controlledOpen, onOpenChange, onResultClick }: SearchDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState<GlobalSearchOutput | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const libraryContext = getLibraryFullText()
      const response = await globalSearch({ query, libraryContext })
      setResults(response)
    } catch (error) {
      console.error("Global AI search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (docTitle: string, refId: string) => {
    // In a simple map for demo purposes
    const docMap: Record<string, string> = {
      "అపొస్తలుల విశ్వాస ప్రమాణము": "apostles-creed",
      "నీసియ విశ్వాస ప్రమాణము": "nicene-creed",
      "హీడెల్‌బర్గ్ కాటెకిజమ్": "heidelberg"
    }
    const docId = docMap[docTitle] || "heidelberg"
    onResultClick(docId, refId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-muted-foreground bg-muted/20 border-primary/20 hover:border-primary/50 transition-all rounded-full px-6">
          <Search className="h-4 w-4 text-primary" />
          <span className="hidden md:inline telugu-text">విశ్వాస సత్యాలను వెతకండి...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0 overflow-hidden border-primary/20 shadow-2xl">
        <DialogHeader className="p-6 pb-2 bg-primary/5 border-b border-primary/10">
          <DialogTitle className="telugu-heading text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            AI శోధన (Global AI Search)
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4 bg-background">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="ఉదా: 'పరిశుద్ధాత్మ గురించి వివిధ ప్రమాణాలు ఏమి చెబుతున్నాయి?'" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="telugu-text h-14 text-lg focus-visible:ring-primary/50 border-primary/20"
            />
            <Button type="submit" disabled={loading} size="lg" className="telugu-text px-8 bg-primary hover:bg-primary/90 shadow-lg">
              {loading ? "వెతుకుతోంది..." : "వెతకండి"}
            </Button>
          </form>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6 bg-background">
          {loading && (
            <div className="space-y-6 pt-4">
              <div className="p-4 rounded-2xl bg-muted/20 space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* synthesize Answer */}
              {results.answer && (
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles className="h-12 w-12" />
                  </div>
                  <h3 className="telugu-heading text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> AI సారాంశం
                  </h3>
                  <div className="telugu-text text-xl leading-relaxed text-foreground/90 font-medium">
                    {results.answer}
                  </div>
                </div>
              )}

              {/* Specific Snippets */}
              <div className="space-y-4">
                <h3 className="telugu-heading text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">ఆధారాలు (Relevant Passages)</h3>
                <div className="grid gap-4">
                  {results.snippets.length > 0 ? (
                    results.snippets.map((p, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleResultClick(p.documentTitle, p.referenceId)}
                        className="text-left p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5 transition-all group shadow-sm hover:shadow-md"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="outline" className="telugu-text bg-background font-bold text-primary border-primary/20">
                            {p.documentTitle}
                          </Badge>
                          <div className="text-[10px] uppercase font-bold text-muted-foreground opacity-50">{p.sectionTitle}</div>
                        </div>
                        <div className="telugu-text text-lg text-foreground/80 line-clamp-4 leading-relaxed italic mb-3">
                          "{p.content}"
                        </div>
                        <div className="flex items-center text-primary font-bold text-sm telugu-text gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          పూర్తిగా చదవండి <ChevronRight className="h-4 w-4" />
                        </div>
                      </button>
                    ))
                  ) : !loading && (
                    <div className="text-center py-12 text-muted-foreground telugu-text text-xl bg-muted/10 rounded-2xl border border-dashed">
                      ఫలితాలు ఏవీ కనుగొనబడలేదు. దయచేసి మరో ప్రశ్న అడగండి.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
