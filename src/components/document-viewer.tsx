
"use client"

import * as React from "react"
import { LibraryDocument, LibraryItem } from "@/app/lib/data/library-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Bookmark, Share2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DocumentViewerProps {
  document: LibraryDocument
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  
  // Helper to parse content for glossary terms and basic HTML
  const renderFormattedText = (text: string) => {
    if (!text) return null;

    // This is a simple regex-based parser for glossary terms like <glossary term="...">...</glossary>
    // In a real app, you might use a markdown parser or a full HTML sanitizer
    const parts = text.split(/(<glossary term=".*?">.*?<\/glossary>|<b>.*?<\/b>)/g);

    return parts.map((part, index) => {
      // Handle Glossary Tooltips
      if (part.startsWith('<glossary')) {
        const termMatch = part.match(/term="(.*?)"/);
        const contentMatch = part.match(/>(.*?)<\/glossary>/);
        const term = termMatch ? termMatch[1] : '';
        const content = contentMatch ? contentMatch[1] : '';
        
        let explanation = "";
        if (term === "Substance") {
          explanation = "గ్రీకులో 'Homoousios' అంటే తండ్రి మరియు కుమారుడు ఒకే దైవిక సారము కలిగినవారని అర్థం.";
        }

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary border-b border-dotted border-primary cursor-help font-bold">
                  {content}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3 telugu-text text-sm bg-card border-primary/20">
                <div className="flex gap-2 items-start">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <p>{explanation}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      // Handle Bold Tags
      if (part.startsWith('<b>')) {
        const content = part.replace(/<\/?b>/g, '');
        return <strong key={index} className="font-bold text-foreground">{content}</strong>;
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/30 uppercase tracking-tighter">
          {document.category} • {document.year} AD
        </Badge>
        <h1 className="telugu-heading text-4xl md:text-6xl font-bold mb-4">{document.title_te}</h1>
        <p className="text-xl text-muted-foreground italic">{document.title_en}</p>
        <div className="mt-8 w-24 h-1 bg-accent mx-auto rounded-full" />
      </header>

      <div className="space-y-16">
        {document.sections.map((section) => (
          <section key={section.id} className="space-y-8">
            {section.title && (
              <h2 className="telugu-heading text-3xl font-bold border-b pb-2 text-primary/80">
                {section.title}
              </h2>
            )}
            
            <div className="space-y-12">
              {section.items.map((item) => (
                <div key={item.id} className="group relative">
                  {document.type === 'catechism' ? (
                    /* Catechism Layout: Q&A */
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="telugu-text text-2xl font-bold text-primary border-l-4 border-accent pl-4">
                          ప్రశ్న {item.number}: {item.question}
                        </h3>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="telugu-text text-xl md:text-2xl pl-5 whitespace-pre-wrap leading-relaxed">
                        <span className="font-bold opacity-70 block mb-2 telugu-heading text-lg">జవాబు:</span>
                        {item.answer}
                      </div>
                    </div>
                  ) : (
                    /* Confession Layout: Article/Paragraph */
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="telugu-heading text-2xl font-bold text-accent-foreground">
                          {item.title || `Article ${item.number || ''}`}
                        </h3>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="telugu-text text-xl md:text-2xl leading-[1.8] text-foreground/90 bg-accent/5 p-6 md:p-8 rounded-2xl border border-accent/10 shadow-sm">
                        {renderFormattedText(item.content || '')}
                      </div>
                    </div>
                  )}

                  {item.scripture && item.scripture.length > 0 && (
                    <div className="mt-6 pl-5 space-y-4">
                      <Separator className="opacity-50" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-3 telugu-text tracking-widest">లేఖన ఆధారాలు (Scripture References)</p>
                        <div className="flex flex-wrap gap-2">
                          {item.scripture.map((ref, i) => (
                            <Badge key={i} variant="secondary" className="text-sm font-normal py-1 px-3 bg-muted/50 telugu-text border border-primary/10">
                              {ref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
