
"use client"

import * as React from "react"
import { LIBRARY_DATA, Category, LibraryDocument } from "@/app/lib/data/library-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Book, Scroll, ShieldCheck } from "lucide-react"

interface LibraryBrowserProps {
  selectedDocId: string
  onSelect: (docId: string) => void
}

export function LibraryBrowser({ selectedDocId, onSelect }: LibraryBrowserProps) {
  const categories: Category[] = ["Ecumenical", "Reformed", "Baptist", "Lutheran"]
  
  const getDocsByCategory = (cat: Category) => 
    LIBRARY_DATA.filter(doc => doc.category === cat)

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
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="font-bold text-sm">{cat}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <div className="space-y-1 ml-4 border-l pl-2">
                      {docs.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => onSelect(doc.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-all telugu-text",
                            selectedDocId === doc.id
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "hover:bg-accent text-foreground/70"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {doc.type === 'catechism' ? <Book className="h-3 w-3" /> : <Scroll className="h-3 w-3" />}
                            <span>{doc.title_te}</span>
                          </div>
                          <div className="text-[10px] opacity-60 ml-5">{doc.year} AD</div>
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
