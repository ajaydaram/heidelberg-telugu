
"use client"

import * as React from "react"
import { LIBRARY_DATA, Category, LibraryDocument } from "@/app/lib/data/library-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Book, Scroll, ShieldCheck, Globe, Anchor, Heart, Flame, Shield, Clock } from "lucide-react"

interface LibraryBrowserProps {
  selectedDocId: string
  onSelect: (docId: string) => void
}

export function LibraryBrowser({ selectedDocId, onSelect }: LibraryBrowserProps) {
  const categories: Category[] = ["Ecumenical", "Reformed", "Lutheran", "Anglican", "Presbyterian", "Baptist", "Congregational", "Modern"]
  
  const getDocsByCategory = (cat: Category) => 
    LIBRARY_DATA.filter(doc => doc.category === cat).sort((a, b) => a.year - b.year)

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case "Ecumenical": return <Globe className="h-4 w-4 text-primary" />
      case "Reformed": return <Anchor className="h-4 w-4 text-primary" />
      case "Lutheran": return <Flame className="h-4 w-4 text-primary" />
      case "Anglican": return <Shield className="h-4 w-4 text-primary" />
      case "Baptist": return <Heart className="h-4 w-4 text-primary" />
      case "Modern": return <Clock className="h-4 w-4 text-primary" />
      default: return <ShieldCheck className="h-4 w-4 text-primary" />
    }
  }

  const getCategoryNameTe = (cat: Category) => {
    switch (cat) {
      case "Ecumenical": return "సార్వత్రిక ప్రమాణాలు"
      case "Reformed": return "రీఫార్మ్డ్ (Reformed)"
      case "Lutheran": return "లూథరన్ (Lutheran)"
      case "Anglican": return "ఆంగ్లికన్ (Anglican)"
      case "Baptist": return "బాప్టిస్ట్ (Baptist)"
      case "Presbyterian": return "ప్రెస్బిటేరియన్"
      case "Modern": return "ఆధునిక ప్రకటనలు"
      default: return cat
    }
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground telugu-text">గ్రంథాలయం (Library)</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <Accordion type="multiple" defaultValue={["Ecumenical", "Reformed"]} className="w-full">
            {categories.map((cat) => {
              const docs = getDocsByCategory(cat)
              if (docs.length === 0) return null

              return (
                <AccordionItem value={cat} key={cat} className="border-none">
                  <AccordionTrigger className="py-2 px-2 hover:no-underline hover:bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(cat)}
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-sm leading-tight">{cat}</span>
                        <span className="text-[10px] text-muted-foreground telugu-text font-normal">{getCategoryNameTe(cat)}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <div className="space-y-1 ml-4 border-l pl-2">
                      {docs.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => onSelect(doc.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-all telugu-text group",
                            selectedDocId === doc.id
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "hover:bg-accent text-foreground/70"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {doc.type === 'catechism' ? <Book className="h-3 w-3 shrink-0" /> : <Scroll className="h-3 w-3 shrink-0" />}
                            <span className="line-clamp-1">{doc.title_te}</span>
                          </div>
                          <div className={cn(
                            "text-[10px] ml-5",
                            selectedDocId === doc.id ? "opacity-80" : "opacity-50"
                          )}>
                            {doc.year} AD • {doc.type === 'catechism' ? 'బోధన' : 'ప్రమాణం'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
