
"use client"

import * as React from "react"
import { LibraryDocument, LibraryItem } from "@/app/lib/data/library-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Bookmark, Share2, Info, Lightbulb, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface DocumentViewerProps {
  document: LibraryDocument
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  
  // Helper to parse content for glossary terms, bold tags, and footnotes
  const renderFormattedText = (text: string, itemId: string) => {
    if (!text) return null;

    // Handle footnotes like [1], [2], etc.
    const parts = text.split(/(<glossary term=".*?">.*?<\/glossary>|<b>.*?<\/b>|\[\d+\])/g);

    return parts.map((part, index) => {
      // Handle Glossary Tooltips
      if (part.startsWith('<glossary')) {
        const termMatch = part.match(/term="(.*?)"/);
        const contentMatch = part.match(/>(.*?)<\/glossary>/);
        const term = termMatch ? termMatch[1] : '';
        const content = contentMatch ? contentMatch[1] : '';
        
        let explanation = "";
        if (term === "Substance") explanation = "గ్రీకులో 'Homoousios' అంటే తండ్రి మరియు కుమారుడు ఒకే దైవిక సారము కలిగినవారని అర్థం.";
        else if (term === "Incomprehensible") explanation = "దేవుని మన పరిమితమైన బుద్ధితో పూర్తిగా గ్రహించలేము అని అర్థం.";
        else if (term === "Co-eternal") explanation = "ముగ్గురు వ్యక్తులు ఎల్లప్పుడూ ఒకే సమయంలో ఉనికిలో ఉన్నారు.";

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary border-b border-dotted border-primary cursor-help font-bold">
                  {content}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3 telugu-text text-sm bg-card border-primary/20">
                <p>{explanation}</p>
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

      // Handle Footnotes [1]
      const footnoteMatch = part.match(/^\[(\d+)\]$/);
      if (footnoteMatch) {
        const num = footnoteMatch[1];
        return (
          <sup key={index} className="text-primary font-bold px-0.5 select-none cursor-pointer hover:bg-primary/10 rounded">
            {num}
          </sup>
        );
      }

      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
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

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={document.sections[0]?.id}>
          {document.sections.map((section) => (
            <AccordionItem 
              key={section.id} 
              value={section.id} 
              className="border-2 rounded-2xl bg-card overflow-hidden transition-all data-[state=open]:border-primary/40 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/20">
                <div className="flex flex-col items-start text-left">
                  <span className="telugu-heading text-2xl font-bold text-primary">{section.title}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">
                    {section.items.length} {document.type === 'catechism' ? 'ప్రశ్నలు' : 'విభాగాలు'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-8 pt-4">
                <div className="space-y-12">
                  {section.items.map((item) => (
                    <div key={item.id} className="group relative">
                      {document.type === 'catechism' ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="telugu-text text-2xl font-bold text-primary border-l-4 border-accent pl-4">
                              ప్రశ్న {item.number}: {item.question}
                            </h3>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Bookmark className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Share2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                          <div className="telugu-text text-xl md:text-2xl pl-5 whitespace-pre-wrap leading-relaxed">
                            <span className="font-bold opacity-70 block mb-2 telugu-heading text-lg">జవాబు:</span>
                            {renderFormattedText(item.answer || '', item.id)}
                          </div>
                          {item.explanation && (
                            <div className="mt-4 p-5 bg-muted/40 border-l-4 border-primary/30 rounded-r-xl italic telugu-text ml-5 text-foreground/80">
                              <span className="font-bold not-italic block mb-2 telugu-heading text-sm uppercase opacity-70">వివరణ:</span>
                              {item.explanation}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="telugu-heading text-2xl font-bold text-accent-foreground">
                              {item.title || `Article ${item.number || ''}`}
                            </h3>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Bookmark className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Share2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                          <div className="telugu-text text-xl md:text-2xl leading-[1.8] text-foreground/90 bg-accent/5 p-6 md:p-8 rounded-2xl border border-accent/10">
                            {renderFormattedText(item.content || '', item.id)}
                          </div>
                        </div>
                      )}

                      {item.scripture && item.scripture.length > 0 && (
                        <div className="mt-6 pl-5 space-y-4">
                          <Separator className="opacity-50" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-3 telugu-text tracking-widest">లేఖన ఆధారాలు</p>
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

                  {section.insights && section.insights.length > 0 && (
                    <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
                      <h3 className="telugu-heading text-xl mb-4 flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        ముఖ్యమైన అంశాలు
                      </h3>
                      <ul className="space-y-3">
                        {section.insights.map((insight, idx) => (
                          <li key={idx} className="telugu-text text-lg flex gap-3">
                            <span className="text-primary font-bold">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
